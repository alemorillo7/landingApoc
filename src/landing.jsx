import React, { useState } from 'react';

export default function Landing({ onStart }) {
  // ROI Calculator States
  const [employees, setEmployees] = useState(5);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(20);

  // Method Interactive States
  const [activeMethodStep, setActiveMethodStep] = useState(0);

  // Calculations for ROI
  const monthlyHoursLost = Math.round(employees * hoursPerWeek * 4.33);
  const monthlyMoneyLost = Math.round(monthlyHoursLost * hourlyRate);
  const yearlyMoneyLost = Math.round(monthlyMoneyLost * 12);
  const potentialSavings = Math.round(monthlyMoneyLost * 0.85);

  const methodSteps = [
    {
      num: "01",
      title: "Auditoría & Plan de Arquitectura",
      desc: "No adivinamos. Mapeamos tu operación actual elemento por elemento y entregamos un plano detallado de la automatización propuesta, estimando el retorno de inversión antes de tocar una sola línea de código.",
      deliverable: "Entregable: PDF de Arquitectura de Sistemas y Diagrama de Flujo del Retorno de Inversión (ROI).",
      visualMockup: (
        <div className="bg-[#435B47]/10 p-5 rounded-2xl border border-[#435B47]/20 font-mono text-[11px] text-[#435B47] space-y-2">
          <p className="font-bold text-xs uppercase tracking-wider text-[#435B47]/80">🔍 Blueprint de Diagnóstico</p>
          <div className="h-[2px] bg-[#435B47]/20 my-2"></div>
          <p>• Proceso Crítico: Asignación de Leads manual</p>
          <p>• Cuello de botella: Demora de 4.2 horas por lead</p>
          <p className="text-red-750 font-semibold">• Fuga Financiera mensual: USD 3,450</p>
          <p className="text-emerald-800 font-semibold">✔ Solución propuesta: Integración n8n + Agentic AI Router</p>
        </div>
      )
    },
    {
      num: "02",
      title: "Desarrollo en Sandbox & Conexión Segura",
      desc: "Construimos e integramos tus sistemas en un entorno de pruebas seguro (Sandbox). Entrenamos a los agentes de IA con el conocimiento exacto de tu negocio y testeamos todos los casos de borde para garantizar robustez.",
      deliverable: "Entregable: Entorno Demo activo y llaves de cifrado seguras.",
      visualMockup: (
        <div className="bg-[#435B47]/10 p-5 rounded-2xl border border-[#435B47]/20 font-mono text-[11px] text-[#435B47] space-y-2">
          <p className="font-bold text-xs uppercase tracking-wider text-[#435B47]/80">🛠 Consola de Integración</p>
          <div className="h-[2px] bg-[#435B47]/20 my-2"></div>
          <p className="text-emerald-800">✔ API connection status: 200 OK (Google Calendar)</p>
          <p className="text-emerald-800">✔ Webhook payload parsed successfully (n8n)</p>
          <p className="text-[#435B47]/80">⚡ Entrenando base de datos vectorial de WhatsApp...</p>
          <p className="font-bold text-emerald-900 mt-2">▶ Sandbox ready for testing.</p>
        </div>
      )
    },
    {
      num: "03",
      title: "Despliegue, Onboarding & SLA de Soporte",
      desc: "Migramos las automatizaciones a producción con monitoreo en tiempo real. Capacitamos a tu equipo con documentación simple y activamos un Acuerdo de Nivel de Servicio (SLA) para soporte prioritario ante cualquier imprevisto.",
      deliverable: "Entregable: Dashboard de Métricas activo, manuales de usuario y soporte prioritario 24/7.",
      visualMockup: (
        <div className="bg-[#435B47]/10 p-5 rounded-2xl border border-[#435B47]/20 font-mono text-[11px] text-[#435B47] space-y-2">
          <p className="font-bold text-xs uppercase tracking-wider text-[#435B47]/80">🚀 Panel de Control & SLA</p>
          <div className="h-[2px] bg-[#435B47]/20 my-2"></div>
          <p>📈 Automatizaciones activas: 4/4</p>
          <p>🕒 SLA Response Time: &lt; 15 minutos</p>
          <p className="text-emerald-800 font-bold">✔ Sistema operativo y optimizado al 100%</p>
          <p className="text-xs text-[#435B47]/60">Documentación de equipo generada en Notion.</p>
        </div>
      )
    }
  ];

  return (
    <div className="bg-[#F5F7F6] text-[#435B47] font-sans selection:bg-[#435B47] selection:text-white antialiased">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#F5F7F6]/90 backdrop-blur-md border-b border-[#435B47]/10 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#435B47] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md shadow-[#435B47]/10">A</div>
          <span className="font-black text-lg tracking-wider text-[#435B47]">APOC AUTOMATION</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-[#435B47]/70">
          <a href="#servicios" className="hover:text-[#435B47] transition-colors relative group py-1">
            Servicios
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#435B47] transition-all group-hover:w-full"></span>
          </a>
          <a href="#roi-calculator" className="hover:text-[#435B47] transition-colors relative group py-1">
            Calculadora ROI
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#435B47] transition-all group-hover:w-full"></span>
          </a>
          <a href="#casos" className="hover:text-[#435B47] transition-colors relative group py-1">
            Casos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#435B47] transition-all group-hover:w-full"></span>
          </a>
          <a href="#metodo" className="hover:text-[#435B47] transition-colors relative group py-1">
            Método
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#435B47] transition-all group-hover:w-full"></span>
          </a>
        </div>
        <button 
          onClick={onStart}
          className="bg-[#435B47] text-[#F5F7F6] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#435B47]/90 hover:scale-[1.03] transition-all active:scale-95 shadow-lg shadow-[#435B47]/20 cursor-pointer"
        >
          Consulta Gratuita
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#435B47]/20 text-[10px] font-black tracking-widest uppercase mb-6 text-[#435B47] bg-[#435B47]/5">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
              SOLO 2 CUPOS DISPONIBLES ESTE MES
            </div>

            <h1 className="text-4xl md:text-[56px] font-black leading-[1.05] mb-8 tracking-tight uppercase italic text-[#435B47]">
              Si tu operación depende de <span className="text-red-700 underline decoration-wavy decoration-[#435B47]/20">Excel y WhatsApp</span>, estás perdiendo dinero todos los meses.
            </h1>

            <p className="text-lg md:text-xl mb-10 text-[#435B47]/80 leading-relaxed font-light max-w-2xl">
              Implementamos automatizaciones avanzadas y agentes de Inteligencia Artificial para empresas que necesitan escalar su facturación sin multiplicar sus costos operativos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStart}
                className="bg-[#435B47] text-[#F5F7F6] px-8 py-4.5 rounded-2xl text-base font-black uppercase tracking-wider hover:shadow-2xl hover:bg-[#435B47]/90 hover:-translate-y-0.5 transition-all cursor-pointer text-center"
              >
                Agendar diagnóstico gratuito
              </button>
              <a 
                href="#casos" 
                className="px-8 py-4.5 rounded-2xl text-base font-black uppercase tracking-wider border-2 border-[#435B47] hover:bg-[#435B47] hover:text-[#F5F7F6] transition-all inline-flex items-center justify-center cursor-pointer text-center"
              >
                Ver casos de éxito
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-16 py-8 border-t border-[#435B47]/15">
              <div>
                <p className="text-3xl md:text-4xl font-black text-[#435B47]">50+</p>
                <p className="text-[10px] opacity-60 uppercase tracking-widest font-black">Proyectos</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-[#435B47]">8</p>
                <p className="text-[10px] opacity-60 uppercase tracking-widest font-black">Países</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-[#435B47]">$0</p>
                <p className="text-[10px] opacity-60 uppercase tracking-widest font-black">Costo Diagnóstico</p>
              </div>
            </div>
          </div>

          {/* VIDEO & QUALIFICATION SECTION */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* LIVE AUTOMATION MOCK TERMINAL */}
            <div className="w-full bg-[#354838] text-[#F5F7F6] rounded-3xl shadow-2xl p-6 border border-[#435B47]/30 relative overflow-hidden font-mono text-xs text-left">
              {/* Window controls */}
              <div className="flex gap-2 mb-6 pb-3 border-b border-[#F5F7F6]/10">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]/80"></span>
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80"></span>
                <span className="w-3 h-3 rounded-full bg-[#10b981]/80"></span>
                <span className="ml-3 text-[10px] text-[#F5F7F6]/40 tracking-wider font-bold">APOC_OPERATIONS_FLOW</span>
              </div>
              
              {/* Steps */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3.5 bg-white/5 rounded-2xl border border-white/10">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366] font-black text-[9px] tracking-tighter">WA</span>
                  <div>
                    <p className="font-bold text-white">Lead de WhatsApp Recibido</p>
                    <p className="text-[10px] text-[#F5F7F6]/60 mt-0.5">"Necesito automatizar nuestro flujo de ventas..."</p>
                  </div>
                  <span className="ml-auto text-[8px] bg-[#25D366]/10 text-[#25D366] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-ping"></span> Activo
                  </span>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white/5 rounded-2xl border border-white/10">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-[#F5F7F6] font-black text-[9px]">AI</span>
                  <div>
                    <p className="font-bold text-white">Clasificación IA APOC</p>
                    <p className="text-[10px] text-[#F5F7F6]/60 mt-0.5">Interés: Alta urgencia. Calificación: Aprobado.</p>
                  </div>
                  <span className="ml-auto text-[8px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Analizado
                  </span>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white/5 rounded-2xl border border-white/10">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5F7F6]/20 text-[#F5F7F6] font-black text-[9px]">CRM</span>
                  <div>
                    <p className="font-bold text-white">Sincronización Automática</p>
                    <p className="text-[10px] text-[#F5F7F6]/60 mt-0.5">Cita agendada, Calendario & Alerta en Slack.</p>
                  </div>
                  <span className="ml-auto text-[8px] bg-[#F5F7F6]/10 text-white/90 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Listo
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center w-full px-4">
              <button 
                onClick={onStart}
                className="w-full bg-[#435B47] text-white py-5 rounded-2xl text-lg font-black uppercase tracking-wider shadow-xl shadow-[#435B47]/20 hover:scale-[1.02] hover:bg-[#435B47]/95 transition-all active:scale-95 cursor-pointer"
              >
                AGENDAR MI DIAGNÓSTICO
              </button>
              
              <p className="mt-4 text-[10px] uppercase font-black tracking-widest text-[#435B47]/40">
                Paso 1: Filtro de Calificación
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* PAIN POINTS SECTION */}
      <section className="bg-white py-24 px-6 md:px-12 border-t border-[#435B47]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-16 uppercase italic text-[#435B47] tracking-tight">
            ¿Tu empresa está estancada en lo operativo?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              "Dependencia absoluta de planillas manuales y chats informales.",
              "Errores humanos repetitivos que te hacen perder clientes y reputación.",
              "Falta de visibilidad e informes en tiempo real sobre el rendimiento real.",
              "Procesos lentos que hacen que tu competencia responda primero."
            ].map((p, i) => (
              <div key={i} className="p-6 bg-[#F5F7F6] rounded-2xl border-l-4 border-red-700 font-medium text-[#435B47] shadow-sm">
                <span className="text-red-700 mr-2 text-xl font-black">✕</span> {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE ROI CALCULATOR */}
      <section id="roi-calculator" className="py-24 px-6 md:px-12 bg-[#F5F7F6] border-t border-[#435B47]/10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#435B47]/20 text-[10px] font-black tracking-widest text-[#435B47] bg-[#435B47]/5">
              CALCULADORA DE RETORNO DE INVERSIÓN
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase italic text-[#435B47] mt-3">
              ¿Cuánto te cuesta la ineficiencia?
            </h2>
            <p className="text-lg opacity-80 font-light">
              Desliza los valores para estimar el costo financiero y las horas que tu equipo pierde mensualmente en tareas manuales repetitivas.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Control Panel */}
            <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#435B47]/10 shadow-sm flex flex-col justify-between space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-bold text-sm text-[#435B47] uppercase tracking-wider">Empleados en tareas manuales</label>
                  <span className="font-black text-xl text-[#435B47]">{employees}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={employees} 
                  onChange={(e) => setEmployees(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#435B47]/10 rounded-lg appearance-none cursor-pointer accent-[#435B47]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-bold text-sm text-[#435B47] uppercase tracking-wider">Horas perdidas / semana por persona</label>
                  <span className="font-black text-xl text-[#435B47]">{hoursPerWeek} hs</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="40" 
                  value={hoursPerWeek} 
                  onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#435B47]/10 rounded-lg appearance-none cursor-pointer accent-[#435B47]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-bold text-sm text-[#435B47] uppercase tracking-wider">Costo promedio de hora laboral (USD)</label>
                  <span className="font-black text-xl text-[#435B47]">${hourlyRate} USD</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="150" 
                  value={hourlyRate} 
                  onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#435B47]/10 rounded-lg appearance-none cursor-pointer accent-[#435B47]"
                />
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-5 bg-[#435B47] text-[#F5F7F6] p-8 rounded-3xl flex flex-col justify-between shadow-xl shadow-[#435B47]/15">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-[#F5F7F6]/55">Horas perdidas al mes</p>
                  <p className="text-3xl font-black">{monthlyHoursLost} Horas</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-red-300">Pérdida mensual estimada</p>
                  <p className="text-4xl font-black text-red-200">${monthlyMoneyLost.toLocaleString()} USD</p>
                </div>
                <div className="pt-4 border-t border-[#F5F7F6]/15">
                  <p className="text-[10px] uppercase font-black tracking-widest text-[#F5F7F6]/55">Pérdida Anual Proyectada</p>
                  <p className="text-2xl font-bold text-[#F5F7F6]/80">${yearlyMoneyLost.toLocaleString()} USD</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F5F7F6]/15">
                <div className="bg-white/10 p-4 rounded-xl border border-white/5">
                  <p className="text-[9px] uppercase font-black tracking-widest text-emerald-300">Ahorro potencial con APOC</p>
                  <p className="text-xl font-black text-emerald-200">${potentialSavings.toLocaleString()} USD / mes</p>
                  <p className="text-[9px] text-[#F5F7F6]/70 mt-1">Estimación basada en 85% de automatización del flujo operativo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASOS DE ÉXITO SECTION */}
      <section id="casos" className="py-24 px-6 md:px-12 bg-white border-t border-[#435B47]/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#435B47]/20 text-[10px] font-black tracking-widest text-[#435B47] bg-[#435B47]/5">
              RESULTADOS COMPROBADOS
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase italic text-[#435B47] mt-3">
              Casos de Éxito & Testimonios
            </h2>
            <p className="text-lg opacity-80 font-light">
              Vea cómo transformamos operaciones reales, liberando cientos de horas de trabajo y estructurando sistemas escalables de alta facturación.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Embed Video Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative aspect-[9/16] w-full max-w-[310px] bg-[#435B47] rounded-3xl overflow-hidden shadow-2xl border border-[#435B47]/25">
                {/* YouTube Iframe Embedded (Shorts formatted) */}
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/6S5O2tUIz-E" 
                  title="Caso de Éxito APOC"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Metrics Showcase Card */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-8 bg-[#F5F7F6] rounded-3xl border border-[#435B47]/10 shadow-sm">
                <p className="text-[10px] uppercase font-black tracking-widest text-[#435B47]/65">Caso: Brokerage Farmacéutico Internacional</p>
                <h4 className="text-2xl font-black text-[#435B47] mt-1">Medical OS & CRM Automatizado</h4>
                <p className="text-sm opacity-80 mt-3 font-light leading-relaxed">
                  Desarrollo de un sistema operativo unificado para reemplazar procesos manuales en Excel. Integra cotización automatizada con IA, pipeline de órdenes comerciales, CommHub centralizado para proveedores y auto-sourcing de productos.
                </p>
                <div className="flex gap-8 mt-6 pt-4 border-t border-[#435B47]/15">
                  <div>
                    <span className="text-2xl font-black block text-[#435B47]">100%</span>
                    <span className="text-[9px] uppercase font-black text-[#435B47]/50">Trazabilidad</span>
                  </div>
                  <div>
                    <span className="text-2xl font-black block text-[#435B47]">Next.js</span>
                    <span className="text-[9px] uppercase font-black text-[#435B47]/50">Stack Frontend</span>
                  </div>
                  <div>
                    <span className="text-2xl font-black block text-[#435B47]">n8n / IA</span>
                    <span className="text-[9px] uppercase font-black text-[#435B47]/50">Procesamiento</span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-[#F5F7F6] rounded-3xl border border-[#435B47]/10 shadow-sm">
                <p className="text-[10px] uppercase font-black tracking-widest text-[#435B47]/65">Caso: Chapería y Automotriz</p>
                <h4 className="text-2xl font-black text-[#435B47] mt-1">Taller Lucero - Presupuestos Digitales</h4>
                <p className="text-sm opacity-80 mt-3 font-light leading-relaxed">
                  Sistema web completo para digitalizar el flujo de trabajo del taller. Permite la generación de presupuestos numerados en segundos, gestión de clientes, vehículos, operarios y finanzas en tiempo real desde la nube.
                </p>
                <div className="flex gap-8 mt-6 pt-4 border-t border-[#435B47]/15">
                  <div>
                    <span className="text-2xl font-black block text-[#435B47]">0 Papel</span>
                    <span className="text-[9px] uppercase font-black text-[#435B47]/50">Operación Digital</span>
                  </div>
                  <div>
                    <span className="text-2xl font-black block text-[#435B47]">Segundos</span>
                    <span className="text-[9px] uppercase font-black text-[#435B47]/50">Tiempo Presupuesto</span>
                  </div>
                  <div>
                    <span className="text-2xl font-black block text-[#435B47]">Next.js</span>
                    <span className="text-[9px] uppercase font-black text-[#435B47]/50">Arquitectura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS SECTION */}
      <section id="servicios" className="py-24 px-6 md:px-12 bg-[#F5F7F6] border-t border-[#435B47]/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#435B47]/20 text-[10px] font-black tracking-widest text-[#435B47] bg-[#435B47]/5">
              QUÉ OFRECEMOS
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase italic text-[#435B47] mt-3">
              Soluciones de Alta Gama
            </h2>
            <p className="text-lg opacity-80 font-light">
              Diseñamos sistemas que automatizan tareas administrativas repetitivas, optimizan la atención comercial e incrementan la visibilidad de tu facturación.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-[#435B47]/10 hover:shadow-xl hover:-translate-y-1 transition-all group duration-300">
              <div className="w-12 h-12 bg-[#435B47]/10 rounded-2xl flex items-center justify-center text-[#435B47] font-black text-sm mb-6 group-hover:bg-[#435B47] group-hover:text-white transition-all">
                CRM
              </div>
              <h3 className="text-lg font-black mb-3 text-[#435B47]">CRM & Ventas</h3>
              <p className="text-xs opacity-80 leading-relaxed font-light">
                Conexión instantánea de campañas de marketing con Hubspot, Salesforce o Pipedrive. Alertas inmediatas a tus asesores y automatización de embudos comerciales.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#435B47]/10 hover:shadow-xl hover:-translate-y-1 transition-all group duration-300">
              <div className="w-12 h-12 bg-[#435B47]/10 rounded-2xl flex items-center justify-center text-[#435B47] font-black text-sm mb-6 group-hover:bg-[#435B47] group-hover:text-white transition-all">
                AI
              </div>
              <h3 className="text-lg font-black mb-3 text-[#435B47]">Agentes de IA</h3>
              <p className="text-xs opacity-80 leading-relaxed font-light">
                Bots entrenados que atienden 24/7 en WhatsApp, web o email. Califican leads calientes, responden a preguntas frecuentes complejas y agendan llamadas comerciales automáticamente.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#435B47]/10 hover:shadow-xl hover:-translate-y-1 transition-all group duration-300">
              <div className="w-12 h-12 bg-[#435B47]/10 rounded-2xl flex items-center justify-center text-[#435B47] font-black text-sm mb-6 group-hover:bg-[#435B47] group-hover:text-white transition-all">
                API
              </div>
              <h3 className="text-lg font-black mb-3 text-[#435B47]">Integración de Datos</h3>
              <p className="text-xs opacity-80 leading-relaxed font-light">
                Diseñamos flujos con n8n y Make para enlazar ERPs, Slack, hojas de cálculo y sistemas propietarios. Di adiós a copiar e importar datos a mano.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#435B47]/10 hover:shadow-xl hover:-translate-y-1 transition-all group duration-300">
              <div className="w-12 h-12 bg-[#435B47]/10 rounded-2xl flex items-center justify-center text-[#435B47] font-black text-sm mb-6 group-hover:bg-[#435B47] group-hover:text-white transition-all">
                DB
              </div>
              <h3 className="text-lg font-black mb-3 text-[#435B47]">Paneles Ejecutivos</h3>
              <p className="text-xs opacity-80 leading-relaxed font-light">
                Dashboards unificados con métricas de facturación, costos y ventas de forma centralizada. Información clave para directivos en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NUESTRO METODO SECTION - INTERACTIVE */}
      <section id="metodo" className="py-24 px-6 md:px-12 bg-white border-t border-[#435B47]/10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#435B47]/20 text-[10px] font-black tracking-widest text-[#435B47] bg-[#435B47]/5">
              NUESTRA METODOLOGÍA
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase italic text-[#435B47] mt-3">
              ¿Cómo Garantizamos el Éxito?
            </h2>
            <p className="text-lg opacity-80 font-light">
              Un flujo de trabajo riguroso e interactivo diseñado para eliminar riesgos en la integración de software empresarial.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Selectable Buttons (Left) */}
            <div className="lg:col-span-5 space-y-3">
              {methodSteps.map((stepData, index) => {
                const isActive = activeMethodStep === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveMethodStep(index)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                      isActive 
                      ? "bg-[#435B47] text-white border-[#435B47] shadow-lg shadow-[#435B47]/15" 
                      : "bg-[#F5F7F6] text-[#435B47] border-[#435B47]/10 hover:border-[#435B47]/40"
                    }`}
                  >
                    <span className={`text-xl font-mono font-black ${isActive ? "text-white/60" : "text-[#435B47]/40"}`}>
                      {stepData.num}
                    </span>
                    <span className="font-bold text-sm md:text-base">{stepData.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Panel Content (Right) */}
            <div className="lg:col-span-7 bg-[#F5F7F6] p-8 rounded-3xl border border-[#435B47]/10 min-h-[300px] flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#435B47]/50">
                  Fase {methodSteps[activeMethodStep].num} del Proceso
                </p>
                <h3 className="text-2xl font-black text-[#435B47]">
                  {methodSteps[activeMethodStep].title}
                </h3>
                <p className="text-sm opacity-85 leading-relaxed font-light">
                  {methodSteps[activeMethodStep].desc}
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="p-3 bg-[#435B47]/5 border-l-4 border-[#435B47] text-xs font-bold text-[#435B47]">
                  {methodSteps[activeMethodStep].deliverable}
                </div>
                {methodSteps[activeMethodStep].visualMockup}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 md:px-12 bg-[#435B47] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
            NO QUEREMOS VENDERTE UN PROYECTO, QUEREMOS DARTE EL CONTROL.
          </h2>
          <p className="text-lg md:text-xl mb-12 opacity-80 leading-relaxed font-light">
            Realizamos un análisis exhaustivo y honesto de tu situation actual. Si vemos que no podemos aportar un retorno de inversión claro, te lo diremos de frente.
          </p>
          <button 
            onClick={onStart}
            className="bg-[#F5F7F6] text-[#435B47] px-12 py-6 rounded-2xl text-xl md:text-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-2xl cursor-pointer"
          >
            AGENDAR DIAGNÓSTICO AHORA
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-12 border-t border-[#435B47]/10 opacity-50 text-xs font-black uppercase tracking-widest flex justify-between">
        <span>© 2026 APOC AUTOMATION</span>
        <span>HIGH TICKET SOLUTIONS</span>
      </footer>

    </div>
  );
}
