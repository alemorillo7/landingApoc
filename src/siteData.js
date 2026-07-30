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
  "Benefit Gym",
  "Dental Quality",
  "RC Autopartes",
  "Realt IA",
];

export const differentiators = [
  {
    title: "Arquitectura desde el inicio",
    text: "Definimos estructura, integraciones y criterios técnicos antes de escalar el desarrollo.",
  },
  {
    title: "Seguridad y estabilidad real",
    text: "Construimos sistemas preparados para operar con menos fragilidad y mejor mantenimiento.",
  },
  {
    title: "Seguimiento profesional",
    text: "Trabajamos con procesos claros, demos visibles y comunicación constante durante todo el proyecto.",
  },
  {
    title: "Tecnologia conectada a negocio",
    text: "Cada decisión busca mejorar operación, productividad y capacidad de crecimiento.",
  },
];

export const caseStudies = [
  {
    id: "taller-german-lucero",
    client: "Taller Lucero",
    industry: "Automotriz / Chaperia - Argentina",
    image: "/taller-lucero.png",
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
    id: "revitalis",
    client: "Revitalis",
    industry: "Salud / Clínica Estética - Argentina",
    image: "/revitalis.jpeg",
    tags: ["Destacado", "Agente IA"],
    problem:
      "El equipo dedicaba demasiadas horas a responder consultas, explicar tratamientos y coordinar turnos entre distintas sedes.",
    solution:
      "Implementamos el agente IA Mateo en WhatsApp para resolver preguntas frecuentes, consultar agenda en tiempo real y derivar cada conversacion segun sede, tratamiento o necesidad.",
    result:
      "La operación comercial y de recepción quedó mucho más liviana, con menos carga manual y atención disponible durante todo el día.",
    impact:
      "Revitalis ganó capacidad de respuesta sin sumar más fricción interna, manteniendo una experiencia más consistente para pacientes y equipo.",
    metrics: ["-80% consultas manuales", "Agenda 24/7", "Multi-sede", "Derivacion a humano"],
    technologies: ["n8n", "WhatsApp Cloud API", "Supabase", "OpenAI GPT-4", "Chatwoot"],
    clientSummary:
      "Clínica estética con dos sedes y alto volumen de consultas que necesitaba escalar atención sin perder calidad de respuesta.",
  },
  {
    id: "maria-belen",
    client: "Maria Belen",
    industry: "Medicina Estética - Argentina",
    tags: ["Automatización", "Agente IA"],
    problem:
      "La gestion manual de consultas y turnos hacia perder tiempo y limitaba la conversión de interes en turnos confirmados.",
    solution:
      "Desarrollamos un sistema de atención automatizada para consultas, agendamiento de tratamientos, calificación de leads y derivación segun el tipo de tratamiento solicitado.",
    result:
      "La atención quedó operando de forma continua, sin gestion manual constante, y aumento la conversión de consultas a turnos confirmados.",
    metrics: ["Atención continua", "Leads calificados", "Agenda automatizada", "Mas turnos confirmados"],
    technologies: ["n8n", "WhatsApp API", "OpenAI", "Agenda integrada"],
    clientSummary:
      "Profesional de medicina estética que buscaba escalar atención y mejorar conversión sin sumar carga operativa.",
  },
  {
    id: "nukipet",
    client: "NukiPet",
    industry: "E-commerce / Mascotas - Peru",
    image: "/nukipet.jpeg",
    tags: ["Destacado", "Automatización"],
    problem:
      "El negocio operaba entre pedidos web, WhatsApp y logística nacional, con demasiadas validaciones manuales para cada compra.",
    solution:
      "Creamos el sistema multi-agente Mia en WhatsApp para clasificar pedidos, definir rutas segun destino, consultar agencias de Shalom e integrarse con WooCommerce.",
    result:
      "La operación pasó a resolver mejor cada pedido, con menos intervención manual y un flujo mucho más claro para ventas y despacho.",
    impact:
      "NukiPet pudo sostener una logística más amplia con mejor orden operativo y menos desgaste del equipo en tareas repetitivas.",
    metrics: ["499 agencias en RAG", "Cobertura nacional", "Pedidos clasificados", "Logistica inteligente"],
    technologies: ["n8n", "WhatsApp Cloud API", "WooCommerce", "RAG / Embeddings", "OpenAI", "Chatwoot"],
    clientSummary:
      "E-commerce peruano con envíos a múltiples zonas y necesidad de ordenar pedidos, consultas y logística en un mismo flujo.",
  },
  {
    id: "ansurance",
    client: "Ansurance",
    industry: "Seguros - Argentina",
    tags: ["Automatización", "Agente IA"],
    problem:
      "La captación y calificación de prospectos dependia de gestion manual, con poca velocidad de respuesta y orden comercial insuficiente.",
    solution:
      "Desarrollamos un agente de calificación y gestion de leads para captar prospectos, relevar datos del perfil asegurador y derivar automáticamente al asesor correcto.",
    result:
      "El pipeline quedó más organizado, las consultas reciben respuesta inmediata y mejoro la tasa de contacto efectivo.",
    metrics: ["Respuesta inmediata", "Leads mejor calificados", "Derivacion automática", "Pipeline ordenado"],
    technologies: ["n8n", "WhatsApp API", "CRM", "OpenAI"],
    clientSummary:
      "Empresa de seguros que necesitaba ordenar la entrada de leads y responder más rápido sin depender de filtros manuales.",
  },
  {
    id: "ramayo-propiedades",
    client: "Ramayo Propiedades",
    industry: "Inmobiliaria - Argentina",
    image: "/ramayo-crm.png",
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
    id: "dentalquality",
    client: "DentalQuality",
    industry: "Odontologia - Argentina",
    tags: ["Automatización", "Agente IA"],
    problem:
      "Las consultas de tratamientos, aranceles, turnos y recordatorios se gestionaban con demasiada intervención manual.",
    solution:
      "Implementamos un agente IA en WhatsApp para consultas, arancelario, agendamiento de turnos y recordatorios automáticos a pacientes.",
    result:
      "Bajaron las llamadas telefónicas, mejoro la adherencia a los turnos y se elevo la experiencia del paciente.",
    metrics: ["Menos llamadas", "Recordatorios automáticos", "Agenda por WhatsApp", "Mejor experiencia"],
    technologies: ["n8n", "WhatsApp API", "OpenAI", "Google Calendar / Agenda"],
    clientSummary:
      "Clínica odontologica que necesitaba automatizar atención y agenda sin perder orden operativo.",
  },
  {
    id: "cara-medicina-estética",
    client: "Cara Medicina Estética",
    industry: "Salud / Estética - Argentina",
    tags: ["Automatización", "Agente IA"],
    problem:
      "El negocio necesitaba mejorar captación, agendamiento y seguimiento post-consulta sin depender de gestion manual todo el tiempo.",
    solution:
      "Desarrollamos un sistema de atención automatizada por WhatsApp para informar procedimientos, captar pacientes, agendar y hacer seguimiento post-consulta.",
    result:
      "La tasa de agendamiento subió 22%, el ausentismo bajó 8% y la atención quedó disponible las 24 horas.",
    metrics: ["+22% agendamiento", "-8% ausentismo", "Atención 24 hs", "Seguimiento post-consulta"],
    technologies: ["n8n", "WhatsApp Cloud API", "OpenAI GPT-4", "Chatwoot", "Supabase"],
    clientSummary:
      "Centro estetico que necesitaba mejorar conversión, seguimiento y disponibilidad de atención.",
  },
  {
    id: "datahome-dani-bot",
    client: "DataHome",
    industry: "Real Estate / PropTech - Mexico",
    tags: ["Destacado", "Agente IA"],
    problem:
      "El equipo necesitaba calificar leads y agendar demos más rápido, con criterios consistentes y seguimiento automatizado.",
    solution:
      "Implementamos el bot DANI para calificación de leads y agendamiento de demos, integrado con GoHighLevel, PostgreSQL y flujos de seguimiento automático.",
    result:
      "La calificación pasó a ejecutarse automáticamente con criterios definidos, bajó el tiempo de respuesta comercial y crecieron las demos agendadas.",
    metrics: ["Mas demos agendadas", "Leads calificados", "GoHighLevel", "Seguimiento automatizado"],
    technologies: ["n8n", "GoHighLevel", "PostgreSQL", "WhatsApp API", "OpenAI"],
    clientSummary:
      "Empresa PropTech mexicana que necesitaba acelerar conversión comercial sin perder calidad en el filtrado.",
  },
  {
    id: "rrit-reclutamiento",
    client: "R&Rit",
    industry: "Recursos Humanos / HR Tech - Latam",
    tags: ["Automatización", "Agente IA"],
    problem:
      "El proceso de screening y recolección de datos de candidatos implicaba demasiado trabajo manual y poca estructura para el equipo.",
    solution:
      "Desarrollamos un agente IA de reclutamiento en n8n y Chatwoot para gestionar candidatos, salario, moneda, contratación, reubicación y seguimiento del proceso.",
    result:
      "El screening quedó automatizado, la información de candidatos se recopila de forma estructurada y bajó la carga operativa del equipo de RRHH.",
    metrics: ["Screening automatizado", "Datos estructurados", "Menos carga operativa", "Seguimiento del proceso"],
    technologies: ["n8n", "Chatwoot", "OpenAI", "WhatsApp API", "Formularios estructurados"],
    clientSummary:
      "Equipo de reclutamiento que necesitaba hacer más eficiente la evaluación inicial y la captura de información.",
  },
  {
    id: "benefit-gym",
    client: "Benefit Gym",
    industry: "Gimnasios / Acceso inteligente - Argentina",
    image: "/benefyt.png",
    tags: ["Automatización", "Software a medida"],
    problem:
      "El ingreso de socios y el control diario del gimnasio dependian de una gestion poco integrada y sin una solución propia conectada al acceso fisico.",
    solution:
      "Desarrollamos un sistema a medida con hardware integrado para validar identidad con DNI y abrir el acceso de forma automatizada.",
    result:
      "El acceso quedó más simple de operar, con validación automática y una base propia para administrar ingresos desde un sistema pensado para ese contexto.",
    impact:
      "Benefit Gym ganó autonomia sobre su operación y dejo de depender de un control manual para una parte critica de la experiencia del socio.",
    metrics: ["Acceso con DNI", "Hardware integrado", "Sistema a medida", "Operacion más ordenada"],
    technologies: ["React", "n8n", "Render", "Postgres"],
    clientSummary:
      "Gimnasio que necesitaba combinar software y hardware para profesionalizar el acceso y ordenar la operación diaria.",
  },
  {
    id: "global-medical-os",
    client: "360 Global Medical OS",
    industry: "Farmaceutico / Brokerage - Internacional",
    image: "/global-medical.jpeg",
    tags: ["Destacado", "Software a medida"],
    problem:
      "La operación del brokerage estaba repartida entre Excel, correo y seguimiento manual, sin una vista unificada del estado de cada orden.",
    solution:
      "Desarrollamos un CRM operativo con pipeline de ordenes, cotización asistida con IA, CommHub, auto-sourcing y trazabilidad completa sobre adjuntos y decisiones.",
    result:
      "La operación dejo de depender de herramientas sueltas y pasó a gestionarse con más visibilidad, orden y seguimiento de punta a punta.",
    impact:
      "360 Global Medical OS consolidó una base mucho más profesional para coordinar clientes, proveedores y decisiones comerciales en una operación internacional.",
    metrics: ["Operacion 360", "Cotizacion con IA", "Trazabilidad end-to-end", "Excel reemplazado"],
    technologies: ["Next.js", "Airtable", "n8n", "OpenAI GPT-4", "Email API"],
    clientSummary:
      "Brokerage farmaceutico internacional con muchas variables operativas y necesidad de centralizar una operación compleja.",
  },
  {
    id: "realt-ia",
    client: "Realt IA",
    industry: "Real Estate / Agente IA + CRM a medida - España",
    image: "/Realt ai.png",
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
    image: "/CONTROL-STOCK.png",
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
  "benefit-gym",
  "global-medical-os",
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
    image: "/eze-contrera.jpeg",
    role: "Socio Fundador & Referente de Automatización",
    detail:
      "Especialista en automatización, IA y optimizacion de procesos. Se asegura de que la tecnología realmente resuelva problemas de negocio de forma eficiente.",
  },
  {
    name: "Alejandro",
    initials: "AL",
    image: "/ale2.jpeg",
    role: "Socio Fundador & Referente de Arquitectura",
    detail:
      "Programador experto en sistemas escalables. Su enfoque principal es garantizar que cada pieza de codigo sea solida y segura desde el principio.",
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
  youtubeId: "6V-Wt7evlxA",
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
    company: "Revitalis",
    quote:
      "Automatizamos el agendamiento por WhatsApp en múltiples sedes, redujimos un 80% las consultas manuales y dejamos la atención disponible 24/7.",
    source: "Caso real - Revitalis",
    proof: "Ver caso",
    initials: "R",
    projectId: "revitalis",
  },
  {
    company: "NukiPet",
    quote:
      "La operación pasó a gestionar pedidos de forma autónoma, redujo consultas repetitivas y ganó cobertura nacional con derivación logística inteligente.",
    source: "Caso destacado - NukiPet",
    proof: "Ver caso",
    initials: "NP",
    projectId: "nukipet",
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
    company: "Benefit Gym",
    quote:
      "Implementamos un sistema a medida con hardware integrado para validar acceso con DNI y ordenar la operación del gimnasio sobre una base propia.",
    source: "Caso destacado - Benefit Gym",
    proof: "Ver caso",
    initials: "BG",
    projectId: "benefit-gym",
  },
  {
    company: "360 Global Medical OS",
    quote:
      "El sistema reemplazó procesos manuales dispersos, dio visibilidad 360 de cada operación y mejoro la coordinación internacional entre clientes y proveedores.",
    source: "Caso destacado - 360 Global Medical OS",
    proof: "Ver caso",
    initials: "36",
    projectId: "global-medical-os",
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
  whatsapp: "+54 9 351 809-0477",
  whatsappHref: "https://wa.me/5493518090477",
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
  return caseStudies.find((item) => item.id === id);
}
