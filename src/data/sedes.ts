/**
 * Sedes - Jardines del Renacer
 * Directorio nacional de puntos de atención
 */

export interface Sede {
  id: string;
  nombre: string;
  direccion: string;
  administradora: string;
  telefono: string;
  departamento: string;
  ciudad: string;
}

export interface DepartamentoInfo {
  nombre: string;
  slug: string;
  count: number;
  ciudades: string[];
}

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────

export function getDepartamentoSlug(departamento: string): string {
  return departamento
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/\./g, '')              // remove dots
    .trim()
    .replace(/\s+/g, '-')           // spaces → hyphens
    .replace(/[^a-z0-9-]/g, '');    // remove remaining special chars
}

export function getSedesByDepartamento(slug: string): Sede[] {
  return SEDES.filter((s) => getDepartamentoSlug(s.departamento) === slug);
}

export function getAllDepartamentos(): DepartamentoInfo[] {
  const map = new Map<string, DepartamentoInfo>();
  for (const sede of SEDES) {
    const slug = getDepartamentoSlug(sede.departamento);
    if (!map.has(slug)) {
      map.set(slug, { nombre: sede.departamento, slug, count: 0, ciudades: [] });
    }
    const dep = map.get(slug)!;
    dep.count++;
    if (!dep.ciudades.includes(sede.ciudad)) {
      dep.ciudades.push(sede.ciudad);
    }
  }
  return Array.from(map.values()).sort((a, b) =>
    a.nombre.localeCompare(b.nombre, 'es'),
  );
}

// ──────────────────────────────────────────────────────────────
// Data - SEDES
// ──────────────────────────────────────────────────────────────

