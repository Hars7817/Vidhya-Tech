import type { Metadata } from 'next';
import { buildRouteMetadata } from '@/lib/seo';
import { DesignGalleryClient } from './DesignGalleryClient';

export const metadata: Metadata = buildRouteMetadata({
  title: 'Design Showcase',
  description:
    'Browse premium website, ERP, and UI design previews created by Vidhya Tech.',
  path: '/design',
  keywords: [
    'design showcase',
    'website design',
    'UI UX portfolio',
    'ERP design',
    'web design examples',
  ],
});

export default function DesignPage() {
  return <DesignGalleryClient />;
}
