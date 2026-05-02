'use client';

import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function About() {
    return (
        <section id="about" className={`section ${styles.aboutSection}`}>
            <div className={`container ${styles.aboutContainer}`}>
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    About Me
                </motion.h2>

                <div className={styles.grid}>
                    <motion.div
                        className={styles.textContent}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p>
                            Hello! My name is Jonathan and I enjoy creating things that live on the internet.
                            My interest in web development started back in 2018 when I decided to try editing
                            custom Tumblr themes — turns out hacking together HTML & CSS taught me a lot about
                            HTML & CSS!
                        </p>
                        <p>
                            Fast-forward to today, and I’ve had the privilege of working at an advertising agency,
                            a start-up, a huge corporation, and a student-led design studio. My main focus these days
                            is building accessible, inclusive products and digital experiences for a variety of clients.
                        </p>
                        <p>
                            I also recently launched a course that covers everything you need to build a web app with
                            the Spotify API using Node & React.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.imageWrapper}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className={styles.imagePlaceholder}>
                            {/* This can be replaced with next/image */}
                            <div className={styles.imageOverlay}></div>
                            <img src="/api/placeholder/400/400" alt="Jonathan Kent" className={styles.image} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
