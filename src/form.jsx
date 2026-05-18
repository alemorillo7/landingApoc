import React, { useState } from "react";

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
        question: "¿Qué día te quedaría más cómodo?",
        field: "availability_day",
        type: "select",
        options: [
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Cualquier día de la semana"
        ]
    },
    {
        question: "¿En qué horario prefieres la reunión?",
        field: "availability_time",
        type: "select",
        options: [
            "Mañana (9:00 - 13:00)",
            "Tarde (14:00 - 18:00)",
            "Indiferente / Otro"
        ]
    },
    {
        question: "Dejanos tu número de WhatsApp (opcional)",
        field: "phone",
        type: "text",
        placeholder: "+54 9 11 ...",
        optional: true
    },
];

export default function Form({ onComplete }) {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({});

    const current = steps[step];

    const handleChange = (e) => {
        setData({ ...data, [current.field]: e.target.value });
    };

    const nextStep = () => {
        if (!current.optional && !data[current.field] && current.type !== "select") return alert("Por favor, completa este campo.");
        
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
                </div>

                {current.type !== "select" && (
                    <button
                        onClick={nextStep}
                        className="bg-[#435B47] text-white px-10 py-5 rounded-2xl w-full text-xl font-black hover:scale-[1.02] transition-transform shadow-xl shadow-[#435B47]/20"
                    >
                        CONTINUAR →
                    </button>
                )}

                <p className="text-xs mt-10 text-[#435B47]/40 font-bold uppercase tracking-tighter text-center">
                    Tus datos están seguros. Solo los usamos para preparar tu diagnóstico.
                </p>

            </div>
        </div>
    );
}