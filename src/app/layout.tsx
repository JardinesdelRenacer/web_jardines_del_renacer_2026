import '@/styles/globals.css';
import type { Metadata } from 'next';
import AppShell from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'Jardines del Renacer - Dignidad y Paz Eterna',
  description:
    'Servicios funerarios y de previsión con dignidad, respeto y paz eterna para tus seres queridos. Planes personalizados, recorrido 360° y homenajes digitales.',
  icons: {
    icon: '/logos_jr_favico.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen flex flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
