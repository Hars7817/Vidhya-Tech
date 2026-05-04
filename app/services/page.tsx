'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  BusinessStorySection,
  CertificatesSection,
  ClientsShowcase,
  ReviewsSection,
  SocialProofSection,
} from '../components/ProofSections';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon?: string | null;
  image?: string | null;
  order: number;
}

interface ServicesResponse {
  data?: ServiceItem[];
}

interface ToolDomain {
  title: string;
  description: string;
  icon: string;
  tools: string[];
}

const defaultServices: ServiceItem[] = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Custom websites, landing pages, portfolios, and web applications built with modern responsive technology.',
    icon: 'WEB',
    image: null,
    order: 1,
  },
  {
    id: 2,
    title: 'AI Automation',
    description: 'Automated workflows, chatbots, AI forms, and smart systems for growing business operations.',
    icon: 'AI',
    image: null,
    order: 2,
  },
  {
    id: 3,
    title: 'Digital Marketing',
    description: 'Search, social, campaign content, creative direction, and lead generation systems.',
    icon: 'ADS',
    image: null,
    order: 3,
  },
  {
    id: 4,
    title: 'Video Editing',
    description: 'Clean edits for reels, YouTube, paid ads, launch videos, and product stories.',
    icon: 'VID',
    image: null,
    order: 4,
  },
  {
    id: 5,
    title: 'Social Media Management',
    description: 'Planning, posting, captions, creative design, and channel growth support.',
    icon: 'SOC',
    image: null,
    order: 5,
  },
  {
    id: 6,
    title: 'AI Integration',
    description: 'Add AI features into websites, forms, CRM flows, dashboards, and internal tools.',
    icon: 'CPU',
    image: null,
    order: 6,
  },
];

