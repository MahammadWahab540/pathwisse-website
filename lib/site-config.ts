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
export const LEGAL_ENTITY = 'Shaquantum Labs Pvt. Ltd.';
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
  '/products/enterprise-upskilling': '/enterprise',
  '/products/talent-intelligence': '/enterprise',
  '/enterprises': '/enterprise',
  '/enterprise/overview': '/enterprise',
  '/enterprise/upskilling': '/enterprise',
  '/enterprise/workforce-assessment': '/enterprise',
  '/enterprise/ai-readiness': '/enterprise',
  '/enterprise/internal-mobility': '/enterprise',
  '/enterprise/graduate-training': '/enterprise',
  '/enterprise/project-based-learning': '/enterprise',
  '/enterprise/skill-verification': '/enterprise',
  '/enterprise/implementation': '/enterprise',
  '/enterprise/integrations': '/enterprise',
  '/enterprise/talent-intelligence': '/enterprise',
  '/colleges/overview': '/colleges',
  '/colleges/placement-teams': '/colleges',
  '/colleges/management': '/colleges',
  '/colleges/faculty': '/colleges',
  '/colleges/student-readiness-audit': '/colleges',
  '/colleges/career-accelerator': '/colleges',
  '/colleges/placement-readiness': '/colleges',
  '/colleges/student-analytics': '/colleges',
  '/colleges/project-based-learning': '/colleges',
  '/colleges/implementation': '/colleges',
  '/colleges/integrations': '/colleges',
  '/colleges/pricing': '/colleges',
  '/students/career-roadmaps': '/students',
  '/students/projects': '/students',
  '/students/skill-sprints': '/students',
  '/students/daily-practice': '/students',
  '/students/career-readiness': '/students',
  '/students/career-audit': '/career-audit/start',
  '/privacy': '/trust/privacy',
  '/terms': '/trust/terms',
  '/security': '/trust/security',
  '/partnerships/colleges': '/colleges',
  '/workforce/skill-gap-analysis': '/enterprise',
  '/projects': '/product/projects',
  '/resources/templates': '/resources',
  '/resources/reports': '/resources',
  '/resources/webinars': '/resources',
  '/resources/case-studies': '/resources',
  '/resources/guides': '/resources',
  '/resources/career-guides': '/careers',
  '/resources/placement-guides': '/colleges',
  '/company/contact': '/contact',
  '/students/pricing': '/pricing',
};

export const trustedOrigins = [SITE_URL, APP_URL, CAREER_VOICE_URL].map((url) => new URL(url).origin);
