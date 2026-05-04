'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '/#home', match: '/' },
  { label: 'Services', href: '/services', match: '/services' },
  { label: 'Clients', href: '/clients', match: '/clients' },
  { label: 'Portfolio', href: '/portfolio', match: '/portfolio' },
  { label: 'Story', href: '/story', match: '/story' },
  { label: 'Contact', href: '/contact', match: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030303]/95 text-white shadow-[0_12px_40px_rgba(0,0,0,.35)] backdrop-blur">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/#home" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-md bg-[#ffcc00] text-black shadow-[0_0_24px_rgba(255,204,0,.45)]">
            <LogoMark />
          </span>
          <span className="text-xl font-black">
            Vidhya <span className="text-[#ffcc00]">Tech</span>
          </span>
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="grid h-10 w-10 place-items-center rounded-md border border-white/15 text-white md:hidden"
          onClick={() => setIsOpen((current) => !current)}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d={isOpen ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
        </button>

        <div
          className={`${isOpen ? 'flex' : 'hidden'} absolute inset-x-5 top-[86px] flex-col gap-1 rounded-lg border border-white/10 bg-[#070707] p-4 shadow-2xl md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none lg:gap-9`}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.match || (pathname === '/' && item.label === 'Home');

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`relative rounded-md px-3 py-2 text-sm font-bold transition md:px-0 ${isActive ? 'text-[#ffcc00]' : 'text-white hover:text-[#ffcc00]'}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-3 h-px bg-[#ffcc00] transition-all md:left-0 ${isActive ? 'w-8' : 'w-0'}`} />
              </Link>
            );
          })}
          <Link href="/contact" onClick={() => setIsOpen(false)} className="vt-gold-button mt-3 px-6 py-3 text-center text-sm font-black md:mt-0">
            Get In Touch
          </Link>
        </div>
      </nav>
    </header>
  );
}

function LogoMark() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path d="M8.5 5.5 12 3l3.5 2.5v5L12 13l-3.5-2.5v-5Z" />
      <path d="M5 7.5v9L12 21l7-4.5v-9" />
      <path d="M12 13v4" />
    </svg>
  );
}
