import { checkAuth, updatePersonalInfo } from '@/app/actions/admin';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function AdminDashboard() {
    if (!await checkAuth()) redirect('/admin/login');

    const data = await prisma.personalInfo.findUnique({ where: { id: 'default' } });
    if (!data) return <div>No data</div>;

    return (
        <div>
            <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', color: 'var(--text-primary)' }}>Edit Profile & Skills</h1>
            <form action={updatePersonalInfo} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px', backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Name</label>
                    <input name="name" defaultValue={data.name} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Tagline</label>
                    <input name="tagline" defaultValue={data.tagline} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Description</label>
                    <textarea name="description" defaultValue={data.description} rows={5} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Email</label>
                    <input name="email" defaultValue={data.email} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Skills (Comma separated)</label>
                    <input name="skills" defaultValue={data.skills.join(', ')} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>

                <button type="submit" style={{ padding: '1rem', background: 'var(--text-primary)', color: 'var(--bg-color)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, marginTop: '1rem' }}>
                    Save Changes
                </button>
            </form>
        </div>
    );
}
