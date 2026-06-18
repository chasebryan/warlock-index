# Preview Assets

These files preserve preview and reference material for the cream global study map. The current direction is now promoted into the production homepage with a lightweight update layer.

## Global map preview

- `map-background-preview.html` is the current candidate and should be reviewed as the user-facing first screen.
- `global-cream-map-reference.webp` is the compressed cream world map asset.
- `global-map-updates.json` is the only file that needs routine marker maintenance.
- `legacy-painterly-study-preview.html` preserves the earlier painterly direction for design history.

Production copies live at:

- `../global-map-updates.json`
- `../images/global-cream-map-reference.webp`

## Marker maintenance

Each marker in `global-map-updates.json` uses percentage coordinates over the map image:

- `x`: horizontal position from the left edge, `0` to `100`.
- `y`: vertical position from the top edge, `0` to `100`.
- `shape`: `square` or `dot`.
- `status`: `active`, `updated`, or `watch`.
- `url`: a relative link from `site/previews/` to the corpus product.

To remove a marker, delete its object from `global-map-updates.json`. To add one, copy an existing object, assign a unique `id`, update the metadata, and place `x`/`y` on the map.

The copy on the preview should stay visitor-facing. Avoid implementation phrases such as "hover a marker" in the main heading area; those details belong in controls, labels, or documentation.

## Performance budget

The preview intentionally avoids heavy map runtime costs:

- No tile server.
- No external map library.
- No canvas render loop.
- One compressed reference map image.
- One small JSON marker file.
- Delegated click handlers for marker, list, and filter controls.

Run this before requesting approval or pushing:

```bash
GOCACHE=/tmp/go-build go run site/previews/validate-global-map-preview.go
node site/check-library.mjs
```
