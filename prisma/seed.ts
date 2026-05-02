import { PrismaClient } from '@prisma/client';
import portfolioData from '../data/portfolio.json';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    // Upsert PersonalInfo
    await prisma.personalInfo.upsert({
        where: { id: 'default' },
        update: {},
        create: {
            id: 'default',
            name: portfolioData.personalInfo.name,
            tagline: portfolioData.personalInfo.tagline,
            description: portfolioData.personalInfo.description,
            email: portfolioData.personalInfo.email,
            githubUrl: portfolioData.personalInfo.social.github,
            linkedinUrl: portfolioData.personalInfo.social.linkedin,
            twitterUrl: portfolioData.personalInfo.social.twitter,
            skills: portfolioData.skills,
        },
    });

    // Create Experiences (clear first to prevent duplicates on re-seed)
    await prisma.experience.deleteMany();
    for (const [index, exp] of portfolioData.experience.entries()) {
        await prisma.experience.create({
            data: {
                role: exp.role,
                company: exp.company,
                period: exp.period,
                description: exp.description,
                order: index,
            },
        });
    }

    // Create Projects
    await prisma.project.deleteMany();
    for (const [index, proj] of portfolioData.projects.entries()) {
        await prisma.project.create({
            data: {
                title: proj.title,
                description: proj.description,
                imageUrl: proj.image,
                tags: proj.tags,
                githubUrl: proj.githubUrl,
                liveUrl: proj.liveUrl,
                order: index,
            },
        });
    }

    // Create an example blog post
    await prisma.blogPost.deleteMany();
    await prisma.blogPost.create({
        data: {
            title: 'Hello World',
            content: 'This is my first blog post migrated from the database!',
            published: true,
        }
    });

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
