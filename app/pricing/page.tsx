'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const pricingData = [
  {
    category: "Web Development",
    plans: [
      {
        name: "Basic",
        price: "₹6,999",
        features: [
          "Up to 5 Pages",
          "Responsive Design",
          "Basic SEO",
          "Contact Form",
        ],
      },
      {
        name: "Standard",
        price: "₹9,999",
        popular: true,
        features: [
          "Up to 10 Pages",
          "Advanced SEO",
          "Blog Setup",
          "Google Analytics",
        ],
      },
      {
        name: "Premium",
        price: "₹14,999",
        features: [
          "Unlimited Pages",
          "E-commerce",
          "Payment Integration",
          "Live Chat",
        ],
      },
    ],
  },

  {
    category: "School ERP",
    plans: [
      {
        name: "Basic",
        price: "₹799/mo",
        features: [
          "Student Management",
          "Attendance",
          "Fee System",
        ],
      },
      {
        name: "Standard",
        price: "₹1,499/mo",
        popular: true,
        features: [
          "Exam System",
          "Staff Management",
          "Mobile App Access",
        ],
      },
      {
        name: "Premium",
        price: "₹2,999/mo",
        features: [
          "Online Admission",
          "Transport + Hostel",
          "Advanced Analytics",
        ],
      },
    ],
  },

  {
    category: "AI Services",
    plans: [
      {
        name: "Starter",
        price: "₹4,999",
        features: [
          "Basic Chatbot",
          "Lead Capture",
        ],
      },
      {
        name: "Pro",
        price: "₹9,999",
        popular: true,
        features: [
          "AI Automation",
          "Workflow Integration",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: [
          "Full AI System",
          "Custom Integration",
        ],
      },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">

      {/* HERO */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black">
          Our <span className="text-[#ffcc00]">Pricing Plans</span>
        </h1>
        <p className="text-white/70 mt-4 max-w-2xl mx-auto">
          Choose the perfect plan for your business growth.
        </p>
      </div>

      {/* PRICING */}
      <div className="max-w-7xl mx-auto space-y-20">

        {pricingData.map((section, i) => (
          <div key={i}>

            {/* Category Title */}
            <h2 className="text-3xl font-bold mb-8 text-center text-[#ffcc00]">
              {section.category}
            </h2>

            {/* Cards */}
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

                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-[#ffcc00] text-black px-4 py-1 text-sm font-bold rounded-bl-xl">
                      Most Popular
                    </div>
                  )}

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold mb-4">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <p className="text-4xl font-black text-[#ffcc00] mb-6">
                    {plan.price}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6 text-white/80">
                    {plan.features.map((f, i) => (
                      <li key={i}>✔ {f}</li>
                    ))}
                  </ul>

                  {/* Button */}
                  <Link
                    href="/contact"
                    className="block text-center bg-[#ffcc00] text-black py-3 rounded-lg font-bold hover:scale-105 transition"
                  >
                    Get Started
                  </Link>

                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}