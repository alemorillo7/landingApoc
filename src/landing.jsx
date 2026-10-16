import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  bfitTestimonial,
  caseStudies,
  clientLogos,
  commercialOptions,
  contactInfo,
  featuredCaseStudies,
  featuredTestimonials,
  heroStats,
  heroVideo,
  socialLinks,
  team,
  urgencyConfig,
  videoTestimonial,
} from "./siteData.js";

const EASE_OUT = [0.22, 1, 0.36, 1];

/* ========================================================================== */
/* Piezas base                                                                 */
/* ========================================================================== */

function Wordmark({ compact = false }) {
  return (
    <span className="flex flex-col leading-none">
      <span className={`font-display text-white ${compact ? "text-[19px]" : "text-[22px]"}`}>APOC</span>
      <span className={`wordmark-sub mt-1 text-verde-300 ${compact ? "text-[7.5px]" : "text-[8.5px]"}`}>
        AUTOMATION
      </span>
    </span>
  );
}

function SectionHeading({ eyebrow, title, description, tone = "light", align = "split" }) {
  const dark = tone === "dark";
  const eyebrowColor = dark ? "text-verde-300" : "text-verde";
  const ruleColor = dark ? "bg-verde-300" : "bg-verde";
  const titleColor = dark ? "text-white" : "text-tinta";
  const bodyColor = dark ? "text-gris-claro" : "text-gris";

  const head = (
    <div>
      <p
        className={`flex items-center gap-3 text-sm font-semibold ${eyebrowColor} ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className={`h-px w-8 ${ruleColor}`} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className={`font-display mt-4 text-[1.95rem] leading-[1.08] md:text-[2.7rem] ${titleColor}`}>
        {title}
      </h2>
    </div>
  );

  if (align === "center") {
    return (
      <div className="mx-auto max-w-3xl text-center">
        {head}
        {description && (
          <p className={`mx-auto mt-5 max-w-2xl text-base leading-7 md:text-lg md:leading-8 ${bodyColor}`}>
            {description}
          </p>
        )}
      </div>
    );
  }

  if (align === "stack") {
    return (
      <div className="max-w-xl">
        {head}
        {description && (
          <p className={`mt-5 text-base leading-7 md:text-lg md:leading-8 ${bodyColor}`}>{description}</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
      {head}
      {description && (
        <p className={`max-w-xl text-base leading-7 md:text-lg md:leading-8 ${bodyColor}`}>{description}</p>
      )}
    </div>
  );
}

const buttonBase =
  "btn-press inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3 text-center text-[15px] font-semibold leading-tight";

const buttonTones = {
  verde:
    "bg-verde text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_12px_28px_-14px_rgba(67,91,71,0.95)] hover:bg-verde-500",
  white: "bg-white text-tinta shadow-[0_12px_28px_-14px_rgba(0,0,0,0.5)] hover:bg-niebla",
};

function PrimaryButton({ children, onClick, className = "", tone = "verde" }) {
  return (
    <button type="button" onClick={onClick} className={`${buttonBase} ${buttonTones[tone]} ${className}`}>
      {children}
    </button>
  );
}

function SecondaryButton({ children, href, className = "", tone = "dark" }) {
  const toneClass =
    tone === "dark"
      ? "border border-white/20 text-white hover:border-white/35 hover:bg-white/5"
      : "border border-tinta/20 text-tinta hover:border-tinta/35 hover:bg-tinta/5";
  return (
    <a href={href} className={`${buttonBase} ${toneClass} ${className}`}>
      {children}
    </a>
  );
}

function SectionCTA({ onStart, text, subtext, tone = "light" }) {
  return (
    <div className="mt-14 flex flex-col items-center justify-center text-center">
      <PrimaryButton onClick={onStart} className="px-8">
        {text}
      </PrimaryButton>
      {subtext && (
        <p className={`mt-3 text-sm ${tone === "dark" ? "text-gris-claro" : "text-gris"}`}>{subtext}</p>
      )}
    </div>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-4 w-4 ${className}`} fill="none" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SocialIcon({ label }) {
  if (label === "WhatsApp") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    );
  }

  if (label === "Phone") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    );
  }

  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

/* ========================================================================== */
/* Hero: de la idea al sistema                                                 */
/* ========================================================================== */

const heroModules = [
  { name: "Stock", fromIdea: true },
  { name: "Ventas por vendedor", fromIdea: true },
  { name: "Presupuestos", fromIdea: true },
  { name: "Clientes", fromIdea: false },
  { name: "Finanzas", fromIdea: false },
  { name: "Reportes", fromIdea: false },
];

