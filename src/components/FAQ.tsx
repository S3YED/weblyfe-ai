'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How long does it take to set up an AI automation?',
    answer: 'Most projects are completed within 1-2 weeks from kickoff. Simple automations can be done in days, while more complex systems like custom chatbots or digital employees may take 2-3 weeks. We\'ll give you a clear timeline during our discovery call.',
  },
  {
    question: 'Do I need technical knowledge to use these systems?',
    answer: 'Not at all. We build everything to be user-friendly with clear dashboards and interfaces. If you can use email and basic software, you can use our AI systems. Plus, we provide training and documentation for your team.',
  },
  {
    question: 'What tools and platforms do you integrate with?',
    answer: 'We work with 400+ apps including Notion, Slack, Google Workspace, Airtable, Monday.com, Stripe, WhatsApp, Telegram, Shopify, Webflow, and many more. If your tool has an API, we can probably connect it.',
  },
  {
    question: 'How much does it cost?',
    answer: 'Our projects typically range from $2,500 for simple automations to $15,000+ for comprehensive digital employee setups. We provide fixed pricing after our discovery call — no hourly billing surprises. Many clients see ROI within the first month.',
  },
  {
    question: 'Is my data safe with AI?',
    answer: 'Absolutely. We use enterprise-grade security practices, and your data is never used to train public AI models. All automations run on secure, isolated infrastructure. We can also work with self-hosted solutions if required.',
  },
  {
    question: 'What if something breaks or needs updating?',
    answer: 'All projects include 30 days of post-launch support. After that, we offer maintenance packages or can train your team to handle updates. For digital employee setups, we provide ongoing optimization as part of the service.',
  },
  {
    question: 'Can I start small and scale up later?',
    answer: 'Yes! Many clients start with a single automation and expand over time. Our systems are built modularly — we can add new features, integrations, or AI capabilities as your needs grow.',
  },
  {
    question: 'What\'s a "digital employee" exactly?',
    answer: 'A digital employee is an AI agent that works across your entire tech stack like a real team member. It can handle scheduling, email drafting, research, CRM updates, content creation, and more — all autonomously. Think of it as a 24/7 assistant that never takes a day off.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-[#0A0A0F]">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-medium uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Common Questions
          </h2>
          <p className="text-gray-400">
            Still have questions? Book a call and we&apos;ll answer everything.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <span className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-purple-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-500" />
                  )}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-5 text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
