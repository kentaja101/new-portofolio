'use client';

import { motion } from 'framer-motion';
import styles from './Skills.module.css';

export default function Skills({ skills }: { skills: string[] }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
    };

    return (
        <section id="skills" className={`section ${styles.skillsSection}`}>
            <div className={`container ${styles.skillsContainer}`}>
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    My Toolkit
                </motion.h2>

                <motion.div
                    className={styles.skillsGrid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {skills.map((skill) => (
                        <motion.div
                            key={skill}
                            className={styles.skillChip}
                            variants={itemVariants}
                            whileHover={{ y: -5, backgroundColor: 'var(--accent-hover)', color: 'white', borderColor: 'var(--accent-hover)' }}
                        >
                            {skill}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
