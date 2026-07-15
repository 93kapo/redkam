"use client";

import { useEffect, useState } from "react";
import { youtubeLinks } from "./youtube-links";

type Locale = "es" | "en";

type Project = {
  title: string;
  type: string;
  youtubeUrl: string;
  shape?: "wide" | "portrait" | "square";
};

const WHATSAPP_URL =
  "https://wa.me/50234056149?text=Hola%20REDKAM%2C%20quiero%20cotizar%20un%20proyecto%20audiovisual.";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${BASE_PATH}${path}`;

const copy = {
  es: {
    nav: ["Trabajo", "Servicios", "Operación", "Contacto"],
    heroTitle: "REDKAM",
    heroBody: "Aftermovie • Documental • Foto • FPV • Drone",
    viewWork: "Explorar trabajos",
    signal: "SEÑAL 06 / EN VIVO",
    introLabel: "00 / EXECUTION UNIT",
    introTitleA: "Tu visión.",
    introTitleB: "Nuestra ejecución.",
    introBody:
      "Nos integramos al brief, la producción y los lineamientos de tu marca para ejecutar una cobertura imposible de ignorar.",
    manifestoA: "Brief. Coordinación.",
    manifestoB: "Captura. Entrega.",
    workIndex: "01 / SELECTED WORK",
    workTitleA: "Trabajo",
    workTitleB: "seleccionado.",
    workBody:
      "FPV, cobertura live, cámara y postproducción. Cada proyecto se opera desde adentro.",
    play: "Ver en YouTube",
    youtubePending: "ENLACE DE YOUTUBE PENDIENTE",
    liveA: "No miramos",
    liveB: "el show.",
    liveC: "Operamos dentro.",
    archiveIndex: "02 / LIVE ARCHIVE",
    archiveTitle: "Una noche. Una oportunidad.",
    archiveBody: "Cortes de muestra ejecutados en conciertos, festivales y escenarios.",
    servicesIndex: "03 / CAPABILITIES",
    servicesTitle: "Una unidad. Todo el movimiento.",
    methodIndex: "04 / OPERATION",
    methodTitle: "Alcance claro. Ejecución precisa.",
    methodBody:
      "Entramos al equipo de producción con una ruta técnica concreta: menos fricción, más toma.",
    crewIndex: "05 / THE UNIT",
    crewTitle: "Dos operadores. Una ejecución.",
    contactIndex: "06 / REQUEST A QUOTE",
    contactTitleA: "Ejecutemos",
    contactTitleB: "la toma.",
    contactBody:
      "Compártenos fecha, locación, cobertura, entregables y presupuesto de referencia.",
    contactCta: "Escribir por WhatsApp",
    menu: "Menú",
    close: "Cerrar",
    scroll: "Scroll para cruzar",
  },
  en: {
    nav: ["Work", "Services", "Operation", "Contact"],
    heroTitle: "REDKAM",
    heroBody: "Aftermovie • Documentary • Photo • FPV • Drone",
    viewWork: "Explore the work",
    signal: "SIGNAL 06 / LIVE",
    introLabel: "00 / EXECUTION UNIT",
    introTitleA: "Your vision.",
    introTitleB: "Our execution.",
    introBody:
      "We join your brief, production and brand guidelines to execute coverage that is impossible to ignore.",
    manifestoA: "Brief. Coordination.",
    manifestoB: "Capture. Delivery.",
    workIndex: "01 / SELECTED WORK",
    workTitleA: "Selected",
    workTitleB: "work.",
    workBody:
      "FPV, live coverage, camera and postproduction. Every project is operated from the inside.",
    play: "Watch on YouTube",
    youtubePending: "YOUTUBE LINK PENDING",
    liveA: "We do not watch",
    liveB: "the show.",
    liveC: "We operate inside.",
    archiveIndex: "02 / LIVE ARCHIVE",
    archiveTitle: "One night. One chance.",
    archiveBody: "Sample cuts executed at concerts, festivals and stages.",
    servicesIndex: "03 / CAPABILITIES",
    servicesTitle: "One unit. Every movement.",
    methodIndex: "04 / OPERATION",
    methodTitle: "Clear scope. Precise execution.",
    methodBody:
      "We join the production team with a concrete technical route: less friction, more shot.",
    crewIndex: "05 / THE UNIT",
    crewTitle: "Two operators. One execution.",
    contactIndex: "06 / REQUEST A QUOTE",
    contactTitleA: "Let’s execute",
    contactTitleB: "the shot.",
    contactBody:
      "Send us the date, location, coverage, deliverables and reference budget.",
    contactCta: "Message on WhatsApp",
    menu: "Menu",
    close: "Close",
    scroll: "Scroll to cross",
  },
} as const;

const projects: Project[] = [
  {
    title: "AFTERMOVIE",
    type: "LIVE / ARTIST / CAMERA",
    youtubeUrl: youtubeLinks.aftermovie,
    shape: "wide",
  },
  {
    title: "MYKE TOWERS",
    type: "LIVE / ARTIST / CAMERA",
    youtubeUrl: youtubeLinks.mykeTowers,
    shape: "wide",
  },
  {
    title: "DJ SNAKE",
    type: "LIVE / FESTIVAL / FPV",
    youtubeUrl: youtubeLinks.djSnake,
    shape: "wide",
  },
  {
    title: "FASHION",
    type: "FASHION / LIFESTYLE / CAMERA",
    youtubeUrl: youtubeLinks.fashion,
    shape: "square",
  },
  {
    title: "MODELING",
    type: "CLOTHING / MODELING / CAMERA",
    youtubeUrl: youtubeLinks.modeling,
    shape: "wide",
  },
  {
    title: "FIREWORKS",
    type: "EMF / PYRO / FPV",
    youtubeUrl: youtubeLinks.fireworks,
    shape: "portrait",
  },
];

const archive: Project[] = [
  {
    title: "LIVE SESSION",
    type: "PERFORMANCE / STAGE / CAMERA",
    youtubeUrl: youtubeLinks.liveSession,
  },
  {
    title: "BRAND EXPERIENCE",
    type: "EVENT / LIFESTYLE / CAMERA",
    youtubeUrl: youtubeLinks.brandExperience,
  },
  {
    title: "SUBTRONICS",
    type: "LIVE / STAGE / SOCIAL",
    youtubeUrl: youtubeLinks.subtronics,
  },
  {
    title: "YANDEL",
    type: "LIVE / ARTIST / CAMERA",
    youtubeUrl: youtubeLinks.yandel,
  },
  {
    title: "ED SHEERAN",
    type: "LIVE / VENUE / COVERAGE",
    youtubeUrl: youtubeLinks.edSheeran,
  },
];

const capabilities = [
  ["01", "FPV", "Rutas imposibles / Live precision"],
  ["02", "DRONE", "Escala / Movimiento / Contexto"],
  ["03", "CAMERA", "Ground unit / Artist coverage"],
  ["04", "POST", "Edit / Color / Delivery"],
];

const method = [
  ["01", "BRIEF", "Objetivo, locación, rundown, entregables y referencias.", "Objective, location, rundown, deliverables and references."],
  ["02", "COORDINATION", "Ruta técnica, accesos, seguridad y comunicación.", "Technical route, access, safety and communication."],
  ["03", "CAPTURE", "FPV, drone estabilizado y cámara terrestre.", "FPV, stabilized drone and ground camera."],
  ["04", "DELIVERY", "Selección, edición, color y formatos finales.", "Selection, edit, color and final formats."],
];

function Arrow({ down = false }: { down?: boolean }) {
  return <span aria-hidden="true">{down ? "↘" : "↗"}</span>;
}

function getYouTubeId(value: string): string | null {
  const input = value.trim();
  if (!input) return null;

  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  try {
    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, "");
    let id = host === "youtu.be" ? url.pathname.split("/").filter(Boolean)[0] : url.searchParams.get("v");
    if (!id) {
      const parts = url.pathname.split("/").filter(Boolean);
      const marker = parts.findIndex((part) => part === "shorts" || part === "embed" || part === "live");
      if (marker >= 0) id = parts[marker + 1];
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

function getYouTubeEmbedUrl(value: string): string | null {
  const id = getYouTubeId(value);
  return id
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0&modestbranding=1&start=1&end=7`
    : null;
}

