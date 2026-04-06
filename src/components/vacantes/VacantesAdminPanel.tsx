'use client';

import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import SectionTitle from '@/components/ui/SectionTitle';
import {
  VACANCY_DEPARTMENTS,
  createEmptyVacancy,
  type JobVacancy,
} from '@/config/vacancies';
import {
  readJobVacancies,
  removeJobVacancy,
  upsertJobVacancy,
  writeJobVacancies,
} from '@/lib/vacanciesStorage';

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseLines(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function createDraftFromVacancy(vacancy: JobVacancy) {
  return {
    ...vacancy,
    requirementsText: vacancy.requirements.join('\n'),
    benefitsText: vacancy.benefits.join('\n'),
  };
}

type VacancyDraft = JobVacancy & {
  requirementsText: string;
  benefitsText: string;
};

function createInitialDraft(): VacancyDraft {
  const base = createEmptyVacancy();
  return {
    ...base,
    requirementsText: '',
    benefitsText: '',
  };
}

export default function VacantesAdminPanel() {
  const [vacancies, setVacancies] = useState<JobVacancy[]>([]);
  const [draft, setDraft] = useState<VacancyDraft>(createInitialDraft());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setVacancies(readJobVacancies());
  }, []);

  const filteredVacancies = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return vacancies;
    }
    return vacancies.filter((vacancy) => {
      return (
        vacancy.title.toLowerCase().includes(query) ||
        vacancy.area.toLowerCase().includes(query) ||
        vacancy.city.toLowerCase().includes(query) ||
        vacancy.department.toLowerCase().includes(query)
      );
    });
  }, [vacancies, search]);

  const resetDraft = () => {
    setDraft(createInitialDraft());
    setEditingId(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFeedback('');

    if (!draft.title.trim()) {
      setFeedback('Debes ingresar el cargo de la vacante.');
      return;
    }

    if (!draft.area.trim()) {
      setFeedback('Debes ingresar el area.');
      return;
    }

    if (!draft.city.trim()) {
      setFeedback('Debes ingresar la ciudad.');
      return;
    }

    if (!draft.summary.trim()) {
      setFeedback('Debes ingresar un resumen de la vacante.');
      return;
    }

    const now = new Date().toISOString();
    const current = editingId ? vacancies.find((vacancy) => vacancy.id === editingId) : null;
    const record: JobVacancy = {
      ...draft,
      id:
        editingId ||
        `vac-${slugify(draft.title || 'vacante')}-${Date.now().toString(36).slice(-4)}`,
      title: draft.title.trim(),
      area: draft.area.trim(),
      city: draft.city.trim(),
      contractType: draft.contractType.trim() || 'Tiempo completo',
      schedule: draft.schedule.trim(),
      salary: draft.salary.trim() || 'A convenir',
      experience: draft.experience.trim(),
      summary: draft.summary.trim(),
      requirements: parseLines(draft.requirementsText),
      benefits: parseLines(draft.benefitsText),
      postedAt: draft.postedAt || now.slice(0, 10),
      createdAt: current?.createdAt || now,
      updatedAt: now,
    };

    const next = upsertJobVacancy(vacancies, record);
    setVacancies(next);
    writeJobVacancies(next);
    resetDraft();
    setFeedback(editingId ? 'Vacante actualizada correctamente.' : 'Vacante creada correctamente.');
  };

  const handleEdit = (vacancy: JobVacancy) => {
    setDraft(createDraftFromVacancy(vacancy));
    setEditingId(vacancy.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFeedback(`Editando vacante: ${vacancy.title}`);
  };

  const handleDelete = (vacancy: JobVacancy) => {
    const confirmed = window.confirm(`¿Deseas eliminar la vacante "${vacancy.title}"?`);
    if (!confirmed) {
      return;
    }
    const next = removeJobVacancy(vacancies, vacancy.id);
    setVacancies(next);
    writeJobVacancies(next);
    if (editingId === vacancy.id) {
      resetDraft();
    }
    setFeedback('Vacante eliminada correctamente.');
  };

  return (
    <div className="min-h-screen pt-2 pb-10">
      <SectionTitle
        title="Panel de Vacantes"
        subtitle="Administra vacantes de Trabaja con Nosotros en un panel exclusivo."
        align="left"
        className="mb-8"
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1.08fr_0.92fr] gap-8">
        <section className="glass rounded-3xl border border-primary/15 p-6 md:p-8">
          <h3 className="text-2xl font-display text-text mb-6">
            {editingId ? 'Editar vacante' : 'Crear nueva vacante'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Cargo"
              value={draft.title}
              onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Ej: Auxiliar de servicio al cliente"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <Input
                label="Area"
                value={draft.area}
                onChange={(event) => setDraft((prev) => ({ ...prev, area: event.target.value }))}
                placeholder="Ej: Comercial"
                required
              />

              <div>
                <label className="block text-sm font-medium text-text mb-2">Departamento</label>
                <select
                  value={draft.department}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, department: event.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl glass border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                >
                  {VACANCY_DEPARTMENTS.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Ciudad"
                value={draft.city}
                onChange={(event) => setDraft((prev) => ({ ...prev, city: event.target.value }))}
                placeholder="Ej: Pereira"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Modalidad</label>
                <select
                  value={draft.modality}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      modality: event.target.value as JobVacancy['modality'],
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl glass border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                >
                  <option value="Presencial">Presencial</option>
                  <option value="Hibrido">Hibrido</option>
                  <option value="Remoto">Remoto</option>
                </select>
              </div>

              <Input
                label="Tipo de contrato"
                value={draft.contractType}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, contractType: event.target.value }))
                }
                placeholder="Tiempo completo"
              />

              <Input
                label="Fecha de publicacion"
                type="date"
                value={draft.postedAt}
                onChange={(event) => setDraft((prev) => ({ ...prev, postedAt: event.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Horario"
                value={draft.schedule}
                onChange={(event) => setDraft((prev) => ({ ...prev, schedule: event.target.value }))}
                placeholder="Lunes a viernes"
              />
              <Input
                label="Salario"
                value={draft.salary}
                onChange={(event) => setDraft((prev) => ({ ...prev, salary: event.target.value }))}
                placeholder="A convenir"
              />
              <Input
                label="Experiencia"
                value={draft.experience}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, experience: event.target.value }))
                }
                placeholder="1+ ano"
              />
            </div>

            <Textarea
              label="Resumen de la vacante"
              value={draft.summary}
              onChange={(event) => setDraft((prev) => ({ ...prev, summary: event.target.value }))}
              placeholder="Describe la vacante en pocas lineas."
              rows={3}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea
                label="Requisitos (uno por linea)"
                value={draft.requirementsText}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, requirementsText: event.target.value }))
                }
                placeholder={'Ej:\nComunicacion asertiva\nManejo de Excel'}
                rows={5}
              />

              <Textarea
                label="Beneficios (uno por linea)"
                value={draft.benefitsText}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, benefitsText: event.target.value }))
                }
                placeholder={'Ej:\nEstabilidad laboral\nCapacitacion continua'}
                rows={5}
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-text">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, featured: event.target.checked }))
                }
                className="accent-primary"
              />
              Marcar como vacante destacada
            </label>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" variant="primary">
                {editingId ? 'Guardar cambios' : 'Crear vacante'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetDraft}>
                Limpiar formulario
              </Button>
              {editingId && (
                <Button type="button" variant="ghost" onClick={() => setEditingId(null)}>
                  Cancelar edicion
                </Button>
              )}
            </div>
          </form>

          {feedback && <p className="mt-4 text-sm text-primary font-medium">{feedback}</p>}
        </section>

        <section className="glass rounded-3xl border border-primary/15 p-6 md:p-7">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="text-xl font-display text-text">Vacantes cargadas</h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary">
              {vacancies.length} registros
            </span>
          </div>

          <Input
            label="Buscar en listado"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cargo, area, ciudad o departamento..."
          />

          <div className="mt-4 space-y-3 max-h-[660px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredVacancies.map((vacancy) => (
              <article
                key={vacancy.id}
                className="rounded-2xl border border-primary/15 bg-white/45 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-text line-clamp-1">{vacancy.title}</p>
                    <p className="text-xs text-primary uppercase tracking-[0.16em] mt-1">
                      {vacancy.area}
                    </p>
                    <p className="text-xs text-textLight mt-1">
                      {vacancy.city}, {vacancy.department}
                    </p>
                    <p className="text-xs text-textLight mt-1">
                      {vacancy.modality} | {vacancy.contractType}
                    </p>
                  </div>
                  {vacancy.featured && (
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-full border border-green-500/25 bg-green-500/10 text-green-700">
                      Destacada
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => handleEdit(vacancy)}
                    className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-primary/25 text-primary hover:bg-primary/10 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(vacancy)}
                    className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
