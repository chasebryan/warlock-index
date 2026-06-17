# Site Layer

**UNCLASSIFIED//OPEN SOURCE**

The Site Layer publishes the static WARLOCK-INDEX website and navigation
surface for GitHub Pages-style hosting. It is intentionally static: the
navigator terminal uses local client-side routing data and does not require a
server, API key, or browser-exposed model credential.

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

The browser and bookmark icon uses the same compass-style navigator mark shown
in the site header. Keep `favicon.svg`, `apple-touch-icon.png`, and
`site.webmanifest` published at the site root.

The homepage keeps `WARLOCK-INDEX` as the canonical brand and includes
structured-data aliases for `Warlock-Index`, `warlock-index`, and
`warlock index` to support search discovery for common phrase variants.
The static search UI supports `?q=` URLs for structured `SearchAction`
metadata. A recent updates block and Atom feed (`/feed.xml`) aid ongoing discovery.

The `workspace/` path publishes the installable WARLOCK-INDEX Workspace. It has
a scoped manifest and service worker so installing from `/workspace/` opens the
workspace instead of the homepage.
The workspace can generate a self-contained reader file for the selected record
or a reader packet from queued records. Keep those exports calm, print-friendly,
and free of the full site navigation shell so downloaded files remain readable
from disk.

Analytics and visitor reporting are configured outside the committed website
assets. Do not add public counters, provider-specific tracking snippets, API
tokens, account IDs, provider names, or private dashboard data unless that
exposure is explicitly approved for a future site change.

The legacy `wi/` path is a redirect-only compatibility route. Keep it lightweight
so old bookmarks move to `/workspace/` without presenting a second app identity.

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

Google Search Console ownership verification uses the static HTML file
`google1f03f3c72b45053d.html` at the site root. Keep this file published after
verification so ownership remains valid.

The repository also includes an IndexNow key file and submitter. The active
key file is `59c2fae48b47cbb2869f673165235550.txt`; keep its contents exactly
equal to the key value.

```sh
node site/submit-indexnow.mjs --dry-run
node site/submit-indexnow.mjs --live
```

The `Submit IndexNow` workflow runs after a successful site deploy and submits
the live sitemap URLs to the IndexNow endpoint for Bing-family discovery.

Current site requirements:

- Browse by theater, actor, domain, and product date.
- Show information cutoff and confidence at the top of each product.
- Preserve source lists.
- Make prior versions discoverable.
- Provide "Cite" support and Atom feed (/feed.xml).
- Avoid visual styling that makes the repository look like a marketing page.

## Assets

- `images/warlock-index-emblem.jpeg` is the preferred warlock artwork slot for the hero.
