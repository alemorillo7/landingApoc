import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import {
  caseStudies,
  clientLogos,
  commercialOptions,
  contactInfo,
  differentiators,
  expertise,
  featuredCaseStudies,
  featuredTestimonials,
  heroVideo,
  heroStats,
  methodology,
  socialLinks,
  team,
  videoTestimonial,
} from "./siteData.js";

const HeroScene = lazy(() => import("./HeroScene.jsx"));

gsap.registerPlugin(ScrollTrigger, useGSAP);

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const cinematicProjectIds = ["realt-ia", "ramayo-propiedades", "rc-autopartes"];
const cinematicProjectPositions = [
  "left-1/2 top-[40%] z-30 w-[82%] -translate-x-1/2 lg:top-[27%] lg:w-[52%]",
  "-left-[25%] top-[47%] z-20 w-[72%] -rotate-[10deg] lg:-left-[3%] lg:top-[31%] lg:w-[40%] lg:-rotate-[7deg]",
  "-right-[25%] top-[49%] z-10 w-[70%] rotate-[10deg] lg:-right-[3%] lg:top-[33%] lg:w-[39%] lg:rotate-[7deg]",
];

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
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <SectionTag>{eyebrow}</SectionTag>
      <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#f3f4ef] md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-[#aab3a0] md:text-lg">{description}</p>
    </motion.div>
  );
}

function PrimaryButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`magnetic-button inline-flex items-center justify-center rounded-full border border-[#758464]/30 bg-[#6d7c5e] px-4 py-2.5 text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] text-center text-[#f7f8f3] shadow-[0_20px_60px_rgba(82,96,66,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7b8a6a] sm:px-7 sm:py-4 sm:text-[13px] sm:tracking-[0.2em] ${className}`}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, href, className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full border border-white/12 bg-white/4 px-4 py-2.5 text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] text-center text-[#d7ddd0] backdrop-blur-xl transition-all duration-300 hover:border-[#6d7c5e]/40 hover:text-white sm:px-7 sm:py-4 sm:text-[13px] sm:tracking-[0.2em] ${className}`}
    >
      {children}
    </a>
  );
}

