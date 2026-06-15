export const heroStats = [
  {
    value: "16+",
    label: "proyectos",
    detail: "Casos desarrollados en los ultimos 4 meses.",
  },
  {
    value: "6",
    label: "paises y regiones",
    detail: "Argentina, Peru, Ecuador, Bolivia, Mexico y mas operacion remota.",
  },
  {
    value: "10+",
    label: "industrias",
    detail: "Salud, automotriz, real estate, e-commerce, seguros y mas.",
  },
  {
    value: "24/7",
    label: "automatizados",
    detail: "Procesos, atencion y seguimiento funcionando todo el dia.",
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
    text: "Definimos estructura, integraciones y criterios tecnicos antes de escalar el desarrollo.",
  },
  {
    title: "Seguridad y estabilidad real",
    text: "Construimos sistemas preparados para operar con menos fragilidad y mejor mantenimiento.",
  },
  {
    title: "Seguimiento profesional",
    text: "Trabajamos con procesos claros, demos visibles y comunicacion constante durante todo el proyecto.",
  },
  {
    title: "Tecnologia conectada a negocio",
    text: "Cada decision busca mejorar operacion, productividad y capacidad de crecimiento.",
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
      "El taller trabajaba con procesos manuales en papel para presupuestos, seguimiento, finanzas y administracion, lo que generaba demoras y poca trazabilidad.",
    solution:
      "Desarrollamos un sistema web de presupuestos digitales con gestion de clientes, vehiculos, operarios, historial, finanzas y panel administrador completo.",
    result:
      "Se elimino el proceso manual en papel, los presupuestos se generan en segundos y el duenio ahora tiene acceso remoto con trazabilidad completa de cada trabajo.",
    metrics: ["0 papel", "Presupuestos en segundos", "Acceso remoto", "Trazabilidad total"],
    technologies: ["Next.js", "Netlify", "Base de datos en la nube", "Sistema de roles"],
    videoId: "i93Yyv8REjg",
    feedback:
      "Antes del sistema era todo muy manual, la verdad que nos ahorra muchisimo tiempo y podemos salir a hacer presupuestos en la calle. Es mucho mas practico y me aumento la capacidad de produccion.",
    clientSummary:
      "Taller de chapa y pintura con trabajo operativo diario, necesidad de presupuestar mas rapido y mejor control sobre cada vehiculo en curso.",
  },
  {
    id: "revitalis",
    client: "Revitalis",
    industry: "Salud / Clinica Estetica - Argentina",
    image: "/revitalis.jpeg",
    tags: ["Destacado", "Agente IA"],
    problem:
      "El equipo dedicaba demasiadas horas a responder consultas, explicar tratamientos y coordinar turnos entre distintas sedes.",
    solution:
      "Implementamos el agente IA Mateo en WhatsApp para resolver preguntas frecuentes, consultar agenda en tiempo real y derivar cada conversacion segun sede, tratamiento o necesidad.",
    result:
      "La operacion comercial y de recepcion quedo mucho mas liviana, con menos carga manual y atencion disponible durante todo el dia.",
    impact:
      "Revitalis gano capacidad de respuesta sin sumar mas friccion interna, manteniendo una experiencia mas consistente para pacientes y equipo.",
    metrics: ["-80% consultas manuales", "Agenda 24/7", "Multi-sede", "Derivacion a humano"],
    technologies: ["n8n", "WhatsApp Cloud API", "Supabase", "OpenAI GPT-4", "Chatwoot"],
    clientSummary:
      "Clinica estetica con dos sedes y alto volumen de consultas que necesitaba escalar atencion sin perder calidad de respuesta.",
  },
  {
    id: "maria-belen",
    client: "Maria Belen",
    industry: "Medicina Estetica - Argentina",
    tags: ["Automatizacion", "Agente IA"],
    problem:
      "La gestion manual de consultas y turnos hacia perder tiempo y limitaba la conversion de interes en turnos confirmados.",
    solution:
      "Desarrollamos un sistema de atencion automatizada para consultas, agendamiento de tratamientos, calificacion de leads y derivacion segun el tipo de tratamiento solicitado.",
    result:
      "La atencion quedo operando de forma continua, sin gestion manual constante, y aumento la conversion de consultas a turnos confirmados.",
    metrics: ["Atencion continua", "Leads calificados", "Agenda automatizada", "Mas turnos confirmados"],
    technologies: ["n8n", "WhatsApp API", "OpenAI", "Agenda integrada"],
    clientSummary:
      "Profesional de medicina estetica que buscaba escalar atencion y mejorar conversion sin sumar carga operativa.",
  },
  {
    id: "nukipet",
    client: "NukiPet",
    industry: "E-commerce / Mascotas - Peru",
    image: "/nukipet.jpeg",
    tags: ["Destacado", "Automatizacion"],
    problem:
      "El negocio operaba entre pedidos web, WhatsApp y logistica nacional, con demasiadas validaciones manuales para cada compra.",
    solution:
      "Creamos el sistema multi-agente Mia en WhatsApp para clasificar pedidos, definir rutas segun destino, consultar agencias de Shalom e integrarse con WooCommerce.",
    result:
      "La operacion paso a resolver mejor cada pedido, con menos intervencion manual y un flujo mucho mas claro para ventas y despacho.",
    impact:
      "NukiPet pudo sostener una logistica mas amplia con mejor orden operativo y menos desgaste del equipo en tareas repetitivas.",
    metrics: ["499 agencias en RAG", "Cobertura nacional", "Pedidos clasificados", "Logistica inteligente"],
    technologies: ["n8n", "WhatsApp Cloud API", "WooCommerce", "RAG / Embeddings", "OpenAI", "Chatwoot"],
    clientSummary:
      "E-commerce peruano con envios a multiples zonas y necesidad de ordenar pedidos, consultas y logistica en un mismo flujo.",
  },
  {
    id: "ansurance",
    client: "Ansurance",
    industry: "Seguros - Argentina",
    tags: ["Automatizacion", "Agente IA"],
    problem:
      "La captacion y calificacion de prospectos dependia de gestion manual, con poca velocidad de respuesta y orden comercial insuficiente.",
    solution:
      "Desarrollamos un agente de calificacion y gestion de leads para captar prospectos, relevar datos del perfil asegurador y derivar automaticamente al asesor correcto.",
    result:
      "El pipeline quedo mas organizado, las consultas reciben respuesta inmediata y mejoro la tasa de contacto efectivo.",
    metrics: ["Respuesta inmediata", "Leads mejor calificados", "Derivacion automatica", "Pipeline ordenado"],
    technologies: ["n8n", "WhatsApp API", "CRM", "OpenAI"],
    clientSummary:
      "Empresa de seguros que necesitaba ordenar la entrada de leads y responder mas rapido sin depender de filtros manuales.",
  },
  {
    id: "ramayo-propiedades",
    client: "Ramayo Propiedades",
    industry: "Inmobiliaria - Argentina",
    image: "/ramayo-crm.png",
    tags: ["Destacado", "Agente IA"],
    problem:
      "Las consultas llegaban rapido, pero el equipo invertia demasiado tiempo filtrando interesados antes de poder avanzar con oportunidades reales.",
    solution:
      "Implementamos el bot RAMI en WhatsApp para mostrar propiedades, relevar datos clave, calificar leads e integrarlos con un CRM hecho a medida para una derivacion comercial mas ordenada.",
    result:
      "La entrada comercial quedo mucho mejor filtrada, el tiempo de respuesta bajo fuerte y el sistema participo en USD 70.000 de facturacion durante el primer mes.",
    impact:
      "Ramayo paso a dedicar mas tiempo a cerrar oportunidades concretas y menos a responder consultas sin contexto ni prioridad.",
    metrics: ["USD 70.000 en 1 mes", "100% leads calificados", "CRM a medida", "Subworkflows dinamicos"],
    technologies: ["n8n", "WhatsApp Cloud API", "CRM a medida", "OpenAI", "Subworkflows dinamicos"],
    clientSummary:
      "Inmobiliaria con flujo constante de leads y necesidad de ordenar mejor la primera respuesta comercial.",
  },
  {
    id: "dentalquality",
    client: "DentalQuality",
    industry: "Odontologia - Argentina",
    tags: ["Automatizacion", "Agente IA"],
    problem:
      "Las consultas de tratamientos, aranceles, turnos y recordatorios se gestionaban con demasiada intervencion manual.",
    solution:
      "Implementamos un agente IA en WhatsApp para consultas, arancelario, agendamiento de turnos y recordatorios automaticos a pacientes.",
    result:
      "Bajaron las llamadas telefonicas, mejoro la adherencia a los turnos y se elevo la experiencia del paciente.",
    metrics: ["Menos llamadas", "Recordatorios automaticos", "Agenda por WhatsApp", "Mejor experiencia"],
    technologies: ["n8n", "WhatsApp API", "OpenAI", "Google Calendar / Agenda"],
    clientSummary:
      "Clinica odontologica que necesitaba automatizar atencion y agenda sin perder orden operativo.",
  },
  {
    id: "cara-medicina-estetica",
    client: "Cara Medicina Estetica",
    industry: "Salud / Estetica - Argentina",
    tags: ["Automatizacion", "Agente IA"],
    problem:
      "El negocio necesitaba mejorar captacion, agendamiento y seguimiento post-consulta sin depender de gestion manual todo el tiempo.",
    solution:
      "Desarrollamos un sistema de atencion automatizada por WhatsApp para informar procedimientos, captar pacientes, agendar y hacer seguimiento post-consulta.",
    result:
      "La tasa de agendamiento subio 22%, el ausentismo bajo 8% y la atencion quedo disponible las 24 horas.",
    metrics: ["+22% agendamiento", "-8% ausentismo", "Atencion 24 hs", "Seguimiento post-consulta"],
    technologies: ["n8n", "WhatsApp Cloud API", "OpenAI GPT-4", "Chatwoot", "Supabase"],
    clientSummary:
      "Centro estetico que necesitaba mejorar conversion, seguimiento y disponibilidad de atencion.",
  },
  {
    id: "datahome-dani-bot",
    client: "DataHome",
    industry: "Real Estate / PropTech - Mexico",
    tags: ["Destacado", "Agente IA"],
    problem:
      "El equipo necesitaba calificar leads y agendar demos mas rapido, con criterios consistentes y seguimiento automatizado.",
    solution:
      "Implementamos el bot DANI para calificacion de leads y agendamiento de demos, integrado con GoHighLevel, PostgreSQL y flujos de seguimiento automatico.",
    result:
      "La calificacion paso a ejecutarse automaticamente con criterios definidos, bajo el tiempo de respuesta comercial y crecieron las demos agendadas.",
    metrics: ["Mas demos agendadas", "Leads calificados", "GoHighLevel", "Seguimiento automatizado"],
    technologies: ["n8n", "GoHighLevel", "PostgreSQL", "WhatsApp API", "OpenAI"],
    clientSummary:
      "Empresa PropTech mexicana que necesitaba acelerar conversion comercial sin perder calidad en el filtrado.",
  },
  {
    id: "rrit-reclutamiento",
    client: "R&Rit",
    industry: "Recursos Humanos / HR Tech - Latam",
    tags: ["Automatizacion", "Agente IA"],
    problem:
      "El proceso de screening y recoleccion de datos de candidatos implicaba demasiado trabajo manual y poca estructura para el equipo.",
    solution:
      "Desarrollamos un agente IA de reclutamiento en n8n y Chatwoot para gestionar candidatos, salario, moneda, contratacion, reubicacion y seguimiento del proceso.",
    result:
      "El screening quedo automatizado, la informacion de candidatos se recopila de forma estructurada y bajo la carga operativa del equipo de RRHH.",
    metrics: ["Screening automatizado", "Datos estructurados", "Menos carga operativa", "Seguimiento del proceso"],
    technologies: ["n8n", "Chatwoot", "OpenAI", "WhatsApp API", "Formularios estructurados"],
    clientSummary:
      "Equipo de reclutamiento que necesitaba hacer mas eficiente la evaluacion inicial y la captura de informacion.",
  },
  {
    id: "benefit-gym",
    client: "Benefit Gym",
    industry: "Gimnasios / Acceso inteligente - Argentina",
    image: "/benefyt.png",
    tags: ["Automatizacion", "Software a medida"],
    problem:
      "El ingreso de socios y el control diario del gimnasio dependian de una gestion poco integrada y sin una solucion propia conectada al acceso fisico.",
    solution:
      "Desarrollamos un sistema a medida con hardware integrado para validar identidad con DNI y abrir el acceso de forma automatizada.",
    result:
      "El acceso quedo mas simple de operar, con validacion automatica y una base propia para administrar ingresos desde un sistema pensado para ese contexto.",
    impact:
      "Benefit Gym gano autonomia sobre su operacion y dejo de depender de un control manual para una parte critica de la experiencia del socio.",
    metrics: ["Acceso con DNI", "Hardware integrado", "Sistema a medida", "Operacion mas ordenada"],
    technologies: ["React", "n8n", "Render", "Postgres"],
    clientSummary:
      "Gimnasio que necesitaba combinar software y hardware para profesionalizar el acceso y ordenar la operacion diaria.",
  },
  {
    id: "global-medical-os",
    client: "360 Global Medical OS",
    industry: "Farmaceutico / Brokerage - Internacional",
    image: "/global-medical.jpeg",
    tags: ["Destacado", "Software a medida"],
    problem:
      "La operacion del brokerage estaba repartida entre Excel, correo y seguimiento manual, sin una vista unificada del estado de cada orden.",
    solution:
      "Desarrollamos un CRM operativo con pipeline de ordenes, cotizacion asistida con IA, CommHub, auto-sourcing y trazabilidad completa sobre adjuntos y decisiones.",
    result:
      "La operacion dejo de depender de herramientas sueltas y paso a gestionarse con mas visibilidad, orden y seguimiento de punta a punta.",
    impact:
      "360 Global Medical OS consolido una base mucho mas profesional para coordinar clientes, proveedores y decisiones comerciales en una operacion internacional.",
    metrics: ["Operacion 360", "Cotizacion con IA", "Trazabilidad end-to-end", "Excel reemplazado"],
    technologies: ["Next.js", "Netlify", "Airtable", "n8n", "OpenAI GPT-4", "Email API"],
    clientSummary:
      "Brokerage farmaceutico internacional con muchas variables operativas y necesidad de centralizar una operacion compleja.",
  },
  {
    id: "realt-ia",
    client: "Realt IA",
    industry: "Real Estate / Agente IA + CRM a medida - España",
    image: "/Realt ai.png",
    tags: ["Destacado", "Agente IA", "Software a medida"],
    problem:
      "La operacion inmobiliaria necesitaba responder mejor, ordenar leads y trabajar sobre un sistema propio en lugar de depender de herramientas separadas.",
    solution:
      "Desarrollamos un agente de IA combinado con un CRM a medida para inmobiliarias, con vista de chats, etiquetas, pipeline y contactos, todo sincronizado en tiempo real con el agente dentro de un flujo propio.",
    result:
      "El negocio paso a centralizar mejor la entrada comercial, responder con mas consistencia y trabajar sobre una base mucho mas alineada a su proceso real.",
    impact:
      "Realt IA consolido una estructura mas profesional para ventas inmobiliarias, combinando automatizacion de contacto con gestion comercial sobre software propio.",
    metrics: ["Chats en tiempo real", "Pipeline comercial", "Etiquetas y contactos", "CRM a medida"],
    technologies: ["TypeScript", "Firebase", "Vercel", "Postgres", "n8n"],
    clientSummary:
      "Proyecto para inmobiliarias en España que combina agente IA y CRM propio para ordenar captacion, seguimiento y conversion.",
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
      "La operacion quedo mucho mas ordenada, con inventario, ventas y administracion conectados sobre un flujo mas claro para el equipo.",
    impact:
      "RC Autopartes gano una base mas firme para gestionar crecimiento, controlar mejor el negocio y reducir errores por trabajo fragmentado.",
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
    role: "Socio Fundador & Referente de Automatizacion",
    detail:
      "Especialista en automatizacion, IA y optimizacion de procesos. Se asegura de que la tecnologia realmente resuelva problemas de negocio de forma eficiente.",
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
    role: "Referente de Marketing y Comunicacion",
    detail:
      "Lidera la comunicacion de marca, la estrategia comercial y la claridad del mensaje para conectar tecnologia con negocio real.",
  },
  {
    name: "Florencia",
    initials: "FL",
    role: "Asistente Administrativa",
    detail:
      "Acompaña la organizacion interna, el seguimiento operativo y la coordinacion administrativa para que cada proyecto avance con orden y continuidad.",
  },
];