const toolDomains: ToolDomain[] = [
  {
    title: 'Digital Transformation',
    description: 'Enterprise-ready platforms for websites, operations, and online growth systems.',
    icon: 'DT',
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Vercel', 'GitHub'],
  },
  {
    title: 'AI & Automation',
    description: 'Core AI tools for chatbots, content workflows, lead capture, and business automation.',
    icon: 'AI',
    tools: ['OpenAI API', 'Chatbots', 'Zapier', 'Make', 'n8n', 'Airtable', 'Google Sheets', 'CRM Workflows'],
  },
  {
    title: 'Custom Software',
    description: 'Modern application foundations for dashboards, admin panels, portals, and internal tools.',
    icon: 'CS',
    tools: ['Node.js', 'REST APIs', 'Auth', 'Admin Panels', 'Dashboards', 'Forms', 'Databases', 'Cloud Hosting'],
  },
  {
    title: 'eCommerce Development',
    description: 'Storefront tools for product pages, checkout, catalog design, and conversion campaigns.',
    icon: 'EC',
    tools: ['Shopify', 'WooCommerce', 'Stripe', 'Razorpay', 'Product Pages', 'Checkout UX', 'Analytics', 'Email Flows'],
  },
  {
    title: 'Mobile Apps',
    description: 'Mobile-friendly web apps and app-ready interfaces for service businesses and creators.',
    icon: 'MA',
    tools: ['React Native', 'Expo', 'PWA', 'Flutter', 'Firebase', 'Push Alerts', 'App UI', 'Mobile Forms'],
  },
  {
    title: 'DevOps & Cloud',
    description: 'Deployment and hosting tools for reliable launches, backups, analytics, and scaling.',
    icon: 'DC',
    tools: ['Vercel', 'Netlify', 'AWS', 'Cloudflare', 'Docker', 'Domains', 'SSL', 'Monitoring'],
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [loading, setLoading] = useState(true);
  const [activeDomain, setActiveDomain] = useState(toolDomains[0]);

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = (await response.json()) as ServicesResponse;

        if (isMounted && data.data?.length) {
          setServices(data.data);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10 px-5 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_15%,rgba(255,204,0,.16),transparent_34%),linear-gradient(180deg,#080808,#030303)]" />
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-black uppercase text-[#ffcc00]">Service Page</p>
          <h1 className="mt-4 text-5xl font-black leading-tight text-white sm:text-6xl">
            Digital Services, Core Tools, And Trust Sections
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/66">
            A premium service page with the same structure as your example, using Vidhya Tech&apos;s black and gold design instead of changing the color palette.
          </p>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#050505] px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase text-[#ffcc00]">What We Do</p>
            <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">Our Services</h2>
            <p className="mt-5 text-base leading-7 text-white/65">
              We offer complete digital services for brands that want better websites, better systems, and better online growth.
            </p>
          </div>

          {loading && <p className="mt-10 text-center text-sm text-white/55">Loading services...</p>}

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.id} className="vt-service-card rounded-lg border border-white/15 bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/65">
                <div className="grid h-14 w-14 place-items-center rounded-md bg-[#ffcc00] text-sm font-black text-black">
                  {service.icon || 'VT'}
                </div>
                <h3 className="mt-8 text-2xl font-black text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/62">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="core-tools" className="border-b border-white/10 bg-[#030303] px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase text-[#ffcc00]">Core Service Tool</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
              Our Technology Stack And Platforms
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
              Deep service capability across major platforms, frameworks, automation tools, and marketing systems your business needs.
            </p>
          </div>

          <div className="mt-14 overflow-hidden rounded-lg border border-white/12 bg-white/[0.035]">
            <div className="grid lg:grid-cols-[410px_1fr]">
              <aside className="border-b border-white/10 bg-[#120f08] p-5 lg:border-b-0 lg:border-r lg:border-white/10">
                <h3 className="px-2 pb-5 text-3xl font-black text-white">Technology Domains</h3>
                <div className="grid max-h-[560px] gap-3 overflow-y-auto pr-1">
                  {toolDomains.map((domain) => {
                    const isActive = activeDomain.title === domain.title;

                    return (
                      <button
                        key={domain.title}
                        type="button"
                        onClick={() => setActiveDomain(domain)}
                        className={`grid grid-cols-[56px_1fr_24px] items-center gap-4 rounded-lg px-3 py-3 text-left transition ${isActive ? 'bg-black text-white shadow-[0_0_28px_rgba(255,204,0,.16)]' : 'text-white/82 hover:bg-black/35 hover:text-white'}`}
                      >
                        <span className={`grid h-14 w-14 place-items-center rounded-md text-sm font-black ${isActive ? 'bg-[#ffcc00] text-black' : 'bg-white/10 text-[#ffcc00]'}`}>
                          {domain.icon}
                        </span>
                        <span className="text-lg font-black">{domain.title}</span>
                        <span className="text-2xl text-[#ffcc00]">&gt;</span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <div className="p-6 md:p-10">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-lg bg-[#ffcc00] text-2xl font-black text-black">
                    {activeDomain.icon}
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-white">{activeDomain.title}</h3>
                    <p className="mt-3 text-base leading-7 text-white/62">{activeDomain.description}</p>
                  </div>
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {activeDomain.tools.map((tool) => (
                    <article key={tool} className="group grid min-h-36 place-items-center rounded-lg border border-white/12 bg-black/35 p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/70">
                      <div>
                        <div className="mx-auto grid h-16 w-16 place-items-center rounded-md bg-white/[0.08] text-lg font-black text-[#ffcc00] transition group-hover:bg-[#ffcc00] group-hover:text-black">
                          {tool.slice(0, 2).toUpperCase()}
                        </div>
                        <h4 className="mt-5 text-lg font-black text-white">{tool}</h4>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientsShowcase />
      <SocialProofSection />
      <BusinessStorySection />
      <CertificatesSection />
      <ReviewsSection />

      <section className="bg-[#030303] px-5 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase text-[#ffcc00]">Ready</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-black leading-tight text-white">
          Let&apos;s turn your service idea into a premium digital experience.
        </h2>
        <Link href="/contact" className="vt-gold-button mt-8 px-8 py-3 text-sm font-black">
          Contact Vidhya Tech
        </Link>
      </section>
    </div>
  );
}
