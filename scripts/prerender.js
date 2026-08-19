import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { caseStudies, seoConfig, contactInfo } from "../src/siteData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");

if (!fs.existsSync(distDir)) {
  console.error("Dist folder does not exist. Run vite build first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

const routes = [
  {
    path: "/",
    title: "APOC Automation | Software seguro, escalable y estable",
    description:
      "APOC Automation desarrolla automatización, agentes IA y software a medida para empresas de Argentina, Perú, Ecuador, Bolivia, México y España. Software pensado para durar.",
    image: `${seoConfig.baseUrl}/og-image.jpg`,
    schema: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "APOC Automation",
      description: seoConfig.baseDescription,
      url: seoConfig.baseUrl,
      telephone: contactInfo.phone,
      email: contactInfo.email,
      sameAs: [contactInfo.instagramHref, contactInfo.linkedinHref],
      areaServed: ["Argentina", "Perú", "Ecuador", "Bolivia", "México", "España"],
    },
    contentHtml: `
      <header>
        <h1>APOC Automation — Software seguro, escalable y estable</h1>
        <p>Desarrollamos software a medida, automatizaciones de procesos y agentes de IA para empresas que buscan crecer con arquitectura real y seguridad desde la base.</p>
      </header>
      <section>
        <h2>Nuestros Servicios</h2>
        <ul>
          <li><strong>Software a medida:</strong> Sistemas de gestión, CRMs, ERPs y paneles operativos personalizados.</li>
          <li><strong>Agentes IA y Chatbots:</strong> Automatización de atención, ventas y soporte en WhatsApp con IA.</li>
          <li><strong>Automatización de procesos:</strong> Integraciones n8n, APIs, logística y flujos de trabajo sin fricción.</li>
          <li><strong>Arquitectura y Consultoría:</strong> Seguridad, base de datos escalable y observabilidad.</li>
        </ul>
      </section>
      <section>
        <h2>Casos de éxito y proyectos</h2>
        <ul>
          ${caseStudies.map((c) => `<li><a href="/proyectos/${c.id}"><strong>${c.client}:</strong> ${c.problem}</a></li>`).join("\n")}
        </ul>
      </section>
    `,
  },
  {
    path: "/agenda",
    title: "Agenda una reunión estratégica | APOC Automation",
    description:
      "Reserva una reunión estratégica con APOC para evaluar arquitectura, seguridad, automatización y oportunidad de negocio para tu empresa.",
    image: `${seoConfig.baseUrl}/og-image.jpg`,
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Agendar reunión estratégica | APOC Automation",
      url: `${seoConfig.baseUrl}/agenda`,
      description: "Reserva una reunión estratégica con APOC Automation.",
    },
    contentHtml: `
      <main>
        <h1>Agenda tu reunión estratégica con APOC Automation</h1>
        <p>Analizaremos tu operación actual, procesos críticos, cuellos de botella y diseñaremos una propuesta técnica y de negocio adaptada a tus objetivos.</p>
      </main>
    `,
  },
  {
    path: "/casos-de-éxito",
    title: "Casos de éxito | APOC Automation",
    description:
      "Portfolio completo de APOC Automation con proyectos reales de automatización, agentes IA y software a medida en Argentina, Perú, México, España y Latam.",
    image: `${seoConfig.baseUrl}/og-image.jpg`,
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Casos de éxito | APOC Automation",
      description: "Portfolio completo de proyectos de APOC Automation.",
      url: `${seoConfig.baseUrl}/casos-de-éxito`,
    },
    contentHtml: `
      <main>
        <h1>Casos de éxito reales en automatización, agentes IA y software a medida</h1>
        <p>Proyectos desarrollados para industrias automotriz, salud, e-commerce, real estate, farmacéutica y más.</p>
        <div>
          ${caseStudies
            .map(
              (c) => `
            <article>
              <h2><a href="/proyectos/${c.id}">${c.client}</a></h2>
              <p><strong>Industria:</strong> ${c.industry}</p>
              <p><strong>Problema:</strong> ${c.problem}</p>
              <p><strong>Solución:</strong> ${c.solution}</p>
              <p><strong>Resultado:</strong> ${c.result}</p>
            </article>
          `
            )
            .join("\n")}
        </div>
      </main>
    `,
  },
];

