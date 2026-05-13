'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { heroSlides } from './heroSlides';
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
const portfolioProjects = [
  {
    id: 1,
    title: 'School Website',
    category: 'Web Design',
    description:
      'Modern educational platform with enrollment system and course management.',
    image:
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2Nob29sc3xlbnwwfHwwfHx8MA%3D%3D',
    link: '/designs/mainportfolio1',
  },

  {
    id: 2,
    title: 'E-Commerce Website',
    category: 'Web Development',
    description:
      'Modern product storefront with conversion-focused pages and checkout flow.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop',
    link: 'https://example-ecommerce.com',
  },

  {
    id: 3,
    title: 'AI Chatbot Solution',
    category: 'AI Solutions',
    description:
      'Automated support flow for lead capture and service questions.',
    image:
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1200&auto=format&fit=crop',
    link: 'https://example-chatbot.com',
  },

  {
    id: 4,
    title: 'Fitness Website Design',
    category: 'Web Design',
    description:
      'Bold fitness landing page with packages and booking CTA.',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',
    link: 'https://example-fitness.com',
  },

  {
    id: 5,
    title: 'Restaurant Website',
    category: 'Web Development',
    description:
      'Menu, gallery, reservation, and local SEO-ready restaurant site.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    link: 'https://example-restaurant.com',
  },

  {
    id: 6,
    title: 'Marketing Campaign',
    category: 'Marketing',
    description:
      'Launch assets and social media campaign for a brand rollout.',
    image:
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1200&auto=format&fit=crop',
    link: 'https://example-marketing.com',
  },
];
// Team Members
const teamMembers = [
  {
    id: 1,
    name: 'Harsh Kumar',
    role: 'Web Development',
    image: '/images/Happu sir.png',
    imagePosition: '50% 42%',
    linkedin: 'https://www.linkedin.com/in/harsh-kumar-69864036a',
    description: 'Expert in building scalable web applications with modern technologies.',
    bgColor: 'from-blue-600 to-blue-400'
  },
  {
    id: 2,
    name: 'Harsh Vasisth',
    role: 'Web & Software Development',
    image: '/images/Harsh sir9.png',
    imagePosition: '50% 42%',
    icon: '👨‍💼',  // Fallback icon
    description: 'Specialized in full-stack development and software architecture.',
    bgColor: 'from-purple-600 to-purple-400'
  },
  {
    id: 3,
    name: 'Lakshya Kumar Gupta',
    role: 'UI/UX Designer',
    image: '/images/Lakshya Sir.png',
    imagePosition: '50% 42%',
    linkedin: 'https://www.linkedin.com/in/lakshya-kumar-gupta-41a44b35b/',
    description: 'Creating beautiful and intuitive user experiences for digital products.',
    bgColor: 'from-pink-600 to-pink-400'
  }
];

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
    <div className="relative flex items-center justify-center w-full h-[500px] md:h-[650px] overflow-hidden">

    
     {/* Background Glow */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#ffcc00]/40 bg-[#ffcc00]/10 blur-3xl z-0" />

      {/* Animated Ring */}
      <motion.div
          className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border-2 border-[#ffcc00]/40 z-0"
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
          className="relative z-10 w-full max-w-[520px] h-[350px] md:h-[500px] rounded-[32px] overflow-hidden border-4 border-white/90 shadow-[0_0_60px_rgba(255,204,0,0.15)]"
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
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
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
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index
                ? "w-10 h-3 bg-[#ffcc00]"
                : "w-3 h-3 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
// Animated Stats Component
const AnimatedStats = () => {
  const stats = [
    { number: 14, suffix: '+', label: 'Projects Completed' },
    { number: 9, suffix: '+', label: 'Happy Clients' },
    { number: 2, suffix: '+', label: 'Years Experience' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-3 gap-4 pt-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={itemVariants} className="text-center">
          <div className="text-4xl md:text-5xl font-black text-[#ffcc00]">
            {stat.number}
            {stat.suffix}
          </div>
          <p className="text-sm text-white/60 mt-2">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-hidden">
      <Header />

      {/* ============ HERO SECTION ============ */}
      <section className="relative flex-1 px-5 py-16 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="mx-auto max-w-7xl w-full">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-6 z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                className="text-sm font-bold text-[#ffcc00] uppercase tracking-widest inline-block px-4 py-2 border border-[#ffcc00]/30 rounded-full"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                🚀 Digital Solutions That Drive Real Growth
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                We Build Digital{' '}
                <motion.span
                  className="text-[#ffcc00] block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Solutions That Scale
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg text-white/70 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Vidhya Tech is a full-service digital agency helping brands stand out in the digital world through innovative websites, AI solutions, and creative marketing.
              </motion.p>

              {/* Stats */}
              <AnimatedStats />

              {/* CTA Buttons */}
              <motion.div
                className="flex gap-4 pt-8 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
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
              </motion.div>
            </motion.div>

            {/* Right Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <HeroCarousel />
            </motion.div>
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
          <img
            src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop"
            alt="Web Development"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#07152c] to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-blue-600/30 border border-blue-400 flex items-center justify-center text-xl mb-4">
            💻
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
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
            alt="AI Automation"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#210433] to-transparent" />
        </div>

        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-purple-600/30 border border-purple-400 flex items-center justify-center text-xl mb-4">
            🤖
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
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
            alt="Digital Marketing"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#330017] to-transparent" />
        </div>

        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-pink-600/30 border border-pink-400 flex items-center justify-center text-xl mb-4">
            📢
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
          <img
            src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop"
            alt="Video Editing"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#03242b] to-transparent" />
        </div>

        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-cyan-600/30 border border-cyan-400 flex items-center justify-center text-xl mb-4">
            🎬
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
          <img
            src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1200&auto=format&fit=crop"
            alt="Social Media"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#2b1200] to-transparent" />
        </div>

        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-orange-600/30 border border-orange-400 flex items-center justify-center text-xl mb-4">
            👥
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
          <img
            src="https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1200&auto=format&fit=crop"
            alt="AI Integration"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#03240f] to-transparent" />
        </div>

        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-green-600/30 border border-green-400 flex items-center justify-center text-xl mb-4">
            🧠
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
              Explore our recent projects that showcase our expertise in web design, development, and digital solutions.
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
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                    View Project →
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
          </motion.div>
        </div>
      </section>

      {/* ============ CLIENTS SECTION ============ */}
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
              OUR CLIENTS
            </motion.p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Trusted By Leading Brands
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
              We&apos;ve partnered with companies across various industries to deliver exceptional digital solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['https://schoolaxis.in/assets/img/saas-c/team/school4.jpg', 'https://schoolaxis.in/assets/img/saas-c/team/school8.jpg', 'https://schoolaxis.in/assets/img/saas-c/team/school12.jpg', 'https://www.uneecops.com/wp-content/uploads/2023/09/Group-322.png', 'https://www.uneecops.com/wp-content/uploads/2023/09/Group-315.png', 'https://www.striven.com/wp-content/uploads/newsweek-logo.webp'].map((logo, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#ffcc00]/50 transition-all duration-300 h-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <img src={logo} alt={`Client ${index + 1}`} className="w-full h-full object-contain filter brightness-75 hover:brightness-100 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
        Industry-recognized certifications and expertise that drive our excellence.
      </p>
    </div>

    {/* Grid */}
    <div className="grid md:grid-cols-3 gap-8">

      {/* CARD */}
      {[
        {
          img: "/certificates/google.png",
          title: "Google Cloud Certified",
          subtitle: "Cloud Associate",
        },
        {
          img: "/certificates/aws.png",
          title: "AWS Certified",
          subtitle: "Solutions Architect",
        },
        {
          img: "/certificates/meta.png",
          title: "Meta Blueprint",
          subtitle: "Digital Marketing",
        },
        {
          img: "/certificates/hubspot.png",
          title: "HubSpot Academy",
          subtitle: "Inbound Certification",
        },
        {
          img: "/certificates/figma.png",
          title: "Figma Professional",
          subtitle: "UI/UX Design",
        },
        {
          img: "/certificates/openai.png",
          title: "OpenAI Partner",
          subtitle: "AI Implementation",
        },
      ].map((cert, index) => (

        <div
          key={index}
          className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#ffcc00]/50 transition-all duration-300"
        >

         {/* Certificate Image */}
               <div className="rounded-xl overflow-hidden mb-5 bg-white p-2">
                <img
                  src={cert.img}
                  alt={cert.title}
                  className="w-full h-[180px] object-contain rounded-lg"
                />
              </div>
            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-white text-center">
              {cert.title}
            </h3>

            {/* Subtitle */}
            <p className="text-[#ffcc00] text-sm font-bold text-center mt-2 uppercase tracking-widest">
              {cert.subtitle}
            </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ============ TEAM SECTION ============ */}
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
                  {/* Avatar Container */}
                  <motion.div
                    className="mb-8 flex justify-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, delay: index * 0.3, repeat: Infinity }}
                  >
                    {member.image && member.image.trim() !== '' ? (
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#ffcc00]/70 bg-black shadow-[0_0_30px_rgba(255,204,0,.25)]">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.bgColor} flex items-center justify-center text-4xl border-2 border-[#ffcc00]/50 shadow-lg`}>
                        {member.icon}
                      </div>
                    )}
                  </motion.div>

                  {/* Name and Role */}
                  <h3 className="text-2xl font-black text-white text-center mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#ffcc00] font-bold text-center mb-4 text-sm uppercase tracking-widest">
                    {member.role}
                  </p>

                

                  {/* Description */}
                  <p className="text-white/70 text-center leading-relaxed mb-6">
                    {member.description}
                  </p>

                  {/* Social Links */}
                  <motion.div
                    className="flex justify-center gap-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button className="w-10 h-10 rounded-full border border-[#ffcc00]/30 flex items-center justify-center hover:bg-[#ffcc00] hover:text-black transition-all">
                      f
                    </button>
                    <button className="w-10 h-10 rounded-full border border-[#ffcc00]/30 flex items-center justify-center hover:bg-[#ffcc00] hover:text-black transition-all">
                      𝕏
                    </button>
                    <a
                     href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full border border-[#ffcc00]/30 flex items-center justify-center hover:bg-[#ffcc00] hover:text-black transition-all"
                          >
                            in
                          </a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS SECTION ============ */}
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
        TESTIMONIALS
      </p>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
        What Our Clients Say
      </h2>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          text: 'Vidhya Tech transformed our online presence completely. Highly professional!',
          author: 'Amit Sharma',
          company: 'Tech Startup',
          image: 'https://randomuser.me/api/portraits/men/32.jpg',
          rating: 5
        },
        {
          text: 'Amazing results on our AI integration project. Exceeded expectations!',
          author: 'Rohit Verma',
          company: 'E-commerce Business',
          image: 'https://randomuser.me/api/portraits/men/45.jpg',
          rating: 5
        },
        {
          text: 'Their creative approach and timely delivery made all the difference.',
          author: 'Sandeep Gupta',
          company: 'Digital Marketing Agency',
          image: 'https://randomuser.me/api/portraits/men/65.jpg',
          rating: 5
        },
      ].map((testimonial, index) => (
        <motion.div
          key={index}
          className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#ffcc00]/30 transition-all"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >

          {/* 👤 Profile */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={testimonial.image}
              alt={testimonial.author}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#ffcc00]"
            />
            <div>
              <p className="font-black text-white">{testimonial.author}</p>
              <p className="text-sm text-white/60">{testimonial.company}</p>
            </div>
          </div>

          {/* ⭐ Real Stars */}
          <div className="flex mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-[#ffcc00]"
              >
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.32.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.386a.562.562 0 01-.84.61l-4.73-2.885a.563.563 0 00-.586 0l-4.73 2.885a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557L2.043 10.385a.562.562 0 01.32-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z" />
              </svg>
            ))}
          </div>

          {/* 💬 Review */}
          <p className="text-white/80 leading-relaxed italic">
            &ldquo;{testimonial.text}&rdquo;
          </p>

        </motion.div>
      ))}
    </div>
  </div>
</section>
      {/* ============ CTA SECTION ============ */}
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

      <Footer />
    </div>
  );
}
