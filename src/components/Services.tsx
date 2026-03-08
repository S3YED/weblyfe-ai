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
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbots',
    headline: '24/7 Support That Sounds Like You',
    description: 'Your customers don\'t want to wait until Monday morning. Our AI chatbots handle inquiries, book appointments, and answer FAQs instantly — trained on your brand voice.',
    benefits: [
      { icon: Moon, text: 'Never miss a lead (even at 3am)' },
      { icon: Route, text: 'Smart routing to humans when needed' },
      { icon: Phone, text: 'WhatsApp, web, or SMS' },
    ],
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Brain,
    title: 'Training Bots',
    headline: 'AI That Knows Your Business Inside Out',
    description: 'Generic AI gives generic answers. We train custom AI models on YOUR content — your docs, processes, FAQs — so it becomes an expert on your specific business.',
    benefits: [
      { icon: BookOpen, text: 'Trained on your content' },
      { icon: Sparkles, text: 'Always improving over time' },
      { icon: Lock, text: 'Your data stays private' },
    ],
    gradient: 'from-green-500 to-emerald-500',
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
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: UserCog,
    title: 'Digital Employee',
    headline: 'Hire an AI Team Member',
    description: 'This isn\'t a chatbot — it\'s a digital employee. Powered by our Appie system, it handles scheduling, research, content drafts, CRM updates, and email management. Unlimited tasks. No PTO.',
    benefits: [
      { icon: Users, text: 'True multi-tasking in parallel' },
      { icon: Plug, text: 'Full system access (calendar, email, docs)' },
      { icon: BarChart3, text: 'Scales with your business' },
    ],
    gradient: 'from-violet-500 to-purple-500',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#0A0A0F]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-medium uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            AI Solutions That Actually Work
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From simple automations to full digital employees — we build AI systems 
            tailored to your specific business needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-8 hover:border-purple-500/30 transition-all group"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-3 mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-full h-full text-white" />
              </div>

              {/* Title */}
              <h3 className="text-sm text-purple-400 font-medium mb-2">
                {service.title}
              </h3>
              <h4 className="text-xl font-bold text-white mb-3">
                {service.headline}
              </h4>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6">
                {service.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit.text} className="flex items-center gap-3 text-sm text-gray-300">
                    <benefit.icon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    {benefit.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
