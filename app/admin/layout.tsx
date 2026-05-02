import { checkAuth } from '@/app/actions/admin';
import Link from 'next/link';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const isAuth = await checkAuth();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
            {isAuth && (
                <aside style={{ width: '250px', backgroundColor: 'var(--card-bg)', borderRight: '1px solid var(--border-color)', padding: '2rem' }}>
                    <h2 style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}>CMS Panel</h2>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <Link href="/admin" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Personal Info</Link>
                        <Link href="/admin/experience" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Experience</Link>
                        <Link href="/admin/projects" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Projects</Link>
                        <Link href="/" style={{ marginTop: '2rem', color: 'var(--accent-hover)' }}>&larr; Back to Site</Link>
                    </nav>
                </aside>
            )}
            <main style={{ flex: 1, padding: '3rem' }}>
                {children}
            </main>
        </div>
    );
}
