import { checkAuth, createExperience, deleteExperience } from '@/app/actions/admin';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function ExperienceAdmin() {
    if (!await checkAuth()) redirect('/admin/login');

    const experiences = await prisma.experience.findMany({ orderBy: { order: 'asc' } });

    return (
        <div>
            <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', color: 'var(--text-primary)' }}>Manage Experience</h1>

            <div style={{ marginBottom: '4rem' }}>
                <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Current Experiences</h2>
                {experiences.length === 0 ? <p>No experience entries found.</p> : (
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {experiences.map(exp => (
                            <li key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                <div>
                                    <h3 style={{ color: 'var(--text-primary)' }}>{exp.role} @ {exp.company}</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>{exp.period} | Order: {exp.order}</p>
                                </div>
                                <form action={async () => {
                                    'use server';
                                    await deleteExperience(exp.id);
                                }}>
                                    <button type="submit" style={{ padding: '0.5rem 1rem', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                </form>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div style={{ maxWidth: '600px', backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Add New Experience</h2>
                <form action={createExperience} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <input name="role" required placeholder="Role (e.g. Frontend Engineer)" style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                    <input name="company" required placeholder="Company" style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                    <input name="period" required placeholder="Period (e.g. 2021 - Present)" style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                    <textarea name="description" required placeholder="Description" rows={4} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                    <input name="order" type="number" required defaultValue={experiences.length} placeholder="Display Order (lower is first)" style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />

                    <button type="submit" style={{ padding: '1rem', background: 'var(--text-primary)', color: 'var(--bg-color)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                        Add Experience
                    </button>
                </form>
            </div>
        </div>
    );
}
