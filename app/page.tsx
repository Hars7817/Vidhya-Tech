'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';

// Services Data
const services = [
  {
    icon: '💻',
    title: 'Web Development',
    description: 'We build fast, responsive websites that engage and convert your business needs.',
    color: 'from-blue-500/20 to-blue-600/20'
  },
  {
    icon: '🤖',
    title: 'AI Automation',
    description: 'Automate your business workflows with cutting-edge AI solutions.',
    color: 'from-purple-500/20 to-purple-600/20'
  },
  {
    icon: '📊',
    title: 'Digital Marketing',
    description: 'Grow your brand with result-driven marketing strategies.',
    color: 'from-pink-500/20 to-pink-600/20'
  },
  {
    icon: '🎬',
    title: 'Video Editing',
    description: 'Professional video editing services for YouTube, Reels and social media.',
    color: 'from-cyan-500/20 to-cyan-600/20'
  },
  {
    icon: '👥',
    title: 'Social Media Management',
    description: 'We manage your social media accounts and boost your online presence.',
    color: 'from-orange-500/20 to-orange-600/20'
  },
  {
    icon: '⚙️',
    title: 'AI Integration',
    description: 'Integrate AI into your business for smarter solutions.',
    color: 'from-green-500/20 to-green-600/20'
  }
];

// Portfolio Projects
const portfolioProjects = [
  {
    id: 1,
    title: 'Digital Agency Website',
    category: 'Web Design',
    image: '🌐',
    color: '#3b82f6'
  },
  {
    id: 2,
    title: 'E-Commerce Website',
    category: 'Web Development',
    image: '🛍️',
    color: '#ec4899'
  },
  {
    id: 3,
    title: 'AI Chatbot Solution',
    category: 'AI Solutions',
    image: '🤖',
    color: '#8b5cf6'
  },
  {
    id: 4,
    title: 'Fitness Website Design',
    category: 'Web Design',
    image: '💪',
    color: '#f59e0b'
  },
  {
    id: 5,
    title: 'Restaurant Website',
    category: 'Web Development',
    image: '🍽️',
    color: '#10b981'
  },
  {
    id: 6,
    title: 'Marketing Campaign',
    category: 'Marketing',
    image: '📱',
    color: '#06b6d4'
  }
];

// Hero Carousel Images
const heroSlides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    title: 'Creative Digital Experiences',
    subtitle: 'Beautiful interfaces and powerful web solutions built to scale.',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    title: 'Modern Web Design',
    subtitle: 'Visually striking websites with polished typography and UI.',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
    title: 'AI-Powered Growth',
    subtitle: 'Smart automation and data-driven experiences for real results.',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    title: 'Fast & Responsive Sites',
    subtitle: 'High-performance websites optimized for every device.',
  },
];

