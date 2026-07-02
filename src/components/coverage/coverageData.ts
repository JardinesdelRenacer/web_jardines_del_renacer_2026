export interface Department {
  id: string;
  name: string;
  color: string;
  sedes: number;
  salas: number;
  ciudades: string[];
  sedeList?: {
    id: string;
    name: string;
    slug?: string;
    x: number;
    y: number;
    href?: string;
  }[];
  x: number;
  y: number;

  // Configuración de cámara
  translateX: number;
  translateY: number;
  scale: number;
}

export const coverageData: Department[] = [
  {
    id: "CO-ANT",
    name: "Antioquia",
    color: "#977660",
    sedes: 18,
    salas: 32,
    ciudades: ["Medellín", "Bello", "Rionegro"],
    sedeList: [
      { id: 'ant-med', name: 'Sede Medellín', slug: 'medellin', x: 30, y: 20, href: '/sedes/medellin' },
      { id: 'ant-bello', name: 'Sede Bello', slug: 'bello', x: 34, y: 18, href: '/sedes/bello' },
      { id: 'ant-rion', name: 'Sede Rionegro', slug: 'rionegro', x: 36, y: 22, href: '/sedes/rionegro' },
    ],
    x: 32,
    y: 22,
    translateX: 40,
    translateY: 35,
    scale: 1.45,
  },

  {
    id: "CO-ATL",
    name: "Atlántico",
    color: "#977660",
    sedes: 6,
    salas: 9,
    ciudades: ["Barranquilla"],
    sedeList: [
      { id: 'atl-bar', name: 'Sede Barranquilla', slug: 'barranquilla', x: 64, y: 10, href: '/sedes/barranquilla' }
    ],
    x: 64,
    y: 10,
    translateX: 15,
    translateY: 80,
    scale: 1.45,
  },

  {
    id: "CO-BOY",
    name: "Boyacá",
    color: "#977660",
    sedes: 5,
    salas: 8,
    ciudades: ["Tunja", "Duitama"],
    sedeList: [
      { id: 'boy-tun', name: 'Sede Tunja', slug: 'tunja', x: 56, y: 28, href: '/sedes/tunja' }
    ],
    x: 56,
    y: 28,
    translateX: -40,
    translateY: 25,
    scale: 1.45,
  },

  {
    id: "CO-CAL",
    name: "Caldas",
    color: "#977660",
    sedes: 7,
    salas: 12,
    ciudades: ["Manizales"],
    sedeList: [
      { id: 'cal-man', name: 'Sede Manizales', slug: 'manizales', x: 40, y: 34, href: '/sedes/manizales' }
    ],
    x: 40,
    y: 34,
    translateX: 20,
    translateY: 20,
    scale: 1.45,
  },

  {
    id: "CO-CAU",
    name: "Cauca",
    color: "#977660",
    sedes: 5,
    salas: 8,
    ciudades: ["Popayán"],
    sedeList: [
      { id: 'cau-pop', name: 'Sede Popayán', slug: 'popayan', x: 34, y: 48, href: '/sedes/popayan' }
    ],
    x: 34,
    y: 48,
    translateX: 30,
    translateY: -20,
    scale: 1.45,
  },

  {
    id: "CO-CHO",
    name: "Chocó",
    color: "#977660",
    sedes: 3,
    salas: 5,
    ciudades: ["Quibdó"],
    sedeList: [
      { id: 'cho-qui', name: 'Sede Quibdó', slug: 'quibdo', x: 18, y: 28, href: '/sedes/quibdo' }
    ],
    x: 18,
    y: 28,
    translateX: 75,
    translateY: 20,
    scale: 1.45,
  },

  {
    id: "CO-CUN",
    name: "Cundinamarca",
    color: "#977660",
    sedes: 10,
    salas: 18,
    ciudades: ["Bogotá", "Soacha"],
    sedeList: [
      { id: 'cun-bog', name: 'Sede Bogotá', slug: 'bogota', x: 53, y: 38, href: '/sedes/bogota' },
      { id: 'cun-soa', name: 'Sede Soacha', slug: 'soacha', x: 51, y: 36, href: '/sedes/soacha' }
    ],
    x: 53,
    y: 38,
    translateX: -45,
    translateY: 5,
    scale: 1.45,
  },

  {
    id: "CO-HUI",
    name: "Huila",
    color: "#977660",
    sedes: 6,
    salas: 9,
    ciudades: ["Neiva"],
    sedeList: [
      { id: 'hui-nei', name: 'Sede Neiva', slug: 'neiva', x: 48, y: 52, href: '/sedes/neiva' }
    ],
    x: 48,
    y: 52,
    translateX: -15,
    translateY: -35,
    scale: 1.45,
  },

  {
    id: "CO-PUT",
    name: "Putumayo",
    color: "#977660",
    sedes: 3,
    salas: 5,
    ciudades: ["Mocoa"],
    sedeList: [
      { id: 'put-moc', name: 'Sede Mocoa', slug: 'mocoa', x: 48, y: 68, href: '/sedes/mocoa' }
    ],
    x: 48,
    y: 68,
    translateX: -10,
    translateY: -80,
    scale: 1.55,
  },

  {
    id: "CO-QUI",
    name: "Quindío",
    color: "#977660",
    sedes: 6,
    salas: 8,
    ciudades: ["Armenia"],
    sedeList: [
      { id: 'qui-arm', name: 'Sede Armenia', slug: 'armenia', x: 38, y: 38, href: '/sedes/armenia' }
    ],
    x: 38,
    y: 38,
    translateX: 25,
    translateY: 5,
    scale: 1.55,
  },

  {
    id: "CO-RIS",
    name: "Risaralda",
    color: "#977660",
    sedes: 9,
    salas: 14,
    ciudades: ["Pereira", "Dosquebradas"],
    sedeList: [
      { id: 'ris-per', name: 'Sede Pereira', slug: 'pereira', x: 36, y: 36, href: '/sedes/pereira' }
    ],
    x: 36,
    y: 36,
    translateX: 30,
    translateY: 15,
    scale: 1.55,
  },

  {
    id: "CO-SAN",
    name: "Santander",
    color: "#977660",
    sedes: 8,
    salas: 11,
    ciudades: ["Bucaramanga"],
    sedeList: [
      { id: 'san-buc', name: 'Sede Bucaramanga', slug: 'bucaramanga', x: 60, y: 26, href: '/sedes/bucaramanga' }
    ],
    x: 60,
    y: 26,
    translateX: -70,
    translateY: 30,
    scale: 1.45,
  },

  {
    id: "CO-TOL",
    name: "Tolima",
    color: "#977660",
    sedes: 6,
    salas: 10,
    ciudades: ["Ibagué"],
    sedeList: [
      { id: 'tol-iba', name: 'Sede Ibagué', slug: 'ibague', x: 46, y: 42, href: '/sedes/ibague' }
    ],
    x: 46,
    y: 42,
    translateX: -15,
    translateY: -5,
    scale: 1.45,
  },

  {
    id: "CO-VAL",
    name: "Valle del Cauca",
    color: "#977660",
    sedes: 28,
    salas: 54,
    ciudades: ["Cali", "Palmira", "Cartago", "Zarzal", "Tuluá", "Buga"],
    sedeList: [
      { id: 'val-cali', name: 'Sede Cali', slug: 'cali', x: 30, y: 46, href: '/sedes/cali' },
      { id: 'val-palm', name: 'Sede Palmira', slug: 'palmira', x: 29, y: 44, href: '/sedes/palmira' }
    ],
    x: 30,
    y: 46,
    translateX: 50,
    translateY: -5,
    scale: 1.55,
  },
];
