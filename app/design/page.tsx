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
     type: 'internal'
  },
  {
  title: 'Steelcore Factory Website',
  category: 'Industrial',
  image: '/images/steelcore Factory.png',
  link: '/design/factory',
  type: 'internal'
},
  {
  title: 'Nexmart E-commerce',
  category: 'Website',
  image: '/images/NEXMART website.png',
  link: '/design/nexmart',
  type: 'internal'
},
  {
  title: 'Full E-commerce Website',
  category: 'website',
  image: '/images/ecommerce.png',
  link: '/design/ecommerce',
  type: 'internal'
},
  {
  title: 'Construction Website',
  category: 'Website',
  image: '/images/construction website.png',
  link: '/design/construction',
  type: 'internal'
},
  {
  title:  'School ERP Software',
  category: 'software',
  image: '/images/ERP Software.png',
  link: '/design/erpsoftware'
},
  {
  title: 'IRONFORGE Gym Website',
  category: 'Website',
  image: '/images/iron force gym website.png',
  link: '/design/gym'
},
  {
    title: 'Restaurant Website',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    link: 'https://example.com',
    type: 'external',
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

              {/* 🔥 CONDITION BASED LINK */}
              {design.type === 'internal' ? (
                <Link
                  href={design.link}
                  className="group block rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-[#ffcc00]/40 transition-all"
                >
                  <CardContent design={design} />
                </Link>
              ) : (
                <a
                  href={design.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-[#ffcc00]/40 transition-all"
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

/* 🔥 REUSABLE CARD */
type DesignItem = (typeof designs)[number];

function CardContent({ design }: { design: DesignItem }) {
  return (
    <>
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={design.image}
          alt={design.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-6">
        <p className="text-sm text-[#ffcc00] uppercase mb-2">
          {design.category}
        </p>

        <h3 className="text-xl font-bold group-hover:text-[#ffcc00]">
          {design.title}
        </h3>
      </div>
    </>
  );
}
