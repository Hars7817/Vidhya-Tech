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
  icons: {
    icon: "/favicon.png",
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
  },
};

// ✅ Existing Schema
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
};

// ✅ Existing Schema
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

// 🔥 NEW IMPORTANT (ADD THIS)
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vidhya Tech',
  url: 'https://www.vidhyatech.com',
  logo: 'https://www.vidhyatech.com/images/logo.jpg',
  sameAs: [
    SITE_LINKEDIN,
    'https://www.instagram.com/your-instagram' // replace
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Existing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        {/* 🔥 NEW ADD THIS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>

      <body>
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