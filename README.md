# Readwell

A dependency-free reading-practice prototype covering three question formats:

1. Complete missing letters in context
2. Read everyday visual material and answer multiple-choice questions
3. Read an academic passage and answer multiple-choice questions

## Run it

Open `index.html` directly in a browser, or start any static file server in this
folder. For example:

```powershell
npx serve .
```

No database or account is required. Progress is stored in the browser with
`localStorage`.

## Add questions

Question content lives in `questions.js`. Each set declares a `type`, and the
interface selects the appropriate renderer:

- `word-completion`
- `visual-mcq`
- `passage-mcq`

The PDF import step can later transform extracted questions into this same data
shape. Original PDFs and images should remain as files; only the structured
question content needs to be converted.
