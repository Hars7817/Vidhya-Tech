import {
  CertificatesSection,
  ClientsShowcase,
  ReviewsSection,
  SocialProofSection,
} from '../components/ProofSections';

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10 px-5 py-24 text-center sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,204,0,.16),transparent_34%),linear-gradient(180deg,#080808,#030303)]" />
        <p className="text-sm font-black uppercase text-[#ffcc00]">Our Client</p>
        <h1 className="mx-auto mt-4 max-w-4xl text-5xl font-black leading-tight text-white sm:text-6xl">
          Client Showcase, Proof, Reviews, And Credential Cards
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65">
          A dedicated trust page for client-style cards, proof metrics, sample review templates, and placeholder certificates.
        </p>
      </section>

      <ClientsShowcase />
      <SocialProofSection />
      <CertificatesSection />
      <ReviewsSection />
    </div>
  );
}
