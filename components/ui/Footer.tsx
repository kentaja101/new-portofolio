import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.css';
import { PersonalInfo } from '@prisma/client';

export default function Footer({ data }: { data: PersonalInfo }) {
    return (
        <footer className={styles.footer} id="contact">
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.topSection}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            JK<span className={styles.dot}>.</span>
                        </Link>
                        <p className={styles.tagline}>
                            {data.tagline}
                        </p>
                    </div>

                    <div className={styles.links}>
                        <div className={styles.linkGroup}>
                            <h4>Navigation</h4>
                            <ul>
                                <li><Link href="#about">About</Link></li>
                                <li><Link href="#experience">Experience</Link></li>
                                <li><Link href="#projects">Projects</Link></li>
                                <li><Link href="#skills">Skills</Link></li>
                            </ul>
                        </div>
                        <div className={styles.linkGroup}>
                            <h4>Social</h4>
                            <ul>
                                {data.githubUrl && (
                                    <li>
                                        <a href={data.githubUrl} target="_blank" rel="noopener noreferrer">
                                            <FaGithub size={16} /> GitHub
                                        </a>
                                    </li>
                                )}
                                {data.linkedinUrl && (
                                    <li>
                                        <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                            <FaLinkedin size={16} /> LinkedIn
                                        </a>
                                    </li>
                                )}
                                {data.twitterUrl && (
                                    <li>
                                        <a href={data.twitterUrl} target="_blank" rel="noopener noreferrer">
                                            <FaTwitter size={16} /> Twitter
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <p>&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</p>
                    <a href={`mailto:${data.email}`} className={styles.email}>
                        {data.email}
                    </a>
                </div>
            </div>
        </footer>
    );
}
