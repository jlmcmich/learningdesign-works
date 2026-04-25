import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "../utils/generateOgImage";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function getStaticPaths() {
    const projects = await getCollection('projects');
    const prompts = await getCollection('prompts');

    const staticPages = [
        { params: { route: 'og' }, props: { title: SITE_TITLE, subtitle: SITE_DESCRIPTION } },
        { params: { route: 'projects' }, props: { title: 'Project Portfolio', subtitle: SITE_TITLE } },
        { params: { route: 'ai-prompts' }, props: { title: 'AI Prompts', subtitle: SITE_TITLE } },
        { params: { route: 'talks' }, props: { title: 'Talks & Writing', subtitle: SITE_TITLE } },
    ];

    const projectPages = projects.map((project) => ({
        params: { route: `projects/${project.id}` },
        props: { title: project.data.title, subtitle: 'Project' },
    }));

    const promptPages = prompts.map((prompt) => ({
        params: { route: `ai-prompts/${prompt.id}` },
        props: { title: prompt.data.title, subtitle: 'AI Prompt' },
    }));

    return [...staticPages, ...projectPages, ...promptPages];
}

export const GET: APIRoute = async ({ props }) => {
    const safeTitle = (props.title as string).replace(/&/g, 'and');
    return new Response(await generateOgImage(safeTitle, props.subtitle as string), {
        headers: { "Content-Type": "image/png" },
    });
};
