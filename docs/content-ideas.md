# Content ideas

Notes for later. Nothing here is scheduled.

## Rethink the tutorials and videos

The tutorials (`src/pages/_tutorials*`, content in `src/content/tutorials/`) are unpublished as of November 2026. `/tutorials` redirects to `/recent-work` with a temporary 302 in `public/_redirects`. To bring them back, rename the two `_tutorials` paths and remove those redirect lines.

Some of the ideas are worth keeping, but the format may be better as short motion videos than as long written pages. A possible production workflow:

1. Talk through what I want to explain (record it, for example with Scribe).
2. Turn that into a script.
3. Build a short motion video from the script with Claude Motion.

The same workflow could make the "Trailer coming soon" slots on `/recent-work` real: a short trailer for each tool (Signal and Tracker, Scribe, Canvas MCP, Skill Shelf, Water Cooler). `LoopVideo` takes a `dir` prop, so trailers can live in `public/media/recent-work/`.

## Make more of the work shareable

- Skill Shelf: host its sample-library `Index.html` as a live demo.
- Agentic LMS sandbox: a public demo team code that resets nightly.
- Workshop workbook template: make the repo public with one sample workbook.
- Water Cooler: a demo instance with its built-in made-up people, reset nightly.
- Canvas MCP: a public repo with ASU settings removed, against a free Canvas teacher account (check with Bruce first).
