const app = document.querySelector("#app");
const STORAGE_KEY = "readwell-progress-v1";

const state = {
  setId: null,
  questionIndex: 0,
  selectedChoice: null,
  checked: false,
  sound: true,
  progress: loadProgress()
};

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function getSet(id = state.setId) {
  return window.READING_SETS.find((set) => set.id === id);
}

function completedCount(set) {
  return set.questions.filter((question) => state.progress[question.id]?.completed).length;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function playTone(success = true) {
  if (!state.sound || !window.AudioContext) return;
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.frequency.value = success ? 620 : 260;
  gain.gain.setValueAtTime(0.045, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.16);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.16);
}

function renderHome() {
  state.setId = null;
  const totalCompleted = window.READING_SETS.reduce(
    (sum, set) => sum + completedCount(set),
    0
  );
  const totalQuestions = window.READING_SETS.reduce(
    (sum, set) => sum + set.questions.length,
    0
  );

  app.innerHTML = `
    <section class="home-view">
      <div class="hero">
        <p class="eyebrow">TOEFL reading practice</p>
        <h1>Build your reading <em>instinct.</em></h1>
        <p class="hero-copy">
          Three focused ways to practice—from the shape of a word to the meaning
          of a full academic passage.
        </p>
      </div>

      <div class="section-heading">
        <h2>Choose a practice</h2>
        <span class="progress-summary">${totalCompleted} of ${totalQuestions} completed</span>
      </div>

      <div class="practice-grid">
        ${window.READING_SETS.map((set) => {
          const done = completedCount(set);
          const percentage = (done / set.questions.length) * 100;
          const icons = {
            "word-completion": "ab_",
            "visual-mcq": "▧",
            "passage-mcq": "¶"
          };
          return `
            <button class="set-card ${set.accent}" data-set-id="${set.id}">
              <span class="card-number">${set.number}</span>
              <span class="card-icon">${icons[set.type]}</span>
              <h3>${set.title}</h3>
              <p>${set.description}</p>
              <span class="card-meta">
                <span>${set.questions.length} questions · ${set.estimatedMinutes} min</span>
                <span class="card-progress" aria-label="${done} of ${set.questions.length} complete">
                  <span style="width: ${percentage}%"></span>
                </span>
              </span>
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;

  document.querySelectorAll("[data-set-id]").forEach((button) => {
    button.addEventListener("click", () => startSet(button.dataset.setId));
  });
  focusApp();
}

function startSet(setId, index = 0) {
  state.setId = setId;
  state.questionIndex = index;
  state.selectedChoice = null;
  state.checked = false;
  renderQuestion();
}

function renderQuestion() {
  const set = getSet();
  const question = set.questions[state.questionIndex];
  const isWord = set.type === "word-completion";

  app.innerHTML = `
    <section class="practice-view">
      <div class="practice-topline">
        <button class="back-button" data-action="home">
          <span aria-hidden="true">←</span> All practice
        </button>
        <div class="question-count">
          Question <strong>${state.questionIndex + 1}</strong> of ${set.questions.length}
        </div>
      </div>

      <div class="practice-intro">
        <p class="eyebrow">${set.eyebrow}</p>
        <h1>${set.shortTitle}</h1>
        <p>${question.instruction}</p>
      </div>

      <div class="question-layout ${isWord ? "word-layout" : ""}">
        ${renderQuestionContent(set, question)}
      </div>

      <div class="question-nav">
        <button class="secondary-button" id="previous-question" ${
          state.questionIndex === 0 ? "disabled" : ""
        }>Previous</button>
        <div class="nav-dots" aria-label="Question navigation">
          ${set.questions
            .map(
              (_, index) => `
                <button
                  class="nav-dot ${index === state.questionIndex ? "active" : ""}"
                  data-question-index="${index}"
                  aria-label="Go to question ${index + 1}"
                ></button>
              `
            )
            .join("")}
        </div>
        <button class="secondary-button" id="next-question">
          ${state.questionIndex === set.questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </section>
  `;

  bindQuestionEvents(set, question);
  focusApp();
}

function renderQuestionContent(set, question) {
  if (set.type === "word-completion") {
    let blankIndex = 0;
    const paragraph = question.segments
      .map((segment) => {
        if (typeof segment === "string") return escapeHtml(segment);
        const currentIndex = blankIndex++;
        return `
          <span class="word-blank">
            ${escapeHtml(segment.visible)}<input
              class="word-input"
              data-blank-index="${currentIndex}"
              data-answer="${escapeHtml(segment.answer)}"
              aria-label="Missing letters for ${escapeHtml(segment.blank)}"
              autocomplete="off"
              spellcheck="false"
              style="--input-width: ${Math.max(48, segment.answer.length * 18)}px"
            />
          </span>
        `;
      })
      .join("");

    return `
      <article class="content-panel">
        <p class="instruction">Type only the missing letters in each blank.</p>
        <div class="word-paragraph">${paragraph}</div>
        <div class="word-actions">
          <p class="feedback" id="word-feedback" aria-live="polite"></p>
          <button class="primary-button" id="check-words">Check my words</button>
        </div>
      </article>
    `;
  }

  return `
    <article class="content-panel">
      ${renderSource(set, question)}
    </article>
    <aside class="answer-panel">
      <p class="instruction">Choose one answer.</p>
      <h2 class="answer-prompt">${question.prompt}</h2>
      <div class="choices">
        ${question.choices
          .map(
            (choice, index) => `
              <button class="choice" data-choice-index="${index}">
                <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
                <span class="choice-label">${choice}</span>
              </button>
            `
          )
          .join("")}
      </div>
      <div id="explanation-slot"></div>
      <div class="answer-actions">
        <button class="primary-button" id="check-answer">Check answer</button>
      </div>
    </aside>
  `;
}

