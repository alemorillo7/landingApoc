import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Landing from "./landing.jsx";
import Form from "./form.jsx";
import { contactInfo, getCaseStudyById, portfolioCaseStudies, seoConfig } from "./siteData.js";
import "./index.css";

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

function CaseStudyMedia({ caseStudy }) {
  const galleryImages = Array.isArray(caseStudy.gallery) && caseStudy.gallery.length > 0
    ? caseStudy.gallery
    : caseStudy.image
      ? [caseStudy.image]
      : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const hasSlider = galleryImages.length > 1;

  useEffect(() => {
    setActiveIndex(0);
  }, [caseStudy.id]);

  if (galleryImages.length === 0) {
    return null;
  }

  const goToPrev = () => {
    setActiveIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="mt-8 overflow-hidden rounded-[30px] border border-white/10 bg-[#050706] p-3 md:p-4">
      <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-[24px] border border-white/8 bg-black/20 md:min-h-[360px]">
        <img
          src={galleryImages[activeIndex]}
          alt={`${caseStudy.client} - imagen ${activeIndex + 1}`}
          className="max-h-[620px] w-full object-contain object-center"
        />

        {hasSlider ? (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />

            <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-3">
              <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#e5eadf] backdrop-blur">
                Galeria del proyecto
              </span>
              <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#cfd7c6] backdrop-blur">
                {activeIndex + 1} / {galleryImages.length}
              </span>
            </div>

            <button
              type="button"
              onClick={goToPrev}
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-[#eef2e8] backdrop-blur transition hover:bg-black/60"
              aria-label="Imagen anterior"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-[#eef2e8] backdrop-blur transition hover:bg-black/60"
              aria-label="Imagen siguiente"
            >
              →
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? "w-8 bg-[#eef2e8]" : "w-2.5 bg-white/35 hover:bg-white/55"
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertJsonLd(id, data) {
  let element = document.head.querySelector(`#${id}`);
  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.id = id;
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

function Seo({ title, description, pathname, schema, image }) {
  useEffect(() => {
    const canonicalUrl = `${seoConfig.baseUrl}${pathname}`;
    const ogImage = image || `${seoConfig.baseUrl}/og-image.jpg`;
    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: title });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: seoConfig.siteName });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: ogImage });
    upsertMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: title });
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });
    if (schema) {
      upsertJsonLd("apoc-schema", schema);
    }
  }, [description, image, pathname, schema, title]);

  return null;
}


function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const scrollToLocation = () => {
      if (!location.hash) {
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }

      const targetId = decodeURIComponent(location.hash.slice(1));
      document.getElementById(targetId)?.scrollIntoView({ behavior: "instant", block: "start" });
    };

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToLocation);
    });
    const retryTimer = window.setTimeout(scrollToLocation, 350);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(retryTimer);
    };
  }, [location.hash, location.pathname]);

  return null;
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(111,126,96,0.18),transparent_24%),linear-gradient(180deg,#070908_0%,#0b0f0c_100%)] flex flex-col items-center justify-center text-[#F5F7F6] p-6 text-center">
      <div className="mb-8 h-16 w-16 rounded-full border-4 border-[#7b8b69]/35 border-t-[#dbe3d1] animate-spin"></div>
      <h2 className="text-xl font-semibold tracking-[0.14em] uppercase text-[#dfe5d8] md:text-2xl md:tracking-[0.18em]">
        Preparando tu reunión estratégica...
      </h2>
    </div>
  );
}

