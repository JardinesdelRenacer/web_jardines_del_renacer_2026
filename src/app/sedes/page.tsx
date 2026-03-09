import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import SedesExplorer from '@/components/sedes/SedesExplorer';
import { getAllDepartamentos, SEDES } from '@/data/sedes';

export const metadata: Metadata = {
  title: 'Nuestras Sedes | Jardines del Renacer',
  description: `Encuentra nuestras ${SEDES.length} sedes de Jardines del Renacer distribuidas en toda Colombia. Atención presencial cerca de ti.`,
  openGraph: {
    title: 'Nuestras Sedes | Jardines del Renacer',
    description: `${SEDES.length} puntos de atención en todo el país.`,
  },
};

export default function SedesPage() {
  const departamentos = getAllDepartamentos();
  const totalSedes = SEDES.length;

  return (
    <>
      {/* Hero section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#f6f4f2] via-white/70 to-[#f6f4f2]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #3C60A2 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        <Container>
          <SectionTitle
            title="Nuestras Sedes"
            subtitle={`Presentes en ${departamentos.length} departamentos con ${totalSedes} puntos de atención en todo el país`}
          />

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { label: 'Departamentos', value: departamentos.length },
              { label: 'Sedes', value: totalSedes },
              { label: 'Años de experiencia', value: '25+' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl px-8 py-4 text-center min-w-[140px]"
              >
                <p className="text-3xl font-bold text-primary">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-sm text-textLight mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Buscador + grid de departamentos / sedes */}
      <div className="pb-28">
        <SedesExplorer departamentos={departamentos} sedes={SEDES} />
      </div>
    </>
  );
}
