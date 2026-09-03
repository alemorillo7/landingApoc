// Urgency banner configuration
// TODO: Replace fallback with real CRM endpoint when available
export const urgencyConfig = {
  maxSlots: 3,
  // Endpoint to fetch current project count for this month (returns { count: number })
  // endpoint: "https://apocrm-one.vercel.app/api/slots",
  endpoint: null, // Set to null to use fallback
  fallbackSlots: 3,
  minDisplay: 1, // Never show 0, always show at least 1
};

export const bfitTestimonial = {
  title: "Testimonio Beyond Fit",
  videoSrc: "/testimonio-bfit.mp4",
  client: "Beyond Fit",
  caption: "Escuchá directo de nuestra clienta cómo fue trabajar con APOC.",
};

export const heroStats = [
  {
    value: "32",
    label: "proyectos",
    detail: "Casos desarrollados en el ÚLTIMO año.",
  },
  {
    value: "6",
    label: "países y regiones",
    detail: "Argentina, Peru, Ecuador, Bolivia, Mexico y más operación remota.",
  },
  {
    value: "10+",
    label: "industrias",
    detail: "Salud, automotriz, real estate, e-commerce, seguros y más.",
  },
  {
    value: "24/7",
    label: "automatizados",
    detail: "Procesos, atención y seguimiento funcionando todo el día.",
  },
];

export const clientLogos = [
  "Taller Lucero",
  "Ramayo",
  "Beyond Fit",
  "RC Autopartes",
  "Realt IA",
];

export const differentiators = [
  {
    title: "Entendemos tu negocio",
    text: "Analizamos tus procesos y necesidades operativas reales antes de escribir una sola línea de código.",
  },
  {
    title: "Desarrollamos a medida",
    text: "Construimos la solución que realmente necesita tu empresa: ERP, CRM, automatización o agentes de IA.",
  },
  {
    title: "Acompañamos el crecimiento",
    text: "Tu empresa evoluciona y surgen nuevas necesidades. Contás con un equipo propio que sigue trabajando sobre el sistema.",
  },
  {
    title: "Seguridad y estabilidad real",
    text: "Construimos arquitectura sólida preparada para operar con menos fragilidad y mejor mantenimiento.",
  },
];

