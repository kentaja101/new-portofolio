import Link from 'next/link';
import prisma from '@/lib/prisma';

export const revalidate = 60;

export const metadata = {
    title: 'Blog | Jonathan Kent',
    description: 'Writing about software engineering, design, and my journey.',
};

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <main className="container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh' }}>
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Blog</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem' }}>
                Thoughts, tutorials, and snippets on web development and design.
            </p>

            {posts.length === 0 ? (
                <div style={{ backgroundColor: 'var(--card-bg)', padding: '4rem 2rem', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '2rem' }}>Coming Soon!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        I am currently working on moving my articles here. Stay tuned!
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {posts.map((post: import('@prisma/client').BlogPost) => (
                        <article key={post.id} style={{ backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{post.title}</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{post.content}</p>
                        </article>
                    ))}
                </div>
            )}

            <div style={{ marginTop: '3rem' }}>
                <Link href="/" style={{
                    display: 'inline-block',
                    padding: '0.8rem 1.5rem',
                    backgroundColor: 'var(--text-primary)',
                    color: 'var(--bg-color)',
                    borderRadius: '8px',
                    fontWeight: '600'
                }}>
                    &larr; Back to Home
                </Link>
            </div>
        </main>
    );
}
