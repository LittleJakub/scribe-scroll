# Changelog

## 1.1.0 — 2026-04-19

**OpenClaw skill packaging.**

### Added
- `~/.openclaw/skills/scribe-scroll/` — OpenClaw skill for automatic discovery and invocation
- Global bin commands: `scribe-scroll-create`, `scribe-scroll-extract`
- Skill metadata and usage documentation

### Changed
- Version bumped from 1.0.0 → 1.1.0 (skill packaging is a bigger structural change)

## 1.0.0 — 2026-04-18

**Initial release.**

### Added
- `create.js` — Create new .docx documents from text content
  - `--title` document title
  - `--content` paragraph text (newline-separated)
  - `--output` output file path
  - `--heading-levels` comma-separated line numbers to render as heading level 1
- `extract.js` — Extract text from .docx files
  - `--input` source .docx file
  - `--format` output format: `text` (default) or `json`
- `edit.js` — Edit existing .docx documents *(planned)*
  - `--find` / `--replace` — global find and replace across all paragraphs
  - `--append` — add a paragraph at the end
  - `--replace-index` / `--text` — replace a specific paragraph by 1-based index
  - *Blocked in v1: the `docx` library (v9+) only supports document creation, not reading. Requires jszip/xmldom or docxtemplater integration.*
- MIT license
- Full README with usage examples
- Node 18+ engine requirement

### Notes
- Dependencies: `docx` (creation) + `mammoth` (extraction)
- No external tool requirements (LibreOffice, Pandoc, Python)
- CLI interface — designed for programmatic use via `exec` calls
