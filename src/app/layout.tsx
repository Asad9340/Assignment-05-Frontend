import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import QueryProviders from '@/providers/QueryProvider';
import { Toaster } from '@/components/ui/sonner';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Planora — Build, Host & Join Events',
  description:
    'Planora is a secure event management platform for creating and joining public or private events with smooth registration, invite workflows, and integrated payments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('font-sans', montserrat.variable)}>
      <body className="antialiased">
        <QueryProviders>
          <TooltipProvider>
            {children}
            <Toaster richColors position="top-right" />
          </TooltipProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
