export const SITE_TITLE = 'Jonathan McMichael';
export const SITE_TAGLINE = 'Educator. Designer. Librarian.';
export const SITE_DESCRIPTION =
  'Professional portfolio of Jonathan McMichael — AI Specialist at Arizona State University, working at the intersection of AI, instructional design, and higher education.';

export const CV_URL = '';

export const CONTACT = {
  organization: 'College of Liberal Arts and Sciences, Arizona State University',
  addressLines: ['Tempe, AZ'],
  emails: [],
};

export type SocialIcon = 'website' | 'scholar' | 'email' | 'github' | 'linkedin' | 'twitter';

export const SOCIAL_LINKS: ReadonlyArray<{
  label: string;
  href: string;
  icon: SocialIcon;
}> = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jonathanmcmichael/',
    icon: 'linkedin',
  },
];

export const FOOTER_CREDIT = {
  designerName: 'Jonathan McMichael',
  designerUrl: 'https://learningdesign.works',
  sourceLabel: 'Built with Astro Scholar',
  sourceUrl: 'https://github.com/shravanngoswamii/astro-scholar',
};
