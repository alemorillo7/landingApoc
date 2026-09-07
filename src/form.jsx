import React, { useState, useEffect } from "react";

const steps = [
    {
        question: "Tu nombre y apellido completos",
        field: "name",
        type: "text",
        placeholder: "Ej: Horacio López",
        helper: "Para saber con quién vamos a reunirnos en la sesión estratégica."
    },
    {
        question: "Tu número de WhatsApp con código de país",
        field: "phone",
        type: "text",
        placeholder: "+54 9 11 1234 5678 o +56 9 1234 5678",
        helper: "Te enviaremos la confirmación directa y el enlace por WhatsApp antes de la reunión."
    },
    {
        question: "Tu correo electrónico corporativo o personal",
        field: "email",
        type: "email",
        placeholder: "contacto@tuempresa.com o tu-email@gmail.com",
        helper: "Te llegará la invitación formal de Google Meet y los detalles de la sesión."
    },
    {
        question: "Nombre de tu empresa y qué procesos necesitan resolver",
        field: "industry",
        type: "textarea",
        placeholder: "Ej: Somos una ferretería con 8 empleados y queremos automatizar respuestas de WhatsApp, pedidos y control de stock...",
        helper: "Nos permite estudiar tu caso antes de la llamada y presentarte soluciones específicas de tu rubro."
    },
    {
        question: "¿Cuánto estás dispuesto a invertir en tu software o plataforma?",
        field: "budget",
        type: "select",
        options: [
            "Entre USD 5.000 y 10.000",
            "Entre USD 10.000 y 15.000",
            "Entre USD 15.000 y 30.000",
            "Más de USD 30.000",
        ],
    },
    {
        question: "¿Qué tan urgente es resolver esto?",
        field: "urgency",
        type: "select",
        options: [
            "Extremadamente Urgente (Estamos perdiendo dinero)",
            "Prioridad para los próximos 1-3 meses",
            "Solo explorando opciones por ahora",
        ],
    },
    {
        question: "Elegí el día y la hora para tu diagnóstico en vivo",
        field: "appointment",
        type: "calendar"
    }
];

const countryPills = [
    { label: "🇦🇷 +54 9", code: "+54 9 " },
    { label: "🇨🇱 +56 9", code: "+56 9 " },
    { label: "🇲🇽 +52", code: "+52 " },
    { label: "🇪🇸 +34", code: "+34 " },
    { label: "🇵🇪 +51 9", code: "+51 9 " },
    { label: "🇨🇴 +57", code: "+57 " },
    { label: "🇺🇾 +598", code: "+598 " },
];

const FAKE_DOMAINS = new Set([
    "empresa.com",
    "empresa.com.ar",
    "ejemplo.com",
    "ejemplo.org",
    "ejemplo.es",
    "example.com",
    "example.org",
    "example.net",
    "test.com",
    "testing.com",
    "prueba.com",
    "pruebas.com",
    "fake.com",
    "asdf.com",
    "correo.com",
    "email.com",
    "mail.com",
    "none.com",
    "no.com",
    "demo.com",
    "temporal.com",
    "tempmail.com",
    "10minutemail.com",
    "mailinator.com",
    "guerrillamail.com",
    "throwawaymail.com",
    "yopmail.com",
    "dispostable.com",
    "trashmail.com",
    "sharklasers.com",
    "getairmail.com",
    "mytemp.email",
]);

