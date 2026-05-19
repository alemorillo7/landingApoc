import React, { useState, useEffect } from "react";

const steps = [
    {
        question: "¿A qué se dedica tu empresa?",
        field: "industry",
        type: "text",
        placeholder: "Ej: Agencia de marketing, Constructora..."
    },
    {
        question: "¿Cuál es el proceso manual que más tiempo les quita hoy?",
        field: "problem",
        type: "textarea",
        placeholder: "Describe brevemente tu mayor cuello de botella..."
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
        question: "¿Nivel de facturación mensual aproximado?",
        field: "revenue",
        type: "select",
        options: [
            "Más de USD 20.000/mes",
            "Entre USD 10.000 y 20.000/mes",
            "Entre USD 3.000 y 10.000/mes",
            "Menos de USD 3.000/mes",
        ],
    },
    {
        question: "¿Cuál sería el presupuesto estimado para este proyecto?",
        field: "budget",
        type: "select",
        options: [
            "Más de USD 15.000",
            "USD 7.000 - 15.000",
            "USD 3.000 - 7.000",
            "Menos de USD 3.000",
        ],
    },
    {
        question: "Dejanos tu email corporativo para enviarte el diagnóstico previo",
        field: "email",
        type: "email",
        placeholder: "nombre@empresa.com"
    },
    {
        question: "Dejanos tu número de WhatsApp (opcional)",
        field: "phone",
        type: "text",
        placeholder: "+54 9 11 ...",
        optional: true
    },
    {
        question: "Elige el día y la hora para tu diagnóstico en vivo",
        field: "appointment",
        type: "calendar"
    }
];

const formatDateLabel = (dateStr) => {
    const d = new Date(dateStr + 'T12:00:00');
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return d.toLocaleDateString('es-ES', options);
};

