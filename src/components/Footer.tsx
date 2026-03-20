'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Youtube, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Workflow Automation', href: '#services' },
    { label: 'AI Chatbots', href: '#services' },
    { label: 'Training Bots', href: '#services' },
    { label: 'AI-Powered CRM', href: '#services' },
    { label: 'Digital Employee', href: '#services' },
  ],
  company: [
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: 'mailto:hello@weblyfe.ai' },
  ],
  resources: [
    { label: 'Weblyfe.nl', href: 'https://weblyfe.nl', external: true },
    { label: 'Blog', href: '#', coming: true },
    { label: 'Free Resources', href: '#', coming: true },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/seyed.jpg', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/@weblyfenl', label: 'YouTube' },
  { icon: Linkedin, href: 'https://linkedin.com/company/weblyfe', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@weblyfe.ai', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-[#031D16] pt-20 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#247459]/30 to-transparent" />
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-[#247459]/5 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-6">
              <Image
                src="/logo-gold.svg"
                alt="Weblyfe.ai"
                width={160}
                height={45}
                className="h-10 w-auto"
              />
            </a>
            <p className="text-[#F6FEFC]/60 mb-6 max-w-sm leading-relaxed">
              AI automation services for creators, agencies, and service businesses. 
              We build systems that save you time and help you scale.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#0E3D31] hover:bg-[#247459] flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-[#F6FEFC]/60 group-hover:text-[#F6FEFC]" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[#F6FEFC] font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-[#F6FEFC]/60 hover:text-[#DFB771] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#F6FEFC] font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-[#F6FEFC]/60 hover:text-[#DFB771] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[#F6FEFC] font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  {link.coming ? (
                    <span className="text-[#F6FEFC]/40 text-sm flex items-center gap-1">
                      {link.label}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#247459]/30 text-[#DFB771]">
                        Soon
                      </span>
                    </span>
                  ) : (
                    <a 
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-[#F6FEFC]/60 hover:text-[#DFB771] transition-colors text-sm inline-flex items-center gap-1"
                    >
                      {link.label}
                      {link.external && <ArrowUpRight className="w-3 h-3" />}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-gradient-to-r from-[#0E3D31] to-[#0E3D31]/50 border border-[#247459]/20 mb-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#F6FEFC] mb-2">
                Get AI insights delivered weekly
              </h3>
              <p className="text-[#F6FEFC]/60 text-sm">
                Practical tips on automation, AI tools, and scaling your business. No spam.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-[#031D16] border border-[#247459]/30 text-[#F6FEFC] placeholder-[#F6FEFC]/40 focus:outline-none focus:border-[#DFB771] transition-colors"
              />
              <button 
                type="submit"
                className="btn-primary whitespace-nowrap py-3"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#247459]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#F6FEFC]/40 text-sm">
            © {new Date().getFullYear()} Weblyfe.ai · A Weblyfe by Techwiz LLC company
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#F6FEFC]/40 hover:text-[#F6FEFC]/60 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#F6FEFC]/40 hover:text-[#F6FEFC]/60 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
