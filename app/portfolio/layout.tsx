import type { Metadata } from 'next';
import { buildRouteMetadata } from '@/lib/seo';

export const metadata: Metadata = buildRouteMetadata({
  title: 'Portfolio of Websites, AI Projects & Design Work',
  description:
    'See Vidhya Tech portfolio projects across web design, e-commerce, AI automation, restaurant websites, and digital marketing campaigns.',
  path: '/portfolio',
  keywords: [
    'portfolio',
    'website portfolio',
    'AI project showcase',
    'ecommerce portfolio',
    'web design examples',
  ],
});

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
