import type { Metadata } from 'next';
import './globals.css';
import { PageFrame } from '@/components/layout/PageFrame';
import { ProjectProvider } from '@/context/ProjectContext';

export const metadata: Metadata = {
  title: 'Digital Graveyard — Preserve. Understand. Revive.',
  description: 'A non-morbid preservation archive for abandoned software projects, postmortem autopsies, and open stewardship transfers.',
  keywords: ['Digital Graveyard', 'Abandoned Projects', 'Open Source', 'Software Autopsy', 'Code Health', 'Project Stewardship'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProjectProvider>
          <PageFrame>{children}</PageFrame>
        </ProjectProvider>
      </body>
    </html>
  );
}
