'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Check, Video } from 'lucide-react';

const benefits = [
  { icon: Clock, text: '30 min call' },
  { icon: Video, text: 'Video or phone' },
  { icon: Check, text: 'No obligation' },
];

export default function BookingEmbed() {
  useEffect(() => {
    // Load TidyCal embed script
    const script = document.createElement('script');
    script.src = 'https://asset-tidycal.b-cdn.net/js/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="book" className="py-16 sm:py-24 bg-[#F6FEFC]">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[#247459] text-sm font-semibold uppercase tracking-wider mb-4">
            <Calendar className="w-4 h-4" />
            Book a Call
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#031D16] mb-4">
            Schedule Your Free Discovery Call
          </h2>
          <p className="text-[#031D16]/60 max-w-xl mx-auto">
            Pick a time that works for you. We&apos;ll discuss your business, 
            identify opportunities, and show you what&apos;s possible with AI.
          </p>
          
          {/* Quick benefits */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-[#031D16]/70">
                <Icon className="w-4 h-4 text-[#247459]" />
                {text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* TidyCal Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div 
            className="tidycal-embed" 
            data-path="weblyfe/discovery"
            style={{ width: '100%', height: '100%', minHeight: '500px' }}
          />
        </motion.div>

        {/* Fallback link */}
        <p className="text-center text-sm text-[#031D16]/50 mt-6">
          Calendar not loading?{' '}
          <a 
            href="https://tidycal.com/weblyfe/discovery" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#247459] hover:underline"
          >
            Book directly on TidyCal →
          </a>
        </p>
      </div>
    </section>
  );
}