export default function Form({ onComplete }) {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({});

    // Slots & Calendar states
    const [slots, setSlots] = useState({});
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const current = steps[step];

    // Fetch slots when reaching the calendar step
    useEffect(() => {
        if (current && current.type === "calendar") {
            const today = new Date().toISOString().split('T')[0];
            setLoadingSlots(true);
            fetch(`https://apoc-crm.vercel.app/api/calendar/slots?start_date=${today}`)
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

    const handleChange = (e) => {
        setData({ ...data, [current.field]: e.target.value });
    };

    const nextStep = () => {
        if (current.type === "calendar") {
            if (!data.date || !data.time) return alert("Por favor, selecciona un día y un horario.");
        } else {
            if (!current.optional && !data[current.field] && current.type !== "select") {
                return alert("Por favor, completa este campo.");
            }
        }
        
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            console.log("LEAD QUALIFIED:", data);
            onComplete(data);
        }
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const progress = ((step + 1) / steps.length) * 100;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#435B47] p-6 selection:bg-white selection:text-[#435B47]">
            <div className="bg-[#F5F7F6] p-10 md:p-16 rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] max-w-2xl w-full relative overflow-hidden">
                
                {/* PROGRESS BAR */}
                <div className="absolute top-0 left-0 w-full h-2 bg-black/5">
                    <div 
                        className="h-full bg-[#435B47] transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="mb-12 relative">
                   {step > 0 && (
                       <button 
                        onClick={prevStep}
                        className="absolute -top-10 left-0 text-[#435B47]/40 hover:text-[#435B47] font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1"
                       >
                         ← Volver
                       </button>
                   )}
                   <h3 className="text-[#435B47]/40 uppercase tracking-widest font-black text-xs mb-4">Paso {step + 1} de {steps.length}</h3>
                   <h2 className="text-3xl md:text-4xl font-black text-[#435B47] leading-tight">
                        {current.question}
                    </h2>
                </div>

                <div className="mb-10">
                    {current.type === "text" && (
                        <input
                            type="text"
                            placeholder={current.placeholder}
                            value={data[current.field] || ""}
                            onChange={handleChange}
                            autoFocus
                            className="w-full bg-transparent border-b-4 border-[#435B47] py-4 text-2xl font-bold focus:outline-none placeholder:opacity-20"
                        />
                    )}

                    {current.type === "email" && (
                        <input
                            type="email"
                            placeholder={current.placeholder}
                            value={data[current.field] || ""}
                            onChange={handleChange}
                            autoFocus
                            className="w-full bg-transparent border-b-4 border-[#435B47] py-4 text-2xl font-bold focus:outline-none placeholder:opacity-20"
                        />
                    )}

                    {current.type === "textarea" && (
                        <textarea
                            placeholder={current.placeholder}
                            value={data[current.field] || ""}
                            onChange={handleChange}
                            autoFocus
                            className="w-full bg-transparent border-b-4 border-[#435B47] py-4 text-2xl font-bold focus:outline-none min-h-[120px] resize-none placeholder:opacity-20"
                        />
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
                                    className={`text-left p-5 rounded-xl border-2 transition-all font-bold text-lg ${
                                        data[current.field] === opt 
                                        ? "bg-[#435B47] text-white border-[#435B47]" 
                                        : "bg-white border-[#435B47]/10 hover:border-[#435B47]"
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}

                    {current.type === "calendar" && (
                        <div>
                            {loadingSlots ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="w-12 h-12 border-4 border-[#435B47] border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="text-[#435B47] font-bold text-center">Buscando disponibilidad en tiempo real...</p>
                                </div>
                            ) : Object.keys(slots).length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-red-500 font-bold mb-4">No hay turnos disponibles configurados.</p>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            const today = new Date().toISOString().split('T')[0];
                                            setLoadingSlots(true);
                                            fetch(`https://apoc-crm.vercel.app/api/calendar/slots?start_date=${today}`)
                                                .then(res => res.json())
                                                .then(resData => {
                                                    if (resData.success && resData.data) {
                                                        setSlots(resData.data.available_slots || {});
                                                    }
                                                })
                                                .catch(err => console.error("Error:", err))
                                                .finally(() => setLoadingSlots(false));
                                        }}
                                        className="bg-[#435B47] text-white px-6 py-3 rounded-xl font-bold cursor-pointer transition-all hover:opacity-90 active:scale-95"
                                    >
                                        Reintentar
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* SELECT DATE */}
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-wider text-[#435B47]/50 mb-3">1. Selecciona un Día</p>
                                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#435B47]/20">
                                            {Object.keys(slots)
                                                .filter(dateStr => {
                                                    // Only show days that have slots
                                                    return slots[dateStr] && slots[dateStr].length > 0;
                                                })
                                                .slice(0, 10) // Show next 10 available days
                                                .map(dateStr => {
                                                    const isSelected = selectedDate === dateStr;
                                                    return (
                                                        <button
                                                            key={dateStr}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedDate(dateStr);
                                                                setSelectedTime(""); // reset selected time
                                                                setData(d => ({ ...d, date: dateStr, time: "" }));
                                                            }}
                                                            className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all cursor-pointer ${
                                                                isSelected 
                                                                ? "bg-[#435B47] text-white border-[#435B47] scale-102" 
                                                                : "bg-white text-[#435B47] border-[#435B47]/10 hover:border-[#435B47]/40"
                                                            }`}
                                                        >
                                                            {formatDateLabel(dateStr)}
                                                        </button>
                                                    );
                                                })}
                                        </div>
                                    </div>

                                    {/* SELECT TIME */}
                                    {selectedDate ? (
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-wider text-[#435B47]/50 mb-3">2. Selecciona un Horario</p>
                                            {slots[selectedDate] && slots[selectedDate].length > 0 ? (
                                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[180px] overflow-y-auto pr-1">
                                                    {slots[selectedDate].map(timeStr => {
                                                        const isSelected = selectedTime === timeStr;
                                                        return (
                                                            <button
                                                                key={timeStr}
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedTime(timeStr);
                                                                    setData(d => ({ ...d, time: timeStr }));
                                                                }}
                                                                className={`py-3 rounded-lg border-2 font-bold text-sm transition-all text-center cursor-pointer ${
                                                                    isSelected 
                                                                    ? "bg-[#435B47] text-white border-[#435B47]" 
                                                                    : "bg-white text-[#435B47] border-[#435B47]/10 hover:border-[#435B47]/40"
                                                                }`}
                                                            >
                                                                {timeStr}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="text-sm font-medium text-red-500">No hay horarios disponibles para este día.</p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 bg-white/40 border border-[#435B47]/5 rounded-2xl">
                                            <p className="text-sm font-bold text-[#435B47]/60">Selecciona un día arriba para ver los horarios disponibles.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {current.type !== "select" && (
                    <button
                        onClick={nextStep}
                        className="bg-[#435B47] text-white px-10 py-5 rounded-2xl w-full text-xl font-black hover:scale-[1.02] transition-transform shadow-xl shadow-[#435B47]/20 cursor-pointer"
                    >
                        {step === steps.length - 1 ? "CONFIRMAR Y AGENDAR CITA →" : "CONTINUAR →"}
                    </button>
                )}

                <p className="text-xs mt-10 text-[#435B47]/40 font-bold uppercase tracking-tighter text-center">
                    Tus datos están seguros. Solo los usamos para preparar tu diagnóstico.
                </p>

            </div>
        </div>
    );
}