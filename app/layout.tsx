import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import prisma from '@/lib/prisma';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Jonathan Kent | Portfolio',
  description: 'Personal portfolio of Jonathan Kent, Software Engineer & Designer.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personalInfo = await prisma.personalInfo.findUnique({ where: { id: 'default' } });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme) {
                    document.documentElement.setAttribute('data-theme', savedTheme);
                  } else {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Navbar />
        {children}
        {personalInfo && <Footer data={personalInfo} />}
      </body>
    </html>
  );
}
