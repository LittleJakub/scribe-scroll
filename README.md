# 📜 scribe scrOll

**Create, edit, and extract text from .docx files. One library, three scripts, zero fuss.**

You've got documents to generate programmatically. Word files, reports, templates — stuff that needs to exist but isn't a blog post or a config. scribe scrOll handles .docx creation, text editing, and content extraction with a minimal Node.js wrapper around the [`docx`](https://github.com/dolanmiu/docx) library.

Three commands. No Python. No LibreOffice. No Pandoc. Just `node` and `npm`.

---

## What's inside

| Script | Purpose |
|---|---|
| `src/create.js` | Create new .docx from text content with headings and paragraphs |
| `src/extract.js` | Extract plain text or JSON from an existing .docx |
| (planned) | Find-and-replace, append paragraphs, indexed edits |

---

## Install

```bash
npm install scribe-scroll
# or
npm install git+https://github.com/LittleJakub/scribe-scroll.git
```

Or use directly from source:

```bash
git clone https://github.com/LittleJakub/scribe-scroll.git
cd scribe-scroll
npm install
```

---

## Usage

### Create a document

```bash
node src/create.js \
  --title "My Report" \
  --content "Introduction\n\nThis is the body.\n\nConclusion" \
  --output report.docx
```

With headings (positions 1 and 3 become heading level 1):

```bash
node src/create.js \
  --title "Outline" \
  --content "Chapter 1\n\nDetails\n\nChapter 2\n\nDetails" \
  --heading-levels "1,3" \
  --output outline.docx
```

### Extract text from a document

Plain text output:

```bash
node src/extract.js --input report.docx
```

JSON output (array of paragraph strings):

```bash
node src/extract.js --input report.docx --format json
```

### Edit a document (planned)

Find and replace throughout:

```bash
node src/edit.js \
  --input old.docx \
  --find "Old Company Name" \
  --replace "New Company Name" \
  --output new.docx
```

Append a paragraph at the end:

```bash
node src/edit.js \
  --input doc.docx \
  --append "Added at the end" \
  --output doc.docx
```

Replace a specific paragraph (1-indexed):

```bash
node src/edit.js \
  --input doc.docx \
  --replace-index 2 \
  --text "Replaced paragraph 2" \
  --output doc.docx
```

*Edit functionality planned for a future release.*

---

## Architecture

```
src/
  create.js    # Document creation via docx library
  extract.js   # Text extraction from .docx
  edit.js      # TODO: find/replace, append, indexed edits (requires read-capable .docx library)
package.json   # Dependencies and metadata
```

- **Dependencies**: [`docx`](https://github.com/dolanmiu/docx) (MIT) for creation, [`mammoth.js`](https://github.com/mwillcox/mammoth) (BSD-2-Clause) for extraction
- **No external tools**: pure Node.js, no Python, no LibreOffice, no system dependencies
- **Node 18+**: uses modern Node.js features

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Built by

Jakub · [hiVe stack](https://github.com/LittleJakub)