function getYouTubeWatchUrl(value: string): string | null {
  const id = getYouTubeId(value);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("es");
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const t = copy[locale];
  const mendivilEmbedUrl = getYouTubeEmbedUrl(youtubeLinks.mendivil);
  const mendivilWatchUrl = getYouTubeWatchUrl(youtubeLinks.mendivil);

  useEffect(() => {
    let current = 0;
    const timer = window.setInterval(() => {
      current += current < 72 ? 7 : current < 92 ? 3 : 1;
      current = Math.min(current, 100);
      setLoad(current);
      if (current === 100) {
        window.clearInterval(timer);
        window.setTimeout(() => setLoading(false), 360);
      }
    }, 42);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(available > 0 ? (window.scrollY / available) * 100 : 0);
    };
    const onPointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5%" },
    );
    reveals.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", menuOpen);
    return () => document.body.classList.remove("is-locked");
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navTargets = ["work", "services", "method", "contact"];

  return (
    <>
      <div className={`loader ${loading ? "" : "is-complete"}`} aria-live="polite">
        <div className="loader__top">
          <span className="wordmark"><b>RED</b>KAM</span>
          <span>PRODUCTION + EXECUTION UNIT</span>
        </div>
        <div className="loader__signal" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="loader__bottom">
          <div>
            <span>ACQUIRING SIGNAL</span>
            <strong>{String(load).padStart(2, "0")}</strong>
          </div>
          <div className="loader__track"><i style={{ width: `${load}%` }} /></div>
        </div>
      </div>

      <div className="noise" aria-hidden="true" />
      <div className="pointer-light" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true"><i style={{ height: `${scrollPercent}%` }} /></div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="REDKAM home"><b>RED</b>KAM</a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {t.nav.map((label, index) => <a key={label} href={`#${navTargets[index]}`}>{label}</a>)}
        </nav>
        <div className="header-tools">
          <button type="button" onClick={() => setLocale(locale === "es" ? "en" : "es")} aria-label="Cambiar idioma">
            {locale === "es" ? "EN" : "ES"}
          </button>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={t.menu}>
            <span>{menuOpen ? t.close : t.menu}</span><i /><i />
          </button>
        </div>
      </header>

      <aside className={`menu-panel ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <span className="mono-label">REDKAM / INDEX / 2026</span>
        <nav>
          {t.nav.map((label, index) => (
            <a key={label} href={`#${navTargets[index]}`} onClick={() => setMenuOpen(false)}>
              <small>0{index + 1}</small><strong>{label}</strong><Arrow down />
            </a>
          ))}
        </nav>
        <div className="menu-panel__footer"><span>GUATEMALA / LATAM</span><span>14°38&apos;N / 90°30&apos;W</span></div>
      </aside>

      <main>
        <section className="hero" id="top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/assets/new/signal-burst.jpg")} alt="" aria-hidden="true" />
          <div className="hero__wash" />
          <div className="hero__telemetry hero__telemetry--left"><span>REC ●</span><span>CAM 01 / FPV</span><span>4K / 60</span></div>
          <div className="hero__telemetry hero__telemetry--right"><span>LAT 14.6349</span><span>LON -90.5069</span><span>ALT 32M</span></div>
          <div className="hero__signal"><i />{t.signal}</div>
          <div className="hero__content">
            <h1 aria-label={t.heroTitle}><span>{t.heroTitle}</span></h1>
            <div className="hero__bottom">
              <p>{t.heroBody}</p>
              <a className="line-link" href="#work"><span>{t.viewWork}</span><Arrow down /></a>
            </div>
          </div>
          <div className="scroll-cue"><i /><span>{t.scroll}</span></div>
          <div className="hero__frame" aria-hidden="true"><i /><i /><i /><i /></div>
        </section>

        <section className="cinema-statement reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/assets/new/mendivil-fpv.jpg")} alt="" aria-hidden="true" />
          <div className="cinema-statement__shade" />
          <div className="cinema-statement__copy">
            <span className="section-index">{t.introLabel}</span>
            <h2>{t.introTitleA}<br /><em>{t.introTitleB}</em></h2>
            <p>{t.introBody}</p>
          </div>
          <div className="vertical-rail">FPV / DRONE / CAMERA / EDIT / COLOR</div>
        </section>

        <section className="manifesto reveal" aria-label="Manifesto">
          <span className="section-index">THE SCOPE / CLEAR</span>
          <p className="manifesto__loud">{t.manifestoA}<br /><span>{t.manifestoB}</span></p>
          <div className="manifesto__line"><i /></div>
        </section>

        <section className="work section-pad" id="work">
          <header className="section-heading reveal">
            <div><span className="section-index">{t.workIndex}</span><h2>{t.workTitleA}<br /><em>{t.workTitleB}</em></h2></div>
            <p>{t.workBody}</p>
          </header>
          <div className="project-grid">
            {projects.map((project, index) => {
              const embedUrl = getYouTubeEmbedUrl(project.youtubeUrl);
              const watchUrl = getYouTubeWatchUrl(project.youtubeUrl);
              return (
                <a
                  className={`project project--${project.shape} reveal ${watchUrl ? "" : "is-pending"}`}
                  key={project.title}
                  href={watchUrl ?? undefined}
                  target={watchUrl ? "_blank" : undefined}
                  rel={watchUrl ? "noopener noreferrer" : undefined}
                  aria-label={`${t.play}: ${project.title}`}
                  aria-disabled={!watchUrl}
                >
                  {embedUrl ? (
                    <iframe
                      className="youtube-miniclip"
                      src={embedUrl}
                      title={`Preview de ${project.title}`}
                      loading="lazy"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="youtube-placeholder"><b>YOUTUBE</b><small>{t.youtubePending}</small></span>
                  )}
                  <span className="project__shade" />
                  <span className="project__number">0{index + 1}</span>
                  <span className="project__meta"><small>{project.type}</small><strong>{project.title}</strong></span>
                  <span className="project__play"><b>▶</b><span>{t.play}</span></span>
                </a>
              );
            })}
          </div>
        </section>

        <section className="live-portal reveal">
          {mendivilEmbedUrl ? (
            <iframe className="youtube-miniclip" src={mendivilEmbedUrl} title="Preview de Mendivil" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" tabIndex={-1} aria-hidden="true" />
          ) : (
            <div className="youtube-placeholder"><b>YOUTUBE</b><small>{t.youtubePending}</small></div>
          )}
          <div className="live-portal__shade" />
          <div className="scan-line" aria-hidden="true" />
          <div className="live-portal__copy">
            <span className="section-index">LIVE / FPV / ONE CHANCE</span>
            <h2>{t.liveA}<br />{t.liveB}<br /><em>{t.liveC}</em></h2>
          </div>
          <a className={`play-orbit ${mendivilWatchUrl ? "" : "is-pending"}`} href={mendivilWatchUrl ?? undefined} target={mendivilWatchUrl ? "_blank" : undefined} rel={mendivilWatchUrl ? "noopener noreferrer" : undefined} aria-label={`${t.play}: Mendivil`} aria-disabled={!mendivilWatchUrl}>
            <span>MENDIVIL</span><b>▶</b>
          </a>
          <div className="live-portal__data">ALT 18.4M<br />VEL 61 KM/H<br /><span>REC ●</span></div>
        </section>

        <section className="archive section-pad">
          <header className="section-heading reveal">
            <div><span className="section-index">{t.archiveIndex}</span><h2>{t.archiveTitle}</h2></div>
            <p>{t.archiveBody}</p>
          </header>
          <div className="archive-list">
            {archive.map((film, index) => {
              const embedUrl = getYouTubeEmbedUrl(film.youtubeUrl);
              const watchUrl = getYouTubeWatchUrl(film.youtubeUrl);
              return (
                <a className={`archive-row reveal ${watchUrl ? "" : "is-pending"}`} key={film.title} href={watchUrl ?? undefined} target={watchUrl ? "_blank" : undefined} rel={watchUrl ? "noopener noreferrer" : undefined} aria-disabled={!watchUrl}>
                  <small>0{index + 1}</small><strong>{film.title}</strong><span>{film.type}</span><Arrow />
                  {embedUrl ? (
                    <iframe className="youtube-miniclip" src={embedUrl} title={`Preview de ${film.title}`} loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" tabIndex={-1} aria-hidden="true" />
                  ) : (
                    <span className="archive-row__pending">YOUTUBE</span>
                  )}
                </a>
              );
            })}
          </div>
        </section>

        <section className="capabilities section-pad" id="services">
          <header className="section-heading reveal">
            <div><span className="section-index">{t.servicesIndex}</span><h2>{t.servicesTitle}</h2></div>
          </header>
          <div className="capability-list">
            {capabilities.map(([number, title, description]) => (
              <article className="capability reveal" key={title}>
                <small>{number}</small><h3>{title}</h3><p>{description}</p><span>↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="method section-pad" id="method">
          <header className="section-heading reveal">
            <div><span className="section-index">{t.methodIndex}</span><h2>{t.methodTitle}</h2></div>
            <p>{t.methodBody}</p>
          </header>
          <div className="method-grid">
            {method.map(([number, title, descriptionEs, descriptionEn]) => (
              <article className="method-card reveal" key={title}>
                <div><span>{number}</span><i /><small>{title}</small></div>
                <h3>{title}</h3><p>{locale === "es" ? descriptionEs : descriptionEn}</p><b aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="crew section-pad">
          <header className="section-heading reveal">
            <div><span className="section-index">{t.crewIndex}</span><h2>{t.crewTitle}</h2></div>
          </header>
          <div className="crew-list">
            <a className="crew-row reveal" href="https://instagram.com/93kapo" target="_blank" rel="noreferrer"><small>FPV / DRONE / CAMERA</small><strong>93KAPO</strong><span>@93KAPO</span><Arrow /></a>
            <a className="crew-row reveal" href="https://instagram.com/_redbackpack" target="_blank" rel="noreferrer"><small>CAMERA / EDIT / COLOR</small><strong>REDBACKPACK</strong><span>@_REDBACKPACK</span><Arrow /></a>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact__halo" aria-hidden="true" />
          <div className="contact__content reveal">
            <span className="section-index">{t.contactIndex}</span>
            <h2>{t.contactTitleA}<br /><em>{t.contactTitleB}</em></h2>
            <p>{t.contactBody}</p>
            <a className="pill-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><span>{t.contactCta}</span><Arrow /></a>
          </div>
          <div className="availability"><span>AVAILABLE FOR</span><strong>GUATEMALA<br />+ LATAM</strong></div>
        </section>
      </main>

      <footer>
        <a className="wordmark" href="#top"><b>RED</b>KAM</a>
        <span>PRODUCTION + EXECUTION UNIT / 2026</span>
        <span>GUATEMALA / LATAM</span>
      </footer>

      <a
        className="whatsapp-fab"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={locale === "es" ? "Escribir a REDKAM por WhatsApp" : "Message REDKAM on WhatsApp"}
      >
        <span className="whatsapp-fab__icon" aria-hidden="true">W</span>
        <span>WhatsApp</span>
        <i aria-hidden="true">↗</i>
      </a>

    </>
  );
}
