"use client";

import { useEffect, useRef, useState } from "react";

type Locale = "es" | "en";

type Project = {
  title: string;
  type: string;
  image: string;
  video: string;
  mediaType?: "video/mp4" | "video/webm";
  shape?: "wide" | "portrait" | "square";
};

const copy = {
  es: {
    nav: ["Trabajo", "Servicios", "Operación", "Contacto"],
    soundOn: "Sonido ON",
    soundOff: "Sonido",
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
    play: "Ver corte",
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
    contactCta: "Solicitar cotización",
    menu: "Menú",
    close: "Cerrar",
    scroll: "Scroll para cruzar",
  },
  en: {
    nav: ["Work", "Services", "Operation", "Contact"],
    soundOn: "Sound ON",
    soundOff: "Sound",
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
    play: "Play cut",
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
    contactCta: "Request a quote",
    menu: "Menu",
    close: "Close",
    scroll: "Scroll to cross",
  },
} as const;

const projects: Project[] = [
  {
    title: "AFTERMOVIE",
    type: "LIVE / ARTIST / CAMERA",
    image: "/assets/new/aftermovie-live.png",
    video: "/assets/new/aftermovie-live.mp4",
    shape: "wide",
  },
  {
    title: "MYKE TOWERS",
    type: "LIVE / ARTIST / CAMERA",
    image: "/assets/v63/myke-bw.jpg",
    video: "/assets/v63/myke-bw-preview.mp4",
    shape: "wide",
  },
  {
    title: "DJ SNAKE",
    type: "LIVE / FESTIVAL / FPV",
    image: "/assets/new/snake-fpv.jpg",
    video: "/assets/new/snake-fpv.mp4",
    shape: "wide",
  },
  {
    title: "FASHION",
    type: "FASHION / LIFESTYLE / CAMERA",
    image: "/assets/v63/campaign-01.jpg",
    video: "/assets/v63/campaign-01.mp4",
    shape: "square",
  },
  {
    title: "MODELING",
    type: "CLOTHING / MODELING / CAMERA",
    image: "/assets/v63/campaign-04.jpg",
    video: "/assets/v63/campaign-04.mp4",
    shape: "wide",
  },
  {
    title: "FIREWORKS",
    type: "EMF / PYRO / FPV",
    image: "/assets/v63/fireworks-emf.jpg",
    video: "/assets/v63/fireworks-emf.mp4",
    shape: "portrait",
  },
];

