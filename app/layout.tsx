import type { Metadata } from 'next';
import './globals.css';
import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_FULL_TITLE,
  SITE_KEYWORDS,
  SITE_LINKEDIN,
  SITE_NAME,
  SITE_PHONE,
  SITE_URL,
  SITE_URL_OBJECT,
  absoluteUrl,
} from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: SITE_URL_OBJECT,
  title: {
    default: SITE_FULL_TITLE,
    template: '%s | Vidhya Tech',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'technology',
  keywords: SITE_KEYWORDS,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: SITE_NAME,
    url: '/',
    title: SITE_FULL_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_FULL_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
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

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/images/logo.jpg'),
  sameAs: [SITE_LINKEDIN],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SITE_EMAIL,
      telephone: SITE_PHONE,
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'en-IN',
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
