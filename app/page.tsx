'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';

const heroSlides = [
  {
    title: 'Websites that feel premium',
    text: 'High-converting pages, dashboards, and business websites with fast performance.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'AI systems for real work',
    text: 'Automation flows, chatbots, and smart tools that save hours every week.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Marketing that keeps moving',
    text: 'Launch-ready creative, campaigns, content, and analytics for growing brands.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
  },
];

const marqueeItems = [
  'Web Development',
  'AI Automation',
  'Digital Marketing',
  'Portfolio Design',
  'Video Editing',
  'Social Media',
  'SEO Growth',
  'Brand Systems',
];

const services = [
  {
    title: 'Web Development',
    description: 'Fast, responsive websites tailored to your business goals and customer journey.',
    icon: CodeIcon,
  },
  {
    title: 'AI Automation',
    description: 'Automate business tasks, support workflows, lead capture, and daily operations.',
    icon: BotIcon,
  },
  {
    title: 'Digital Marketing',
    description: 'Campaign strategy, content funnels, SEO, and paid growth systems that convert.',
    icon: ChartIcon,
  },
  {
    title: 'Video Editing',
    description: 'Sharp edits for YouTube, reels, product ads, and social media launches.',
    icon: PlayIcon,
  },
  {
    title: 'Social Media Management',
    description: 'Consistent planning, posting, captions, and performance tracking for every channel.',
    icon: UsersIcon,
  },
  {
    title: 'AI Integration',
    description: 'Connect AI into your site, CRM, forms, and internal tools for smarter delivery.',
    icon: CpuIcon,
  },
];

const portfolioFilters = ['All', 'Web Design', 'Web Development', 'AI Solutions', 'Marketing'];

const projects = [
  {
    title: 'Digital Agency Website',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'E-Commerce Website',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'AI Chatbot Solution',
    category: 'AI Solutions',
    image: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Fitness Website Design',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Restaurant Website',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Marketing Campaign for Brand',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=900&q=85',
  },
];