const validateField = (field, value) => {
    const val = (value || "").trim();

    if (field === "name") {
        if (!val) return "Por favor, ingresá tu nombre y apellido.";
        if (val.length < 4) return "El nombre es demasiado corto. Ingresá tu nombre y apellido completos.";
        const parts = val.split(/\s+/).filter(Boolean);
        if (parts.length < 2) return "Por favor, incluí tu apellido además del nombre (ej: Horacio López).";
        if (parts.some(p => p.length < 2)) return "Ingresá un nombre y apellido válidos.";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(val)) {
            return "El nombre solo puede contener letras y espacios.";
        }
        if (/^(.)\1{3,}/.test(val)) return "Por favor, ingresá un nombre real.";
        return null;
    }

    if (field === "phone") {
        if (!val) return "Por favor, ingresá tu número de WhatsApp.";
        
        const digitsOnly = val.replace(/\D/g, "");

        if (digitsOnly.length < 10) {
            return "Número incompleto. Debe incluir código de país y tu número móvil completo (mínimo 10 dígitos, ej: +54 9 11 1234 5678 o +56 9 1234 5678).";
        }
        if (digitsOnly.length > 15) {
            return "El número es demasiado largo (máximo 15 dígitos según estándar internacional).";
        }

        // Bloqueo de números falsos o repetidos
        if (/^(\d)\1+$/.test(digitsOnly)) {
            return "Por favor, ingresá un número de teléfono real.";
        }
        if ("0123456789012345".includes(digitsOnly) || "9876543210987654".includes(digitsOnly)) {
            return "Por favor, ingresá un número de teléfono real.";
        }

        // Validaciones específicas por país:
        // Chile (+56): Móviles tienen código 56 + 9 dígitos = 11 dígitos total (ej: +56 9 1234 5678).
        if (digitsOnly.startsWith("56")) {
            if (digitsOnly.length !== 11) {
                return `Para Chile (+56), el número móvil debe tener 9 dígitos después del código (ej: +56 9 1234 5678). Ingresaste ${digitsOnly.length - 2} dígitos.`;
            }
        }

        // Argentina (+54): WhatsApp requiere 549 + 10 dígitos (13 dígitos) o 54 + 10 dígitos (12 dígitos).
        if (digitsOnly.startsWith("54")) {
            if (digitsOnly.length < 12 || digitsOnly.length > 13) {
                return "Para Argentina (+54), incluí código de área y número sin el 15 (ej: +54 9 11 1234 5678).";
            }
        }

        // España (+34): Móviles tienen 34 + 9 dígitos = 11 dígitos total.
        if (digitsOnly.startsWith("34")) {
            if (digitsOnly.length !== 11) {
                return "Para España (+34), el número debe tener 9 dígitos después del código (ej: +34 612 345 678).";
            }
        }

        // México (+52): 52 + 10 dígitos = 12 dígitos (o 521 + 10 = 13 dígitos).
        if (digitsOnly.startsWith("52")) {
            if (digitsOnly.length < 12 || digitsOnly.length > 13) {
                return "Para México (+52), el número debe tener 10 dígitos después del código (ej: +52 55 1234 5678).";
            }
        }

        // Perú (+51): 51 + 9 dígitos = 11 dígitos total.
        if (digitsOnly.startsWith("51")) {
            if (digitsOnly.length !== 11) {
                return "Para Perú (+51), el número móvil debe tener 9 dígitos después del código (ej: +51 912 345 678).";
            }
        }

        // Colombia (+57): 57 + 10 dígitos = 12 dígitos total.
        if (digitsOnly.startsWith("57")) {
            if (digitsOnly.length !== 12) {
                return "Para Colombia (+57), el número debe tener 10 dígitos después del código (ej: +57 300 123 4567).";
            }
        }

        return null;
    }

    if (field === "email") {
        if (!val) return "Por favor, ingresá tu correo electrónico.";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(val)) {
            return "Ingresá un correo electrónico válido (ej: contacto@tuempresa.com o tu-email@gmail.com).";
        }

        const [userPart, domainPart] = val.toLowerCase().split("@");
        if (!domainPart || !domainPart.includes(".")) {
            return "El dominio del correo es inválido.";
        }

        if (FAKE_DOMAINS.has(domainPart)) {
            return `El dominio @${domainPart} no es válido. Ingresá tu correo real para poder enviarte el enlace de Google Meet.`;
        }

        if (["asdf", "test", "testing", "fake", "prueba", "none", "no", "admin", "null"].includes(userPart)) {
            return "Por favor, ingresá un correo corporativo o personal real.";
        }

        return null;
    }

    if (field === "industry") {
        if (!val) return "Por favor, contanos sobre tu empresa y a qué se dedica.";
        if (val.length < 12) {
            return "Por favor, danos un poco más de detalle sobre tu rubro y necesidades (mínimo 12 caracteres).";
        }
        const words = val.split(/\s+/).filter(Boolean);
        if (words.length < 3) {
            return "Por favor, describí brevemente tu negocio con al menos 3 o 4 palabras.";
        }
        return null;
    }

    return null;
};

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const getArgentinaNow = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Argentina/Buenos_Aires",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false
    });
    const parts = formatter.formatToParts(now);
    const dateParts = {};
    parts.forEach(({ type, value }) => {
        dateParts[type] = value;
    });
    return new Date(
        Number(dateParts.year),
        Number(dateParts.month) - 1,
        Number(dateParts.day),
        Number(dateParts.hour),
        Number(dateParts.minute),
        Number(dateParts.second)
    );
};

