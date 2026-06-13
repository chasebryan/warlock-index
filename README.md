# Site Layer

**UNCLASSIFIED//OPEN SOURCE**

This folder contains the static Warlock-Index website/navigation layer for
GitHub Pages-style hosting. It is intentionally static: the navigator terminal
uses local client-side routing data and does not require a server, API key, or
browser-exposed model credential.

## Build

Run the document-library build after changing files under `docs/`:

```sh
node site/build-library.mjs
```

The build renders Markdown products into `site/library/`, refreshes
`site/corpus.js` for the homepage navigator, and updates search-discovery
files:

- `site/robots.txt` permits crawler access and points to the sitemap.
- `site/sitemap.xml` lists the homepage and generated documentation pages.

Generated library pages include canonical URLs, index/follow robots metadata,
and social preview metadata using `https://www.warlock-index.org/` as the
canonical site origin.

Before finishing a docs change, run the drift check:

```sh
node site/check-library.mjs
```

The check rebuilds the library and fails if that rebuild changes generated
website output. When it fails, review and commit the refreshed
`site/library/`, `site/corpus.js`, `site/robots.txt`, and `site/sitemap.xml`
changes with the docs update.

After deployment and HTTPS certificate provisioning, submit
`https://www.warlock-index.org/sitemap.xml` through search engine webmaster
tools for faster discovery.

Current site requirements:

- Browse by theater, actor, domain, and product date.
- Show information cutoff and confidence at the top of each product.
- Preserve source lists.
- Make prior versions discoverable.
- Avoid visual styling that makes the repository look like a marketing page.

## Assets

- `images/warlock-index-emblem.jpeg` is the preferred warlock artwork slot for the hero.
