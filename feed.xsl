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
            --mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
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

          .site-header {
            position: sticky;
            top: 0;
            z-index: 10;
            display: grid;
            grid-template-columns: minmax(250px, 420px) minmax(0, 1fr);
            gap: 1rem;
            padding: 0.6rem 0.7rem;
            border-bottom: 2px solid var(--chrome-dark);
            background: var(--panel);
          }

          .brand-lockup {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            align-items: center;
            min-width: 0;
            padding: 0.1rem 0.3rem;
          }

          .brand-lockup span {
            display: grid;
            gap: 0.18rem;
            min-width: 0;
          }

          .brand-lockup strong {
            overflow: hidden;
            color: var(--text);
            font-family: var(--serif);
            font-size: 1.45rem;
            line-height: 1;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .brand-lockup em {
            color: var(--green);
            font-family: var(--mono);
            font-size: 0.68rem;
            font-style: normal;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .primary-nav {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 0.25rem;
            min-width: 0;
            min-height: 38px;
            overflow-x: auto;
            color: var(--muted);
            font-family: var(--sans);
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            scrollbar-width: none;
          }

          .primary-nav::-webkit-scrollbar {
            display: none;
          }

          .primary-nav a {
            display: grid;
            min-width: max-content;
            place-items: center;
            min-height: 30px;
            padding: 0 0.72rem;
            border: 2px solid var(--chrome);
            border-color: var(--chrome-light) var(--chrome-dark) var(--chrome-dark) var(--chrome-light);
            background: var(--chrome);
            color: var(--text);
          }

          .primary-nav a:hover,
          .primary-nav a:focus-visible {
            border-color: var(--chrome-dark) var(--chrome-light) var(--chrome-light) var(--chrome-dark);
            background: #dfd5ea;
            color: var(--purple);
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

          @media (max-width: 640px) {
            .site-header {
              grid-template-columns: 1fr;
            }

            .brand-lockup {
              border-right: 0;
              border-bottom: 1px solid var(--line-purple);
            }

            .brand-lockup strong {
              font-size: 1.16rem;
            }

            .primary-nav {
              justify-content: flex-start;
              min-height: 42px;
            }

            .item {
              padding: 0.85rem;
            }
          }
        </style>
      </head>
      <body>
        <header class="site-header">
          <a class="brand-lockup" href="/" aria-label="WARLOCK-INDEX home">
            <span>
              <strong>WARLOCK-INDEX</strong>
              <em>Open-source corpus</em>
            </span>
          </a>
          <nav class="primary-nav" aria-label="Feed navigation">
            <a href="/library/">Library</a>
            <a href="/workspace/">Workspace</a>
            <a href="/feed.xml">RSS</a>
          </nav>
        </header>

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
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