// Team Members
const teamMembers = [
  {
    id: 1,
    name: 'Harsh Kumar',
    role: 'Web Development',
    emoji: '👨‍💻',
    description: 'Expert in building scalable web applications with modern technologies.',
    bgColor: 'from-blue-600 to-blue-400'
  },
  {
    id: 2,
    name: 'Harsh Vasisth',
    role: 'Web & Software Development',
    emoji: '👨‍🔧',
    description: 'Specialized in full-stack development and software architecture.',
    bgColor: 'from-purple-600 to-purple-400'
  },
  {
    id: 3,
    name: 'Lakshya Gupta',
    role: 'UI/UX Designer',
    emoji: '🎨',
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
    <div className="relative w-full h-96 md:h-full flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background Circles */}
      <AnimatedCircle delay={0} size={500} opacity={0.2} />
      <AnimatedCircle delay={1.5} size={350} opacity={0.15} />
      <AnimatedCircle delay={3} size={250} opacity={0.12} />
      
      {/* Additional accent circles for dramatic effect */}
      <motion.div
        className="absolute rounded-full border-2 border-[#ffcc00]/30 bg-[#ffcc00]/5"
        style={{ width: 450, height: 450, left: '-10%', top: '50%', transform: 'translateY(-50%)' }}
        animate={{
          scale: [1, 1.3, 0.7, 1],
          opacity: [0.08, 0.25, 0.05, 0.08],
        }}
        transition={{
          duration: 7,
          delay: 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute rounded-full border-2 border-[#ffcc00]/20 bg-[#ffcc00]/3"
        style={{ width: 600, height: 600, right: '-15%', bottom: '-20%' }}
        animate={{
          scale: [1, 1.4, 0.75, 1],
          opacity: [0.05, 0.2, 0.03, 0.05],
        }}
        transition={{
          duration: 8,
          delay: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Carousel Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              scale: index === currentIndex ? 1 : 0.95,
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <motion.img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover rounded-[28px] shadow-2xl border border-white/10"
              initial={{ scale: 1.05 }}
              animate={{
                scale: index === currentIndex ? [1.05, 1, 1.08] : 1.05,
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent rounded-[28px]" />
            <div className="absolute left-8 bottom-8 max-w-xl text-left text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-[#ffcc00] mb-2">
                Featured Project
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                {slide.title}
              </h3>
              <p className="mt-4 max-w-md text-sm md:text-base text-white/75">
                {slide.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-[#ffcc00]' : 'w-2 bg-white/30'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Framed Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-[#ffcc00]/40 pointer-events-none md:inset-8" />
    </div>
  );
};

// Animated Stats Component
const AnimatedStats = () => {
  const stats = [
    { number: 30, suffix: '+', label: 'Projects Completed' },
    { number: 15, suffix: '+', label: 'Happy Clients' },
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
      <section className="px-5 py-24 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#0a0a0a] relative">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p className="text-sm font-bold text-[#ffcc00] uppercase tracking-widest mb-4 inline-block px-4 py-2 border border-[#ffcc00]/30 rounded-full">
              WHAT WE DO
            </motion.p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Our Services
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
              We offer a comprehensive range of digital services designed to elevate your brand and drive measurable business results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`group p-8 rounded-2xl border border-white/10 bg-gradient-to-br ${service.color} backdrop-blur-sm hover:border-[#ffcc00]/50 transition-all duration-300 cursor-pointer`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div
                  className="text-6xl md:text-7xl mb-6"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2.5, delay: index * 0.2, repeat: Infinity }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-2xl font-black mb-3 text-white">{service.title}</h3>
                <p className="text-white/70 leading-relaxed text-base">{service.description}</p>
                <motion.div
                  className="mt-4 h-1 w-0 bg-[#ffcc00] group-hover:w-full transition-all duration-300"
                />
              </motion.div>
            ))}
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
              <motion.div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#ffcc00]/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-video bg-gradient-to-br overflow-hidden flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffcc00]/5 to-transparent" />
                  <motion.div
                    className="text-7xl md:text-8xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {project.image}
                  </motion.div>
                </div>
                <div className="p-6 border-t border-white/10">
                  <p className="text-xs font-bold text-[#ffcc00] uppercase tracking-widest mb-3">
                    {project.category}
                  </p>
                  <h3 className="text-lg font-black text-white leading-tight">{project.title}</h3>
                </div>
              </motion.div>
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
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.bgColor} flex items-center justify-center text-5xl border-2 border-[#ffcc00]/50 shadow-lg`}>
                      {member.emoji}
                    </div>
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
                    <button className="w-10 h-10 rounded-full border border-[#ffcc00]/30 flex items-center justify-center hover:bg-[#ffcc00] hover:text-black transition-all">
                      in
                    </button>
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
                author: 'Priya Sharma',
                company: 'Tech Startup',
                rating: 5
              },
              {
                text: 'Amazing results on our AI integration project. Exceeded expectations!',
                author: 'Rajesh Patel',
                company: 'E-commerce Business',
                rating: 5
              },
              {
                text: 'Their creative approach and timely delivery made all the difference.',
                author: 'Sneha Singh',
                company: 'Digital Marketing Agency',
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
                <div className="text-[#ffcc00] text-lg mb-4">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="text-white/80 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-black text-white">{testimonial.author}</p>
                  <p className="text-sm text-white/60">{testimonial.company}</p>
                </div>
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
            Let's discuss how we can help you achieve your digital goals with innovative solutions tailored to your unique business needs.
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