export const caseStudies = [
  {
    id: "taller-german-lucero",
    client: "Taller Lucero",
    industry: "Automotriz / Chaperia - Argentina",
    image: "/taller-lucero.webp",
    tags: ["Destacado", "Software a medida"],
    problem:
      "El taller trabajaba con procesos manuales en papel para presupuestos, seguimiento, finanzas y administración, lo que generaba demoras y poca trazabilidad.",
    solution:
      "Desarrollamos un sistema web de presupuestos digitales con gestion de clientes, vehiculos, operarios, historial, finanzas y panel administrador completo.",
    result:
      "Se eliminó el proceso manual en papel, los presupuestos se generan en segundos y el dueño ahora tiene acceso remoto con trazabilidad completa de cada trabajo.",
    metrics: ["0 papel", "Presupuestos en segundos", "Acceso remoto", "Trazabilidad total"],
    technologies: ["Next.js", "Base de datos en la nube", "Sistema de roles"],
    videoId: "i93Yyv8REjg",
    feedback:
      "Antes del sistema era todo muy manual, la verdad que nos ahorra muchísimo tiempo y podemos salir a hacer presupuestos en la calle. Es mucho más práctico y me aumento la capacidad de producción.",
    clientSummary:
      "Taller de chapa y pintura con trabajo operativo diario, necesidad de presupuestar más rápido y mejor control sobre cada vehiculo en curso.",
  },
  {
    id: "ramayo-propiedades",
    client: "Ramayo Propiedades",
    industry: "Inmobiliaria - Argentina",
    image: "/ramayo-crm.webp",
    tags: ["Destacado", "Agente IA"],
    problem:
      "Las consultas llegaban rápido, pero el equipo invertia demasiado tiempo filtrando interesados antes de poder avanzar con oportunidades reales.",
    solution:
      "Implementamos el bot RAMI en WhatsApp para mostrar propiedades, relevar datos clave, calificar leads e integrarlos con un CRM hecho a medida para una derivación comercial más ordenada.",
    result:
      "La entrada comercial quedó mucho mejor filtrada, el tiempo de respuesta bajó fuerte y el sistema participo en USD 70.000 de facturación durante el primer mes.",
    impact:
      "Ramayo pasó a dedicar más tiempo a cerrar oportunidades concretas y menos a responder consultas sin contexto ni prioridad.",
    metrics: ["USD 70.000 en 1 mes", "100% leads calificados", "CRM a medida", "Subworkflows dinámicos"],
    technologies: ["n8n", "WhatsApp Cloud API", "CRM a medida", "OpenAI", "Subworkflows dinámicos"],
    clientSummary:
      "Inmobiliaria con flujo constante de leads y necesidad de ordenar mejor la primera respuesta comercial.",
  },
  {
    id: "beyond-fit",
    client: "Beyond Fit",
    industry: "Gimnasios / Acceso inteligente - Argentina",
    image: "/benefyt.webp",
    tags: ["Automatización", "Software a medida"],
    problem:
      "El ingreso de socios y el control diario del gimnasio dependian de una gestion poco integrada y sin una solución propia conectada al acceso fisico.",
    solution:
      "Desarrollamos un sistema a medida con hardware integrado para validar identidad con DNI y abrir el acceso de forma automatizada.",
    result:
      "El acceso quedó más simple de operar, con validación automática y una base propia para administrar ingresos desde un sistema pensado para ese contexto.",
    impact:
      "Beyond Fit ganó autonomia sobre su operación y dejo de depender de un control manual para una parte critica de la experiencia del socio.",
    metrics: ["Acceso con DNI", "Hardware integrado", "Sistema a medida", "Operacion más ordenada"],
    technologies: ["React", "n8n", "Render", "Postgres"],
    clientSummary:
      "Gimnasio y centro de entrenamiento que necesitaba combinar software y hardware para profesionalizar el acceso y ordenar la operación diaria.",
  },
  {
    id: "realt-ia",
    client: "Realt IA",
    industry: "Real Estate / Agente IA + CRM a medida - España",
    image: "/Realt ai.webp",
    tags: ["Destacado", "Agente IA", "Software a medida"],
    problem:
      "La operación inmobiliaria necesitaba responder mejor, ordenar leads y trabajar sobre un sistema propio en lugar de depender de herramientas separadas.",
    solution:
      "Desarrollamos un agente de IA combinado con un CRM a medida para inmobiliarias, con vista de chats, etiquetas, pipeline y contactos, todo sincronizado en tiempo real con el agente dentro de un flujo propio.",
    result:
      "El negocio pasó a centralizar mejor la entrada comercial, responder con más consistencia y trabajar sobre una base mucho más alineada a su proceso real.",
    impact:
      "Realt IA consolidó una estructura más profesional para ventas inmobiliarias, combinando automatización de contacto con gestion comercial sobre software propio.",
    metrics: ["Chats en tiempo real", "Pipeline comercial", "Etiquetas y contactos", "CRM a medida"],
    technologies: ["TypeScript", "Firebase", "Vercel", "Postgres", "n8n"],
    clientSummary:
      "Proyecto para inmobiliarias en España que combina agente IA y CRM propio para ordenar captación, seguimiento y conversión.",
  },
  {
    id: "rc-autopartes",
    client: "RC Autopartes",
    industry: "Autopartes / Stock y venta interna - Argentina",
    image: "/CONTROL-STOCK.webp",
    tags: ["Destacado", "Software a medida"],
    problem:
      "La empresa necesitaba dejar atras el control disperso de stock, ventas internas y seguimiento administrativo para trabajar con una sola base confiable.",
    solution:
      "Desarrollamos un sistema integral para autopartes con control de stock, venta interna, gestion financiera y seguimiento comercial de vendedores dentro de una misma plataforma.",
    result:
      "La operación quedó mucho más ordenada, con inventario, ventas y administración conectados sobre un flujo más claro para el equipo.",
    impact:
      "RC Autopartes ganó una base más firme para gestionar crecimiento, controlar mejor el negocio y reducir errores por trabajo fragmentado.",
    metrics: ["Control de stock", "Venta interna", "Finanzas ordenadas", "Gestion de vendedores"],
    technologies: ["React + Vite", "Firebase", "Firestore"],
    clientSummary:
      "Empresa de autopartes con necesidad de integrar stock, ventas internas y gestion administrativa en un sistema propio.",
  },
];