const stats = [
  ['30+', 'Projects Completed'],
  ['15+', 'Happy Clients'],
  ['2+', 'Years Experience'],
  ['5', 'Client Rating'],
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    setStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Message could not be sent');
      }

      setForm({ name: '', email: '', message: '' });
      setStatus('Thank you. Your message has been sent.');
    } catch {
      setStatus('Message could not be sent. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="vt-page min-h-screen overflow-hidden bg-[#030303] text-white">
      <section
        id="home"
        className="relative isolate min-h-[calc(100vh-76px)] overflow-hidden border-b border-white/10 bg-[#030303]"
      >
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #030303 0%, rgba(3,3,3,.92) 42%, rgba(3,3,3,.58) 100%), url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85')",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-[#030303] to-transparent" />

        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-14 px-5 py-16 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/90 shadow-[0_0_30px_rgba(255,202,0,.12)]">
              Digital Solutions That Drive Real Growth
            </p>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.04] text-white sm:text-6xl lg:text-7xl">
              We Build Digital <span className="text-[#ffcc00]">Solutions</span> That Scale
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/72 sm:text-lg">
              Vidhya Tech is a full-service digital agency helping brands stand out with powerful websites, AI solutions, automation, and creative marketing.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="#services" className="vt-gold-button px-7 py-3 text-center text-sm font-bold">
                Our Services
              </Link>
              <Link href="#portfolio" className="rounded-md border border-white/35 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-[#ffcc00] hover:text-[#ffcc00]">
                View Portfolio
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="mt-2 text-sm text-white/58">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[570px]">
            <div className="vt-halo absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 sm:h-[460px] sm:w-[460px]" />
            <div className="absolute inset-0 rounded-lg bg-[linear-gradient(145deg,rgba(255,204,0,.12),transparent_55%),linear-gradient(315deg,rgba(0,224,209,.12),transparent_45%)]" />

            <div className="relative z-10 ml-auto flex h-full max-w-[620px] flex-col justify-center">
              <div className="vt-hero-device overflow-hidden rounded-lg border border-white/15 bg-[#111] shadow-[0_30px_90px_rgba(0,0,0,.65)]">
                <div className="relative aspect-[16/10]">
                  {heroSlides.map((slide, index) => (
                    <Image
                      key={slide.title}
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 90vw, 620px"
                      className={`object-cover transition duration-700 ${activeSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/30 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6">
                    <p className="text-xs font-bold uppercase text-[#ffcc00]">{heroSlides[activeSlide].title}</p>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">{heroSlides[activeSlide].text}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    aria-label={`Show ${slide.title}`}
                    onClick={() => setActiveSlide(index)}
                    className={`h-2 rounded-full transition-all ${activeSlide === index ? 'w-14 bg-[#ffcc00]' : 'w-8 bg-white/25 hover:bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden border-y border-[#ffcc00]/25 bg-[#ffcc00] py-3 text-black">
        <div className="vt-marquee flex w-max gap-8 text-sm font-black uppercase">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-8">
              {item}
              <span className="h-2 w-2 rounded-full bg-black" />
            </span>
          ))}
        </div>
      </div>

      <section id="services" className="relative border-b border-white/10 bg-[#050505] px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase text-[#ffcc00]">What We Do</p>
            <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">Our Services</h2>
            <p className="mt-5 text-base leading-7 text-white/65">
              We offer a wide range of digital services to help your business grow and succeed online.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article key={service.title} className="vt-service-card group rounded-lg border border-white/15 bg-white/[0.035] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/70">
                  <Icon className="h-10 w-10 text-[#ffcc00]" />
                  <h3 className="mt-8 text-xl font-black text-white">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/62">{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="portfolio" className="relative border-b border-white/10 bg-[#030303] px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase text-[#ffcc00]">Our Work</p>
            <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">Our Portfolio</h2>
            <p className="mt-5 text-base leading-7 text-white/65">
              Here are some of our recent projects that make us proud.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {portfolioFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`min-w-28 rounded-md border px-5 py-3 text-sm font-bold transition ${activeFilter === filter ? 'border-[#ffcc00] bg-[#ffcc00] text-black' : 'border-white/10 bg-white/[0.04] text-white hover:border-[#ffcc00]/70 hover:text-[#ffcc00]'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <article key={project.title} className="group overflow-hidden rounded-lg border border-white/15 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/65">
                <div className="relative aspect-[16/8.4] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 410px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-black text-white">{project.title}</h3>
                    <p className="mt-1 text-sm text-white/65">{project.category}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/portfolio" className="vt-gold-button inline-flex px-8 py-3 text-sm font-black">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="relative overflow-hidden border-b border-white/10 bg-[#07090b] px-5 py-24 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #07090b 0%, rgba(7,9,11,.86) 58%, rgba(7,9,11,.58) 100%), url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1700&q=85')",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-[#ffcc00]">About Vidhya Tech</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
              Built for brands that want the internet to work harder.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ['Strategy First', 'Every design starts with your audience, offer, and conversion goal.'],
              ['Modern Stack', 'We build with clean code, responsive layouts, and scalable tools.'],
              ['Launch Ready', 'Your website, content, automations, and growth channels move together.'],
              ['Premium Feel', 'Dark visual systems, smooth motion, and sharp details make the brand memorable.'],
            ].map(([title, text]) => (
              <article key={title} className="rounded-lg border border-white/12 bg-black/35 p-6">
                <h3 className="text-lg font-black text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-[#05080c] px-5 py-24 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-24"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #05080c 0%, rgba(5,8,12,.88) 54%, rgba(5,8,12,.6) 100%), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85')",
          }}
        />
        <div className="absolute bottom-0 left-0 h-56 w-full opacity-30 vt-lines" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-[#ffcc00]">Contact Us</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
              Let&apos;s Work Together
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-white/68">
              Have a project in mind? Let&apos;s discuss how Vidhya Tech can help you achieve your digital goals.
            </p>

            <div className="mt-10 space-y-5 text-sm text-white/78">
              <a className="flex items-center gap-4 transition hover:text-[#ffcc00]" href="tel:+917817097517">
                <PhoneIcon className="h-5 w-5 text-[#ffcc00]" />
                +91 7817097517
              </a>
              <a className="flex items-center gap-4 transition hover:text-[#ffcc00]" href="mailto:vidhyatech1@gmail.com">
                <MailIcon className="h-5 w-5 text-[#ffcc00]" />
                vidhyatech1@gmail.com
              </a>
              <p className="flex items-center gap-4">
                <PinIcon className="h-5 w-5 text-[#ffcc00]" />
                India
              </p>
            </div>

            <div className="mt-10 flex gap-3">
              {['f', 'in', 'ig', 'yt'].map((item) => (
                <a
                  key={item}
                  href="#"
                  aria-label={item}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-sm font-black text-white transition hover:border-[#ffcc00] hover:bg-[#ffcc00] hover:text-black"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg border border-white/12 bg-white/[0.075] p-6 shadow-[0_24px_80px_rgba(0,0,0,.45)] backdrop-blur md:p-8">
            <div className="grid gap-5">
              <input
                required
                name="name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Your Name"
                className="h-14 rounded-md border border-white/10 bg-black/25 px-5 text-sm text-white outline-none transition placeholder:text-white/62 focus:border-[#ffcc00]"
              />
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="Your Email"
                className="h-14 rounded-md border border-white/10 bg-black/25 px-5 text-sm text-white outline-none transition placeholder:text-white/62 focus:border-[#ffcc00]"
              />
              <textarea
                required
                name="message"
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                placeholder="Your Message"
                rows={6}
                className="min-h-40 resize-none rounded-md border border-white/10 bg-black/25 px-5 py-5 text-sm text-white outline-none transition placeholder:text-white/62 focus:border-[#ffcc00]"
              />
              <button type="submit" disabled={isSending} className="vt-gold-button h-14 text-sm font-black disabled:cursor-not-allowed disabled:opacity-60">
                {isSending ? 'Sending Message...' : 'Send Message'}
              </button>
              {status && <p className="text-sm text-white/72">{status}</p>}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M8 9 5 12l3 3" />
      <path d="m16 9 3 3-3 3" />
      <path d="m13.5 6-3 12" />
      <rect x="3" y="4" width="18" height="16" rx="2" />
    </svg>
  );
}

function BotIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="5" y="8" width="14" height="10" rx="3" />
      <path d="M12 5v3" />
      <path d="M8 13h.01M16 13h.01" />
      <path d="M9 18v2M15 18v2" />
      <path d="M4 12H2M22 12h-2" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 19V11" />
      <path d="M12 19V5" />
      <path d="M19 19v-9" />
      <path d="M3 19h18" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm-2.1-6.25 6-3.75-6-3.75v7.5Z" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M16 20c0-2.2-1.8-4-4-4H8c-2.2 0-4 1.8-4 4" />
      <circle cx="10" cy="8" r="4" />
      <path d="M20 20c0-1.9-1.3-3.5-3-3.9" />
      <path d="M15.5 4.5a3.5 3.5 0 0 1 0 7" />
    </svg>
  );
}

function CpuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <rect x="10" y="10" width="4" height="4" rx="1" />
      <path d="M4 9h3M4 15h3M17 9h3M17 15h3M9 4v3M15 4v3M9 17v3M15 17v3" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.7 19.7 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
