(() => {
  'use strict';

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const compactDevice = window.matchMedia('(max-width:760px)').matches;
  const captureMode = new URLSearchParams(location.search).has('capture');
  const supportsIO = 'IntersectionObserver' in window;

  /* MOBILE VIEWPORT: Safari and Chrome browser chrome-safe sizing */
  const syncViewport = () => {
    document.documentElement.style.setProperty('--window-height', `${window.innerHeight}px`);
  };
  syncViewport();
  window.addEventListener('orientationchange', () => window.setTimeout(syncViewport, 220), { passive: true });
  window.visualViewport?.addEventListener('resize', syncViewport, { passive: true });

  /* PRELOADER */
  const preloader = $('#preloader');
  const loadCount = $('#loadCount');
  const loadLine = $('#loadLine');
  const loadLabel = $('#loadLabel');
  let progress = 0;
  let loadTimer = 0;
  const finishLoader = () => {
    if (!preloader || preloader.classList.contains('is-done')) return;
    window.clearInterval(loadTimer);
    loadCount.textContent = '100';
    loadLine.style.width = '100%';
    loadLabel.textContent = 'ENTER REDKAM';
    window.setTimeout(() => preloader.classList.add('is-done'), 260);
  };
  if (captureMode) {
    preloader?.classList.add('is-done');
  } else {
    loadTimer = window.setInterval(() => {
      progress = Math.min(94, progress + Math.ceil(Math.random() * 9));
      loadCount.textContent = String(progress).padStart(2, '0');
      loadLine.style.width = `${progress}%`;
      if (progress >= 72) loadLabel.textContent = 'SIGNAL LOCKED';
    }, 72);
    window.addEventListener('load', finishLoader, { once: true });
    window.setTimeout(finishLoader, 2600);
  }

  /* BODY SCROLL LOCK — preserves position in iOS Safari */
  let lockedScrollY = 0;
  const lockBody = (className) => {
    if (document.body.classList.contains(className)) return;
    lockedScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.width = '100%';
    document.body.classList.add(className);
  };
  const unlockBody = (className) => {
    document.body.classList.remove(className);
    if (document.body.classList.contains('menu-open') || document.body.classList.contains('modal-open')) return;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, lockedScrollY);
  };

  /* CURSOR */
  const cursor = $('#cursor');
  let cursorX = innerWidth / 2;
  let cursorY = innerHeight / 2;
  let cursorRX = cursorX;
  let cursorRY = cursorY;
  let cursorRaf = 0;
  if (cursor && finePointer && !reduceMotion) {
    window.addEventListener('pointermove', (event) => {
      cursorX = event.clientX;
      cursorY = event.clientY;
    }, { passive: true });
    const animateCursor = () => {
      cursorRX += (cursorX - cursorRX) * 0.18;
      cursorRY += (cursorY - cursorRY) * 0.18;
      cursor.style.transform = `translate3d(${cursorRX - 21}px,${cursorRY - 21}px,0)`;
      cursorRaf = requestAnimationFrame(animateCursor);
    };
    animateCursor();
    $$('.project-card,.film-row,.circle-button,.crew-row').forEach((element) => {
      element.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
      element.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
    });
  }

  /* NAVIGATION */
  const siteHeader = $('#siteHeader');
  const menuToggle = $('#menuToggle');
  const mobileMenu = $('#mobileMenu');
  let previousScroll = 0;
  let scrollTick = false;
  window.addEventListener('scroll', () => {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(() => {
      const current = window.scrollY;
      const shouldHide = current > previousScroll && current > 180 && !document.body.classList.contains('menu-open') && !document.body.classList.contains('modal-open');
      siteHeader?.classList.toggle('is-hidden', shouldHide);
      previousScroll = current;
      scrollTick = false;
    });
  }, { passive: true });

  const setMenu = (open) => {
    menuToggle?.classList.toggle('is-open', open);
    menuToggle?.setAttribute('aria-expanded', String(open));
    menuToggle?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    mobileMenu?.classList.toggle('is-open', open);
    mobileMenu?.setAttribute('aria-hidden', String(!open));
    if (open) lockBody('menu-open'); else unlockBody('menu-open');
  };
  menuToggle?.addEventListener('click', () => setMenu(!menuToggle.classList.contains('is-open')));
  $$('.mobile-menu a').forEach((anchor) => anchor.addEventListener('click', () => setMenu(false)));

  /* LANGUAGE */
  const translations = {
    es: {
      navWork:'Trabajo', navCommercial:'Comercial', navMethod:'Operación', navCrew:'Crew', navProject:'Cotizar', soundOff:'Sonido',
      heroEyebrow:'FPV · DRONE · CAMERA UNIT · POST', heroLine1:'Entramos donde', heroLine2:'las cámaras', heroLine3:'no.',
      heroBody:'Producción y operación audiovisual especializada para eventos, marcas y campañas.', enterUniverse:'Ver trabajos', gravityNote:'Mueve el cursor. Conecta la señal.',
      signalTitle:'Tu visión.<br><span>Nuestra ejecución.</span>', signalBody:'Nos integramos al brief, la producción y los lineamientos de tu marca para ejecutar la cobertura acordada.',
      manifestoLead:'No vendemos conceptos que no fueron contratados.', manifestoImpact:'Brief. Coordinación. <span>Captura. Entrega.</span>',
      selectedWork:'Trabajo<br>seleccionado.', workIntro:'Operación FPV, cobertura live, cámara y postproducción ejecutadas bajo el alcance acordado.', playFilm:'Ver corte',
      commercialTitle:'Personas.<br>Producto. Lugar.', commercialIntro:'Cámara, edición y piezas digitales ejecutadas para campañas, lifestyle, hospitality y comunicación de marca.',
      liveLine1:'No miramos', liveLine2:'el show.', liveLine3:'Operamos dentro.', liveArchive:'Una noche.<br>Una oportunidad.', archiveIntro:'Cortes de muestra de operaciones ejecutadas en conciertos, festivales y escenarios.',
      methodTitle:'Alcance claro.<br>Ejecución precisa.', methodIntro:'Nos integramos al equipo del cliente, agencia o producción y ejecutamos únicamente el alcance acordado.',
      method1Title:'Recibimos', method1Body:'Objetivo, locación, rundown, entregables, referencias y lineamientos.', method2Title:'Coordinamos', method2Body:'Ruta técnica, accesos, seguridad, horarios y comunicación con producción.', method3Title:'Operamos', method3Body:'FPV, drone estabilizado y cámara terrestre según el alcance contratado.', method4Title:'Entregamos', method4Body:'Selección, edición, color, formatos y material final o bruto según acuerdo.',
      crewTitle:'Dos operadores.<br>Una ejecución.', missionTitle:'Ejecutemos<br>la toma.', missionBody:'Compártenos fecha, locación, cobertura requerida, entregables y presupuesto de referencia. Trabajamos bajo el brief y los lineamientos del cliente o su agencia.', startProject:'Solicitar cotización', scopeNote:'Producción y ejecución audiovisual. Conceptualización de campaña, diseño gráfico, dirección de arte y estrategia se cotizan por separado.'
    },
    en: {
      navWork:'Work', navCommercial:'Commercial', navMethod:'Operation', navCrew:'Crew', navProject:'Quote', soundOff:'Sound',
      heroEyebrow:'FPV · DRONE · CAMERA UNIT · POST', heroLine1:'We enter where', heroLine2:'cameras', heroLine3:'cannot.',
      heroBody:'Specialized audiovisual production and operation for events, brands and campaigns.', enterUniverse:'View work', gravityNote:'Move the cursor. Connect the signal.',
      signalTitle:'Your vision.<br><span>Our execution.</span>', signalBody:'We integrate into your brief, production and brand guidelines to execute the agreed coverage.',
      manifestoLead:'We do not sell concepts that were not commissioned.', manifestoImpact:'Brief. Coordination. <span>Capture. Delivery.</span>',
      selectedWork:'Selected<br>work.', workIntro:'FPV operation, live coverage, camera and postproduction executed within the agreed scope.', playFilm:'Play cut',
      commercialTitle:'People.<br>Product. Place.', commercialIntro:'Camera, editing and digital pieces executed for campaigns, lifestyle, hospitality and brand communication.',
      liveLine1:'We do not watch', liveLine2:'the show.', liveLine3:'We operate inside.', liveArchive:'One night.<br>One chance.', archiveIntro:'Sample cuts from operations executed at concerts, festivals and stages.',
      methodTitle:'Clear scope.<br>Precise execution.', methodIntro:'We integrate with the client, agency or production team and execute only the agreed scope.',
      method1Title:'Receive', method1Body:'Objective, location, rundown, deliverables, references and guidelines.', method2Title:'Coordinate', method2Body:'Technical route, access, safety, timing and production communication.', method3Title:'Operate', method3Body:'FPV, stabilized drone and ground camera according to the contracted scope.', method4Title:'Deliver', method4Body:'Selection, editing, color, formats and final or raw material as agreed.',
      crewTitle:'Two operators.<br>One execution.', missionTitle:'Let’s execute<br>the shot.', missionBody:'Send us the date, location, required coverage, deliverables and reference budget. We work under the client or agency brief and guidelines.', startProject:'Request a quote', scopeNote:'Audiovisual production and execution. Campaign concepts, graphic design, art direction and strategy are quoted separately.'
    }
  };
  let language = 'es';
  const langToggle = $('#langToggle');
  langToggle?.addEventListener('click', () => {
    language = language === 'es' ? 'en' : 'es';
    document.documentElement.lang = language;
    langToggle.textContent = language === 'es' ? 'EN' : 'ES';
    $$('[data-i18n]').forEach((element) => {
      const value = translations[language][element.dataset.i18n];
      if (value) element.innerHTML = value;
    });
  });

  /* REVEALS */
  if (supportsIO && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: compactDevice ? 0.05 : 0.12, rootMargin: '0px 0px -5% 0px' });
    $$('.reveal-section').forEach((element) => revealObserver.observe(element));
  } else {
    $$('.reveal-section').forEach((element) => element.classList.add('is-visible'));
  }

  /* INLINE VIDEO POLICY — Safari-safe, bandwidth-aware */
  const previewVideos = $$('video[muted]');
  previewVideos.forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('disablepictureinpicture', '');
  });
  const safePlay = (video) => {
    if (!video || document.hidden || reduceMotion) return;
    const result = video.play();
    if (result?.catch) result.catch(() => {});
  };
  if (supportsIO && !reduceMotion) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.22) safePlay(entry.target);
        else entry.target.pause();
      });
    }, { threshold: [0, 0.22, 0.55] });
    previewVideos.forEach((video) => videoObserver.observe(video));
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) previewVideos.forEach((video) => video.pause());
  });

  /* DESKTOP FOLLOW CURSOR */
  if (finePointer) {
    $$('.project-card').forEach((card) => {
      const follower = $('.project-cursor', card);
      if (!follower) return;
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        follower.style.left = `${event.clientX - rect.left - 35}px`;
        follower.style.top = `${event.clientY - rect.top - 35}px`;
      });
    });
  }

  /* MEDIA MODAL */
  const modal = $('#mediaModal');
  const modalStage = $('#modalStage');
  const modalTitle = $('#modalTitle');
  const closeModalButton = $('#closeModal');
  let lastMediaTrigger = null;

  const youtubeEmbedUrl = (id) => {
    const params = new URLSearchParams({ autoplay:'1', rel:'0', playsinline:'1', enablejsapi:'1' });
    if (/^https?:$/.test(location.protocol)) params.set('origin', location.origin);
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?${params.toString()}`;
  };
  const openMedia = (trigger) => {
    if (!trigger || (!trigger.dataset.local && !trigger.dataset.youtube)) return;
    lastMediaTrigger = trigger;
    previewVideos.forEach((video) => video.pause());
    const title = trigger.dataset.title || 'REDKAM FILM';
    modalTitle.textContent = title;
    modalStage.replaceChildren();

    if (trigger.dataset.youtube) {
      const iframe = document.createElement('iframe');
      iframe.title = title;
      iframe.src = youtubeEmbedUrl(trigger.dataset.youtube);
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      modalStage.appendChild(iframe);
    } else {
      const video = document.createElement('video');
      video.src = trigger.dataset.local;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.setAttribute('controlsList', 'nodownload');
      modalStage.appendChild(video);
      video.addEventListener('loadedmetadata', () => video.play().catch(() => {}), { once: true });
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    lockBody('modal-open');
    window.setTimeout(() => closeModalButton?.focus({ preventScroll: true }), 60);
  };
  const closeMedia = () => {
    if (!modal.classList.contains('is-open')) return;
    const activeVideo = $('video', modalStage);
    if (activeVideo) activeVideo.pause();
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    unlockBody('modal-open');
    window.setTimeout(() => {
      modalStage.replaceChildren();
      lastMediaTrigger?.focus?.({ preventScroll: true });
      lastMediaTrigger = null;
    }, 360);
  };
  $$('[data-local],[data-youtube]').forEach((trigger) => {
    trigger.addEventListener('click', () => openMedia(trigger));
    trigger.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openMedia(trigger);
    });
  });
  closeModalButton?.addEventListener('click', closeMedia);
  modal?.addEventListener('pointerdown', (event) => { if (event.target === modal) closeMedia(); });
  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (modal?.classList.contains('is-open')) closeMedia();
    else if (mobileMenu?.classList.contains('is-open')) setMenu(false);
  });

  /* SOUND — only starts from a user gesture */
  const soundToggle = $('#soundToggle');
  let audioContext = null;
  let masterGain = null;
  let soundNodes = [];
  const stopSound = () => {
    if (!audioContext) return;
    if (masterGain) masterGain.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.08);
    window.setTimeout(() => {
      soundNodes.forEach((node) => { try { node.stop?.(); } catch (_) {} });
      audioContext?.close().catch(() => {});
      audioContext = null;
      masterGain = null;
      soundNodes = [];
    }, 300);
  };
  const startSound = async () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    audioContext = new AudioCtx();
    await audioContext.resume().catch(() => {});
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.018;
    masterGain.connect(audioContext.destination);
    [43, 65, 86].forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = index === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      gain.gain.value = index === 0 ? 0.58 : 0.11;
      oscillator.connect(gain).connect(masterGain);
      oscillator.start();
      soundNodes.push(oscillator);
    });
  };
  soundToggle?.addEventListener('click', async () => {
    const active = soundToggle.getAttribute('aria-pressed') !== 'true';
    soundToggle.setAttribute('aria-pressed', String(active));
    soundToggle.setAttribute('aria-label', active ? 'Desactivar sonido' : 'Activar sonido');
    if (active) await startSound(); else stopSound();
  });

  /* MAGNETIC */
  if (finePointer && !reduceMotion) {
    $$('.magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate3d(${x * 0.13}px,${y * 0.13}px,0)`;
      });
      element.addEventListener('pointerleave', () => { element.style.transform = ''; });
    });
  }

  /* CONSTELLATION */
  const constellationCanvas = $('#constellationCanvas');
  const hero = $('#top');
  const constellationCtx = constellationCanvas?.getContext('2d', { alpha: true });
  let constellationRunning = Boolean(constellationCtx && hero);
  let pointerX = compactDevice ? 0.72 : 0.74;
  let pointerY = 0.42;
  let targetPointerX = pointerX;
  let targetPointerY = pointerY;
  let scrollProgress = 0;
  const ripples = [];
  const anchorBlueprint = [[.56,.30,1.7,'FPV'],[.64,.22,1,''],[.72,.29,1.35,'DRONE'],[.80,.20,.8,''],[.88,.31,1.6,'CAMERA'],[.82,.43,.9,''],[.91,.52,1.15,''],[.78,.57,1.5,'POST'],[.67,.49,.85,''],[.59,.58,1.25,''],[.70,.68,.9,''],[.84,.72,1.4,'DELIVERY'],[.93,.67,.7,''],[.74,.39,1,''],[.87,.16,.75,'']];
  const anchorEdges = [[0,1],[1,2],[2,3],[3,4],[2,13],[13,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[4,5],[5,7],[13,8],[2,5],[4,14]];
  const anchors = anchorBlueprint.map((item, index) => ({ nx:item[0], ny:item[1], size:item[2], label:item[3], phase:index*.63, x:0, y:0 }));
  const starCount = compactDevice ? 82 : 170;
  const fieldStars = Array.from({ length: starCount }, (_, index) => ({ nx:Math.random(), ny:Math.random(), size:.25+Math.random()*1.15, alpha:.12+Math.random()*.58, phase:Math.random()*Math.PI*2, depth:.18+Math.random()*.82, warm:Math.random()>.91, index }));

  const updatePointer = (event) => {
    if (!hero || !finePointer) return;
    const rect = hero.getBoundingClientRect();
    if (event.clientY < rect.top || event.clientY > rect.bottom) return;
    targetPointerX = (event.clientX - rect.left) / rect.width;
    targetPointerY = (event.clientY - rect.top) / rect.height;
  };
  window.addEventListener('pointermove', updatePointer, { passive: true });
  hero?.addEventListener('pointerdown', (event) => {
    const rect = hero.getBoundingClientRect();
    targetPointerX = (event.clientX - rect.left) / rect.width;
    targetPointerY = (event.clientY - rect.top) / rect.height;
    ripples.push({ x:event.clientX-rect.left, y:event.clientY-rect.top, r:0, a:.66 });
  }, { passive: true });
  window.addEventListener('scroll', () => {
    const rect = hero?.getBoundingClientRect();
    if (rect) scrollProgress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
  }, { passive: true });

  const drawConstellation = (now = 0) => {
    if (!constellationRunning || document.hidden) {
      if (constellationRunning) requestAnimationFrame(drawConstellation);
      return;
    }
    const dpr = Math.min(devicePixelRatio || 1, compactDevice ? 1.25 : 1.6);
    const width = constellationCanvas.clientWidth;
    const height = constellationCanvas.clientHeight;
    if (!width || !height) { requestAnimationFrame(drawConstellation); return; }
    const renderWidth = Math.floor(width * dpr);
    const renderHeight = Math.floor(height * dpr);
    if (constellationCanvas.width !== renderWidth || constellationCanvas.height !== renderHeight) {
      constellationCanvas.width = renderWidth;
      constellationCanvas.height = renderHeight;
      constellationCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    pointerX += (targetPointerX - pointerX) * 0.045;
    pointerY += (targetPointerY - pointerY) * 0.045;
    const time = now * 0.001;
    constellationCtx.clearRect(0, 0, width, height);
    const background = constellationCtx.createRadialGradient(width*.76,height*.42,0,width*.76,height*.42,Math.max(width,height)*.68);
    background.addColorStop(0,'rgba(24,30,38,.38)'); background.addColorStop(.42,'rgba(7,9,13,.22)'); background.addColorStop(1,'rgba(0,0,0,0)');
    constellationCtx.fillStyle = background; constellationCtx.fillRect(0,0,width,height);

    fieldStars.forEach((star) => {
      const x = star.nx*width + (pointerX-.5)*18*star.depth;
      const y = star.ny*height + (pointerY-.5)*12*star.depth - scrollProgress*30*star.depth;
      const twinkle = .55 + .45*Math.sin(time*(.55+star.depth)+star.phase);
      const distance = Math.hypot(x-pointerX*width,y-pointerY*height);
      const wake = Math.max(0,1-distance/145);
      constellationCtx.beginPath();
      constellationCtx.fillStyle = star.warm ? `rgba(255,112,78,${star.alpha*twinkle})` : `rgba(230,239,255,${star.alpha*twinkle})`;
      constellationCtx.arc(x,y,star.size+wake*.85,0,Math.PI*2); constellationCtx.fill();
      if (finePointer && wake>.14) {
        constellationCtx.strokeStyle = `rgba(180,205,230,${wake*.11})`; constellationCtx.lineWidth=.55;
        constellationCtx.beginPath(); constellationCtx.moveTo(pointerX*width,pointerY*height); constellationCtx.lineTo(x,y); constellationCtx.stroke();
      }
    });

    anchors.forEach((node) => {
      const magnetic = Math.max(0,1-Math.hypot(node.nx-pointerX,node.ny-pointerY)/.28);
      node.x = node.nx*width + (pointerX-.5)*10 + (pointerX-node.nx)*width*magnetic*.035;
      node.y = node.ny*height + (pointerY-.5)*8 - scrollProgress*42 + (pointerY-node.ny)*height*magnetic*.03 + Math.sin(time*.45+node.phase)*3;
    });
    anchorEdges.forEach((edge,index) => {
      const a=anchors[edge[0]], b=anchors[edge[1]], pulse=.35+.28*Math.sin(time*1.05-index*.42);
      const gradient=constellationCtx.createLinearGradient(a.x,a.y,b.x,b.y);
      gradient.addColorStop(0,`rgba(215,228,240,${.12+pulse*.18})`); gradient.addColorStop(.72,`rgba(215,228,240,${.08+pulse*.12})`); gradient.addColorStop(1,`rgba(255,48,32,${.18+pulse*.2})`);
      constellationCtx.strokeStyle=gradient; constellationCtx.lineWidth=.65; constellationCtx.beginPath(); constellationCtx.moveTo(a.x,a.y); constellationCtx.lineTo(b.x,b.y); constellationCtx.stroke();
    });
    anchors.forEach((node) => {
      const proximity=Math.max(0,1-Math.hypot(node.x-pointerX*width,node.y-pointerY*height)/190);
      const glow=constellationCtx.createRadialGradient(node.x,node.y,0,node.x,node.y,18+proximity*20);
      glow.addColorStop(0,`rgba(255,255,255,${.56+proximity*.3})`); glow.addColorStop(.16,'rgba(182,210,235,.18)'); glow.addColorStop(1,'rgba(0,0,0,0)');
      constellationCtx.fillStyle=glow; constellationCtx.beginPath(); constellationCtx.arc(node.x,node.y,18+proximity*20,0,Math.PI*2); constellationCtx.fill();
      constellationCtx.fillStyle=proximity>.42?'#ff3a28':'rgba(245,249,255,.9)'; constellationCtx.beginPath(); constellationCtx.arc(node.x,node.y,node.size+proximity*1.2,0,Math.PI*2); constellationCtx.fill();
      if(node.label && width>760){constellationCtx.font='500 8px Arial,sans-serif';constellationCtx.fillStyle=`rgba(205,217,228,${.34+proximity*.5})`;constellationCtx.fillText(node.label,node.x+12,node.y-10)}
    });
    for(let index=ripples.length-1; index>=0; index--){const ripple=ripples[index];ripple.r+=2.4;ripple.a*=.965;constellationCtx.strokeStyle=`rgba(255,58,38,${ripple.a})`;constellationCtx.lineWidth=.7;constellationCtx.beginPath();constellationCtx.arc(ripple.x,ripple.y,ripple.r,0,Math.PI*2);constellationCtx.stroke();if(ripple.a<.025)ripples.splice(index,1)}
    if (!captureMode && !reduceMotion) requestAnimationFrame(drawConstellation);
  };
  if (constellationRunning) {
    if (reduceMotion) drawConstellation(2000); else requestAnimationFrame(drawConstellation);
  }

  /* MISSION PARTICLES */
  const missionCanvas = $('#missionParticles');
  const missionCtx = missionCanvas?.getContext('2d');
  const motes = Array.from({ length: compactDevice ? 38 : 70 }, () => ({ x:Math.random(), y:Math.random(), r:Math.random()*1.4+.2, v:Math.random()*.00035+.00008, a:Math.random()*.5+.08 }));
  const drawMission = () => {
    if (!missionCtx || document.hidden) { if (missionCtx) requestAnimationFrame(drawMission); return; }
    const dpr=Math.min(devicePixelRatio||1,compactDevice?1.1:1.4), width=missionCanvas.clientWidth, height=missionCanvas.clientHeight;
    if(missionCanvas.width!==Math.floor(width*dpr)||missionCanvas.height!==Math.floor(height*dpr)){missionCanvas.width=Math.floor(width*dpr);missionCanvas.height=Math.floor(height*dpr);missionCtx.setTransform(dpr,0,0,dpr,0,0)}
    missionCtx.clearRect(0,0,width,height);
    motes.forEach((mote)=>{mote.y-=mote.v;if(mote.y<-.03){mote.y=1.03;mote.x=Math.random()}missionCtx.fillStyle=`rgba(255,${100+Math.floor(mote.x*100)},55,${mote.a})`;missionCtx.beginPath();missionCtx.arc(mote.x*width,mote.y*height,mote.r,0,Math.PI*2);missionCtx.fill()});
    if(!captureMode&&!reduceMotion)requestAnimationFrame(drawMission);
  };
  if (missionCtx && !reduceMotion) requestAnimationFrame(drawMission);

  window.addEventListener('pagehide', () => {
    if (cursorRaf) cancelAnimationFrame(cursorRaf);
    stopSound();
  }, { once: true });
})();
