import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger, useGSAP);

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function SectionTag({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c4ccb9] backdrop-blur-xl">
      <span className="h-2 w-2 rounded-full bg-[#6f7e60] shadow-[0_0_14px_rgba(133,154,113,0.8)]" />
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <SectionTag>{eyebrow}</SectionTag>
      <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#f3f4ef] md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-[#aab3a0] md:text-lg">{description}</p>
      )}
    </motion.div>
  );
}

function PrimaryButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`magnetic-button inline-flex items-center justify-center rounded-full border border-[#758464]/30 bg-[#6d7c5e] px-5 py-3 text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] text-center text-[#f7f8f3] shadow-[0_20px_60px_rgba(82,96,66,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7b8a6a] hover:shadow-[0_24px_70px_rgba(109,124,94,0.35)] sm:px-7 sm:py-4 sm:text-[13px] sm:tracking-[0.18em] ${className}`}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, href, className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full border border-white/12 bg-white/4 px-5 py-3 text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] text-center text-[#d7ddd0] backdrop-blur-xl transition-all duration-300 hover:border-[#6d7c5e]/40 hover:bg-white/8 hover:text-white sm:px-7 sm:py-4 sm:text-[13px] sm:tracking-[0.18em] ${className}`}
    >
      {children}
    </a>
  );
}

function SectionCTA({ onStart, text = "Agendá tu llamada gratis", subtext = "Sin costo · Diagnóstico estratégico de 30 min" }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mt-12 flex flex-col items-center justify-center text-center"
    >
      <PrimaryButton onClick={onStart} className="px-8 py-4 sm:px-10 sm:py-4 sm:text-[13px]">
        {text} →
      </PrimaryButton>
      {subtext && (
        <p className="mt-3 text-xs tracking-wide text-[#8e9c82]">{subtext}</p>
      )}
    </motion.div>
  );
}

