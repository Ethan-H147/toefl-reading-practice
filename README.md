# TOEFL Training

A dependency-free TOEFL reading and listening mock-test prototype. All current
questions are presented as one continuous **TOEFL Practice Set 1**.

Reading practice includes:

1. Complete missing letters in context
2. Read everyday materials and answer multiple-choice questions
3. Read academic passages and answer multiple-choice questions

Listening practice is scaffolded for:

1. Listen and choose a response
2. Short conversations
3. Announcements and academic talks

Listening materials support both one-clip/one-question tasks and shared audio
used by several multiple-choice questions. MP3 sources and question data can be
added independently.

The testing window uses an English-only exam layout with Home, Show Answer,
Review, Back, and Next controls. It tracks progress across task-type boundaries
without splitting the learner into separate practice cards.

## Run it

Open `index.html` directly in a browser, or start any static file server in this
folder. For example:

```powershell
npx serve .
```

No database or account is required. Progress is stored in the browser with
`localStorage`.

## Add questions

Question content lives in `questions.js`. Each task module declares a `type`,
and modules with questions are automatically aggregated into Practice Set 1:

- `word-completion`
- `visual-mcq`
- `passage-mcq`
- `listening-response`
- `listening-conversation`
- `listening-talk`

The PDF import step can later transform extracted questions into this same data
shape. Original PDFs and images should remain as files; only the structured
question content needs to be converted.
