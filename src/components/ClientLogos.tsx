'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const clients = [
  { name: 'Lost LeBlanc', logo: '/images/clients/67d557d06f7c84ea273af5d1_Lost%20LeBlanc.avif' },
  { name: 'Dubai Property', logo: '/images/clients/67d557d164b93f2ad6f75ae3_Dubai%20Property.avif' },
  { name: 'BeyondSchool', logo: '/images/clients/670b899e08151b0e8126c356_BeyondSchool.avif' },
  { name: 'Moneyfesto', logo: '/images/clients/67d557d0fff86e042a483e71_Moneyfesto.avif' },
  { name: '6 Figure', logo: '/images/clients/67d557d0178881123cc233b4_6%20Figure.avif' },
  { name: 'EKO', logo: '/images/clients/653127e031118bb5b480d0f7_EKO.webp' },
  { name: 'Stasher', logo: '/images/clients/653127e0553e832c200967b3_Stasher.webp' },
  { name: 'EKO Evolved', logo: '/images/clients/67d557d02485fd10fec008ec_EKO%20Evolved-1.avif' },
];

export default function ClientLogos() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#F6FEFC] to-[#E8F5F1] overflow-hidden relative z-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#031D16]/40 text-sm uppercase tracking-wider mb-8 font-medium"
        >
          Trusted by visionary entrepreneurs
        </motion.p>
        
        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#E8F5F1] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#E8F5F1] to-transparent z-10" />
          
          {/* Scrolling Logos */}
          <div className="flex overflow-hidden">
            <motion.div 
              className="flex gap-12 items-center"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ 
                duration: 30,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              {/* Double the logos for seamless loop */}
              {[...clients, ...clients].map((client, i) => (
                <div 
                  key={`${client.name}-${i}`}
                  className="flex-shrink-0 h-12 w-32 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
