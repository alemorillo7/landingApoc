import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './landing.jsx'
import Form from './form.jsx'
import './index.css'

function Success({ data }) {
  let formattedDate = "";
  if (data?.date) {
    const d = new Date(data.date + 'T12:00:00');
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    formattedDate = d.toLocaleDateString('es-ES', options);
  }

  return (
    <div className="min-h-screen bg-[#435B47] flex flex-col items-center justify-center text-[#F5F7F6] p-6 text-center selection:bg-white selection:text-[#435B47]">
      <div className="animate-fade-in max-w-2xl">
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <span className="text-4xl">🎉</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase italic tracking-tighter">¡Cita Confirmada!</h1>
        <p className="text-xl md:text-2xl font-light mb-8 opacity-90 leading-relaxed">
          Tu diagnóstico en vivo ha sido agendado con éxito.
        </p>
        
        {data?.date && data?.time && (
          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 mb-8 max-w-md mx-auto">
            <p className="text-xs uppercase tracking-widest font-black text-white/50 mb-2">Día y Horario Seleccionado</p>
            <p className="text-xl md:text-2xl font-bold capitalize mb-1">{formattedDate}</p>
            <p className="text-lg font-medium opacity-80">{data.time} hs</p>
          </div>
        )}

        <p className="text-sm md:text-base font-bold opacity-60 mb-10 max-w-md mx-auto leading-relaxed">
          Te enviamos la invitación por correo electrónico y nos pondremos en contacto vía WhatsApp para coordinar los accesos de la llamada. ¡Nos vemos en la reunión!
        </p>
        
        <div className="w-16 h-1 bg-white/20 mx-auto mb-8"></div>
        <button
          onClick={() => window.location.reload()}
          className="text-xs font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
        >
          ← Volver al inicio
        </button>
      </div>
    </div>
  );
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [leadData, setLeadData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setSubmitting(true);

    const WEBHOOK_URL = "https://automation8n.fluxia.site/webhook/50b4a26e-d6af-4f6d-b29b-8d072a2a75b2";
  
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Agendar cita automáticamente en el CRM de APOC
      if (data.date && data.time) {
        const [hoursStr, minutesStr] = data.time.split(':');
        const hours = parseInt(hoursStr);
        const minutes = parseInt(minutesStr);
        let endH = minutes === 30 ? hours + 1 : hours;
        let endM = minutes === 30 ? '00' : '30';
        const end_time = `${endH.toString().padStart(2, '0')}:${endM}`;

        await fetch('https://apocrm-one.vercel.app/api/calendar/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `Diagnóstico APOC - ${data.industry || 'Cliente'}`,
            date: data.date,
            start_time: data.time,
            end_time: end_time,
            description: `Reunión de diagnóstico agendada automáticamente desde la Landing Page.
            
Detalles del Lead:
• Rubro / Industria: ${data.industry || 'No especificado'}
• Proceso Crítico: ${data.problem || 'No especificado'}
• Urgencia: ${data.urgency || 'No especificada'}
• Facturación: ${data.revenue || 'No especificada'}
• Presupuesto: ${data.budget || 'No especificado'}
• WhatsApp: ${data.phone || 'No especificado'}`,
            guests: data.email
          })
        }).catch(err => console.error("Error agendando cita en CRM:", err));
      }
  
      // Disparar evento Lead en Meta Pixel
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: data.email || 'landing_form',
          content_category: data.industry || '',
          value: 0,
          currency: 'USD',
        });
      }

      setLeadData(data);
    } catch (error) {
      console.error("Error enviando lead:", error);
      // Igual mostramos éxito para no frustrar al usuario en el demo
      setLeadData(data);
    } finally {
      setSubmitting(false);
      setShowForm(false);
    }
  };

  const handleStartForm = () => {
    // Disparar evento InitiateCheckout en Meta Pixel
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'diagnostico_gratuito',
        content_category: 'funnel_start'
      });
    }
    setShowForm(true);
  };

  if (submitting) {
    return (
      <div className="min-h-screen bg-[#435B47] flex flex-col items-center justify-center text-[#F5F7F6] p-6 text-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-2xl font-black uppercase tracking-widest opacity-80">Procesando tu diagnóstico...</h2>
      </div>
    );
  }

  return (
    <>
      {leadData ? (
        <Success data={leadData} />
      ) : showForm ? (
        <Form onComplete={handleSubmit} />
      ) : (
        <Landing onStart={handleStartForm} />
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