export const expertise = [
  "Backend",
  "Frontend",
  "Arquitectura",
  "Automatizacion",
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
    deliverable: "Blueprint tecnico y decisiones clave.",
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
    deliverable: "Checklist de validacion y QA.",
  },
  {
    step: "06",
    title: "Deploy",
    text: "Publicamos con control, observabilidad y configuracion segura.",
    deliverable: "Release productiva y monitoreada.",
  },
  {
    step: "07",
    title: "Soporte",
    text: "Acompañamos adopcion, mejoras y continuidad operativa.",
    deliverable: "Seguimiento, soporte y evolucion.",
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
      "Antes del sistema era todo muy manual, la verdad que nos ahorra muchisimo tiempo y podemos salir a hacer presupuestos en la calle. Es mucho mas practico y me aumento la capacidad de produccion.",
    source: "Dueño - Taller German Lucero",
    proof: "Ver proyecto",
    initials: "GL",
    projectId: "taller-german-lucero",
    videoId: "i93Yyv8REjg",
  },
  {
    company: "Revitalis",
    quote:
      "Automatizamos el agendamiento por WhatsApp en multiples sedes, redujimos un 80% las consultas manuales y dejamos la atencion disponible 24/7.",
    source: "Caso real - Revitalis",
    proof: "Ver caso",
    initials: "R",
    projectId: "revitalis",
  },
  {
    company: "NukiPet",
    quote:
      "La operacion paso a gestionar pedidos de forma autonoma, redujo consultas repetitivas y gano cobertura nacional con derivacion logistica inteligente.",
    source: "Caso destacado - NukiPet",
    proof: "Ver caso",
    initials: "NP",
    projectId: "nukipet",
  },
  {
    company: "Ramayo Propiedades",
    quote:
      "El bot paso a calificar el 100% de los leads entrantes, bajo el tiempo de respuesta y ayudo a impactar en USD 70.000 de facturacion en el primer mes.",
    source: "Caso real - Ramayo Propiedades",
    proof: "Ver caso",
    initials: "RP",
    projectId: "ramayo-propiedades",
  },
  {
    company: "Benefit Gym",
    quote:
      "Implementamos un sistema a medida con hardware integrado para validar acceso con DNI y ordenar la operacion del gimnasio sobre una base propia.",
    source: "Caso destacado - Benefit Gym",
    proof: "Ver caso",
    initials: "BG",
    projectId: "benefit-gym",
  },
  {
    company: "360 Global Medical OS",
    quote:
      "El sistema reemplazo procesos manuales dispersos, dio visibilidad 360 de cada operacion y mejoro la coordinacion internacional entre clientes y proveedores.",
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
    solution: "Diseñamos procesos y automatizaciones para quitar friccion sin romper tu operacion actual.",
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
    solution: "Creamos dashboards ejecutivos y tableros operativos para decidir con datos, no intuicion.",
  },
  {
    label: "Mi equipo pierde productividad",
    solution: "Alineamos roles, interfaces y herramientas para que el equipo trabaje con menos ruido y mas control.",
  },
];

