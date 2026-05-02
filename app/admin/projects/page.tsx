import { checkAuth, createProject, deleteProject } from '@/app/actions/admin';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function ProjectsAdmin() {
    if (!await checkAuth()) redirect('/admin/login');

    const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

    return (
        <div>
            <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', color: 'var(--text-primary)' }}>Manage Projects</h1>

            <div style={{ marginBottom: '4rem' }}>
                <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Current Projects</h2>
                {projects.length === 0 ? <p>No projects found.</p> : (
                    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {projects.map(proj => (
                            <li key={proj.id} style={{ display: 'flex', flexDirection: 'column', background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', gap: '1rem' }}>
                                <div>
                                    <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{proj.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{proj.description.substring(0, 80)}...</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--accent-hover)' }}>Order: {proj.order}</p>
                                </div>
                                <form action={async () => {
                                    'use server';
                                    await deleteProject(proj.id);
                                }} style={{ marginTop: 'auto' }}>
                                    <button type="submit" style={{ width: '100%', padding: '0.8rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
                                        Delete Project
                                    </button>
                                </form>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div style={{ maxWidth: '600px', backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Add New Project</h2>
                <form action={createProject} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <input name="title" required placeholder="Project Title" style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                    <textarea name="description" required placeholder="Project Description" rows={4} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                    <input name="tags" required placeholder="Tags (comma separated, e.g. React, Next.js)" style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                    <input name="imageUrl" placeholder="Image URL (e.g. /projects/eura.jpg)" style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                    <input name="githubUrl" placeholder="GitHub URL (optional)" style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                    <input name="liveUrl" placeholder="Live Demo URL (optional)" style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                    <input name="order" type="number" required defaultValue={projects.length} placeholder="Display Order (lower is first)" style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />

                    <button type="submit" style={{ padding: '1rem', background: 'var(--text-primary)', color: 'var(--bg-color)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                        Add Project
                    </button>
                </form>
            </div>
        </div>
    );
}
