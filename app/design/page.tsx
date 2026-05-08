'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const designs = [
  {
    title: 'Website Design',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
    link: 'https://example.com',
  },
  {
    title: 'ERP Software UI',
    category: 'Software',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
    link: '/design/erp', // 👈 internal page
  },
  {
    title: 'Mobile App Design',
    category: 'App',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200',
    link: 'https://example.com',
  },
  {
    title: 'Dashboard UI',
    category: 'UI/UX',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200',
    link: 'https://example.com',
  },
  {
    title: 'E-commerce Design',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
    link: 'https://example.com',
  },
  {
    title: 'Portfolio Design',
    category: 'Creative',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200',
    link: 'https://example.com',
  },
  {
    title: 'Landing Page Design',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200',
    link: 'https://example.com',
  },
  {
    title: 'Admin Panel UI',
    category: 'Software',
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=1200',
    link: 'https://example.com',
  },
  {
    title: 'SaaS Product Design',
    category: 'Startup',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    link: 'https://example.com',
  },
  {
    title: 'Restaurant Website',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    link: 'https://example.com',
  },
];

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">

      {/* HERO */}
      <section className="px-5 py-24 text-center border-b border-white/10">
        <p className="text-lg font-black uppercase text-[#ffcc00]">
          Our Designs
        </p>

        <h1 className="mt-4 text-5xl md:text-6xl font-black">
          Explore Our Design Collection
        </h1>

        <p className="mt-6 text-white/60 max-w-2xl mx-auto">
          Browse through our latest UI/UX, websites, dashboards, and software designs.
        </p>
      </section>

      {/* GRID */}
      <section className="px-5 py-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {designs.map((design, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={design.link}
                className="group block rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-[#ffcc00]/40 transition-all"
              >
                {/* IMAGE */}
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <p className="text-sm text-[#ffcc00] uppercase mb-2">
                    {design.category}
                  </p>

                  <h3 className="text-xl font-bold group-hover:text-[#ffcc00]">
                    {design.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}

        </div>
      </section>
    </div>
  );
}