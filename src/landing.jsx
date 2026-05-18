import React from 'react';

export default function Landing({ onStart }) {
  return (
    <div className="bg-[#F5F7F6] text-[#435B47] font-sans selection:bg-[#435B47] selection:text-white">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#F5F7F6]/80 backdrop-blur-md border-b border-[#435B47]/10 px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#435B47] rounded-sm flex items-center justify-center text-white font-bold text-xl">A</div>
          <span className="font-bold text-xl tracking-tight">APOC AUTOMATION</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium opacity-70">
          <a href="#servicios" className="hover:opacity-100 transition-opacity">Servicios</a>
          <a href="https://www.youtube.com/@apocautomation" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">Casos</a>
          <a href="#metodo" className="hover:opacity-100 transition-opacity">Nuestro Método</a>
        </div>
        <button 
          onClick={onStart}
          className="bg-[#435B47] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-[#435B47]/20"
        >
          Consulta Gratuita
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#435B47]/20 text-xs font-semibold mb-6 animate-pulse">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              SOLO 2 CUPOS DISPONIBLES ESTE MES
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tight uppercase italic underline-offset-8 decoration-4 decoration-[#435B47]/10">
              Si tu operación depende de <span className="text-red-600">Excel y WhatsApp</span>, estás perdiendo plata todos los meses.
            </h1>

            <p className="text-xl md:text-2xl mb-10 opacity-80 leading-relaxed font-light">
              Implementamos automatizaciones con IA y software a medida para empresas que necesitan escalar su operación sin contratar más personal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStart}
                className="bg-[#435B47] text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Agendar diagnóstico gratuito
              </button>
              <a 
                href="https://www.youtube.com/@apocautomation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl text-lg font-bold border-2 border-[#435B47] hover:bg-[#435B47] hover:text-white transition-all inline-flex items-center justify-center"
              >
                Ver casos de éxito
              </a>
            </div>

            <div className="flex gap-12 mt-16 py-8 border-t border-[#435B47]/10">
              <div>
                <p className="text-4xl font-black">50+</p>
                <p className="text-sm opacity-60 uppercase tracking-widest font-bold">Proyectos</p>
              </div>
              <div>
                <p className="text-4xl font-black">8</p>
                <p className="text-sm opacity-60 uppercase tracking-widest font-bold">Países</p>
              </div>
              <div>
                <p className="text-4xl font-black">$0</p>
                <p className="text-sm opacity-60 uppercase tracking-widest font-bold">Costo Diagnosis</p>
              </div>
            </div>
          </div>

          {/* VIDEO & QUALIFICATION SECTION */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* LIVE AUTOMATION MOCK TERMINAL */}
            <div className="w-full bg-[#1e2a22] text-[#F5F7F6] rounded-3xl shadow-2xl p-6 border border-[#435B47]/30 relative overflow-hidden font-mono text-xs text-left">
              {/* Window controls */}
              <div className="flex gap-2 mb-6 pb-3 border-b border-[#435B47]/20">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]/80"></span>
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80"></span>
                <span className="w-3 h-3 rounded-full bg-[#10b981]/80"></span>
                <span className="ml-3 text-[10px] text-[#F5F7F6]/40 tracking-wider font-bold">APOC_OPERATIONS_FLOW</span>
              </div>
              
              {/* Steps */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-[#435B47]/20 rounded-2xl border border-[#435B47]/20">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366] font-bold text-[10px]">WA</span>
                  <div>
                    <p className="font-bold text-white">Lead de WhatsApp Recibido</p>
                    <p className="text-[10px] text-[#F5F7F6]/60 mt-0.5">"Necesito automatizar nuestro flujo de ventas..."</p>
                  </div>
                  <span className="ml-auto text-[9px] bg-[#25D366]/10 text-[#25D366] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-ping"></span> Activo
                  </span>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#435B47]/20 rounded-2xl border border-[#435B47]/20">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400 font-bold text-[10px]">AI</span>
                  <div>
                    <p className="font-bold text-white">Clasificación IA APOC</p>
                    <p className="text-[10px] text-[#F5F7F6]/60 mt-0.5">Interés: Diagnóstico. Calificación: Aprobado.</p>
                  </div>
                  <span className="ml-auto text-[9px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Analizado
                  </span>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#435B47]/20 rounded-2xl border border-[#435B47]/20">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5F7F6]/20 text-[#F5F7F6] font-bold text-[10px]">CRM</span>
                  <div>
                    <p className="font-bold text-white">Sincronización Automática</p>
                    <p className="text-[10px] text-[#F5F7F6]/60 mt-0.5">Cita en Calendario agendada & alerta en Slack.</p>
                  </div>
                  <span className="ml-auto text-[9px] bg-[#F5F7F6]/10 text-white/90 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Listo
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center px-4">
              <button 
                onClick={onStart}
                className="w-full bg-[#435B47] text-white py-5 rounded-2xl text-xl font-black shadow-xl shadow-[#435B47]/20 hover:scale-[1.02] transition-transform active:scale-95"
              >
                AGENDAR MI DIAGNÓSTICO
              </button>
              
              <p className="mt-4 text-[10px] uppercase font-bold tracking-widest opacity-40">
                Paso 1: Filtro de Calificación
              </p>
            </div>

            {/* BACKGROUND DECORATION */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#435B47]/5 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </section>

      {/* PAIN POINTS SECTION */}
      <section className="bg-white py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-16 uppercase italic">
            ¿Tu empresa está estancada en lo operativo?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[
              "Dependencia absoluta de Excel y hilos de WhatsApp.",
              "Errores manuales que te hacen perder credibilidad y dinero.",
              "Procesos tan lentos que la competencia te está ganando.",
              "Falta de visibilidad real sobre qué está pasando en tu negocio."
            ].map((p, i) => (
              <div key={i} className="p-6 bg-[#F5F7F6] rounded-xl border-l-4 border-red-500 font-medium">
                <span className="text-red-500 mr-2 text-xl font-bold">✕</span> {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS SECTION */}
      <section id="servicios" className="py-24 px-6 md:px-12 bg-[#F5F7F6] border-t border-[#435B47]/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#435B47]/20 text-xs font-semibold mb-4 text-[#435B47]">
              QUÉ HACEMOS
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase italic text-[#435B47]">
              NUESTROS SERVICIOS
            </h2>
            <p className="text-lg opacity-80 font-light">
              Diseñamos e implementamos soluciones a medida que automatizan tus tareas repetitivas y liberan el potencial de tu negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#435B47]/10 hover:shadow-xl transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#435B47]/10 rounded-2xl flex items-center justify-center text-[#435B47] font-black text-sm mb-6 group-hover:bg-[#435B47] group-hover:text-white transition-all">
                CRM
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#435B47]">CRM & Ventas</h3>
              <p className="text-sm opacity-80 leading-relaxed font-light">
                Integramos tus campañas de marketing directamente con tu CRM (Hubspot, Pipedrive, etc.). Clasificación automática de leads y alertas en tiempo real.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#435B47]/10 hover:shadow-xl transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#435B47]/10 rounded-2xl flex items-center justify-center text-[#435B47] font-black text-sm mb-6 group-hover:bg-[#435B47] group-hover:text-white transition-all">
                AI
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#435B47]">Agentes de IA</h3>
              <p className="text-sm opacity-80 leading-relaxed font-light">
                Bots de atención inteligente en WhatsApp y Web. Califican leads calientes, responden consultas recurrentes y agendan llamadas autónomamente 24/7.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#435B47]/10 hover:shadow-xl transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#435B47]/10 rounded-2xl flex items-center justify-center text-[#435B47] font-black text-sm mb-6 group-hover:bg-[#435B47] group-hover:text-white transition-all">
                API
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#435B47]">Integración de Sistemas</h3>
              <p className="text-sm opacity-80 leading-relaxed font-light">
                Conectamos tus herramientas cotidianas (Slack, Sheets, ERP, WhatsApp) para que dejes de copiar y pegar datos manualmente entre pestañas.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#435B47]/10 hover:shadow-xl transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#435B47]/10 rounded-2xl flex items-center justify-center text-[#435B47] font-black text-sm mb-6 group-hover:bg-[#435B47] group-hover:text-white transition-all">
                DB
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#435B47]">Dashboards en Vivo</h3>
              <p className="text-sm opacity-80 leading-relaxed font-light">
                Visualización centralizada de tus métricas clave de negocio y ventas. Información en tiempo real para tomar decisiones estratégicas basadas en datos reales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NUESTRO METODO SECTION */}
      <section id="metodo" className="py-24 px-6 md:px-12 bg-white border-t border-[#435B47]/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#435B47]/20 text-xs font-semibold mb-4 text-[#435B47]">
              CÓMO TRABAJAMOS
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase italic text-[#435B47]">
              NUESTROS PASOS
            </h2>
            <p className="text-lg opacity-80 font-light">
              Un proceso ágil de 3 fases diseñado para automatizar tu negocio sin causar interrupciones en tu operación diaria.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="relative flex flex-col p-8 bg-[#F5F7F6] rounded-3xl border border-[#435B47]/10">
              <div className="text-5xl font-black text-[#435B47]/20 mb-4 font-mono">01</div>
              <h3 className="text-2xl font-bold mb-4 text-[#435B47]">Diagnóstico & Diseño</h3>
              <p className="text-sm opacity-80 leading-relaxed font-light">
                Analizamos a fondo tus flujos de trabajo actuales y cuellos de botella. Creamos un plano de automatización a medida enfocado en el mayor retorno de inversión.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col p-8 bg-[#F5F7F6] rounded-3xl border border-[#435B47]/10">
              <div className="text-5xl font-black text-[#435B47]/20 mb-4 font-mono">02</div>
              <h3 className="text-2xl font-bold mb-4 text-[#435B47]">Desarrollo & Conexión</h3>
              <p className="text-sm opacity-80 leading-relaxed font-light">
                Construimos las integraciones, entrenamos a los agentes de Inteligencia Artificial y conectamos tus canales de comunicación de manera segura y transparente.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col p-8 bg-[#F5F7F6] rounded-3xl border border-[#435B47]/10">
              <div className="text-5xl font-black text-[#435B47]/20 mb-4 font-mono">03</div>
              <h3 className="text-2xl font-bold mb-4 text-[#435B47]">Lanzamiento & Soporte</h3>
              <p className="text-sm opacity-80 leading-relaxed font-light">
                Desplegamos las soluciones en producción, capacitamos a tu equipo y nos encargamos del monitoreo y la optimización continua para garantizar una estabilidad absoluta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 md:px-12 bg-[#435B47] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            NO QUEREMOS VENDERTE UN PROYECTO, QUEREMOS DARTE EL CONTROL.
          </h2>
          <p className="text-xl mb-12 opacity-80">
            Analizamos tu caso sin compromiso. Si no podemos ayudarte, te lo diremos directo.
          </p>
          <button 
            onClick={onStart}
            className="bg-[#F5F7F6] text-[#435B47] px-12 py-6 rounded-2xl text-2xl font-black hover:scale-105 transition-transform active:scale-95 shadow-2xl"
          >
            AGENDAR LLAMADA AHORA
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-12 border-t border-[#435B47]/10 opacity-40 text-sm font-bold flex justify-between uppercase">
        <span>© 2026 APOC AUTOMATION</span>
        <span>HIGH TICKET SOLUTIONS</span>
      </footer>

    </div>
  );
}
