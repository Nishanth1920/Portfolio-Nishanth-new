import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolioData';
import { HiMail, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi';
import Magnetic from './Magnetic';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Contact() {

  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (!publicKey || !serviceId || !templateId) {
      setError('Email service is not configured. Please set up EmailJS env variables.');
      return;
    }

    setSending(true);

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      });
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (id) => ({
    width: '100%',
    padding: '14px 18px',
    borderRadius: 12,
    background: 'rgba(99, 102, 241, 0.03)',
    border: `1.5px solid ${focused === id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: focused === id ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
    outline: 'none',
  });

  return (
    <section id="contact" className="section" style={{ overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let's work together</h2>
          <p className="section-subtitle">
            Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you promptly.
          </p>
        </motion.div>

        <motion.div
          className="contact-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr',
            gap: 48,
            maxWidth: 900,
            margin: '0 auto',
            alignItems: 'start',
          }}
        >
          {/* Info */}
          <motion.div variants={item}>
            <div
              className="glass-card"
              style={{ padding: '32px' }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 28, color: 'var(--text-primary)' }}>
                Contact Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  { icon: HiMail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: HiLocationMarker, label: 'Location', value: personalInfo.location },
                ].map(({ icon: Icon, label, value, href }) => (
                  <motion.div
                    key={label}
                    variants={item}
                    whileHover={{ x: 4 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 12,
                        background: 'rgba(99, 102, 241, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-primary)',
                        fontSize: '1.1rem',
                        flexShrink: 0,
                      }}
                    >
                      <Icon />
                    </motion.div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                        {label}
                      </div>
                      {href ? (
                        <a href={href} style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500 }}>
                          {value}
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500 }}>
                          {value}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={item} style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-muted)' }}>Find me on</h4>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[
                    { href: personalInfo.social.github, icon: FaGithub },
                    { href: personalInfo.social.linkedin, icon: FaLinkedin },
                  ].map(({ href, icon: Icon }) => (
                    <Magnetic key={href} strength={0.2}>
                      <motion.a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 12,
                          background: 'rgba(99, 102, 241, 0.06)',
                          border: '1px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-muted)',
                          fontSize: '1.2rem',
                          transition: 'border-color 0.25s ease, color 0.25s ease',
                        }}
                      >
                        <Icon />
                      </motion.a>
                    </Magnetic>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={item}>
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{ padding: '32px' }}
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                ].map((field) => (
                  <motion.div key={field.id} variants={item}>
                    <label htmlFor={field.id} style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      required
                      value={form[field.id]}
                      onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                      onFocus={() => setFocused(field.id)}
                      onBlur={() => setFocused(null)}
                      placeholder={field.placeholder}
                      style={inputStyle(field.id)}
                    />
                  </motion.div>
                ))}

                <motion.div variants={item}>
                  <label htmlFor="message" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell me about your project..."
                    style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 110 }}
                  />
                </motion.div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 500 }}
                  >
                    {error}
                  </motion.p>
                )}
                <motion.div variants={item}>
                  <Magnetic strength={0.12}>
                    <motion.button
                      type="submit"
                      disabled={sending}
                      className="btn-primary"
                      style={{ alignSelf: 'flex-start', padding: '14px 32px', fontSize: '0.95rem', opacity: sending ? 0.7 : 1 }}
                      whileHover={{ scale: sending ? 1 : 1.03 }}
                      whileTap={{ scale: sending ? 1 : 0.97 }}
                    >
                      {submitted ? (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          Message Sent!
                        </motion.span>
                      ) : sending ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message <HiPaperAirplane style={{ transform: 'rotate(90deg)' }} />
                        </>
                      )}
                    </motion.button>
                  </Magnetic>
                </motion.div>
              </div>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          #contact.section { padding-bottom: 40px; }
        }
        @media (max-width: 480px) {
          #contact.section { padding-bottom: 32px; }
        }
      `}</style>
    </section>
  );
}
