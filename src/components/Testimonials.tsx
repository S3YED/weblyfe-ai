'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Lorenzo P.',
    role: 'Pro Traders DCT',
    quote: 'Weblyfe completely transformed how we handle client inquiries. Response times went from hours to seconds.',
    rating: 5,
    image: null,
  },
  {
    name: 'Martijn D.',
    role: 'Evolute Limited',
    quote: 'The automation setup saved us so much manual work. Our team can finally focus on what matters.',
    rating: 5,
    image: null,
  },
  {
    name: 'Chris Z.',
    role: 'Nova Horizon',
    quote: 'Seyed and the team understand both design and tech. Rare combination. Highly recommend.',
    rating: 5,
    image: null,
  },
  {
    name: 'Bo v.d.V.',
    role: 'Turbosignals',
    quote: 'Our custom chatbot handles 80% of support questions automatically. Game changer.',
    rating: 5,
    image: null,
  },
  {
    name: 'Vincent W.',
    role: 'Pleazure',
    quote: 'The AI-powered CRM they built catches leads we would have missed. Worth every penny.',
    rating: 5,
    image: null,
  },
  {
    name: 'Joshua K.',
    role: 'Ika Consulting',
    quote: 'Professional, fast, and they actually deliver what they promise. Refreshing.',
    rating: 5,
    image: null,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#050508]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-medium uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Trusted by 50+ Businesses
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don&apos;t just take our word for it — here&apos;s what our clients have to say.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-500/20" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-medium">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white font-medium">5.0</span>
            <span className="text-gray-400">on Google Reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
