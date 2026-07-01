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
const RECORDING_DB_NAME = "toefl-training-recordings-v1";
const RECORDING_STORE_NAME = "recordings";
let speakingRecorder = null;
let speakingChunks = [];
let speakingTimer = null;
let speakingRecordingStartedAt = null;
let activeRecordingUrl = null;

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
    ...(window.LISTENING_SETS || []),
    ...(window.WRITING_SETS || []),
    ...(window.SPEAKING_SETS || [])
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
    "listening-module-2",
    "writing-build-sentence",
    "writing-email",
    "writing-academic-discussion",
    "speaking"
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
    "listening-talk": "Listen to the talk and answer the question",
    "sentence-builder": "Make an appropriate sentence",
    "email-writing": "Write an email",
    "academic-discussion": "Write for an academic discussion",
    "speaking-response": "Record your spoken response"
  };
  return headings[module.type] || "Answer the question";
}

function getQuestionTaskName(module, question) {
  return question?.taskName || module.title;
}

function getSectionName(module) {
  const names = {
    reading: "Reading",
    listening: "Listening",
    writing: "Writing",
    speaking: "Speaking"
  };
  return names[module.section] || "Practice";
}

function getQuestionLayoutClass(module) {
  if (module.type === "word-completion") return "word-layout";
  if (
    module.type === "sentence-builder" ||
    module.type === "email-writing" ||
    module.type === "academic-discussion"
  ) {
    return "writing-layout";
  }
  return "";
}

function parkListeningAudio() {
  if (listeningAudio.parentNode !== audioDock) {
    audioDock.appendChild(listeningAudio);
  }
}