function Success({ data }) {
  const navigate = useNavigate();
  let formattedDate = "";

  if (data?.date) {
    const date = new Date(`${data.date}T12:00:00`);
    formattedDate = date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "APOC Automation",
    url: `${seoConfig.baseUrl}/reunión-confirmada`,
    areaServed: "Latam",
    telephone: contactInfo.phone,
  };

  return (
    <>
      <Seo
        title="Reunion confirmada | APOC Automation"
        description="Tu reunión estratégica con APOC Automation ya fue confirmada. Revisaremos contexto, oportunidad y siguientes pasos con foco técnico y de negocio."
        pathname="/reunión-confirmada"
        schema={schema}
      />
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(111,126,96,0.18),transparent_24%),linear-gradient(180deg,#070908_0%,#0b0f0c_100%)] flex flex-col items-center justify-center text-[#F5F7F6] p-4 md:p-6 text-center selection:bg-[#8a9979] selection:text-[#0b0f0c]">
        <div className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:rounded-[36px] md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#7a8868]/25 bg-[#6f7d61]/12 md:mb-8 md:h-20 md:w-20">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#dce3d3]">OK</span>
          </div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#91a082]">Agenda confirmada</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#f5f6f2] md:text-6xl">
            Reunion confirmada.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#b7c0ae] md:mt-6 md:text-xl md:leading-8">
            Tu reunión estratégica con APOC Automation ya quedo reservada. Vamos a revisar contexto, oportunidad y siguientes pasos con foco técnico y de negocio.
          </p>

          {data?.date && data?.time && (
            <div className="mx-auto mt-6 max-w-md rounded-[24px] border border-white/10 bg-black/20 p-5 md:mt-8 md:rounded-[28px] md:p-6">
              <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[#8f9a84]">Dia y horario seleccionado</p>
              <p className="text-xl font-semibold capitalize text-[#f2f4ee] md:text-2xl">{formattedDate}</p>
              <p className="mt-1 text-base text-[#c6cdbd]">{data.time} hs</p>
            </div>
          )}

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#9eaa94] md:mt-8 md:text-base">
            Te enviamos la invitación por correo electrónico y nos pondremos en contacto por WhatsApp para coordinar la reunión. Si tu caso califica, avanzamos con discovery y definición de alcance.
          </p>

          <div className="mx-auto mb-6 mt-8 h-px w-20 bg-white/10 md:mb-8 md:mt-10"></div>
          <button
            onClick={() => navigate("/")}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d8dfcf] transition hover:border-[#7a8868]/30 hover:text-white cursor-pointer md:px-6 md:text-xs md:tracking-[0.24em]"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </>
  );
}

function CaseStudyPage({ onStart }) {
  const { id } = useParams();
  const caseStudy = getCaseStudyById(id);

  if (!caseStudy) {
    return <Navigate to="/" replace />;
  }

  const title = `${caseStudy.client} | Caso de éxito APOC Automation`;
  const description = `${caseStudy.client}: ${caseStudy.problem} Solución: ${caseStudy.solution}`;
  const pathname = `/proyectos/${caseStudy.id}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Organization",
        name: "APOC Automation",
    },
    mainEntityOfPage: `${seoConfig.baseUrl}${pathname}`,
  };
  const detailLabel = caseStudy.feedback
    ? "6. Feedback real"
    : caseStudy.impact
      ? "6. Impacto del proyecto"
      : "6. Síntesis ejecutiva";
  const detailText =
    caseStudy.feedback ||
    caseStudy.impact ||
    caseStudy.clientSummary;

  return (
    <>
      <Seo title={title} description={description} pathname={pathname} schema={schema} />
      <div className="apoc-shell min-h-screen selection:bg-[#83926f] selection:text-[#0a0d0b]">
        <div className="apoc-noise" />
        <div className="hero-orb hero-orb-top" />
        <div className="hero-orb hero-orb-bottom" />

        <main className="relative z-10 px-6 pb-20 pt-28 md:px-10 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.22em] text-[#d7ddd0] transition hover:border-[#7b8c69]/30 hover:text-white"
              >
                Volver al inicio
              </Link>
              <button
                onClick={onStart}
                className="magnetic-button inline-flex items-center justify-center rounded-full border border-[#758464]/30 bg-[#6d7c5e] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f7f8f3] transition hover:bg-[#7b8a6a]"
              >
                Agendar reunión
              </button>
            </div>

            <div className="glass-card rounded-[40px] p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.24em] text-[#95a085]">Caso de éxito</p>
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-[#f5f6f2] md:text-6xl">
                {caseStudy.client}
              </h1>
              <div className="mt-4">
                <ProjectTags tags={caseStudy.tags || []} />
              </div>
              <p className="mt-3 text-sm uppercase tracking-[0.22em] text-[#9fab93]">{caseStudy.industry}</p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#aab3a1]">
                Sistemas pensados para durar, con arquitectura real, seguridad desde base y foco en negocio.
              </p>

              <CaseStudyMedia caseStudy={caseStudy} />

              {caseStudy.videoId && (
                <div className="mt-8 overflow-hidden rounded-[30px] border border-white/10 bg-black/20 p-4 md:p-5">
                  <div className="overflow-hidden rounded-[24px] border border-white/8 bg-black/30">
                    <div className="flex aspect-video items-center justify-center">
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube-nocookie.com/embed/${caseStudy.videoId}?rel=0&modestbranding=1&playsinline=1`}
                        title={`Video del proyecto ${caseStudy.client}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <div className="rounded-[28px] border border-white/8 bg-black/18 p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#91a082]">1. Quién es el cliente</p>
                  <p className="mt-4 text-base leading-8 text-[#d7ddd0]">{caseStudy.clientSummary}</p>
                </div>
                <div className="rounded-[28px] border border-white/8 bg-black/18 p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#91a082]">2. Problema inicial</p>
                  <p className="mt-4 text-base leading-8 text-[#d7ddd0]">{caseStudy.problem}</p>
                </div>
                <div className="rounded-[28px] border border-white/8 bg-black/18 p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#91a082]">3. Qué se desarrolló</p>
                  <p className="mt-4 text-base leading-8 text-[#d7ddd0]">{caseStudy.solution}</p>
                </div>
                <div className="rounded-[28px] border border-white/8 bg-black/18 p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#91a082]">4. Tecnologías usadas</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-[#d8dfcf]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[28px] border border-white/8 bg-black/18 p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#91a082]">5. Resultado logrado</p>
                  <p className="mt-4 text-base leading-8 text-[#d7ddd0]">{caseStudy.result}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {caseStudy.metrics.map((metric) => (
                      <div
                        key={metric}
                        className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-[#ecf0e7]"
                      >
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[28px] border border-white/8 bg-black/18 p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#91a082]">{detailLabel}</p>
                  <p className="mt-4 text-xl leading-8 text-[#eff2eb]">{caseStudy.feedback ? `“${detailText}”` : detailText}</p>
                </div>
              </div>

              <div className="mt-8 rounded-[30px] border border-[#7d8d6a]/20 bg-[linear-gradient(180deg,rgba(111,126,96,0.12),rgba(255,255,255,0.04))] p-7">
                <p className="text-xs uppercase tracking-[0.22em] text-[#96a287]">7. CTA</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#f6f7f3]">
                  Comenzá tu proyecto
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[#d5dccd]">
                  Si necesitas un sistema serio, mantenible y preparado para crecer, el siguiente paso es una reunión estratégica para evaluar alcance, riesgo y oportunidad.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={onStart}
                    className="magnetic-button inline-flex items-center justify-center rounded-full border border-[#758464]/30 bg-[#6d7c5e] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#f7f8f3] transition hover:bg-[#7b8a6a]"
                  >
                    Comenzá tu proyecto
                  </button>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d7ddd0]"
                  >
                    Volver a inicio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function PortfolioPage({ onStart }) {
  const title = "Casos de éxito | APOC Automation";
  const description =
    "Portfolio completo de APOC Automation con proyectos reales de automatizacion, agentes IA y software a medida para múltiples industrias y paises.";
  const pathname = "/casos-de-éxito";
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${seoConfig.baseUrl}${pathname}`,
  };

  return (
    <>
      <Seo title={title} description={description} pathname={pathname} schema={schema} />
      <div className="apoc-shell min-h-screen selection:bg-[#83926f] selection:text-[#0a0d0b]">
        <div className="apoc-noise" />
        <div className="hero-orb hero-orb-top" />
        <div className="hero-orb hero-orb-bottom" />

        <main className="relative z-10 px-6 pb-20 pt-28 md:px-10 md:pt-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.22em] text-[#d7ddd0] transition hover:border-[#7b8c69]/30 hover:text-white"
              >
                Volver al inicio
              </Link>
              <button
                onClick={onStart}
                className="magnetic-button inline-flex items-center justify-center rounded-full border border-[#758464]/30 bg-[#6d7c5e] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f7f8f3] transition hover:bg-[#7b8a6a]"
              >
                Agendar reunión
              </button>
            </div>

            <div className="max-w-4xl">
              <p className="text-xs uppercase tracking-[0.24em] text-[#95a085]">Portfolio completo</p>
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-[#f5f6f2] md:text-6xl">
                Casos de éxito reales en automatizacion, agentes IA y software a medida.
              </h1>
              <p className="mt-6 text-base leading-8 text-[#aab3a1] md:text-lg">
                Esta vista concentra todos los proyectos no tercerizados cargados hasta ahora, con los casos destacados primero y el resto del portfolio ordenado después.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#b9c2af]">
              <span className="rounded-full border border-[#7d8d6a]/30 bg-[#6f7d61]/16 px-4 py-2">Destacado</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Automatizacion</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Agente IA</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Software a medida</span>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
              {portfolioCaseStudies.map((study, index) => (
                <div
                  key={study.id}
                  className="h-full"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <Link
                    to={`/proyectos/${study.id}`}
                    className="glass-card group flex h-full flex-col rounded-[28px] p-5 text-left transition hover:border-[#7a8968]/30 md:rounded-[34px] md:p-7"
                  >
                    <ProjectTags tags={study.tags || []} />
                    <ProjectCover study={study} />
                    <p className="mt-4 text-xs uppercase tracking-[0.24em] text-[#8d9882]">{study.industry}</p>
                    <h2 className="mt-4 break-words text-2xl font-semibold leading-tight tracking-[-0.05em] text-[#f5f6f2] md:text-3xl">
                      {study.client}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-[#acb5a4]">{study.clientSummary}</p>
                    <div className="mt-5 rounded-[22px] border border-[#7d8d6a]/14 bg-[linear-gradient(180deg,rgba(111,126,96,0.12),rgba(255,255,255,0.03))] px-4 py-4">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[#93a084]">Resultado principal</p>
                      <p className="mt-3 text-sm leading-7 text-[#edf1e8]">{study.result}</p>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {study.metrics.map((metric) => (
                        <div key={metric} className="rounded-2xl bg-white/5 px-3 py-3 text-xs text-[#dbe1d5] md:px-4 md:py-4 md:text-sm">
                          {metric}
                        </div>
                      ))}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function HomePage({ onStart }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "APOC Automation",
    description: seoConfig.baseDescription,
    url: seoConfig.baseUrl,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    sameAs: [contactInfo.instagramHref, contactInfo.linkedinHref],
    areaServed: ["Argentina", "Latam", "Espana"],
  };

  return (
    <>
      <Seo
        title={seoConfig.baseTitle}
        description={seoConfig.baseDescription}
        pathname="/"
        schema={schema}
      />
      <Landing onStart={onStart} />
    </>
  );
}

function AppRoutes() {
  const [leadData, setLeadData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleStartForm = () => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout", {
        content_name: "diagnostico_gratuito",
        content_category: "funnel_start",
      });
    }
    navigate("/agenda");
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);

    const webhookUrl =
      "https://automation8n.fluxia.site/webhook/50b4a26e-d6af-4f6d-b29b-8d072a2a75b2";

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (data.date && data.time) {
        const [hoursStr, minutesStr] = data.time.split(":");
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        const endHour = minutes === 30 ? hours + 1 : hours;
        const endMinute = minutes === 30 ? "00" : "30";
        const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute}`;

        await fetch("https://apocrm-one.vercel.app/api/calendar/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: `Diagnóstico APOC - ${data.industry || "Cliente"}`,
            date: data.date,
            start_time: data.time,
            end_time: endTime,
            description: `Reunion de diagnóstico agendada automáticamente desde la landing page.

Detalles del lead:
- Rubro / Industria: ${data.industry || "No especificado"}
- Proceso critico: ${data.problem || "No especificado"}
- Urgencia: ${data.urgency || "No especificada"}
- Facturación: ${data.revenue || "No especificada"}
- Presupuesto: ${data.budget || "No especificado"}
- WhatsApp: ${data.phone || "No especificado"}`,
            guests: data.email,
          }),
        }).catch((error) => console.error("Error agendando cita en CRM:", error));
      }

      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: data.email || "landing_form",
          content_category: data.industry || "",
          value: 0,
          currency: "USD",
        });
      }

      setLeadData(data);
      navigate("/reunión-confirmada");
    } catch (error) {
      console.error("Error enviando lead:", error);
      setLeadData(data);
      navigate("/reunión-confirmada");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitting) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage onStart={handleStartForm} />} />
        <Route
          path="/agenda"
          element={
            <>
              <Seo
                title="Agenda una reunión estratégica | APOC Automation"
                description="Reserva una reunión estratégica con APOC para evaluar arquitectura, seguridad, automatizacion y oportunidad de negocio."
                pathname="/agenda"
                schema={null}
              />
              <Form onComplete={handleSubmit} />
            </>
          }
        />
        <Route path="/casos-de-éxito" element={<PortfolioPage onStart={handleStartForm} />} />
        <Route path="/proyectos/:id" element={<CaseStudyPage onStart={handleStartForm} />} />
        <Route
          path="/reunión-confirmada"
          element={leadData ? <Success data={leadData} /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
