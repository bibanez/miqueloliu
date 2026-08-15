# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The official website of composer Miquel Oliu — a **static, trilingual (Catalan / Spanish / English) multi-page site** built with vanilla HTML, CSS, and JavaScript. There is **no build step, no framework, and no package.json**: the files in the repo root are served as-is.

The site language is Catalan (`ca`); content, comments, and commit messages are predominantly written in Catalan.

## Develop & deploy

```bash
# Serve locally — any static server works; open http://localhost:8000
python3 -m http.server 8000

# Deploy to Cloudflare (assets directory is "./", configured in wrangler.jsonc)
npx wrangler deploy
```

There are no tests, linters, or build tooling. Changes are verified by opening the pages in a browser and toggling the three languages.

`documentacio/` holds Miquel's working materials (source documents) and is gitignored — never publish or reference it from the site.

## Architecture

Every HTML page is a thin shell. It declares empty `<div id="nav-container">` / `<div id="footer-container">` mount points and loads scripts **in a fixed order** at the end of `<body>`:

```
translations.js → i18n.js → [data/works.js, orchestra.js for catalogue] → components.js → main.js
```

This order matters — each script depends on globals defined by the previous ones (`TRANSLATIONS`, `I18n`, `WORKS`, `Orchestra`, `Components`). All modules are IIFEs exposing a single global (no imports/exports).

- **`js/components.js`** (`Components`) — injects the shared nav + footer into every page, detects the active page from the URL filename (`activePage()`), wires the mobile menu, then calls `I18n.init()`. Adding a page means teaching `activePage()` its slug.
- **`js/main.js`** — the `DOMContentLoaded` entry point. Calls `Components.init()`, then dispatches to a page-specific initialiser via the `PageInit[pageName]` convention (see below). Also owns home-page scroll behaviour (condensing hero nav, reveal-on-scroll).
- **`js/i18n.js`** (`I18n`) — the translation engine (see below).
- **`js/data/works.js`** (`WORKS`) — the entire work catalogue as static data. The schema is documented in a header comment in that file; honour it when editing.
- **`js/orchestra.js`** (`Orchestra`) — parses instrumentation formulas like `[3.2.3.2.-2.2.2.1.-timp.+3 perc. –arp. -celesta -12.12.10.8.6.]` and renders an interactive SVG seating chart. `Orchestra.parse()` returns `null` for anything not a well-formed formula, so callers fall back to plain text.

### Work detail pages

Programme notes are generated from the working Word files in `documentacio/obres/` by `scripts/generate-work-pages.py`. The source folder remains gitignored; generated static pages live in `obres/`, while `js/data/work-info.js` records their available source languages and routes. The catalogue uses that metadata to render `+info` as a link only when a note has at least one Catalan, Spanish, or English source, and as a disabled label otherwise.

The language in the shared navigation controls the site chrome. Detail pages have a second, source-language tab strip for Catalan, Spanish, English, French, German, Euskera, or any language added to the generator manifest. When the shared language changes, the detail tab follows it when that source language exists; otherwise the reader's selected note language is preserved.

Run the generator with the bundled Python runtime after source documents change:

```bash
DOC_PY=/Users/vicar/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3
"$DOC_PY" scripts/generate-work-pages.py
```

Detail pages include `<base href="../">` so the shared root-level components continue to work from the nested `obres/` URLs.

### Page-specific logic: the `PageInit` pattern

A page that needs its own JS defines a global `PageInit` object **inline before loading `main.js`**, keyed by the page name from `activePage()` (e.g. `PageInit.catalogue = () => {...}`). `main.js` invokes the matching function after components are mounted. `catalogue.html` is the only current example: it renders `WORKS` into collapsible categories and re-renders on language change via `I18n.onChange()`.

## Internationalization — two coexisting patterns

1. **Keyed UI strings.** Short labels live in `TRANSLATIONS[lang]` in `translations.js`. In HTML, use `data-i18n="section.key"` (sets `textContent`) or `data-i18n-html="section.key"` (sets `innerHTML`, for multi-paragraph/markup values). `I18n.apply()` walks these attributes. **Every key must exist under all three languages** (`ca`, `es`, `en`).
2. **Inline prose blocks.** Long-form content (biography, homepage intro) is written directly in HTML as three sibling `<div class="lang-block" lang="ca|es|en">` blocks. Only the block matching `html[lang]` is shown — **visibility is controlled entirely by CSS**, not JS. The `<html lang>` attribute is set early via an inline script in `<head>` to avoid a flash of Catalan before `i18n.js` runs.

Language is persisted in `localStorage` under `miqueloliu_lang`; the switcher buttons live in the nav.

### Data-driven localized text

Inside data (`WORKS`) and code, a localizable value is **either a plain string or a `{ca, es, en}` object** resolved by `I18n.loc(value)` with fallback to `ca`. Such text supports lightweight markup rendered by `I18n.fmt()`: `*bold*` → `<strong>`, `_italic_` → `<em>`, newline → `<br>`. Use `I18n.fmt(I18n.loc(v))` to resolve-then-format.

## Conventions

- Plain ES (no transpilation) targeting modern browsers — `const`/arrow functions/template literals/`IntersectionObserver` are used freely.
- Respect `prefers-reduced-motion` for any new animation (existing reveal/stagger code already guards on it).
- When adding a work category or page, update both the data/markup **and** the corresponding translation keys in all three languages, or the UI will show raw key strings.
