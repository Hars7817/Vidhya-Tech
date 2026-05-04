'use client';

import Link from 'next/link';

const clients = [
  { name: 'Retail Brand', category: 'E-Commerce', result: 'Product pages and checkout flow' },
  { name: 'Fitness Studio', category: 'Local Business', result: 'Booking website and campaign assets' },
  { name: 'Food Startup', category: 'Restaurant', result: 'Menu website and social launch' },
  { name: 'Education Coach', category: 'Creator', result: 'Landing page and lead automation' },
  { name: 'Real Estate Team', category: 'Services', result: 'Listing funnel and CRM capture' },
  { name: 'Beauty Studio', category: 'D2C', result: 'Brand site and Instagram creatives' },
];

const proofStats = [
  ['30+', 'Project builds'],
  ['15+', 'Client conversations'],
  ['6', 'Core service lines'],
  ['24h', 'First response target'],
];

const storySteps = [
  {
    year: '01',
    title: 'Started With Practical Websites',
    text: 'Vidhya Tech began with a simple focus: build clean websites that help small brands look credible and generate enquiries.',
  },
  {
    year: '02',
    title: 'Added Automation And AI',
    text: 'As client needs grew, we added form flows, chatbot logic, AI content support, and workflow automation into our delivery.',
  },
  {
    year: '03',
    title: 'Built A Full Growth System',
    text: 'Today the service combines design, development, marketing, video, and AI integration so every launch feels connected.',
  },
];

const certificatePlaceholders = [
  { title: 'Web Development Track', issuer: 'Credential Placeholder', note: 'Replace with real certificate before launch' },
  { title: 'AI Automation Track', issuer: 'Credential Placeholder', note: 'Replace with real certificate before launch' },
  { title: 'Digital Marketing Track', issuer: 'Credential Placeholder', note: 'Replace with real certificate before launch' },
];

const reviewTemplates = [
  {
    name: 'Sample Client',
    role: 'Founder, Local Brand',
    text: 'The website structure, visuals, and lead form flow made the business feel much more premium online.',
  },
  {
    name: 'Sample Client',
    role: 'Marketing Lead',
    text: 'The team understood the offer quickly and turned it into a clean digital experience with strong calls to action.',
  },
  {
    name: 'Sample Client',
    role: 'Service Business Owner',
    text: 'The project felt organized from the first call to launch, with useful ideas for content and automation.',
  },
];

