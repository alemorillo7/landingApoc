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
            <div className="w-full aspect-video bg-black rounded-3xl shadow-2xl overflow-hidden relative group cursor-pointer border-4 border-white/10">
              {/* VIDEO PLACEHOLDER */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-[#435B47]/80 to-transparent">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#435B47] border-b-[12px] border-b-transparent ml-1"></div>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-sm font-bold uppercase tracking-widest opacity-80">Video: Cómo escalamos tu operación</p>
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
          <p className="mt-8 text-sm opacity-50 font-semibold uppercase tracking-widest">
            Proyectos de automatización desde USD 7.000
          </p>
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
