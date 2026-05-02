'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import styles from './Hero.module.css';
import { PersonalInfo } from '@prisma/client';

export default function Hero({ data }: { data: PersonalInfo }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants: import('framer-motion').Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } }
    };

    return (
        <section className={styles.heroSection}>
            <div className={`container ${styles.heroContainer}`}>
                <motion.div
                    className={styles.content}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p variants={itemVariants} className={styles.greeting}>
                        Hi, my name is
                    </motion.p>

                    <motion.h1 variants={itemVariants} className={styles.name}>
                        {data.name}.
                    </motion.h1>

                    <motion.h2 variants={itemVariants} className={styles.tagline}>
                        {data.tagline}.
                    </motion.h2>

                    <motion.p variants={itemVariants} className={styles.description}>
                        {data.description}
                    </motion.p>

                    <motion.div variants={itemVariants} className={styles.ctaGroup}>
                        <a href="#projects" className={styles.primaryCta}>
                            Check out my work <ArrowRight size={20} />
                        </a>
                        <a href="/resume.pdf" className={styles.secondaryCta} target="_blank" rel="noopener noreferrer">
                            Download CV <Download size={20} />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