function stopSpeakingRecorder() {
  if (speakingRecorder?.state === "recording") {
    speakingRecorder.stop();
  } else {
    speakingChunks = [];
  }
  speakingRecorder = null;
  if (speakingTimer) {
    clearInterval(speakingTimer);
    speakingTimer = null;
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
  stopSpeakingRecorder();
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
  const layoutClass = getQuestionLayoutClass(module);
  const sectionName = getSectionName(module);
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
                  const entrySection = getSectionName(entryModule);
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

      <div class="question-layout ${layoutClass}">
        ${renderQuestionContent(module, question)}
      </div>
    </section>
  `;

  stopSpeakingRecorder();
  if (module.section === "listening") {
    mountListeningAudio(module, question);
  } else {
    stopListeningAudio();
  }
  bindQuestionEvents(module, question, test, entries.length);
  focusApp();
}

function renderQuestionContent(set, question) {
  if (set.type === "speaking-response") {
    return renderSpeakingContent(set, question);
  }

  if (
    set.type === "sentence-builder" ||
    set.type === "email-writing" ||
    set.type === "academic-discussion"
  ) {
    return renderWritingContent(set, question);
  }

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



function renderSpeakingContent(set, question) {
  return `
    <article class="content-panel speaking-prompt-panel">
      <p class="instruction">${escapeHtml(question.instruction)}</p>
      ${
        question.context
          ? `<div class="speaking-context">${escapeHtml(question.context)}</div>`
          : ""
      }
      <div class="speaking-prompt-card">
        <div>
          <p>${escapeHtml(set.eyebrow)}</p>
          <h2>${escapeHtml(question.prompt)}</h2>
        </div>
        <audio
          class="speaking-audio"
          controls
          preload="metadata"
          controlslist="nodownload"
          src="${escapeHtml(question.audioSrc)}"
        ></audio>
        <p class="speaking-note">
          Listen first, then record your response. Your recording is saved only in this browser.
        </p>
      </div>
      <div class="speaking-transcript" id="speaking-transcript" hidden>
        <strong>Prompt transcript</strong>
        <p>${escapeHtml(question.transcript || "Transcript not available yet.")}</p>
      </div>
    </article>
    <aside class="answer-panel speaking-record-panel">
      <p class="instruction">Your speaking response</p>
      <div class="recording-orb" id="recording-orb" aria-hidden="true"></div>
      <p class="recording-status" id="recording-status">Ready to record.</p>
      <p class="recording-timer" id="recording-timer">0:00</p>
      <div class="speaking-actions">
        <button class="primary-button" id="start-recording" type="button">Start recording</button>
        <button class="secondary-button" id="stop-recording" type="button" disabled>Stop</button>
      </div>
      <div class="saved-recording" id="saved-recording">
        <p class="feedback">Checking for saved recording...</p>
      </div>
    </aside>
  `;
}

function openRecordingDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(RECORDING_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(RECORDING_STORE_NAME)) {
        db.createObjectStore(RECORDING_STORE_NAME, { keyPath: "questionId" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function putRecording(questionId, recording) {
  const db = await openRecordingDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(RECORDING_STORE_NAME, "readwrite");
    transaction.objectStore(RECORDING_STORE_NAME).put({
      questionId,
      ...recording,
      updatedAt: new Date().toISOString()
    });
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

async function getRecording(questionId) {
  const db = await openRecordingDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(RECORDING_STORE_NAME, "readonly");
    const request = transaction.objectStore(RECORDING_STORE_NAME).get(questionId);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
}

async function deleteRecording(questionId) {
  const db = await openRecordingDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(RECORDING_STORE_NAME, "readwrite");
    transaction.objectStore(RECORDING_STORE_NAME).delete(questionId);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

async function clearAllRecordings() {
  const db = await openRecordingDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(RECORDING_STORE_NAME, "readwrite");
    transaction.objectStore(RECORDING_STORE_NAME).clear();
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

function formatElapsed(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remaining = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remaining}`;
}

function renderSavedRecording(recording) {
  const slot = document.querySelector("#saved-recording");
  if (!slot) return;

  if (activeRecordingUrl) {
    URL.revokeObjectURL(activeRecordingUrl);
    activeRecordingUrl = null;
  }

  if (!recording?.blob) {
    slot.innerHTML = `<p class="feedback">No saved recording yet.</p>`;
    return;
  }

  activeRecordingUrl = URL.createObjectURL(recording.blob);
  slot.innerHTML = `
    <div class="saved-recording-card">
      <strong>Saved recording</strong>
      <span>${recording.duration ? `${recording.duration}s` : "Saved"} · ${new Date(
        recording.updatedAt
      ).toLocaleString()}</span>
      <audio controls src="${activeRecordingUrl}"></audio>
      <button class="secondary-button" id="delete-recording" type="button">Delete recording</button>
    </div>
  `;
}

async function loadSavedRecording(question) {
  try {
    const recording = await getRecording(question.id);
    renderSavedRecording(recording);
  } catch {
    const slot = document.querySelector("#saved-recording");
    if (slot) {
      slot.innerHTML = `<p class="feedback try-again">Could not load saved recording in this browser.</p>`;
    }
  }
}

async function bindSpeakingEvents(question) {
  if (question.type && question.type !== "speaking-response") return;
  const startButton = document.querySelector("#start-recording");
  const stopButton = document.querySelector("#stop-recording");
  const status = document.querySelector("#recording-status");
  const timer = document.querySelector("#recording-timer");
  const orb = document.querySelector("#recording-orb");
  if (!startButton || !stopButton) return;

  const bindDeleteButton = () => {
    document.querySelector("#delete-recording")?.addEventListener("click", async () => {
      await deleteRecording(question.id);
      saveWritingProgress(question.id, {
        completed: false,
        correct: null,
        hasRecording: false
      });
      renderSavedRecording(null);
    });
  };

  await loadSavedRecording(question);
  bindDeleteButton();

  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    startButton.disabled = true;
    status.textContent =
      "Recording is not supported in this browser. Try Chrome or Edge.";
    return;
  }

  startButton.addEventListener("click", async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      speakingChunks = [];
      const recorder = new MediaRecorder(stream);
      speakingRecorder = recorder;
      speakingRecordingStartedAt = Date.now();

      recorder.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0) speakingChunks.push(event.data);
      });

      recorder.addEventListener("stop", async () => {
        stream.getTracks().forEach((track) => track.stop());
        const mimeType = recorder.mimeType || "audio/webm";
        const blob = new Blob(speakingChunks, { type: mimeType });
        const duration = Math.max(
          1,
          Math.round((Date.now() - speakingRecordingStartedAt) / 1000)
        );
        await putRecording(question.id, { blob, mimeType, duration });
        speakingChunks = [];
        saveWritingProgress(question.id, {
          completed: true,
          correct: null,
          hasRecording: true,
          recordingDuration: duration
        });
        status.textContent = "Recording saved.";
        startButton.disabled = false;
        stopButton.disabled = true;
        orb.classList.remove("is-recording");
        if (speakingTimer) clearInterval(speakingTimer);
        timer.textContent = formatElapsed(duration);
        renderSavedRecording(await getRecording(question.id));
        bindDeleteButton();
      });

      recorder.start();
      status.textContent = "Recording...";
      startButton.disabled = true;
      stopButton.disabled = false;
      orb.classList.add("is-recording");
      timer.textContent = "0:00";
      speakingTimer = setInterval(() => {
        const elapsed = Math.round((Date.now() - speakingRecordingStartedAt) / 1000);
        timer.textContent = formatElapsed(elapsed);
      }, 500);
    } catch {
      status.textContent =
        "Microphone permission was blocked or unavailable. Please allow microphone access.";
    }
  });

  stopButton.addEventListener("click", () => {
    if (speakingRecorder?.state === "recording") {
      speakingRecorder.stop();
      status.textContent = "Saving recording...";
    }
  });
}

