# Content ideas

Notes for later. Nothing here is scheduled.

## Rethink the tutorials and videos

The tutorials (`src/pages/_tutorials*`, content in `src/content/tutorials/`) are unpublished as of November 2026. `/tutorials` redirects to `/recent-work` with a temporary 302 in `public/_redirects`. `/tutorial-feedback-admin` is unpublished the same way (`src/pages/_tutorial-feedback-admin.astro`). To bring them back, rename the `_tutorial*` paths and remove those redirect lines.

Some of the ideas are worth keeping, but the format may be better as short motion videos than as long written pages. A possible production workflow:

1. Talk through what I want to explain (record it, for example with Scribe).
2. Turn that into a script.
3. Build a short motion video from the script with Claude Motion.

The same workflow could add trailers to the tools on `/recent-work`: a short video for each tool (Signal and Tracker, Scribe, Canvas MCP, Skill Shelf, Water Cooler). Give a tool a `video` entry and it gets a media column; `LoopVideo` takes a `dir` prop, so trailers can live in `public/media/recent-work/`.

## Make more of the work shareable

- Skill Shelf: host its sample-library `Index.html` as a live demo.
- Agentic LMS sandbox: a public demo team code that resets nightly.
- Workshop workbook template: make the repo public with one sample workbook.
- Water Cooler: a demo instance with its built-in made-up people, reset nightly.
- Canvas MCP: a public repo with ASU settings removed, against a free Canvas teacher account (check with the Canvas service owner first).
