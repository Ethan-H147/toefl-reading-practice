const app = document.querySelector("#app");
const audioDock = document.querySelector("#persistent-audio-dock");
const listeningAudio = document.createElement("audio");
listeningAudio.id = "listening-audio";
listeningAudio.controls = true;
listeningAudio.preload = "metadata";
listeningAudio.setAttribute("controlslist", "nodownload");
let listeningAudioMaterialId = null;

const STORAGE_KEY = "toefl-training-progress-v1";
const LEGACY_STORAGE_KEY = "readwell-progress-v1";

const state = {
  testId: null,
  questionIndex: 0,
  selectedChoice: null,
  checked: false,
  reviewed: new Set(),
  progress: loadProgress()
};

function loadProgress() {
  try {
    const savedProgress =
      localStorage.getItem(STORAGE_KEY) ??
      localStorage.getItem(LEGACY_STORAGE_KEY);
    return JSON.parse(savedProgress) || {};
  } catch {
    return {};
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function getAllModules() {
  return [
    ...window.READING_SETS,
    ...(window.LISTENING_SETS || [])
  ];
}

function getTestSets() {
  const moduleOrder = [
    "complete-words",
    "daily-reading",
    "academic-reading",
    "listen-and-respond",
    "listening-conversations",
    "listening-talks",
    "listening-module-2"
  ];
  const modules = getAllModules()
    .filter((module) => module.questions?.length)
    .sort((first, second) => {
      const firstOrder = moduleOrder.indexOf(first.id);
      const secondOrder = moduleOrder.indexOf(second.id);
      return (
        (firstOrder === -1 ? Number.MAX_SAFE_INTEGER : firstOrder) -
        (secondOrder === -1 ? Number.MAX_SAFE_INTEGER : secondOrder)
      );
    });
  return [
    {
      id: "practice-set-1",
      title: "TOEFL Practice Set 1",
      modules,
      estimatedMinutes: modules.reduce(
        (sum, module) => sum + module.estimatedMinutes,
        0
      )
    }
  ];
}

function getTest(id = state.testId) {
  return getTestSets().find((test) => test.id === id);
}

function flattenTestQuestions(test) {
  return test.modules.flatMap((module) =>
    module.questions.map((question, moduleQuestionIndex) => ({
      module,
      question,
      moduleQuestionIndex
    }))
  );
}

function completedCount(test) {
  return flattenTestQuestions(test).filter(
    ({ question }) => state.progress[question.id]?.completed
  ).length;
}

function getQuestionHeading(module, question) {
  if (question?.heading) return question.heading;

  const headings = {
    "word-completion": "Fill in the missing letters in the paragraph",
    "visual-mcq": "Read the material and answer the question",
    "passage-mcq": "Read the passage and answer the question",
    "listening-response": "Listen and choose the best response",
    "listening-conversation": "Listen to the conversation and answer the question",
    "listening-talk": "Listen to the talk and answer the question"
  };
  return headings[module.type] || "Answer the question";
}

function getQuestionTaskName(module, question) {
  return question?.taskName || module.title;
}

function parkListeningAudio() {
  if (listeningAudio.parentNode !== audioDock) {
    audioDock.appendChild(listeningAudio);
  }
}

function stopListeningAudio() {
  listeningAudio.pause();
  listeningAudio.currentTime = 0;
  listeningAudioMaterialId = null;
  listeningAudio.removeAttribute("src");
  listeningAudio.load();
  parkListeningAudio();
}

function mountListeningAudio(set, question) {
  const material = set.materials?.find(
    (candidate) => candidate.id === question.materialId
  );
  const audioSrc = question.audioSrc || material?.audioSrc;
  const slot = document.querySelector("#persistent-audio-slot");
  if (!slot || !audioSrc || !material) return;

  const absoluteSrc = new URL(audioSrc, document.baseURI).href;
  if (
    listeningAudioMaterialId !== material.id ||
    listeningAudio.src !== absoluteSrc
  ) {
    listeningAudio.pause();
    listeningAudio.src = absoluteSrc;
    listeningAudio.currentTime = 0;
    listeningAudio.load();
    listeningAudioMaterialId = material.id;
  }

  slot.appendChild(listeningAudio);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderHome() {
  stopListeningAudio();
  state.testId = null;
  const tests = getTestSets();

  app.innerHTML = `
    <section class="home-view mock-home">
      <div class="mock-page-heading">
        <p class="eyebrow">TOEFL Training</p>
        <h1>Scored Practice Tests</h1>
        <p class="mock-tagline">
          Improve your <em>reading</em> and <em>listening</em> skills in a
          focused test-style environment.
        </p>
      </div>

      <div class="test-list">
        ${tests
          .map((test) => {
            const entries = flattenTestQuestions(test);
            const done = completedCount(test);
            const firstIncomplete = entries.findIndex(
              ({ question }) => !state.progress[question.id]?.completed
            );
            const startIndex = firstIncomplete === -1 ? 0 : firstIncomplete;
            const percentage = entries.length ? (done / entries.length) * 100 : 0;
            return `
              <article class="test-row">
                <div class="test-row-main">
                  <h2>${test.title}</h2>
                  <div class="test-meta">
                    <span>${entries.length} Questions</span>
                    <span>Time: ${test.estimatedMinutes} mins</span>
                  </div>
                  <div class="test-progress-line" aria-label="${done} of ${entries.length} completed">
                    <span style="width: ${percentage}%"></span>
                  </div>
                  <p>${done ? `${done} questions completed` : "Not started"}</p>
                </div>
                <button
                  class="start-test-button"
                  data-test-id="${test.id}"
                  data-start-index="${startIndex}"
                >
                  ${done ? "Continue" : "Start"}
                </button>
              </article>
            `;
          })
          .join("")}
      </div>
    </section>
  `;

  document.querySelectorAll("[data-test-id]").forEach((button) => {
    button.addEventListener("click", () =>
      startTest(button.dataset.testId, Number(button.dataset.startIndex))
    );
  });
  focusApp();
}

function startTest(testId, index = 0) {
  state.testId = testId;
  state.questionIndex = index;
  state.selectedChoice = null;
  state.checked = false;
  renderQuestion();
}

function renderQuestion() {
  const test = getTest();
  const entries = flattenTestQuestions(test);
  const { module, question } = entries[state.questionIndex];
  const isWord = module.type === "word-completion";
  const sectionName = module.section === "listening" ? "Listening" : "Reading";
  const isReviewed = state.reviewed.has(state.questionIndex);

  parkListeningAudio();
  app.innerHTML = `
    <section class="practice-view test-window">
      <header class="test-toolbar">
        <div class="test-toolbar-title">${test.title}</div>
        <div class="test-toolbar-actions">
          <button class="toolbar-home" data-action="home">Home</button>
          <span class="module-switch">${sectionName} · ${module.shortTitle}</span>
          <label class="question-jump">
            <span>Jump to</span>
            <select id="question-jump" aria-label="Jump to a question">
              ${entries
                .map(({ module: entryModule, question: entryQuestion }, index) => {
                  const entrySection =
                    entryModule.section === "listening" ? "Listening" : "Reading";
                  const marker = state.progress[entryQuestion.id]?.completed
                    ? "✓ "
                    : state.reviewed.has(index)
                      ? "◆ "
                      : "";
                  return `
                    <option value="${index}" ${
                      index === state.questionIndex ? "selected" : ""
                    }>
                      ${marker}Question ${index + 1} · ${entrySection}
                    </option>
                  `;
                })
                .join("")}
            </select>
          </label>
          <button id="show-answer">Show Answer</button>
          <button id="review-question" class="${isReviewed ? "is-reviewed" : ""}">
            ${isReviewed ? "Reviewed" : "Review"} <span aria-hidden="true">◆</span>
          </button>
          <button id="previous-question" ${
            state.questionIndex === 0 ? "disabled" : ""
          }>‹ Back</button>
          <button class="toolbar-next" id="next-question">
            ${state.questionIndex === entries.length - 1 ? "Finish" : "Next ›"}
          </button>
        </div>
      </header>

      <div class="test-status">
        <strong>${sectionName}</strong>
        <span>Question ${state.questionIndex + 1} of ${entries.length}</span>
        <span class="test-task-name">${getQuestionTaskName(module, question)}</span>
      </div>

      <h1 class="question-command">${getQuestionHeading(module, question)}</h1>

      <div class="question-layout ${isWord ? "word-layout" : ""}">
        ${renderQuestionContent(module, question)}
      </div>
    </section>
  `;

  if (module.section === "listening") {
    mountListeningAudio(module, question);
  } else {
    stopListeningAudio();
  }
  bindQuestionEvents(module, question, test, entries.length);
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
              maxlength="${segment.answer.length}"
              size="${segment.answer.length}"
              placeholder="${"_".repeat(segment.answer.length)}"
              aria-label="${segment.answer.length} missing letters for ${escapeHtml(segment.blank)}"
              autocomplete="off"
              spellcheck="false"
              style="--letter-count: ${segment.answer.length}"
            />
          </span>
        `;
      })
      .join("");

    return `
      <article class="content-panel">
        <p class="instruction">Type only the missing letters. Each underscore represents one letter.</p>
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
  const material = set.materials?.find(
    (candidate) => candidate.id === question.materialId
  );

  if (set.section === "listening") {
    return renderListeningSource(set, material, question);
  }

  if (set.type === "passage-mcq") {
    if (!material) {
      return `<p class="material-error">This passage could not be loaded.</p>`;
    }

    return `
      <h2 class="passage-heading">${escapeHtml(material.title)}</h2>
      <div class="academic-passage">
        ${material.passage
          .map(
            (paragraph) =>
              `<p>${renderHighlightedText(paragraph, question.highlight)}</p>`
          )
          .join("")}
      </div>
    `;
  }

  if (!material) {
    return `<p class="material-error">This reading material could not be loaded.</p>`;
  }

  return renderDailyMaterial(material);
}

function renderListeningSource(set, material, question) {
  const audioSrc = question.audioSrc || material?.audioSrc;
  const title = material?.title || set.shortTitle;
  const context = material?.context || set.audioPattern;

  return `
    <section class="listening-source">
      <div class="listening-source-head">
        <span class="listening-wave" aria-hidden="true">
          <i></i><i></i><i></i><i></i><i></i>
        </span>
        <div>
          <p>${escapeHtml(set.eyebrow)}</p>
          <h2>${escapeHtml(title)}</h2>
        </div>
      </div>

      ${
        audioSrc
          ? `
            <div class="audio-player-shell">
              <div id="persistent-audio-slot"></div>
              <button class="replay-button" id="replay-audio" type="button">
                ↺ Replay from start
              </button>
            </div>
          `
          : `
            <div class="audio-player-shell audio-missing">
              <span class="audio-disc" aria-hidden="true">♫</span>
              <div>
                <strong>Audio ready to be attached</strong>
                <span>Add the MP3 path to this material to enable playback.</span>
              </div>
            </div>
          `
      }

      <p class="listening-context">${escapeHtml(context)}</p>
      <p class="listening-reminder">
        Listen carefully, then select the best answer.
      </p>
    </section>
  `;
}

function renderHighlightedText(text, highlight) {
  const safeText = escapeHtml(text);
  if (!highlight) return safeText;

  const safeHighlight = escapeHtml(highlight);
  const start = safeText.toLowerCase().indexOf(safeHighlight.toLowerCase());
  if (start === -1) return safeText;

  const end = start + safeHighlight.length;
  return `${safeText.slice(0, start)}<mark class="passage-highlight">${safeText.slice(
    start,
    end
  )}</mark>${safeText.slice(end)}`;
}

function renderDailyMaterial(material) {
  if (material.kind === "membership") {
    return `
      <article class="daily-material membership-card" aria-label="${escapeHtml(
        material.title
      )}">
        <div class="browser-bar">
          <div class="browser-address">${escapeHtml(material.url)}</div>
          <span></span><span></span>
        </div>
        <div class="membership-body">
          <div class="membership-title">
            <span class="gym-icon" aria-hidden="true">●━●</span>
            <h2>${escapeHtml(material.title)}</h2>
          </div>
          <div class="plan-list">
            ${material.plans
              .map(
                (plan) => `
                  <div class="plan-row">
                    <div>
                      <strong>${escapeHtml(plan.name)}</strong>
                      <span>${escapeHtml(plan.price)}</span>
                    </div>
                    <p>${escapeHtml(plan.details)}</p>
                  </div>
                `
              )
              .join("")}
          </div>
          <p class="membership-note">${escapeHtml(material.note)}</p>
        </div>
      </article>
    `;
  }

  if (material.kind === "email") {
    return `
      <article class="daily-material email-card" aria-label="E-mail from ${escapeHtml(
        material.sender
      )}">
        <div class="mail-toolbar">
          <span></span><span></span>
          <div class="mail-search"></div>
        </div>
        <div class="email-paper">
          <div class="email-heading">
            <div class="email-avatar" aria-hidden="true">${escapeHtml(
              material.sender.charAt(0)
            )}</div>
            <div>
              <strong>${escapeHtml(material.sender)}</strong>
              <span>to ${escapeHtml(material.recipient)}</span>
            </div>
          </div>
          <p>Hi ${escapeHtml(material.recipient)},</p>
          ${material.paragraphs
            .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
            .join("")}
          <p class="email-signoff">Thanks,<br /><strong>${escapeHtml(
            material.sender
          )}</strong></p>
          <span class="attachment-pill">Attached résumés</span>
        </div>
      </article>
    `;
  }

  if (material.kind === "article") {
    return `
      <article class="daily-material article-card">
        <div class="article-kicker">CAMPUS CULTURE</div>
        <h2>${escapeHtml(material.title)}</h2>
        <div class="article-rule"></div>
        ${material.paragraphs
          .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
          .join("")}
        <div class="article-quotes">
          ${material.quotes
            .map(
              (quote) => `
                <blockquote>
                  “${escapeHtml(quote.text)}”
                  <cite>— ${escapeHtml(quote.attribution)}</cite>
                </blockquote>
              `
            )
            .join("")}
        </div>
        <div class="article-flourish" aria-hidden="true">● ◌ ●</div>
      </article>
    `;
  }

  if (material.kind === "catalog") {
    return `
      <article class="daily-material catalog-card">
        <header class="catalog-header">
          <span></span>
          <h2>${escapeHtml(material.title)}</h2>
          <span></span>
        </header>
        <p class="catalog-schedule">${escapeHtml(material.schedule)}</p>
        <div class="course-list">
          ${material.courses
            .map(
              (course) => `
                <section class="course-entry">
                  <h3>${escapeHtml(course.title)}</h3>
                  <p>${escapeHtml(course.description)}</p>
                  <div class="course-sections">
                    ${course.sections
                      .map((section) => `<span>${escapeHtml(section)}</span>`)
                      .join("")}
                  </div>
                </section>
              `
            )
            .join("")}
        </div>
      </article>
    `;
  }

  return `<p class="material-error">This reading material could not be displayed.</p>`;
}

function revealCurrentAnswer(set, question) {
  if (set.type === "word-completion") {
    const inputs = [...document.querySelectorAll(".word-input")];
    inputs.forEach((input) => {
      input.value = input.dataset.answer;
      input.classList.add("correct");
      input.classList.remove("incorrect");
    });
    const feedback = document.querySelector("#word-feedback");
    if (feedback) {
      feedback.className = "feedback good";
      feedback.textContent = "The missing letters are shown above.";
    }
    state.checked = true;
    return;
  }

  state.checked = true;
  document.querySelectorAll(".choice").forEach((choice) => {
    const index = Number(choice.dataset.choiceIndex);
    choice.classList.toggle("correct", index === question.answer);
    choice.classList.remove("incorrect");
  });
  const explanationSlot = document.querySelector("#explanation-slot");
  if (explanationSlot) {
    explanationSlot.innerHTML = `
      <p class="explanation"><strong>Correct answer shown.</strong>
      ${question.explanation}</p>
    `;
  }
}

function bindQuestionEvents(set, question, test, totalQuestions) {
  document.querySelector("#replay-audio")?.addEventListener("click", () => {
    listeningAudio.currentTime = 0;
    listeningAudio.play().catch(() => {});
  });

  document.querySelector("#show-answer")?.addEventListener("click", () => {
    revealCurrentAnswer(set, question);
  });

  document.querySelector("#review-question")?.addEventListener("click", (event) => {
    const isReviewed = state.reviewed.has(state.questionIndex);
    if (isReviewed) {
      state.reviewed.delete(state.questionIndex);
    } else {
      state.reviewed.add(state.questionIndex);
    }
    event.currentTarget.classList.toggle("is-reviewed", !isReviewed);
    event.currentTarget.innerHTML = `${
      isReviewed ? "Review" : "Reviewed"
    } <span aria-hidden="true">◆</span>`;
  });

  document.querySelector("#question-jump")?.addEventListener("change", (event) => {
    startTest(test.id, Number(event.currentTarget.value));
  });

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
  });

  document.querySelector("#previous-question")?.addEventListener("click", () => {
    if (state.questionIndex > 0) {
      startTest(test.id, state.questionIndex - 1);
    }
  });

  document.querySelector("#next-question")?.addEventListener("click", () => {
    if (state.questionIndex < totalQuestions - 1) {
      startTest(test.id, state.questionIndex + 1);
    } else {
      renderResults(test);
    }
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

function renderResults(test) {
  stopListeningAudio();
  const entries = flattenTestQuestions(test);
  const correct = entries.filter(
    ({ question }) => state.progress[question.id]?.correct
  ).length;

  app.innerHTML = `
    <section class="results-view">
      <div class="results-card">
        <div class="score-ring"><span>${correct}/${entries.length}</span></div>
        <p class="eyebrow">${test.title}</p>
        <h1>Practice complete.</h1>
        <p>
          You answered ${correct} of ${entries.length} correctly.
          ${correct === entries.length
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

  document.querySelector("#try-again").addEventListener("click", () =>
    startTest(test.id)
  );
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

document.querySelector("#reset-progress").addEventListener("click", () => {
  state.progress = {};
  state.reviewed.clear();
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
  renderHome();
});

bindHomeButtons();
renderHome();