function ProjectTags({ tags = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${
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

function ProjectCover({ study }) {
  const initials = study.client
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (study.image) {
    return (
      <div className="mt-4 flex h-52 items-center justify-center overflow-hidden rounded-[22px] border border-white/8 bg-[#050706] p-3">
        <img
          src={study.image}
          alt={study.client}
          className="h-full w-full object-contain object-center transition duration-500 group-hover:scale-[1.01]"
        />
      </div>
    );
  }

  return (
    <div className="mt-4 relative flex h-52 overflow-hidden rounded-[22px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(111,126,96,0.22),rgba(6,9,8,0.96))] p-4">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#708060]/14 blur-3xl" />
      <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-white/6 blur-3xl" />
      <div className="relative flex h-full w-full flex-col justify-between rounded-[18px] border border-white/8 bg-black/18 p-4">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full border border-[#7d8d6a]/24 bg-[#6f7d61]/12 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#dce3d3]">
            Caso real
          </span>
          <span className="text-3xl font-semibold tracking-[-0.06em] text-[#eef2e8]">
            {initials}
          </span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#93a084]">
            {study.industry.split(" - ")[0]}
          </p>
          <p className="mt-3 max-w-full break-words text-base font-medium leading-6 text-[#eef2e8] sm:max-w-[16rem] sm:text-lg sm:leading-7">
            {study.client}
          </p>
        </div>
      </div>
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
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 4h16v16H4z" />
      <path d="M8 9h8" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </svg>
  );
}

export default function Landing({ onStart }) {
  const [activeMethodStep, setActiveMethodStep] = useState(methodology[0]);
  const [enableHeroScene, setEnableHeroScene] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [calculatorInputs, setCalculatorInputs] = useState({
    people: 2,
    hoursPerWeek: 12,
    monthlyCost: 1200,
    automatablePercent: 60,
  });
  const plansSectionRef = useRef(null);
  const projectsSceneRef = useRef(null);
  const methodologySectionRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const gridX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const gridY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);
  const panelX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const panelY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const handleHeroMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const resetHeroMove = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    if (!mediaQuery.matches) return undefined;

    const timeoutId = window.setTimeout(() => {
      setEnableHeroScene(true);
    }, 180);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".gsap-plan-card");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set([".gsap-plans-heading", cards], { clearProps: "all" });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: plansSectionRef.current,
          start: "top 72%",
          once: true,
        },
      });
      const floatingCards = gsap.to(cards, {
        y: (index) => (index === 1 ? -13 : -8),
        duration: 2.2,
        stagger: 0.18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        paused: true,
      });
      const ambientLight = gsap.fromTo(
        ".gsap-plan-glow",
        { xPercent: -10, autoAlpha: 0 },
        {
          xPercent: 420,
          autoAlpha: 0.36,
          duration: 1.65,
          stagger: 0.48,
          repeat: -1,
          repeatDelay: 2.2,
          ease: "power2.inOut",
          paused: true,
        },
      );

      timeline
        .from(".gsap-plans-heading", {
          autoAlpha: 0,
          y: 58,
          duration: 0.95,
        })
        .from(
          cards,
          {
            autoAlpha: 0,
            xPercent: (index) => [-26, 0, 26][index],
            y: 130,
            rotateX: 12,
            rotateY: (index) => [16, 0, -16][index],
            scale: 0.9,
            filter: "blur(10px)",
            transformOrigin: "50% 50%",
            duration: 1.3,
            stagger: 0.18,
          },
          "-=0.48",
        )
        .to(cards, { filter: "blur(0px)", duration: 0.35, stagger: 0.1 }, "-=0.5")
        .from(
          ".gsap-plan-detail",
          {
            autoAlpha: 0,
            y: 16,
            duration: 0.55,
            stagger: 0.035,
          },
          "-=0.7",
        )
        .fromTo(
          ".gsap-plan-sheen",
          { xPercent: -150, autoAlpha: 0 },
          {
            xPercent: 150,
            autoAlpha: 0.9,
            duration: 1.15,
            stagger: 0.12,
            ease: "power2.inOut",
          },
          "-=0.65",
        )
        .call(() => {
          floatingCards.play();
          ambientLight.play();
        });

      gsap.to(".gsap-plans-orb", {
        yPercent: -28,
        xPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: plansSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: plansSectionRef },
  );

  useEffect(() => {
      const scene = projectsSceneRef.current;
      const cards = gsap.utils.toArray(".project-depth-card");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!scene || reducedMotion) {
        gsap.set(cards, { clearProps: "all" });
        return;
      }

      const context = gsap.context(() => {
      const compact = window.innerWidth < 1024;
      const mainCard = cards[0];
      const sideCards = cards.slice(1);

      gsap.set(mainCard, {
        autoAlpha: 1,
        scale: compact ? 1.08 : 1.32,
        yPercent: compact ? 16 : 22,
        rotateX: 5,
        z: compact ? 40 : 140,
      });
      gsap.set(sideCards, {
        autoAlpha: 0,
        scale: 0.72,
        filter: "blur(10px)",
      });
      gsap.set(sideCards[0], { xPercent: -52, rotateY: 22 });
      gsap.set(sideCards[1], { xPercent: 52, rotateY: -22 });
      gsap.set([".project-story-step", ".project-story-final"], { autoAlpha: 0, y: 24 });
      gsap.set(".project-story-progress", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".project-light-beam", { xPercent: -130, autoAlpha: 0 });

      const story = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scene,
          start: "top top+=72",
          end: "bottom bottom-=36",
          scrub: 1.05,
          invalidateOnRefresh: true,
        },
      });

      story
        .to(".project-story-progress", { scaleX: 1, duration: 1 }, 0)
        .to(".project-light-beam", { xPercent: 470, autoAlpha: 0.38, duration: 0.86 }, 0.05)
        .to(".project-orbit-ring", { rotate: 150, duration: 1 }, 0)
        .to(".project-cinematic-copy", { autoAlpha: 0, y: -28, duration: 0.12 }, 0.1)
        .to(
          mainCard,
          {
            scale: 1,
            yPercent: compact ? 3 : -5,
            rotateX: 0,
            z: 0,
            duration: 0.25,
          },
          0.12,
        )
        .to(".project-story-step-2", { autoAlpha: 1, y: 0, duration: 0.1 }, 0.27)
        .to(".project-story-step-2", { autoAlpha: 0, y: -20, duration: 0.1 }, 0.43)
        .to(
          mainCard,
          { scale: compact ? 0.9 : 0.82, yPercent: compact ? 8 : 5, duration: 0.23 },
          0.48,
        )
        .to(
          sideCards,
          {
            autoAlpha: 1,
            xPercent: 0,
            rotateY: (index) => (index === 0 ? -9 : 9),
            scale: compact ? 0.94 : 1,
            filter: "blur(0px)",
            duration: 0.24,
          },
          0.48,
        )
        .to(".project-story-step-3", { autoAlpha: 1, y: 0, duration: 0.1 }, 0.56)
        .to(sideCards, { rotateY: 0, scale: 1, duration: 0.18 }, 0.7)
        .to(".project-story-step-3", { autoAlpha: 0, y: -20, duration: 0.1 }, 0.76)
        .to(cards, { yPercent: (index) => [2, -4, 4][index], duration: 0.18 }, 0.78)
        .to(".project-story-final", { autoAlpha: 1, y: 0, duration: 0.14 }, 0.84);
      }, scene);

      return () => context.revert();
  }, []);

  useEffect(() => {
    let context;
    let updateFrame;
    const section = methodologySectionRef.current;

    if (!section) return undefined;

    const updateActiveMethodology = () => {
      const bounds = section.getBoundingClientRect();
      const desktop = window.innerWidth >= 1024;
      const startLine = desktop ? 96 : window.innerHeight * 0.68;
      const travelDistance = desktop
        ? Math.max(section.offsetHeight - window.innerHeight + 176, 1)
        : Math.max(section.offsetHeight + window.innerHeight * 0.3, 1);
      const progress = Math.min(1, Math.max(0, (startLine - bounds.top) / travelDistance));
      const nextIndex = Math.min(
        methodology.length - 1,
        Math.floor(progress * methodology.length),
      );

      setActiveMethodStep((current) =>
        current.step === methodology[nextIndex].step ? current : methodology[nextIndex],
      );
    };

    const requestMethodologyUpdate = () => {
      window.cancelAnimationFrame(updateFrame);
      updateFrame = window.requestAnimationFrame(updateActiveMethodology);
    };

    const initializeMethodology = () => {
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      context = gsap.context(() => {
        gsap.fromTo(
          ".methodology-step",
          { autoAlpha: 0, x: -24 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.58,
            stagger: 0.055,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform",
          },
        );

        gsap.to(".methodology-orbit", {
          rotate: 120,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }, section);

      ScrollTrigger.refresh();
      requestMethodologyUpdate();
    };

    window.addEventListener("scroll", requestMethodologyUpdate, { passive: true });
    window.addEventListener("resize", requestMethodologyUpdate);
    requestMethodologyUpdate();
    const initializationTimer = window.setTimeout(initializeMethodology, 120);

    return () => {
      window.clearTimeout(initializationTimer);
      window.cancelAnimationFrame(updateFrame);
      window.removeEventListener("scroll", requestMethodologyUpdate);
      window.removeEventListener("resize", requestMethodologyUpdate);
      context?.revert();
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncViewport = () => setIsDesktopViewport(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

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
    const message = `Hola APOC, me interesa la opción ${option.name} (${option.model}). Quiero recibir más información y entender si aplica para mi proyecto.`;
    const separator = contactInfo.whatsappHref.includes("?") ? "&" : "?";
    return `${contactInfo.whatsappHref}${separator}text=${encodeURIComponent(message)}`;
  };

  const heroVideoEmbedUrl = `https://www.youtube-nocookie.com/embed/${heroVideo.youtubeId}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1`;
  const cinematicStudies = cinematicProjectIds
    .map((id) => featuredCaseStudies.find((study) => study.id === id))
    .filter(Boolean);

  return (
    <div className="apoc-shell selection:bg-[#83926f] selection:text-[#0a0d0b]">
      <div className="apoc-noise" />
      <div className="hero-orb hero-orb-top" />
      <div className="hero-orb hero-orb-bottom" />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#090b0a]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 md:px-10 md:py-4">
          <a href="#inicio" className="flex min-w-0 items-center gap-2 md:gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/6 md:h-11 md:w-11">
              <img
                src="/logo-sin-fondo-apoc.png"
                alt="APOC Automation"
                className="h-7 w-7 object-contain md:h-8 md:w-8"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#95a286] md:text-xs md:tracking-[0.35em]">APOC AUTOMATION</p>
              <p className="hidden text-[11px] leading-tight text-[#c6cdbe] min-[360px]:block md:text-sm">Software, IA y automatización</p>
            </div>
          </a>

          <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.22em] text-[#9aa491] md:flex">
            <a href="#diferencial" className="transition hover:text-white">Por qué APOC</a>
            <a href="#planes-agentes-ia" className="transition hover:text-white">Planes</a>
            <a href="#proyectos" className="transition hover:text-white">Proyectos</a>
            <a href="#equipo" className="transition hover:text-white">Equipo</a>
            <a href="#metodologia" className="transition hover:text-white">Metodologia</a>
            <a href="#contacto" className="transition hover:text-white">Contacto</a>
          </div>

          <div className="flex items-center gap-2 md:gap-0">
            <PrimaryButton onClick={onStart} className="shrink-0 rounded-[1.15rem] px-4 py-2 !text-[9px] leading-none tracking-[0.04em] shadow-none sm:max-w-[9.5rem] sm:px-4 sm:py-2.5 sm:text-[10px] sm:tracking-[0.12em] md:max-w-none md:rounded-full md:px-5 md:py-3 md:text-[11px] md:tracking-[0.16em]">
              <span className="sm:hidden">Agendar</span>
              <span className="hidden sm:inline md:hidden">Agenda gratis</span>
              <span className="hidden md:inline">Agendá tu llamada gratis</span>
            </PrimaryButton>
            <button 
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#f2f4ee] md:hidden"
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[65px] z-40 border-b border-white/8 bg-[#090b0a]/95 px-5 py-6 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-5 text-xs uppercase tracking-[0.22em] text-[#9aa491]">
              <a href="#diferencial" onClick={() => setIsMobileMenuOpen(false)} className="transition hover:text-white">Por qué APOC</a>
              <a href="#planes-agentes-ia" onClick={() => setIsMobileMenuOpen(false)} className="transition hover:text-white">Planes</a>
              <a href="#proyectos" onClick={() => setIsMobileMenuOpen(false)} className="transition hover:text-white">Proyectos</a>
              <a href="#equipo" onClick={() => setIsMobileMenuOpen(false)} className="transition hover:text-white">Equipo</a>
              <a href="#metodologia" onClick={() => setIsMobileMenuOpen(false)} className="transition hover:text-white">Metodologia</a>
              <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="transition hover:text-white">Contacto</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pb-24 md:pb-0">
        <section
          id="inicio"
          onMouseMove={handleHeroMove}
          onMouseLeave={resetHeroMove}
          className="relative overflow-hidden px-4 pb-16 pt-28 md:px-10 md:pb-32 md:pt-40"
        >
          <div className="mx-auto max-w-7xl">
            <div className="hero-grid-layer" />
            <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
              <motion.div
                style={{ x: gridX, y: gridY }}
                className="pointer-events-none absolute inset-0 opacity-70"
              >
                <div className="apoc-grid absolute inset-x-[8%] top-12 h-[58vh] rounded-[40px]" />
              </motion.div>

              <motion.div
                variants={reveal}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative lg:col-span-8"
              >
                <SectionTag>Solo tomamos 3 proyectos por mes</SectionTag>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Automatización", "Agentes IA", "Software a medida"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#cdd5c4]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <h1 className="mt-7 max-w-5xl text-[2.45rem] font-semibold uppercase leading-[0.88] tracking-[-0.085em] text-[#f7f8f4] min-[360px]:text-[2.8rem] md:text-[5.2rem] xl:text-[5.7rem]">
                  <span className="block drop-shadow-[0_8px_30px_rgba(0,0,0,0.38)]">No desarrollamos</span>
                  <span className="block drop-shadow-[0_8px_30px_rgba(0,0,0,0.38)]">software rápido.</span>
                  <span className="block bg-[linear-gradient(180deg,#cfe0bf_0%,#8ea47b_100%)] bg-clip-text text-transparent drop-shadow-[0_10px_36px_rgba(120,141,95,0.26)]">
                    Desarrollamos
                  </span>
                  <span className="block drop-shadow-[0_8px_30px_rgba(0,0,0,0.38)]">software que no tengas que rehacer después.</span>
                </h1>

                <div className="mt-5 h-px w-20 bg-[linear-gradient(90deg,rgba(164,184,140,0.9),rgba(164,184,140,0))]" />

                <p className="mt-5 max-w-[46rem] text-[15px] leading-7 text-[#c7d0bd] md:mt-6 md:text-[19px] md:leading-8">
                  Diseñamos agentes de IA, automatizaciones y software seguros, escalables y
                  estables para empresas que ya no pueden seguir resolviendo con Excel. Creamos un
                  sistema que realmente pueda sostener tu crecimiento.
                </p>

                <div className="mt-6 lg:hidden">
                  <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0f1310]/88 p-2.5 shadow-[0_24px_64px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
                    <div className="overflow-hidden rounded-[16px] border border-white/10 bg-black">
                      <div className="mx-auto aspect-[16/9] w-full max-w-[19rem]">
                        <iframe
                          className="h-full w-full"
                          src={isDesktopViewport ? "about:blank" : heroVideoEmbedUrl}
                          title={heroVideo.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#9aa78c]">
                          {heroVideo.title}
                        </p>
                        <p className="mt-2 text-sm font-medium leading-6 text-[#f3f5ef]">
                          {heroVideo.heading}
                        </p>
                      </div>
                      <span className="rounded-full border border-[#6c7a5d]/35 bg-[#6c7a5d]/15 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-[#d3dbc9]">
                        {heroVideo.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-7 hidden max-w-3xl rounded-[24px] border border-[#7d8d6a]/22 bg-[linear-gradient(180deg,rgba(111,126,96,0.12),rgba(255,255,255,0.03))] p-4 backdrop-blur-xl md:block md:p-5">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#92a083]">
                    La diferencia esta después
                  </p>
                  <p className="mt-3 text-base font-medium leading-7 text-[#eef2e8] md:text-lg md:leading-8">
                    Los errores, las vulnerabilidades y las malas decisiones tecnicas suelen aparecer meses después de lanzar un sistema.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#c6cec0] md:text-base md:leading-7">
                    En APOC diseñamos soluciones seguras, escalables y preparadas para acompañar el crecimiento de tu empresa desde el primer día.
                  </p>
                </div>

                <div className="mt-8 hidden gap-3 sm:grid-cols-3 md:grid">
                  {[
                    "Menos carga manual y más control operativo.",
                    "Integraciones, trazabilidad y estructura real.",
                    "Implementación con criterio técnico y foco comercial.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-[#d5dccd]"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton onClick={onStart} className="w-full sm:w-auto">
                    Agendar diagnóstico
                  </PrimaryButton>
                  <SecondaryButton href="#testimonios" className="w-full sm:w-auto">
                    Ver resultado real
                  </SecondaryButton>
                  <SecondaryButton href="#calculadora-ahorro" className="w-full sm:w-auto">
                    Calcular ahorro
                  </SecondaryButton>
                </div>

                <div className="mt-8 hidden gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:grid">
                  <div className="rounded-[28px] border border-[#738261]/18 bg-white/5 p-5 text-sm leading-7 text-[#c4ccb9] backdrop-blur-2xl">
                    <p className="font-medium uppercase tracking-[0.22em] text-[#8f9c82]">
                      Que hacemos
                    </p>
                    <p className="mt-3 text-base font-medium leading-7 text-[#eef1e8]">
                      Diseñamos e implementamos sistemas que reemplazan tareas manuales, mejoran
                      atención, ordenan operación y escalan mejor con el negocio.
                    </p>
                    <p className="mt-3">
                      Desde el primer discovery definimos arquitectura, integraciones, testing y
                      puesta en marcha para que el proyecto no dependa de parches ni improvisación.
                    </p>
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 backdrop-blur-2xl">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f9c82]">
                      Ideal para empresas que
                    </p>
                    <div className="mt-4 space-y-3">
                      {[
                        "Reciben muchas consultas y respuestas repetitivas.",
                        "Tienen procesos internos lentos o desordenados.",
                        "Necesitan un sistema propio, no otra solución generica.",
                      ].map((item) => (
                        <div key={item} className="flex gap-3">
                          <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#81906f]" />
                          <p className="text-sm leading-6 text-[#d5dccd]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {heroStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      variants={reveal}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 + index * 0.08, duration: 0.55 }}
                      className="glass-card rounded-[24px] p-4 sm:rounded-[28px] sm:p-5"
                    >
                      <p className="text-2xl font-semibold tracking-[-0.05em] text-[#f5f6f1] sm:text-3xl">{stat.value}</p>
                      <p className="mt-2 text-[10px] uppercase leading-4 tracking-[0.16em] text-[#95a286] sm:text-xs sm:tracking-[0.2em]">{stat.label}</p>
                      {stat.detail ? <p className="mt-3 text-sm leading-6 text-[#aeb7a6]">{stat.detail}</p> : null}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#8e9984]">Empresas y verticales con foco operacional</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
                    {clientLogos.map((item) => (
                      <div key={item} className="glass-card flex min-h-[52px] min-w-0 items-center justify-center rounded-2xl px-3 py-2 text-center text-[11px] uppercase leading-4 tracking-[0.1em] text-[#c2cab8] break-words sm:h-14 sm:text-sm sm:tracking-[0.16em]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{ x: panelX, y: panelY }}
                variants={reveal}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.15 }}
                className="relative hidden lg:col-span-4 lg:block"
              >
                <div className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-[#667659]/20 blur-3xl" />
                <div className="absolute -bottom-12 right-0 h-44 w-44 rounded-full bg-[#869c72]/18 blur-3xl" />

                <div className="relative space-y-4">
                  <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0e1210]/85 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:rounded-[34px] sm:p-6">
                    <div className="absolute inset-0 opacity-90">
                      {enableHeroScene ? (
                        <Suspense fallback={<div className="hero-canvas-fallback" />}>
                          <HeroScene />
                        </Suspense>
                      ) : (
                        <div className="hero-canvas-fallback" />
                      )}
                    </div>

                    <div className="relative">
                      <div className="mb-5 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#7a8868]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                        <span className="ml-3 text-[10px] uppercase tracking-[0.28em] text-[#92a082]">
                          Resultado visible
                        </span>
                      </div>

                      <div className="rounded-[22px] border border-white/10 bg-black/35 p-3">
                        <div className="overflow-hidden rounded-[18px] border border-white/10 bg-black">
                          <div className="mx-auto aspect-[16/9] w-full max-w-[21rem]">
                            <iframe
                              className="h-full w-full"
                              src={isDesktopViewport ? heroVideoEmbedUrl : "about:blank"}
                              title={heroVideo.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            />
                          </div>
                        </div>

                        <div className="mt-4 flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8c9880]">
                              {heroVideo.title}
                            </p>
                            <p className="mt-2 text-base font-medium text-[#f2f4ee] sm:text-lg">
                              {heroVideo.heading}
                            </p>
                            {heroVideo.description ? (
                              <p className="mt-3 max-w-xl text-sm leading-6 text-[#b7c0af]">
                                {heroVideo.description}
                              </p>
                            ) : null}
                          </div>
                          <span className="rounded-full border border-[#6c7a5d]/35 bg-[#6c7a5d]/15 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#d3dbc9]">
                            {heroVideo.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.24em] text-[#81906f]">
                          Como avanzamos
                        </p>
                        <p className="mt-2 text-base font-medium text-[#f3f5ef] sm:text-lg">
                          Proceso claro, con testing y foco operativo.
                        </p>
                      </div>
                      <span className="rounded-full border border-[#6c7a5d]/35 bg-[#6c7a5d]/15 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#d3dbc9]">
                        4 etapas
                      </span>
                    </div>

                    <div className="mt-4 space-y-4">
                      {[
                        {
                          num: "01",
                          title: "Diagnóstico",
                          text: "Detectamos cuello de botella, impacto y prioridad real.",
                        },
                        {
                          num: "02",
                          title: "Arquitectura e integraciones",
                          text: "Definimos estructura, herramientas y alcance técnico.",
                        },
                        {
                          num: "03",
                          title: "Testing, QA y personalización",
                          text: "Validamos calidad y adaptamos el sistema a tu operación.",
                        },
                        {
                          num: "04",
                          title: "Salida productiva",
                          text: "Lanzamos con soporte, seguimiento y mejora continua.",
                        },
                      ].map((item) => (
                        <div
                          key={item.num}
                          className="flex gap-3 border-t border-white/8 pt-4 first:border-t-0 first:pt-0"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#6f7d61]/30 bg-[#6f7d61]/15 text-xs font-semibold text-[#b9c5b0] sm:h-10 sm:w-10 sm:text-sm">
                            {item.num}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#f3f5ef] sm:text-base">
                              {item.title}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-[#9ea89a] sm:text-sm sm:leading-6">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      <a
                        href={contactInfo.whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-[20px] border border-[#7c8d69]/18 bg-black/28 px-4 py-3 text-left transition hover:border-[#7c8d69]/28 sm:rounded-[24px] sm:px-5 sm:py-4"
                      >
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d9882]">
                          WhatsApp
                        </p>
                        <p className="mt-2 text-base font-medium text-[#eff2ea]">
                          {contactInfo.whatsapp}
                        </p>
                      </a>
                      <a
                        href={contactInfo.phoneHref}
                        className="rounded-[20px] border border-[#7c8d69]/18 bg-black/28 px-4 py-3 text-left transition hover:border-[#7c8d69]/28 sm:rounded-[24px] sm:px-5 sm:py-4"
                      >
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d9882]">
                          Llamanos
                        </p>
                        <p className="mt-2 text-base font-medium text-[#eff2ea]">
                          {contactInfo.phone}
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="diferencial" className="px-4 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Por qué en APOC"
              title="Construimos sistemas pensados para durar y crecer con tu operación."
              description="Nos posicionamos desde arquitectura, seguridad, seguimiento y criterio técnico. La idea no es solo desarrollar, sino construir una base confiable para el negocio."
              align="center"
            />

            <div className="mt-10 grid gap-4 lg:mt-14 lg:gap-6 lg:grid-cols-2 xl:grid-cols-4">
              {differentiators.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.06 }}
                  className="relative overflow-hidden rounded-[28px] border border-[#7f926b]/20 bg-[linear-gradient(180deg,rgba(111,126,96,0.12),rgba(255,255,255,0.04))] p-5 shadow-[0_40px_100px_rgba(53,61,44,0.2)] md:rounded-[34px] md:p-8"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#738261]/10 blur-3xl" />
                  <p className="relative text-xs uppercase tracking-[0.24em] text-[#9cab8d]">Por que APOC</p>
                  <h3 className="relative mt-4 text-2xl font-semibold tracking-[-0.04em] text-[#f6f7f3] md:text-3xl">{item.title}</h3>
                  <p className="relative mt-5 text-sm leading-7 text-[#d6ddce] md:text-base md:leading-8">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <PrimaryButton onClick={onStart}>
                <span className="sm:hidden">Quiero construir bien</span>
                <span className="hidden sm:inline">Quiero construir bien desde el inicio</span>
              </PrimaryButton>
            </div>
          </div>
        </section>

        <section
          ref={plansSectionRef}
          id="planes-agentes-ia"
          className="relative overflow-hidden px-4 py-16 md:px-10 md:py-24"
        >
          <div className="gsap-plans-orb pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-[#82956c]/10 blur-[110px]" />
          <div className="relative mx-auto max-w-7xl [perspective:1400px]">
            <div className="gsap-plans-heading">
              <SectionHeading
                eyebrow="Cómo trabajamos"
                title="Tres formas de contratar APOC, según dónde esté tu empresa."
                description="Podés financiar tu software propio, comprar un proyecto cerrado o incorporar a APOC como departamento de tecnología continuo. El modelo se adapta a tu etapa y a tus objetivos."
              />
            </div>

            <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
              {commercialOptions.map((option, index) => (
                <div key={option.id} className="gsap-plan-card h-full">
                <article className="group relative flex h-full overflow-hidden rounded-[30px] border border-[#9baa87]/20 bg-[linear-gradient(155deg,rgba(132,149,111,0.15)_0%,rgba(15,19,16,0.96)_34%,rgba(7,9,8,0.98)_100%)] p-[1px] shadow-[0_28px_90px_rgba(0,0,0,0.34)] transition duration-500 hover:-translate-y-1 hover:border-[#a9ba93]/40 hover:shadow-[0_34px_110px_rgba(65,77,53,0.22)] md:rounded-[36px]">
                  <div className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 rounded-full bg-[#92a67a]/10 blur-3xl transition duration-500 group-hover:bg-[#92a67a]/16" />
                  <div className="gsap-plan-glow pointer-events-none absolute -left-1/2 top-0 z-10 h-full w-1/2 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(196,218,172,0.12),rgba(235,244,225,0.2),transparent)] blur-xl" />
                  <div className="gsap-plan-sheen pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(213,231,192,0.95),transparent)] shadow-[0_0_18px_rgba(180,205,151,0.65)]" />

                  <div className="relative flex h-full w-full flex-col rounded-[29px] bg-[linear-gradient(180deg,rgba(17,21,18,0.88),rgba(8,10,9,0.96))] p-5 md:rounded-[35px] md:p-7">
                    <div className="gsap-plan-detail flex items-center justify-between gap-4">
                      <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-[#91a27c]/25 bg-[#849570]/10 px-3 text-[11px] font-semibold tracking-[0.18em] text-[#dfe8d6]">
                        0{index + 1}
                      </span>
                      <p className="text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9ba990]">
                        {option.model}
                      </p>
                    </div>

                    <h3 className="gsap-plan-detail mt-7 text-[1.9rem] font-semibold tracking-[-0.055em] text-[#f5f7f1] md:text-[2.15rem]">
                      {option.name}
                    </h3>
                    <p className="gsap-plan-detail mt-3 min-h-[4rem] text-lg font-medium leading-7 text-[#e4eadf]">
                      {option.tagline}
                    </p>
                    <p className="gsap-plan-detail mt-4 min-h-[5.25rem] text-sm leading-7 text-[#aeb9a5] md:text-[15px]">
                      {option.summary}
                    </p>

                    <div className="gsap-plan-detail mt-6 grid grid-cols-2 overflow-hidden rounded-[20px] border border-white/8 bg-black/20">
                      <div className="border-r border-white/8 p-4">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#87947e]">
                          Modalidad de pago
                        </p>
                        <p className="mt-2 text-sm font-medium leading-5 text-[#edf1e8]">
                          {option.payment}
                        </p>
                      </div>
                      <div className="p-4">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#87947e]">
                          Propiedad
                        </p>
                        <p className="mt-2 text-sm font-medium leading-5 text-[#edf1e8]">
                          {option.ownership}
                        </p>
                      </div>
                    </div>

                    <div className="gsap-plan-detail mt-7 flex-1 space-y-3.5 border-t border-white/8 pt-7">
                      {option.items.map((item) => (
                        <div key={item} className="flex gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#91a27c]/25 bg-[#849570]/10 text-[10px] text-[#cbd8bf]">
                            ✓
                          </span>
                          <p className="text-sm leading-6 text-[#d5dccf] md:text-[15px]">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    {option.terms?.length ? (
                      <div className="gsap-plan-detail mt-7 rounded-[22px] border border-[#7a8a67]/25 bg-[linear-gradient(180deg,rgba(111,126,96,0.12),rgba(255,255,255,0.03))] p-4 md:rounded-[26px] md:p-5">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-[#909d83]">
                          Plazos sugeridos
                        </p>
                        <div className="mt-4 grid gap-3 md:grid-cols-3">
                          {option.terms.map((term) => (
                            <div
                              key={term.value}
                              className="flex items-center justify-center rounded-[16px] border border-white/8 bg-black/25 p-3 md:rounded-[18px] md:p-4"
                            >
                              <p className="text-sm font-semibold tracking-[-0.02em] text-[#eef2e8] md:text-lg">
                                {term.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {option.includes?.length ? (
                      <div className="gsap-plan-detail mt-6">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-[#909d83]">
                          Incluye
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {option.includes.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[11px] font-medium text-[#dce3d3]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div className="gsap-plan-detail mt-8 pt-2">
                      <a
                        href={getOptionWhatsAppHref(option)}
                        target="_blank"
                        rel="noreferrer"
                        className="magnetic-button inline-flex w-full items-center justify-center rounded-full border border-[#9aaa84]/35 bg-[linear-gradient(180deg,#829270,#6d7c5e)] px-4 py-3 text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] text-[#f7f8f3] shadow-[0_18px_50px_rgba(82,96,66,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b0c09c]/50 hover:bg-[linear-gradient(180deg,#91a17e,#788969)] sm:px-7 sm:py-4 sm:text-[12px] sm:tracking-[0.18em]"
                      >
                        Quiero avanzar con APOC
                      </a>
                    </div>
                  </div>
                </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="proyectos" className="px-4 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Casos de éxito"
              title="Seleccionamos los casos más fuertes para mostrar resultado, criterio y nivel de ejecución."
              description={`Estos ${featuredCaseStudies.length} casos resumen el tipo de proyectos que mejor representan a APOC Automation. El portfolio completo ya supera los ${caseStudies.length} desarrollos recientes no tercerizados.`}
            />

            <div
              ref={projectsSceneRef}
              className="relative mt-10 h-[220vh] md:mt-14 md:h-[240vh]"
              aria-label="Escena interactiva de proyectos de APOC"
            >
              <div className="sticky top-[4.5rem] h-[calc(100vh-9rem)] min-h-[520px] overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_50%_42%,rgba(119,139,96,0.2),transparent_28%),linear-gradient(180deg,#101512_0%,#080b09_58%,#050706_100%)] shadow-[0_45px_150px_rgba(0,0,0,0.42)] md:rounded-[42px] lg:top-20 lg:h-[calc(100vh-6.5rem)] lg:min-h-[620px]">
              <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(157,178,135,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(157,178,135,0.07)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-[54%] h-px bg-[linear-gradient(90deg,transparent,rgba(160,188,132,0.34),transparent)] shadow-[0_0_45px_rgba(124,155,95,0.32)] lg:top-[58%]" />
              <div className="pointer-events-none absolute left-1/2 top-[46%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#71885a]/12 blur-[90px] md:h-[34rem] md:w-[34rem]" />
              <div className="pointer-events-none absolute left-1/2 top-[44%] h-64 w-64 -translate-x-1/2 rounded-full border border-[#9bae84]/16 shadow-[0_0_120px_rgba(126,148,101,0.22)] md:h-96 md:w-96" />
              <div className="project-orbit-ring pointer-events-none absolute left-1/2 top-[44%] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full border border-dashed border-[#9bae84]/12 md:h-[46rem] md:w-[46rem]" />
              <div className="project-light-beam pointer-events-none absolute -left-1/3 top-0 z-10 h-full w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(190,218,160,0.08),rgba(225,241,207,0.17),transparent)] blur-2xl" />
              <div className="pointer-events-none absolute inset-x-[8%] bottom-[-12%] hidden h-72 origin-bottom rounded-[50%] border border-[#95aa7a]/12 bg-[radial-gradient(ellipse_at_center,rgba(114,139,90,0.14),transparent_64%)] [transform:rotateX(72deg)] lg:block" />
              <div className="pointer-events-none absolute left-1/2 top-[49%] -translate-x-1/2 whitespace-nowrap text-[4rem] font-semibold uppercase tracking-[-0.08em] text-white/[0.025] md:text-[7rem] lg:text-[10rem]">
                APOC SYSTEMS
              </div>

              <div className="project-cinematic-copy absolute inset-x-4 top-6 z-40 max-w-xl md:inset-x-8 md:top-8 lg:left-10 lg:right-auto lg:top-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#95a77e]/20 bg-[#8da077]/8 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#cbd7c0] backdrop-blur-xl">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a9bd91] shadow-[0_0_12px_rgba(169,189,145,0.8)]" />
                  Experiencia interactiva
                </div>
                <h3 className="mt-4 max-w-md text-2xl font-semibold tracking-[-0.045em] text-[#f3f6ef] md:text-3xl">
                  Sistemas reales, mostrados con profundidad.
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-[#aeb9a5] md:text-[15px] md:leading-7">
                  Deslizá para descubrir cómo una operación se transforma en un sistema completo.
                </p>
              </div>

              <div className="project-story-step project-story-step-2 pointer-events-none absolute inset-x-4 top-7 z-40 max-w-lg opacity-0 md:inset-x-8 md:top-10 lg:left-10 lg:right-auto">
                <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#9caf88]">Una operación</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[#f3f6ef] md:text-4xl">
                  Todas sus capas, en un solo lugar.
                </h3>
              </div>

              <div className="project-story-step project-story-step-3 pointer-events-none absolute inset-x-4 top-7 z-40 max-w-lg opacity-0 md:inset-x-8 md:top-10 lg:left-auto lg:right-10 lg:text-right">
                <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#9caf88]">Tres negocios reales</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[#f3f6ef] md:text-4xl">
                  Una misma arquitectura para crecer.
                </h3>
              </div>

              <div className="absolute inset-0 z-20 [perspective:1700px] [transform-style:preserve-3d]">
                {cinematicStudies.map((study, index) => (
                  <Link
                    key={study.id}
                    to={`/proyectos/${study.id}`}
                    className={`project-depth-card absolute block will-change-transform [transform-style:preserve-3d] ${cinematicProjectPositions[index]}`}
                    aria-label={`Abrir proyecto ${study.client}`}
                  >
                    <div className="project-depth-inner [transform-style:preserve-3d]">
                      <div className="project-depth-float [transform-style:preserve-3d]">
                        <div className="group relative overflow-hidden rounded-[24px] border border-white/16 bg-[#0a0e0b]/94 p-2 shadow-[0_36px_100px_rgba(0,0,0,0.72),0_0_45px_rgba(116,143,89,0.09)] backdrop-blur-xl transition duration-500 hover:border-[#a9bc91]/55 hover:shadow-[0_44px_130px_rgba(63,79,48,0.38)] md:rounded-[30px] md:p-3">
                          <div className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(222,239,203,0.98),transparent)] shadow-[0_0_22px_rgba(190,215,164,0.7)]" />
                          <div className="flex h-8 items-center justify-between px-2 md:h-10 md:px-3">
                            <div className="flex gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#8ca077] shadow-[0_0_8px_rgba(140,160,119,0.7)] md:h-2 md:w-2" />
                              <span className="h-1.5 w-1.5 rounded-full bg-[#4f5947] md:h-2 md:w-2" />
                              <span className="h-1.5 w-1.5 rounded-full bg-[#343b31] md:h-2 md:w-2" />
                            </div>
                            <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#94a489] md:text-[9px]">
                              APOC / Producto real
                            </span>
                          </div>

                          <div className="relative aspect-[16/9] overflow-hidden rounded-[17px] border border-white/10 bg-[#050706] md:rounded-[22px]">
                            <img
                              src={study.image}
                              alt={`Interfaz del proyecto ${study.client}`}
                              className="h-full w-full object-contain brightness-[1.08] saturate-[1.08] transition duration-700 group-hover:scale-[1.035]"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.12),transparent_22%,transparent_70%,rgba(132,153,110,0.12))]" />
                          </div>

                          <div className="project-depth-label flex items-end justify-between gap-4 px-2 pb-2 pt-4 md:px-3 md:pb-3 md:pt-5">
                            <div>
                              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#94a489]">
                                Caso de éxito 0{index + 1}
                              </p>
                              <p className="mt-1 text-base font-semibold tracking-[-0.03em] text-[#f0f3eb] md:text-xl">
                                {study.client}
                              </p>
                            </div>
                            <span className="rounded-full border border-[#9eb187]/20 bg-[#8da077]/10 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#e1e9d9] md:text-[9px]">
                              Explorar
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="project-story-final pointer-events-none absolute inset-x-4 bottom-9 z-40 text-center opacity-0 md:inset-x-8 md:bottom-12">
                <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#9caf88]">El próximo sistema puede ser el tuyo</p>
                <p className="mx-auto mt-2 max-w-xl text-xl font-semibold tracking-[-0.04em] text-[#f3f6ef] md:text-3xl">
                  Construimos tecnología que acompaña el crecimiento.
                </p>
              </div>

              <div className="pointer-events-none absolute bottom-4 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#74806d] lg:flex">
                <span className="h-px w-10 bg-[linear-gradient(90deg,transparent,#74806d)]" />
                Deslizá para explorar
                <span className="h-px w-10 bg-[linear-gradient(90deg,#74806d,transparent)]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 z-50 h-px bg-white/5">
                <div className="project-story-progress h-full w-full bg-[linear-gradient(90deg,#718460,#b7c9a2)] shadow-[0_0_16px_rgba(166,190,139,0.65)]" />
              </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
              {featuredCaseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.08 }}
                  className="h-full"
                >
                  <Link
                    to={`/proyectos/${study.id}`}
                    className="glass-card group flex h-full flex-col rounded-[28px] p-5 text-left transition hover:border-[#7a8968]/30 md:rounded-[34px] md:p-7"
                  >
                    <ProjectTags tags={study.tags} />
                    <ProjectCover study={study} />
                    <div className="flex items-center justify-between gap-4">
                      <p className="mt-4 text-xs uppercase tracking-[0.24em] text-[#8d9882]">{study.industry}</p>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#d6ddce]">
                        abrir caso
                      </span>
                    </div>
                    <h3 className="mt-5 break-words text-2xl font-semibold leading-tight tracking-[-0.05em] text-[#f5f6f2] md:text-3xl">
                      {study.client}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#acb5a4]">{study.clientSummary}</p>

                    <div className="mt-5 rounded-[22px] border border-[#7d8d6a]/14 bg-[linear-gradient(180deg,rgba(111,126,96,0.12),rgba(255,255,255,0.03))] px-4 py-4">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[#93a084]">Resultado principal</p>
                      <p className="mt-3 text-sm leading-7 text-[#edf1e8]">{study.result}</p>
                    </div>

                    <div className="mt-6 rounded-[24px] border border-white/8 bg-black/20 p-4 md:mt-8 md:rounded-[28px] md:p-5">
                      <div className="grid grid-cols-2 gap-3">
                        {study.metrics.map((metric) => (
                          <div key={metric} className="rounded-2xl bg-white/5 px-3 py-3 text-xs text-[#dbe1d5] md:px-4 md:py-4 md:text-sm">
                            {metric}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {study.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[#aeb7a6]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-start">
              <PrimaryButton onClick={onStart}>Comenzar mi proyecto</PrimaryButton>
              <Link
                to="/casos-de-éxito"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/4 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d7ddd0] backdrop-blur-xl transition hover:border-[#6d7c5e]/40 hover:text-white md:px-7 md:py-4 md:text-[13px] md:tracking-[0.2em]"
              >
                Ver portfolio completo
              </Link>
            </div>
          </div>
        </section>

        <section id="equipo" className="px-4 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Quienes somos"
              title="Cada proyecto avanza con referentes de area y un equipo coordinado."
              description="APOC funciona como una software factory con criterio de ingenieria: roles claros, ownership técnico, seguimiento constante y un proceso profesional de punta a punta."
            />

            <div className="mt-10 grid gap-4 lg:mt-14 lg:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-6 md:grid-cols-2">
                {team.map((member, index) => (
                  <motion.div
                    key={member.name}
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.06 }}
                    className="glass-card rounded-[26px] p-5 md:rounded-[30px] md:p-6"
                  >
                    <div className="text-center">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-[#7c8d69]/20 bg-[radial-gradient(circle_at_top,rgba(111,126,96,0.22),rgba(17,23,17,0.9))] shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:h-28 md:w-28">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl font-semibold tracking-[-0.05em] text-[#b9c5b0] md:text-4xl">{member.initials}</span>
                        )}
                      </div>
                      <p className="mt-5 text-xl font-semibold uppercase tracking-[-0.04em] text-[#f5f6f2] md:mt-6 md:text-2xl">{member.name}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[#92a083]">{member.role}</p>
                    </div>
                    <p className="mt-5 text-center text-sm leading-7 text-[#aab3a0]">{member.detail}</p>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="glass-card rounded-[26px] p-5 md:rounded-[30px] md:p-7">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#92a083]">Timeline</p>
                  <div className="mt-6 space-y-5">
                    {[
                      "Briefing ejecutivo y diagnóstico",
                      "Blueprint funcional y técnico",
                      "Sprints con demos cortas",
                      "Release controlado y soporte premium",
                    ].map((item, index) => (
                      <div key={item} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#768665]/25 bg-[#6f7d61]/12 text-sm text-[#dce4d3]">
                            0{index + 1}
                          </div>
                          {index < 3 && <div className="mt-2 h-10 w-px bg-white/10" />}
                        </div>
                        <div className="pt-2 text-sm text-[#dfe5d8]">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-[26px] p-5 md:rounded-[30px] md:p-7">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#92a083]">Expertise</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {expertise.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#d5dccc]">
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-6 text-sm leading-7 text-[#aab3a0]">
                    Nuestro enfoque combina arquitectura, delivery y negocio. Eso permite construir
                    sistemas con mejor adopción interna y menos deuda técnica futura.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <PrimaryButton onClick={onStart}>Reservar reunión estratégica</PrimaryButton>
            </div>
          </div>
        </section>

        <section id="metodologia" className="px-4 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Metodología"
              title="Roadmap transparente para reducir riesgo y aumentar confianza."
              description="El cliente entiende qué recibe en cada etapa, cuándo ve avances y cómo se controla la calidad antes de pasar a producción."
            />

            <div ref={methodologySectionRef} className="relative mt-10 lg:mt-14 lg:h-[185vh]">
            <div className="grid gap-5 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-8">
              <div className="relative space-y-3 pl-2 md:pl-3">
                <p className="pb-2 pl-10 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7f8c75] md:pl-12">
                  <span className="lg:hidden">Tocá una etapa o seguí bajando</span>
                  <span className="hidden lg:inline">Deslizá para recorrer las 7 etapas</span>
                </p>
                <div className="pointer-events-none absolute bottom-5 left-[1.35rem] top-12 w-px bg-white/8 md:left-[1.6rem]">
                  <div
                    className="methodology-progress-fill h-full w-px origin-top bg-[linear-gradient(180deg,#b5c7a0,#748663)] shadow-[0_0_16px_rgba(158,181,134,0.55)] transition-transform duration-500"
                    style={{ transform: `scaleY(${Number(activeMethodStep.step) / methodology.length})` }}
                  />
                </div>
                {methodology.map((item) => {
                  const isActive = activeMethodStep.step === item.step;
                  return (
                    <button
                      key={item.step}
                      onClick={() => setActiveMethodStep(item)}
                      className={`methodology-step relative w-full rounded-[20px] border py-4 pl-12 pr-4 text-left transition duration-500 md:rounded-[24px] md:py-5 md:pl-14 md:pr-5 ${
                        isActive
                          ? "border-[#91a57b]/38 bg-[linear-gradient(135deg,rgba(125,145,104,0.18),rgba(17,21,17,0.96))] text-white shadow-[0_24px_70px_rgba(0,0,0,0.34),0_0_35px_rgba(112,135,89,0.08)]"
                          : "border-white/8 bg-white/4 text-[#b8c0af] hover:border-white/14"
                      }`}
                    >
                      <span
                        className={`absolute left-[0.78rem] top-1/2 z-10 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border transition duration-500 md:left-[0.9rem] ${
                          isActive
                            ? "border-[#b1c49a]/55 bg-[#839570] shadow-[0_0_18px_rgba(145,168,119,0.58)]"
                            : "border-white/12 bg-[#0b0e0c]"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-white" : "bg-[#65705e]"}`} />
                      </span>
                      <div className="flex items-center gap-4">
                        <span className={`text-sm uppercase tracking-[0.24em] ${isActive ? "text-[#9cad8d]" : "text-[#7e8777]"}`}>
                          {item.step}
                        </span>
                        <span className="text-base font-medium">{item.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={activeMethodStep.step}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="glass-card relative overflow-hidden rounded-[28px] p-5 md:rounded-[34px] md:p-8 lg:min-h-[31rem]"
              >
                <div className="methodology-orbit pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-dashed border-[#9bae84]/12 shadow-[0_0_100px_rgba(126,148,101,0.12)]" />
                <div className="pointer-events-none absolute right-8 top-8 text-[5.5rem] font-semibold leading-none tracking-[-0.09em] text-white/[0.025] md:text-[8rem]">
                  {activeMethodStep.step}
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#8f9a84]">Etapa {activeMethodStep.step}</p>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#738069]">
                      {Number(activeMethodStep.step)} / {methodology.length}
                    </p>
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#f6f7f2] md:text-4xl">{activeMethodStep.title}</h3>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-[#a9b2a0] md:mt-6 md:text-base md:leading-8">{activeMethodStep.text}</p>

                <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-5">
                  <div className="rounded-[24px] border border-white/8 bg-black/18 p-5 md:rounded-[28px] md:p-6">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#8b9681]">El cliente recibe</p>
                    <p className="mt-4 text-lg text-[#edf1e8]">{activeMethodStep.deliverable}</p>
                  </div>
                  <div className="rounded-[24px] border border-white/8 bg-black/18 p-5 md:rounded-[28px] md:p-6">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#8b9681]">Ritmo de trabajo</p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[#d6ddd0]">
                      <li>Reuniones cortas y concretas.</li>
                      <li>Demos rápidas y visibles.</li>
                      <li>Seguimiento constante y documentado.</li>
                      <li>Transparencia en riesgos y decisiones.</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <PrimaryButton onClick={onStart}>Agendar reunión de discovery</PrimaryButton>
                </div>
                </div>
              </motion.div>
            </div>
            </div>
          </div>
        </section>

        <section id="calculadora-ahorro" className="px-4 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading
                eyebrow="Calculadora de ahorro"
                title="Calcula cuanto te cuesta seguir resolviendo procesos manuales."
                description="Completa estos datos y obtén una estimación simple del costo operativo que hoy se va en tareas repetitivas. No es humo: es una cuenta rápida para dimensionar oportunidad."
              />

              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card rounded-[24px] p-4 sm:p-5 md:rounded-[34px] md:p-8"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="rounded-[22px] border border-white/8 bg-black/18 p-3.5 text-left transition focus-within:border-[#7b8a6a]/45 focus-within:bg-[#0c100d] sm:p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#8f9a84]">Personas involucradas</p>
                    <input
                      type="number"
                      min="1"
                      value={calculatorInputs.people}
                      onChange={(event) => handleCalculatorChange("people", event.target.value)}
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-2.5 text-xl font-semibold tracking-[-0.05em] text-[#f6f7f2] outline-none transition placeholder:text-[#7f8778] focus:border-[#7b8a6a]/50 focus:bg-[#101411] sm:mt-4 sm:py-3 sm:text-3xl"
                    />
                    <p className="mt-2 text-sm leading-6 text-[#aab3a0]">Cuantas personas dedican tiempo a ese proceso hoy.</p>
                  </label>

                  <label className="rounded-[22px] border border-white/8 bg-black/18 p-3.5 text-left transition focus-within:border-[#7b8a6a]/45 focus-within:bg-[#0c100d] sm:p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#8f9a84]">Horas perdidas por semana</p>
                    <input
                      type="number"
                      min="1"
                      value={calculatorInputs.hoursPerWeek}
                      onChange={(event) => handleCalculatorChange("hoursPerWeek", event.target.value)}
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-2.5 text-xl font-semibold tracking-[-0.05em] text-[#f6f7f2] outline-none transition placeholder:text-[#7f8778] focus:border-[#7b8a6a]/50 focus:bg-[#101411] sm:mt-4 sm:py-3 sm:text-3xl"
                    />
                    <p className="mt-2 text-sm leading-6 text-[#aab3a0]">Horas manuales por persona en tareas repetitivas.</p>
                  </label>

                  <label className="rounded-[22px] border border-white/8 bg-black/18 p-3.5 text-left transition focus-within:border-[#7b8a6a]/45 focus-within:bg-[#0c100d] sm:p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#8f9a84]">Costo mensual por persona</p>
                    <input
                      type="number"
                      min="1"
                      step="50"
                      value={calculatorInputs.monthlyCost}
                      onChange={(event) => handleCalculatorChange("monthlyCost", event.target.value)}
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-2.5 text-xl font-semibold tracking-[-0.05em] text-[#f6f7f2] outline-none transition placeholder:text-[#7f8778] focus:border-[#7b8a6a]/50 focus:bg-[#101411] sm:mt-4 sm:py-3 sm:text-3xl"
                    />
                    <p className="mt-2 text-sm leading-6 text-[#aab3a0]">Usamos este valor para estimar el costo por hora.</p>
                  </label>

                  <label className="rounded-[22px] border border-white/8 bg-black/18 p-3.5 text-left transition focus-within:border-[#7b8a6a]/45 focus-within:bg-[#0c100d] sm:p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-[#8f9a84]">Tarea automatizable</p>
                      <span className="text-lg font-semibold text-[#f6f7f2]">{calculatorInputs.automatablePercent}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      step="5"
                      value={calculatorInputs.automatablePercent}
                      onChange={(event) => handleCalculatorChange("automatablePercent", event.target.value)}
                      className="mt-5 w-full accent-[#7b8a6a] sm:mt-6"
                    />
                    <p className="mt-3 text-sm leading-6 text-[#aab3a0]">Estimacion de cuanto de ese proceso se podría automatizar.</p>
                  </label>
                </div>

                <div className="mt-6 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-[24px] border border-white/8 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#93a084]">Resumen del calculo</p>
                    <div className="mt-5 space-y-4">
                      <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                        <span className="text-sm text-[#aab3a0]">Horas manuales al mes</span>
                        <span className="text-lg font-semibold text-[#f1f3ee]">{Math.round(monthlyHoursLost)} hs</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                        <span className="text-sm text-[#aab3a0]">Costo mensual de ese proceso</span>
                        <span className="text-lg font-semibold text-[#f1f3ee]">{formatCurrency(monthlyCostOfManualWork)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm text-[#aab3a0]">Porcentaje automatizable</span>
                        <span className="text-lg font-semibold text-[#f1f3ee]">{calculatorInputs.automatablePercent}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-[#7d8d6a]/20 bg-[linear-gradient(180deg,rgba(111,126,96,0.14),rgba(255,255,255,0.04))] p-4 sm:p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#93a084]">Ahorro estimado con automatización</p>
                    <p className="mt-4 text-[1.9rem] font-semibold tracking-[-0.05em] text-[#f6f7f2] md:text-4xl">
                      {formatCurrency(estimatedMonthlySaving)}
                      <span className="ml-2 text-base font-medium text-[#bfc7b5]">/ mes</span>
                    </p>
                    <p className="mt-3 text-base leading-7 text-[#d9dfd2]">
                      Proyección anual:
                      <span className="ml-2 font-semibold text-[#f6f7f2]">{formatCurrency(estimatedAnnualSaving)}</span>
                    </p>
                    <p className="mt-5 text-sm leading-7 text-[#b3bba9]">
                      Esta es una estimación orientativa basada en costo operativo y porcentaje de automatización. En la reunión lo aterrizamos a tu caso real, procesos y equipo.
                    </p>
                    <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                      <PrimaryButton onClick={onStart} className="w-full rounded-[1.1rem] px-3 py-2.5 text-[8px] tracking-[0.02em] sm:w-auto sm:rounded-[1.2rem] sm:px-5 sm:py-3.5 sm:text-[10px] sm:tracking-[0.1em]">
                        Quiero recuperar este tiempo
                      </PrimaryButton>
                      <a
                        href={contactInfo.whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-[1.1rem] border border-white/12 bg-white/4 px-3 py-2.5 text-[8px] font-semibold uppercase tracking-[0.02em] text-[#d7ddd0] transition hover:border-[#6d7c5e]/40 hover:text-white sm:rounded-[1.2rem] sm:px-5 sm:py-3.5 sm:text-[10px] sm:tracking-[0.1em]"
                      >
                        Hablar por WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="testimonios" className="px-4 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Testimonios"
              title="Credibilidad apoyada en proyectos, resultados y feedback concreto."
              description="La prueba social se conecta con implementaciones reales, no con frases vacias. Eso refuerza autoridad, transparencia y confianza."
              align="center"
            />

            <div className="mt-10 grid auto-rows-fr gap-4 md:grid-cols-2 lg:mt-14 lg:gap-6 xl:grid-cols-3">
              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card flex h-full flex-col rounded-[26px] p-4 md:rounded-[30px] md:p-6 xl:col-span-2"
              >
                <div className="overflow-hidden rounded-[24px] border border-white/8 bg-black/30">
                  <div className="flex aspect-[16/9] items-center justify-center">
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
                <div className="mt-5 flex flex-1 flex-col justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[#95a085]">{videoTestimonial.title}</p>
                    {videoTestimonial.caption ? (
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#aab3a1]">
                        {videoTestimonial.caption}
                      </p>
                    ) : null}
                  </div>
                </div>
              </motion.div>

              {featuredTestimonials.map((item, index) => (
                <motion.div
                  key={item.company}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.06 }}
                  className="glass-card flex h-full flex-col rounded-[26px] p-4 md:rounded-[30px] md:p-6"
                >
                  <ProjectTags tags={caseStudies.find((study) => study.id === item.projectId)?.tags || []} />
                  <div className="mt-3 rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.18))] p-4">
                    {item.videoId ? (
                      <Link
                        to={`/proyectos/${item.projectId}`}
                        className="group relative flex aspect-[16/10] overflow-hidden rounded-[18px] border border-white/10 bg-black/20"
                      >
                        <img 
                          src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`} 
                          alt={`Video de ${item.company}`}
                          className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-500 group-hover:scale-105 group-hover:opacity-70"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-10 w-14 items-center justify-center rounded-[10px] bg-red-600/90 text-white backdrop-blur-sm transition group-hover:bg-red-500">
                            <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-current" aria-hidden="true">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative z-10 flex w-full flex-col justify-between p-4">
                          <span className="text-4xl leading-none text-white/80 drop-shadow-lg">"</span>
                          <span className="text-xs font-medium uppercase tracking-[0.22em] text-white drop-shadow-md">
                            {item.proof}
                          </span>
                        </div>
                      </Link>
                    ) : item.projectId && caseStudies.find((study) => study.id === item.projectId)?.image ? (
                      <Link
                        to={`/proyectos/${item.projectId}`}
                        className="group relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[18px] border border-white/10 bg-[#050706] p-3"
                      >
                        <img
                          src={caseStudies.find((study) => study.id === item.projectId)?.image}
                          alt={item.company}
                          className="h-full w-full object-contain object-center opacity-85 transition duration-500 group-hover:scale-[1.01]"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,8,0.14),rgba(7,9,8,0.82))]" />
                        <div className="relative z-10 flex w-full flex-col justify-between p-4">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80">
                            {item.proof}
                          </span>
                          <span className="text-base font-semibold text-white">
                            {item.company}
                          </span>
                        </div>
                      </Link>
                    ) : item.projectId ? (
                      <Link
                        to={`/proyectos/${item.projectId}`}
                        className="group flex aspect-[16/10] flex-col justify-between rounded-[18px] border border-white/10 bg-black/20 p-4 transition hover:border-white/20"
                      >
                        <span className="text-4xl leading-none text-[#6f7d61]/40 transition group-hover:text-[#6f7d61]/60">"</span>
                        <span className="text-xs uppercase tracking-[0.22em] text-[#99a48f] transition group-hover:text-white">
                          {item.proof}
                        </span>
                      </Link>
                    ) : (
                      <div className="flex aspect-[16/10] flex-col justify-between rounded-[18px] border border-white/10 bg-black/20 p-4">
                        <span className="text-4xl leading-none text-[#6f7d61]/40">"</span>
                        <span className="text-xs uppercase tracking-[0.22em] text-[#99a48f]">
                          {item.proof}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex min-h-[10.5rem] flex-1">
                    <div className="w-full rounded-[22px] border border-white/8 bg-black/16 p-4">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[#95a085]">
                        Feedback real
                      </p>
                      <p className="mt-3 text-base font-medium leading-7 text-[#eff2ea] md:text-lg md:leading-8">
                        “{item.quote}”
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center gap-3 border-t border-white/8 pt-5 md:gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8eaf92] text-lg font-semibold text-[#152018]">
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-[#95a085]">{item.company}</p>
                      <p className="mt-1 text-sm text-[#aab3a1]">{item.source}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <PrimaryButton onClick={onStart}>
                <span className="sm:hidden">Quiero este soporte</span>
                <span className="hidden sm:inline">Quiero un proyecto con este nivel de soporte</span>
              </PrimaryButton>
              <Link
                to="/casos-de-éxito"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/4 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d7ddd0] backdrop-blur-xl transition hover:border-[#6d7c5e]/40 hover:text-white md:px-7 md:py-4 md:text-[13px] md:tracking-[0.2em]"
              >
                Explorar todos los casos
              </Link>
            </div>
          </div>
        </section>

        <section id="contacto" className="px-4 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,16,0.88),rgba(8,10,9,0.96))] px-5 py-8 md:rounded-[42px] md:px-12 md:py-14">
              <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#738260]/16 blur-3xl" />
              <div className="grid gap-8 lg:gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative">
                  <SectionTag>Contacto premium</SectionTag>
                  <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-[#f6f7f3] md:mt-6 md:text-6xl">
                    Tomamos proyectos limitados cada mes.
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-7 text-[#abb4a2] md:mt-6 md:text-lg md:leading-8">
                    Reserva una reunión estratégica si buscas construir en serio, con seguridad,
                    arquitectura y seguimiento premium.
                  </p>
                  <div className="mt-6 rounded-[24px] border border-[#7a8968]/20 bg-white/5 p-4 text-sm leading-7 text-[#d7ddd0] md:mt-8 md:rounded-[28px] md:p-5">
                    <p>Trabajamos con empresas que necesitan una base técnica confiable para crecer sin fragilidad.</p>
                    <p className="mt-2 text-[#f2f4ee]">Ultimos cupos disponibles esta semana.</p>
                  </div>
                </div>

                <div className="relative grid gap-5">
                  <div className="glass-card rounded-[24px] p-4 md:rounded-[30px] md:p-6">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#93a084]">Agenda</p>
                    <div className="mt-5 rounded-2xl border border-white/8 bg-black/20 px-4 py-4 text-sm leading-7 text-[#d7ddd0]">
                      El calendario se actualiza en tiempo real segun disponibilidad. Agenda la reunión estratégica y elige el horario que mejor te sirva.
                    </div>
                  </div>

                  <div className="glass-card rounded-[24px] p-4 md:rounded-[30px] md:p-6">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#93a084]">Contacto directo</p>
                    <div className="mt-5 space-y-3">
                      <a
                        href={contactInfo.whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-2xl border border-white/8 bg-white/4 px-4 py-4 text-sm text-[#d7ddd0] transition hover:border-white/16"
                      >
                        WhatsApp: {contactInfo.whatsapp}
                      </a>
                      <a
                        href={contactInfo.phoneHref}
                        className="block rounded-2xl border border-white/8 bg-white/4 px-4 py-4 text-sm text-[#d7ddd0] transition hover:border-white/16"
                      >
                        Llamanos: {contactInfo.phone}
                      </a>
                      <a
                        href={contactInfo.emailHref}
                        className="block rounded-2xl border border-white/8 bg-white/4 px-4 py-4 text-sm text-[#d7ddd0] transition hover:border-white/16"
                      >
                        Email: {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="glass-card rounded-[24px] p-4 md:rounded-[30px] md:p-6">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#93a084]">Redes sociales</p>
                    <div className="mt-4 flex flex-wrap gap-4 md:mt-5 md:gap-6">
                      {socialLinks.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-[#a1ac98] transition hover:text-white md:text-sm"
                        >
                          <SocialIcon label={item.label} />
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <PrimaryButton onClick={onStart} className="flex-1">
                      Agendar tu consulta gratuita
                    </PrimaryButton>
                    <Link
                      to="/casos-de-éxito"
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-white/12 bg-white/4 px-4 py-2.5 text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] text-center text-[#d7ddd0] backdrop-blur-xl transition-all duration-300 hover:border-[#6d7c5e]/40 hover:text-white sm:px-7 sm:py-4 sm:text-[13px] sm:tracking-[0.2em]"
                    >
                      Ver portfolio completo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/8 bg-black/20 px-4 py-10 md:px-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4 md:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/6 md:h-11 md:w-11">
                <img
                  src="/logo-sin-fondo-apoc.png"
                  alt="APOC Automation"
                  className="h-7 w-7 object-contain md:h-8 md:w-8"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-[#f4f6f1]">APOC <span className="text-[#8ea27a]">AUTOMATION</span></p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-[#9da694] md:mt-5 md:text-base md:leading-8">
              Automatización inteligente y desarrollo de software para empresas de habla hispana que quieren escalar.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 md:mt-6 md:gap-6">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-[#a1ac98] transition hover:text-white md:text-sm"
                >
                  <SocialIcon label={item.label} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#dfe5d8]">Servicios</p>
            <div className="mt-4 space-y-2 text-sm text-[#9da694] md:mt-5 md:space-y-3 md:text-base">
              <a href="#diferencial" className="block transition hover:text-white">Automatización n8n</a>
              <a href="#diferencial" className="block transition hover:text-white">Agentes IA</a>
              <Link to="/casos-de-éxito" className="block transition hover:text-white">Desarrollo software</Link>
              <Link to="/casos-de-éxito" className="block transition hover:text-white">Marketing automation</Link>
              <Link to="/casos-de-éxito" className="block transition hover:text-white">Hardware + software</Link>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#dfe5d8]">Empresa</p>
            <div className="mt-4 space-y-2 text-sm text-[#9da694] md:mt-5 md:space-y-3 md:text-base">
              <a href="#equipo" className="block transition hover:text-white">Quienes somos</a>
              <Link to="/casos-de-éxito" className="block transition hover:text-white">Casos de éxito</Link>
              <a href="#contacto" className="block transition hover:text-white">Agendar una llamada</a>
              <a href="#metodologia" className="block transition hover:text-white">Metodologia</a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#dfe5d8]">Contacto</p>
            <div className="mt-4 space-y-2 text-sm text-[#9da694] md:mt-5 md:space-y-3 md:text-base">
              <a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="block transition hover:text-white">WhatsApp</a>
              <a href={contactInfo.phoneHref} className="block transition hover:text-white">Llamadas</a>
              <a href={contactInfo.instagramHref} target="_blank" rel="noreferrer" className="block transition hover:text-white">Instagram</a>
              <a href={contactInfo.linkedinHref} target="_blank" rel="noreferrer" className="block transition hover:text-white">LinkedIn</a>
              <a href={contactInfo.emailHref} className="block transition hover:text-white">Email</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/8 pt-8 text-sm text-[#7c8574] md:flex-row md:items-center md:justify-between">
          <span>© 2025 Apoc Automation. Todos los derechos reservados.</span>
          <span>Hecho con dedicación en Argentina</span>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#090b0a]/88 p-2.5 backdrop-blur-xl md:hidden">
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
            Agenda tu llamada
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
