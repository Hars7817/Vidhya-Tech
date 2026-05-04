import Link from 'next/link';
import {
  BusinessStorySection,
  LocationSection,
  SocialProofSection,
} from '../components/ProofSections';

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10 px-5 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_18%,rgba(255,204,0,.16),transparent_34%),linear-gradient(180deg,#080808,#030303)]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.75fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase text-[#ffcc00]">Our Business Story</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight text-white sm:text-6xl">
              The Story Behind Vidhya Tech&apos;s Digital Growth System
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/65">
              Use this page to present your background, process, values, social proof, and location in one polished business narrative.
            </p>
          </div>
          <div className="rounded-lg border border-[#ffcc00]/25 bg-[#ffcc00]/10 p-6">
            <p className="text-sm font-bold uppercase text-[#ffcc00]">Business Focus</p>
            <p className="mt-4 text-3xl font-black leading-tight text-white">
              Websites, automation, marketing, and AI tools for real business outcomes.
            </p>
            <Link href="/services" className="mt-6 inline-flex text-sm font-black text-[#ffcc00] transition hover:text-white">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <BusinessStorySection />
      <SocialProofSection />
      <LocationSection />
    </div>
  );
}
