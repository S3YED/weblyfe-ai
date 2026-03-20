'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Discovery Call',
    description: 'We learn about your business, pain points, and goals. No pitch, just understanding what you actually need.',
    duration: '30 min call',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Custom Strategy',
    description: 'Within 48 hours, you get a detailed roadmap showing exactly what we\'ll build and the ROI you can expect.',
    duration: '48 hours',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Build & Deploy',
    description: 'We build your AI system in 2-4 weeks. You get weekly demos, and nothing goes live until you\'re 100% happy.',
    duration: '2-4 weeks',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Launch & Optimize',
    description: 'Go live with full support. We monitor performance and continuously improve based on real data.',
    duration: 'Ongoing',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#F6FEFC] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#DFB771]/10 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-[#247459]/10 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-[#247459] text-sm font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
            How It Works
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#031D16] mt-4 mb-6">
            From Idea to <span className="text-[#247459]">Automation</span>
          </h2>
          <p className="text-[#031D16]/60 max-w-2xl mx-auto text-lg">
            A clear, proven process that takes you from overwhelmed to automated in weeks, not months.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#247459]/20 to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="card p-8 h-full text-center relative z-10">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#031D16] rounded-full">
                    <span className="text-[#DFB771] text-sm font-bold">{step.number}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#247459] to-[#0E3D31] p-4 mt-4 mb-6 shadow-lg">
                    <step.icon className="w-full h-full text-[#F6FEFC]" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#031D16] mb-3">{step.title}</h3>
                  <p className="text-[#031D16]/60 text-sm leading-relaxed mb-4">{step.description}</p>
                  
                  {/* Duration badge */}
                  <span className="inline-block px-3 py-1 rounded-full bg-[#DFB771]/20 text-[#247459] text-xs font-semibold">
                    {step.duration}
                  </span>
                </div>

                {/* Arrow (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 w-8 h-8 bg-[#F6FEFC] rounded-full items-center justify-center z-20 -translate-y-1/2 border-2 border-[#247459]/20">
                    <ArrowRight className="w-4 h-4 text-[#247459]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#031D16] to-[#0E3D31]">
            <p className="text-[#F6FEFC] font-medium">
              Ready to start your automation journey?
            </p>
            <a href="#book" className="btn-primary whitespace-nowrap">
              Book Your Discovery Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
