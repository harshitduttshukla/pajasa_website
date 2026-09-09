import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'PAJASA Apartments | Service Apartments in India & Global Hubs',
  description: 'PAJASA Stay Solutions offers luxury serviced apartments for corporate housing across Mumbai, Pune, Delhi, Gurgaon, Bangalore, Hyderabad, Chennai, London, Singapore, Dubai, and New York.',
  keywords: 'serviced apartments, PAJASA apartments, corporate housing, executive stay, service apartment in Mumbai, service apartment in Pune, service apartment in Bangalore, service apartment in Delhi',
  icons: {
    icon: 'https://www.pajasaapartments.com/wp-content/uploads/2024/11/cropped-pajasa_apartments-32x32.webp',
    shortcut: 'https://www.pajasaapartments.com/wp-content/uploads/2024/11/cropped-pajasa_apartments-32x32.webp',
    apple: 'https://www.pajasaapartments.com/wp-content/uploads/2024/11/cropped-pajasa_apartments-192x192.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col selection:bg-amber-500 selection:text-slate-950">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
