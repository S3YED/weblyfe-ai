'use client';

import { motion } from 'framer-motion';
import { 
  Workflow, 
  MessageSquare, 
  Brain, 
  Target, 
  UserCog,
  Zap,
  RefreshCw,
  BarChart3,
  Moon,
  Route,
  Phone,
  BookOpen,
  Sparkles,
  Lock,
  Mail,
  Bell,
  Users,
  Plug
} from 'lucide-react';

const services = [
  {
    icon: Workflow,
    title: 'Workflow Automation',
    headline: 'Connect Everything. Automate Anything.',
    description: 'Your tools should talk to each other without you playing middleman. We build custom automation flows that connect your CRM, email, calendar, Notion, Slack, and 400+ other apps.',
    benefits: [
      { icon: Zap, text: 'Instant data sync across all tools' },
      { icon: RefreshCw, text: 'Zero manual handoffs' },
      { icon: BarChart3, text: 'Custom real-time dashboards' },
    ],
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbots',
    headline: '24/7 Support That Sounds Like You',
    description: 'Your customers don\'t want to wait until Monday morning. Our AI chatbots handle inquiries, book appointments, and answer FAQs instantly - trained on your brand voice.',
    benefits: [
      { icon: Moon, text: 'Never miss a lead (even at 3am)' },
      { icon: Route, text: 'Smart routing to humans when needed' },
      { icon: Phone, text: 'WhatsApp, web, or SMS' },
    ],
  },
  {
    icon: Brain,
    title: 'Training Bots',
    headline: 'AI That Knows Your Business Inside Out',
    description: 'Generic AI gives generic answers. We train custom AI models on YOUR content - your docs, processes, FAQs - so it becomes an expert on your specific business.',
    benefits: [
      { icon: BookOpen, text: 'Trained on your content' },
      { icon: Sparkles, text: 'Always improving over time' },
      { icon: Lock, text: 'Your data stays private' },
    ],
  },
  {
    icon: Target,
    title: 'AI-Powered CRM',
    headline: 'Leads Scored, Sorted, and Followed Up',
    description: 'Stop letting hot leads go cold. Our AI-powered CRM scores every lead instantly, sends personalized follow-ups, and alerts you when someone\'s ready to buy.',
    benefits: [
      { icon: Target, text: 'Instant lead scoring' },
      { icon: Mail, text: 'Auto follow-ups that feel personal' },
      { icon: Bell, text: 'Real-time high-intent alerts' },
    ],
  },
  {
    icon: UserCog,
    title: 'Digital Employee',
    headline: 'Hire an AI Team Member',
    description: 'This isn\'t a chatbot - it\'s a digital employee. Powered by our Appie system, it handles scheduling, research, content drafts, CRM updates, and email management. Unlimited tasks. No PTO.',
    benefits: [
      { icon: Users, text: 'True multi-tasking in parallel' },
      { icon: Plug, text: 'Full system access (calendar, email, docs)' },
      { icon: BarChart3, text: 'Scales with your business' },
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#F6FEFC] relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-20 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-[#247459]/5 to-transparent blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-gradient-to-br from-[#DFB771]/10 to-transparent blur-3xl" />
      
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
            Our Services
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#031D16] mt-4 mb-6">
            AI Solutions That <span className="text-[#247459]">Actually Work</span>
          </h2>
          <p className="text-[#031D16]/60 max-w-2xl mx-auto text-lg">
            From simple automations to full digital employees - we build AI systems 
            tailored to your specific business needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-8 group relative"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#247459] to-[#0E3D31] p-3.5 mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <service.icon className="w-full h-full text-[#F6FEFC]" />
              </div>

              {/* Title */}
              <span className="text-[#247459] text-sm font-semibold uppercase tracking-wider">
                {service.title}
              </span>
              <h3 className="text-xl font-bold text-[#031D16] mt-2 mb-3">
                {service.headline}
              </h3>

              {/* Description */}
              <p className="text-[#031D16]/60 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit.text} className="flex items-center gap-3 text-sm text-[#031D16]/80">
                    <span className="w-8 h-8 rounded-lg bg-[#DFB771]/20 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-4 h-4 text-[#247459]" />
                    </span>
                    {benefit.text}
                  </li>
                ))}
              </ul>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-[#DFB771] to-[#FFD99A] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="card-dark p-8 bg-gradient-to-br from-[#0E3D31] to-[#031D16] flex flex-col justify-center items-center text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#DFB771]/20 flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7 text-[#DFB771]" />
            </div>
            <h3 className="text-2xl font-bold text-[#F6FEFC] mb-3">
              Not Sure What You Need?
            </h3>
            <p className="text-[#F6FEFC]/60 mb-6">
              Book a free strategy call and we&apos;ll map out the perfect AI solution for your business.
            </p>
            <a href="#book" className="btn-primary">
              Get Your Free Roadmap
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
