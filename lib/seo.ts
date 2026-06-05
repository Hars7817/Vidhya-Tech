import type { Metadata } from 'next';

const DEFAULT_SITE_URL = 'https://www.vidhyatech.com';

function resolveSiteUrl(value: string | undefined): string {
  const trimmed = value?.trim().replace(/\/+$/, '');
  if (!trimmed) return DEFAULT_SITE_URL;

  const candidate = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(trimmed)
      ? `http://${trimmed}`
      : `https://${trimmed}`;

  try {
    return new URL(candidate).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

const normalizedSiteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

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
// TODO: Switch to a domain email once email hosting is set up.
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

export const SITE_OG_IMAGE = absoluteUrl('/opengraph-image');
export const SITE_TWITTER_IMAGE = absoluteUrl('/twitter-image');

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
      canonical: absoluteUrl(path),
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: SITE_NAME,
      url: absoluteUrl(path),
      images: [SITE_OG_IMAGE],
      title: fullTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [SITE_TWITTER_IMAGE],
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
