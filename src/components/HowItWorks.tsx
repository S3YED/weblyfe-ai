'use client';

import { motion } from 'framer-motion';
import { MessageSquare, FileSearch, Cog, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Discovery Call',
    description: 'We learn about your pain points, current tools, and goals. No sales pitch — just real conversation about what\'s slowing you down.',
    duration: '30 min',
  },
  {
    number: '02',
    icon: FileSearch,
    title: 'Custom Blueprint',
    description: 'We design your AI automation system tailored to your specific workflows. You\'ll see exactly what we\'ll build before we start.',
    duration: '2-3 days',
  },
  {
    number: '03',
    icon: Cog,
    title: 'Build & Integrate',
    description: 'We build, test, and connect everything to your existing tools. You approve at each step — no surprises.',
    duration: '1-2 weeks',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Optimize',
    description: 'Your AI goes live. We monitor performance, handle edge cases, and continuously improve as we learn more about your business.',
    duration: 'Ongoing',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#0A0A0F]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-medium uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            From Chaos to Autopilot in 4 Steps
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            No lengthy onboarding. No complicated training. We handle the technical 
            stuff so you can focus on running your business.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-purple-500/50 hidden lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`lg:flex items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="card p-8">
                    <div className={`flex items-center gap-4 mb-4 ${
                      index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                    }`}>
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          {step.duration}
                        </span>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Number (center) */}
                <div className="hidden lg:flex lg:w-2/12 justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/25">
                    {step.number}
                  </div>
                </div>

                {/* Empty space for layout */}
                <div className="hidden lg:block lg:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="#book" className="btn-primary inline-flex items-center gap-2 group">
            Start with Step 1
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
