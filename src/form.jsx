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

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

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
        <div className="min-h-screen flex items-center justify-center bg-[#435B47] p-4 md:p-6 selection:bg-white selection:text-[#435B47]">
            <div className="bg-[#F5F7F6] p-6 md:p-12 rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] max-w-3xl w-full relative overflow-hidden">
                
                {/* PROGRESS BAR */}
                <div className="absolute top-0 left-0 w-full h-2 bg-black/5">
                    <div 
                        className="h-full bg-[#435B47] transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="mb-8 relative">
                   {step > 0 && (
                       <button 
                        onClick={prevStep}
                        className="absolute -top-8 left-0 text-[#435B47]/40 hover:text-[#435B47] font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1 cursor-pointer"
                       >
                         ← Volver
                       </button>
                   )}
                   <h3 className="text-[#435B47]/40 uppercase tracking-widest font-black text-xs mb-3">Paso {step + 1} de {steps.length}</h3>
                   <h2 className="text-2xl md:text-3xl font-black text-[#435B47] leading-tight">
                        {current.question}
                    </h2>
                </div>

                <div className="mb-8">
                    {current.type === "text" && (
                        <input
                            type="text"
                            placeholder={current.placeholder}
                            value={data[current.field] || ""}
                            onChange={handleChange}
                            autoFocus
                            className="w-full bg-transparent border-b-4 border-[#435B47] py-4 text-xl md:text-2xl font-bold focus:outline-none placeholder:opacity-20"
                        />
                    )}

                    {current.type === "email" && (
                        <input
                            type="email"
                            placeholder={current.placeholder}
                            value={data[current.field] || ""}
                            onChange={handleChange}
                            autoFocus
                            className="w-full bg-transparent border-b-4 border-[#435B47] py-4 text-xl md:text-2xl font-bold focus:outline-none placeholder:opacity-20"
                        />
                    )}

                    {current.type === "textarea" && (
                        <textarea
                            placeholder={current.placeholder}
                            value={data[current.field] || ""}
                            onChange={handleChange}
                            autoFocus
                            className="w-full bg-transparent border-b-4 border-[#435B47] py-4 text-xl md:text-2xl font-bold focus:outline-none min-h-[120px] resize-none placeholder:opacity-20"
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
                                    className={`text-left p-4 rounded-xl border-2 transition-all font-bold text-base md:text-lg cursor-pointer ${
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
                                        className="bg-[#435B47] text-white px-6 py-3 rounded-xl font-bold cursor-pointer transition-all hover:opacity-90 active:scale-95"
                                    >
                                        Reintentar
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                    {/* CALENDAR MONTH GRID */}
                                    <div className="bg-white p-4 rounded-2xl border border-[#435B47]/10 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <button 
                                                type="button"
                                                onClick={prevMonth}
                                                className="p-1 px-3 text-[#435B47] hover:bg-[#435B47]/5 rounded-lg transition-colors cursor-pointer font-black"
                                            >
                                                &larr;
                                            </button>
                                            <h4 className="font-extrabold text-[#435B47] text-sm md:text-base capitalize">
                                                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                            </h4>
                                            <button 
                                                type="button"
                                                onClick={nextMonth}
                                                className="p-1 px-3 text-[#435B47] hover:bg-[#435B47]/5 rounded-lg transition-colors cursor-pointer font-black"
                                            >
                                                &rarr;
                                            </button>
                                        </div>

                                        {/* Weekdays Header */}
                                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-[#435B47]/40 uppercase mb-2">
                                            {weekDays.map(d => <div key={d}>{d}</div>)}
                                        </div>

                                        {/* Days Grid */}
                                        <div className="grid grid-cols-7 gap-1">
                                            {getDaysInMonth(currentMonth).map((day, index) => {
                                                if (!day) {
                                                    return <div key={`empty-${index}`} className="aspect-square"></div>;
                                                }
                                                const dayKey = formatDateKey(day);
                                                const hasSlots = slots[dayKey] && slots[dayKey].length > 0;
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
                                                        className={`aspect-square w-full rounded-xl text-xs md:text-sm font-bold flex flex-col items-center justify-center relative transition-all ${
                                                            isSelected
                                                            ? "bg-[#435B47] text-white shadow-md shadow-[#435B47]/20 scale-105"
                                                            : hasSlots
                                                            ? "bg-[#435B47]/5 text-[#435B47] hover:bg-[#435B47]/15 cursor-pointer"
                                                            : "text-black/10 cursor-not-allowed"
                                                        }`}
                                                    >
                                                        <span>{day.getDate()}</span>
                                                        {hasSlots && !isSelected && (
                                                            <span className="w-1 h-1 rounded-full bg-[#435B47] absolute bottom-1"></span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* TIME SLOTS PANEL */}
                                    <div className="bg-white/60 p-4 rounded-2xl border border-[#435B47]/5 min-h-[260px] flex flex-col justify-between">
                                        <div className="w-full">
                                            <p className="text-xs font-black uppercase tracking-wider text-[#435B47]/50 mb-3">
                                                {selectedDate ? `Horarios para el ${formatDateLabel(selectedDate)}` : "Selecciona un día"}
                                            </p>
                                            
                                            {selectedDate ? (
                                                slots[selectedDate] && slots[selectedDate].length > 0 ? (
                                                    <div className="grid grid-cols-2 gap-2 max-h-[190px] overflow-y-auto pr-1">
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
                                                                    className={`py-3 rounded-xl border-2 font-bold text-xs md:text-sm transition-all text-center cursor-pointer ${
                                                                        isSelected 
                                                                        ? "bg-[#435B47] text-white border-[#435B47]" 
                                                                        : "bg-white text-[#435B47] border-[#435B47]/10 hover:border-[#435B47]/40"
                                                                    }`}
                                                                >
                                                                    {timeStr} hs
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm font-medium text-red-500">No hay horarios disponibles.</p>
                                                )
                                            ) : (
                                                <div className="text-center py-8">
                                                    <p className="text-xs md:text-sm font-bold text-[#435B47]/60">Haz clic en un día destacado del calendario para ver las horas disponibles.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {current.type !== "select" && (
                    <button
                        onClick={nextStep}
                        className="bg-[#435B47] text-white px-10 py-5 rounded-2xl w-full text-lg md:text-xl font-black hover:scale-[1.02] transition-transform shadow-xl shadow-[#435B47]/20 cursor-pointer"
                    >
                        {step === steps.length - 1 ? "CONFIRMAR Y AGENDAR CITA →" : "CONTINUAR →"}
                    </button>
                )}

                <p className="text-xs mt-8 text-[#435B47]/40 font-bold uppercase tracking-tighter text-center">
                    Tus datos están seguros. Solo los usamos para preparar tu diagnóstico.
                </p>

            </div>
        </div>
    );
}