const isSlotTooEarly = (dayKey, timeStr) => {
    if (!dayKey || !timeStr) return true;
    const [year, month, day] = dayKey.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    const slotDate = new Date(year, month - 1, day, hours, minutes, 0);
    
    const argNow = getArgentinaNow();
    const minAllowedDate = new Date(argNow.getTime() + 2 * 60 * 60 * 1000); // Ahora + 2 horas
    
    return slotDate < minAllowedDate;
};

const formatDateLabel = (dateStr) => {
    const d = new Date(dateStr + 'T12:00:00');
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return d.toLocaleDateString('es-ES', options);
};

const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    
    let startDayOfWeek = firstDay.getDay(); // 0 for Sun, 1 for Mon, etc.
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1; // convert to Monday-start

    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
        days.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
        days.push(new Date(year, month, i));
    }
    return days;
};

const formatDateKey = (date) => {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

export default function Form({ onComplete }) {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({});

    // Slots & Calendar states
    const [slots, setSlots] = useState({});
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const getAvailableTimes = (dayKey) => {
        if (!slots[dayKey]) return [];
        return slots[dayKey].filter(timeStr => !isSlotTooEarly(dayKey, timeStr));
    };

    const current = steps[step];

    // Fetch slots when reaching the calendar step
    useEffect(() => {
        if (current && current.type === "calendar") {
            const today = new Date().toISOString().split('T')[0];
            setLoadingSlots(true);
            fetch(`https://apocrm-one.vercel.app/api/calendar/slots?start_date=${today}`)
                .then(res => res.json())
                .then(resData => {
                    if (resData.success && resData.data) {
                        setSlots(resData.data.available_slots || {});
                    }
                })
                .catch(err => console.error("Error fetching slots:", err))
                .finally(() => setLoadingSlots(false));
        }
    }, [step]);

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const val = e.target.value;
        setData(prev => ({ ...prev, [current.field]: val }));
        if (errorMessage) {
            const err = validateField(current.field, val);
            setErrorMessage(err || "");
        }
    };

    const nextStep = () => {
        setErrorMessage("");

        if (current.type === "calendar") {
            if (!data.date || !data.time) {
                setErrorMessage("Por favor, elegí un día y un horario disponible en el calendario.");
                return;
            }
        } else if (current.type === "select") {
            if (!data[current.field]) {
                setErrorMessage("Por favor, seleccioná una opción para continuar.");
                return;
            }
        } else {
            const error = validateField(current.field, data[current.field]);
            if (error) {
                setErrorMessage(error);
                return;
            }
        }
        
        if (step < steps.length - 1) {
            setStep(step + 1);
            setErrorMessage("");
        } else {
            console.log("LEAD QUALIFIED:", data);
            onComplete(data);
        }
    };

    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
            setErrorMessage("");
        }
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        const today = new Date();
        if (currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth()) return;
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const progress = ((step + 1) / steps.length) * 100;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(111,126,96,0.16),transparent_24%),linear-gradient(180deg,#070908_0%,#0b0f0c_100%)] p-3 md:p-6 selection:bg-[#8a9979] selection:text-[#0b0f0c]">
            <div className="w-full max-w-3xl relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-5 md:rounded-[36px] md:p-12">
                
                {/* PROGRESS BAR */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                    <div 
                        className="h-full bg-[#738261] transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* TOP HEADER: Back button and Step indicator */}
                <div className="mb-6 flex items-center justify-between gap-3 border-b border-white/8 pb-4">
                    {step > 0 ? (
                        <button 
                            type="button"
                            onClick={prevStep}
                            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#d6ded0] transition hover:bg-white/12 hover:text-white cursor-pointer"
                            aria-label="Paso anterior"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            <span>Atrás</span>
                        </button>
                    ) : (
                        <button 
                            type="button"
                            onClick={() => window.location.href = "/"}
                            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#d6ded0] transition hover:bg-white/12 hover:text-white cursor-pointer"
                            aria-label="Volver al inicio"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            <span>Inicio</span>
                        </button>
                    )}

                    <span className="rounded-full border border-[#7d8d6a]/30 bg-[#6f7d61]/15 px-3 py-1 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-[#c9d4bf]">
                        Paso {step + 1} de {steps.length}
                    </span>
                </div>

                <div className="mb-6 md:mb-8">
                   <h2 className="text-[1.65rem] md:text-4xl font-semibold tracking-[-0.04em] text-[#f3f5ef] leading-tight">
                        {current.question}
                    </h2>
                </div>

                <div className="mb-6 md:mb-8">
                    {current.field === "phone" && (
                        <div className="mb-3.5 text-left">
                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8e9984]">
                                Elegí tu país para autocompletar el código:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {countryPills.map(p => (
                                    <button
                                        key={p.label}
                                        type="button"
                                        onClick={() => {
                                            setData(prev => ({ ...prev, phone: p.code }));
                                            setErrorMessage("");
                                        }}
                                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-[#cdd5c6] transition hover:border-[#7b8c69]/50 hover:bg-[#6f7d61]/20 hover:text-white cursor-pointer"
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {current.type === "text" && (
                        <input
                            type="text"
                            placeholder={current.placeholder}
                            value={data[current.field] || ""}
                            onChange={handleChange}
                            onKeyDown={(e) => { if (e.key === "Enter") nextStep(); }}
                            autoFocus
                            className={`w-full rounded-[22px] border bg-black/20 px-4 py-3.5 text-lg font-semibold text-[#f3f5ef] outline-none transition placeholder:text-[#7f8978] md:px-5 md:py-4 md:text-2xl ${
                                errorMessage ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-[#7b8c69]/45 focus:bg-[#0f130f]"
                            }`}
                        />
                    )}

                    {current.type === "email" && (
                        <input
                            type="email"
                            placeholder={current.placeholder}
                            value={data[current.field] || ""}
                            onChange={handleChange}
                            onKeyDown={(e) => { if (e.key === "Enter") nextStep(); }}
                            autoFocus
                            className={`w-full rounded-[22px] border bg-black/20 px-4 py-3.5 text-lg font-semibold text-[#f3f5ef] outline-none transition placeholder:text-[#7f8978] md:px-5 md:py-4 md:text-2xl ${
                                errorMessage ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-[#7b8c69]/45 focus:bg-[#0f130f]"
                            }`}
                        />
                    )}

                    {current.type === "textarea" && (
                        <textarea
                            placeholder={current.placeholder}
                            value={data[current.field] || ""}
                            onChange={handleChange}
                            autoFocus
                            className={`w-full min-h-[120px] resize-none rounded-[22px] border bg-black/20 px-4 py-3.5 text-lg font-semibold text-[#f3f5ef] outline-none transition placeholder:text-[#7f8978] md:min-h-[140px] md:px-5 md:py-4 md:text-2xl ${
                                errorMessage ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-[#7b8c69]/45 focus:bg-[#0f130f]"
                            }`}
                        />
                    )}

                    {/* Alerta de validación en tiempo real */}
                    {errorMessage && (
                        <div className="mt-3.5 flex items-start gap-2.5 rounded-2xl border border-red-500/35 bg-red-500/12 p-3.5 text-xs md:text-sm font-medium text-red-200 shadow-sm text-left">
                            <span className="text-base select-none shrink-0 leading-none mt-0.5">⚠️</span>
                            <p className="leading-snug">{errorMessage}</p>
                        </div>
                    )}

                    {/* Texto de ayuda contextual cuando no hay error */}
                    {!errorMessage && current.helper && (
                        <p className="mt-2.5 text-xs text-[#8e9c82] leading-normal text-left">
                            💡 {current.helper}
                        </p>
                    )}

                    {current.type === "select" && (
                        <div className="grid gap-3">
                            {current.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setData({ ...data, [current.field]: opt });
                                        setTimeout(nextStep, 200);
                                    }}
                                    className={`text-left p-3.5 rounded-[20px] border transition-all font-semibold text-sm leading-6 md:p-4 md:text-lg cursor-pointer ${
                                        data[current.field] === opt 
                                        ? "bg-[#6f7d61]/16 text-white border-[#7b8c69]/35" 
                                        : "bg-white/4 text-[#d8dfcf] border-white/10 hover:border-white/16"
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="mt-2 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#8ea080] hover:text-white transition cursor-pointer py-1"
                                >
                                    ← Volver al paso anterior
                                </button>
                            )}
                        </div>
                    )}

                    {current.type === "calendar" && (
                        <div>
                            {loadingSlots ? (
                                    <div className="flex flex-col items-center justify-center py-12">
                                    <div className="w-12 h-12 border-4 border-[#7b8c69]/30 border-t-[#dce4d2] rounded-full animate-spin mb-4"></div>
                                    <p className="text-[#d8dfcf] font-semibold text-center">Buscando disponibilidad en tiempo real...</p>
                                </div>
                            ) : Object.keys(slots).length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-red-300 font-semibold mb-4">No hay turnos disponibles configurados.</p>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            const today = new Date().toISOString().split('T')[0];
                                            setLoadingSlots(true);
                                            fetch(`https://apocrm-one.vercel.app/api/calendar/slots?start_date=${today}`)
                                                .then(res => res.json())
                                                .then(resData => {
                                                    if (resData.success && resData.data) {
                                                        setSlots(resData.data.available_slots || {});
                                                    }
                                                })
                                                .catch(err => console.error("Error:", err))
                                                .finally(() => setLoadingSlots(false));
                                        }}
                                        className="bg-[#6f7d61] text-white px-6 py-3 rounded-full font-semibold uppercase tracking-[0.18em] cursor-pointer transition-all hover:opacity-90 active:scale-95"
                                    >
                                        Reintentar
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    {/* ALERTA DE ZONA HORARIA */}
                                    <div className="bg-white/5 border border-white/10 rounded-[20px] p-3 mb-5 flex items-center gap-3 shadow-sm text-left animate-fade-in md:rounded-[24px] md:p-4 md:mb-6 md:gap-3.5">
                                        <span className="text-2xl animate-bounce select-none">🇦🇷</span>
                                        <div>
                                            <h5 className="text-[10px] font-semibold text-[#dce3d3] uppercase tracking-[0.2em] mb-0.5 md:text-xs md:tracking-[0.22em]">Zona Horaria: Argentina (GMT-3)</h5>
                                            <p className="text-xs text-[#aeb7a6] font-medium leading-normal">
                                                Todos los horarios se muestran en hora de Argentina. Por favor, ten en cuenta la diferencia horaria si te encuentras en otro país.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
                                        {/* CALENDAR MONTH GRID */}
                                        <div className="bg-black/18 p-3 rounded-[20px] border border-white/10 shadow-sm md:p-4 md:rounded-[24px]">
                                            <div className="flex items-center justify-between mb-4">
                                                <button 
                                                    type="button"
                                                    onClick={prevMonth}
                                                    className="rounded-lg px-2.5 py-1 text-[#d7ddd0] hover:bg-white/6 transition-colors cursor-pointer font-semibold"
                                                >
                                                    &larr;
                                                </button>
                                                <h4 className="font-semibold text-[#f3f5ef] text-xs md:text-base capitalize">
                                                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                                </h4>
                                                <button 
                                                    type="button"
                                                    onClick={nextMonth}
                                                    className="rounded-lg px-2.5 py-1 text-[#d7ddd0] hover:bg-white/6 transition-colors cursor-pointer font-semibold"
                                                >
                                                    &rarr;
                                                </button>
                                            </div>

                                            {/* Weekdays Header */}
                                            <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-semibold text-[#7f8978] uppercase mb-2 md:text-[10px]">
                                                {weekDays.map(d => <div key={d}>{d}</div>)}
                                            </div>

                                            {/* Days Grid */}
                                            <div className="grid grid-cols-7 gap-1">
                                                {getDaysInMonth(currentMonth).map((day, index) => {
                                                    if (!day) {
                                                        return <div key={`empty-${index}`} className="aspect-square"></div>;
                                                    }
                                                    const dayKey = formatDateKey(day);
                                                    const daySlots = getAvailableTimes(dayKey);
                                                    const hasSlots = daySlots.length > 0;
                                                    const isSelected = selectedDate === dayKey;
                                                    
                                                    return (
                                                        <button
                                                            key={dayKey}
                                                            type="button"
                                                            disabled={!hasSlots}
                                                            onClick={() => {
                                                                setSelectedDate(dayKey);
                                                                setSelectedTime("");
                                                                setData(d => ({ ...d, date: dayKey, time: "" }));
                                                            }}
                                                            className={`aspect-square w-full rounded-xl text-[10px] md:text-sm font-bold flex flex-col items-center justify-center relative transition-all ${
                                                                isSelected
                                                                ? "bg-[#6f7d61] text-white shadow-md shadow-[#435B47]/20 scale-105"
                                                                : hasSlots
                                                                ? "bg-white/6 text-[#d8dfcf] hover:bg-white/10 cursor-pointer"
                                                                : "text-white/10 cursor-not-allowed"
                                                            }`}
                                                        >
                                                            <span>{day.getDate()}</span>
                                                            {hasSlots && !isSelected && (
                                                                <span className="w-1 h-1 rounded-full bg-[#91a082] absolute bottom-1"></span>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* TIME SLOTS PANEL */}
                                        <div className="bg-white/4 p-3 rounded-[20px] border border-white/10 min-h-[220px] flex flex-col justify-between md:p-4 md:rounded-[24px] md:min-h-[260px]">
                                            <div className="w-full">
                                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8e9984] mb-3 text-left">
                                                    {selectedDate ? `Horarios para el ${formatDateLabel(selectedDate)}` : "Seleccioná un día"}
                                                </p>
                                                
                                                {selectedDate ? (
                                                    getAvailableTimes(selectedDate).length > 0 ? (
                                                        <div className="grid grid-cols-2 gap-2 max-h-[190px] overflow-y-auto pr-1">
                                                            {getAvailableTimes(selectedDate).map(timeStr => {
                                                                const isSelected = selectedTime === timeStr;
                                                                return (
                                                                    <button
                                                                        key={timeStr}
                                                                        type="button"
                                                                         onClick={() => {
                                                                            setSelectedTime(timeStr);
                                                                            setData(d => ({ ...d, time: timeStr }));
                                                                            setErrorMessage("");
                                                                        }}
                                                                        className={`py-2.5 rounded-2xl border font-semibold text-[10px] md:py-3 md:text-sm transition-all text-center cursor-pointer ${
                                                                            isSelected 
                                                                            ? "bg-[#6f7d61] text-white border-[#7b8c69]/35" 
                                                                            : "bg-white/5 text-[#dce3d3] border-white/10 hover:border-white/16"
                                                                        }`}
                                                                    >
                                                                        {timeStr} hs
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm font-medium text-red-300 text-left">No hay horarios disponibles.</p>
                                                    )
                                                ) : (
                                                    <div className="text-center py-8">
                                                        <p className="text-xs md:text-sm font-semibold text-[#aab3a0]">Hacé clic en un día destacado del calendario para ver los horarios disponibles.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {errorMessage && (
                                <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-red-500/35 bg-red-500/12 p-3.5 text-xs md:text-sm font-medium text-red-200 shadow-sm text-left">
                                    <span className="text-base select-none shrink-0 leading-none mt-0.5">⚠️</span>
                                    <p className="leading-snug">{errorMessage}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {current.type !== "select" && (
                    <div className="flex items-center gap-3">
                        {step > 0 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="rounded-[20px] md:rounded-full border border-white/12 bg-white/6 px-5 py-3 md:px-8 md:py-5 text-[11px] md:text-lg font-semibold uppercase tracking-[0.14em] text-[#d6ded0] transition hover:bg-white/12 hover:text-white cursor-pointer shrink-0"
                            >
                                ← Atrás
                            </button>
                        )}
                        <button
                            onClick={nextStep}
                            className="bg-[#6f7d61] text-white px-5 py-3 rounded-[20px] flex-1 text-[11px] md:px-10 md:py-5 md:rounded-full md:text-xl font-semibold uppercase tracking-[0.12em] md:tracking-[0.18em] hover:scale-[1.01] transition-transform shadow-xl shadow-[#435B47]/20 cursor-pointer"
                        >
                            {step === steps.length - 1 ? "CONFIRMAR Y AGENDAR CITA →" : "CONTINUAR →"}
                        </button>
                    </div>
                )}

                <p className="text-[10px] mt-6 md:mt-8 text-[#91a082] font-semibold uppercase tracking-[0.14em] md:tracking-[0.18em] text-center">
                    Tus datos se usan solo para preparar la reunión y evaluar tu caso con criterio.
                </p>

            </div>
        </div>
    );
}
