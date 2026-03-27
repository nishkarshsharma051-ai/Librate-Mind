import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Digital Moksha — Freedom from Digital Overload',
  description: 'AI-powered digital wellness platform. Overcome phone addiction, social media anxiety, and notification fatigue.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Digital Moksha' },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    title: 'Digital Moksha',
    description: 'Freedom from digital overload.',
  },
};

export const viewport: Viewport = {
  themeColor: '#F5F5F5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-fog antialiased">{children}</body>
    </html>
  );
}
