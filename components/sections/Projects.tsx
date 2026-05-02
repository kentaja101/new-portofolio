'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import styles from './Projects.module.css';
import { Project } from '@prisma/client';

export default function Projects({ projects }: { projects: Project[] }) {
    return (
        <section id="projects" className={`section ${styles.projectsSection}`}>
            <div className={`container ${styles.projectsContainer}`}>
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    Some Things I&apos;ve Built
                </motion.h2>

                <div className={styles.grid}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={styles.projectCard}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={styles.projectImage}>
                                <div className={styles.imageOverlay}></div>
                                <img src={project.imageUrl || "/api/placeholder/600/350"} alt={project.title} />
                            </div>

                            <div className={styles.projectContent}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.projectDescription}>{project.description}</p>

                                <ul className={styles.projectTags}>
                                    {project.tags.map(tag => (
                                        <li key={tag}>{tag}</li>
                                    ))}
                                </ul>

                                <div className={styles.projectLinks}>
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Link">
                                            <FaGithub size={20} />
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="External Link">
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
