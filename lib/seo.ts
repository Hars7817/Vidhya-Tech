import type { Metadata } from 'next';

const normalizedSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '') ??
  'https://www.vidhyatech.com';

export const SITE_URL = normalizedSiteUrl;
export const SITE_URL_OBJECT = new URL(normalizedSiteUrl);
export const SITE_NAME = 'Vidhya Tech';
export const SITE_FULL_TITLE =
  'Vidhya Tech | Website Development, AI Automation & Digital Marketing Agency';
export const SITE_DESCRIPTION =
  'Vidhya Tech helps businesses grow with professional websites, AI automation, WhatsApp AI agents, ERP software, SEO and digital marketing services.';
export const SITE_KEYWORDS = [
  'Vidhya Tech',
  'web development',
  'AI automation',
  'digital marketing',
  'custom software',
  'SEO',
  'India',
];
export const SITE_EMAIL = 'vidhyatech1@gmail.com';
export const SITE_PHONE = '+91 7817097517';
export const SITE_LINKEDIN =
  'https://www.linkedin.com/in/harsh-kumar-69864036a';

type RouteMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noindex?: boolean;
};

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL_OBJECT).toString();
}

export function buildRouteMetadata({
  title,
  description,
  path,
  keywords = [],
  noindex = false,
}: RouteMetadataOptions): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const mergedKeywords = Array.from(new Set([...SITE_KEYWORDS, ...keywords]));

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}
