(() => {
  'use strict';

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const captureMode = new URLSearchParams(location.search).has('capture');

  /* PRELOADER */
  const preloader = $('#preloader');
  const loadCount = $('#loadCount');
  const loadLine = $('#loadLine');
  const loadLabel = $('#loadLabel');
  let progress = 0;
  if (captureMode) preloader.classList.add('is-done');
  const loadTimer = window.setInterval(() => {
    progress = Math.min(100, progress + Math.ceil(Math.random() * 11));
    loadCount.textContent = String(progress).padStart(2, '0');
    loadLine.style.width = `${progress}%`;
    if (progress >= 78) loadLabel.textContent = 'SIGNAL LOCKED';
    if (progress >= 100) {
      clearInterval(loadTimer);
      window.setTimeout(() => preloader.classList.add('is-done'), 280);
    }
  }, 70);
  window.addEventListener('load', () => {
    progress = Math.max(progress, 90);
    window.setTimeout(() => {
      loadCount.textContent = '100';
      loadLine.style.width = '100%';
      loadLabel.textContent = 'ENTER REDKAM';
      window.setTimeout(() => preloader.classList.add('is-done'), 350);
    }, 220);
  }, { once: true });

  /* CUSTOM CURSOR */
  const cursor = $('#cursor');
  let cursorX = innerWidth / 2;
  let cursorY = innerHeight / 2;
  let cursorRX = cursorX;
  let cursorRY = cursorY;
  window.addEventListener('pointermove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
  }, { passive: true });
  function animateCursor() {
    cursorRX += (cursorX - cursorRX) * 0.18;
    cursorRY += (cursorY - cursorRY) * 0.18;
    cursor.style.transform = `translate(${cursorRX - 21}px, ${cursorRY - 21}px)`;
    requestAnimationFrame(animateCursor);
  }
  if (cursor && matchMedia('(pointer:fine)').matches) animateCursor();
  $$('.project-card, .film-row, .circle-button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor?.classList.add('is-active'));
    el.addEventListener('mouseleave', () => cursor?.classList.remove('is-active'));
  });

  /* NAV / MOBILE */
  const siteHeader = $('#siteHeader');
  const menuToggle = $('#menuToggle');
  const mobileMenu = $('#mobileMenu');
  let previousScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > previousScroll && current > 180 && !document.body.classList.contains('menu-open')) siteHeader.classList.add('is-hidden');
    else siteHeader.classList.remove('is-hidden');
    previousScroll = current;
  }, { passive: true });
  menuToggle.addEventListener('click', () => {
    const open = !menuToggle.classList.contains('is-open');
    menuToggle.classList.toggle('is-open', open);
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  });
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
    menuToggle.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }));

  /* LANGUAGE */
  const translations = {
    es: {
      navWork:'Trabajo', navMethod:'Operación', navCrew:'Crew', navProject:'Cotizar', soundOff:'Sonido',
      heroEyebrow:'FPV · DRONE · CAMERA UNIT · POST', heroLine1:'Entramos donde', heroLine2:'las cámaras', heroLine3:'no.',
      heroBody:'Producción y operación audiovisual especializada para eventos, marcas y campañas.',
      enterUniverse:'Ver trabajos', gravityNote:'Mueve el cursor. Altera la gravedad.',
      signalTitle:'Tu visión.<br><span>Nuestra ejecución.</span>', signalBody:'Nos integramos al brief, la producción y los lineamientos de tu marca para ejecutar la cobertura acordada.',
      manifestoLead:'No vendemos conceptos que no fueron contratados.', manifestoImpact:'Brief. Coordinación. <span>Captura. Entrega.</span>',
      selectedWork:'Trabajo<br>seleccionado.', workIntro:'Operación FPV, cobertura live, cámara y postproducción ejecutadas bajo el alcance acordado.', playFilm:'Ver corte',
      liveLine1:'No miramos', liveLine2:'el show.', liveLine3:'Operamos dentro.', liveArchive:'Una noche.<br>Una oportunidad.', archiveIntro:'Cortes de muestra de operaciones ejecutadas en conciertos, festivales y escenarios.',
      hospitalityTitle:'Restaurantes.<br>Producto. Atmósfera.', hospitalityIntro:'Contenido ejecutado para comunicación digital, producto, servicio y experiencia de marca.',
      methodTitle:'Alcance claro.<br>Ejecución precisa.', methodIntro:'Nos integramos al equipo del cliente, agencia o producción y ejecutamos únicamente el alcance acordado.',
      method1Title:'Recibimos', method1Body:'Objetivo, locación, rundown, entregables, referencias y lineamientos.', method2Title:'Coordinamos', method2Body:'Ruta técnica, accesos, seguridad, horarios y comunicación con producción.', method3Title:'Operamos', method3Body:'FPV, drone estabilizado y cámara terrestre según el alcance contratado.', method4Title:'Entregamos', method4Body:'Selección, edición, color, formatos y material final o bruto según acuerdo.',
      crewTitle:'Dos operadores.<br>Una ejecución.', missionTitle:'Ejecutemos<br>la toma.', missionBody:'Compártenos fecha, locación, cobertura requerida, entregables y presupuesto de referencia. Trabajamos bajo el brief y los lineamientos del cliente o su agencia.', startProject:'Solicitar cotización', scopeNote:'Producción y ejecución audiovisual. Conceptualización de campaña, diseño gráfico, dirección de arte y estrategia se cotizan por separado.'
    },
    en: {
      navWork:'Work', navMethod:'Operation', navCrew:'Crew', navProject:'Quote', soundOff:'Sound',
      heroEyebrow:'FPV · DRONE · CAMERA UNIT · POST', heroLine1:'We enter where', heroLine2:'cameras', heroLine3:'cannot.',
      heroBody:'Specialized audiovisual production and operation for events, brands and campaigns.',
      enterUniverse:'View work', gravityNote:'Move the cursor. Alter gravity.',
      signalTitle:'Your vision.<br><span>Our execution.</span>', signalBody:'We integrate into your brief, production and brand guidelines to execute the agreed coverage.',
      manifestoLead:'We do not sell concepts that were not commissioned.', manifestoImpact:'Brief. Coordination. <span>Capture. Delivery.</span>',
      selectedWork:'Selected<br>work.', workIntro:'FPV operation, live coverage, camera and postproduction executed within the agreed scope.', playFilm:'Play cut',
      liveLine1:'We do not watch', liveLine2:'the show.', liveLine3:'We operate inside.', liveArchive:'One night.<br>One chance.', archiveIntro:'Sample cuts from operations executed at concerts, festivals and stages.',
      hospitalityTitle:'Restaurants.<br>Product. Atmosphere.', hospitalityIntro:'Content executed for digital communication, product, service and brand experience.',
      methodTitle:'Clear scope.<br>Precise execution.', methodIntro:'We integrate with the client, agency or production team and execute only the agreed scope.',
      method1Title:'Receive', method1Body:'Objective, location, rundown, deliverables, references and guidelines.', method2Title:'Coordinate', method2Body:'Technical route, access, safety, timing and production communication.', method3Title:'Operate', method3Body:'FPV, stabilized drone and ground camera according to the contracted scope.', method4Title:'Deliver', method4Body:'Selection, editing, color, formats and final or raw material as agreed.',
      crewTitle:'Two operators.<br>One execution.', missionTitle:'Let’s execute<br>the shot.', missionBody:'Send us the date, location, required coverage, deliverables and reference budget. We work under the client or agency brief and guidelines.', startProject:'Request a quote', scopeNote:'Audiovisual production and execution. Campaign concepts, graphic design, art direction and strategy are quoted separately.'
    }
  };
  let language = 'es';
  const langToggle = $('#langToggle');
  langToggle.addEventListener('click', () => {
    language = language === 'es' ? 'en' : 'es';
    document.documentElement.lang = language;
    langToggle.textContent = language === 'es' ? 'EN' : 'ES';
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (translations[language][key]) el.innerHTML = translations[language][key];
    });
  });

  /* REVEAL OBSERVER */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    $$('.reveal-section').forEach(el => observer.observe(el));
  } else {
    $$('.reveal-section').forEach(el => el.classList.add('is-visible'));
  }

  /* PLAY PREVIEWS ONLY WHEN USEFUL */
  const previewVideos = $$('video[muted]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.play().catch(() => {});
        else entry.target.pause();
      });
    }, { threshold: 0.28 });
    previewVideos.forEach(video => videoObserver.observe(video));
  }

  /* PROJECT FOLLOW CURSOR */
  $$('.project-card').forEach(card => {
    const follower = $('.project-cursor', card);
    if (!follower) return;
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      follower.style.left = `${event.clientX - rect.left - 35}px`;
      follower.style.top = `${event.clientY - rect.top - 35}px`;
    });
  });

  /* MODAL: LOCAL + YOUTUBE */
  const modal = $('#mediaModal');
  const modalStage = $('#modalStage');
  const modalTitle = $('#modalTitle');
  const closeModalButton = $('#closeModal');

  function youtubeEmbedUrl(id) {
    const params = new URLSearchParams({
      autoplay: '1', rel: '0', modestbranding: '1', playsinline: '1', enablejsapi: '1'
    });
    if (/^https?:$/.test(location.protocol)) params.set('origin', location.origin);
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?${params}`;
  }
  function openMedia(trigger) {
    const title = trigger.dataset.title || 'REDKAM FILM';
    modalTitle.textContent = title;
    if (trigger.dataset.youtube) {
      modalStage.innerHTML = `<iframe title="${title}" src="${youtubeEmbedUrl(trigger.dataset.youtube)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
    } else if (trigger.dataset.local) {
      modalStage.innerHTML = `<video src="${trigger.dataset.local}" controls autoplay playsinline></video>`;
    } else return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeModalButton.focus({ preventScroll: true });
  }
  function closeMedia() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    window.setTimeout(() => { modalStage.innerHTML = ''; }, 420);
  }
  $$('[data-local], [data-youtube]').forEach(trigger => {
    trigger.addEventListener('click', () => openMedia(trigger));
    trigger.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openMedia(trigger);
      }
    });
  });
  closeModalButton.addEventListener('click', closeMedia);
  modal.addEventListener('click', event => { if (event.target === modal) closeMedia(); });
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (modal.classList.contains('is-open')) closeMedia();
      if (mobileMenu.classList.contains('is-open')) menuToggle.click();
    }
  });

  /* SOUND: USER-INITIATED SYNTHETIC ATMOSPHERE */
  const soundToggle = $('#soundToggle');
  let audioContext = null;
  let soundNodes = [];
  function startSound() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    audioContext = new AudioCtx();
    const master = audioContext.createGain();
    master.gain.value = 0.022;
    master.connect(audioContext.destination);
    [44, 66, 88].forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = index === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      gain.gain.value = index === 0 ? 0.62 : 0.12;
      oscillator.connect(gain).connect(master);
      oscillator.start();
      soundNodes.push(oscillator, gain);
    });
    soundNodes.push(master);
  }
  function stopSound() {
    if (!audioContext) return;
    const master = soundNodes[soundNodes.length - 1];
    if (master?.gain) master.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.35);
    window.setTimeout(() => {
      audioContext?.close().catch(() => {});
      audioContext = null;
      soundNodes = [];
    }, 420);
  }
  soundToggle.addEventListener('click', () => {
    const active = soundToggle.getAttribute('aria-pressed') !== 'true';
    soundToggle.setAttribute('aria-pressed', String(active));
    if (active) startSound(); else stopSound();
  });

  /* MAGNETIC INTERACTION */
  if (matchMedia('(pointer:fine)').matches && !reduceMotion) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', event => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.13}px, ${y * 0.13}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* BLACK HOLE — WEBGL, WITH 2D FALLBACK */
  const blackholeCanvas = $('#blackholeCanvas');
  const particleCanvas = $('#particleCanvas');
  let mouseX = 0.72;
  let mouseY = 0.43;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;
  window.addEventListener('pointermove', event => {
    targetMouseX = event.clientX / innerWidth;
    targetMouseY = 1 - event.clientY / innerHeight;
  }, { passive: true });

  function initBlackHoleWebGL() {
    const gl = blackholeCanvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'high-performance' });
    if (!gl) return false;
    const vertexSource = `
      attribute vec2 aPosition;
      void main(){ gl_Position = vec4(aPosition, 0.0, 1.0); }
    `;
    const fragmentSource = `
      precision highp float;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uTime;

      float hash21(vec2 p){
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(hash21(i),hash21(i+vec2(1.,0.)),f.x),mix(hash21(i+vec2(0.,1.)),hash21(i+vec2(1.)),f.x),f.y);
      }
      mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
      float stars(vec2 uv, float scale){
        vec2 gv=fract(uv*scale)-.5;
        vec2 id=floor(uv*scale);
        float n=hash21(id);
        float d=length(gv);
        float star=smoothstep(.035,0.,d)*step(.975,n);
        star += smoothstep(.012,0.,abs(gv.x))*smoothstep(.08,0.,abs(gv.y))*step(.994,n);
        return star*n;
      }
      void main(){
        vec2 frag=gl_FragCoord.xy;
        vec2 uv=(frag-.5*uResolution.xy)/uResolution.y;
        float aspect=uResolution.x/uResolution.y;
        vec2 baseCenter=vec2(mix(.12,.40,smoothstep(.8,1.8,aspect)),.06);
        vec2 center=baseCenter+(uMouse-vec2(.72,.57))*vec2(.055,.045);
        vec2 p=uv-center;
        float r=length(p);
        float angle=atan(p.y,p.x);
        float bend=.095/(r*r+.038);
        vec2 warped=p*(1.0+bend);
        vec3 col=vec3(.006,.0065,.008);

        float sf=stars(warped+vec2(uTime*.003,0.),32.)+stars(warped*rot(.13)-vec2(0.,uTime*.002),63.)*.65+stars(warped*rot(-.2),118.)*.35;
        float starFade=smoothstep(.13,.32,r);
        col += vec3(sf*starFade);

        vec2 disk=p*rot(-.16+(uMouse.x-.5)*.08);
        disk.y*=3.05;
        float dr=length(disk);
        float swirl=noise(vec2(angle*4.4-uTime*.45,dr*22.))+noise(vec2(angle*9.+uTime*.22,dr*44.))*.38;
        float ring=exp(-abs(dr-.31)*34.0);
        float outer=exp(-abs(dr-.39)*12.0)*.34;
        float breaks=smoothstep(.16,.92,swirl);
        float diskMask=(ring*mix(.35,1.55,breaks)+outer)*smoothstep(.125,.205,r);
        float beam=max(0.,dot(normalize(p+vec2(.0001)),normalize(vec2(-.85,.18))));
        vec3 hot=mix(vec3(1.0,.18,.025),vec3(1.0,.94,.68),pow(beam,3.));
        col += hot*diskMask*1.28;

        float lensTop=exp(-abs(length(vec2(p.x,p.y*1.72))-.205)*55.0)*smoothstep(.02,.12,abs(p.y));
        col += vec3(1.0,.72,.38)*lensTop*.56;

        float photon=exp(-abs(r-.153)*88.0);
        col += vec3(1.0,.72,.42)*photon*.72;

        float hole=1.0-smoothstep(.148,.158,r);
        col=mix(col,vec3(0.0),hole);
        float halo=exp(-r*7.8)*.09;
        col += vec3(.85,.18,.035)*halo;

        float vignette=1.0-smoothstep(.55,1.15,length(uv*vec2(.72,1.0)));
        col*=mix(.42,1.0,vignette);
        col=pow(col,vec3(.82));
        gl_FragColor=vec4(col,1.0);
      }
    `;
    function compile(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || 'Shader compile error');
      return shader;
    }
    try {
      const program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'Program link error');
      gl.useProgram(program);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'aPosition');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      const resolution = gl.getUniformLocation(program, 'uResolution');
      const mouse = gl.getUniformLocation(program, 'uMouse');
      const time = gl.getUniformLocation(program, 'uTime');
      function resize() {
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        const width = Math.floor(blackholeCanvas.clientWidth * dpr);
        const height = Math.floor(blackholeCanvas.clientHeight * dpr);
        if (blackholeCanvas.width !== width || blackholeCanvas.height !== height) {
          blackholeCanvas.width = width;
          blackholeCanvas.height = height;
          gl.viewport(0, 0, width, height);
        }
      }
      const started = performance.now();
      function render(now) {
        resize();
        mouseX += (targetMouseX - mouseX) * 0.035;
        mouseY += (targetMouseY - mouseY) * 0.035;
        gl.uniform2f(resolution, blackholeCanvas.width, blackholeCanvas.height);
        gl.uniform2f(mouse, mouseX, mouseY);
        gl.uniform1f(time, (now - started) / 1000);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        if (!captureMode) requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
      return true;
    } catch (error) {
      console.warn('WebGL black hole fallback:', error);
      return false;
    }
  }

  function initBlackHoleFallback() {
    const ctx = blackholeCanvas.getContext('2d');
    if (!ctx) return;
    function draw(now) {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      const width = blackholeCanvas.clientWidth;
      const height = blackholeCanvas.clientHeight;
      if (blackholeCanvas.width !== width*dpr || blackholeCanvas.height !== height*dpr) {
        blackholeCanvas.width = width*dpr; blackholeCanvas.height = height*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
      }
      mouseX += (targetMouseX-mouseX)*.03; mouseY += (targetMouseY-mouseY)*.03;
      const cx=width*(width<760?.55:.72)+(mouseX-.5)*25, cy=height*.42+(mouseY-.5)*20, radius=Math.min(width,height)*.15;
      ctx.clearRect(0,0,width,height); ctx.fillStyle='#020202';ctx.fillRect(0,0,width,height);
      ctx.save();ctx.translate(cx,cy);ctx.rotate(-.13);ctx.scale(1,.34);
      const glow=ctx.createRadialGradient(0,0,radius*.45,0,0,radius*2.5);glow.addColorStop(.2,'transparent');glow.addColorStop(.47,'rgba(255,245,210,.95)');glow.addColorStop(.56,'rgba(255,150,45,.88)');glow.addColorStop(.75,'rgba(255,42,18,.22)');glow.addColorStop(1,'transparent');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,radius*2.5,0,Math.PI*2);ctx.fill();ctx.restore();
      ctx.fillStyle='#000';ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.fill();
      if (!captureMode) requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }
  if (!reduceMotion && !initBlackHoleWebGL()) initBlackHoleFallback();
  if (reduceMotion) initBlackHoleFallback();

  /* VISIBLE SPIRAL PARTICLES */
  const particleCtx = particleCanvas.getContext('2d');
  const particles = [];
  function resetParticle(p, first = false) {
    p.angle = Math.random() * Math.PI * 2;
    p.radius = (first ? Math.random() : .55 + Math.random()*.45) * Math.max(innerWidth, innerHeight) * .75;
    p.speed = .001 + Math.random() * .0035;
    p.pull = .18 + Math.random() * .36;
    p.size = .35 + Math.random() * 1.65;
    p.alpha = .18 + Math.random() * .68;
    p.warm = Math.random() > .72;
  }
  for (let i=0;i<150;i++){const p={};resetParticle(p,true);particles.push(p)}
  function drawParticles(){
    const dpr=Math.min(devicePixelRatio||1,1.5),w=particleCanvas.clientWidth,h=particleCanvas.clientHeight;
    if(particleCanvas.width!==Math.floor(w*dpr)||particleCanvas.height!==Math.floor(h*dpr)){particleCanvas.width=Math.floor(w*dpr);particleCanvas.height=Math.floor(h*dpr);particleCtx.setTransform(dpr,0,0,dpr,0,0)}
    particleCtx.clearRect(0,0,w,h);
    const cx=w*(w<760?.55:.72)+(mouseX-.5)*26,cy=h*.42-(mouseY-.5)*22;
    for(const p of particles){
      p.angle+=p.speed*(1+700/(p.radius+120));p.radius-=p.pull;
      if(p.radius<Math.min(w,h)*.12)resetParticle(p);
      const squash=.63+.2*Math.min(1,p.radius/(Math.max(w,h)*.6));
      const x=cx+Math.cos(p.angle)*p.radius,y=cy+Math.sin(p.angle)*p.radius*squash;
      const tail=1+Math.max(0,1-p.radius/(Math.max(w,h)*.55))*5;
      particleCtx.beginPath();particleCtx.moveTo(x,y);particleCtx.lineTo(x-Math.sin(p.angle)*tail,y+Math.cos(p.angle)*tail*squash);
      particleCtx.strokeStyle=p.warm?`rgba(255,160,78,${p.alpha})`:`rgba(255,255,255,${p.alpha*.72})`;particleCtx.lineWidth=p.size;particleCtx.stroke();
    }
    if(!captureMode)requestAnimationFrame(drawParticles);
  }
  if(!reduceMotion)requestAnimationFrame(drawParticles);

  /* MISSION PARTICLES */
  const missionCanvas = $('#missionParticles');
  const missionCtx = missionCanvas.getContext('2d');
  const motes = Array.from({length:70},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.4+.2,v:Math.random()*.00035+.00008,a:Math.random()*.5+.08}));
  function drawMission(){
    const dpr=Math.min(devicePixelRatio||1,1.4),w=missionCanvas.clientWidth,h=missionCanvas.clientHeight;
    if(missionCanvas.width!==Math.floor(w*dpr)||missionCanvas.height!==Math.floor(h*dpr)){missionCanvas.width=Math.floor(w*dpr);missionCanvas.height=Math.floor(h*dpr);missionCtx.setTransform(dpr,0,0,dpr,0,0)}
    missionCtx.clearRect(0,0,w,h);
    motes.forEach(m=>{m.y-=m.v;if(m.y<-.03){m.y=1.03;m.x=Math.random()}missionCtx.fillStyle=`rgba(255,${100+Math.floor(m.x*100)},55,${m.a})`;missionCtx.beginPath();missionCtx.arc(m.x*w,m.y*h,m.r,0,Math.PI*2);missionCtx.fill()});
    if(!captureMode)requestAnimationFrame(drawMission);
  }
  if(!reduceMotion)requestAnimationFrame(drawMission);
})();
