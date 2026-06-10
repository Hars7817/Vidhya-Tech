'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';
import VoiceAgent from './components/VoiceAgent';
import { heroSlides } from './heroSlides';
import {
  CERTIFICATES,
  CLIENT_VALUE_CARDS,
  FEATURED_PROJECTS,
  SITE_STAT_CARDS,
  SITE_STATS,
  TEAM_MEMBERS,
} from '@/lib/site-data';
// import { img } from 'framer-motion/client';
// Services Data
const services = [
  {
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    title: 'Web Development',
    description:
      'We build fast, responsive websites that engage and convert your business needs.',
    color: 'from-blue-500/20 to-blue-600/20',
  },

  {
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
    title: 'AI Automation',
    description:
      'Automate your business workflows with cutting-edge AI solutions.',
    color: 'from-purple-500/20 to-purple-600/20',
  },

  {
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    title: 'Digital Marketing',
    description:
      'Grow your brand with result-driven marketing strategies.',
    color: 'from-pink-500/20 to-pink-600/20',
  },

  {
    image:
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    title: 'Video Editing',
    description:
      'Professional video editing services for YouTube, Reels and social media.',
    color: 'from-cyan-500/20 to-cyan-600/20',
  },

  {
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop',
    title: 'Social Media Management',
    description:
      'We manage your social media accounts and boost your online presence.',
    color: 'from-orange-500/20 to-orange-600/20',
  },

  {
    image:
      'https://images.unsplash.com/photo-1674027392884-7513d1e5e0b6?q=80&w=1200&auto=format&fit=crop',
    title: 'AI Integration',
    description:
      'Integrate AI into your business for smarter solutions.',
    color: 'from-green-500/20 to-green-600/20',
  },
];

// Portfolio Projects
const portfolioProjects = FEATURED_PROJECTS;
const teamMembers = TEAM_MEMBERS;

