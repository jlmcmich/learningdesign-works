# learningdesign.works

Personal site for Jonathan McMichael — AI Specialist at Arizona State University.
Built with [Astro](https://astro.build/) on the [Astro Scholar](https://github.com/shravanngoswamii/astro-scholar) theme.
Deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## Local development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static build → dist/
npm run preview      # preview the production build
```

## Project structure

```
src/
  content/
    projects/        Project case studies (Markdown frontmatter)
    prompts/         AI prompts repository
    blog/            (empty for now)
  data/
    authors.json     Author profile
    publications.bib Journal article(s)
  pages/
    index.astro      Home
    projects.astro   /projects listing
    projects/[...slug].astro
    ai-prompts/index.astro + [...slug].astro
    talks.astro      /talks (talks, panels, writing)
  components/        Header, Footer, layouts
public/
  _redirects         301s from old WordPress URLs
```

## Deployment (Cloudflare Pages)

1. Connect this repo in the Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Framework preset: **Astro**. Build command: `npm run build`. Build output: `dist`.
3. Add the custom domain `learningdesign.works` under **Custom domains** and update DNS.

## Theme attribution

Built on [Astro Scholar](https://github.com/shravanngoswamii/astro-scholar) by Shravan Goswami. See `LICENSE`.
