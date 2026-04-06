import { getAllDepartamentos } from '@/data/sedes';

export type VacancyModality = 'Presencial' | 'Hibrido' | 'Remoto';

export interface JobVacancy {
  id: string;
  title: string;
  area: string;
  department: string;
  city: string;
  modality: VacancyModality;
  contractType: string;
  schedule: string;
  salary: string;
  experience: string;
  summary: string;
  requirements: string[];
  benefits: string[];
  featured: boolean;
  postedAt: string;
  createdAt: string;
  updatedAt: string;
}

export const VACANCIES_STORAGE_KEY = 'jdr.job-vacancies.v1';

const NOW_ISO = new Date().toISOString();
const ALL_DEPARTMENTS = getAllDepartamentos().map((item) => item.nombre);
export const VACANCY_DEPARTMENTS = ALL_DEPARTMENTS;
export const DEFAULT_VACANCY_DEPARTMENT = VACANCY_DEPARTMENTS[0] ?? 'Risaralda';

export const DEFAULT_JOB_VACANCIES: JobVacancy[] = [
  {
    id: 'vac-001',
    title: 'Asesor(a) Comercial Prevision Exequial',
    area: 'Comercial',
    department: 'Risaralda',
    city: 'Pereira',
    modality: 'Presencial',
    contractType: 'Tiempo completo',
    schedule: 'Lunes a sabado',
    salary: 'Basico + comisiones',
    experience: '1+ ano en ventas consultivas',
    summary:
      'Gestion de clientes, apertura de convenios y asesoria integral en planes de prevision familiar.',
    requirements: [
      'Comunicacion asertiva y orientacion al logro',
      'Conocimiento basico de CRM o seguimiento comercial',
      'Movilidad para visitas de campo',
    ],
    benefits: ['Comisiones sin techo', 'Capacitacion comercial', 'Plan de crecimiento interno'],
    featured: true,
    postedAt: '2026-03-29',
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'vac-002',
    title: 'Auxiliar de Servicio al Cliente',
    area: 'Servicio y experiencia',
    department: 'Valle del Cauca',
    city: 'Cali',
    modality: 'Presencial',
    contractType: 'Tiempo completo',
    schedule: 'Turnos rotativos',
    salary: 'A convenir',
    experience: '1+ ano en atencion al cliente',
    summary:
      'Acompanamiento a familias, gestion de solicitudes y seguimiento de satisfaccion del servicio.',
    requirements: [
      'Empatia y escucha activa',
      'Manejo de herramientas ofimaticas',
      'Excelente presentacion personal',
    ],
    benefits: ['Formacion continua', 'Estabilidad laboral', 'Ambiente colaborativo'],
    featured: true,
    postedAt: '2026-03-27',
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'vac-003',
    title: 'Coordinador(a) de Operaciones Funerarias',
    area: 'Operaciones',
    department: 'Cundinamarca',
    city: 'Bogota',
    modality: 'Hibrido',
    contractType: 'Tiempo completo',
    schedule: 'Disponibilidad 24/7 por turnos',
    salary: 'A convenir',
    experience: '3+ anos liderando equipos operativos',
    summary:
      'Planeacion operativa de servicios, control de protocolos y liderazgo de equipos en campo.',
    requirements: [
      'Experiencia en coordinacion logistica',
      'Manejo de indicadores de servicio',
      'Capacidad de toma de decisiones bajo presion',
    ],
    benefits: ['Bono por cumplimiento', 'Plan de bienestar', 'Desarrollo de liderazgo'],
    featured: false,
    postedAt: '2026-03-26',
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'vac-004',
    title: 'Disenador(a) de Contenido Digital',
    area: 'Marketing',
    department: 'Antioquia',
    city: 'Medellin',
    modality: 'Hibrido',
    contractType: 'Tiempo completo',
    schedule: 'Lunes a viernes',
    salary: 'A convenir',
    experience: '2+ anos en contenido digital',
    summary:
      'Creacion de piezas visuales y campanas para fortalecer marca, comunicacion institucional y conversion.',
    requirements: [
      'Dominio de suite de diseno',
      'Criterio estetico y narrativa visual',
      'Portafolio actualizado',
    ],
    benefits: ['Modelo hibrido', 'Proyectos de alto impacto', 'Capacitaciones especializadas'],
    featured: false,
    postedAt: '2026-03-24',
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'vac-005',
    title: 'Analista de Talento Humano',
    area: 'Gestion humana',
    department: 'Caldas',
    city: 'Manizales',
    modality: 'Presencial',
    contractType: 'Tiempo completo',
    schedule: 'Lunes a viernes',
    salary: 'A convenir',
    experience: '2+ anos en seleccion y desarrollo',
    summary:
      'Gestion integral de procesos de reclutamiento, bienestar y acompanamiento al colaborador.',
    requirements: [
      'Experiencia en entrevistas por competencias',
      'Conocimiento en indicadores de rotacion',
      'Habilidades de comunicacion y cultura organizacional',
    ],
    benefits: ['Ruta de carrera', 'Programas de bienestar', 'Acompanamiento profesional'],
    featured: false,
    postedAt: '2026-03-22',
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'vac-006',
    title: 'Desarrollador(a) Frontend',
    area: 'Tecnologia',
    department: 'Tolima',
    city: 'Ibague',
    modality: 'Remoto',
    contractType: 'Prestacion de servicios',
    schedule: 'Flexible por entregables',
    salary: 'A convenir',
    experience: '2+ anos con React/Next.js',
    summary:
      'Implementacion de interfaces web para canales digitales y proyectos internos de servicio.',
    requirements: [
      'Manejo de TypeScript y Next.js',
      'Consumo de APIs y buenas practicas UI',
      'Experiencia con Git y trabajo colaborativo',
    ],
    benefits: ['Trabajo remoto', 'Horarios flexibles', 'Equipo de alto rendimiento'],
    featured: true,
    postedAt: '2026-03-20',
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'vac-007',
    title: 'Auxiliar Administrativo Regional',
    area: 'Administrativo',
    department: 'Quindio',
    city: 'Armenia',
    modality: 'Presencial',
    contractType: 'Tiempo completo',
    schedule: 'Lunes a sabado',
    salary: 'A convenir',
    experience: '1+ ano en procesos administrativos',
    summary:
      'Soporte en documentacion, facturacion, control de cartera y apoyo a coordinacion regional.',
    requirements: [
      'Manejo intermedio de Excel',
      'Orden documental y seguimiento',
      'Atencion al detalle',
    ],
    benefits: ['Estabilidad', 'Capacitacion', 'Convenios corporativos'],
    featured: false,
    postedAt: '2026-03-18',
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'vac-008',
    title: 'Supervisor(a) de Sede',
    area: 'Operacion y servicio',
    department: 'Huila',
    city: 'Neiva',
    modality: 'Presencial',
    contractType: 'Tiempo completo',
    schedule: 'Turnos rotativos',
    salary: 'A convenir + variable',
    experience: '3+ anos en supervision de equipos',
    summary:
      'Direccion de personal en sede, cumplimiento de protocolos y mejoramiento continuo de la operacion.',
    requirements: [
      'Liderazgo comprobado',
      'Control de indicadores y reportes',
      'Enfoque en servicio y calidad',
    ],
    benefits: ['Variable por resultados', 'Formacion en liderazgo', 'Plan de carrera'],
    featured: true,
    postedAt: '2026-03-16',
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
];

export function normalizeVacancyDepartment(value: string | undefined) {
  const normalized = value?.trim() ?? '';
  if (normalized && VACANCY_DEPARTMENTS.includes(normalized)) {
    return normalized;
  }
  return DEFAULT_VACANCY_DEPARTMENT;
}

export function createEmptyVacancy(): JobVacancy {
  return {
    id: '',
    title: '',
    area: '',
    department: DEFAULT_VACANCY_DEPARTMENT,
    city: '',
    modality: 'Presencial',
    contractType: 'Tiempo completo',
    schedule: '',
    salary: '',
    experience: '',
    summary: '',
    requirements: [],
    benefits: [],
    featured: false,
    postedAt: new Date().toISOString().slice(0, 10),
    createdAt: '',
    updatedAt: '',
  };
}
