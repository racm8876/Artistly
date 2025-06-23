import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Artistly - Book Professional Artists for Your Events',
  description: 'Connect with verified singers, dancers, speakers, DJs and more. Professional artist booking platform for events across India.',
  keywords: 'artist booking, event planning, singers, dancers, speakers, DJs, performers',
  authors: [{ name: 'Artistly Team' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Artistly - Book Professional Artists for Your Events',
    description: 'Connect with verified singers, dancers, speakers, DJs and more.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}