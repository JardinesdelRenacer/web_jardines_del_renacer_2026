import {
  APPLICATION_STATUS_OPTIONS,
  CANDIDATE_APPLICATIONS_STORAGE_KEY,
  CANDIDATE_PROFILE_STORAGE_KEY,
  createEmptyCandidateProfile,
  type CandidateProfile,
  type JobApplication,
} from '@/config/candidates';

/**
 * Normaliza los datos de un perfil de candidato para asegurar que tiene
 * todos los campos requeridos en la interfaz `CandidateProfile`.
 * 
 * @param record - Objeto parcial almacenado que puede tener datos faltantes.
 * @returns El perfil completo y estandarizado con los campos por defecto.
 */
function normalizeProfile(record: Partial<CandidateProfile>): CandidateProfile {
  return {
    documentNumber: record.documentNumber ?? '',
    fullName: record.fullName ?? '',
    email: record.email ?? '',
    passwordHash: record.passwordHash ?? '',
    passwordUpdatedAt: record.passwordUpdatedAt ?? '',
    phone: record.phone ?? '',
    department: record.department ?? '',
    city: record.city ?? '',
    professionalTitle: record.professionalTitle ?? '',
    yearsExperience: record.yearsExperience ?? '',
    education: record.education ?? '',
    skills: record.skills ?? '',
    about: record.about ?? '',
    linkedinUrl: record.linkedinUrl ?? '',
    portfolioUrl: record.portfolioUrl ?? '',
    resumeFileName: record.resumeFileName ?? '',
    resumeFileData: record.resumeFileData ?? '',
    updatedAt: record.updatedAt ?? '',
  };
}

/**
 * Normaliza los datos de una postulación individual para asegurar consistencia.
 * También proporciona soporte a datos generados en versiones anteriores de la plataforma.
 * 
 * @param record - Objeto parcial con la postulación guardada en el navegador.
 * @returns Un objeto `JobApplication` válido o `null` si faltan campos obligatorios críticos.
 */
function normalizeApplication(record: Partial<JobApplication>): JobApplication | null {
  // Soporte de compatibilidad (Legacy) para datos de versiones anteriores del formulario.
  const legacyRecord = record as Partial<JobApplication> & {
    email?: string;
    phone?: string;
    fullName?: string;
    documentNumber?: string;
    trackingCode?: string;
  };
  const candidateEmail = (record.candidateEmail ?? legacyRecord.email ?? '').trim();
  const candidateDocument = (record.candidateDocument ?? legacyRecord.documentNumber ?? '')
    .toString()
    .replace(/\D/g, '');

  if (
    !record.id ||
    !record.vacancyId ||
    !record.vacancyTitle ||
    !candidateEmail
  ) {
    return null;
  }
  const validStatus = APPLICATION_STATUS_OPTIONS.includes(
    record.status as (typeof APPLICATION_STATUS_OPTIONS)[number],
  )
    ? (record.status as JobApplication['status'])
    : 'Recibida';
  return {
    id: record.id,
    trackingCode:
      (record.trackingCode ?? legacyRecord.trackingCode ?? '')
        .toString()
        .trim()
        .toUpperCase() || `JDR-${record.id.toUpperCase()}`,
    vacancyId: record.vacancyId,
    vacancyTitle: record.vacancyTitle,
    candidateDocument,
    candidateName: record.candidateName ?? legacyRecord.fullName ?? '',
    candidateEmail,
    candidatePhone: record.candidatePhone ?? legacyRecord.phone ?? '',
    resumeFileName: record.resumeFileName ?? '',
    resumeFileData: record.resumeFileData ?? '',
    appliedAt: record.appliedAt ?? new Date().toISOString(),
    status: validStatus,
  };
}

/**
 * Lee y recupera el perfil del candidato guardado en el navegador (Local Storage).
 * Si no existe o hay error de formato, devuelve un perfil completamente vacío.
 * 
 * @returns El objeto de perfil del candidato activo.
 */
export function readCandidateProfile() {
  if (typeof window === 'undefined') {
    return createEmptyCandidateProfile();
  }
  const raw = window.localStorage.getItem(CANDIDATE_PROFILE_STORAGE_KEY);
  if (!raw) {
    return createEmptyCandidateProfile();
  }
  try {
    return normalizeProfile(JSON.parse(raw) as Partial<CandidateProfile>);
  } catch {
    return createEmptyCandidateProfile();
  }
}

/**
 * Guarda el perfil del candidato directamente en el Local Storage del navegador
 * y emite un evento custom ('candidate-storage-updated') para que el resto de
 * la aplicación (como los paneles en otras pestañas) sepa que debe refrescar los datos.
 * 
 * @param profile - El objeto `CandidateProfile` que se desea guardar.
 */
export function writeCandidateProfile(profile: CandidateProfile) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(CANDIDATE_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event('candidate-storage-updated'));
}

/**
 * Lee el arreglo de postulaciones a vacantes (historial) del candidato activo
 * y las normaliza para evitar errores en las vistas de listados.
 * 
 * @returns Una lista tipada `JobApplication[]`. Si no hay datos devuelve `[]`.
 */
export function readCandidateApplications() {
  if (typeof window === 'undefined') {
    return [] as JobApplication[];
  }
  const raw = window.localStorage.getItem(CANDIDATE_APPLICATIONS_STORAGE_KEY);
  if (!raw) {
    return [] as JobApplication[];
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [] as JobApplication[];
    }
    return parsed
      .map((record) => normalizeApplication(record as Partial<JobApplication>))
      .filter(Boolean) as JobApplication[];
  } catch {
    return [] as JobApplication[];
  }
}

/**
 * Guarda todo el historial de postulaciones de un candidato en el Storage
 * y notifica al resto del frontend que hubo cambios en las aplicaciones.
 * 
 * @param applications - Arreglo de objetos `JobApplication` que reemplazará al actual.
 */
export function writeCandidateApplications(applications: JobApplication[]) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(CANDIDATE_APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
  window.dispatchEvent(new Event('candidate-storage-updated'));
}