// Animated Circle Component with Enhanced Zoom
const AnimatedCircle = ({ delay = 0, size = 300, opacity = 0.1 }) => {
  return (
    <motion.div
      className="absolute rounded-full border border-[#ffcc00]/40 bg-[#ffcc00]/8 blur-sm"
      style={{
        width: size,
        height: size,

      }}
      animate={{
        scale: [1, 1.5, 0.8, 1],
        opacity: [opacity, opacity * 2, opacity * 0.5, opacity],
      }}
      transition={{
        duration: 6,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

// Hero Carousel Component
const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-[500px] md:h-[650px] overflow-visible">


      {/* Background Glow */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#ffcc00]/60 bg-[#ffcc00]/20 blur-3xl z-0 shadow-[0_0_120px_rgba(255,204,0,0.4)]" />

      {/* Animated Ring */}
      <motion.div
        className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border-2 border-[#ffcc00]/60 z-0 shadow-[0_0_80px_rgba(255,204,0,0.3)]"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentIndex === index ? 1 : 0,
            scale: currentIndex === index ? 1 : 0.96,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          {/* Main Card */}
          <motion.div
            className="relative z-10 w-full max-w-[420px] h-[280px] md:h-[420px] rounded-[24px] overflow-hidden border border-white/20"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Image */}
            <Image
              src={slide.image}
              alt={slide.title || 'Hero slide'}
              className="w-full h-full object-cover"
              width={600}
              height={500}
              quality={60}
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-10">
              <p className="text-[#ffcc00] text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-2">
                {slide.label}
              </p>

              <h3 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">
                {slide.title}
              </h3>

              <p className="text-sm md:text-base text-white/70 max-w-md leading-relaxed">
                {slide.text}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-5 flex gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentIndex === index ? "true" : "false"}
            className={`transition-all duration-300 rounded-full ${currentIndex === index
                ? "w-10 h-3 bg-[#ffcc00]"
                : "w-3 h-3 bg-white/40"
              }`}
          />
        ))}
      </div>
    </div>
  );
};
// Animated Stats Component (now static for faster first paint)
const AnimatedStats = () => {
  const stats = [
    { number: SITE_STATS.projects, label: 'Projects Completed' },
    { number: SITE_STATS.clients, label: 'Happy Clients' },
    { number: SITE_STATS.years, label: 'Years Experience' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 pt-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-4xl md:text-5xl font-black text-[#ffcc00]">{stat.number}</div>
          <p className="text-sm text-white/60 mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-hidden">
      <Header />

      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden flex-1 px-5 py-16 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="mx-auto max-w-7xl w-full">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
            {/* Left Content (static for fast first paint) */}
            <div className="space-y-6 z-10">
              <div className="text-sm font-bold text-[#ffcc00] uppercase tracking-widest inline-block px-4 py-2 border border-[#ffcc00]/30 rounded-full">
                Digital Solutions That Drive Real Growth
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                Vidhya Tech -{' '}
                <span className="text-[#ffcc00] block">Web Development & AI Agency in India</span>
              </h1>

              <p className="text-lg text-white/70 max-w-lg leading-relaxed">
                Vidhya Tech is a leading web development and AI automation agency in India, helping businesses grow with modern websites, digital marketing, and smart technology solutions.
              </p>
              {/* SEO hidden text */}
              <p className="hidden">
                Vidhya Tech offers web development, AI automation, digital marketing,
                social media management, and video editing services in India.
              </p>

              {/* Stats */}
              <AnimatedStats />

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-8 flex-wrap">
                <Link
                  href="/services"
                  className="vt-gold-button px-8 py-3 font-black rounded-lg hover:scale-105 transition-transform"
                >
                  Our Services
                </Link>
                <Link
                  href="/portfolio"
                  className="border-2 border-[#ffcc00] px-8 py-3 font-black rounded-lg hover:bg-[#ffcc00] hover:text-black transition-all duration-300"
                >
                  View Portfolio
                </Link>
              </div>
            </div>

            {/* Right Carousel */}
            <div>
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES SECTION ============ */}
      {/* SERVICES SECTION */}
      <section className="w-full bg-black py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-6xl font-black text-white">
              Our <span className="text-yellow-400">Services</span>
            </h2>

            <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
              Complete digital solutions to grow your business
              and deliver measurable results.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* CARD 1 */}
            <div className="group rounded-[28px] overflow-hidden border border-blue-500/40 bg-[#07152c] hover:scale-[1.02] transition duration-300">

              {/* Image */}
              <div className="relative h-[180px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop"
                  alt="Web Development"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  width={600}
                  height={180}
                  quality={60}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07152c] to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-blue-600/30 border border-blue-400 flex items-center justify-center text-xs font-black tracking-[0.2em] text-white mb-4">
                  WEB
                </div>

                <h3 className="text-white text-2xl font-bold mb-3">
                  Web Development
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed">
                  We build fast, responsive websites that engage and
                  convert your business needs.
                </p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="group rounded-[28px] overflow-hidden border border-purple-500/40 bg-[#210433] hover:scale-[1.02] transition duration-300">

              <div className="relative h-[180px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop"
                  alt="AI Automation"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  width={600}
                  height={180}
                  quality={60}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#210433] to-transparent" />
              </div>

              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-purple-600/30 border border-purple-400 flex items-center justify-center text-xs font-black tracking-[0.2em] text-white mb-4">
                  AI
                </div>

                <h3 className="text-white text-2xl font-bold mb-3">
                  AI Automation
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Automate your business workflows with cutting-edge
                  AI solutions.
                </p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="group rounded-[28px] overflow-hidden border border-pink-500/40 bg-[#330017] hover:scale-[1.02] transition duration-300">

              <div className="relative h-[180px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
                  alt="Digital Marketing"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  width={600}
                  height={180}
                  quality={60}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#330017] to-transparent" />
              </div>

              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-pink-600/30 border border-pink-400 flex items-center justify-center text-xs font-black tracking-[0.2em] text-white mb-4">
                  MKT
                </div>

                <h3 className="text-white text-2xl font-bold mb-3">
                  Digital Marketing
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Grow your brand with result-driven marketing
                  strategies.
                </p>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="group rounded-[28px] overflow-hidden border border-cyan-500/40 bg-[#03242b] hover:scale-[1.02] transition duration-300">

              <div className="relative h-[180px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop"
                  alt="Video Editing"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  width={600}
                  height={180}
                  quality={60}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#03242b] to-transparent" />
              </div>

              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-cyan-600/30 border border-cyan-400 flex items-center justify-center text-xs font-black tracking-[0.2em] text-white mb-4">
                  VID
                </div>

                <h3 className="text-white text-2xl font-bold mb-3">
                  Video Editing
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Professional video editing services for YouTube,
                  Reels and social media.
                </p>
              </div>
            </div>

            {/* CARD 5 */}
            <div className="group rounded-[28px] overflow-hidden border border-orange-500/40 bg-[#2b1200] hover:scale-[1.02] transition duration-300">

              <div className="relative h-[180px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=600&auto=format&fit=crop"
                  alt="Social Media"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  width={600}
                  height={180}
                  quality={60}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2b1200] to-transparent" />
              </div>

              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-orange-600/30 border border-orange-400 flex items-center justify-center text-xs font-black tracking-[0.2em] text-white mb-4">
                  SOC
                </div>

                <h3 className="text-white text-2xl font-bold mb-3">
                  Social Media Management
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed">
                  We manage your social media accounts and boost
                  your online presence.
                </p>
              </div>
            </div>

            {/* CARD 6 */}
            <div className="group rounded-[28px] overflow-hidden border border-green-500/40 bg-[#03240f] hover:scale-[1.02] transition duration-300">

              <div className="relative h-[180px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=600&auto=format&fit=crop"
                  alt="AI Integration"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  width={600}
                  height={180}
                  quality={60}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#03240f] to-transparent" />
              </div>

              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-green-600/30 border border-green-400 flex items-center justify-center text-xs font-black tracking-[0.2em] text-white mb-4">
                  INT
                </div>

                <h3 className="text-white text-2xl font-bold mb-3">
                  AI Integration
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Integrate AI into your business for smarter
                  solutions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ PORTFOLIO SECTION ============ */}
      <section className="px-5 py-24 sm:px-6 lg:px-8 bg-black relative">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p className="text-sm font-bold text-[#ffcc00] uppercase tracking-widest mb-4 inline-block px-4 py-2 border border-[#ffcc00]/30 rounded-full">
              OUR WORK
            </motion.p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Our Portfolio
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
              Explore a small set of approved projects that showcase our web design, development, and digital solutions.
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {portfolioProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#ffcc00]/50 transition-all duration-300 block cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-video bg-gradient-to-br overflow-hidden flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffcc00]/5 to-transparent" />
                  <motion.div
                    className="w-24 h-24 md:w-32 md:h-32"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      width={200}
                      height={200}
                      quality={60}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  </motion.div>
                </div>
                <div className="p-6 border-t border-white/10 group-hover:bg-white/[0.05] transition-all">
                  <p className="text-xs font-bold text-[#ffcc00] uppercase tracking-widest mb-3">
                    {project.category}
                  </p>
                  <h3 className="text-lg font-black text-white leading-tight group-hover:text-[#ffcc00] transition-colors mb-3">{project.title}</h3>
                  <p className="text-sm text-white/70 mb-4 leading-relaxed">{project.description}</p>
                  <motion.button
                    className="inline-block px-4 py-2 bg-[#ffcc00] text-black font-bold rounded-lg hover:bg-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    View Project {'->'}
                  </motion.button>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              href="/portfolio"
              className="vt-gold-button px-8 py-3 font-black rounded-lg inline-block hover:scale-105 transition-transform"
            >
              View All Projects
            </Link>
            <p className="mt-4 text-sm text-white/50">
              More approved projects will be added as they are published.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ STATS BAND ============ */}
      <section className="px-5 py-24 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute w-96 h-96 bg-[#ffcc00] rounded-full blur-3xl"
            style={{ left: '10%', top: '50%' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-[#ffcc00] rounded-full blur-3xl"
            style={{ right: '10%', top: '30%' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p className="text-sm font-bold text-[#ffcc00] uppercase tracking-widest mb-4 inline-block px-4 py-2 border border-[#ffcc00]/30 rounded-full">
              WHY CHOOSE US
            </motion.p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Why Clients Choose Vidhya Tech
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
              A quick snapshot of the work we have delivered and the response time we keep for new enquiries.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {SITE_STAT_CARDS.map((stat, index) => (
              <div
                key={stat.label}
                className={`opacity-0 animate-fadeIn group relative rounded-2xl border border-[#ffcc00]/30 bg-white/[0.02] backdrop-blur-sm p-6 transition duration-300 hover:scale-105 hover:-translate-y-2 hover:border-[#ffcc00]/80`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffcc00]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#ffcc00]/40 bg-[#ffcc00]/10 text-sm font-black tracking-[0.2em] text-[#ffcc00]">
                    {stat.icon}
                  </div>

                  <div className="text-4xl font-black text-[#ffcc00] mb-2">
                    {stat.number}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {stat.label}
                  </h3>

                  <p className="text-sm text-white/70 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* ============ OPTION B: PROJECT CATEGORIES (ALTERNATIVE) ============ */}
      {/* Uncomment to use this version instead of Option A */}
      {/*
      <section className="px-5 py-24 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p className="text-sm font-bold text-[#ffcc00] uppercase tracking-widest mb-4 inline-block px-4 py-2 border border-[#ffcc00]/30 rounded-full">
              INDUSTRIES SERVED
            </motion.p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Trusted By Clients Across Industries
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
              We&apos;ve built digital solutions for schools, e-commerce brands, fitness studios, restaurants, and startups across India.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { icon: 'ðŸŽ“', label: 'Educational Institutions' },
              { icon: 'ðŸ›ï¸', label: 'E-Commerce Brands' },
              { icon: 'ðŸ’ª', label: 'Fitness Studios' },
              { icon: 'ðŸ½ï¸', label: 'Restaurants & Cafes' },
              { icon: 'ðŸš€', label: 'Tech Startups' },
              { icon: 'ðŸ“±', label: 'Service Providers' },
            ].map((category, index) => (
              <motion.div
                key={index}
                className="group relative rounded-full border-2 border-[#ffcc00]/50 bg-white/[0.03] backdrop-blur-sm hover:border-[#ffcc00] px-6 py-3 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 204, 0, 0.1)' }}
              >
                <span className="text-2xl mr-3">{category.icon}</span>
                <span className="font-bold text-white group-hover:text-[#ffcc00] transition-colors">
                  {category.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      */}

      {/* ============ CERTIFICATIONS SECTION ============ */}
      <section className="px-5 py-24 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-black">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="text-center mb-20">
            <p className="text-sm font-bold text-[#ffcc00] uppercase tracking-widest mb-4 inline-block px-4 py-2 border border-[#ffcc00]/30 rounded-full">
              CREDENTIALS
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Our Certifications & Skills
            </h2>

            <p className="text-white/70 max-w-3xl mx-auto text-lg">
              Industry-recognized certifications and expertise that drive our work.
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#ffcc00]/50 transition-all duration-300"
              >
                <div className="rounded-xl overflow-hidden mb-5 bg-white p-2">
                  <Image
                    src={cert.img}
                    alt={cert.title}
                    className="w-full h-[180px] object-contain rounded-lg"
                    width={300}
                    height={180}
                    quality={60}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white text-center">
                  {cert.title}
                </h3>

                <p className="text-[#ffcc00] text-sm font-bold text-center mt-2 uppercase tracking-widest">
                  {cert.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* ============ TEAM SECTION ============ */}
      <section className="px-5 py-24 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-black relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p className="text-sm font-bold text-[#ffcc00] uppercase tracking-widest mb-4 inline-block px-4 py-2 border border-[#ffcc00]/30 rounded-full">
              OUR TEAM
            </motion.p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Meet Our Experts
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
              A talented team of developers, designers, and strategists dedicated to bringing your vision to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${member.bgColor} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                />

                <div className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-[#ffcc00]/50 transition-all duration-300">
                  <motion.div
                    className="mb-8 flex justify-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, delay: index * 0.3, repeat: Infinity }}
                  >
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#ffcc00]/70 bg-black shadow-[0_0_30px_rgba(255,204,0,.25)]">
                      <Image
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        width={96}
                        height={96}
                        quality={60}
                        sizes="96px"
                      />
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-black text-white text-center mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#ffcc00] font-bold text-center mb-4 text-sm uppercase tracking-widest">
                    {member.role}
                  </p>

                  <p className="text-white/70 text-center leading-relaxed mb-6">
                    {member.description}
                  </p>

                  <div className="flex justify-center">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-[#ffcc00]/30 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-[#ffcc00] hover:text-black"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>      {/* ============ WHAT CLIENTS APPRECIATE SECTION ============ */}
      <section className="px-5 py-24 sm:px-6 lg:px-8 bg-black relative">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-bold text-[#ffcc00] uppercase tracking-widest mb-4 inline-block px-4 py-2 border border-[#ffcc00]/30 rounded-full">
              WHAT CLIENTS APPRECIATE
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Delivery Themes
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
              The practical themes we design around most often: communication, clear design, and dependable follow-through.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {CLIENT_VALUE_CARDS.map((card, index) => (
              <motion.div
                key={`${card.title}-${index}`}
                className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#ffcc00]/30 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`grid h-12 w-12 place-items-center rounded-full ${card.avatarClass} text-sm font-black text-white`}>
                    {card.initials}
                  </div>
                  <div>
                    <p className="font-black text-white">{card.title}</p>
                    <p className="text-sm text-white/60">{card.context}</p>
                  </div>
                </div>

                <p className="text-white/80 leading-relaxed italic">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>      {/* ============ CTA SECTION ============ */}
      <section className="px-5 py-24 sm:px-6 lg:px-8 bg-gradient-to-r from-[#ffcc00]/10 to-[#ffcc00]/5 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute w-96 h-96 bg-[#ffcc00] rounded-full blur-3xl"
            style={{ left: '-10%', top: '50%' }}
            animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-[#ffcc00] rounded-full blur-3xl"
            style={{ right: '-10%', bottom: '10%' }}
            animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="mx-auto max-w-4xl text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Grow Your Business?
          </motion.h2>

          <motion.p
            className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Let&apos;s discuss how we can help you achieve your digital goals with innovative solutions tailored to your unique business needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="vt-gold-button px-10 py-4 font-black inline-block text-lg rounded-lg hover:scale-105 transition-transform shadow-lg"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
      {/* <VoiceAgent /> */}
      <Footer />
    </div>
  );
}