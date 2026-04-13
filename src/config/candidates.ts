export interface CandidateProfile {
  documentNumber: string;
  fullName: string;
  email: string;
  passwordHash: string;
  passwordUpdatedAt: string;
  phone: string;
  department: string;
  city: string;
  professionalTitle: string;
  yearsExperience: string;
  education: string;
  skills: string;
  about: string;
  linkedinUrl: string;
  portfolioUrl: string;
  resumeFileName: string;
  resumeFileData: string;
  updatedAt: string;
}

export type ApplicationStatus =
  | 'Recibida'
  | 'En revision'
  | 'Entrevista'
  | 'Prueba tecnica'
  | 'Seleccionado'
  | 'No continua';

export const APPLICATION_STATUS_OPTIONS: ApplicationStatus[] = [
  'Recibida',
  'En revision',
  'Entrevista',
  'Prueba tecnica',
  'Seleccionado',
  'No continua',
];

export interface JobApplication {
  id: string;
  trackingCode: string;
  vacancyId: string;
  vacancyTitle: string;
  candidateDocument: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  resumeFileName: string;
  resumeFileData: string;
  appliedAt: string;
  status: ApplicationStatus;
}

export const CANDIDATE_PROFILE_STORAGE_KEY = 'jdr.candidate.profile.v1';
export const CANDIDATE_APPLICATIONS_STORAGE_KEY = 'jdr.candidate.applications.v1';

export function createEmptyCandidateProfile(): CandidateProfile {
  return {
    documentNumber: '',
    fullName: '',
    email: '',
    passwordHash: '',
    passwordUpdatedAt: '',
    phone: '',
    department: '',
    city: '',
    professionalTitle: '',
    yearsExperience: '',
    education: '',
    skills: '',
    about: '',
    linkedinUrl: '',
    portfolioUrl: '',
    resumeFileName: '',
    resumeFileData: '',
    updatedAt: '',
  };
}