function renderSource(set, question) {
  if (set.type === "passage-mcq") {
    return `
      <h2 class="passage-heading">${set.passageTitle}</h2>
      <div class="academic-passage">
        ${set.passage.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </div>
    `;
  }

  if (question.visual.kind === "notice") {
    const visual = question.visual;
    return `
      <div class="notice-visual" role="img" aria-label="Library weekend book sale notice">
        <div class="notice-head">${visual.kicker}</div>
        <div class="notice-body">
          <h2>${visual.title}</h2>
          <p class="notice-date">${visual.date}</p>
          <p class="notice-time">${visual.time}</p>
          <p class="notice-copy">${visual.body}</p>
          <p class="notice-note">${visual.note}</p>
          <span class="notice-tag">${visual.tag}</span>
        </div>
      </div>
    `;
  }

  return `
    <div class="message-visual" role="img" aria-label="Text message from ${question.visual.sender}">
      <div class="message-meta">
        <strong>${question.visual.sender}</strong>
        <span>${question.visual.time}</span>
      </div>
      <p class="message-bubble">${question.visual.body}</p>
    </div>
  `;
}

function bindQuestionEvents(set, question) {
  document.querySelectorAll(".choice").forEach((choice) => {
    choice.addEventListener("click", () => {
      if (state.checked) return;
      state.selectedChoice = Number(choice.dataset.choiceIndex);
      document.querySelectorAll(".choice").forEach((item) => item.classList.remove("selected"));
      choice.classList.add("selected");
    });
  });

  document.querySelector("#check-answer")?.addEventListener("click", () => {
    if (state.selectedChoice === null || state.checked) return;
    state.checked = true;
    const isCorrect = state.selectedChoice === question.answer;
    document.querySelectorAll(".choice").forEach((choice) => {
      const index = Number(choice.dataset.choiceIndex);
      if (index === question.answer) choice.classList.add("correct");
      if (index === state.selectedChoice && !isCorrect) choice.classList.add("incorrect");
    });
    document.querySelector("#explanation-slot").innerHTML = `
      <p class="explanation"><strong>${isCorrect ? "Exactly." : "Not quite."}</strong>
      ${question.explanation}</p>
    `;
    recordCompletion(question.id, isCorrect);
    playTone(isCorrect);
  });

  document.querySelector("#check-words")?.addEventListener("click", () => {
    const inputs = [...document.querySelectorAll(".word-input")];
    let correctCount = 0;
    inputs.forEach((input) => {
      const isCorrect =
        input.value.trim().toLowerCase() === input.dataset.answer.toLowerCase();
      input.classList.toggle("correct", isCorrect);
      input.classList.toggle("incorrect", !isCorrect);
      if (isCorrect) correctCount += 1;
    });
    const allCorrect = correctCount === inputs.length;
    const feedback = document.querySelector("#word-feedback");
    feedback.className = `feedback ${allCorrect ? "good" : "try-again"}`;
    feedback.textContent = allCorrect
      ? "Beautifully done—all the words are complete."
      : `${correctCount} of ${inputs.length} correct. Look at the context and try again.`;
    if (allCorrect) recordCompletion(question.id, true);
    playTone(allCorrect);
  });

  document.querySelector("#previous-question")?.addEventListener("click", () => {
    if (state.questionIndex > 0) startSet(set.id, state.questionIndex - 1);
  });

  document.querySelector("#next-question")?.addEventListener("click", () => {
    if (state.questionIndex < set.questions.length - 1) {
      startSet(set.id, state.questionIndex + 1);
    } else {
      renderResults(set);
    }
  });

  document.querySelectorAll("[data-question-index]").forEach((dot) => {
    dot.addEventListener("click", () => startSet(set.id, Number(dot.dataset.questionIndex)));
  });

  bindHomeButtons();
}

function recordCompletion(questionId, correct) {
  state.progress[questionId] = {
    completed: true,
    correct,
    updatedAt: new Date().toISOString()
  };
  saveProgress();
}

function renderResults(set) {
  const correct = set.questions.filter(
    (question) => state.progress[question.id]?.correct
  ).length;

  app.innerHTML = `
    <section class="results-view">
      <div class="results-card">
        <div class="score-ring"><span>${correct}/${set.questions.length}</span></div>
        <p class="eyebrow">Practice complete</p>
        <h1>Nice reading.</h1>
        <p>
          You answered ${correct} of ${set.questions.length} correctly.
          ${correct === set.questions.length
            ? "That was a clean sweep."
            : "You can revisit the set whenever you want another pass."}
        </p>
        <div class="results-actions">
          <button class="secondary-button" id="try-again">Practice again</button>
          <button class="primary-button" data-action="home">Choose another set</button>
        </div>
      </div>
    </section>
  `;

  document.querySelector("#try-again").addEventListener("click", () => startSet(set.id));
  bindHomeButtons();
  focusApp();
}

function bindHomeButtons() {
  document.querySelectorAll('[data-action="home"]').forEach((button) => {
    button.addEventListener("click", renderHome);
  });
}

function focusApp() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  app.focus({ preventScroll: true });
}

document.querySelector("#sound-toggle").addEventListener("click", (event) => {
  state.sound = !state.sound;
  event.currentTarget.classList.toggle("is-muted", !state.sound);
  event.currentTarget.setAttribute(
    "aria-label",
    state.sound ? "Mute interface sounds" : "Enable interface sounds"
  );
});

document.querySelector("#reset-progress").addEventListener("click", () => {
  state.progress = {};
  localStorage.removeItem(STORAGE_KEY);
  renderHome();
});

bindHomeButtons();
renderHome();
