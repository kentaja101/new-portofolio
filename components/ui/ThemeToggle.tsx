'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
        if (currentTheme) {
            setTheme(currentTheme);
        } else {
            setTheme('dark'); // default visually before hydration
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    if (!theme) return <div style={{ width: 28, height: 28 }}></div>; // placeholder to prevent layout shift

    return (
        <button
            onClick={toggleTheme}
            style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.4rem',
                borderRadius: '50%',
                transition: 'background-color 0.2s ease',
            }}
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