function ProjectTags({ tags = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
            tag === "Destacado"
              ? "border-[#7d8d6a]/30 bg-[#6f7d61]/16 text-[#edf1e8]"
              : "border-white/10 bg-white/5 text-[#b9c2af]"
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
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

  if (label === "Email") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
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

export default function Landing({ onStart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [urgencySlots, setUrgencySlots] = useState(urgencyConfig.fallbackSlots || 3);
  const [showUrgencyBanner, setShowUrgencyBanner] = useState(false);

  const [calculatorInputs, setCalculatorInputs] = useState({
    people: 2,
    hoursPerWeek: 12,
    monthlyCost: 1200,
    automatablePercent: 60,
  });

  const plansSectionRef = useRef(null);

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
            count = typeof parsed === "number" ? parsed : (typeof parsed?.count === "number" ? parsed.count : 0);
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

  // Banner estático/sticky que aparece cuando el usuario scrollea hacia abajo
  useEffect(() => {
    const handleScroll = () => {
      setShowUrgencyBanner(window.scrollY > 340);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animación sutil de planes con GSAP
  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".gsap-plan-card");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion || !cards.length) return;

      gsap.from(cards, {
        autoAlpha: 0,
        y: 45,
        duration: 0.75,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: plansSectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: plansSectionRef }
  );

  // Lógica de cálculo de ahorro operativo
  const monthlyHoursLost =
    calculatorInputs.people * calculatorInputs.hoursPerWeek * 4.33;
  const hourlyCost = calculatorInputs.monthlyCost / 160;
  const monthlyCostOfManualWork = monthlyHoursLost * hourlyCost;
  const estimatedMonthlySaving =
    monthlyCostOfManualWork * (calculatorInputs.automatablePercent / 100);
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

  return (
    <div className="apoc-shell selection:bg-[#83926f] selection:text-[#0a0d0b]">
      <div className="apoc-noise" />
      <div className="hero-orb hero-orb-top" />
      <div className="hero-orb hero-orb-bottom" />

      {/* ========================================================================= */}
      {/* 1. NAVEGACIÓN FIJA & BANNER DE URGENCIA                                   */}
      {/* ========================================================================= */}
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="border-b border-white/8 bg-[#090b0a]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 md:px-10 md:py-4">
            <a href="#inicio" className="flex min-w-0 items-center gap-2 md:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/6 md:h-11 md:w-11">
                <img
                  src="/logo-sin-fondo-apoc.webp"
                  alt="APOC Automation"
                  className="h-7 w-7 object-contain md:h-8 md:w-8"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#95a286] md:text-xs md:tracking-[0.35em]">
                  APOC AUTOMATION
                </p>
                <p className="hidden text-[11px] leading-tight text-[#c6cdbe] min-[360px]:block md:text-sm">
                  Software, IA y automatización
                </p>
              </div>
            </a>

            <div className="hidden items-center gap-7 text-xs uppercase tracking-[0.2em] text-[#9aa491] lg:flex">
              <a href="#casos-exito" className="transition hover:text-white">Casos de éxito</a>
              <a href="#testimonios" className="transition hover:text-white">Testimonios</a>
              <a href="#equipo" className="transition hover:text-white">Equipo</a>
              <a href="#planes" className="transition hover:text-white">Planes</a>
              <a href="#calculadora-ahorro" className="transition hover:text-white">Calculadora</a>
              <a href="#contacto" className="transition hover:text-white">Contacto</a>
            </div>

            <div className="flex items-center gap-2">
              <PrimaryButton
                onClick={onStart}
                className="shrink-0 rounded-[1.15rem] px-4 py-2 !text-[9px] leading-none tracking-[0.06em] shadow-none sm:px-5 sm:py-2.5 sm:text-[10px] sm:tracking-[0.12em] md:rounded-full md:px-6 md:py-3 md:text-[11px] md:tracking-[0.16em]"
              >
                <span className="sm:hidden">Agendar</span>
                <span className="hidden sm:inline">Agendá tu llamada gratis</span>
              </PrimaryButton>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#f2f4ee] lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Abrir menú"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Menú Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border-b border-white/8 bg-[#090b0a]/95 px-5 py-6 backdrop-blur-2xl lg:hidden"
            >
              <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.2em] text-[#9aa491]">
                <a href="#casos-exito" onClick={() => setIsMobileMenuOpen(false)} className="transition hover:text-white">Casos de éxito</a>
                <a href="#testimonios" onClick={() => setIsMobileMenuOpen(false)} className="transition hover:text-white">Testimonios</a>
                <a href="#equipo" onClick={() => setIsMobileMenuOpen(false)} className="transition hover:text-white">Equipo dedicado</a>
                <a href="#planes" onClick={() => setIsMobileMenuOpen(false)} className="transition hover:text-white">Formas de contratación</a>
                <a href="#calculadora-ahorro" onClick={() => setIsMobileMenuOpen(false)} className="transition hover:text-white">Calculadora de ahorro</a>
                <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="transition hover:text-white">Contacto directo</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Banner Sticky de Urgencia */}
        <div
          className={`border-b border-[#7d8d6a]/30 bg-[#0e1310]/98 backdrop-blur-xl transition-all duration-300 ${
            showUrgencyBanner
              ? "max-h-24 opacity-100 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
              : "max-h-0 opacity-0 py-0 pointer-events-none overflow-hidden border-transparent"
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-8">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8ea279] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#758863]" />
              </span>
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c9d4bf] sm:text-xs sm:tracking-[0.18em]">
                Solo quedan <span className="font-bold text-[#f2f6ee]">{urgencySlots} {urgencySlots === 1 ? "lugar disponible" : "lugares disponibles"}</span> este mes para nuevos desarrollos
              </p>
            </div>
            <button
              onClick={onStart}
              className="shrink-0 text-[10px] font-bold uppercase tracking-[0.15em] text-[#a4b892] underline underline-offset-4 hover:text-[#d3dfc7] sm:text-xs"
            >
              Asegurar lugar →
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 pb-24 md:pb-0">
        {/* ========================================================================= */}
        {/* 2. GANCHO / HERO (Compacto, directo, sin relleno innecesario)              */}
        {/* ========================================================================= */}
        <section id="inicio" className="relative overflow-hidden px-4 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <SectionTag>Solo tomamos {urgencySlots} proyectos por mes</SectionTag>

              <h1 className="mt-6 text-[2.35rem] font-semibold uppercase leading-[0.92] tracking-[-0.07em] text-[#f7f8f4] min-[360px]:text-[2.7rem] md:text-[4.2rem] xl:text-[5rem]">
                <span className="block drop-shadow-[0_8px_30px_rgba(0,0,0,0.38)]">Tu empresa necesita</span>
                <span className="block bg-[linear-gradient(180deg,#cfe0bf_0%,#8ea47b_100%)] bg-clip-text text-transparent drop-shadow-[0_10px_36px_rgba(120,141,95,0.26)]">
                  un sistema que pueda
                </span>
                <span className="block drop-shadow-[0_8px_30px_rgba(0,0,0,0.38)]">crecer con ella.</span>
              </h1>

              <div className="mx-auto mt-4 h-px w-20 bg-[linear-gradient(90deg,rgba(164,184,140,0.9),rgba(164,184,140,0))]" />

              <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#c7d0bd] md:text-lg md:leading-8">
                Desarrollamos ERP, CRM y automatizaciones a medida para empresas que buscan optimizar su operación y contar con un socio tecnológico dedicado.
              </p>

              {/* Botones de acción principales del Hero */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <PrimaryButton onClick={onStart} className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm">
                  Agendá tu llamada gratis
                </PrimaryButton>
                <SecondaryButton href="#casos-exito" className="w-full sm:w-auto">
                  Ver casos y testimonios ↓
                </SecondaryButton>
              </div>

              {/* Métricas rápidas de impacto */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5 border-y border-white/8 py-4 text-xs uppercase tracking-[0.16em] text-[#9ba691] md:gap-10 md:text-sm">
                {heroStats.map((stat, idx) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <span className="text-base font-bold text-[#eef2e8] md:text-xl">{stat.value}</span>
                    <span>{stat.label}</span>
                    {idx < heroStats.length - 1 && <span className="hidden text-white/20 sm:inline">·</span>}
                  </div>
                ))}
              </div>

              {/* Video demostrativo horizontal */}
              <div className="mx-auto mt-8 max-w-2xl sm:max-w-3xl overflow-hidden rounded-[24px] border border-white/10 bg-[#0e1210]/90 p-2.5 shadow-[0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                <div className="overflow-hidden rounded-[18px] border border-white/10 bg-black">
                  <div className="aspect-[16/9] w-full">
                    <iframe
                      className="h-full w-full"
                      src={heroVideoEmbedUrl}
                      title={heroVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between px-2 text-left">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8ea07e]">Enfoque de trabajo</p>
                    <p className="text-sm font-medium text-[#edf1e8]">{heroVideo.heading}</p>
                  </div>
                  <span className="hidden rounded-full border border-[#6c7a5d]/35 bg-[#6c7a5d]/15 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#d3dbc9] sm:inline">
                    {heroVideo.badge}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CASOS DE ÉXITO Y TESTIMONIOS (INMEDIATAMENTE DEBAJO DEL GANCHO)        */}
        {/* ========================================================================= */}
        <section id="casos-exito" className="px-4 py-14 md:px-10 md:py-20 border-t border-white/6">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Mira, ellos ya lo han hecho"
              title="Resultados reales y testimonios de nuestros clientes."
              description="Empresas de Argentina y Latinoamérica que ya dejaron atrás procesos manuales y escalaron con software a medida de APOC."
              align="center"
            />

            {/* Testimonios en Video Destacados (Beyond Fit con voz real + Testimonio YouTube) */}
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {/* Testimonio 1: Beyond Fit (Video directo con voz de la clienta) */}
              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card flex flex-col rounded-[26px] p-4 md:rounded-[30px] md:p-6"
              >
                <div className="flex items-center justify-between pb-3">
                  <span className="rounded-full border border-[#7d8d6a]/30 bg-[#6f7d61]/20 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#dce3d3]">
                    Voz real de la clienta
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#93a084]">Beyond Fit</span>
                </div>
                <div className="overflow-hidden rounded-[20px] border border-white/10 bg-black/40">
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
                <div className="mt-4 flex-1">
                  <h4 className="text-base font-semibold text-[#f5f6f2]">{bfitTestimonial.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-[#b0baa7]">{bfitTestimonial.caption}</p>
                </div>
              </motion.div>

              {/* Testimonio 2: Video Testimonial General */}
              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card flex flex-col rounded-[26px] p-4 md:rounded-[30px] md:p-6"
              >
                <div className="flex items-center justify-between pb-3">
                  <span className="rounded-full border border-[#7d8d6a]/30 bg-[#6f7d61]/20 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#dce3d3]">
                    Caso en producción
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#93a084]">Feedback operativo</span>
                </div>
                <div className="overflow-hidden rounded-[20px] border border-white/10 bg-black/40">
                  <div className="aspect-[16/9] w-full">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${videoTestimonial.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
                      title={videoTestimonial.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="mt-4 flex-1">
                  <h4 className="text-base font-semibold text-[#f5f6f2]">{videoTestimonial.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-[#b0baa7]">
                    Experiencia directa de clientes operando con nuestras soluciones en su día a día.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Testimonios Escritos Clave (Feedback concreto de clientes) */}
            <div id="testimonios" className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredTestimonials.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item.company}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card flex flex-col justify-between rounded-[24px] p-5 md:rounded-[28px] md:p-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7a9172] text-sm font-semibold text-[#111913]">
                          {item.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#f2f4ee]">{item.company}</p>
                          <p className="text-[11px] text-[#909c85]">{item.source}</p>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-[#dee5d8]">
                      “{item.quote}”
                    </p>
                  </div>

                  {item.projectId && (
                    <div className="mt-5 border-t border-white/8 pt-3">
                      <Link
                        to={`/proyectos/${item.projectId}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#9bb08a] transition hover:text-[#e4edd9]"
                      >
                        {item.proof} →
                      </Link>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Grid compacto de Casos de Éxito con enlaces */}
            <div className="mt-12">
              <div className="flex items-center justify-between pb-4">
                <h3 className="text-lg font-semibold uppercase tracking-[0.12em] text-[#f2f5ee]">
                  Casos de Estudio Destacados
                </h3>
                <Link
                  to="/casos-de-éxito"
                  className="text-xs uppercase tracking-[0.18em] text-[#98aa86] underline underline-offset-4 hover:text-white"
                >
                  Ver todos los casos ({caseStudies.length}) →
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featuredCaseStudies.slice(0, 3).map((study) => (
                  <Link
                    key={study.id}
                    to={`/proyectos/${study.id}`}
                    className="glass-card group flex flex-col rounded-[24px] p-4 text-left transition hover:border-[#7d8d6a]/40 md:p-5"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] border border-white/8 bg-[#050706]">
                      {study.image ? (
                        <img
                          src={study.image}
                          alt={study.client}
                          loading="lazy"
                          className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-[#68775e]">
                          {study.client.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#93a084]">{study.industry.split(" - ")[0]}</p>
                      <span className="text-xs text-[#9bb08a] group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    <h4 className="mt-1 text-lg font-semibold text-[#f5f7f2]">{study.client}</h4>
                    <p className="mt-2 text-xs leading-5 text-[#b0baa7] line-clamp-2">{study.result}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tira de logos de empresas que confían en nosotros */}
            <div className="mt-12 rounded-[22px] border border-white/8 bg-black/20 p-5 text-center">
              <p className="text-[10px] uppercase tracking-[0.26em] text-[#808d76]">Empresas y proyectos respaldados por APOC</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-6 md:gap-12">
                {clientLogos.map((logo) => (
                  <span key={logo} className="text-xs uppercase tracking-[0.2em] text-[#9aa78e] md:text-sm font-medium">
                    {logo}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA después de Casos de Éxito */}
            <SectionCTA
              onStart={onStart}
              text="Quiero resultados como estos para mi empresa"
              subtext="Conversá directamente con nuestros directores técnicos"
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. EQUIPO PERSONAL Y ABOCADO PARA VOS                                     */}
        {/* ========================================================================= */}
        <section id="equipo" className="px-4 py-14 md:px-10 md:py-20 border-t border-white/6">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Trato directo con los especialistas"
              title="Tenemos un equipo personal y abocado para vos."
              description="No tercerizamos ni dejamos proyectos abandonados. Este es el equipo real que diseña, programa, acompaña y atiende cada detalle de tu sistema."
              align="center"
            />

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card flex flex-col rounded-[26px] p-5 text-center md:rounded-[30px]"
                >
                  <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-[#7c8d69]/25 bg-[radial-gradient(circle_at_top,rgba(111,126,96,0.25),rgba(15,20,16,0.9))] shadow-[0_15px_40px_rgba(0,0,0,0.3)] md:h-28 md:w-28">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold tracking-tight text-[#b9c5b0] md:text-4xl">
                        {member.initials}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold uppercase tracking-tight text-[#f4f6f1] md:text-xl">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#93a682]">
                    {member.role}
                  </p>
                  <p className="mt-4 text-xs leading-5 text-[#b0baa6] flex-1">
                    {member.detail}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA después de Equipo */}
            <SectionCTA
              onStart={onStart}
              text="Conocenos en una llamada estratégica"
              subtext="Sin intermediarios · Te atiende directamente el equipo técnico"
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. TIPOS DE CONTRATACIÓN (Adaptados para cerrar o financiar)             */}
        {/* ========================================================================= */}
        <section ref={plansSectionRef} id="planes" className="px-4 py-14 md:px-10 md:py-20 border-t border-white/6">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Flexibilidad comercial"
              title="Tres formas de contratar APOC, según tu empresa."
              description="Si no agendaste antes, mira cómo podés financiar tu sistema en cuotas, pagar por hitos cerrados o incorporarnos como departamento de tecnología continuo."
              align="center"
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {commercialOptions.map((option, index) => (
                <div key={option.id} className="gsap-plan-card h-full">
                  <article className="glass-card group flex h-full flex-col justify-between rounded-[28px] p-6 transition duration-400 hover:border-[#8ea278]/40 md:rounded-[34px] md:p-7">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-[#91a27c]/25 bg-[#849570]/15 px-3 text-[11px] font-bold tracking-[0.16em] text-[#dfe8d6]">
                          0{index + 1}
                        </span>
                        <p className="text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9ba990]">
                          {option.model}
                        </p>
                      </div>

                      <h3 className="mt-5 text-2xl font-bold tracking-tight text-[#f5f7f1] md:text-[1.75rem]">
                        {option.name}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-[#e4eadf]">
                        {option.tagline}
                      </p>
                      <p className="mt-3 text-xs leading-6 text-[#abb7a2]">
                        {option.summary}
                      </p>

                      <div className="mt-5 grid grid-cols-2 gap-2 overflow-hidden rounded-[18px] border border-white/8 bg-black/25 p-3 text-left">
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#87947e]">Pago</p>
                          <p className="mt-1 text-xs font-semibold text-[#edf1e8]">{option.payment}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#87947e]">Propiedad</p>
                          <p className="mt-1 text-xs font-semibold text-[#edf1e8]">{option.ownership}</p>
                        </div>
                      </div>

                      <div className="mt-5 space-y-2.5 border-t border-white/8 pt-5">
                        {option.items.slice(0, 4).map((item) => (
                          <div key={item} className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#849570]/20 text-[9px] text-[#cbd8bf]">
                              ✓
                            </span>
                            <p className="text-xs leading-5 text-[#d5dccf]">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-7 pt-2">
                      <a
                        href={getOptionWhatsAppHref(option)}
                        target="_blank"
                        rel="noreferrer"
                        className="magnetic-button inline-flex w-full items-center justify-center rounded-full border border-[#9aaa84]/35 bg-[linear-gradient(180deg,#829270,#6d7c5e)] px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f7f8f3] shadow-[0_15px_40px_rgba(82,96,66,0.25)] transition hover:bg-[#7b8a6a]"
                      >
                        Consultar plan por WhatsApp
                      </a>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {/* CTA después de Planes */}
            <SectionCTA
              onStart={onStart}
              text="¿No sabés cuál elegir? Te asesoramos en una llamada"
              subtext="Evaluamos el plan ideal según tu flujo de caja y prioridad técnica"
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CALCULADORA DE AHORRO Y PÉRDIDA OPERATIVA                              */}
        {/* ========================================================================= */}
        <section id="calculadora-ahorro" className="px-4 py-14 md:px-10 md:py-20 border-t border-white/6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <SectionHeading
                eyebrow="Calculadora de impacto"
                title="Calcula cuánto dinero estás perdiendo en procesos manuales."
                description="Ingresá datos estimados de tu operación para dimensionar las horas perdidas y el ahorro real que recuperás automatizando."
              />

              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card rounded-[26px] p-5 sm:p-6 md:rounded-[32px] md:p-8"
              >
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <label className="rounded-[20px] border border-white/8 bg-black/20 p-3.5 text-left">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f9a84]">Personas en el proceso</p>
                    <input
                      type="number"
                      min="1"
                      value={calculatorInputs.people}
                      onChange={(e) => handleCalculatorChange("people", e.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/6 px-3 py-2 text-xl font-bold text-[#f6f7f2] outline-none focus:border-[#7b8a6a]"
                    />
                    <p className="mt-1.5 text-[11px] text-[#9ea797]">Cantidad de empleados involucrados.</p>
                  </label>

                  <label className="rounded-[20px] border border-white/8 bg-black/20 p-3.5 text-left">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f9a84]">Horas/sem por persona</p>
                    <input
                      type="number"
                      min="1"
                      value={calculatorInputs.hoursPerWeek}
                      onChange={(e) => handleCalculatorChange("hoursPerWeek", e.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/6 px-3 py-2 text-xl font-bold text-[#f6f7f2] outline-none focus:border-[#7b8a6a]"
                    />
                    <p className="mt-1.5 text-[11px] text-[#9ea797]">Horas manuales semanales en tareas repetitivas.</p>
                  </label>

                  <label className="rounded-[20px] border border-white/8 bg-black/20 p-3.5 text-left">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f9a84]">Costo mensual/persona (USD)</p>
                    <input
                      type="number"
                      min="1"
                      step="50"
                      value={calculatorInputs.monthlyCost}
                      onChange={(e) => handleCalculatorChange("monthlyCost", e.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/6 px-3 py-2 text-xl font-bold text-[#f6f7f2] outline-none focus:border-[#7b8a6a]"
                    />
                    <p className="mt-1.5 text-[11px] text-[#9ea797]">Salario promedio mensual para costo por hora.</p>
                  </label>

                  <label className="rounded-[20px] border border-white/8 bg-black/20 p-3.5 text-left">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f9a84]">Automatizable</p>
                      <span className="text-sm font-bold text-[#eef2e8]">{calculatorInputs.automatablePercent}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      step="5"
                      value={calculatorInputs.automatablePercent}
                      onChange={(e) => handleCalculatorChange("automatablePercent", e.target.value)}
                      className="mt-4 w-full accent-[#7b8a6a]"
                    />
                    <p className="mt-1.5 text-[11px] text-[#9ea797]">Porcentaje de tareas que un sistema puede asumir.</p>
                  </label>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[20px] border border-white/8 bg-black/25 p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f9a84]">Pérdida operativa actual</p>
                    <p className="mt-2 text-2xl font-bold text-[#f47272]">
                      {formatCurrency(monthlyCostOfManualWork)} <span className="text-xs text-[#b8c2af]">/ mes</span>
                    </p>
                    <p className="mt-1 text-xs text-[#aab4a1]">
                      Equivale a <strong>{Math.round(monthlyHoursLost)} horas</strong> de trabajo manual al mes.
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-[#7d8d6a]/30 bg-[linear-gradient(180deg,rgba(111,126,96,0.18),rgba(255,255,255,0.04))] p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#a4b892]">Ahorro recuperable estimado</p>
                    <p className="mt-2 text-2xl font-bold text-[#b4cca0]">
                      {formatCurrency(estimatedMonthlySaving)} <span className="text-xs text-[#dfe7d7]">/ mes</span>
                    </p>
                    <p className="mt-1 text-xs text-[#d5decb]">
                      Proyección anual: <strong className="text-white">{formatCurrency(estimatedAnnualSaving)}</strong>
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                  <PrimaryButton onClick={onStart} className="w-full sm:w-auto">
                    Quiero recuperar este dinero → Agendar llamada
                  </PrimaryButton>
                  <a
                    href={contactInfo.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/4 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#d6ddce] transition hover:border-white/20 hover:text-white"
                  >
                    Hablar por WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. CONTACTO (Llamado final claro y directo)                                */}
        {/* ========================================================================= */}
        <section id="contacto" className="px-4 py-16 md:px-10 md:py-24 border-t border-white/6">
          <div className="mx-auto max-w-4xl text-center">
            <SectionTag>Hablemos de tu proyecto</SectionTag>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#f6f7f3] md:text-5xl">
              Si tu empresa está lista para evolucionar, agendemos hoy.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#abb5a2] md:text-lg">
              Evaluamos tus cuellos de botella, te mostramos qué arquitectura conviene y cómo resolverlo con software seguro y escalable.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryButton onClick={onStart} className="w-full sm:w-auto px-10 py-4 text-sm">
                Agendar tu llamada estratégica gratuita
              </PrimaryButton>
            </div>

            {/* Accesos rápidos de contacto directo */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-[#cdd5c6] md:gap-8">
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 transition hover:border-white/20"
              >
                <SocialIcon label="WhatsApp" />
                <span>{contactInfo.whatsapp}</span>
              </a>
              <a
                href={contactInfo.phoneHref}
                className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-[#d7ddd0] transition hover:border-white/20 hover:text-white"
              >
                <SocialIcon label="Phone" />
                <span>{contactInfo.phone}</span>
              </a>
              <a
                href={contactInfo.emailHref}
                className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-[#d7ddd0] transition hover:border-white/20 hover:text-white"
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
      <footer className="relative z-10 border-t border-white/8 bg-black/30 px-4 py-10 md:px-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4 md:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/6">
                <img
                  src="/logo-sin-fondo-apoc.webp"
                  alt="APOC Automation"
                  loading="lazy"
                  className="h-7 w-7 object-contain"
                />
              </div>
              <p className="text-base font-semibold text-[#f4f6f1]">
                APOC <span className="text-[#8ea27a]">AUTOMATION</span>
              </p>
            </div>
            <p className="mt-3 text-xs leading-6 text-[#9da694]">
              Desarrollo de software a medida, automatización e IA para empresas de Argentina y Latinoamérica.
            </p>
            <div className="mt-4 flex gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#a1ac98] transition hover:text-white"
                  aria-label={item.label}
                >
                  <SocialIcon label={item.label} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#dfe5d8] font-semibold">Secciones</p>
            <div className="mt-3 space-y-2 text-xs text-[#9da694]">
              <a href="#casos-exito" className="block transition hover:text-white">Casos de éxito</a>
              <a href="#testimonios" className="block transition hover:text-white">Testimonios</a>
              <a href="#equipo" className="block transition hover:text-white">Equipo dedicado</a>
              <a href="#planes" className="block transition hover:text-white">Planes de contratación</a>
              <a href="#calculadora-ahorro" className="block transition hover:text-white">Calculadora</a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#dfe5d8] font-semibold">Empresa</p>
            <div className="mt-3 space-y-2 text-xs text-[#9da694]">
              <Link to="/casos-de-éxito" className="block transition hover:text-white">Portfolio completo</Link>
              <button onClick={onStart} className="block text-left transition hover:text-white">Agendar llamada</button>
              <a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="block transition hover:text-white">Atención comercial</a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#dfe5d8] font-semibold">Contacto</p>
            <div className="mt-3 space-y-2 text-xs text-[#9da694]">
              <a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="block transition hover:text-white">WhatsApp: {contactInfo.whatsapp}</a>
              <a href={contactInfo.phoneHref} className="block transition hover:text-white">Tel: {contactInfo.phone}</a>
              <a href={contactInfo.emailHref} className="block transition hover:text-white">{contactInfo.email}</a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-white/8 pt-6 text-xs text-[#7c8574] md:flex-row md:items-center md:justify-between">
          <span>© 2025 APOC Automation. Todos los derechos reservados.</span>
          <span>Hecho con dedicación en Argentina</span>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 9. BARRA MÓVIL INFERIOR FIJA                                              */}
      {/* ========================================================================= */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#090b0a]/92 p-2.5 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <a
            href={contactInfo.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#d7ddd0]"
            aria-label="WhatsApp"
          >
            <SocialIcon label="WhatsApp" />
          </a>
          <PrimaryButton onClick={onStart} className="flex-1 rounded-[1.05rem] px-3 py-2.5 text-[9px] tracking-[0.05em]">
            Agendá tu llamada gratis
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
