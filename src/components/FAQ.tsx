'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How long does it take to build an AI automation?',
    answer: 'Most projects take 2-4 weeks from kickoff to launch. Simple chatbots can be ready in 1-2 weeks, while complex multi-agent systems may take 4-6 weeks. We give you a clear timeline during the strategy call.',
  },
  {
    question: 'Do I need technical knowledge to use these systems?',
    answer: 'Not at all. We build everything for you and create simple dashboards so you can monitor performance. Training is included, and we provide ongoing support to make sure you\'re comfortable.',
  },
  {
    question: 'What\'s the cost of AI automation services?',
    answer: 'Projects typically start at €2,500 for simple automations and scale based on complexity. We offer one-time builds (you own everything) or managed services with monthly support. You get a clear quote before we start.',
  },
  {
    question: 'Will the AI sound like a robot?',
    answer: 'No. We train AI on your brand voice, tone, and communication style. Most customers can\'t tell they\'re talking to AI. We fine-tune until it sounds exactly like your team would respond.',
  },
  {
    question: 'What if something goes wrong?',
    answer: 'We build with failsafes. Complex queries route to humans, and you always have override controls. Plus, we include 30 days of support after launch, and offer ongoing maintenance packages.',
  },
  {
    question: 'Can you integrate with my existing tools?',
    answer: 'Yes. We work with 400+ apps including Notion, Slack, Gmail, HubSpot, Salesforce, Airtable, WhatsApp, and custom APIs. If it has an API, we can connect it.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We follow industry best practices: encrypted connections, secure API handling, and we never store your data beyond what\'s needed. For sensitive industries, we can discuss additional security measures.',
  },
  {
    question: 'What if I need changes after launch?',
    answer: 'Changes are normal! We include a revision period after launch. For ongoing tweaks, we offer support packages or you can make simple changes yourself through the dashboards we provide.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#F6FEFC] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 rounded-full bg-[#247459]/5 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-[#DFB771]/10 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[#247459] text-sm font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
            FAQ
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#031D16] mt-4 mb-6">
            Questions? <span className="text-[#247459]">We&apos;ve Got Answers</span>
          </h2>
          <p className="text-[#031D16]/60 max-w-2xl mx-auto text-lg">
            Everything you need to know about working with us. Can&apos;t find what you&apos;re looking for? 
            Just ask — we&apos;re here to help.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 rounded-2xl bg-white border border-[#247459]/10 hover:border-[#247459]/30 transition-all shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-[#031D16] group-hover:text-[#247459] transition-colors">
                    {faq.question}
                  </h3>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    openIndex === index 
                      ? 'bg-[#247459] text-white' 
                      : 'bg-[#DFB771]/20 text-[#247459]'
                  }`}>
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </div>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[#031D16]/60 mt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-[#031D16]/60 mb-4">
            Still have questions?
          </p>
          <a 
            href="mailto:hello@weblyfe.ai" 
            className="text-[#247459] font-semibold hover:text-[#0E3D31] transition-colors"
          >
            Email us at hello@weblyfe.ai →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