export const featuredCaseStudyIds = [
  "taller-german-lucero",
  "ramayo-propiedades",
  "beyond-fit",
  "realt-ia",
  "rc-autopartes",
];

export const featuredCaseStudies = featuredCaseStudyIds
  .map((id) => caseStudies.find((item) => item.id === id))
  .filter(Boolean);

export const portfolioCaseStudies = [
  ...featuredCaseStudies,
  ...caseStudies.filter((item) => !featuredCaseStudyIds.includes(item.id)),
];

export const team = [
  {
    name: "Ezequiel",
    initials: "EZ",
    image: "/eze-contrera.webp",
    role: "Socio Fundador & Referente de Automatización",
    detail:
      "Especialista en automatización, IA y optimizacion de procesos. Se asegura de que la tecnología realmente resuelva problemas de negocio de forma eficiente.",
  },
  {
    name: "Alejandro",
    initials: "AL",
    image: "/ale2.webp",
    role: "Socio Fundador & Referente de Arquitectura",
    detail:
      "Programador experto en sistemas escalables. Su enfoque principal es garantizar que cada pieza de codigo sea solida y segura desde el principio.",
  },
  {
    name: "Elian",
    initials: "EL",
    image: "/elian.webp",
    role: "Encargado Comercial & Closer",
    detail:
      "Responsable de seguimiento comercial y cierre. Se encarga de que cada empresa reciba la atención y el acompañamiento que necesita para avanzar.",
  },
  {
    name: "Milagros",
    initials: "MI",
    role: "Referente de Marketing y Comunicación",
    detail:
      "Lidera la comunicación de marca, la estrategia comercial y la claridad del mensaje para conectar tecnología con negocio real.",
  },
  {
    name: "Florencia",
    initials: "FL",
    role: "Asistente Administrativa",
    detail:
      "Acompaña la organización interna, el seguimiento operativo y la coordinación administrativa para que cada proyecto avance con orden y continuidad.",
  },
];

export const expertise = [
  "Backend",
  "Frontend",
  "Arquitectura",
  "Automatización",
  "IA aplicada",
  "Cloud",
];

export const methodology = [
  {
    step: "01",
    title: "Discovery",
    text: "Entendemos negocio, riesgos, procesos criticos y alcance real.",
    deliverable: "Mapa de procesos, objetivos y prioridades.",
  },
  {
    step: "02",
    title: "Arquitectura",
    text: "Diseñamos estructura, integraciones, seguridad y escalabilidad desde la base.",
    deliverable: "Blueprint técnico y decisiones clave.",
  },
  {
    step: "03",
    title: "Diseño",
    text: "Definimos experiencia, interfaces y flujos con criterio operativo.",
    deliverable: "UX/UI funcional y validada.",
  },
  {
    step: "04",
    title: "Desarrollo",
    text: "Construimos por bloques entregables, con demos y feedback corto.",
    deliverable: "Versiones iterativas y visibles.",
  },
  {
    step: "05",
    title: "Testing",
    text: "Probamos casos borde, performance y estabilidad antes de exponer el sistema.",
    deliverable: "Checklist de validación y QA.",
  },
  {
    step: "06",
    title: "Deploy",
    text: "Publicamos con control, observabilidad y configuración segura.",
    deliverable: "Release productiva y monitoreada.",
  },
  {
    step: "07",
    title: "Soporte",
    text: "Acompañamos adopción, mejoras y continuidad operativa.",
    deliverable: "Seguimiento, soporte y evolución.",
  },
];

export const videoTestimonial = {
  title: "Testimonio real",
  youtubeId: "6S5O2tUIz-E",
  caption: "",
};