function getSavedWriting(questionId) {
  return state.progress[questionId] || {};
}

function normalizeSentence(value) {
  return String(value)
    .toLowerCase()
    .replace(/[?!.,;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSentenceFromOrder(question, order) {
  const builtWords = order
    .map((index) => question.words[index])
    .filter(Boolean)
    .join(" ");
  return [question.responsePrefix, builtWords]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+([?!.,;:])/g, "$1");
}

function renderSentenceBuilderPieces(question, order) {
  const used = new Set(order);
  const currentSentence = buildSentenceFromOrder(question, order);
  return `
    <div class="sentence-response" id="sentence-response" aria-live="polite">
      ${question.responsePrefix
        ? `<span class="sentence-fixed">${escapeHtml(question.responsePrefix)}</span>`
        : ""}
      ${
        order.length
          ? order
              .map(
                (wordIndex, position) => `
                  <button
                    class="sentence-token"
                    type="button"
                    data-response-position="${position}"
                    aria-label="Remove ${escapeHtml(question.words[wordIndex])}"
                  >
                    ${escapeHtml(question.words[wordIndex])}
                  </button>
                `
              )
              .join("")
          : `<span class="sentence-placeholder">Click the word boxes below to build your sentence.</span>`
      }
    </div>
    <input type="hidden" id="sentence-current" value="${escapeHtml(currentSentence)}" />
    <div class="word-bank" id="word-bank">
      ${question.words
        .map((word, index) =>
          used.has(index)
            ? ""
            : `
              <button class="word-tile" type="button" data-word-index="${index}">
                ${escapeHtml(word)}
              </button>
            `
        )
        .join("")}
    </div>
  `;
}

function renderWritingContent(set, question) {
  const saved = getSavedWriting(question.id);

  if (set.type === "sentence-builder") {
    const order = Array.isArray(saved.responseOrder) ? saved.responseOrder : [];
    return `
      <article class="content-panel writing-prompt-panel">
        <p class="instruction">${escapeHtml(question.instruction)}</p>
        <div class="sentence-context">
          <span>Conversation sentence</span>
          <p>${escapeHtml(question.context)}</p>
        </div>
      </article>
      <aside class="answer-panel writing-answer-panel">
        <p class="instruction">Move the words in the boxes to create a grammatical sentence.</p>
        <div class="sentence-builder" id="sentence-builder-area">
          ${renderSentenceBuilderPieces(question, order)}
        </div>
        <p class="feedback" id="sentence-feedback" aria-live="polite"></p>
        <div class="answer-actions writing-actions">
          <button class="secondary-button" id="clear-sentence" type="button">Clear</button>
          <button class="primary-button" id="check-sentence" type="button">Check sentence</button>
        </div>
      </aside>
    `;
  }

  if (set.type === "email-writing") {
    return `
      <article class="content-panel writing-prompt-panel">
        <p class="instruction">Read the information and write an email.</p>
        <div class="writing-task-card">
          <div class="email-memo-head">
            <span>To: ${escapeHtml(question.to)}</span>
            <span>Subject: ${escapeHtml(question.subject)}</span>
          </div>
          <p>${escapeHtml(question.scenario)}</p>
          <h2>In your email, do the following:</h2>
          <ul>
            ${question.requirements
              .map((item) => `<li>${escapeHtml(item)}</li>`)
              .join("")}
          </ul>
          <p class="writing-note">${escapeHtml(question.note)}</p>
        </div>
      </article>
      <aside class="answer-panel writing-answer-panel">
        ${renderWritingTextarea(question, saved.response || "")}
      </aside>
    `;
  }

  return `
    <article class="content-panel writing-prompt-panel">
      <p class="instruction">Read the professor's question and student responses. Then make your contribution.</p>
      <div class="discussion-board">
        <article class="professor-post">
          <span>${escapeHtml(question.professor)}</span>
          <h2>${escapeHtml(question.topic)}</h2>
          <p>${escapeHtml(question.prompt)}</p>
        </article>
        <div class="student-posts">
          ${question.studentPosts
            .map(
              (post) => `
                <article>
                  <strong>${escapeHtml(post.name)}</strong>
                  <p>${escapeHtml(post.text)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </article>
    <aside class="answer-panel writing-answer-panel">
      ${renderWritingTextarea(question, saved.response || "")}
    </aside>
  `;
}

function renderWritingTextarea(question, savedText) {
  const wordCount = countWords(savedText);
  return `
    <label class="writing-response-label" for="writing-response">Your Response:</label>
    <textarea
      id="writing-response"
      class="writing-response"
      data-question-id="${escapeHtml(question.id)}"
      placeholder="${escapeHtml(question.placeholder || "Type your response here...")}"
      spellcheck="true"
    >${escapeHtml(savedText)}</textarea>
    <div class="writing-response-meta">
      <span id="writing-save-status">Draft saved in this browser</span>
      <span><strong id="writing-word-count">${wordCount}</strong> words</span>
    </div>
    <p class="feedback" id="writing-feedback" aria-live="polite">
      This response will be stored locally. Grading can be added later.
    </p>
  `;
}

function countWords(value) {
  const words = String(value).trim().match(/\b[\w'-]+\b/g);
  return words ? words.length : 0;
}

function saveWritingProgress(questionId, data) {
  const previous = state.progress[questionId] || {};
  state.progress[questionId] = {
    ...previous,
    ...data,
    updatedAt: new Date().toISOString()
  };
  saveProgress();
}

function updateSentenceBuilder(question, order) {
  const area = document.querySelector("#sentence-builder-area");
  if (!area) return;
  area.innerHTML = renderSentenceBuilderPieces(question, order);
  const response = buildSentenceFromOrder(question, order);
  saveWritingProgress(question.id, {
    completed: order.length > 0,
    correct: false,
    response,
    responseOrder: order
  });
  bindSentenceBuilderButtons(question, order);
}

function bindSentenceBuilderButtons(question, order) {
  document.querySelectorAll(".word-tile").forEach((tile) => {
    tile.addEventListener("click", () => {
      order.push(Number(tile.dataset.wordIndex));
      updateSentenceBuilder(question, order);
    });
  });

  document.querySelectorAll(".sentence-token").forEach((token) => {
    token.addEventListener("click", () => {
      order.splice(Number(token.dataset.responsePosition), 1);
      updateSentenceBuilder(question, order);
    });
  });
}

function bindWritingEvents(set, question) {
  if (set.type === "sentence-builder") {
    const saved = getSavedWriting(question.id);
    const order = Array.isArray(saved.responseOrder)
      ? [...saved.responseOrder]
      : [];
    bindSentenceBuilderButtons(question, order);

    document.querySelector("#clear-sentence")?.addEventListener("click", () => {
      order.splice(0, order.length);
      updateSentenceBuilder(question, order);
      const feedback = document.querySelector("#sentence-feedback");
      if (feedback) {
        feedback.className = "feedback";
        feedback.textContent = "";
      }
    });

    document.querySelector("#check-sentence")?.addEventListener("click", () => {
      const response = buildSentenceFromOrder(question, order);
      const isCorrect =
        normalizeSentence(response) === normalizeSentence(question.answer);
      const feedback = document.querySelector("#sentence-feedback");
      if (feedback) {
        feedback.className = `feedback ${isCorrect ? "good" : "try-again"}`;
        feedback.textContent = isCorrect
          ? "Nice — that sentence is grammatical."
          : "Not quite. Try changing the word order.";
      }
      saveWritingProgress(question.id, {
        completed: true,
        correct: isCorrect,
        response,
        responseOrder: order
      });
    });
    return;
  }

  const textarea = document.querySelector("#writing-response");
  if (!textarea) return;
  const updateDraft = () => {
    const response = textarea.value;
    document.querySelector("#writing-word-count").textContent = countWords(response);
    document.querySelector("#writing-save-status").textContent = "Draft saved in this browser";
    saveWritingProgress(question.id, {
      completed: response.trim().length > 0,
      correct: null,
      response,
      wordCount: countWords(response)
    });
  };
  textarea.addEventListener("input", updateDraft);
  textarea.addEventListener("blur", updateDraft);
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
  if (set.type === "speaking-response") {
    const transcript = document.querySelector("#speaking-transcript");
    if (transcript) {
      transcript.hidden = false;
    }
    return;
  }

  if (set.type === "sentence-builder") {
    const order = question.answerWords.map((answerWord) =>
      question.words.findIndex(
        (word, index) =>
          normalizeSentence(word) === normalizeSentence(answerWord) &&
          !question.answerWords
            .slice(0, question.answerWords.indexOf(answerWord))
            .some((previousWord) => normalizeSentence(previousWord) === normalizeSentence(word))
      )
    );
    const saferOrder = [];
    const used = new Set();
    question.answerWords.forEach((answerWord) => {
      const index = question.words.findIndex(
        (word, candidateIndex) =>
          !used.has(candidateIndex) &&
          normalizeSentence(word) === normalizeSentence(answerWord)
      );
      if (index !== -1) {
        saferOrder.push(index);
        used.add(index);
      }
    });
    updateSentenceBuilder(question, saferOrder.length ? saferOrder : order);
    const feedback = document.querySelector("#sentence-feedback");
    if (feedback) {
      feedback.className = "feedback good";
      feedback.textContent = `Correct sentence: ${question.answer}`;
    }
    saveWritingProgress(question.id, {
      completed: true,
      correct: true,
      response: question.answer,
      responseOrder: saferOrder
    });
    state.checked = true;
    return;
  }

  if (set.type === "email-writing" || set.type === "academic-discussion") {
    const feedback = document.querySelector("#writing-feedback");
    if (feedback) {
      feedback.className = "feedback";
      feedback.textContent =
        "There is no fixed answer key for this writing task yet. The student's draft is being saved.";
    }
    return;
  }

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
  bindWritingEvents(set, question);
  if (set.type === "speaking-response") {
    bindSpeakingEvents(question);
  }

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

function recordCompletion(questionId, correct, extra = {}) {
  state.progress[questionId] = {
    ...(state.progress[questionId] || {}),
    ...extra,
    completed: true,
    correct,
    updatedAt: new Date().toISOString()
  };
  saveProgress();
}

function renderResults(test) {
  stopSpeakingRecorder();
  stopListeningAudio();
  const entries = flattenTestQuestions(test);
  const completed = entries.filter(
    ({ question }) => state.progress[question.id]?.completed
  ).length;
  const gradedEntries = entries.filter(
    ({ question }) => typeof state.progress[question.id]?.correct === "boolean"
  );
  const correct = gradedEntries.filter(
    ({ question }) => state.progress[question.id]?.correct
  ).length;

  app.innerHTML = `
    <section class="results-view">
      <div class="results-card">
        <div class="score-ring"><span>${completed}/${entries.length}</span></div>
        <p class="eyebrow">${test.title}</p>
        <h1>Practice complete.</h1>
        <p>
          You completed ${completed} of ${entries.length} questions.
          ${gradedEntries.length
            ? `For graded questions, ${correct} of ${gradedEntries.length} are correct.`
            : "Your written responses are saved for review."}
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
  clearAllRecordings().catch(() => {});
  renderHome();
});

bindHomeButtons();
renderHome();
