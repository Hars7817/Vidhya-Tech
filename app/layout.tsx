import Script from "next/script";
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
  SITE_OG_IMAGE,
  SITE_TWITTER_IMAGE,
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: SITE_NAME,
    url: '/',
    images: [SITE_OG_IMAGE],
    title: SITE_FULL_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_FULL_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_TWITTER_IMAGE],
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

const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/images/logo.jpg'),
  description: SITE_DESCRIPTION,
  email: SITE_EMAIL,
  telephone: SITE_PHONE,
  sameAs: [SITE_LINKEDIN],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Automation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video Editing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Integration' } },
    ],
  },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
  {children}

  {/* Google Analytics */}
  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-8H42VMYLK4"
    strategy="afterInteractive"
  />
  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-8H42VMYLK4');
    `}
  </Script>
</body>
    </html>
  );
}
