'use client';

import { FormEvent, useState } from 'react';
import { LocationSection } from '../components/ProofSections';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const data = (await res.json()) as { error?: string };
        setError(data.error || 'Failed to submit form');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase text-[#ffcc00]">Our Contact Page</p>
            <h1 className="mt-3 text-5xl font-black leading-tight text-white">Let&apos;s Work Together</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/65">
              Have a project in mind? Tell us what you want to build and we will get back to you with the next step.
            </p>

            <div className="mt-10 grid gap-5 text-sm text-white/70">
              <a href="mailto:vidhyatech1@gmail.com" className="transition hover:text-[#ffcc00]">
                Email: vidhyatech1@gmail.com
              </a>
              <a href="tel:+917817097517" className="transition hover:text-[#ffcc00]">
                Phone: +91 7817097517
              </a>
              <p>Address: India</p>
            </div>
          </div>

          <div className="rounded-lg border border-white/12 bg-white/[0.06] p-6 shadow-[0_24px_80px_rgba(0,0,0,.45)] md:p-8">
            {submitted && (
              <div className="mb-6 rounded-md border border-[#ffcc00]/40 bg-[#ffcc00]/15 p-4 text-sm text-[#ffdd55]">
                Thank you. We will get back to you soon.
              </div>
            )}
            {error && (
              <div className="mb-6 rounded-md border border-red-400/40 bg-red-500/15 p-4 text-sm text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="h-14 rounded-md border border-white/10 bg-black/25 px-5 text-sm text-white outline-none transition placeholder:text-white/55 focus:border-[#ffcc00]"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className="h-14 rounded-md border border-white/10 bg-black/25 px-5 text-sm text-white outline-none transition placeholder:text-white/55 focus:border-[#ffcc00]"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone"
                className="h-14 rounded-md border border-white/10 bg-black/25 px-5 text-sm text-white outline-none transition placeholder:text-white/55 focus:border-[#ffcc00]"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Your Message"
                className="min-h-40 resize-none rounded-md border border-white/10 bg-black/25 px-5 py-5 text-sm text-white outline-none transition placeholder:text-white/55 focus:border-[#ffcc00]"
              />

              <button
                type="submit"
                disabled={loading}
                className="vt-gold-button h-14 text-sm font-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <LocationSection />
    </div>
  );
}
