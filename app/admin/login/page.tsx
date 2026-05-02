'use client';
import { login } from '@/app/actions/admin';
import { useState } from 'react';

export default function Login() {
    const [error, setError] = useState('');

    const handleSubmit = async (formData: FormData) => {
        const res = await login(formData);
        if (res?.error) setError(res.error);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto', background: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Admin Login</h1>
            {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
            <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter ADMIN_PASSWORD"
                    style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                />
                <button type="submit" style={{ padding: '1rem', background: 'var(--text-primary)', color: 'var(--bg-color)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                    Login
                </button>
            </form>
        </div>
    );
}
