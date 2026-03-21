'use client';

import { motion } from 'framer-motion';

// AI tools and integrations we use
const logos = [
  { name: 'Claude', svg: '/logos/claude.svg' },
  { name: 'OpenAI', svg: '/logos/openai.svg' },
  { name: 'Notion', svg: '/logos/notion.svg' },
  { name: 'Supabase', svg: '/logos/supabase.svg' },
  { name: 'WhatsApp', svg: '/logos/whatsapp.svg' },
  { name: 'Monday', svg: '/logos/monday.svg' },
  { name: 'Airtable', svg: '/logos/airtable.svg' },
  { name: 'Slack', svg: '/logos/slack.svg' },
  { name: 'Stripe', svg: '/logos/stripe.svg' },
  { name: 'Vercel', svg: '/logos/vercel.svg' },
  { name: 'Webflow', svg: '/logos/webflow.svg' },
  { name: 'n8n', svg: '/logos/n8n.svg' },
];

// Duplicate for seamless loop
const allLogos = [...logos, ...logos];

export default function LogoCarousel() {
  return (
    <section className="py-8 bg-[#F6FEFC] border-y border-[#247459]/10 overflow-hidden">
      <div className="container mx-auto px-6 mb-4">
        <p className="text-center text-sm text-[#031D16]/50 uppercase tracking-wider font-medium">
          Powered by industry-leading AI tools
        </p>
      </div>
      
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F6FEFC] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F6FEFC] to-transparent z-10" />
        
        {/* Scrolling container */}
        <motion.div 
          className="flex gap-16 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {allLogos.map((logo, index) => (
            <div 
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 h-8 opacity-50 hover:opacity-80 transition-opacity"
            >
              <img 
                src={logo.svg} 
                alt={logo.name}
                className="h-full w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
