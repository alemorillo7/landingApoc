import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './landing.jsx'
import Form from './form.jsx'
import './index.css'

function Success() {
  return (
    <div className="min-h-screen bg-[#435B47] flex flex-col items-center justify-center text-[#F5F7F6] p-6 text-center">
      <div className="animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase italic tracking-tighter">¡Recibido!</h1>
        <p className="text-2xl font-light mb-12 max-w-2xl opacity-80 leading-relaxed">
          Estamos analizando tus respuestas. En menos de 24 horas te contactaremos para coordinar los siguientes pasos.
        </p>
        <div className="w-16 h-1 bg-white/20 mx-auto mb-12"></div>
        <button
          onClick={() => window.location.reload()}
          className="text-sm font-bold uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity"
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
