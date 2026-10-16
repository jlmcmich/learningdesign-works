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

## Tutorial feedback

The tutorials section includes a lightweight feedback form designed for Cloudflare Pages Functions + D1.

Setup:

1. Create a D1 database for feedback submissions.
2. Run the SQL in `db/tutorial-feedback.sql`.
3. In Cloudflare Pages, bind the database as `FEEDBACK_DB`.
4. Add a secret environment variable named `FEEDBACK_ADMIN_TOKEN`.
5. Redeploy the site.

After deployment:

- Tutorial pages can submit feedback to `/api/tutorial-feedback`
- You can review recent submissions at:
  `/api/tutorial-feedback?token=YOUR_SECRET_TOKEN`
- Or use the built-in review page at:
  `/tutorial-feedback-admin`

This endpoint returns JSON so submissions can be exported or turned into a small admin page later.

## Theme attribution

Built on [Astro Scholar](https://github.com/shravanngoswamii/astro-scholar) by Shravan Goswami. See `LICENSE`.