const archive: Project[] = [
  {
    title: "LIVE SESSION",
    type: "PERFORMANCE / STAGE / CAMERA",
    image: "/assets/new/live-session.png",
    video: "/assets/new/live-session.webm",
    mediaType: "video/webm",
  },
  {
    title: "BRAND EXPERIENCE",
    type: "EVENT / LIFESTYLE / CAMERA",
    image: "/assets/new/brand-experience.png",
    video: "/assets/new/brand-experience.webm",
    mediaType: "video/webm",
  },
  {
    title: "SUBTRONICS",
    type: "LIVE / STAGE / SOCIAL",
    image: "/assets/new/subtronics.jpg",
    video: "/assets/new/subtronics.mp4",
  },
  {
    title: "YANDEL",
    type: "LIVE / ARTIST / CAMERA",
    image: "/assets/new/yandel.jpg",
    video: "/assets/new/yandel.mp4",
  },
  {
    title: "ED SHEERAN",
    type: "LIVE / VENUE / COVERAGE",
    image: "/assets/new/ed-sheeran.jpg",
    video: "/assets/new/ed-sheeran.mp4",
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

export default function Home() {
  const [locale, setLocale] = useState<Locale>("es");
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [modal, setModal] = useState<{ title: string; video: string } | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const heroVideo = useRef<HTMLVideoElement>(null);
  const t = copy[locale];

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
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("main video[muted]"));
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio > 0.14) video.play().catch(() => undefined);
          else video.pause();
        });
      },
      { threshold: [0, 0.14, 0.5] },
    );
    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
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
    document.body.classList.toggle("is-locked", menuOpen || Boolean(modal));
    return () => document.body.classList.remove("is-locked");
  }, [menuOpen, modal]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setModal(null);
      setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    if (heroVideo.current) {
      heroVideo.current.muted = !next;
      heroVideo.current.volume = 0.55;
      heroVideo.current.play().catch(() => undefined);
    }
  };

  const openVideo = (title: string, video: string) => {
    setModal({ title, video });
  };

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
          <button className={soundOn ? "is-on" : ""} type="button" onClick={toggleSound} aria-pressed={soundOn}>
            <i className="sound-bars" aria-hidden="true"><b /><b /><b /><b /></i>
            <span>{soundOn ? t.soundOn : t.soundOff}</span>
          </button>
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
          <video ref={heroVideo} autoPlay muted loop playsInline preload="metadata" poster="/assets/new/signal-burst.jpg">
            <source src="/assets/new/signal-burst.mp4" type="video/mp4" />
          </video>
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
          <video autoPlay muted loop playsInline preload="metadata" poster="/assets/new/mendivil-fpv.jpg">
            <source src="/assets/new/mendivil-fpv.mp4" type="video/mp4" />
          </video>
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
            {projects.map((project, index) => (
              <button className={`project project--${project.shape} reveal`} key={project.title} type="button" onClick={() => openVideo(project.title, project.video)} aria-label={`${t.play}: ${project.title}`}>
                <span className="project__blur" style={{ backgroundImage: `url(${project.image})` }} />
                <video muted loop playsInline preload="metadata" poster={project.image}>
                  <source src={project.video} type={project.mediaType ?? "video/mp4"} />
                </video>
                <span className="project__shade" />
                <span className="project__number">0{index + 1}</span>
                <span className="project__meta"><small>{project.type}</small><strong>{project.title}</strong></span>
                <span className="project__play"><b>▶</b>{t.play}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="live-portal reveal">
          <video autoPlay muted loop playsInline preload="metadata" poster="/assets/new/mendivil-fpv.jpg">
            <source src="/assets/new/mendivil-fpv.mp4" type="video/mp4" />
          </video>
          <div className="live-portal__shade" />
          <div className="scan-line" aria-hidden="true" />
          <div className="live-portal__copy">
            <span className="section-index">LIVE / FPV / ONE CHANCE</span>
            <h2>{t.liveA}<br />{t.liveB}<br /><em>{t.liveC}</em></h2>
          </div>
          <button className="play-orbit" type="button" onClick={() => openVideo("MENDIVIL — FPV CUT", "/assets/new/mendivil-fpv.mp4")} aria-label={`${t.play}: Mendivil`}>
            <span>MENDIVIL</span><b>▶</b>
          </button>
          <div className="live-portal__data">ALT 18.4M<br />VEL 61 KM/H<br /><span>REC ●</span></div>
        </section>

        <section className="archive section-pad">
          <header className="section-heading reveal">
            <div><span className="section-index">{t.archiveIndex}</span><h2>{t.archiveTitle}</h2></div>
            <p>{t.archiveBody}</p>
          </header>
          <div className="archive-list">
            {archive.map((film, index) => (
              <button className="archive-row reveal" key={film.title} type="button" onClick={() => openVideo(film.title, film.video)}>
                <small>0{index + 1}</small><strong>{film.title}</strong><span>{film.type}</span><Arrow />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={film.image} alt="" aria-hidden="true" />
              </button>
            ))}
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
            <a className="pill-link" href="mailto:alexanderpineda0717@gmail.com?subject=REDKAM%20-%20Solicitud%20de%20cotizaci%C3%B3n"><span>{t.contactCta}</span><Arrow /></a>
          </div>
          <div className="availability"><span>AVAILABLE FOR</span><strong>GUATEMALA<br />+ LATAM</strong></div>
        </section>
      </main>

      <footer>
        <a className="wordmark" href="#top"><b>RED</b>KAM</a>
        <span>PRODUCTION + EXECUTION UNIT / 2026</span>
        <span>GUATEMALA / LATAM</span>
      </footer>

      <div className={`media-modal ${modal ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!modal} aria-label="REDKAM video player">
        <header><span>{modal?.title ?? "REDKAM CUT"}</span><button type="button" onClick={() => setModal(null)}>{t.close} <b>×</b></button></header>
        <div className="media-modal__stage">
          {modal && <video key={modal.video} src={modal.video} controls autoPlay playsInline preload="auto" />}
        </div>
        <div className="media-modal__rail"><i /></div>
      </div>
    </>
  );
}
