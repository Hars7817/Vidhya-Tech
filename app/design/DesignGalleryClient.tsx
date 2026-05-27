/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const designs = [
  {
    title: 'Bright Futture Academy',
    category: 'Website',
    image: '/images/bright future academy.png',
    link: '/design/school',
    type: 'internal',
  },
  {
    title: 'Vidyalaya International School',
    category: 'Website',
    image: '/images/vidyalaya international school.png',
    link: '/design/erp',
    type: 'internal',
  },
  {
    title: 'Restaurant Website',
    category: 'Website',
    image: '/images/resturant.png',
    link: '/design/restaurant',
    type: 'internal',
  },
  {
    title: 'Billing Software',
    category: 'Industrial',
    image: '/images/billing.png',
    link: '/design/billingerp',
    type: 'internal',
  },
  {
    title: 'Nexmart E-commerce',
    category: 'Website',
    image: '/images/NEXMART website.png',
    link: '/design/nexmart',
    type: 'internal',
  },
  {
    title: 'Full E-commerce Website',
    category: 'website',
    image: '/images/ecommerce.png',
    link: '/design/ecommerce',
    type: 'internal',
  },
  {
    title: 'Construction Website',
    category: 'Website',
    image: '/images/construction website.png',
    link: '/design/construction',
    type: 'internal',
  },
  {
    title: 'School ERP Software',
    category: 'software',
    image: '/images/ERP Software.png',
    link: '/design/erpsoftware',
    type: 'internal',
  },
  {
    title: 'IRONFORGE Gym Website',
    category: 'Website',
    image: '/images/iron force gym website.png',
    link: '/design/gym',
    type: 'internal',
  },
  {
    title: 'Restaurant Website',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    link: 'https://example.com',
    type: 'external',
  },
];

export function DesignGalleryClient() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <section className="border-b border-white/10 px-5 py-24 text-center">
        <p className="text-lg font-black uppercase text-[#ffcc00]">
          Our Designs
        </p>

        <h1 className="mt-4 text-5xl font-black md:text-6xl">
          Explore Our Design Collection
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-white/60">
          Browse through our latest UI/UX, websites, dashboards, and software
          designs.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {designs.map((design, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {design.type === 'internal' ? (
                <Link
                  href={design.link}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all hover:border-[#ffcc00]/40"
                >
                  <CardContent design={design} />
                </Link>
              ) : (
                <a
                  href={design.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all hover:border-[#ffcc00]/40"
                >
                  <CardContent design={design} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

type DesignItem = (typeof designs)[number];

function CardContent({ design }: { design: DesignItem }) {
  return (
    <>
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={design.image}
          alt={design.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <p className="mb-2 text-sm uppercase text-[#ffcc00]">
          {design.category}
        </p>

        <h3 className="text-xl font-bold group-hover:text-[#ffcc00]">
          {design.title}
        </h3>
      </div>
    </>
  );
}
