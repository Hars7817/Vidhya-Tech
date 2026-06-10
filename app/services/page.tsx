'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
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
  slug: string;
  title: string;
  description: string;
  icon: string;
  tools: string[];
  deliverables: string[];
  process: string[];
  bestFor: string;
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
    id: 2,
    title: 'AI Automation',
    description: 'Automated workflows, chatbots, AI forms, and smart systems for growing business operations.',
    icon: 'AI',
    image: null,
    order: 2,
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
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    description: 'Enterprise-ready platforms for websites, operations, and online growth systems.',
    icon: 'DT',
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'SEO Setup', 'Analytics', 'Form Systems'],
    deliverables: ['Premium business website', 'Landing page system', 'Lead enquiry forms', 'Analytics-ready launch'],
    process: ['Audit your current online presence', 'Plan page structure and user journey', 'Build responsive screens', 'Launch with tracking and basic SEO'],
    bestFor: 'Businesses that want a modern website and a cleaner digital foundation.',
  },
  {
    slug: 'ai-automation',
    title: 'AI & Automation',
    description: 'Core AI tools for chatbots, content workflows, lead capture, and business automation.',
    icon: 'AI',
    tools: ['OpenAI API', 'Chatbots', 'Zapier', 'Make', 'n8n', 'Airtable', 'Google Sheets', 'CRM Workflows'],
    deliverables: ['AI enquiry assistant', 'Automated lead routing', 'Content workflow setup', 'Internal task automation'],
    process: ['Find repeated manual work', 'Map trigger and action steps', 'Build the automation flow', 'Test and hand over the workflow'],
    bestFor: 'Teams that want to save time on repeated messages, leads, forms, and admin work.',
  },
  {
    slug: 'custom-software',
    title: 'Custom Software',
    description: 'Modern application foundations for dashboards, admin panels, portals, and internal tools.',
    icon: 'CS',
    tools: ['Node.js', 'REST APIs', 'Auth', 'Admin Panels', 'Dashboards', 'Forms', 'Databases', 'Cloud Hosting'],
    deliverables: ['Admin dashboard', 'Secure data forms', 'API integration', 'Role-based tool flow'],
    process: ['Define the exact workflow', 'Design data and screen structure', 'Build the core app modules', 'Test with real user scenarios'],
    bestFor: 'Businesses that need a custom portal, dashboard, or internal system instead of a basic website.',
  },
  {
    slug: 'ecommerce-development',
    title: 'eCommerce Development',
    description: 'Storefront tools for product pages, checkout, catalog design, and conversion campaigns.',
    icon: 'EC',
    tools: ['Shopify', 'WooCommerce', 'Stripe', 'Razorpay', 'Product Pages', 'Checkout UX', 'Analytics', 'Email Flows'],
    deliverables: ['Storefront design', 'Product page layout', 'Checkout setup', 'Offer and email flow'],
    process: ['Organize products and categories', 'Design the purchase journey', 'Connect payment and tracking', 'Prepare launch campaign assets'],
    bestFor: 'Brands that sell products online and need a sharper store experience.',
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Mobile-friendly web apps and app-ready interfaces for service businesses and creators.',
    icon: 'MA',
    tools: ['React Native', 'Expo', 'PWA', 'Flutter', 'Firebase', 'Push Alerts', 'App UI', 'Mobile Forms'],
    deliverables: ['Mobile-first interface', 'App screen prototype', 'PWA-ready experience', 'Booking or enquiry flows'],
    process: ['Choose the app workflow', 'Design mobile screens first', 'Build interactive user flows', 'Test on common phone sizes'],
    bestFor: 'Creators, service brands, and businesses that need a phone-first customer experience.',
  },
  {
    slug: 'devops-cloud',
    title: 'DevOps & Cloud',
    description: 'Deployment and hosting tools for reliable launches, backups, analytics, and scaling.',
    icon: 'DC',
    tools: ['Netlify', 'AWS', 'Cloudflare', 'Docker', 'Domains', 'SSL', 'Monitoring', 'Backups'],
    deliverables: ['Domain and SSL setup', 'Production deployment', 'Backup plan', 'Monitoring checklist'],
    process: ['Prepare hosting environment', 'Connect domain and security', 'Deploy production build', 'Monitor and document launch steps'],
    bestFor: 'Projects that need reliable hosting, cleaner deployment, and fewer launch problems.',
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [loading, setLoading] = useState(true);
  const [activeDomain, setActiveDomain] = useState<ToolDomain>(toolDomains[0]);
  const detailRef = useRef<HTMLDivElement>(null);

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

  const handleDomainSelect = (domain: ToolDomain) => {
    setActiveDomain(domain);
    window.history.replaceState(null, '', `/services#${domain.slug}`);

    if (window.innerWidth < 1024) {
      window.setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10 px-5 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_15%,rgba(255,204,0,.16),transparent_34%),linear-gradient(180deg,#080808,#030303)]" />
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-2xl sm:text-2xl font-black uppercase tracking-wider text-[#ffcc00]">Growth Solutions</p>
          <h1 className="mt-4 text-5xl font-black leading-tight text-white sm:text-3xl lg:text-5xl">
            Everything You Need To Launch, Grow & Scale Online
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/66">
            Everything you need to attract the right audience, convert them into paying customers, and scale your business with clarity and confidence — powered by proven strategies, smart tools, and performance-driven systems, all seamlessly integrated under one roof.
          </p>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#050505] px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-2xl sm:text-2xl font-black uppercase tracking-wider text-[#ffcc00]">How Vidhya Tech Drives Your Growth</p>
            <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">Our Services</h2>
            <p className="mt-5 text-base leading-7 text-white/65">
              At Vidhya Tech, we deliver complete digital solutions that empower brands to build powerful online presences, streamline their systems, and scale their growth with clarity, precision, and measurable results.
            </p>
          </div>

          {loading && <p className="mt-10 text-center text-sm text-white/55">Loading services...</p>}

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.id} className="vt-service-card rounded-lg border border-white/15 bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/65">
                <div className="grid h-14 w-14 place-items-center rounded-md bg-[#ffcc00] text-sm font-black text-black">
                  {service.icon || 'VT'}
                </div>
                <h3 className="mt-8 text-2xl font-black leading-tight text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/62">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="core-tools" className="border-b border-white/10 bg-[#030303] px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-2xl sm:text-2xl font-black uppercase tracking-wider text-[#ffcc00]">Core Service Tool</p>
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
                <h3 className="px-2 pb-6 text-3xl font-black leading-tight text-white sm:text-4xl">Technology Domains</h3>
                <div className="grid max-h-[560px] gap-3 overflow-y-auto pr-1">
                  {toolDomains.map((domain) => {
                    const isActive = activeDomain.title === domain.title;

                    return (
                      <button
                        key={domain.title}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => handleDomainSelect(domain)}
                        className={`grid grid-cols-[56px_1fr_24px] items-center gap-4 rounded-lg px-3 py-3 text-left transition ${isActive ? 'bg-black text-white shadow-[0_0_28px_rgba(255,204,0,.16)]' : 'text-white/82 hover:bg-black/35 hover:text-white'}`}
                      >
                        <span className={`grid h-14 w-14 place-items-center rounded-md text-sm font-black ${isActive ? 'bg-[#ffcc00] text-black' : 'bg-white/10 text-[#ffcc00]'}`}>
                          {domain.icon}
                        </span>
                        <span className="text-xl font-black leading-tight">{domain.title}</span>
                        <span className="text-2xl text-[#ffcc00]">&gt;</span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <div ref={detailRef} className="scroll-mt-24 p-6 md:p-10">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-lg bg-[#ffcc00] text-2xl font-black text-black">
                    {activeDomain.icon}
                  </div>
                  <div>
                    <h3 className="text-4xl font-black leading-tight text-white sm:text-5xl">{activeDomain.title}</h3>
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
                        <h4 className="mt-5 text-xl font-black leading-tight text-white">{tool}</h4>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_.85fr]">
                  <article className="rounded-lg border border-white/12 bg-black/35 p-6">
                    <p className="text-base font-black uppercase text-[#ffcc00] sm:text-lg">What You Get</p>
                    <h4 className="mt-3 text-2xl font-black leading-tight text-white">
                      {activeDomain.title} service deliverables
                    </h4>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {activeDomain.deliverables.map((item) => (
                        <div key={item} className="rounded-md border border-white/10 bg-white/[0.045] p-4 text-base font-bold leading-6 text-white/82">
                          {item}
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="rounded-lg border border-[#ffcc00]/25 bg-[#ffcc00]/10 p-6">
                    <p className="text-base font-black uppercase text-[#ffcc00] sm:text-lg">Best For</p>
                    <h4 className="mt-3 text-2xl font-black leading-tight text-white">Where this service fits</h4>
                    <p className="mt-5 text-base leading-8 text-white/72">{activeDomain.bestFor}</p>
                    <Link href="/contact" className="vt-gold-button mt-7 px-6 py-3 text-sm font-black">
                      Ask For This Service
                    </Link>
                  </article>
                </div>

                <div className="mt-5 rounded-lg border border-white/12 bg-white/[0.035] p-6">
                  <p className="text-base font-black uppercase text-[#ffcc00] sm:text-lg">Working Process</p>
                  <div className="mt-6 grid gap-4 md:grid-cols-4">
                    {activeDomain.process.map((step, index) => (
                      <article key={step} className="rounded-md border border-white/10 bg-black/35 p-4">
                        <p className="text-3xl font-black text-[#ffcc00]">0{index + 1}</p>
                        <p className="mt-3 text-base font-bold leading-7 text-white/78">{step}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientsShowcase />
      {/* <SocialProofSection /> */}
      <BusinessStorySection />
      {/* <CertificatesSection /> */}
      {/* <ReviewsSection /> */}

      <section className="bg-[#030303] px-5 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-black uppercase text-[#ffcc00] sm:text-xl">Ready</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
          Let&apos;s turn your service idea into a premium digital experience.
        </h2>
        <Link href="/contact" className="vt-gold-button mt-8 px-8 py-3 text-sm font-black">
          Contact Vidhya Tech
        </Link>
      </section>
    </div>
  );
}