export const SEDES: Sede[] = [
  // ── RISARALDA ───────────────────────────────────────────────
  { id: 'rs-07', nombre: 'Pereira - La 27', direccion: 'CALLE 27 # 6-22 CENTRO', administradora: '', telefono: '', departamento: 'Risaralda', ciudad: 'Pereira' },
  { id: 'rs-08', nombre: 'Pereira - Cuba', direccion: 'CALLE 68 BIS # 25 - 40', administradora: '', telefono: '', departamento: 'Risaralda', ciudad: 'Pereira' },
  { id: 'rs-09', nombre: 'Dosquebradas - La Badea', direccion: 'AVENIDA TURIN LA POPA CALLE 9 No. 5-162', administradora: '', telefono: '', departamento: 'Risaralda', ciudad: 'Dosquebradas' },
  { id: 'rs-10', nombre: 'Apía', direccion: 'CRA 8 # 10-35', administradora: '', telefono: '', departamento: 'Risaralda', ciudad: 'Apía' },
  { id: 'rs-11', nombre: 'Santuario', direccion: 'CRA 7 # 7-04', administradora: '', telefono: '', departamento: 'Risaralda', ciudad: 'Santuario' },
  { id: 'rs-12', nombre: 'La Virginia', direccion: 'CRA 9 # 6-23 CENTRO', administradora: '', telefono: '', departamento: 'Risaralda', ciudad: 'La Virginia' },
  { id: 'rs-13', nombre: 'Marsella', direccion: 'CRA 9 # 18-36 B/ CENTRO Oficina; Cra 10 # 8-40 SALA', administradora: '', telefono: '', departamento: 'Risaralda', ciudad: 'Marsella' },
  { id: 'rs-14', nombre: 'Santa Rosa', direccion: 'Calle 13 # 11-75 Centro', administradora: '', telefono: '', departamento: 'Risaralda', ciudad: 'Santa Rosa' },
  { id: 'rs-15', nombre: 'Belén de Umbría', direccion: 'Calle 6 # 11-33', administradora: 'Gina Hazbleidy Zapata Roman', telefono: '', departamento: 'Risaralda', ciudad: 'Belén de Umbría' },
  { id: 'rs-16', nombre: 'Guática', direccion: 'Carrera 5 # 9-16 Calle Principal', administradora: 'Maria Fernanda Ramirez Garcia', telefono: '3128280052', departamento: 'Risaralda', ciudad: 'Guática' },
  { id: 'rs-17', nombre: 'Mistrató', direccion: 'Carrera 6 # 6-18 Piso 1', administradora: 'Daniela González Román', telefono: '', departamento: 'Risaralda', ciudad: 'Mistrató' },
  { id: 'rs-18', nombre: 'Quinchía', direccion: 'Carrera 6 # 4-42 Barrio Plazuela', administradora: 'Yeifer Alejandra Ferrer Mapura', telefono: '', departamento: 'Risaralda', ciudad: 'Quinchía' },

  // ── ANTIOQUIA ───────────────────────────────────────────────
  { id: 'an-01', nombre: 'Medellín', direccion: 'CRA 51D # 61-88 AVDA JUAN DEL CORRAL PRADO CENTRO', administradora: 'Ana Maria Betancur - Admon Regional', telefono: '3116262976 servicios, 3116682040 cartera, 3219141765 Corporativo, 604-4310645', departamento: 'Antioquia', ciudad: 'Medellín' },
  { id: 'an-02', nombre: 'Itagüí', direccion: 'Calle 50A # 48-39 queda a cuadra y media del parque principal', administradora: 'DEICY YOHANA ORTIZ', telefono: '(604) 4310645', departamento: 'Antioquia', ciudad: 'Itagüí' },
  { id: 'an-03', nombre: 'La Pintada', direccion: 'Calle 35 # 33-17 Barrio Pueblo Nuevo', administradora: 'Angie Vanessa Piedrahita Villada', telefono: '3134649079', departamento: 'Antioquia', ciudad: 'La Pintada' },
  { id: 'an-04', nombre: 'Valparaíso', direccion: 'Carrera 10 Bolivar # 10-19', administradora: 'Olga Stella Ospina Montoya', telefono: '3228147176', departamento: 'Antioquia', ciudad: 'Valparaíso' },
  { id: 'an-05', nombre: 'Caramanta', direccion: 'Cra 20 #20-43 Cordoba', administradora: 'Cristina Marcela Guiral Puerta', telefono: '3228147221', departamento: 'Antioquia', ciudad: 'Caramanta' },

  // ── QUINDÍO ──────────────────────────────────────────────────
  { id: 'qu-01', nombre: 'Génova', direccion: 'CRA 10 NUM 26 -40 ( 24-52)', administradora: 'LEIDY CAROLINA SUAREZ', telefono: '606 732931 EXT 214', departamento: 'Quindío', ciudad: 'Génova' },
  { id: 'qu-02', nombre: 'Quimbaya', direccion: 'CRA 3 # 15-47 ESQUINA', administradora: 'ANGELICA SANCHEZ', telefono: '6067329231', departamento: 'Quindío', ciudad: 'Quimbaya' },
  { id: 'qu-03', nombre: 'Calarca', direccion: 'CALLE 38 25-36', administradora: 'ANA CAROLINA CASTAÑO', telefono: '6067329131', departamento: 'Quindío', ciudad: 'Calarca' },
  { id: 'qu-04', nombre: 'Barcelona', direccion: 'CRA 10 # 10-02', administradora: 'NICOL SOFIA BUITRAGO VASQUEZ', telefono: '', departamento: 'Quindío', ciudad: 'Barcelona' },
  { id: 'qu-05', nombre: 'Pijao', direccion: 'CRA6 CALLE13 #6-09', administradora: 'HELEIN YINELA AGUDELO HERRERA', telefono: '606-7329231', departamento: 'Quindío', ciudad: 'Pijao' },
  { id: 'qu-06', nombre: 'Cordoba', direccion: 'CALLE 14 # 10 - 35 CENTRO', administradora: 'MOISES CORTES', telefono: '6067329231', departamento: 'Quindío', ciudad: 'Cordoba' },
  { id: 'qu-07', nombre: 'Circasia', direccion: 'CARRERA 11#5-55', administradora: 'JOHANA CAROLINA ZAMBRANO', telefono: '6067329231', departamento: 'Quindío', ciudad: 'Circasia' },
  { id: 'qu-08', nombre: 'Tebaida', direccion: 'CRA 8 NUMERO 10-18', administradora: 'KAROL ANGELY VILLEGAS GARCIA', telefono: '6067329231', departamento: 'Quindío', ciudad: 'Tebaida' },
  { id: 'qu-09', nombre: 'Montenegro', direccion: 'calle 15# 5-37 piso 1', administradora: 'NATHALY PIEDRAHITA PACHON', telefono: '317 4358467', departamento: 'Quindío', ciudad: 'Montenegro' },
  { id: 'qu-10', nombre: 'Armenia', direccion: 'CRA 13 # 23 - 55 CENTRO - CRA 13 # 23-52 Y CRA 13 # 23-49', administradora: 'PAOLA ANDREA CRUZ CAMPOS', telefono: '3105563221', departamento: 'Quindío', ciudad: 'Armenia' },

  // ── VALLE DEL CAUCA ──────────────────────────────────────────
    { id: 'vc-01', nombre: 'Tuluá', direccion: 'calle 26 # 38-25', administradora: 'katheriner Santa', telefono: '3115343146', departamento: 'Valle del Cauca', ciudad: 'Tuluá' },
    { id: 'vc-05', nombre: 'Riofrío', direccion: 'calle 5 #10-28 barrio centro', administradora: 'YESSENIA JARAMILLO-NICOLLE', telefono: '6023800914', departamento: 'Valle del Cauca', ciudad: 'Riofrío' },
    { id: 'vc-06', nombre: 'Trujillo', direccion: 'Carrera 19# 20-74', administradora: 'YAMILETH CORREA', telefono: '', departamento: 'Valle del Cauca', ciudad: 'Trujillo' },
    { id: 'vc-07', nombre: 'Andalucía', direccion: 'carrera 4 # 17-02', administradora: 'DIGNORA XASTAÑO', telefono: '', departamento: 'Valle del Cauca', ciudad: 'Andalucía' },
    { id: 'vc-08', nombre: 'Guacarí', direccion: 'CALLE 4 # 2-150 CUARTO CENTENARIO', administradora: 'YESICA NILLERAY DUQUE', telefono: '3116681849, (606) 3419500', departamento: 'Valle del Cauca', ciudad: 'Guacarí' },
    { id: 'vc-09', nombre: 'Bugalagrande', direccion: 'Cra 6 # 4-03  barrio corporativo', administradora: 'PAOLA TELLO', telefono: '3112062478', departamento: 'Valle del Cauca', ciudad: 'Bugalagrande' },
    { id: 'vc-10', nombre: 'Sevilla', direccion: 'CALLE 48 #47-32', administradora: 'NORMA CONSTANZA GRANADA', telefono: '6067329231', departamento: 'Valle del Cauca', ciudad: 'Sevilla' },
    { id: 'vc-11', nombre: 'Caicedonia', direccion: 'CARRERA 16 # 7-33', administradora: 'MILDREY MARIN', telefono: '6067329231', departamento: 'Valle del Cauca', ciudad: 'Caicedonia' },
    { id: 'vc-12', nombre: 'Bolívar', direccion: 'Calle 4 #3-22, barrio centro', administradora: 'VANESA TAPASCO MONDRAGON', telefono: '', departamento: 'Valle del Cauca', ciudad: 'Bolívar' },
    { id: 'vc-13', nombre: 'Palmira', direccion: 'Calle32#31-81', administradora: 'jessica maria dominguez', telefono: '3232216871, 6023896438', departamento: 'Valle del Cauca', ciudad: 'Palmira' },
    { id: 'vc-18', nombre: 'Florida', direccion: 'Carrera 17 # 8-54 barrio puerto nuevo', administradora: 'Leidy Marcela Gonzalez Pedroza', telefono: '6023896438', departamento: 'Valle del Cauca', ciudad: 'Florida' },
    { id: 'vc-19', nombre: 'Pradera', direccion: 'Carrera 10 9-23 Barrio San Roque', administradora: 'Alba Rivera Rivera', telefono: '6023896438', departamento: 'Valle del Cauca', ciudad: 'Pradera' },
    { id: 'vc-20', nombre: 'Cali', direccion: 'Av 3Bis Norte #24-85 Administrativo', administradora: 'Karen Lorena Arango Riascos', telefono: '3229446453', departamento: 'Valle del Cauca', ciudad: 'Cali' },
    { id: 'vc-24', nombre: 'Yumbo', direccion: 'Carrera 4#3-59   al frente  de la panadería Oro Miel', administradora: 'yuri ocampo', telefono: '', departamento: 'Valle del Cauca', ciudad: 'Yumbo' },
    { id: 'vc-25', nombre: 'Argelia', direccion: 'CALLE 4 # 7-28', administradora: 'LUZ EDILMA BOTERO', telefono: '', departamento: 'Valle del Cauca', ciudad: 'Argelia' },
    { id: 'vc-26', nombre: 'La Unión', direccion: 'CALLE 14 # 10-81', administradora: 'VALENTINA RESTREPO', telefono: '6023800913', departamento: 'Valle del Cauca', ciudad: 'La Unión' },
    { id: 'vc-27', nombre: 'Zarzal', direccion: 'CRA 9 # 9-94', administradora: 'MARTHA LUCIA GIRALDO', telefono: '3136628996, 6023800913', departamento: 'Valle del Cauca', ciudad: 'Zarzal' },
    { id: 'vc-28', nombre: 'Anserma Nuevo', direccion: 'CALLE 6 # 6-22', administradora: 'GOMEZ PARRA LUZ AIDA', telefono: '6023800913', departamento: 'Valle del Cauca', ciudad: 'Anserma Nuevo' },
    { id: 'vc-29', nombre: 'Cartago', direccion: 'Calle 11 #2-54 y calle 11#2-60 piso 01', administradora: 'CLAUDIA PATRICIA CHAVARRIAGA', telefono: '3216061919 SERVICIOS CORPORATIVO ADMON 3117050357, 6023800913', departamento: 'Valle del Cauca', ciudad: 'Cartago' },
    { id: 'vc-30', nombre: 'El Águila', direccion: 'CALLE 6 # 6-08', administradora: 'NOREÑA ROLDAN HERNAN DARIO', telefono: '3136628987', departamento: 'Valle del Cauca', ciudad: 'El Águila' },
    { id: 'vc-31', nombre: 'El Dovio', direccion: 'CRA 7 N 5-22', administradora: 'URDINOLA PINILLOS CLAUDIA PATRICIA', telefono: '3136628941', departamento: 'Valle del Cauca', ciudad: 'El Dovio' },
    { id: 'vc-32', nombre: 'La Victoria', direccion: 'CALLE 9 N 7-12', administradora: 'LEIDY OSORIO', telefono: '3116681902, 6023800913', departamento: 'Valle del Cauca', ciudad: 'La Victoria' },
    { id: 'vc-33', nombre: 'Obando', direccion: 'CALLE 4 N 2-05', administradora: 'PULIDO SABOGAL GLORIA CECILIA', telefono: '3103334276, 6023800913', departamento: 'Valle del Cauca', ciudad: 'Obando' },
    { id: 'vc-34', nombre: 'Roldanillo', direccion: 'CRA 7 N 9-58', administradora: 'CARDONA MARLYN DANIELA', telefono: '6023800913', departamento: 'Valle del Cauca', ciudad: 'Roldanillo' },
    { id: 'vc-35', nombre: 'Toro', direccion: 'CALLE 11 N 2-58CCC', administradora: 'MYRIAN ALEJANDRA VASQUEZ', telefono: '3113769908, 6023800913', departamento: 'Valle del Cauca', ciudad: 'Toro' },
    { id: 'vc-36', nombre: 'Versalles', direccion: 'CALLE 8 # 4-13 BARRIO GUAYABITO', administradora: 'GEICY YURANY TRUJILLO', telefono: '3219141777', departamento: 'Valle del Cauca', ciudad: 'Versalles' },
    { id: 'vc-37', nombre: 'Zaragoza', direccion: 'KILOMETRO 2.5 CARTAGO- ZARAGOZA', administradora: 'JENIFER YULIETH RUIZ RAMIREZ', telefono: '3224133959', departamento: 'Valle del Cauca', ciudad: 'Zaragoza' },
    { id: 'vc-38', nombre: 'Alcalá', direccion: 'CRA 9 # 4-15', administradora: 'YORLEN MARITZA VILLA MATUTE', telefono: '6067329231', departamento: 'Valle del Cauca', ciudad: 'Alcalá' },
    { id: 'vc-39', nombre: 'Ulloa', direccion: 'CALLE 5 # 2-43 PARQUE PRINCIPAL', administradora: 'LINA USUGA PINO', telefono: '6067329231', departamento: 'Valle del Cauca', ciudad: 'Ulloa' },

  // ── CUNDINAMARCA ─────────────────────────────────────────────
    { id: 'cu-01', nombre: 'Cachipay', direccion: 'CALLE 3 # 2-56 CENTRO', administradora: 'HUSMARY VALENTINA FONSECA TORRES', telefono: '601 - 7948497', departamento: 'Cundinamarca', ciudad: 'Cachipay' },
    { id: 'cu-02', nombre: 'Facatativá', direccion: 'CARRERA 3 #4-14 CENTRO', administradora: 'ANGIE LICETH NUÑEZ NIETO', telefono: '3228147818, 601- 794 8497', departamento: 'Cundinamarca', ciudad: 'Facatativá' },
    { id: 'cu-03', nombre: 'Fusagasugá', direccion: 'CARRERA 7 # 4-26 CENTRO', administradora: 'WLEYDY STHEFANY GONZALEZ GONZALEZ', telefono: '3229449886, 601- 794 8497', departamento: 'Cundinamarca', ciudad: 'Fusagasugá' },
    { id: 'cu-04', nombre: 'Bogotá Teusaquillo', direccion: 'Calle 34 # 16-09 Teusaquillo', administradora: 'Lina Marcela Caviedes Calderón', telefono: '3145881602, 4874893', departamento: 'Cundinamarca', ciudad: 'Bogotá' },
    { id: 'cu-05', nombre: 'Bogotá Kennedy', direccion: 'Carrera 73 D # 26-37', administradora: 'Yessenia Maria Gutierrez Zuluaga', telefono: '', departamento: 'Cundinamarca', ciudad: 'Bogotá' },

  // ── TOLIMA ───────────────────────────────────────────────────
    { id: 'to-01', nombre: 'Girardot', direccion: 'CALLE 19 # 11-80 SUCRE', administradora: 'LUISA FERNANDA CASTRO MENDEZ', telefono: '3229449895', departamento: 'Tolima', ciudad: 'Girardot' },
    { id: 'to-02', nombre: 'Anapoima', direccion: 'CALLE 5 # 1-39 BARRIO CENTRO', administradora: 'MARIANA ACOSTA ALFONSO', telefono: '601-7948497', departamento: 'Tolima', ciudad: 'Anapoima' },
    { id: 'to-03', nombre: 'Tocaima', direccion: 'CALLE 2  8-98   BARRIO CONSOLATA', administradora: 'MARGARITA BERRIO SERENO', telefono: '3112062575', departamento: 'Tolima', ciudad: 'Tocaima' },
    { id: 'to-04', nombre: 'Melgar', direccion: 'CALLE 10 N 21-07 BARRIO YAJAIRA', administradora: 'MAYRA ALEJANDRA SANCHEZ CASTAÑO', telefono: '601- 794 8497', departamento: 'Tolima', ciudad: 'Melgar' },
    { id: 'to-05', nombre: 'Espinal', direccion: 'CALLE 9 N° 8 -92 CENTRO', administradora: 'LEIDY PAOLA ORTIZ SANCHEZ', telefono: '601- 794 8497', departamento: 'Tolima', ciudad: 'Espinal' },
    { id: 'to-06', nombre: 'Villarrica', direccion: 'CALLE 5 # 3-17 CENTRO', administradora: 'MICHAEL STIVEN AVILA LONDOÑO', telefono: '3112062652', departamento: 'Tolima', ciudad: 'Villarrica' },
    { id: 'to-07', nombre: 'Icononzo', direccion: 'CARRERA 6 # 5-48 BARRIO CENTRO', administradora: 'JOHANNA PATRICIA PEREZ HUERTAS', telefono: '3005167090', departamento: 'Tolima', ciudad: 'Icononzo' },
    { id: 'to-08', nombre: 'Ibagué', direccion: 'CRA 4 B No 31 - 04 CADIZ', administradora: 'Yesenia beltran', telefono: '3214958867', departamento: 'Tolima', ciudad: 'Ibagué' },
    { id: 'to-09', nombre: 'Anzoategui', direccion: 'CRA 2 #6 67 SECTOR HOSPITAL', administradora: 'Lucy Bibiana Cespedes Rodríguez', telefono: '3143651736', departamento: 'Tolima', ciudad: 'Anzoategui' },
    { id: 'to-10', nombre: 'Venadillo', direccion: 'CRA 5 # 4-57 SANTA BARBARA', administradora: 'Yeimi Paola Lozano Rodríguez', telefono: '3229482923', departamento: 'Tolima', ciudad: 'Venadillo' },
    { id: 'to-11', nombre: 'Lerida', direccion: 'CRA 12 #2A - 46 AV PALMAS', administradora: 'Gisela Del Pilar Mahecha Acosta', telefono: '3245717546', departamento: 'Tolima', ciudad: 'Lerida' },
    { id: 'to-12', nombre: 'Líbano', direccion: 'CALLE 4 # 3-100 B/EL CARMEN', administradora: 'Russ Belly Pineda Sánchez', telefono: '3214279398', departamento: 'Tolima', ciudad: 'Líbano' },
    { id: 'to-13', nombre: 'Villahermosa', direccion: 'CLL 8 LOCAL 3 PARROQUIA NUESTRA SEÑORA DE LAS MERCEDES', administradora: 'Luz Nidia Orrego', telefono: '3106676261', departamento: 'Tolima', ciudad: 'Villahermosa' },
    { id: 'to-14', nombre: 'Santaisabel', direccion: 'CALLE PRINCIPAL CR 2 #  4-20', administradora: 'Ana Sofia Guzman Vela', telefono: '3133447254', departamento: 'Tolima', ciudad: 'Santaisabel' },
    { id: 'to-15', nombre: 'Fresno', direccion: 'carrera 9 con cll 5 esquina sector la variante', administradora: 'Leidy Jhoana Hincapie Hincapie', telefono: '3114369645', departamento: 'Tolima', ciudad: 'Fresno' },
    { id: 'to-16', nombre: 'Mariquita', direccion: 'CRA 4 # 8-39 EL CARMEN', administradora: 'Nini Jhoana Lopez', telefono: '3223813279', departamento: 'Tolima', ciudad: 'Mariquita' },
    { id: 'to-17', nombre: 'Rovira', direccion: 'CRA 3 #4-61 CENTRO', administradora: 'Maria Juanita Sanchez', telefono: '3103677915', departamento: 'Tolima', ciudad: 'Rovira' },
    { id: 'to-18', nombre: 'Honda', direccion: 'CRA 12 # 16a-01 EL CARMEN', administradora: 'rosemberg sepulveda', telefono: '3208568338', departamento: 'Tolima', ciudad: 'Honda' },
    { id: 'to-19', nombre: 'Ibagué', direccion: 'CRA 4 B No 31 - 04 CADIZ', administradora: 'Alexandra galeano', telefono: '', departamento: 'Tolima', ciudad: 'Ibagué' },

  // ── CAUCA ────────────────────────────────────────────────────
    { id: 'ca-01', nombre: 'Santander de Quilichao', direccion: 'calle 8 # 11-81 Barrio Centenario', administradora: 'gina alexandra armero', telefono: '', departamento: 'Cauca', ciudad: 'Santander de Quilichao' },
    { id: 'ca-02', nombre: 'Popayán', direccion: 'Calle 4 # 10-49 el cadillal', administradora: 'Yessica Serna', telefono: '3209891670', departamento: 'Cauca', ciudad: 'Popayán' },

  // ── HUILA ────────────────────────────────────────────────────
    { id: 'hu-01', nombre: 'Aipe', direccion: 'Carrera 4 N° 2-102 Maria Auxiliadora', administradora: 'Ana Marcela Murcia Paloma', telefono: '3229449891', departamento: 'Huila', ciudad: 'Aipe' },
    { id: 'hu-02', nombre: 'Garzon', direccion: 'calle 7 No. 12-39 barrio el Rosario enseguida de motos Auteco', administradora: 'Leidy Johanna Urbano Potosi', telefono: '3228356688', departamento: 'Huila', ciudad: 'Garzon' },
    { id: 'hu-03', nombre: 'La Plata', direccion: 'Calle 7 N° 3-09 Local 2 Centro', administradora: 'Angie Paola Urbano Martinez', telefono: '3226911894', departamento: 'Huila', ciudad: 'La Plata' },
    { id: 'hu-04', nombre: 'Neiva', direccion: 'Carrera 7 N° 14 - 42 Quirinal', administradora: 'Ana Cristina Cuellar Ospina', telefono: '3206921292', departamento: 'Huila', ciudad: 'Neiva' },
    { id: 'hu-09', nombre: 'Pitalito', direccion: 'Carrera 4 N° 10-69  Centro', administradora: 'Gina Graciela Encizo Alvarez', telefono: '3116465358', departamento: 'Huila', ciudad: 'Pitalito' },

  // ── PUTUMAYO ─────────────────────────────────────────────────
    { id: 'pu-01', nombre: 'Mocoa', direccion: 'Calle 4 N° 5-102 Homero Bajo', administradora: 'Yolanda Andrea Corboba Hoyos', telefono: '3103332920', departamento: 'Putumayo', ciudad: 'Mocoa' },

  // ── META ──────────────────────────────────────────────────────
    { id: 'me-01', nombre: 'Acacías', direccion: 'CARRERA 20 # 13-59 BARRIO COOPERATIVO', administradora: 'KELLY ALEXANDRA CASTRO CARDENAS', telefono: '606-3419500', departamento: 'Meta', ciudad: 'Acacías' },
    { id: 'me-02', nombre: 'Villavicencio', direccion: 'CARRERA  39 # 35-20 BARRIO BARZAL', administradora: 'MARIA VALENTINA REY PARRA', telefono: '606-3419500', departamento: 'Meta', ciudad: 'Villavicencio' },

  // ── SANTANDER ─────────────────────────────────────────────────
    { id: 'sa-01', nombre: 'Bucaramaga', direccion: 'Calle 36 # 22-30', administradora: 'Sandra Noriega Grozo', telefono: '315 3948469', departamento: 'Santander', ciudad: 'Bucaramaga' },
    { id: 'sa-02', nombre: 'San Gil', direccion: 'Calle 19 n° 7-17 Barrio Cristo Resucitado', administradora: 'Kendry Dayana Delgado', telefono: '314 3292099', departamento: 'Santander', ciudad: 'San Gil' },

  // ── CALDAS ────────────────────────────────────────────────────
    { id: 'cal-01', nombre: 'Anserma', direccion: 'Cra 4 # 15-28', administradora: 'Claudia Patricia Arroyave Montes - Coordinadora De Cartera', telefono: 'Depto Servicios 3217537333, (606) 3419500', departamento: 'Caldas', ciudad: 'Anserma' },
    { id: 'cal-02', nombre: 'Arauca', direccion: 'Cra 3n°6a-18/ Piso 1 arauca caldas colombia ', administradora: 'Valencia Castro', telefono: '', departamento: 'Caldas', ciudad: 'Arauca' },
    { id: 'cal-03', nombre: 'Belalcazar', direccion: 'Cra 3 # 7-10', administradora: 'Paula Andrea Rodriguez Garcia', telefono: '', departamento: 'Caldas', ciudad: 'Belalcazar' },
    { id: 'cal-04', nombre: 'Chinchina', direccion: 'Calle 13 # 8-35', administradora: 'Blanca Cielo Vasco Salcedo', telefono: '3215716884', departamento: 'Caldas', ciudad: 'Chinchina' },
    { id: 'cal-05', nombre: 'Manizales', direccion: 'Calle 45 # 23-41 Parque Cristo Rey', administradora: 'Dahiana Lorena Gonzalez Vargas', telefono: '3206663993', departamento: 'Caldas', ciudad: 'Manizales' },
    { id: 'cal-06', nombre: 'Marmato', direccion: 'Salida a Marmato 23 (Antigua Inspeccion De Policia El Llano Marmato)', administradora: 'Luz Idalba Moreno Bolaños', telefono: '3228147207', departamento: 'Caldas', ciudad: 'Marmato' },
    { id: 'cal-07', nombre: 'Neira', direccion: 'Calle 8 # 10-18, Local 1', administradora: 'Jacinto Luís Gonzalez Lopez', telefono: '', departamento: 'Caldas', ciudad: 'Neira' },
    { id: 'cal-08', nombre: 'Pacora', direccion: 'Carrera 4 # 4-36 sector malpaso (enseguida de la oficina de efecty y/o al frente del hotel Paucura)', administradora: 'Diana María González García', telefono: '3228147221', departamento: 'Caldas', ciudad: 'Pacora' },
    { id: 'cal-09', nombre: 'Palestina', direccion: 'Calle 8 # 7-26 Centro', administradora: 'Yeraldine Martinez Pineda', telefono: '3128378788', departamento: 'Caldas', ciudad: 'Palestina' },
    { id: 'cal-10', nombre: 'Riosucio', direccion: 'Calle 6 # 7-21 Av El Cipres', administradora: 'Luz Adriana Patiño Palau', telefono: '3206920037', departamento: 'Caldas', ciudad: 'Riosucio' },
    { id: 'cal-11', nombre: 'Risaralda', direccion: 'Carrera 2 # 3-25 Centro', administradora: 'Luz María Villada Montoya', telefono: '3229446458', departamento: 'Caldas', ciudad: 'Risaralda' },
    { id: 'cal-12', nombre: 'Salamina', direccion: 'Calle 7 # 8 14 La Octava O El Refugio', administradora: 'Erika Lorena Garcia Carmona', telefono: '3229446455', departamento: 'Caldas', ciudad: 'Salamina' },
    { id: 'cal-13', nombre: 'San Lorenzo', direccion: '', administradora: 'Yulieth Emilse Bueno Bueno', telefono: '', departamento: 'Caldas', ciudad: 'San Lorenzo' },
    { id: 'cal-14', nombre: 'Supia', direccion: 'Carrera 6 # 33-38 Barrio La Pista', administradora: 'Luz Marina Bueno', telefono: '', departamento: 'Caldas', ciudad: 'Supia' },
    { id: 'cal-15', nombre: 'Viterbo', direccion: 'Calle 8 # 6-18', administradora: 'Jennifer Echeverry Giraldo', telefono: '3208276786', departamento: 'Caldas', ciudad: 'Viterbo' },
    { id: 'cal-16', nombre: 'La Dorada', direccion: 'CALLE 12 # 2-68 CENTRO', administradora: 'Viviana Galindo Triviño', telefono: '3164550991', departamento: 'Caldas', ciudad: 'La Dorada' },

  // ── ATLÁNTICO ─────────────────────────────────────────────────
    { id: 'at-01', nombre: 'Barranquilla', direccion: 'Calle 65b #38b-50 el recreo', administradora: 'Yoleidis Pino Urieles', telefono: '3105563288, 3059641', departamento: 'Atlántico', ciudad: 'Barranquilla' },
    { id: 'at-02', nombre: 'Soledad', direccion: 'Calle 65 carrera 9-40 Mall tu plaza local 105 - Soledad/Atlántico', administradora: 'Valentina Andrea Manjarres Cañate', telefono: '', departamento: 'Atlántico', ciudad: 'Soledad' },

  // ── BOYACÁ ────────────────────────────────────────────────────
    { id: 'boy-01', nombre: 'Puerto Boyacá', direccion: 'CARRERA 4 # 11-60 BARRIO CENTRO', administradora: 'Laura Julieth Rubiano Campos', telefono: '3147947963', departamento: 'Boyacá', ciudad: 'Puerto Boyacá' },

  // ── CHOCÓ ─────────────────────────────────────────────────────
    { id: 'ch-01', nombre: 'San José del Palmar', direccion: 'AV QUIBDO', administradora: 'VEGA LERMA JASMIN', telefono: '', departamento: 'Chocó', ciudad: 'San José del Palmar' },
];