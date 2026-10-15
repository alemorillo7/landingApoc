import React, { useState, useEffect } from "react";

const steps = [
    {
        question: "Tu nombre y apellido completos",
        field: "name",
        label: "Nombre",
        type: "text",
        placeholder: "Ej: Horacio López",
        helper: "Para saber con quién vamos a reunirnos en la sesión estratégica."
    },
    {
        question: "Tu número de WhatsApp con código de país",
        field: "phone",
        label: "WhatsApp",
        type: "text",
        placeholder: "+54 9 11 1234 5678 o +56 9 1234 5678",
        helper: "Te enviaremos la confirmación directa y el enlace por WhatsApp antes de la reunión."
    },
    {
        question: "Tu correo electrónico corporativo o personal",
        field: "email",
        label: "Correo",
        type: "email",
        placeholder: "nombre@gmail.com o gerencia@tumarca.com",
        helper: "Te llegará la invitación formal de Google Meet y los detalles de la sesión."
    },
    {
        question: "Nombre de tu empresa y qué procesos necesitan resolver",
        field: "industry",
        label: "Empresa y procesos",
        type: "textarea",
        placeholder: "Ej: Somos una ferretería con 8 empleados y queremos automatizar respuestas de WhatsApp, pedidos y control de stock...",
        helper: "Nos permite estudiar tu caso antes de la llamada y presentarte soluciones específicas de tu rubro."
    },
    {
        question: "¿Cuánto estás dispuesto a invertir en tu software o plataforma?",
        field: "budget",
        label: "Inversión",
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
        label: "Urgencia",
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
        label: "Día y horario",
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

const FORBIDDEN_DOMAIN_KEYWORDS = [
    "tuempresa",
    "miempresa",
    "empresa",
    "tudominio",
    "midominio",
    "dominio",
    "tucorreo",
    "micorreo",
    "yourcompany",
    "mycompany",
    "yourdomain",
    "example",
    "ejemplo",
    "test",
    "prueba",
    "fake",
    "dummy",
    "sample",
    "correo",
    "mailinator",
    "tempmail",
    "10minutemail",
    "yopmail",
    "dispostable",
    "trashmail",
    "guerrillamail",
    "sharklasers",
    "getairmail",
    "mytemp",
];

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
            return "Ingresá un correo electrónico válido (ej: nombre@gmail.com o contacto@tumarca.com).";
        }

        const [userPart, domainPart] = val.toLowerCase().split("@");
        if (!domainPart || !domainPart.includes(".")) {
            return "El dominio del correo es inválido.";
        }

        // Bloqueo si el dominio coincide con la lista negra o contiene palabras clave de ejemplo (tuempresa, empresa, ejemplo, test, etc.)
        if (
            FAKE_DOMAINS.has(domainPart) ||
            FORBIDDEN_DOMAIN_KEYWORDS.some(keyword => domainPart.includes(keyword))
        ) {
            return `El dominio @${domainPart} no es válido. Por favor ingresá un correo corporativo o personal real (ej: tu-nombre@gmail.com).`;
        }

        // Bloqueo de usuarios ficticios comunes
        const FAKE_USERS = [
            "asdf", "test", "testing", "fake", "prueba", "none", "no", "admin", "null",
            "pedrito", "pepito", "fulano", "mengano", "juanito", "usuario", "user", "demo", "xxx"
        ];
        if (FAKE_USERS.includes(userPart)) {
            return "Por favor ingresá un correo personal o corporativo real para recibir el enlace de la reunión.";
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

    const retrySlots = () => {
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
    };

    const inputClass = `w-full rounded-lg border bg-white px-4 py-3.5 text-[17px] font-medium text-tinta outline-none transition-[border-color,box-shadow] duration-150 placeholder:font-normal placeholder:text-[#959d97] md:px-5 md:py-4 md:text-xl ${
        errorMessage
            ? "border-alerta focus:shadow-[0_0_0_3px_rgba(179,65,47,0.14)]"
            : "border-linea focus:border-verde focus:shadow-[0_0_0_3px_rgba(67,91,71,0.16)]"
    }`;

    const isLastStep = step === steps.length - 1;

    return (
        <div className="min-h-screen bg-niebla text-tinta lg:grid lg:grid-cols-[minmax(360px,0.82fr)_1.18fr] selection:bg-verde-300 selection:text-tinta">

            {/* PANEL LATERAL (desktop): marca, eslogan y recorrido de pasos */}
            <aside className="relative hidden overflow-hidden bg-grafito text-white lg:flex lg:min-h-screen lg:flex-col lg:justify-between lg:px-12 lg:py-12 xl:px-16">
                <div className="blueprint pointer-events-none absolute inset-0" aria-hidden="true" />

                <div className="relative">
                    <a href="/" className="inline-flex flex-col leading-none" aria-label="APOC Automation, volver al inicio">
                        <span className="font-display text-[22px]">APOC</span>
                        <span className="wordmark-sub mt-1 text-[8.5px] text-verde-300">AUTOMATION</span>
                    </a>

                    <p className="font-display mt-14 max-w-sm text-[2.15rem] leading-[1.06] xl:text-[2.5rem]">
                        Lo que tenés en la cabeza, lo ponemos en un sistema.
                    </p>
                    <p className="mt-5 max-w-sm text-[15.5px] leading-7 text-gris-claro">
                        Agendá una reunión estratégica con el equipo técnico de APOC. Revisamos tu operación y te proponemos el sistema que tu empresa necesita.
                    </p>

                    <ol className="mt-10 space-y-1">
                        {steps.map((s, i) => {
                            const done = i < step;
                            const active = i === step;
                            return (
                                <li key={s.field} className="flex items-center gap-3.5 py-1.5" aria-current={active ? "step" : undefined}>
                                    <span
                                        className={`tabular flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12.5px] font-semibold transition-colors duration-200 ${
                                            done
                                                ? "bg-verde text-white"
                                                : active
                                                ? "bg-white text-tinta"
                                                : "border border-white/15 text-gris-claro"
                                        }`}
                                    >
                                        {done ? <CheckMark /> : i + 1}
                                    </span>
                                    <span className={`text-[15px] transition-colors duration-200 ${active ? "font-semibold text-white" : done ? "text-white/80" : "text-gris-claro"}`}>
                                        {s.label}
                                    </span>
                                </li>
                            );
                        })}
                    </ol>
                </div>

                <ul className="relative mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 text-[13px]">
                    {[
                        ["Sin costo", "Diagnóstico estratégico"],
                        ["30 minutos", "Por Google Meet"],
                        ["Equipo técnico", "Sin intermediarios"],
                    ].map(([title, sub]) => (
                        <li key={title} className="bg-grafito px-3.5 py-3">
                            <p className="font-semibold text-white">{title}</p>
                            <p className="mt-0.5 text-gris-claro">{sub}</p>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* ÁREA DEL FORMULARIO */}
            <main className="on-light flex min-h-screen flex-col">
                {/* Barra superior mobile con marca */}
                <div className="flex items-center justify-between bg-grafito px-4 py-3.5 lg:hidden">
                    <a href="/" className="inline-flex flex-col leading-none" aria-label="APOC Automation, volver al inicio">
                        <span className="font-display text-[19px] text-white">APOC</span>
                        <span className="wordmark-sub mt-1 text-[7.5px] text-verde-300">AUTOMATION</span>
                    </a>
                    <span className="text-[13px] text-gris-claro">Reunión estratégica gratuita</span>
                </div>

                {/* Progreso */}
                <div className="h-1 w-full bg-linea" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1} aria-label="Progreso del formulario">
                    <div className="h-full bg-verde transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
                </div>

                <div className="flex flex-1 items-start justify-center px-4 py-8 sm:px-8 md:py-14 lg:items-center lg:px-14">
                    <div className="w-full max-w-2xl">

                        {/* Encabezado: volver + indicador de paso */}
                        <div className="mb-8 flex items-center justify-between gap-3">
                            {step > 0 ? (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="btn-press -ml-3 inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-[14px] font-semibold text-gris hover:bg-tinta/5 hover:text-tinta cursor-pointer"
                                    aria-label="Paso anterior"
                                >
                                    <ArrowLeft />
                                    <span>Atrás</span>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => window.location.href = "/"}
                                    className="btn-press -ml-3 inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-[14px] font-semibold text-gris hover:bg-tinta/5 hover:text-tinta cursor-pointer"
                                    aria-label="Volver al inicio"
                                >
                                    <ArrowLeft />
                                    <span>Inicio</span>
                                </button>
                            )}

                            <span className="tabular text-[14px] font-medium text-gris">
                                Paso <strong className="font-semibold text-tinta">{step + 1}</strong> de {steps.length}
                                <span className="text-gris lg:hidden">: {current.label}</span>
                            </span>
                        </div>

                        <h2 className="font-display text-[1.75rem] leading-[1.12] text-tinta md:text-[2.4rem]">
                            {current.question}
                        </h2>

                        <div className="mt-7 md:mt-8">
                            {current.field === "phone" && (
                                <div className="mb-4">
                                    <p className="mb-2.5 text-[14px] font-medium text-gris">
                                        Elegí tu país para autocompletar el código:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {countryPills.map(p => {
                                            const selected = (data.phone || "").startsWith(p.code.trim());
                                            return (
                                                <button
                                                    key={p.label}
                                                    type="button"
                                                    onClick={() => {
                                                        setData(prev => ({ ...prev, phone: p.code }));
                                                        setErrorMessage("");
                                                    }}
                                                    className={`btn-press min-h-10 rounded-lg border px-3 text-[14px] font-medium cursor-pointer ${
                                                        selected
                                                            ? "border-verde bg-verde-100 text-verde-700"
                                                            : "border-linea bg-white text-tinta hover:border-verde/50"
                                                    }`}
                                                >
                                                    {p.label}
                                                </button>
                                            );
                                        })}
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
                                    aria-invalid={Boolean(errorMessage)}
                                    aria-label={current.question}
                                    className={inputClass}
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
                                    aria-invalid={Boolean(errorMessage)}
                                    aria-label={current.question}
                                    className={inputClass}
                                />
                            )}

                            {current.type === "textarea" && (
                                <textarea
                                    placeholder={current.placeholder}
                                    value={data[current.field] || ""}
                                    onChange={handleChange}
                                    autoFocus
                                    aria-invalid={Boolean(errorMessage)}
                                    aria-label={current.question}
                                    className={`${inputClass} min-h-[140px] resize-none leading-relaxed md:min-h-[160px]`}
                                />
                            )}

                            {/* Alerta de validación en tiempo real */}
                            {errorMessage && current.type !== "calendar" && current.type !== "select" && <FieldError message={errorMessage} />}

                            {/* Texto de ayuda contextual cuando no hay error */}
                            {!errorMessage && current.helper && (
                                <p className="mt-3 flex items-start gap-2 text-[14px] leading-6 text-gris">
                                    <InfoIcon />
                                    <span>{current.helper}</span>
                                </p>
                            )}

                            {current.type === "select" && (
                                <div className="grid gap-3" role="radiogroup" aria-label={current.question}>
                                    {current.options.map((opt, i) => {
                                        const selected = data[current.field] === opt;
                                        return (
                                            <button
                                                key={i}
                                                type="button"
                                                role="radio"
                                                aria-checked={selected}
                                                onClick={() => {
                                                    // Avanza con la opción recién elegida (evita leer el estado viejo
                                                    // y que el primer clic muestre "seleccioná una opción").
                                                    const fromStep = step;
                                                    setData(prev => ({ ...prev, [current.field]: opt }));
                                                    setErrorMessage("");
                                                    setTimeout(() => {
                                                        setStep(s => (s === fromStep && s < steps.length - 1 ? s + 1 : s));
                                                    }, 200);
                                                }}
                                                className={`btn-press flex min-h-14 items-center gap-4 rounded-lg border px-4 py-3.5 text-left text-[16px] font-medium leading-6 cursor-pointer md:px-5 md:text-[17px] ${
                                                    selected
                                                        ? "border-verde bg-verde-100 text-tinta shadow-[0_0_0_1px_var(--color-verde)]"
                                                        : "border-linea bg-white text-tinta hover:border-verde/50"
                                                }`}
                                            >
                                                <span
                                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150 ${
                                                        selected ? "border-verde" : "border-[#b9c0ba]"
                                                    }`}
                                                    aria-hidden="true"
                                                >
                                                    {selected && <span className="h-2.5 w-2.5 rounded-full bg-verde" />}
                                                </span>
                                                {opt}
                                            </button>
                                        );
                                    })}
                                    {errorMessage && <FieldError message={errorMessage} />}
                                    {step > 0 && (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="mt-1 inline-flex min-h-10 w-fit items-center gap-2 text-[14px] font-semibold text-gris hover:text-tinta cursor-pointer"
                                        >
                                            <ArrowLeft />
                                            Volver al paso anterior
                                        </button>
                                    )}
                                </div>
                            )}

                            {current.type === "calendar" && (
                                <div>
                                    {loadingSlots ? (
                                        <div className="flex flex-col items-center justify-center rounded-xl border border-linea bg-white py-14">
                                            <div className="mb-4 h-10 w-10 animate-spin rounded-full border-[3px] border-verde/20 border-t-verde"></div>
                                            <p className="text-center text-[15px] font-medium text-tinta">Buscando disponibilidad en tiempo real...</p>
                                        </div>
                                    ) : Object.keys(slots).length === 0 ? (
                                        <div className="rounded-xl border border-linea bg-white px-6 py-10 text-center">
                                            <p className="mb-5 text-[15px] font-medium text-alerta">No hay turnos disponibles configurados.</p>
                                            <button
                                                type="button"
                                                onClick={retrySlots}
                                                className="btn-press min-h-12 rounded-lg bg-verde px-6 text-[15px] font-semibold text-white hover:bg-verde-500 cursor-pointer"
                                            >
                                                Reintentar
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            {/* ZONA HORARIA */}
                                            <div className="mb-5 flex items-start gap-3 rounded-lg border border-verde/20 bg-verde-100/60 p-3.5 md:p-4">
                                                <ClockIcon />
                                                <div>
                                                    <p className="text-[14px] font-semibold text-tinta">Zona horaria: Argentina (GMT-3)</p>
                                                    <p className="mt-0.5 text-[13.5px] leading-normal text-gris">
                                                        Todos los horarios se muestran en hora de Argentina. Por favor, tené en cuenta la diferencia horaria si te encontrás en otro país.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-5">
                                                {/* CALENDARIO MENSUAL */}
                                                <div className="card-light rounded-xl p-3.5 md:p-4">
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <button
                                                            type="button"
                                                            onClick={prevMonth}
                                                            className="flex h-10 w-10 items-center justify-center rounded-lg text-tinta hover:bg-niebla cursor-pointer"
                                                            aria-label="Mes anterior"
                                                        >
                                                            <ArrowLeft />
                                                        </button>
                                                        <h4 className="text-[15px] font-semibold capitalize text-tinta md:text-base">
                                                            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                                        </h4>
                                                        <button
                                                            type="button"
                                                            onClick={nextMonth}
                                                            className="flex h-10 w-10 items-center justify-center rounded-lg text-tinta hover:bg-niebla cursor-pointer"
                                                            aria-label="Mes siguiente"
                                                        >
                                                            <ArrowLeft className="rotate-180" />
                                                        </button>
                                                    </div>

                                                    <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11.5px] font-medium text-gris">
                                                        {weekDays.map(d => <div key={d}>{d}</div>)}
                                                    </div>

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
                                                                    aria-pressed={isSelected}
                                                                    onClick={() => {
                                                                        setSelectedDate(dayKey);
                                                                        setSelectedTime("");
                                                                        setData(d => ({ ...d, date: dayKey, time: "" }));
                                                                    }}
                                                                    className={`tabular relative flex aspect-square w-full items-center justify-center rounded-md text-[13px] font-semibold transition-colors duration-150 md:text-[14px] ${
                                                                        isSelected
                                                                            ? "bg-verde text-white"
                                                                            : hasSlots
                                                                            ? "bg-verde-100 text-verde-700 hover:bg-verde-300/60 cursor-pointer"
                                                                            : "cursor-not-allowed text-tinta/25"
                                                                    }`}
                                                                >
                                                                    {day.getDate()}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* HORARIOS */}
                                                <div className="card-light flex min-h-[220px] flex-col rounded-xl p-3.5 md:min-h-[300px] md:p-4">
                                                    <p className="mb-3 text-[14px] font-semibold text-tinta">
                                                        {selectedDate ? `Horarios para el ${formatDateLabel(selectedDate)}` : "Seleccioná un día"}
                                                    </p>

                                                    {selectedDate ? (
                                                        getAvailableTimes(selectedDate).length > 0 ? (
                                                            <div className="grid max-h-[236px] grid-cols-2 gap-2 overflow-y-auto pr-1">
                                                                {getAvailableTimes(selectedDate).map(timeStr => {
                                                                    const isSelected = selectedTime === timeStr;
                                                                    return (
                                                                        <button
                                                                            key={timeStr}
                                                                            type="button"
                                                                            aria-pressed={isSelected}
                                                                            onClick={() => {
                                                                                setSelectedTime(timeStr);
                                                                                setData(d => ({ ...d, time: timeStr }));
                                                                                setErrorMessage("");
                                                                            }}
                                                                            className={`btn-press tabular min-h-11 rounded-lg border text-center text-[14px] font-semibold cursor-pointer ${
                                                                                isSelected
                                                                                    ? "border-verde bg-verde text-white"
                                                                                    : "border-linea bg-white text-tinta hover:border-verde/50"
                                                                            }`}
                                                                        >
                                                                            {timeStr} hs
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        ) : (
                                                            <p className="text-[14px] font-medium text-alerta">No hay horarios disponibles.</p>
                                                        )
                                                    ) : (
                                                        <div className="flex flex-1 items-center justify-center px-4 text-center">
                                                            <p className="text-[14px] leading-6 text-gris">Hacé clic en un día destacado del calendario para ver los horarios disponibles.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {errorMessage && <FieldError message={errorMessage} />}
                                </div>
                            )}
                        </div>

                        {current.type !== "select" && (
                            <div className="mt-8 flex items-center gap-3">
                                {step > 0 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="btn-press min-h-13 shrink-0 rounded-lg border border-tinta/15 bg-white px-5 text-[15px] font-semibold text-tinta hover:border-tinta/30 cursor-pointer md:px-7"
                                    >
                                        Atrás
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="btn-press min-h-13 flex-1 rounded-lg bg-verde px-5 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_12px_28px_-14px_rgba(67,91,71,0.95)] hover:bg-verde-500 cursor-pointer md:text-[16px]"
                                >
                                    {isLastStep ? "Confirmar y agendar cita" : "Continuar"}
                                </button>
                            </div>
                        )}

                        <p className="mt-8 flex items-center gap-2 text-[13px] text-gris">
                            <LockIcon />
                            Tus datos se usan solo para preparar la reunión y evaluar tu caso con criterio.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

function FieldError({ message }) {
    return (
        <div role="alert" className="mt-3 flex items-start gap-2.5 rounded-lg border border-alerta/25 bg-[#fbefec] p-3.5 text-left text-[14px] font-medium text-[#8f3122]">
            <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.25 6a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0V6zM10 14.75a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <p className="leading-snug">{message}</p>
        </div>
    );
}

function ArrowLeft({ className = "" }) {
    return (
        <svg viewBox="0 0 20 20" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12.5 15L7.5 10l5-5" />
        </svg>
    );
}

function CheckMark() {
    return (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5l3 3 6-7" />
        </svg>
    );
}

function InfoIcon() {
    return (
        <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-verde" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <circle cx="10" cy="10" r="7.25" />
            <path strokeLinecap="round" d="M10 9v4.5M10 6.5v.01" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-verde" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <circle cx="10" cy="10" r="7.25" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6v4l2.5 1.5" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-verde" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <rect x="4" y="9" width="12" height="8" rx="1.5" />
            <path d="M7 9V6.5a3 3 0 016 0V9" />
        </svg>
    );
}