// Add all individual case studies
for (const study of caseStudies) {
  const studyPath = `/proyectos/${study.id}`;
  const studyTitle = `${study.client} | Caso de éxito APOC Automation`;
  const studyDescription = `${study.client}: ${study.problem} Solución: ${study.solution}`;
  const studyImage = study.image
    ? `${seoConfig.baseUrl}${study.image}`
    : `${seoConfig.baseUrl}/og-image.jpg`;

  routes.push({
    path: studyPath,
    title: studyTitle,
    description: studyDescription,
    image: studyImage,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: studyTitle,
      description: studyDescription,
      image: studyImage,
      author: {
        "@type": "Organization",
        name: "APOC Automation",
        url: seoConfig.baseUrl,
      },
      mainEntityOfPage: `${seoConfig.baseUrl}${studyPath}`,
    },
    contentHtml: `
      <article>
        <h1>${study.client} — Caso de éxito</h1>
        <p><strong>Industria:</strong> ${study.industry}</p>
        <p><strong>Quién es el cliente:</strong> ${study.clientSummary || ""}</p>
        <section>
          <h2>Problema inicial</h2>
          <p>${study.problem}</p>
        </section>
        <section>
          <h2>Qué se desarrolló</h2>
          <p>${study.solution}</p>
        </section>
        <section>
          <h2>Tecnologías utilizadas</h2>
          <ul>
            ${study.technologies.map((t) => `<li>${t}</li>`).join("")}
          </ul>
        </section>
        <section>
          <h2>Resultados logrados</h2>
          <p>${study.result}</p>
          <ul>
            ${study.metrics.map((m) => `<li>${m}</li>`).join("")}
          </ul>
        </section>
        ${study.feedback ? `<blockquote>“${study.feedback}”</blockquote>` : ""}
      </article>
    `,
  });
}

function generateHtml(route) {
  let html = baseHtml;
  const canonicalUrl = `${seoConfig.baseUrl}${route.path}`;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace Description
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${route.description.replace(/"/g, "&quot;")}" />`
  );

  // Replace Canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace Open Graph Tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${route.title.replace(/"/g, "&quot;")}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${route.description.replace(/"/g, "&quot;")}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:image" content="${route.image}" />`
  );

  // Replace Twitter Tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:title" content="${route.title.replace(/"/g, "&quot;")}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:description" content="${route.description.replace(/"/g, "&quot;")}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:image" content="${route.image}" />`
  );

  // Replace Structured Data (Schema.org)
  if (route.schema) {
    const schemaJson = JSON.stringify(route.schema, null, 2);
    html = html.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
      `<script type="application/ld+json">\n${schemaJson}\n    </script>`
    );
  }

  // Inject semantic content into root container as prerendered markup (React will hydrate over it)
  if (route.contentHtml) {
    const prerenderMarkup = `<div id="root"><div class="prerender-seo-shell" style="visibility:hidden;position:absolute;width:1px;height:1px;overflow:hidden">${route.contentHtml}</div></div>`;
    html = html.replace(/<div id="root"><\/div>/i, prerenderMarkup);
  }

  return html;
}

console.log("Starting SSG Prerendering for APOC Automation routes...");

for (const route of routes) {
  const renderedHtml = generateHtml(route);
  
  if (route.path === "/") {
    fs.writeFileSync(path.join(distDir, "index.html"), renderedHtml, "utf-8");
    console.log("✓ Prerendered / -> dist/index.html");
  } else {
    // Clean route path (handle accents or slashes)
    const relativeFolder = route.path.startsWith("/") ? route.path.slice(1) : route.path;
    const targetFolder = path.join(distDir, relativeFolder);
    fs.mkdirSync(targetFolder, { recursive: true });
    fs.writeFileSync(path.join(targetFolder, "index.html"), renderedHtml, "utf-8");
    console.log(`✓ Prerendered ${route.path} -> dist/${relativeFolder}/index.html`);
  }
}

console.log(`\n🎉 Successfully prerendered ${routes.length} static HTML pages for SEO!`);
