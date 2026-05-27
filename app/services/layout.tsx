import type { Metadata } from 'next';
import { buildRouteMetadata } from '@/lib/seo';

export const metadata: Metadata = buildRouteMetadata({
  title: 'Web Development & AI Automation Services',
  description:
    'Explore Vidhya Tech services for modern websites, AI automation, digital marketing, video editing, social media management, and custom integrations.',
  path: '/services',
  keywords: [
    'website development services',
    'AI automation services',
    'digital marketing services',
    'video editing',
    'social media management',
    'AI integration',
  ],
});

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
