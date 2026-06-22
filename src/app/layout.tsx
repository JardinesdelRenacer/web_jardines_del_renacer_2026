import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import AppShell from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'Jardines del Renacer - Dignidad y Paz Eterna',
  description:
    'Servicios funerarios y de previsión con dignidad, respeto y paz eterna para tus seres queridos. Planes personalizados, recorrido 360° y homenajes digitales.',
  icons: {
    icon: '/logos_jr_favico.png',
  },
};

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'], // Regular, Medium, SemiBold, Bold, ExtraBold
  variable: '--font-montserrat',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
