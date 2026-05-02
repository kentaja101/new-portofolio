'use client';

import { motion } from 'framer-motion';
import styles from './Experience.module.css';
import { Experience as ExpModel } from '@prisma/client';

export default function Experience({ experiences }: { experiences: ExpModel[] }) {
    return (
        <section id="experience" className={`section ${styles.experienceSection}`}>
            <div className={`container ${styles.experienceContainer}`}>
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    Where I&apos;ve Worked
                </motion.h2>

                <div className={styles.timeline}>
                    {experiences.map((job, index) => (
                        <motion.div
                            key={job.id}
                            className={styles.timelineItem}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <div className={styles.header}>
                                    <h3 className={styles.role}>{job.role}</h3>
                                    <span className={styles.company}>@ {job.company}</span>
                                </div>
                                <div className={styles.period}>{job.period}</div>
                                <p className={styles.description}>{job.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
