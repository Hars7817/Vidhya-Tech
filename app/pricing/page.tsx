'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// ✅ 👇 YAHAN PASTE KARNA HAI
type Plan = {
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  popular?: boolean;
  features: string[];
  setup?: {
    old: string;
    new: string;
    offer?: boolean;
  };
};

type Section = {
  category: string;
  plans: Plan[];
};

const pricingData: Section[] = [
  {
    category: "Web Development",
    plans: [
      {
        name: "Basic",
        price: "₹6,999",
        oldPrice: "₹8,999",
        discount: "22% OFF",
        features: ["Up to 5 Pages", "Responsive Design", "Basic SEO Setup","Social Media Links","Contact Form"],
      },
      {
        name: "Standard",
        price: "₹9,999",
        oldPrice: "₹12,999",
        discount: "23% OFF",
        popular: true,
        features: ["Up to 10 Pages", "Advanced SEO Optimization", "Blog & News Section Setup", "Social Media Integration","Speed Optimization", "Google Analytics Integration"],
      },
      {
        name: "Premium",
        price: "₹14,999",
        oldPrice: "₹18,999",
        discount: "21% OFF",
        features: ["Unlimited Pages", "E-commerce Store Setup", "Payment Gateway Integration", "Advanced SEO","Security & Backup System", "Performance Optimization", "Live Chat"],
      },
    ],
  },

  {
    category: "School ERP",
    plans: [
      {
        name: "Basic",
        price: "₹799/mo",
        oldPrice: "₹999",
        discount: "20% OFF",
        features: ["Student Management", "Attendance","Parent SMS & Whatsapp Notification" , "Fee System", "1 Admin Login","Basic Dasboard"],
        setup: {
        old: "₹12,999",
        new: "₹7,999",
        offer: true,
      },
      },
      {
        name: "Standard",
        price: "₹1,499/mo",
        oldPrice: "₹1,999",
        discount: "25% OFF",
        popular: true,
        features: [ "All Basic Features", "Exam & Result Management", "Staff & Payroll Management","Library","5 Staff Login","Timetable Management", "Mobile App Access"],
        setup: {
        old: "₹17,999",
        new: "₹14,999",
        offer: true,
      },
      },
      {
        name: "Premium",
        price: "₹2,999/mo",
        oldPrice: "₹3,999",
        discount: "25% OFF",
        features: ["All Standard Features","Online Admission Portal", "Transport + Hostel","Priority Support","live Notification", "Advanced Analytics Dasboard","Costom School Branding"],
        setup: {
        old: "₹ 37,999",
        new: "₹24,999",
        offer: true,
      },
      },

    ],
  },

  {
    category: "Video Editing",
    plans: [
      {
        name: "Starter",
        price: "₹999",
        oldPrice: "₹1,499",
        discount: "33% OFF",
        features: ["1 Video", "Basic Editing", "Music + Cuts", "2 Revisions"],
      },
      {
        name: "Pro",
        price: "₹2,999",
        oldPrice: "₹4,999",
        discount: "40% OFF",
        popular: true,
        features: ["5 Videos", "Advanced Editing", "Effects", "Thumbnail"],
      },
      {
        name: "Agency",
        price: "₹7,999",
        oldPrice: "₹12,999",
        discount: "38% OFF",
        features: ["15 Videos", "Premium Editing", "YouTube + Reels", "Priority Delivery"],
      },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* 🔥 TOP BANNER */}
      <div className="bg-gradient-to-r from-[#ffcc00] to-yellow-500 text-black py-3 text-center font-bold">
        🚀 Limited Offer: Get School ERP Access for just ₹99 (7 Days Trial)
      </div>

      <div className="px-6 py-20">

        {/* HERO */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black">
            Our <span className="text-[#ffcc00]">Pricing Plans</span>
          </h1>
          <p className="text-white/70 mt-4">
            Affordable pricing designed to grow your business faster.
          </p>
        </div>

        {/* PRICING */}
        <div className="max-w-7xl mx-auto space-y-20">

          {pricingData.map((section, i) => (
            <div key={i}>

              <h2 className="text-3xl font-bold mb-10 text-center text-[#ffcc00]">
                {section.category}
              </h2>

              <div className="grid md:grid-cols-3 gap-8">

                {section.plans.map((plan, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`relative rounded-2xl p-8 border ${
                      plan.popular
                        ? "border-[#ffcc00] bg-[#ffcc00]/10"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >

                    {/* 🔥 MOST POPULAR */}
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ffcc00] text-black px-4 py-1 text-xs font-bold rounded-full">
                        🔥 Most Popular
                      </div>
                    )}

                    <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>

                    {/* PRICE */}
                    <div className="mb-4">
                      {plan.oldPrice && (
                        <p className="text-sm text-white/50 line-through">
                          {plan.oldPrice}
                        </p>
                      )}

                      <p className="text-4xl font-black text-[#ffcc00]">
                        {plan.price}
                      </p>

                      {plan.discount && (
                        <span className="text-xs bg-green-500 text-black px-2 py-1 rounded">
                          {plan.discount}
                        </span>
                      )}
                    </div>

                    {/* FEATURES */}
                    <ul className="space-y-3 mb-6 text-white/80">
                      {plan.features.map((f, i) => (
                        <li key={i}>✔ {f}</li>
                      ))}
                    </ul>

                    {/* BUTTON */}
                    <Link
                      href="/contact"
                      className="block text-center border border-[#ffcc00] text-[#ffcc00] py-3 rounded-lg font-bold hover:bg-[#ffcc00] hover:text-black transition"
                    >
                      Get Started
                    </Link>

                   {/* 🔥 ERP SETUP BOX */}
{section.category === "School ERP" && plan.setup && (
  <div className="mt-4 border border-[#ffcc00]/40 rounded-lg p-4 bg-[#ffcc00]/10 text-center">

    <p className="text-xs text-white/60 mb-1">
      One-time setup required
    </p>

    {/* Old Price */}
    {plan.setup.offer && (
      <p className="text-sm text-white/50 line-through">
        {plan.setup.old}
      </p>
    )}

    {/* New Price */}
    <p className="text-xl font-black text-[#ffcc00]">
      {plan.setup.new}
    </p>

    {/* Offer Badge */}
    {plan.setup.offer && (
      <span className="inline-block mt-2 text-xs bg-green-500 text-black px-2 py-1 rounded">
        Limited Offer
      </span>
    )}

  </div>
)}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/917817097517?text=Hi%20I%20am%20interested%20in%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
      >
        💬WhatsApp
      </a>


      {/* ============ WHY CHOOSE US ============ */}
<section className="px-6 py-24 bg-[#0a0a0a]">
  <div className="max-w-7xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-black">
        Why Choose <span className="text-[#ffcc00]">Vidhya Tech</span>?
      </h2>
      <p className="text-white/70 mt-4 max-w-2xl mx-auto">
        We provide modern, reliable, and scalable solutions designed for real business growth.
      </p>
    </div>

    {/* Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* Card 1 */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#ffcc00]/50 transition">
        <div className="text-3xl mb-4">☁️</div>
        <h3 className="text-xl font-bold mb-2">Fully Cloud Based</h3>
        <p className="text-white/70 text-sm">
          Access your system anytime without installing any software.
        </p>
      </div>

      {/* Card 2 */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#ffcc00]/50 transition">
        <div className="text-3xl mb-4">🌍</div>
        <h3 className="text-xl font-bold mb-2">Access Anywhere</h3>
        <p className="text-white/70 text-sm">
          Manage your school from anywhere, anytime with internet access.
        </p>
      </div>

      {/* Card 3 */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#ffcc00]/50 transition">
        <div className="text-3xl mb-4">🔒</div>
        <h3 className="text-xl font-bold mb-2">Secure Data</h3>
        <p className="text-white/70 text-sm">
          Your students’ data is protected with high-level security systems.
        </p>
      </div>

      {/* Card 4 */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#ffcc00]/50 transition">
        <div className="text-3xl mb-4">⚡</div>
        <h3 className="text-xl font-bold mb-2">Fast Support</h3>
        <p className="text-white/70 text-sm">
          Quick technical support to solve your issues without delay.
        </p>
      </div>

      {/* Card 5 */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#ffcc00]/50 transition">
        <div className="text-3xl mb-4">📊</div>
        <h3 className="text-xl font-bold mb-2">Easy Dashboard</h3>
        <p className="text-white/70 text-sm">
          Simple and user-friendly dashboard for easy management.
        </p>
      </div>

      {/* Card 6 */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#ffcc00]/50 transition">
        <div className="text-3xl mb-4">💰</div>
        <h3 className="text-xl font-bold mb-2">Affordable Pricing</h3>
        <p className="text-white/70 text-sm">
          Best pricing plans designed for every budget.
        </p>
      </div>

    </div>
  </div>
</section>

    </div>
  );
}