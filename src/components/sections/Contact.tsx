'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { SectionHeading, SectionLabel } from '@/components/ui/SectionHeading';
import { Mail, Phone, GitFork, ExternalLink, Send, Loader2, MapPin } from 'lucide-react';

const schema = z.object({
  name:    z.string().min(2, 'Name is required'),
  email:   z.string().email('Enter a valid email'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'bhuvaneshkalidasan2@gmail.com',
    href: 'mailto:bhuvaneshkalidasan2@gmail.com',
    color: 'text-violet',
    bg: 'bg-violet/10',
    border: 'border-violet/20',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 93618 62500',
    href: 'tel:+919361862500',
    color: 'text-cyan',
    bg: 'bg-cyan/10',
    border: 'border-cyan/20',
  },
  {
    icon: GitFork,
    label: 'GitHub',
    value: 'github.com/bhuvanesh2235',
    href: 'https://github.com/bhuvanesh2235',
    color: 'text-text',
    bg: 'bg-surface2',
    border: 'border-border',
  },
  {
    icon: ExternalLink,
    label: 'LinkedIn',
    value: 'bhuvanesh-k-bbb505245',
    href: 'https://www.linkedin.com/in/bhuvanesh-k-bbb505245/',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Thoothukudi, Tamil Nadu 🇮🇳',
    href: undefined,
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/20',
  },
];

const inputBase =
  'w-full px-4 py-3 rounded-xl bg-surface border border-border text-text placeholder-muted text-sm focus:outline-none focus:border-violet/60 focus:ring-1 focus:ring-violet/20 transition-all';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Something went wrong');
      toast.success("Message sent! I'll get back to you soon.");
      reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-8 sm:mb-12">
        <SectionLabel>Get In Touch</SectionLabel>
        <SectionHeading>
          Let's <span className="gradient-text">work together</span>
        </SectionHeading>
        <p className="mt-3 text-muted text-sm sm:text-base max-w-lg leading-relaxed">
          Whether you have a project in mind, want to discuss AI/ML ideas, or just
          want to say hello — my inbox is always open.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">

        {/* Contact form */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 sm:gap-4 order-2 lg:order-1"
        >
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <input
                {...register('name')}
                placeholder="Your name"
                className={inputBase}
                id="contact-name"
              />
              {errors.name && (
                <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Your email"
                className={inputBase}
                id="contact-email"
              />
              {errors.email && (
                <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <input
              {...register('subject')}
              placeholder="Subject"
              className={inputBase}
              id="contact-subject"
            />
            {errors.subject && (
              <p className="text-xs text-rose-400 mt-1">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register('message')}
              rows={5}
              placeholder="Tell me about your project or idea…"
              className={`${inputBase} resize-none`}
              id="contact-message"
            />
            {errors.message && (
              <p className="text-xs text-rose-400 mt-1">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            id="contact-submit"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-primary text-white font-semibold text-sm hover:shadow-glow-violet disabled:opacity-60 transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>
        </motion.form>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-3 order-1 lg:order-2"
        >
          {/* Status card */}
          <div className="glass rounded-2xl p-4 sm:p-5 border border-border">
            <h3 className="font-display font-bold text-base sm:text-lg text-text mb-1">
              Bhuvanesh K
            </h3>
            <p className="text-muted text-xs sm:text-sm leading-relaxed">
              AI/ML Engineer · Full-Stack Developer
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              Open to opportunities
            </div>
          </div>

          {/* Contact links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {CONTACT_LINKS.map((link) => {
              const inner = (
                <>
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${link.bg} border ${link.border} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <link.icon size={15} className={link.color} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-xs text-muted">{link.label}</div>
                    <div className="text-xs sm:text-sm text-text font-medium truncate group-hover:text-violet transition-colors">
                      {link.value}
                    </div>
                  </div>
                </>
              );
              const cls = 'flex items-center gap-3 p-3.5 glass rounded-xl border border-border hover:border-violet/30 transition-all duration-300 group';
              return link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={cls}
                >
                  {inner}
                </a>
              ) : (
                <div key={link.label} className={cls}>{inner}</div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