export const heroVideo = {
  title: "Vista general",
  youtubeId: "Vz8AqAMCuQs",
  badge: "apoc automation",
  heading: "Soluciones pensadas para durar, integrarse bien y sostener el crecimiento.",
  description:
    "Este video resume el tipo de criterio con el que diseñamos agentes de IA, automatizaciones y software a medida para operaciones reales.",
};

export const testimonials = [
  {
    company: "Taller Lucero",
    quote:
      "Antes del sistema era todo muy manual, la verdad que nos ahorra muchísimo tiempo y podemos salir a hacer presupuestos en la calle. Es mucho más práctico y me aumento la capacidad de producción.",
    source: "Dueño - Taller German Lucero",
    proof: "Ver proyecto",
    initials: "GL",
    projectId: "taller-german-lucero",
    videoId: "i93Yyv8REjg",
  },
  {
    company: "Ramayo Propiedades",
    quote:
      "El bot pasó a calificar el 100% de los leads entrantes, bajó el tiempo de respuesta y ayudó a impactar en USD 70.000 de facturación en el primer mes.",
    source: "Caso real - Ramayo Propiedades",
    proof: "Ver caso",
    initials: "RP",
    projectId: "ramayo-propiedades",
  },
  {
    company: "Beyond Fit",
    quote:
      "El sistema nos ordenó el ingreso de socios con DNI y dejó toda la administración de cuotas y accesos automatizada en una plataforma propia.",
    source: "Caso real - Beyond Fit",
    proof: "Ver caso",
    initials: "BF",
    projectId: "beyond-fit",
  },
  {
    company: "Realt IA",
    quote:
      "Centralizamos la entrada comercial de leads inmobiliarios sincronizados en tiempo real con el agente de IA dentro de nuestro CRM propio.",
    source: "Caso real - Realt IA (España)",
    proof: "Ver caso",
    initials: "RI",
    projectId: "realt-ia",
  },
  {
    company: "RC Autopartes",
    quote:
      "Integramos el inventario de stock, ventas internas y gestión de vendedores en una sola base confiable que agilizó toda la administración.",
    source: "Caso real - RC Autopartes",
    proof: "Ver caso",
    initials: "RC",
    projectId: "rc-autopartes",
  },
];

export const featuredTestimonials = featuredCaseStudyIds
  .map((id) => testimonials.find((item) => item.projectId === id))
  .filter(Boolean);

export const challengeOptions = [
  {
    label: "Pierdo tiempo",
    solution: "Diseñamos procesos y automatizaciones para quitar fricción sin romper tu operación actual.",
  },
  {
    label: "Uso Excel",
    solution: "Migramos procesos criticos a software estable, trazable y mantenible, sin depender de archivos manuales.",
  },
  {
    label: "Mi negocio no escala",
    solution: "Reordenamos arquitectura, flujo y visibilidad para que crecer no implique caos operativo.",
  },
  {
    label: "Tengo procesos manuales",
    solution: "Automatizamos handoffs, aprobaciones y tareas repetitivas con control y monitoreo.",
  },
  {
    label: "Mi sistema actual falla",
    solution: "Auditamos el problema de base y reconstruimos la parte critica con foco en estabilidad.",
  },
  {
    label: "No tengo metricas",
    solution: "Creamos dashboards ejecutivos y tableros operativos para decidir con datos, no intuición.",
  },
  {
    label: "Mi equipo pierde productividad",
    solution: "Alineamos roles, interfaces y herramientas para que el equipo trabaje con menos ruido y más control.",
  },
];

