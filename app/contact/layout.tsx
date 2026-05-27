import type { Metadata } from 'next';
import { buildRouteMetadata } from '@/lib/seo';

export const metadata: Metadata = buildRouteMetadata({
  title: 'Contact Vidhya Tech',
  description:
    'Start a website, software, or AI project with Vidhya Tech. Reach out for a quote, consultation, or collaboration.',
  path: '/contact',
  keywords: ['contact Vidhya Tech', 'get a quote', 'web development inquiry'],
});

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
