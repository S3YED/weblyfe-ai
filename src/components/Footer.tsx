'use client';

import { motion } from 'framer-motion';
import { 
  Twitter, 
  Linkedin, 
  Youtube, 
  Instagram,
  Mail,
  MapPin,
  ArrowUpRight
} from 'lucide-react';

const navigation = {
  services: [
    { name: 'Workflow Automation', href: '#services' },
    { name: 'AI Chatbots', href: '#services' },
    { name: 'Training Bots', href: '#services' },
    { name: 'AI-Powered CRM', href: '#services' },
    { name: 'Digital Employee', href: '#services' },
  ],
  company: [
    { name: 'About', href: '#about' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#book' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  social: [
    { name: 'Twitter', href: 'https://twitter.com/weblyfenl', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/weblyfe', icon: Linkedin },
    { name: 'YouTube', href: 'https://youtube.com/@weblyfenl', icon: Youtube },
    { name: 'Instagram', href: 'https://instagram.com/seyed.jpg', icon: Instagram },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0F] border-t border-white/5">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              Weblyfe<span className="text-purple-400">.ai</span>
            </h3>
            <p className="text-gray-400 mb-6">
              AI automation that actually works. Built by creators, for creators.
            </p>
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:hello@weblyfe.ai" className="hover:text-purple-400 transition-colors">
                hello@weblyfe.ai
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>Netherlands / Remote</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get weekly AI automation tips and case studies.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Weblyfe.ai. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
              >
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            {navigation.legal.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Powered by badge */}
        <div className="mt-8 text-center">
          <span className="text-xs text-gray-600">
            Powered by Appie 🤖 — Our own digital employee
          </span>
        </div>
      </div>
    </footer>
  );
}