export const commercialOptions = [
  {
    id: "apoc-flex",
    name: "APOC Flex",
    tagline: "Desarrollá hoy. Pagá en el tiempo. El sistema termina siendo tuyo.",
    model: "Financiación para software propio",
    summary:
      "Ideal si querés construir un sistema propio, pero prefieres pagar en cuotas sin frenar el desarrollo.",
    payment: "20% anticipo + cuotas",
    ownership: "Al finalizar el contrato",
    items: [
      "Anticipo del 20% para iniciar el proyecto.",
      "El 80% restante se financia según el plan acordado.",
      "El desarrollo comienza inmediatamente.",
      "Aunque el proyecto finalice antes, las cuotas continúan hasta finalizar el contrato.",
      "Al cancelar el 100% del contrato, el cliente recibe el código fuente y la titularidad acordada del software.",
    ],
    terms: [
      {
        value: "12 meses",
      },
      {
        value: "18 meses",
      },
      {
        value: "24 meses",
      },
    ],
    includes: [
      "Desarrollo",
      "Implementación",
      "Soporte",
      "Corrección de errores",
      "Hosting (si corresponde)",
      "Backups",
      "Capacitación",
    ],
  },
  {
    id: "desarrollo-tradicional",
    name: "Desarrollo tradicional",
    tagline: "Comprás el proyecto.",
    model: "Proyecto cerrado por hitos",
    summary:
      "Ideal si querés adquirir un software completo, con pago por entregables definidos y código fuente al finalizar.",
    payment: "Por hitos",
    ownership: "Al finalizar el proyecto",
    items: [
      "Pago por hitos acordados.",
      "Entrega del sistema terminado.",
      "Entrega del código fuente al finalizar.",
      "Mantenimiento opcional.",
    ],
    terms: [],
    includes: [
      "Desarrollo",
      "Implementación",
      "Entregables por hito",
      "Código fuente al finalizar",
      "Mantenimiento opcional",
    ],
  },
  {
    id: "partner-tecnologico",
    name: "Partner tecnológico",
    tagline: "No contratás un software. Incorporás un departamento de tecnología.",
    model: "Evolución continua mensual",
    summary:
      "Ideal si tu empresa necesita evolución permanente y una estructura de tecnología al servicio del negocio.",
    payment: "Mensual",
    ownership: "Según el contrato vigente",
    items: [
      "Servicio mensual de evolución continua.",
      "Desarrollo de nuevas funcionalidades según prioridades del negocio.",
      "Puede incluir ERP, CRM, IA, automatizaciones, dashboards, apps, sitios web, integraciones y consultoría.",
    ],
    terms: [],
    includes: [
      "Planificación mensual",
      "Nuevos desarrollos",
      "Integraciones",
      "Consultoría",
      "Soporte acorde al plan",
      "Evolución continua",
    ],
  },
];

export const commercialCompare = [
  {
    key: "Modelo",
    flex: "APOC Flex",
    traditional: "Tradicional",
    partner: "Partner",
  },
  {
    key: "Ideal para",
    flex: "Financiar un software propio",
    traditional: "Comprar un proyecto",
    partner: "Evolución permanente",
  },
  {
    key: "Propiedad",
    flex: "Al finalizar el contrato",
    traditional: "Al finalizar el proyecto",
    partner: "Según contrato",
  },
  {
    key: "Pago",
    flex: "20% + cuotas",
    traditional: "Por hitos",
    partner: "Mensual",
  },
];

export const contactInfo = {
  whatsapp: "+54 9 351 357-7327",
  whatsappHref: "https://wa.me/5493513577327",
  phone: "+54 9 3572 526971",
  phoneHref: "tel:5493572526971",
  instagramHref: "https://www.instagram.com/apoc.automation/",
  linkedinHref: "https://linkedin.com/company/109078079/",
  email: "apoc@apocautomation.site",
  emailHref: "mailto:apoc@apocautomation.site",
};

export const socialLinks = [
  { label: "WhatsApp", href: contactInfo.whatsappHref },
  { label: "Instagram", href: contactInfo.instagramHref },
  { label: "LinkedIn", href: contactInfo.linkedinHref },
  { label: "Email", href: contactInfo.emailHref },
];

export const seoConfig = {
  siteName: "APOC Automation",
  baseTitle: "APOC Automation | Software seguro, escalable y estable",
  baseDescription:
    "APOC Automation desarrolla automatización, agentes IA y software a medida para empresas de Argentina, Peru, Ecuador, Bolivia y Mexico, con foco en problemas reales y resultados concretos.",
  baseUrl: "https://apocautomation.site",
};

export function getCaseStudyById(id) {
  if (!id) return null;
  const decoded = decodeURIComponent(id);
  const normalize = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  return caseStudies.find(
    (item) =>
      item.id === id ||
      item.id === decoded ||
      normalize(item.id) === normalize(decoded)
  );
}
