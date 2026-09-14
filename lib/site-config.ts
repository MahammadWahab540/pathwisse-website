const readEnv = (key: string) => {
  if (typeof process === 'undefined') return undefined;
  return process.env?.[key];
};

const cleanUrl = (value: string) => value.replace(/\/+$/, '');

export const SITE_URL = cleanUrl(readEnv('SITE_URL') || 'https://pathwisse.com');
export const APP_URL = cleanUrl(readEnv('APP_URL') || 'https://app.pathwisse.com');
export const CAREER_VOICE_URL = cleanUrl(readEnv('CAREER_VOICE_URL') || 'https://careervoice.pathwisse.com');
export const APP_AUTH_URL = `${APP_URL}/auth`;
export const SITE_NAME = 'Pathwisse';
export const CONSENT_VERSION = '2026-09-14';

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized === '/' ? '' : normalized}`;
}

export const legacyRedirects: Record<string, string> = {
  '/products': '/product',
  '/products/platform': '/product',
  '/products/career-voice': '/product/career-voice',
  '/products/enterprise-upskilling': '/enterprise/upskilling',
  '/products/talent-intelligence': '/enterprise/talent-intelligence',
  '/enterprises': '/enterprise',
  '/privacy': '/trust/privacy',
  '/terms': '/trust/terms',
  '/security': '/trust/security',
  '/partnerships/colleges': '/colleges/placement-teams',
  '/workforce/skill-gap-analysis': '/enterprise/workforce-assessment',
  '/projects': '/product/projects',
};

export const trustedOrigins = [SITE_URL, APP_URL, CAREER_VOICE_URL].map((url) => new URL(url).origin);
