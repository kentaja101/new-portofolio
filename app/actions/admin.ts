'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function login(formData: FormData) {
    const password = formData.get('password');
    if (!ADMIN_PASSWORD) return { error: 'Server missing ADMIN_PASSWORD in .env' };

    if (password === ADMIN_PASSWORD) {
        (await cookies()).set('admin_token', password as string, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        redirect('/admin');
    }
    return { error: 'Invalid password' };
}

export async function logout() {
    (await cookies()).delete('admin_token');
    redirect('/admin/login');
}

export async function checkAuth() {
    if (!ADMIN_PASSWORD) return false;
    const token = (await cookies()).get('admin_token')?.value;
    return token === ADMIN_PASSWORD;
}

export async function updatePersonalInfo(formData: FormData) {
    if (!await checkAuth()) throw new Error("Unauthorized");

    const name = formData.get('name') as string;
    const tagline = formData.get('tagline') as string;
    const description = formData.get('description') as string;
    const email = formData.get('email') as string;
    const skills = (formData.get('skills') as string).split(',').map(s => s.trim());

    await prisma.personalInfo.update({
        where: { id: 'default' },
        data: { name, tagline, description, email, skills }
    });

    revalidatePath('/');
    revalidatePath('/admin');
}

export async function createExperience(formData: FormData) {
    if (!await checkAuth()) throw new Error("Unauthorized");
    await prisma.experience.create({
        data: {
            role: formData.get('role') as string,
            company: formData.get('company') as string,
            period: formData.get('period') as string,
            description: formData.get('description') as string,
            order: parseInt((formData.get('order') as string) || '0'),
        }
    });
    revalidatePath('/');
    revalidatePath('/admin/experience');
}

export async function deleteExperience(id: string) {
    if (!await checkAuth()) throw new Error("Unauthorized");
    await prisma.experience.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin/experience');
}

export async function createProject(formData: FormData) {
    if (!await checkAuth()) throw new Error("Unauthorized");
    await prisma.project.create({
        data: {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            tags: (formData.get('tags') as string).split(',').map(s => s.trim()),
            imageUrl: formData.get('imageUrl') as string,
            githubUrl: formData.get('githubUrl') as string,
            liveUrl: formData.get('liveUrl') as string,
            order: parseInt((formData.get('order') as string) || '0'),
        }
    });
    revalidatePath('/');
    revalidatePath('/admin/projects');
}

export async function deleteProject(id: string) {
    if (!await checkAuth()) throw new Error("Unauthorized");
    await prisma.project.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin/projects');
}
