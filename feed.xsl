<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="/rss/channel/title"/></title>
        <link rel="icon" href="/favicon.png?v=20260617-green-press" type="image/png" sizes="180x180"/>
        <link rel="icon" href="/favicon.svg?v=20260617-green-press" type="image/svg+xml"/>
        <link rel="shortcut icon" href="/favicon.png?v=20260617-green-press" type="image/png"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
        <link rel="mask-icon" href="/favicon.svg?v=20260617-green-press" color="#006b2b"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <style>
          :root {
            color-scheme: light;
            --chrome: #c0c0c0;
            --chrome-dark: #6f6f6f;
            --chrome-light: #ffffff;
            --panel: #f7f7ef;
            --panel-soft: #ebebe3;
            --text: #090909;
            --muted: #303030;
            --dim: #5d5d55;
            --green: #006b2b;
            --purple: #551a8b;
            --line: rgba(0, 0, 0, 0.18);
            --line-purple: rgba(85, 26, 139, 0.26);
            --mono: "Courier New", Courier, monospace;
            --sans: Arial, Helvetica, sans-serif;
            --serif: Georgia, "Times New Roman", serif;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            min-width: 320px;
            background: #777;
            color: var(--text);
            font-family: var(--sans);
            line-height: 1.55;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .page-shell {
            width: min(100% - 1rem, 1720px);
            margin: 0.5rem auto 1rem;
            border: 2px solid var(--chrome);
            border-color: var(--chrome-light) var(--chrome-dark) var(--chrome-dark) var(--chrome-light);
            background: var(--chrome);
          }

          .site-header {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(280px, 390px);
            align-items: center;
            gap: 1.25rem;
            padding: 0.9rem 1rem 1rem;
            border: 0;
            border-bottom: 2px solid var(--chrome-dark);
            background: var(--panel);
          }

          .brand-panel {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            align-items: center;
            min-width: 0;
          }

          .brand-copy {
            display: grid;
            gap: 0.28rem;
            min-width: 0;
          }

          .brand-copy strong {
            overflow: hidden;
            color: var(--text);
            font-family: var(--serif);
            font-size: clamp(2.7rem, 4.9vw, 5rem);
            font-weight: 400;
            line-height: 0.95;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .brand-copy span {
            color: var(--green);
            font-family: var(--mono);
            font-size: clamp(1rem, 1.4vw, 1.28rem);
            font-weight: 700;
            text-transform: uppercase;
          }

          .brand-copy em {
            color: var(--dim);
            font-family: var(--serif);
            font-size: clamp(0.9rem, 1.1vw, 1rem);
            font-style: normal;
          }

          .status-terminal {
            justify-self: end;
            width: min(100%, 390px);
            padding: 0.85rem 1rem;
            border: 2px solid var(--chrome);
            border-color: var(--chrome-dark) var(--chrome-light) var(--chrome-light) var(--chrome-dark);
            background: #fff;
            color: var(--text);
            font-family: var(--mono);
            font-size: 0.86rem;
            text-transform: uppercase;
          }

          .status-terminal p {
            margin: 0;
          }

          .status-terminal p + p {
            margin-top: 0.28rem;
          }

          .primary-nav {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            min-height: 42px;
            padding: 0.25rem;
            border: 0;
            border-bottom: 2px solid var(--chrome-dark);
            background: var(--chrome);
            color: var(--text);
            font-family: var(--sans);
            font-size: 0.9rem;
            font-weight: 700;
            text-transform: uppercase;
          }

          .primary-nav a {
            display: grid;
            min-width: max-content;
            place-items: center;
            min-height: 30px;
            padding: 0 0.7rem;
            border: 2px solid var(--chrome);
            border-color: var(--chrome-light) var(--chrome-dark) var(--chrome-dark) var(--chrome-light);
            background: var(--chrome);
          }

          .primary-nav a:hover,
          .primary-nav a:focus-visible {
            border-color: var(--chrome-dark) var(--chrome-light) var(--chrome-light) var(--chrome-dark);
            background: var(--panel);
            color: var(--green);
            outline: none;
          }

          .primary-nav .is-active,
          .primary-nav a[aria-current="page"] {
            border-color: var(--chrome-dark) var(--chrome-light) var(--chrome-light) var(--chrome-dark);
            background: var(--panel);
            color: var(--green);
            box-shadow: inset 2px 2px 0 rgba(0, 0, 0, 0.18);
            outline: none;
          }

          .shell {
            width: min(1080px, calc(100% - 2rem));
            margin: 0 auto;
            padding: clamp(1rem, 3vw, 2rem) 0 4rem;
          }

          .feed-head {
            padding: clamp(1rem, 3vw, 1.6rem);
            border: 1px solid var(--line-purple);
            background: var(--panel);
          }

          h1 {
            max-width: 780px;
            margin: 0;
            font-family: var(--serif);
            font-size: clamp(2.2rem, 6vw, 4.2rem);
            font-weight: 700;
            line-height: 1;
          }

          .summary {
            max-width: 720px;
            margin: 1rem 0 0;
            color: var(--muted);
            font-family: var(--serif);
            font-size: 1.05rem;
          }

          .feed-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
            margin-top: 1.25rem;
            color: var(--dim);
            font-family: var(--mono);
            font-size: 0.68rem;
            font-weight: 700;
            text-transform: uppercase;
          }

          .feed-meta span {
            padding: 0.24rem 0.42rem;
            border: 1px solid var(--line);
          }

          .items {
            display: grid;
            gap: 0;
            margin-top: 1rem;
            border: 1px solid var(--line-purple);
            background: var(--panel);
          }

          .item {
            display: grid;
            gap: 0.38rem;
            padding: 1rem;
            border-bottom: 1px solid var(--line);
            border-left: 3px solid transparent;
          }

          .item:last-child {
            border-bottom: 0;
          }

          .item:hover,
          .item:focus-within {
            border-left-color: var(--green);
            background: rgba(0, 107, 43, 0.08);
          }

          .item h2 {
            margin: 0;
            font-family: var(--serif);
            font-size: clamp(1.1rem, 3vw, 1.45rem);
            line-height: 1.2;
          }

          .item p {
            margin: 0;
            color: var(--muted);
          }

          .item-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            color: var(--dim);
            font-family: var(--mono);
            font-size: 0.66rem;
            text-transform: uppercase;
          }

          .open {
            width: fit-content;
            color: var(--green);
            font-family: var(--mono);
            font-size: 0.72rem;
            font-weight: 700;
            text-transform: uppercase;
          }

          .site-maintainer-footer {
            margin-top: 1rem;
            padding: 0.75rem 1rem;
            border: 1px solid var(--line-purple);
            background: var(--panel);
            color: var(--green);
            font-family: var(--mono);
            font-size: 0.72rem;
            font-weight: 700;
            text-align: center;
          }

          .site-maintainer-footer p {
            margin: 0;
          }

          @media (max-width: 640px) {
            .page-shell {
              width: min(100% - 1rem, 760px);
              margin: 0.5rem auto 0.8rem;
            }

            .site-header {
              grid-template-columns: 1fr;
              padding: 0.65rem 0 0.75rem;
            }

            .brand-copy strong {
              font-size: clamp(1.55rem, 7.9vw, 2rem);
            }

            .brand-copy span,
            .brand-copy em {
              font-size: 0.78rem;
            }

            .status-terminal {
              justify-self: stretch;
              font-size: 0.76rem;
            }

            .primary-nav {
              flex-wrap: wrap;
              gap: 0.25rem;
              min-height: 42px;
              padding: 0.45rem 0;
              font-size: 0.76rem;
            }

            .primary-nav a {
              min-height: 32px;
              padding: 0 0.5rem;
            }

            .item {
              padding: 0.85rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="page-shell" id="top">
        <header class="site-header">
          <a class="brand-panel" href="/" aria-label="WARLOCK-INDEX home">
            <span class="brand-copy">
              <strong>WARLOCK-INDEX</strong>
              <span>UNCLASSIFIED//OPEN SOURCE</span>
              <em>Strategic Research Corpus &amp; Knowledge Arsenal</em>
            </span>
          </a>
          <div class="status-terminal" aria-label="Local corpus terminal status">
            <p>LOCAL CORPUS TERMINAL</p>
            <p>STATUS: ONLINE</p>
            <p>MODE: READ-ONLY</p>
            <p>UPDATED: <time datetime="2026-06-16T05:12:39Z">2026-06-16 05:12:39Z</time></p>
          </div>
        </header>
        <nav class="primary-nav" aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/about.html">About</a>
          <a href="/library/assessments/">Assessments</a>
          <a href="/library/collections/coverage-map.html">Collections</a>
          <a href="/library/maps/">Maps</a>
          <a href="/library/standards/product-standard.html">Standards</a>
          <a class="is-active" href="/feed.xml" aria-current="page">Feed</a>
          <a href="/workspace/">Workspace</a>
        </nav>

        <main class="shell">
          <section class="feed-head">
            <h1>Recent corpus updates</h1>
            <p class="summary">
              Recent entries from the open-source strategic research corpus: source packets, trackers, matrices, assessments, and registers.
            </p>
            <div class="feed-meta">
              <span>RSS feed</span>
              <span>Updated <xsl:value-of select="/rss/channel/lastBuildDate"/></span>
            </div>
          </section>

          <section class="items" aria-label="Latest feed items">
            <xsl:for-each select="/rss/channel/item">
              <article class="item">
                <div class="item-meta">
                  <span><xsl:value-of select="pubDate"/></span>
                  <xsl:for-each select="category">
                    <span><xsl:value-of select="."/></span>
                  </xsl:for-each>
                </div>
                <h2>
                  <a href="{link}">
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                <p><xsl:value-of select="description"/></p>
                <a class="open" href="{link}">Open entry</a>
              </article>
            </xsl:for-each>
          </section>
          <footer class="site-maintainer-footer">
            <p>Maintained by The Better Science Foundation</p>
          </footer>
        </main>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
