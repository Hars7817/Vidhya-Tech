import type { Metadata } from 'next';
import { buildRouteMetadata } from '@/lib/seo';

export const metadata: Metadata = buildRouteMetadata({
  title: 'Admin Panel',
  description:
    'Internal admin area for managing content and submissions at Vidhya Tech.',
  path: '/admin',
  noindex: true,
  keywords: ['admin panel', 'internal dashboard'],
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