const heroBars = [38, 52, 45, 70, 62, 84, 76];

function Highlight({ children }) {
  return (
    <span className="bg-[linear-gradient(transparent_58%,rgba(157,187,162,0.75)_58%)] px-0.5">{children}</span>
  );
}

function HeroSystem() {
  const reduce = useReducedMotion();
  const enter = (delay, y = 12) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: EASE_OUT },
        };

  return (
    <figure className="relative mx-auto w-full max-w-[580px] lg:max-w-none">
      <div aria-hidden="true">
        {/* La idea, como llega */}
        <motion.div
          {...enter(0.2)}
          className="note-paper relative z-10 w-[92%] -rotate-[1.4deg] rounded-md px-5 pb-4 pt-3.5 text-tinta shadow-[0_22px_44px_-20px_rgba(0,0,0,0.75)] sm:w-[80%]"
        >
          <p className="text-[13px] font-medium text-gris">La idea</p>
          <p className="mt-1 text-[16px] font-medium leading-[28px] sm:text-[17px]">
            “Necesito <Highlight>controlar el stock</Highlight>, que <Highlight>cada vendedor cargue sus ventas</Highlight> y
            dejar de hacer <Highlight>presupuestos en papel</Highlight>.”
          </p>
        </motion.div>

        {/* Conector */}
        <motion.div
          initial={reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, delay: 0.55, ease: EASE_OUT }}
          className="ml-[22%] h-9 w-px origin-top bg-[repeating-linear-gradient(180deg,#9dbba2_0_4px,transparent_4px_8px)]"
        />

        {/* El sistema */}
        <motion.div
          {...enter(0.7, 16)}
          className="overflow-hidden rounded-xl border border-white/10 bg-grafito-800 shadow-[0_40px_80px_-32px_rgba(0,0,0,0.85)]"
        >
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="font-display flex h-6 w-6 items-center justify-center rounded-[5px] bg-verde text-[12px] text-white">
                A
              </span>
              <span className="text-[13px] font-semibold text-white">Sistema de gestión</span>
            </div>
            <span className="flex items-center gap-1.5 text-[12px] text-gris-claro">
              <span className="h-1.5 w-1.5 rounded-full bg-verde-300" />
              En línea
            </span>
          </div>

          <div className="grid sm:grid-cols-[158px_1fr]">
            <ul className="hidden border-r border-white/8 p-2.5 sm:block">
              {heroModules.map((module, index) => (
                <motion.li
                  key={module.name}
                  {...enter(0.95 + index * 0.08, 4)}
                  className={`flex items-center justify-between rounded-md px-2.5 py-2 text-[12.5px] ${
                    module.fromIdea ? "bg-white/[0.06] font-semibold text-white" : "text-gris-claro"
                  }`}
                >
                  {module.name}
                  {module.fromIdea && <span className="h-1.5 w-1.5 rounded-full bg-verde-300" />}
                </motion.li>
              ))}
            </ul>

            <div className="p-3.5 sm:p-4">
              <div className="flex flex-wrap gap-1.5 sm:hidden">
                {heroModules.slice(0, 4).map((module) => (
                  <span
                    key={module.name}
                    className={`rounded-md px-2 py-1 text-[11.5px] ${
                      module.fromIdea ? "bg-white/[0.07] font-semibold text-white" : "text-gris-claro"
                    }`}
                  >
                    {module.name}
                  </span>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-0 sm:grid-cols-3">
                {[
                  { label: "Stock valorizado", value: "USD 48.320" },
                  { label: "Ventas del mes", value: "312" },
                  { label: "Presupuestos hoy", value: "14" },
                ].map((kpi, index) => (
                  <motion.div
                    key={kpi.label}
                    {...enter(1.25 + index * 0.08, 6)}
                    className={`rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2.5 ${index === 2 ? "hidden sm:block" : ""}`}
                  >
                    <p className="text-[11px] text-gris-claro">{kpi.label}</p>
                    <p className="tabular mt-1 text-[15px] font-semibold text-white">{kpi.value}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div {...enter(1.5, 6)} className="mt-2 rounded-lg border border-white/8 bg-white/[0.03] p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-gris-claro">Ventas por semana</p>
                  <p className="tabular text-[11px] font-semibold text-verde-300">+18%</p>
                </div>
                <div className="mt-3 flex h-16 items-end gap-1.5">
                  {heroBars.map((height, index) => (
                    <motion.span
                      key={index}
                      initial={reduce ? false : { scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: 1.6 + index * 0.05, ease: EASE_OUT }}
                      style={{ height: `${height}%` }}
                      className={`flex-1 origin-bottom rounded-[3px] ${
                        index === heroBars.length - 2 ? "bg-verde-300" : "bg-verde"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.ul {...enter(1.7, 6)} className="mt-2 hidden divide-y divide-white/6 text-[12px] sm:block">
                {[
                  ["M. Gómez", "Kit de embrague", "USD 186"],
                  ["L. Pereyra", "Juego de pastillas", "USD 74"],
                ].map(([seller, item, total]) => (
                  <li key={seller} className="flex items-center justify-between gap-3 py-2">
                    <span className="text-white">{seller}</span>
                    <span className="flex-1 truncate text-gris-claro">{item}</span>
                    <span className="tabular text-white">{total}</span>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </motion.div>
      </div>
      <figcaption className="mt-3 text-right text-[12px] text-gris-claro/80">
        Ilustración: una idea convertida en un sistema a medida.
      </figcaption>
    </figure>
  );
}

/* ========================================================================== */
/* Landing                                                                     */
/* ========================================================================== */

const navLinks = [
  { href: "#casos-exito", label: "Casos de éxito", mobileLabel: "Casos de éxito" },
  { href: "#testimonios", label: "Testimonios", mobileLabel: "Testimonios" },
  { href: "#equipo", label: "Equipo", mobileLabel: "Equipo dedicado" },
  { href: "#planes", label: "Planes", mobileLabel: "Formas de contratación" },
  { href: "#calculadora-ahorro", label: "Calculadora", mobileLabel: "Calculadora de ahorro" },
  { href: "#contacto", label: "Contacto", mobileLabel: "Contacto directo" },
];

export default function Landing({ onStart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [urgencySlots, setUrgencySlots] = useState(urgencyConfig.fallbackSlots || 3);
  const [showUrgencyBanner, setShowUrgencyBanner] = useState(false);
  const reduce = useReducedMotion();

  const [calculatorInputs, setCalculatorInputs] = useState({
    people: 2,
    hoursPerWeek: 12,
    monthlyCost: 1200,
    automatablePercent: 60,
  });

  // Consulta dinámica de cupos restantes desde el ERP de APOC en tiempo real
  useEffect(() => {
    if (!urgencyConfig.endpoint) return;
    fetch(urgencyConfig.endpoint)
      .then((res) => res.text())
      .then((text) => {
        const trimmed = text.trim();
        let count = Number(trimmed);
        if (isNaN(count)) {
          try {
            const parsed = JSON.parse(trimmed);
            count = typeof parsed === "number" ? parsed : typeof parsed?.count === "number" ? parsed.count : 0;
          } catch {
            count = 0;
          }
        }
        if (!isNaN(count)) {
          const remaining = Math.max(urgencyConfig.minDisplay, urgencyConfig.maxSlots - count);
          setUrgencySlots(remaining);
        }
      })
      .catch(() => {
        // Mantiene fallback predeterminado ante cualquier error de red
      });
  }, []);

  // Banner sticky que aparece cuando el usuario scrollea hacia abajo
  useEffect(() => {
    const handleScroll = () => {
      setShowUrgencyBanner(window.scrollY > 340);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lógica de cálculo de ahorro operativo
  const monthlyHoursLost = calculatorInputs.people * calculatorInputs.hoursPerWeek * 4.33;
  const hourlyCost = calculatorInputs.monthlyCost / 160;
  const monthlyCostOfManualWork = monthlyHoursLost * hourlyCost;
  const estimatedMonthlySaving = monthlyCostOfManualWork * (calculatorInputs.automatablePercent / 100);
  const estimatedAnnualSaving = estimatedMonthlySaving * 12;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const handleCalculatorChange = (field, value) => {
    setCalculatorInputs((current) => ({
      ...current,
      [field]: Math.max(0, Number(value) || 0),
    }));
  };

  const getOptionWhatsAppHref = (option) => {
    const message = `Hola APOC, me interesa la opción ${option.name} (${option.model}). Quiero recibir más información y coordinar una llamada.`;
    const separator = contactInfo.whatsappHref.includes("?") ? "&" : "?";
    return `${contactInfo.whatsappHref}${separator}text=${encodeURIComponent(message)}`;
  };

  const heroVideoEmbedUrl = `https://www.youtube-nocookie.com/embed/${heroVideo.youtubeId}?rel=0&modestbranding=1&playsinline=1`;

  const heroEnter = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE_OUT },
        };

  const calculatorInputClass =
    "tabular mt-2 w-full rounded-md border border-linea bg-white px-3 py-2.5 text-xl font-semibold text-tinta outline-none transition-[border-color,box-shadow] duration-150 focus:border-verde focus:shadow-[0_0_0_3px_rgba(67,91,71,0.15)]";

  return (
    <div className="apoc-shell selection:bg-verde-300 selection:text-tinta">
      {/* ========================================================================= */}
      {/* 1. NAVEGACIÓN FIJA & BANNER DE URGENCIA                                   */}
      {/* ========================================================================= */}
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="border-b border-white/8 bg-grafito/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-10">
            <a href="#inicio" className="flex min-w-0 items-center gap-3" aria-label="APOC Automation, ir al inicio">
              <Wordmark compact />
              <span className="hidden h-7 w-px bg-white/12 min-[400px]:block" aria-hidden="true" />
              <span className="hidden text-[13px] leading-tight text-gris-claro min-[400px]:block">
                Software factory
                <br />
                ERP, CRM y automatización
              </span>
            </a>

            <div className="hidden items-center gap-7 text-[14px] text-gris-claro lg:flex">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="transition-colors duration-150 hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <PrimaryButton onClick={onStart} className="min-h-10 px-4 py-2 text-[13.5px] md:min-h-11 md:px-5 md:text-[14px]">
                <span className="sm:hidden">Agendar</span>
                <span className="hidden sm:inline">Agendá tu llamada gratis</span>
              </PrimaryButton>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 text-white lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMobileMenuOpen}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Menú Mobile */}
        <AnimatePresence initial={false}>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
              className="border-b border-white/8 bg-grafito-900/98 px-4 py-3 backdrop-blur-2xl lg:hidden"
            >
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="border-b border-white/6 py-3 text-[15px] text-gris-claro last:border-b-0 hover:text-white"
                  >
                    {link.mobileLabel}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Banner Sticky de Urgencia */}
        <div
          className={`bg-verde-700 transition-[max-height,opacity,padding] duration-300 ${
            showUrgencyBanner
              ? "max-h-24 py-2 opacity-100"
              : "pointer-events-none max-h-0 overflow-hidden py-0 opacity-0"
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 md:px-10">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-verde-300 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-verde-300" />
              </span>
              <p className="truncate text-[12.5px] text-white/85 sm:text-[13.5px]">
                {urgencySlots === 1 ? "Solo queda" : "Solo quedan"}{" "}
                <strong className="font-semibold text-white">
                  {urgencySlots} {urgencySlots === 1 ? "lugar disponible" : "lugares disponibles"}
                </strong>{" "}
                este mes para nuevos desarrollos
              </p>
            </div>
            <button
              type="button"
              onClick={onStart}
              className="shrink-0 py-1 text-[12.5px] font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white sm:text-[13.5px]"
            >
              Asegurar lugar
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 pb-20 md:pb-0">
        {/* ========================================================================= */}
        {/* 2. HERO                                                                   */}
        {/* ========================================================================= */}
        <section id="inicio" className="relative overflow-hidden bg-grafito px-4 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
          <div className="blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <motion.p {...heroEnter(0)} className="flex items-center gap-2.5 text-sm font-medium text-verde-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-verde-300 opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-verde-300" />
                </span>
                {urgencySlots === 1
                  ? "Solo tomamos 1 proyecto por mes"
                  : `Solo tomamos ${urgencySlots} proyectos por mes`}
              </motion.p>

              <motion.h1
                {...heroEnter(0.06)}
                className="font-display mt-6 text-[2.55rem] leading-[1.02] text-white min-[400px]:text-[2.9rem] md:text-[3.9rem] xl:text-[4.5rem]"
              >
                Lo que tenés en la cabeza, lo ponemos en un sistema.
              </motion.h1>

              <motion.p {...heroEnter(0.12)} className="mt-6 max-w-xl text-[17px] leading-[1.65] text-gris-claro md:text-lg">
                Somos una software factory. Desarrollamos ERP, CRM y automatizaciones a medida para empresas que buscan
                optimizar su operación y contar con un socio tecnológico dedicado.
              </motion.p>

              <motion.div {...heroEnter(0.18)} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton onClick={onStart} className="w-full px-8 sm:w-auto">
                  Agendá tu llamada gratis
                </PrimaryButton>
                <SecondaryButton href="#casos-exito" className="w-full sm:w-auto">
                  Ver casos y testimonios
                </SecondaryButton>
              </motion.div>

              {/* Métricas rápidas de impacto */}
              <motion.dl
                {...heroEnter(0.24)}
                className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-7 sm:grid-cols-4"
              >
                {heroStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse">
                    <dt className="mt-1 text-[13.5px] text-gris-claro">{stat.label}</dt>
                    <dd className="font-display tabular text-[1.85rem] leading-none text-white">{stat.value}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            <HeroSystem />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2b. VIDEO DE ENFOQUE                                                      */}
        {/* ========================================================================= */}
        <section className="bg-grafito-900 px-4 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                tone="dark"
                align="stack"
                eyebrow="Enfoque de trabajo"
                title="Tu empresa necesita un sistema que pueda crecer con ella."
                description={heroVideo.heading}
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
              <div className="aspect-[16/9] w-full">
                <iframe
                  className="h-full w-full"
                  src={heroVideoEmbedUrl}
                  title={heroVideo.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CASOS DE ÉXITO Y TESTIMONIOS                                           */}
        {/* ========================================================================= */}
        <section id="casos-exito" className="on-light bg-niebla px-4 py-16 text-tinta md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Mirá, ellos ya lo han hecho"
              title="Resultados reales y testimonios de nuestros clientes."
              description="Empresas de Argentina y Latinoamérica que ya dejaron atrás procesos manuales y escalaron con software a medida de APOC."
            />

            {/* Testimonios en video */}
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <article className="card-light flex flex-col rounded-xl p-3">
                <div className="img-outline overflow-hidden rounded-lg bg-black">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="aspect-[16/9] w-full object-cover"
                    src={bfitTestimonial.videoSrc}
                  >
                    Tu navegador no soporta el video.
                  </video>
                </div>
                <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[17px] font-semibold text-tinta">{bfitTestimonial.title}</h3>
                    <span className="shrink-0 rounded-md bg-verde-100 px-2 py-1 text-[12px] font-medium text-verde-700">
                      Voz real de la clienta
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] leading-6 text-gris">{bfitTestimonial.caption}</p>
                </div>
              </article>

              <article className="card-light flex flex-col rounded-xl p-3">
                <div className="img-outline overflow-hidden rounded-lg bg-black">
                  <div className="aspect-[16/9] w-full">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${videoTestimonial.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
                      title={videoTestimonial.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[17px] font-semibold text-tinta">{videoTestimonial.title}</h3>
                    <span className="shrink-0 rounded-md bg-verde-100 px-2 py-1 text-[12px] font-medium text-verde-700">
                      Caso en producción
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] leading-6 text-gris">
                    Feedback operativo: experiencia directa de clientes operando con nuestras soluciones en su día a día.
                  </p>
                </div>
              </article>
            </div>

            {/* Testimonios escritos */}
            <div id="testimonios" className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredTestimonials.slice(0, 6).map((item, index) => (
                <figure
                  key={item.company}
                  className={`card-light flex flex-col justify-between rounded-xl p-6 ${
                    index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                  } ${index === 3 ? "lg:col-span-2" : ""}`}
                >
                  <blockquote
                    className={`text-tinta ${
                      index === 0 ? "font-display text-[1.35rem] leading-[1.4] md:text-[1.6rem]" : "text-[15.5px] leading-7"
                    }`}
                  >
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-linea pt-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-verde text-[13px] font-semibold text-white">
                        {item.initials}
                      </span>
                      <div>
                        <p className="text-[15px] font-semibold text-tinta">{item.company}</p>
                        <p className="text-[13px] text-gris">{item.source}</p>
                      </div>
                    </div>
                    {item.projectId && (
                      <Link
                        to={`/proyectos/${item.projectId}`}
                        className="shrink-0 py-2 text-[14px] font-semibold text-verde underline decoration-verde/30 underline-offset-4 transition-colors hover:decoration-verde"
                      >
                        {item.proof}
                      </Link>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Casos de estudio destacados */}
            <div className="mt-16">
              <div className="flex flex-col gap-2 border-b border-linea pb-4 sm:flex-row sm:items-end sm:justify-between">
                <h3 className="font-display text-[1.5rem] text-tinta">Casos de estudio destacados</h3>
                <Link
                  to="/casos-de-éxito"
                  className="py-1 text-[14px] font-semibold text-verde underline decoration-verde/30 underline-offset-4 hover:decoration-verde"
                >
                  Ver todos los casos ({caseStudies.length})
                </Link>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featuredCaseStudies.slice(0, 3).map((study) => (
                  <Link
                    key={study.id}
                    to={`/proyectos/${study.id}`}
                    className="card-light group flex flex-col rounded-xl p-3 text-left transition-shadow duration-200 hover:shadow-[0_0_0_1px_rgba(67,91,71,0.35),0_18px_40px_-20px_rgba(27,33,29,0.35)]"
                  >
                    <div className="img-outline relative aspect-[16/10] overflow-hidden rounded-lg bg-niebla">
                      {study.image ? (
                        <img
                          src={study.image}
                          alt={study.client}
                          loading="lazy"
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <div className="font-display flex h-full w-full items-center justify-center text-3xl text-verde">
                          {study.client.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="px-3 pb-3 pt-4">
                      <p className="text-[13px] font-medium text-verde">{study.industry.split(" - ")[0]}</p>
                      <h4 className="mt-1 text-[18px] font-semibold text-tinta group-hover:underline group-hover:decoration-verde/40 group-hover:underline-offset-4">
                        {study.client}
                      </h4>
                      <p className="mt-2 line-clamp-2 text-[14.5px] leading-6 text-gris">{study.result}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Empresas que confían en nosotros */}
            <div className="mt-14 flex flex-col items-center gap-5 border-y border-linea py-7 lg:flex-row lg:justify-between">
              <p className="text-[14px] text-gris">Empresas y proyectos respaldados por APOC</p>
              <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
                {clientLogos.map((logo) => (
                  <li key={logo} className="font-display text-[17px] text-tinta/55">
                    {logo}
                  </li>
                ))}
              </ul>
            </div>

            <SectionCTA
              onStart={onStart}
              text="Quiero resultados como estos para mi empresa"
              subtext="Conversá directamente con nuestros directores técnicos"
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. EQUIPO                                                                 */}
        {/* ========================================================================= */}
        <section id="equipo" className="on-light bg-white px-4 py-16 text-tinta md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Trato directo con los especialistas"
              title="Tenemos un equipo personal y abocado para vos."
              description="No tercerizamos ni dejamos proyectos abandonados. Este es el equipo real que diseña, programa, acompaña y atiende cada detalle de tu sistema."
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member, index) => (
                <article
                  key={member.name}
                  className={`card-light flex items-start gap-4 rounded-xl p-5 ${
                    index === team.length - 1 && team.length % 3 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full bg-grafito ring-2 ring-verde-100 ring-offset-2 ring-offset-white">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.fullName || member.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-[50%_20%] grayscale"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-display text-[1.35rem] text-verde-300">{member.initials}</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-[1.15rem] text-tinta">{member.name}</h3>
                    <p className="mt-0.5 text-[13.5px] font-semibold leading-5 text-verde">{member.role}</p>
                    <p className="mt-2.5 text-[14px] leading-[1.55] text-gris">{member.detail}</p>
                  </div>
                </article>
              ))}
            </div>

            <SectionCTA
              onStart={onStart}
              text="Conocenos en una llamada estratégica"
              subtext="Sin intermediarios. Te atiende directamente el equipo técnico."
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. TIPOS DE CONTRATACIÓN                                                  */}
        {/* ========================================================================= */}
        <section id="planes" className="bg-grafito px-4 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              tone="dark"
              eyebrow="Flexibilidad comercial"
              title="Tres formas de contratar APOC, según tu empresa."
              description="Si no agendaste antes, mirá cómo podés financiar tu sistema en cuotas, pagar por hitos cerrados o incorporarnos como departamento de tecnología continuo."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {commercialOptions.map((option) => (
                <article key={option.id} className="glass-card flex h-full flex-col justify-between rounded-xl p-6 md:p-7">
                  <div>
                    <p className="text-[13.5px] font-medium text-verde-300">{option.model}</p>
                    <h3 className="font-display mt-2 text-[1.75rem] leading-tight text-white">{option.name}</h3>
                    <p className="mt-3 text-[16px] font-medium leading-6 text-white/90">{option.tagline}</p>
                    <p className="mt-3 text-[14.5px] leading-6 text-gris-claro">{option.summary}</p>

                    <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/8 bg-white/8">
                      <div className="bg-grafito-800 p-3.5">
                        <dt className="text-[12.5px] text-gris-claro">Pago</dt>
                        <dd className="mt-1 text-[14.5px] font-semibold text-white">{option.payment}</dd>
                      </div>
                      <div className="bg-grafito-800 p-3.5">
                        <dt className="text-[12.5px] text-gris-claro">Propiedad</dt>
                        <dd className="mt-1 text-[14.5px] font-semibold text-white">{option.ownership}</dd>
                      </div>
                    </dl>

                    <ul className="mt-6 space-y-3">
                      {option.items.slice(0, 4).map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckIcon className="mt-[3px] shrink-0 text-verde-300" />
                          <span className="text-[14.5px] leading-6 text-white/85">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={getOptionWhatsAppHref(option)}
                    target="_blank"
                    rel="noreferrer"
                    className={`${buttonBase} mt-8 w-full border border-verde-300/40 text-white hover:border-verde-300/70 hover:bg-verde/40`}
                  >
                    <SocialIcon label="WhatsApp" />
                    Consultar plan por WhatsApp
                  </a>
                </article>
              ))}
            </div>

            <SectionCTA
              tone="dark"
              onStart={onStart}
              text="¿No sabés cuál elegir? Te asesoramos en una llamada"
              subtext="Evaluamos el plan ideal según tu flujo de caja y prioridad técnica"
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CALCULADORA DE AHORRO                                                  */}
        {/* ========================================================================= */}
        <section id="calculadora-ahorro" className="on-light bg-niebla px-4 py-16 text-tinta md:px-10 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <SectionHeading
              align="stack"
              eyebrow="Calculadora de impacto"
              title="Calculá cuánto dinero estás perdiendo en procesos manuales."
              description="Ingresá datos estimados de tu operación para dimensionar las horas perdidas y el ahorro real que recuperás automatizando."
            />

            <div className="card-light rounded-xl p-5 sm:p-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[14px] font-semibold text-tinta">Personas en el proceso</span>
                  <input
                    type="number"
                    min="1"
                    value={calculatorInputs.people}
                    onChange={(e) => handleCalculatorChange("people", e.target.value)}
                    className={calculatorInputClass}
                  />
                  <span className="mt-1.5 block text-[13px] text-gris">Cantidad de empleados involucrados.</span>
                </label>

                <label className="block">
                  <span className="text-[14px] font-semibold text-tinta">Horas/sem por persona</span>
                  <input
                    type="number"
                    min="1"
                    value={calculatorInputs.hoursPerWeek}
                    onChange={(e) => handleCalculatorChange("hoursPerWeek", e.target.value)}
                    className={calculatorInputClass}
                  />
                  <span className="mt-1.5 block text-[13px] text-gris">Horas manuales semanales en tareas repetitivas.</span>
                </label>

                <label className="block">
                  <span className="text-[14px] font-semibold text-tinta">Costo mensual/persona (USD)</span>
                  <input
                    type="number"
                    min="1"
                    step="50"
                    value={calculatorInputs.monthlyCost}
                    onChange={(e) => handleCalculatorChange("monthlyCost", e.target.value)}
                    className={calculatorInputClass}
                  />
                  <span className="mt-1.5 block text-[13px] text-gris">Salario promedio mensual para costo por hora.</span>
                </label>

                <label className="block">
                  <span className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-tinta">Automatizable</span>
                    <span className="tabular text-[15px] font-semibold text-verde">{calculatorInputs.automatablePercent}%</span>
                  </span>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={calculatorInputs.automatablePercent}
                    onChange={(e) => handleCalculatorChange("automatablePercent", e.target.value)}
                    className="mt-5 w-full"
                  />
                  <span className="mt-2.5 block text-[13px] text-gris">Porcentaje de tareas que un sistema puede asumir.</span>
                </label>
              </div>

              <div className="mt-7 grid gap-px overflow-hidden rounded-lg border border-linea bg-linea sm:grid-cols-2">
                <div className="bg-white p-5">
                  <p className="text-[13.5px] text-gris">Pérdida operativa actual</p>
                  <p className="tabular mt-1.5 text-[1.75rem] font-semibold text-alerta">
                    {formatCurrency(monthlyCostOfManualWork)} <span className="text-[14px] font-normal text-gris">/ mes</span>
                  </p>
                  <p className="mt-1 text-[13.5px] text-gris">
                    Equivale a <strong className="tabular font-semibold text-tinta">{Math.round(monthlyHoursLost)} horas</strong> de trabajo manual al mes.
                  </p>
                </div>

                <div className="bg-verde-100/70 p-5">
                  <p className="text-[13.5px] text-verde-700">Ahorro recuperable estimado</p>
                  <p className="tabular mt-1.5 text-[1.75rem] font-semibold text-verde">
                    {formatCurrency(estimatedMonthlySaving)} <span className="text-[14px] font-normal text-verde-700">/ mes</span>
                  </p>
                  <p className="mt-1 text-[13.5px] text-verde-700">
                    Proyección anual: <strong className="tabular font-semibold text-tinta">{formatCurrency(estimatedAnnualSaving)}</strong>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton onClick={onStart} className="w-full sm:flex-1">
                  Quiero recuperar este dinero: agendar llamada
                </PrimaryButton>
                <a
                  href={contactInfo.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className={`${buttonBase} border border-tinta/20 text-tinta hover:border-tinta/35 hover:bg-tinta/5`}
                >
                  <SocialIcon label="WhatsApp" />
                  Hablar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. CONTACTO                                                               */}
        {/* ========================================================================= */}
        <section id="contacto" className="relative overflow-hidden bg-verde px-4 py-20 md:px-10 md:py-28">
          <div className="blueprint pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold text-verde-100">Hablemos de tu proyecto</p>
            <h2 className="font-display mt-4 text-[2.1rem] leading-[1.06] text-white md:text-[3.2rem]">
              Si tu empresa está lista para evolucionar, agendemos hoy.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-7 text-white/80 md:text-lg md:leading-8">
              Evaluamos tus cuellos de botella, te mostramos qué arquitectura conviene y cómo resolverlo con software
              seguro y escalable.
            </p>

            <div className="mt-9 flex justify-center">
              <PrimaryButton tone="white" onClick={onStart} className="w-full px-9 sm:w-auto">
                Agendar tu llamada estratégica gratuita
              </PrimaryButton>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[14px] text-white">
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-4 transition-colors hover:bg-white/10"
              >
                <SocialIcon label="WhatsApp" />
                <span className="tabular">{contactInfo.whatsapp}</span>
              </a>
              <a
                href={contactInfo.phoneHref}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-4 transition-colors hover:bg-white/10"
              >
                <SocialIcon label="Phone" />
                <span className="tabular">{contactInfo.phone}</span>
              </a>
              <a
                href={contactInfo.emailHref}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-4 transition-colors hover:bg-white/10"
              >
                <SocialIcon label="Email" />
                <span>{contactInfo.email}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 8. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="relative z-10 bg-grafito-900 px-4 pb-28 pt-14 md:px-10 md:pb-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-xs text-[14px] leading-6 text-gris-claro">
              Desarrollo de software a medida, automatización e IA para empresas de Argentina y Latinoamérica.
            </p>
            <div className="-ml-2.5 mt-4 flex">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-gris-claro transition-colors hover:bg-white/5 hover:text-white"
                  aria-label={item.label}
                >
                  <SocialIcon label={item.label} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[14px] font-semibold text-white">Secciones</p>
            <div className="mt-4 space-y-2.5 text-[14px] text-gris-claro">
              <a href="#casos-exito" className="block hover:text-white">Casos de éxito</a>
              <a href="#testimonios" className="block hover:text-white">Testimonios</a>
              <a href="#equipo" className="block hover:text-white">Equipo dedicado</a>
              <a href="#planes" className="block hover:text-white">Planes de contratación</a>
              <a href="#calculadora-ahorro" className="block hover:text-white">Calculadora</a>
            </div>
          </div>

          <div>
            <p className="text-[14px] font-semibold text-white">Empresa</p>
            <div className="mt-4 space-y-2.5 text-[14px] text-gris-claro">
              <Link to="/casos-de-éxito" className="block hover:text-white">Portfolio completo</Link>
              <button type="button" onClick={onStart} className="block text-left hover:text-white">Agendar llamada</button>
              <a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="block hover:text-white">
                Atención comercial
              </a>
            </div>
          </div>

          <div>
            <p className="text-[14px] font-semibold text-white">Contacto</p>
            <div className="mt-4 space-y-2.5 text-[14px] text-gris-claro">
              <a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="block hover:text-white">
                WhatsApp: {contactInfo.whatsapp}
              </a>
              <a href={contactInfo.phoneHref} className="block hover:text-white">Tel: {contactInfo.phone}</a>
              <a href={contactInfo.emailHref} className="block hover:text-white">{contactInfo.email}</a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-white/8 pt-6 text-[13px] text-gris-claro/80 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} APOC Automation. Todos los derechos reservados.</span>
          <span>Hecho con dedicación en Argentina</span>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 9. BARRA MÓVIL INFERIOR FIJA                                              */}
      {/* ========================================================================= */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-grafito-900/95 p-2.5 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <a
            href={contactInfo.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/12 text-white"
            aria-label="WhatsApp"
          >
            <SocialIcon label="WhatsApp" />
          </a>
          <PrimaryButton onClick={onStart} className="flex-1">
            Agendá tu llamada gratis
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
