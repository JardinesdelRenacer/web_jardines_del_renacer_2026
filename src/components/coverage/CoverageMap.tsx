 'use client';

import { useState, useEffect } from 'react';

import { coverageData, Department } from './coverageData';

import ColombiaSVG from './ColombiaSVG';
import DepartmentCard from './DepartmentCard';
import { getDepartamentoSlug } from '@/data/sedes';
import CoverageStats from './CoverageStats';
import CoverageFeatures from './CoverageFeatures';
import DepartmentTooltip from './DepartmentTooltip';

export default function CoverageMap() {

    const [selectedDepartment, setSelectedDepartment] =
        useState<Department | null>(coverageData[0] ?? null);

    const [hoverDepartment, setHoverDepartment] =
        useState<Department | null>(null);
    const [selectedSedeId, setSelectedSedeId] = useState<string | null>(null);

    const handleSelectDepartment = (department: Department | null) => {
        setSelectedDepartment(department);
        setSelectedSedeId(null);
    };

    // Escuchar selección de sede desde el mapa
    useEffect(() => {
        const handler = (e: any) => {
            const detail = e.detail as { departmentId: string; sedeId: string };
            const dept = coverageData.find((d) => d.id === detail.departmentId) ?? null;

            if (dept) setSelectedDepartment(dept);
            setSelectedSedeId(detail.sedeId ?? null);
            // NO navegar automáticamente: el usuario pidió evitar navegación al seleccionar departamento.
        };

        document.addEventListener('coverage:sedeSelected', handler as EventListener);

        return () => document.removeEventListener('coverage:sedeSelected', handler as EventListener);
    }, []);

    return (

        <section className="py-28">

                {/* Encabezado */}

                <div className="relative w-full mb-16 py-10 overflow-hidden rounded-[30px] bg-primary/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/85 to-transparent" />
                    <div className="absolute inset-y-0 left-1/2 w-[72%] -translate-x-1/2 bg-primary/35 blur-2xl" />
                    <div className="relative z-10 text-center px-6 lg:px-8">
                        <span className="uppercase tracking-[0.25em] text-primary text-sm">
                            COBERTURA NACIONAL
                        </span>
                        <h2 className="text-5xl font-display font-extrabold text-white mt-5 mb-6">
                            Estamos presentes donde más nos necesitan
                        </h2>
                        <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                            Contamos con presencia en diferentes departamentos de Colombia,
                            brindando atención inmediata, infraestructura propia y un
                            acompañamiento humano permanente.
                        </p>
                    </div>
                </div>

            <div className="max-w-7xl mx-auto px-6">

                {/* Mapa + Panel */}

                <div className="grid lg:grid-cols-12 gap-10 items-start">

                    {/* MAPA (izquierda) */}

                    <div className="lg:col-span-8 relative overflow-hidden rounded-[32px] border border-primary/10 bg-slate-950/5 min-h-[420px] sm:min-h-[520px]">

                        <ColombiaSVG
                            selected={selectedDepartment}
                            hover={hoverDepartment}
                            selectedSedeId={selectedSedeId}
                            onHover={setHoverDepartment}
                            onSelect={handleSelectDepartment}
                        />

                        <DepartmentTooltip
                            department={hoverDepartment}
                        />

                    </div>

                    {/* PANEL DERECHO: tarjeta de departamento + lista numerada estilo infografía */}

                    <aside className="lg:col-span-4">
                        <div className="lg:sticky lg:top-28 space-y-6">
                            <DepartmentCard department={selectedDepartment} selectedSedeId={selectedSedeId} />

                            <div className="glass rounded-[24px] p-6">
                                <h3 className="text-2xl font-semibold mb-2">Departamentos de Colombia</h3>
                                <p className="text-sm text-textLight">Selecciona un departamento en el mapa o en la lista para ver las sedes disponibles.</p>
                            </div>

                            <div className="space-y-3">
                                {coverageData.map((dept, idx) => {
                                    const number = idx + 1;
                                    const deptSlug = getDepartamentoSlug(dept.name);

                                    return (
                                        <div
                                            key={dept.id}
                                            onMouseEnter={() => setHoverDepartment(dept)}
                                            onMouseLeave={() => setHoverDepartment(null)}
                                            onClick={() => handleSelectDepartment(dept)}
                                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border ${selectedDepartment?.id === dept.id ? 'bg-primary/5 border-primary/20' : 'bg-white/0 border-primary/10'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">{number}</div>
                                                <div>
                                                    <div className="font-medium">{dept.name}</div>
                                                    <a className="text-sm text-textLight" href={`/sedes/${deptSlug}`}>Ver sedes</a>
                                                </div>
                                            </div>

                                            <div className="text-sm text-textLight">{dept.sedes} sedes</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                </div>

                {/* Estadísticas */}

                <CoverageStats />

                {/* Beneficios */}

                <CoverageFeatures />

            </div>

        </section>

    );

}