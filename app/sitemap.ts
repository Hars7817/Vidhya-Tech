import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const publicRoutes = [
  '/',
  '/services',
  '/portfolio',
  '/pricing',
  '/contact',
  '/design',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: `${SITE_URL}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route.startsWith('/design') ? 0.6 : 0.8,
  }));
}
