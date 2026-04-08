/**
 * GUÍA DE INSTALACIÓN Y EJECUCIÓN
 * Jardines del Renacer - Plataforma Digital
 */

# Jardines del Renacer

Plataforma digital profesional para servicios funerarios con sistema de gestión integral.

## Instalación

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz:

```env
# Base de datos
DATABASE_URL="tu_conexion_a_base_de_datos"

# Autenticación
NEXTAUTH_SECRET="tu_secret_key"
NEXTAUTH_URL="http://localhost:3000"

# Pasarela de pagos Wompi (Florería)
NEXT_PUBLIC_WOMPI_PUBLIC_KEY="pub_test_o_pub_prod"
WOMPI_PRIVATE_KEY="prv_test_o_prv_prod"
WOMPI_INTEGRITY_SECRET="tu_integrity_secret"
# Opcional para forzar endpoint
# WOMPI_API_BASE_URL="https://sandbox.wompi.co/v1"

# Matterport (Recorrido 360)
MATTERPORT_SDK_KEY="tu_matterport_key"
```

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
src/
├── app/                    # Rutas Next.js
│   ├── page.tsx           # Home
│   ├── planes/            # Planes funerarios
│   ├── obituarios/        # Obituarios públicos
│   ├── recorrido-360/     # Tour virtual
│   ├── contacto/          # Formulario contacto
│   └── dashboard/         # Panel admin
│
├── components/
│   ├── ui/                # Componentes base
│   ├── layout/            # Navbar, Footer
│   ├── cards/             # PlanFlipCard, ObituaryCard
│   └── animations/        # FadeIn, AlliesMarquee
│
├── config/
│   ├── design-tokens.ts   # Colores, espaciados
│   ├── allies.ts          # Aliados del ecosistema
│   └── plans.ts           # Configuración de planes
│
├── types/                 # TypeScript types
├── lib/                   # Utilidades
└── styles/                # CSS global
```

## Características Principales

**Efecto Glass iOS** - En navbar, cards y componentes  
**Animaciones Framer Motion** - Transiciones suaves  
**Tarjetas 3D giratorias** - Planes con flip effect  
**Recorrido 360°** - Integración Matterport  
**Sistema de Obituarios** - Completo y emocional  
**Panel Administrativo** - Gestión centralizada  
**Responsive Design** - Mobile-first  
**TypeScript estricto** - Código seguro  

## Próximos Pasos

### Conectar Base de Datos

1. Instala Prisma:
```bash
npm install prisma @prisma/client
npx prisma init
```

2. Define tu schema en `prisma/schema.prisma`
3. Ejecuta migraciones:
```bash
npx prisma migrate dev
```

### Configurar Recorrido 360°

1. Obtén tu cuenta en [Matterport](https://matterport.com)
2. Crea tu tour virtual
3. Obtén el link de embed
4. Pégalo en `src/app/recorrido-360/page.tsx`

### Integrar Pasarela de Pagos

- Opciones: Stripe, PayU, Mercado Pago
- Implementar en `src/app/api/pagos/`

### Sistema de Autenticación

```bash
npm install next-auth
```

Configurar en `src/app/api/auth/[...nextauth]/`

## Assets Necesarios

Coloca en `public/`:

```
public/
├── images/
│   ├── hero-parque.jpg
│   ├── sala-360.jpg
│   └── obituarios/
│
├── plans/
│   ├── excellence.jpg
│   ├── premium.jpg
│   └── ...
│
└── allies/
    └── logos/
```

## Deployment

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Build de Producción

```bash
npm run build
npm start
```

## Desarrollado por

**Juan Monsalve**  
Plataforma Digital Jardines del Renacer  
Versión 1.0.0 - 2026

## Licencia

Todos los derechos reservados - Jardines del Renacer 2026

---

## 🆘 Soporte

Para dudas o soporte:
- Email: desarrollo@jardinesdelrenacer.com
- WhatsApp: +57 300 123 4567
# web_jardines_del_renacer_2026
