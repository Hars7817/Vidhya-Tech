import type { Metadata } from 'next';
import { buildRouteMetadata } from '@/lib/seo';

export const metadata: Metadata = buildRouteMetadata({
  title: 'Pricing Plans for Websites, ERP & Creative Services',
  description:
    'Transparent pricing for websites, school ERP software, and video editing services built for growing businesses and institutions.',
  path: '/pricing',
  keywords: [
    'pricing',
    'website pricing',
    'ERP pricing',
    'video editing pricing',
    'software plans',
  ],
});

export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