export const aiPlans = [
  {
    name: "Plan Basico",
    price: "desde USD 200",
    description:
      "Un agente de IA que atiende a tus clientes de forma automatica, las 24 horas.",
    features: [
      "Disponible en WhatsApp o en tu sitio web, a eleccion",
      "Mantiene conversaciones naturales y con contexto",
      "Responde consultas frecuentes de tu negocio",
      "Deriva a tu equipo cuando hace falta atencion personalizada",
    ],
  },
  {
    name: "Plan Estandar",
    price: "desde USD 300",
    description:
      "Incluye todo lo del plan Basico, sumando funciones orientadas a la gestion comercial.",
    features: [
      "Disponible en hasta 2 canales de atencion",
      "Identifica y prioriza contactos con mayor potencial de venta",
      "Coordina turnos y reuniones de forma automatica",
      "Registra la informacion en tu CRM o base de datos",
      "Notifica a tu equipo ante contactos relevantes en tiempo real",
    ],
    highlighted: true,
  },
  {
    name: "Plan Personalizado",
    price: "desde USD 800 + USD 150/mes",
    description:
      "Un agente de IA diseñado a medida para las necesidades particulares de tu negocio.",
    features: [
      "Configuracion adaptada a tus canales y procesos internos",
      "Integracion con ventas, pagos, calendario, CRM y otros sistemas",
      "Gestiona conversaciones complejas y de multiples pasos",
      "Conserva historial e informacion entre conversaciones",
      "Incluye mantenimiento, soporte y mejoras continuas mensuales",
    ],
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
    "APOC Automation desarrolla automatizacion, agentes IA y software a medida para empresas de Argentina, Peru, Ecuador, Bolivia y Mexico, con foco en problemas reales y resultados concretos.",
  baseUrl: "https://apocautomation.site",
};

export function getCaseStudyById(id) {
  return caseStudies.find((item) => item.id === id);
}
