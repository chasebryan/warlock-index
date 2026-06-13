# Site Layer

**UNCLASSIFIED//OPEN SOURCE**

This folder contains the static Warlock Index website/navigation layer for
GitHub Pages-style hosting. It is intentionally static: the navigator terminal
uses local client-side routing data and does not require a server, API key, or
browser-exposed model credential.

## Build

Run the document-library build after changing files under `docs/`:

```sh
node site/build-library.mjs
```

The build renders Markdown products into `site/library/` and refreshes
`site/corpus.js` for the homepage navigator.

Current site requirements:

- Browse by theater, actor, domain, and product date.
- Show information cutoff and confidence at the top of each product.
- Preserve source lists.
- Make prior versions discoverable.
- Avoid visual styling that makes the repository look like a marketing page.

## Assets

- `images/warlock-index-emblem.jpeg` is the preferred warlock artwork slot for the hero.
