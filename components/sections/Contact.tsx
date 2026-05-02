'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulate form submission
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            (e.target as HTMLFormElement).reset();

            setTimeout(() => setStatus(''), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className={`section ${styles.contactSection}`}>
            <div className={`container ${styles.contactContainer}`}>
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    Get In Touch
                </motion.h2>

                <motion.div
                    className={styles.contactContent}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <p className={styles.description}>
                        Whether you have a question or just want to say hi, I&apos;ll try my best
                        to get back to you!
                    </p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" required placeholder="John Doe" />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" required placeholder="john@example.com" />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="message">Message</label>
                            <textarea id="message" required rows={5} placeholder="Your message here..."></textarea>
                        </div>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={status === 'sending' || status === 'success'}
                        >
                            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : (
                                <>Send Message <Send size={18} /></>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
