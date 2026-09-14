import { absoluteUrl } from '@/lib/site-config';
import { indexablePaths } from './content';

export default function sitemap() {
  return [
    { url: absoluteUrl('/') },
    ...indexablePaths.map((path) => ({ url: absoluteUrl(`/${path}`) })),
    { url: absoluteUrl('/contact') },
  ];
}
