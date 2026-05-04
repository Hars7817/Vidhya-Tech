/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';

interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  order: number;
}

interface PortfolioResponse {
  data?: PortfolioProject[];
}

const defaultPortfolios: PortfolioProject[] = [
  {
    id: 1,
    title: 'Digital Agency Website',
    description: 'Premium landing page for a growing agency brand.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
    link: '#',
    category: 'Web Design',
    order: 1,
  },
  {
    id: 2,
    title: 'E-Commerce Website',
    description: 'Modern product storefront with conversion-focused pages.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85',
    link: '#',
    category: 'Web Development',
    order: 2,
  },
  {
    id: 3,
    title: 'AI Chatbot Solution',
    description: 'Automated support flow for lead capture and service questions.',
    image: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?auto=format&fit=crop&w=900&q=85',
    link: '#',
    category: 'AI Solutions',
    order: 3,
  },
  {
    id: 4,
    title: 'Fitness Website Design',
    description: 'Bold fitness landing page with packages and booking CTA.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85',
    link: '#',
    category: 'Web Design',
    order: 4,
  },
  {
    id: 5,
    title: 'Restaurant Website',
    description: 'Menu, gallery, reservation, and local SEO-ready restaurant site.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c?auto=format&fit=crop&w=900&q=85',
    link: '#',
    category: 'Web Development',
    order: 5,
  },
  {
    id: 6,
    title: 'Marketing Campaign',
    description: 'Launch assets and social media campaign for a brand rollout.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=900&q=85',
    link: '#',
    category: 'Marketing',
    order: 6,
  },
];

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<PortfolioProject[]>(defaultPortfolios);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadPortfolio = async () => {
      try {
        const response = await fetch('/api/portfolio');
        const data = (await response.json()) as PortfolioResponse;

        if (isMounted && data.data?.length) {
          setPortfolios(data.data);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPortfolio();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] px-5 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-black uppercase text-[#ffcc00]">Our Work</p>
          <h1 className="mt-3 text-5xl font-black text-white">Our Portfolio</h1>
          <p className="mt-5 text-base leading-7 text-white/65">
            Explore recent projects and see how we help businesses transform their digital presence.
          </p>
        </div>

        {loading && <p className="mt-10 text-center text-sm text-white/55">Loading projects...</p>}

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((project) => (
            <article key={project.id} className="group overflow-hidden rounded-lg border border-white/15 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/65">
              <div className="relative h-52 overflow-hidden bg-[#111]">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                  <div className="grid h-full place-items-center bg-[linear-gradient(135deg,#151515,#282000)] px-6 text-center text-lg font-black text-white">
                    {project.title}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              <div className="p-6">
                <span className="inline-flex rounded-md bg-[#ffcc00] px-3 py-1 text-xs font-black text-black">
                  {project.category}
                </span>
                <h2 className="mt-4 text-2xl font-black text-white">{project.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/62">{project.description}</p>
                {project.link && (
                  <a href={project.link} className="mt-5 inline-flex text-sm font-black text-[#ffcc00] transition hover:text-white">
                    View Project
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
