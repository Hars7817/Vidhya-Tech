import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030303] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.2fr_.8fr_.9fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3 text-xl font-black">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[#ffcc00] text-black">
              VT
            </span>
            Vidhya <span className="text-[#ffcc00]">Tech</span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/58">
            Premium websites, AI automation, marketing systems, and digital launch support for modern brands.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase text-[#ffcc00]">Quick Links</h3>
          <div className="mt-5 grid gap-3 text-sm text-white/62">
            <Link href="/#home" className="transition hover:text-[#ffcc00]">Home</Link>
            <Link href="/services" className="transition hover:text-[#ffcc00]">Services</Link>
            <Link href="/clients" className="transition hover:text-[#ffcc00]">Clients</Link>
            <Link href="/portfolio" className="transition hover:text-[#ffcc00]">Portfolio</Link>
            <Link href="/story" className="transition hover:text-[#ffcc00]">Story</Link>
            <Link href="/contact" className="transition hover:text-[#ffcc00]">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase text-[#ffcc00]">Contact Info</h3>
          <div className="mt-5 grid gap-3 text-sm text-white/62">
            <a href="mailto:vidhyatech1@gmail.com" className="transition hover:text-[#ffcc00]">vidhyatech1@gmail.com</a>
            <a href="tel:+917817097517" className="transition hover:text-[#ffcc00]">+91 7817097517</a>
            <p>India</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-white/45">
        <p>Copyright 2026 Vidhya Tech. All rights reserved.</p>
      </div>
    </footer>
  );
}
