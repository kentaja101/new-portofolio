import prisma from '@/lib/prisma';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export const revalidate = 60;

export default async function Home() {
  const personalInfo = await prisma.personalInfo.findUnique({ where: { id: 'default' } });
  const experiences = await prisma.experience.findMany({ orderBy: { order: 'asc' } });
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

  if (!personalInfo) return <div>Database not initialized</div>;

  return (
    <main>
      <Hero data={personalInfo} />
      <About />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Skills skills={personalInfo.skills} />
      <Contact />
    </main>
  );
}