export function ClientsShowcase() {
  return (
    <section id="clients" className="border-b border-white/10 bg-[#030303] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Our Clients"
          title="Brands We Can Build For"
          text="A premium client showcase layout using business categories and sample client labels until your real client names are ready."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <article key={client.name + client.category} className="rounded-lg border border-white/12 bg-white/[0.045] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/65">
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-[#ffcc00] text-lg font-black text-black">
                  {client.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="rounded-full border border-[#ffcc00]/35 px-3 py-1 text-xs font-black uppercase text-[#ffcc00]">
                  Sample
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-black text-white">{client.name}</h3>
              <p className="mt-2 text-sm font-bold text-[#ffcc00]">{client.category}</p>
              <p className="mt-4 text-sm leading-7 text-white/62">{client.result}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SocialProofSection() {
  return (
    <section id="proof" className="relative overflow-hidden border-b border-white/10 bg-[#080808] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,204,0,.14),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Social Proof"
          title="Numbers That Support The Story"
          text="A trust-building proof band with clear metrics, project categories, and delivery signals in the same Vidhya Tech color system."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {proofStats.map(([value, label]) => (
            <article key={label} className="rounded-lg border border-white/12 bg-black/35 p-7 text-center">
              <p className="text-5xl font-black text-[#ffcc00]">{value}</p>
              <p className="mt-3 text-sm font-bold uppercase text-white/58">{label}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {['Discovery first process', 'Responsive design delivery', 'AI ready business workflows'].map((item) => (
            <div key={item} className="rounded-lg border border-[#ffcc00]/25 bg-[#ffcc00]/10 px-5 py-4 text-sm font-bold text-white">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BusinessStorySection() {
  return (
    <section id="story" className="border-b border-white/10 bg-[#050505] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase text-[#ffcc00]">Our Business Story</p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
            A small agency system built for practical digital growth.
          </h2>
          <p className="mt-6 text-base leading-8 text-white/64">
            The story section gives your brand more depth: where you started, what you learned, and why your services now cover design, development, automation, and marketing together.
          </p>
          <Link href="/contact" className="vt-gold-button mt-8 px-7 py-3 text-sm font-black">
            Start A Project
          </Link>
        </div>

        <div className="grid gap-5">
          {storySteps.map((step) => (
            <article key={step.title} className="grid gap-5 rounded-lg border border-white/12 bg-white/[0.045] p-6 sm:grid-cols-[84px_1fr]">
              <div className="grid h-20 w-20 place-items-center rounded-md bg-[#ffcc00] text-2xl font-black text-black">
                {step.year}
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CertificatesSection() {
  return (
    <section id="certificates" className="border-b border-white/10 bg-[#030303] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Certificate Area"
          title="Credential Style Cards"
          text="These are clearly marked placeholders. Replace them with your real certificates or awards before using them as proof."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {certificatePlaceholders.map((certificate) => (
            <article key={certificate.title} className="relative overflow-hidden rounded-lg border border-[#ffcc00]/30 bg-[linear-gradient(145deg,rgba(255,204,0,.16),rgba(255,255,255,.04)_48%,rgba(0,0,0,.2))] p-6">
              <div className="absolute right-5 top-5 h-16 w-16 rounded-full border-4 border-[#ffcc00]/45" />
              <p className="text-xs font-black uppercase text-[#ffcc00]">Demo Certificate</p>
              <h3 className="mt-12 text-2xl font-black text-white">{certificate.title}</h3>
              <p className="mt-3 text-sm font-bold text-white/72">{certificate.issuer}</p>
              <p className="mt-8 border-t border-white/12 pt-5 text-xs leading-6 text-white/52">{certificate.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="bg-[#080808] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Review Templates"
          title="Client Review Style"
          text="These cards show the review design. Replace the sample text with real client testimonials before publishing as customer proof."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {reviewTemplates.map((review, index) => (
            <article key={`${review.name}-${index}`} className="rounded-lg border border-white/12 bg-white/[0.045] p-7">
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-1 text-[#ffcc00]" aria-label="Five star sample rating">
                  {'*****'.split('').map((star, starIndex) => (
                    <span key={`${star}-${starIndex}`}>{star}</span>
                  ))}
                </div>
                <span className="rounded-full border border-[#ffcc00]/35 px-3 py-1 text-xs font-black uppercase text-[#ffcc00]">
                  Sample
                </span>
              </div>
              <p className="mt-6 text-base leading-8 text-white/72">&quot;{review.text}&quot;</p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="font-black text-white">{review.name}</p>
                <p className="mt-1 text-sm text-white/52">{review.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocationSection() {
  return (
    <section id="location" className="border-t border-white/10 bg-[#05080c] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase text-[#ffcc00]">Location</p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">India Based, Remote Friendly</h2>
          <p className="mt-6 text-base leading-8 text-white/65">
            Vidhya Tech works from India and supports online business projects through calls, shared documents, and clear delivery checkpoints.
          </p>

          <div className="mt-8 grid gap-4 text-sm text-white/70">
            <a href="tel:+917817097517" className="transition hover:text-[#ffcc00]">Phone: +91 7817097517</a>
            <a href="mailto:vidhyatech1@gmail.com" className="transition hover:text-[#ffcc00]">Email: vidhyatech1@gmail.com</a>
            <p>Service Area: India and remote clients</p>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-white/12 bg-[#090909] p-6">
          <div className="absolute inset-0 opacity-40 vt-map-grid" />
          <div className="absolute left-[48%] top-[48%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ffcc00]/45 bg-[#ffcc00]/10" />
          <div className="absolute left-[48%] top-[48%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffcc00] shadow-[0_0_40px_rgba(255,204,0,.9)]" />
          <div className="relative z-10 mt-auto flex h-full min-h-[312px] flex-col justify-end">
            <div className="max-w-sm rounded-lg border border-white/12 bg-black/70 p-5 backdrop-blur">
              <p className="text-xs font-black uppercase text-[#ffcc00]">Office Marker</p>
              <h3 className="mt-2 text-2xl font-black text-white">Vidhya Tech</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">Digital services delivered from India with remote-first project communication.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-black uppercase text-[#ffcc00]">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-white/65">{text}</p>
    </div>
  );
}
