export const SITE_TITLE = 'Jonathan McMichael';
export const SITE_TAGLINE = 'AI Strategist';
export const SITE_DESCRIPTION =
  'Professional portfolio of Jonathan McMichael — AI Strategist at Arizona State University, working at the intersection of AI, instructional design, and higher education.';

export const CV_URL = '';

export const CONTACT = {
  organization: 'Enterprise Technology, Arizona State University',
  addressLines: ['Tempe, AZ'],
  emails: [],
};

// Contact path for workshop and talk requests.
// MOCKUP: no public email or form exists yet. Leave empty to show a clearly marked
// placeholder on /workshops; set an address (or a form URL) once one is chosen.
export const CONTACT_EMAIL = 'jonathan@learningdesign.works';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/jonathanmcmichael/';

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
