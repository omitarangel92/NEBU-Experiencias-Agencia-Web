import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight, Bot, CalendarCheck, Check, ChevronLeft, ChevronRight, Clock, Clock3, Code, Database, Eye, Gauge, Globe,
  HeartHandshake, Headset, LayoutTemplate, Layers, Mail, Menu, MessageCircle,
  MessagesSquare, Moon, MoreHorizontal, Palette, Pause, Play, Plug, RefreshCw, Rocket, Search, Send, Server,
  Share2, ShieldCheck, ShoppingCart, Signal, Smartphone, Sparkles, Sun, TrendingUp, WandSparkles, Wrench, X, Zap,
} from 'lucide-react';

const WA_NUMBER = '573106598981';
const SITE_URL = __SITE_URL__;
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
const CONTACT = { email: '', city: '', hours: '' }; // TODO: completar únicamente con datos de contacto confirmados.
const SHOW_INTRO_VIDEO = false;
const EASE = [0.23, 1, 0.32, 1];
let analyticsEnabled = false;
const icons = { ArrowUpRight, Bot, CalendarCheck, Check, ChevronLeft, ChevronRight, Clock, Clock3, Code, Database, Eye, Gauge, Globe, HeartHandshake, Headset, LayoutTemplate, Layers, Mail, Menu, MessageCircle, MessagesSquare, Moon, MoreHorizontal, Palette, Pause, Play, Plug, RefreshCw, Rocket, Search, Send, Server, ShieldCheck, ShoppingCart, Signal, Smartphone, Sparkles, Sun, TrendingUp, WandSparkles, Wrench, X, Zap };
const nav = [['home', 'Inicio'], ['quienes-somos', 'Quiénes somos'], ['servicios', 'Servicios'], ['planes', 'Planes'], ['cursos', 'Cursos'], ['contacto', 'Contacto']];
const slides = [
  { image: '/assets/img/hero-1-1600.webp', small: '/assets/img/hero-1-800.webp', width: 1600, height: 2133, kicker: 'Automatización inteligente', title: 'Tecnología que atiende a tus clientes mientras tú descansas', copy: 'Diseñamos sitios web y asistentes de inteligencia artificial para WhatsApp y chat web que responden, orientan y ayudan a atender a tus clientes.', action: 'Hablar por WhatsApp', message: 'Hola, quiero conocer los servicios de NebuExperiencias', points: [['Zap', 'Diseño ligero y optimizado'], ['Clock', 'Asistentes configurables para atender las 24 horas']] },
  { image: '/assets/img/hero-2-1600.webp', small: '/assets/img/hero-2-800.webp', width: 1600, height: 1067, kicker: 'Diseño y desarrollo', title: 'Sitios web modernos que convierten visitas en clientes', copy: 'Desarrollamos páginas veloces, atractivas y adaptadas a cualquier pantalla, para que tu negocio se vea profesional y venda más.', action: 'Cotizar mi sitio web', message: 'Hola, quiero cotizar un sitio web', points: [['Smartphone', 'Diseño adaptable a celular, tablet y computador'], ['Search', 'Optimizado para aparecer en Google']] },
  { image: '/assets/img/hero-3-1600.webp', small: '/assets/img/hero-3-800.webp', width: 1600, height: 1065, kicker: 'Optimización y crecimiento', title: 'Tu sitio actual puede cargar más rápido y vender más', copy: 'Revisamos y rediseñamos tu página para que sea más clara, más veloz y mucho más fácil de usar desde el celular.', action: 'Pedir una revisión', message: 'Hola, quiero una revisión de mi sitio web actual', points: [['Gauge', 'Auditoría de velocidad y usabilidad'], ['RefreshCw', 'Rediseño sin perder tu posicionamiento']] },
];
const services = [
  { icon: 'Bot', art: 'service-art-ai', title: 'Automatización con IA', copy: 'Asistentes inteligentes en WhatsApp y en el chat de tu web que responden preguntas y ayudan a atender clientes en cualquier momento.', points: ['Respuestas con la información de tu negocio', 'Agendamiento y toma de pedidos', 'Traspaso a una persona cuando hace falta'] },
  { icon: 'LayoutTemplate', art: 'service-art-web', title: 'Desarrollo web dinámico', copy: 'Sitios modernos, veloces y adaptados a celular, tablet y computador, listos para convertir visitas en clientes.', points: ['Diseño a la medida de tu marca', 'Optimizado para Google', 'Formularios, reservas y pagos'] },
  { icon: 'WandSparkles', art: 'service-art-redesign', title: 'Optimización y rediseño', copy: 'Renovamos tu sitio actual para que sea más rápido, más claro y mucho más fácil de usar desde el celular.', points: ['Auditoría de velocidad y usabilidad', 'Nuevo diseño sin perder tu posicionamiento', 'Mejoras de contenido y llamados a la acción'] },
];
const plans = [
  { name: 'Inicio', icon: 'Rocket', color: '#4263eb', for: 'Una página para salir a internet hoy.', price: '$690.000', action: 'Elegir Inicio', message: 'Hola, me interesa el plan Inicio', points: [['LayoutTemplate', 'Página única con diseño de tu marca'], ['Smartphone', 'Adaptable a celular, tableta y computador'], ['Globe', 'Dominio .com incluido el primer año'], ['Server', 'Hosting veloz incluido el primer año'], ['ShieldCheck', 'Certificado SSL'], ['MessageCircle', 'Botón directo a WhatsApp'], ['Headset', '15 días de soporte tras la publicación']] },
  { name: 'Web + Asistente IA', icon: 'Bot', color: '#087f8c', for: 'Un sitio web y atención automatizada en un mismo proyecto.', price: null, action: 'Cotizar Web + IA', message: 'Hola, me interesa el plan Web + Asistente IA', featured: true, points: [['LayoutTemplate', 'Sitio web adaptado a tu marca'], ['Bot', 'Asistente para WhatsApp y chat web'], ['MessagesSquare', 'Respuestas a preguntas frecuentes'], ['Clock', 'Configuración para atención las 24 horas'], ['HeartHandshake', 'Derivación a una persona cuando hace falta'], ['ShieldCheck', 'Configuración y pruebas antes de publicar'], ['Headset', 'Acompañamiento según el alcance acordado']] }, // TODO: confirmar precio y alcance antes de publicar.
  { name: 'A la medida', icon: 'Sparkles', color: '#9a4d00', for: 'Para proyectos con necesidades propias.', price: null, action: 'Cotizar por WhatsApp', message: 'Hola, quiero una cotización a la medida', points: [['ShoppingCart', 'Tiendas en línea y plataformas web'], ['Plug', 'Integraciones con tus sistemas'], ['Bot', 'Automatizaciones e IA personalizadas'], ['Wrench', 'Rediseño de sitios existentes'], ['Database', 'Infraestructura según el proyecto'], ['Rocket', 'Capacitación para tu equipo'], ['Headset', 'Acompañamiento según propuesta']] },
];
const courses = [
  { art: 'course-art-web', kicker: 'Diseño web', title: 'Tu primera web, paso a paso', copy: 'Publica un sitio profesional sin saber programar.', level: 'Nivel inicial', duration: '4 horas' },
  { art: 'course-art-ai', kicker: 'Automatización', title: 'Asistente de WhatsApp con IA', copy: 'Configura un asistente que responda por ti.', level: 'Nivel intermedio', duration: '6 horas' },
  { art: 'course-art-tools', kicker: 'Inteligencia artificial', title: 'IA para tu negocio', copy: 'Ahorra horas cada semana con herramientas que ya existen.', level: 'Nivel inicial', duration: '3 horas' },
];

function Icon({ name, ...props }) {
  const Component = icons[name];
  return Component ? <Component aria-hidden="true" {...props} /> : null;
}

function trackEvent(name, parameters = {}) {
  if (analyticsEnabled && typeof window.gtag === 'function') window.gtag('event', name, parameters);
}

function loadAnalytics(onError) {
  if (!/^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID) || typeof window === 'undefined') return;
  if (window.gtag) {
    analyticsEnabled = true;
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('event', 'page_view', { page_title: document.title, page_location: window.location.href });
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false, send_page_view: false });
  analyticsEnabled = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  script.onerror = () => {
    analyticsEnabled = false;
    script.remove();
    delete window.gtag;
    window.dataLayer = [];
    onError('No se pudo cargar la herramienta de analítica. El sitio sigue funcionando.');
  };
  document.head.appendChild(script);
  window.gtag('event', 'page_view', { page_title: document.title, page_location: window.location.href });
}

function Wa({ message, className, children, onClick, ...props }) {
  const planName = props['data-analytics-plan'];
  const action = props['data-analytics-action'];
  return <a className={className} href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" {...props} onClick={(event) => {
    onClick?.(event);
    const location = props['data-analytics-location'] || event.currentTarget.closest('section')?.id || (event.currentTarget.closest('.site-header') ? 'menu' : 'footer');
    trackEvent('click_whatsapp', { location });
    if (action === 'quote' || /cotiz/i.test(event.currentTarget.textContent || '')) trackEvent('click_cotizar', { location });
    if (planName) {
      const plan = planName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
      trackEvent(`click_plan_${plan}`, { plan_name: planName });
    }
  }}>{children}</a>;
}

function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    if (!/^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)) {
      if (GA_MEASUREMENT_ID) console.warn('VITE_GA_MEASUREMENT_ID no tiene el formato esperado G-XXXXXXXXXX.');
      return undefined;
    }
    let storedConsent;
    try {
      storedConsent = localStorage.getItem('analytics-consent');
    } catch {
      setFeedback('No pudimos leer tus preferencias; la analítica permanecerá desactivada.');
      return undefined;
    }
    if (storedConsent === 'accepted') loadAnalytics((message) => { setFeedback(message); setVisible(true); });
    else if (storedConsent !== 'rejected') setVisible(true);
    const openPreferences = () => setVisible(true);
    window.addEventListener('open-cookie-preferences', openPreferences);
    return () => window.removeEventListener('open-cookie-preferences', openPreferences);
  }, []);

  function chooseConsent(choice) {
    try {
      localStorage.setItem('analytics-consent', choice);
    } catch {
      setFeedback('No pudimos guardar tu preferencia; la analítica no se activó.');
      analyticsEnabled = false;
      setVisible(false);
      return;
    }
    if (choice === 'accepted') loadAnalytics((message) => { setFeedback(message); setVisible(true); });
    else {
      analyticsEnabled = false;
      if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0]?.trim();
        if (name?.startsWith('_ga')) document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      }
    }
    setFeedback(choice === 'accepted' ? 'Preferencia guardada: aceptaste la analítica.' : 'Preferencia guardada: rechazaste la analítica.');
    setVisible(false);
  }

  if (!/^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)) return null;
  return <>
    {visible && <aside className="cookie-consent" aria-label="Preferencias de analítica">
      <div><h2>Tu privacidad importa</h2><p>Usamos Google Analytics solo si lo aceptas para entender cómo se usa el sitio. Puedes rechazarlo sin perder ninguna función ni compartir los datos de contacto que escribas aquí.</p><p><button className="cookie-policy-link" type="button" onClick={() => setPrivacyOpen(true)}>Lee nuestra Política de privacidad</button>. Puedes cambiar esta decisión después desde el enlace de preferencias del pie de página.</p>{feedback && <p role="status">{feedback}</p>}</div>
      <div className="cookie-consent-actions"><button className="btn btn-primary" type="button" onClick={() => chooseConsent('accepted')}>Aceptar analítica</button><button className="btn" type="button" onClick={() => chooseConsent('rejected')}>Rechazar</button></div>
    </aside>}
    <p className="visually-hidden" role="status" aria-live="polite">{feedback}</p>
    {privacyOpen && <LegalModal doc={legalDocs.privacidad} onClose={() => setPrivacyOpen(false)} />}
  </>;
}

function Flow({ reduced }) {
  if (reduced) return null;
  return <motion.div className="section-lightstream" aria-hidden="true" animate={{ x: ['-7%', '7%'], y: ['-2%', '2%'], rotate: -7 }} transition={{ duration: 24, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }} />;
}

function Reveal({ as: Component = motion.div, children, className, delay = 0, move = true }) {
  const reduced = useReducedMotion();
  const visibleState = { opacity: 1, ...(move ? { y: 0 } : {}) };
  return <Component className={className} initial={false} whileInView={reduced ? undefined : visibleState} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.58, delay, ease: EASE }}>{children}</Component>;
}

function useMobileLayout() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 560px)');
    const update = (event) => setIsMobile(event.matches);
    setIsMobile(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return isMobile;
}

function Header({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  useEffect(() => {
    const sections = nav.map(([id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (event) => event.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);
  return (
    <header className="site-header"><nav className="container nav" aria-label="Principal">
      <a className="brand" href="#home" aria-label="NebuExperiencias, ir al inicio"><img className="logo logo-for-light" src="assets/img/logo-negro.webp" alt="Nebu, agencia web" width="420" height="240" /><img className="logo logo-for-dark" src="assets/img/logo-blanco.webp" alt="" width="420" height="240" aria-hidden="true" /></a>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="nav-links">{nav.map(([id, label]) => <li key={id}><a href={`#${id}`} className={`nav-link ${active === id ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{label}</a></li>)}<li className="nav-theme-item"><button className="nav-theme-toggle" type="button" aria-pressed={theme === 'dark'} onClick={() => { toggleTheme(); setMenuOpen(false); }}><Icon name={theme === 'dark' ? 'Sun' : 'Moon'} />Cambiar a tema {theme === 'dark' ? 'claro' : 'oscuro'}</button></li></ul>
      <div className="nav-actions">
        <Wa className="btn btn-primary nav-cta" message="Hola, quiero cotizar un proyecto con NebuExperiencias" data-analytics-location="menu" data-analytics-action="quote"><Icon name="MessageCircle" />Cotizar</Wa>
        <button className="icon-btn" id="theme-toggle" type="button" aria-label="Cambiar tema de color" aria-pressed={theme === 'dark'} onClick={toggleTheme}><span className="theme-icon-light"><Icon name="Moon" /></span><span className="theme-icon-dark"><Icon name="Sun" /></span></button>
        <button className="icon-btn menu-btn" id="menu-btn" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setMenuOpen((value) => !value)}><Icon name={menuOpen ? 'X' : 'Menu'} /></button>
      </div>
    </nav></header>
  );
}

function Hero({ reduced }) {
  const [current, setCurrent] = useState(0);
  const [userPaused, setUserPaused] = useState(Boolean(reduced));
  const [hoverPaused, setHoverPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const slide = slides[current];
  useEffect(() => {
    if (reduced || userPaused || hoverPaused || hidden) return undefined;
    const timer = window.setInterval(() => setCurrent((index) => (index + 1) % slides.length), 5200);
    return () => window.clearInterval(timer);
  }, [current, hidden, hoverPaused, reduced, userPaused]);
  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  const pauseForFocus = () => setHoverPaused(true);
  const resumeAfterFocus = (event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHoverPaused(false); };
  return (
    <section className="hero" id="home" aria-roledescription="carrusel" aria-label="Servicios destacados" onMouseEnter={() => setHoverPaused(true)} onMouseLeave={() => setHoverPaused(false)} onFocusCapture={pauseForFocus} onBlurCapture={resumeAfterFocus}>
      <div className="hero-slides"><AnimatePresence initial={false} mode="wait">
        <motion.div className="hero-slide is-active" key={current} role="group" aria-roledescription="diapositiva" aria-label={`${current + 1} de ${slides.length}`}>
          <motion.img className="hero-bg" src={slide.small} srcSet={`${slide.small} 800w, ${slide.image} 1600w`} sizes="100vw" width={slide.width} height={slide.height} decoding="async" alt="" aria-hidden="true" fetchPriority={current === 0 ? 'high' : 'auto'} initial={false} animate={reduced ? {} : { scale: [1.025, 1.075], x: ['0%', '-1%'], y: ['0%', '1%'] }} transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }} />
          <div className="hero-shade" aria-hidden="true" />
          <div className="container hero-layout">
            <motion.div className="hero-copy" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.58, ease: EASE }}>
              <p className="hero-kicker">{slide.kicker} <span>·</span> NebuExperiencias</p><h1 className="hero-title">{slide.title}</h1>
              <p className="lead">{slide.copy}</p><div className="hero-cta"><a className="btn btn-primary" href="#servicios"><Icon name="Sparkles" />Ver servicios</a><Wa className="btn" message={slide.message} data-analytics-location="hero"><Icon name="MessageCircle" />{slide.action}</Wa></div>
              <ul className="hero-points">{slide.points.map(([icon, text]) => <li key={text}><Icon name={icon} />{text}</li>)}</ul>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence></div>
      <div className="container hero-controls"><div className="hero-dots" role="group" aria-label="Elegir diapositiva">{slides.map((item, index) => <button key={item.kicker} className={`dot-btn ${current === index ? 'is-active' : ''}`} type="button" aria-label={`Ir a la diapositiva ${index + 1}`} aria-current={current === index ? 'true' : undefined} onClick={() => setCurrent(index)} />)}</div>
        <button className="icon-btn hero-pause" id="hero-pause" type="button" aria-label={userPaused ? 'Reanudar carrusel' : 'Pausar carrusel'} aria-pressed={userPaused} onClick={() => setUserPaused((value) => !value)}><Icon name={userPaused ? 'Play' : 'Pause'} /></button>
      </div>
    </section>
  );
}

function VideoButton() {
  const source = import.meta.env.VITE_PRESENTATION_VIDEO || '';
  const [playing, setPlaying] = useState(false);
  if (playing && source) {
    const isFile = /\.(mp4|webm|ogg)(\?.*)?$/i.test(source);
    return isFile
      ? <video src={source} controls autoPlay playsInline />
      : <iframe src={`${source}${source.includes('?') ? '&' : '?'}autoplay=1`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen title="Video de presentación de NebuExperiencias" />;
  }
  // TODO: conectar el video real con poster, carga diferida y subtítulos.
  return <button className="video-play" type="button" aria-label="Reproducir video de presentación" onClick={() => source && setPlaying(true)} disabled={!source}>
    <img className="video-preview" src="/assets/img/video-preview-900.webp" alt="" loading="lazy" /><span className="video-wash" aria-hidden="true" /><span className="play-circle"><Icon name="Play" /></span><span className="video-caption">Conoce NebuExperiencias en 60 segundos</span>
  </button>;
}

function About({ reduced }) {
  const values = [['HeartHandshake', 'Cercanía', 'Acompañamiento durante el proyecto, con canales y tiempos acordados.'], ['Gauge', 'Rendimiento', 'Diseño ligero y buenas prácticas; el rendimiento se valida en cada proyecto.'], ['Eye', 'Claridad', 'Alcance, entregables y costos definidos en una propuesta.']];
  return <section className="section section-about motion-surface" id="quienes-somos"><Flow reduced={reduced} /><div className={`container about-grid ${SHOW_INTRO_VIDEO ? '' : 'no-video'}`}>
    <Reveal as={motion.div} className="about-intro"><h2>Hacemos que la tecnología se sienta simple</h2><p className="lead">NebuExperiencias es una agencia web que ayuda a negocios a atender mejor, vender más y ahorrar tiempo con sitios web modernos y automatización con IA.</p></Reveal>
    <Reveal as={motion.div} delay={0.08}><div className="vision"><h3>Nuestra visión</h3><p>Que cualquier negocio, sin importar su tamaño, tenga una presencia digital profesional y herramientas para atender mejor a sus clientes.</p></div></Reveal>
    <Reveal as={motion.div} delay={0.16}><ul className="values">{values.map(([icon, title, copy]) => <li key={title}><span className="icon-well"><Icon name={icon} /></span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ul></Reveal>
    {SHOW_INTRO_VIDEO && <Reveal as={motion.div} delay={0.24}><div className="video-slot" id="video-slot"><VideoButton /></div></Reveal>}
  </div></section>;
}

function ServiceCard({ service, index }) {
  const isMobile = useMobileLayout();
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();
  const detailsVisible = !isMobile || expanded;
  const detailsId = `service-details-${index}`;

  return <Reveal as={motion.article} className={`card service ${index === 0 ? 'service-lead' : ''} ${isMobile ? 'service-mobile' : ''}`} delay={index * 0.08} move={false}>
    <div className={`service-art ${service.art}`} aria-hidden="true" />
    <span className="icon-well"><Icon name={service.icon} /></span>
    <h3>{service.title}</h3>
    <button className="service-more" type="button" aria-controls={detailsId} aria-expanded={detailsVisible} aria-label={`${detailsVisible ? 'Ocultar' : 'Mostrar'} detalles de ${service.title}`} onClick={() => setExpanded((value) => !value)}>
      <Icon name="MoreHorizontal" />
    </button>
    <AnimatePresence initial={false}>
      {detailsVisible && <motion.div id={detailsId} className="service-details" initial={isMobile && !reduced ? { height: 0, opacity: 0 } : false} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: EASE }}>
        <p>{service.copy}</p>
        <ul className="checks">{service.points.map((point) => <li key={point}><Icon name="Check" />{point}</li>)}</ul>
        <Wa className="text-link" message={`Hola, me interesa el servicio de ${service.title}`} data-analytics-location="servicios">Cotizar este servicio<Icon name="ArrowUpRight" /></Wa>
      </motion.div>}
    </AnimatePresence>
  </Reveal>;
}

function Services({ reduced }) {
  return <section className="section section-services motion-surface" id="servicios"><Flow reduced={reduced} /><div className="container">
    <Reveal className="section-head"><h2>Servicios</h2><p className="lead">Automatización con inteligencia artificial, desarrollo web y optimización para hacer crecer tu negocio.</p></Reveal>
    <div className="services-grid">{services.map((service, index) => <ServiceCard service={service} index={index} key={service.title} />)}</div>
  </div></section>;
}

function Plans() {
  return <section className="section section-plans" id="planes"><div className="container">
    <Reveal className="section-head"><h2>Planes</h2><p className="lead">Compara las opciones y elige el punto de partida para tu negocio.</p></Reveal>
    <div className="plans-grid">
      {plans.map((plan) => <Reveal as={motion.article} className={`plan ${plan.featured ? 'plan-featured' : ''}`} key={plan.name} move={false}>
        <div className="plan-head"><span className="plan-icon"><Icon name={plan.icon} /></span><h3>{plan.name}</h3>{plan.featured && <span className="badge">Recomendado</span>}</div>
        <p className="plan-for">{plan.for}</p>
        <p className="price">{plan.price ? <><span>Desde</span>{plan.price} <small>COP</small></> : <>Cotización <small>personalizada</small></>}</p>
        <p className="plan-includes">Qué incluye</p>
        <ul className="plan-list">{plan.points.map(([icon, text]) => <li key={text}><span className="plan-bullet"><Icon name={icon} /></span>{text}</li>)}</ul>
        <Wa className={`btn plan-cta ${plan.featured ? 'btn-primary' : ''}`} message={plan.message} data-analytics-location="planes" data-analytics-plan={plan.name}>{plan.action}</Wa>
      </Reveal>)}
    </div>
    <p className="plans-note">Precios en pesos colombianos (COP), sin IVA. Dominio y alojamiento web incluidos el primer año; después se renuevan a tarifa del proveedor.</p>
  </div></section>;
}

const successStories = []; // TODO: publicar solo casos, métricas y testimonios autorizados y verificables.

function Results() {
  if (!successStories.length) return null;
  return <section className="section section-results" id="resultados"><div className="container"><div className="section-head"><h2>Resultados</h2><p className="lead">Experiencias y resultados de clientes.</p></div><div className="results-grid">{successStories.map((story) => <article className="card" key={story.name}><h3>{story.name}</h3><p>{story.sector}</p><p>{story.problem}</p><p>{story.solution}</p><strong>{story.metric}</strong></article>)}</div></div></section>;
}

// TODO: confirmar los tiempos estimados de cada etapa antes de publicarlos.
const processSteps = [
  ['Search', 'Diagnóstico', 'Entendemos tu negocio, tus clientes y lo que necesitas resolver.'],
  ['Palette', 'Diseño y construcción', 'Preparamos una propuesta visual y desarrollamos el alcance acordado.'],
  ['Rocket', 'Entrega y capacitación', 'Publicamos el proyecto y te explicamos cómo usarlo.'],
  ['RefreshCw', 'Soporte y mejora', 'Te acompañamos durante el periodo incluido en tu plan.'],
];

function Process() {
  return <section className="section section-process" id="proceso"><div className="container"><div className="section-head"><h2>Cómo trabajamos</h2><p className="lead">Un proceso claro, desde la primera conversación hasta el acompañamiento.</p></div><ol className="process-grid">{processSteps.map(([icon, title, copy], index) => <li className="process-step" key={title}><span className="process-number">{String(index + 1).padStart(2, '0')}</span><span className="icon-well"><Icon name={icon} /></span><h3>{title}</h3><p>{copy}</p></li>)}</ol></div></section>;
}

function AssistantDemo() {
  const [messages, setMessages] = useState([{ role: 'assistant', text: '¡Hola! Soy el asistente de ejemplo de una cafetería ficticia. ¿Qué quieres consultar?' }]);
  const [typing, setTyping] = useState(false);
  const replies = {
    '¿Qué horarios tienen?': 'Este negocio de ejemplo atiende de lunes a sábado, de 8:00 a. m. a 6:00 p. m. (horario ficticio).',
    'Quiero agendar': '¡Claro! En una implementación real puedo recopilar el día y la hora que prefieres y confirmar la disponibilidad.',
    '¿Cuánto cuesta?': 'Los precios dependen del producto. Puedo mostrar el menú actualizado o ayudarte a hablar con una persona.',
  };
  function ask(question) {
    if (typing) return;
    setMessages((items) => [...items, { role: 'user', text: question }]);
    setTyping(true);
    window.setTimeout(() => {
      setMessages((items) => [...items, { role: 'assistant', text: replies[question] }]);
      setTyping(false);
    }, 650);
  }
  return <section className="section section-demo" id="demo"><div className="container demo-layout"><div><p className="eyebrow">Demostración interactiva</p><h2>Prueba nuestro asistente</h2><p className="lead">Esta conversación usa respuestas preparadas para un negocio ficticio; no consulta datos de clientes ni representa una integración activa.</p><Wa className="btn btn-primary" message="Hola, quiero un asistente de IA para mi negocio">Quiero esto para mi negocio<Icon name="ArrowUpRight" /></Wa></div><div className="demo-chat"><div className="demo-chat-head"><span className="icon-well"><Icon name="MessageCircle" /></span><div><strong>Cafetería de ejemplo</strong><p>Demostración, no servicio en vivo</p></div></div><div className="demo-messages" role="log" aria-live="polite" aria-relevant="additions">{messages.map((item, index) => <p className={`demo-bubble demo-bubble-${item.role}`} key={`${item.role}-${index}`}>{item.text}</p>)}{typing && <p className="demo-bubble demo-bubble-assistant" aria-label="El asistente está escribiendo">Escribiendo…</p>}</div><div className="demo-replies" aria-label="Respuestas rápidas">{Object.keys(replies).map((question) => <button className="demo-reply" type="button" key={question} disabled={typing} onClick={() => ask(question)}>{question}</button>)}</div></div></div></section>;
}

const faqItems = [
  ['¿Cuánto cuesta y qué incluye cada plan?', 'El plan Inicio parte de $690.000 COP e incluye una página con diseño de marca, dominio y alojamiento web el primer año, SSL, botón a WhatsApp y 15 días de soporte. El precio y alcance del plan Web + Asistente IA se confirman en la cotización. Los proyectos a la medida se cotizan según la propuesta.'],
  ['¿Cuánto tarda la entrega?', 'El plazo se define en la propuesta después de revisar el alcance, los contenidos y las aprobaciones necesarias.'],
  ['¿El dominio y el sitio son de mi propiedad?', 'Los entregables finales acordados se transfieren cuando se haya pagado el proyecto completo, de acuerdo con los términos del servicio. El registro del dominio queda sujeto a los datos de titularidad acordados al contratar.'],
  ['¿Qué pasa después del primer año de dominio y alojamiento web?', 'El plan Inicio los incluye el primer año. Después se renuevan a la tarifa vigente del proveedor, que se confirma antes de renovar.'],
  ['¿Cómo funciona el asistente de IA en WhatsApp y qué pasa si no sabe responder?', 'Se configura con información aprobada por tu negocio y se acuerdan las preguntas y tareas que puede atender. Cuando una consulta requiere intervención humana, se configura un canal de derivación según el alcance contratado.'],
  ['¿Qué datos de mis clientes se manejan y cómo se protegen?', 'Los datos dependen de los canales y funciones acordados. Consulta la política de privacidad y evita compartir contraseñas, datos bancarios o información sensible en el chat.'],
  ['¿Ofrecen soporte y cambios después de la publicación?', 'Sí. El periodo de soporte incluido depende del plan; el mantenimiento y las mejoras fuera de ese alcance se cotizan por separado.'],
  ['¿Qué métodos de pago aceptan?', 'Las fechas y medios de pago se especifican en la propuesta antes de iniciar. Confirma las opciones disponibles al solicitar tu cotización.'],
]; // TODO: validar respuestas, alcance comercial y textos legales antes de publicar.

function FAQ() {
  return <section className="section section-faq" id="preguntas-frecuentes"><div className="container faq-layout"><div className="section-head"><p className="eyebrow">Resolvemos tus dudas</p><h2>Preguntas frecuentes</h2><p className="lead">Si no encuentras lo que buscas, conversemos por WhatsApp.</p></div><div className="faq-list">{faqItems.map(([question, answer]) => <details className="faq-item" key={question} onToggle={(event) => event.currentTarget.open && trackEvent('open_faq', { question })}><summary>{question}<Icon name="ChevronRight" /></summary><p>{answer}</p></details>)}</div></div></section>;
}

function LeadForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', website: '', consent: false });
  const [status, setStatus] = useState({ message: '', error: false });
  const [sending, setSending] = useState(false);
  const [legal, setLegal] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (!form.email.trim() && !form.phone.trim()) {
      setStatus({ message: 'Escribe tu correo o tu WhatsApp para poder responderte.', error: true });
      return;
    }
    setSending(true);
    setStatus({ message: '', error: false });
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      let result;
      try { result = await response.json(); } catch { result = {}; }
      if (!response.ok || result.sent !== true) {
        throw new Error(result.error === 'lead_not_configured' ? 'lead_not_configured' : 'lead_delivery_failed');
      }
      trackEvent('submit_lead', { interest: form.interest });
      setForm({ name: '', email: '', phone: '', interest: '', website: '', consent: false });
      setStatus({ message: '¡Listo! Recibimos tus datos y te contactaremos pronto.', error: false });
    } catch (error) {
      const message = error instanceof Error && error.message === 'lead_not_configured'
        ? 'El formulario aún no está configurado para recibir mensajes. Escríbenos por WhatsApp.'
        : 'No pudimos enviar tu solicitud. Inténtalo de nuevo o contáctanos por WhatsApp.';
      setStatus({ message, error: true });
    } finally {
      setSending(false);
    }
  }

  return <section className="section section-lead" id="contacto"><div className="container lead-layout"><div><p className="eyebrow">Cuéntanos qué necesitas</p><h2>Conversemos sobre tu proyecto</h2><p className="lead">Déjanos un medio de contacto y el tema que te interesa. Usaremos tus datos únicamente para responder esta solicitud.</p><Wa className="text-link" message="Hola, prefiero pedir información por WhatsApp" data-analytics-location="formulario">O escríbenos directamente por WhatsApp<Icon name="ArrowUpRight" /></Wa></div><form className="lead-form" onSubmit={submit}>
    <div className="lead-form-row"><div><label htmlFor="lead-name">Nombre</label><input id="lead-name" name="name" autoComplete="name" maxLength="60" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></div><div><label htmlFor="lead-interest">¿Qué te interesa?</label><select id="lead-interest" name="interest" required value={form.interest} onChange={(event) => setForm({ ...form, interest: event.target.value })}><option value="">Elige una opción</option><option value="Desarrollo web">Desarrollo web</option><option value="Asistente de IA">Asistente de IA</option><option value="Optimización y rediseño">Optimización y rediseño</option><option value="Cursos">Cursos</option><option value="Otro proyecto">Otro proyecto</option></select></div></div>
    <div className="lead-form-row"><div><label htmlFor="lead-email">Correo electrónico</label><input id="lead-email" name="email" type="email" autoComplete="email" maxLength="120" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></div><div><label htmlFor="lead-phone">WhatsApp (incluye el indicativo)</label><input id="lead-phone" name="phone" type="tel" autoComplete="tel" maxLength="24" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></div></div>
    <p className="lead-hint">Completa al menos uno: correo electrónico o WhatsApp.</p>
    <div className="lead-honeypot" aria-hidden="true"><label htmlFor="lead-website">Deja este campo vacío</label><input id="lead-website" name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} /></div>
    <label className="lead-consent"><input type="checkbox" name="consent" required checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} /><span>Autorizo el uso de mis datos para responder esta solicitud. <button type="button" onClick={() => setLegal(true)}>Leer la Política de privacidad</button>.</span></label>
    <button className="btn btn-primary" type="submit" disabled={sending}>{sending ? 'Enviando…' : 'Enviar solicitud'}</button>
    <p className={`lead-status ${status.error ? 'is-error' : 'is-success'}`} role="status" aria-live="polite">{status.message}</p>
    {legal && <LegalModal doc={legalDocs.privacidad} onClose={() => setLegal(false)} />}
  </form></div></section>;
}

function FinalCTA() {
  return <section className="section section-final-cta"><div className="container final-cta-content"><p className="eyebrow">Hablemos de tu proyecto</p><h2>¿Listo para que tu negocio atienda 24/7?</h2><p>Cuéntanos qué quieres resolver y revisemos juntos el siguiente paso.</p><div className="final-cta-actions"><Wa className="btn btn-primary" message="Hola, vi su sitio web y quiero más información" data-analytics-location="cta-final">Hablar por WhatsApp<Icon name="MessageCircle" /></Wa><a className="btn final-cta-secondary" href="#planes">Ver planes<Icon name="ArrowUpRight" /></a></div></div></section>;
}

function SEOData() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NebuExperiencias',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/assets/img/logo-negro.webp`,
    areaServed: { '@type': 'Country', name: 'Colombia' },
    contactPoint: [{ '@type': 'ContactPoint', telephone: `+${WA_NUMBER}`, contactType: 'sales', availableLanguage: 'Spanish' }],
  };
  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'NebuExperiencias',
    url: `${SITE_URL}/`,
    areaServed: { '@type': 'Country', name: 'Colombia' },
    telephone: `+${WA_NUMBER}`,
    serviceType: 'Diseño y desarrollo web, automatización con inteligencia artificial',
  };
  const serviceData = services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.copy,
    provider: { '@type': 'Organization', name: 'NebuExperiencias', url: `${SITE_URL}/` },
    areaServed: { '@type': 'Country', name: 'Colombia' },
  }));
  const faqData = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqItems.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) };
  return <>{[organization, professionalService, ...serviceData, faqData].map((data, index) => <script type="application/ld+json" key={index}>{JSON.stringify(data)}</script>)}</>;
}

function Courses({ reduced }) {
  return <section className="section section-courses motion-surface" id="cursos"><Flow reduced={reduced} /><div className="container courses-layout">
    <Reveal as={motion.div} className="courses-intro"><p className="eyebrow">Formación complementaria</p><h2>Conocimiento que se convierte en acción</h2><p className="lead">Cursos prácticos para aprender sobre tecnología y aplicarla a tu negocio.</p><div className="course-count"><strong>03</strong><span>programas prácticos<br />para aprender a tu ritmo</span></div></Reveal>
    <div className="courses-grid">{courses.map((course, index) => <Reveal as={motion.article} className="course course-row" key={course.title} delay={index * 0.08} move={false}>
      <div className={`course-art ${course.art}`} aria-hidden="true" /><div className="course-copy"><p className="course-kicker">{course.kicker}</p><h3>{course.title}</h3><p>{course.copy}</p><p className="meta"><span><Icon name="Signal" />{course.level}</span><span><Icon name="Clock3" />{course.duration}</span></p><Wa className="text-link" message={`Hola, quiero más información sobre el curso ${course.title}`}>Consultar curso<Icon name="ArrowUpRight" /></Wa></div>
    </Reveal>)}</div>
  </div></section>;
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', text: '¡Hola! Soy el asistente virtual de NebuExperiencias. ¿Cómo te llamas y en qué te puedo ayudar?' }]);
  const [customer, setCustomer] = useState({ name: '', contact: '', summary: '' });
  const [handoff, setHandoff] = useState(false);
  const conversationId = useRef(typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));
  const notified = useRef(false);
  const live = useRef({});
  live.current = { messages, customer };

  function sendTranscript(reason) {
    const { messages: log, customer: person } = live.current;
    if (notified.current || log.filter((item) => item.role === 'user').length < (reason === 'closed' ? 2 : 1)) return;
    notified.current = true;
    fetch('/api/transcript', {
      method: 'POST', keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason, conversationId: conversationId.current, customer: person, messages: log.slice(-30) }),
    }).catch(() => {});
  }
  const [fallbackMessage, setFallbackMessage] = useState('Hola, necesito asesoría para mi negocio');
  const [sending, setSending] = useState(false);
  const [offline, setOffline] = useState(true);
  const [status, setStatus] = useState('Comprobando conexión...');
  const input = useRef(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/health', { headers: { Accept: 'application/json' } })
      .then((response) => {
        if (!response.ok) throw new Error('Chat API unavailable.');
        return response.json();
      })
      .then(({ configured }) => {
        if (!mounted) return;
        setOffline(!configured);
        setStatus(configured ? 'Asesor IA configurado' : 'Conexión pendiente');
      })
      .catch(() => {
        if (!mounted) return;
        setOffline(true);
        setStatus('Chat no disponible');
      });
    return () => { mounted = false; };
  }, []);

  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  useEffect(() => {
    const onHide = () => { if (document.visibilityState === 'hidden') sendTranscript('closed'); };
    document.addEventListener('visibilitychange', onHide);
    return () => document.removeEventListener('visibilitychange', onHide);
  }, []);
  useEffect(() => { if (!open) sendTranscript('closed'); }, [open]);
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape' && open) setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  async function submit(event) {
    event.preventDefault();
    const text = message.trim();
    if (!text || sending) return;
    setMessages((current) => [...current, { role: 'user', text }]);
    setMessage(''); setFallbackMessage(text);
    if (offline) return;
    setSending(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25000);
    try {
      const conversation = [...messages.slice(-10), { role: 'user', text }];
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation, customer, conversationId: conversationId.current, notified: notified.current, turns: messages.filter((item) => item.role === 'user').length + 1, website: '' }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('El asesor no pudo responder.');
      const data = await response.json();
      if (typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('Respuesta vacía.');
      setMessages((current) => [...current, { role: 'assistant', text: data.reply.trim() }]);
      if (data.customer) setCustomer(data.customer);
      if (data.handoff) { setHandoff(true); notified.current = true; }
      setStatus('Asesor IA conectado');
    } catch {
      setFallbackMessage(text);
      live.current = { ...live.current, messages: [...live.current.messages, { role: 'user', text }] };
      sendTranscript('ai_error');
      setOffline(true);
      setStatus('Usa WhatsApp por ahora');
    }
    finally { window.clearTimeout(timeout); setSending(false); input.current?.focus(); }
  }
  return <aside className={`ai-chat ${offline ? 'is-offline' : ''}`} aria-label="Chat con el asesor de NebuExperiencias">
    <AnimatePresence>{open && <motion.section className="ai-chat-panel" id="ai-chat-panel" role="dialog" aria-labelledby="ai-chat-title" aria-modal="false" initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.985 }} transition={{ duration: 0.18, ease: EASE }}>
      <header className="ai-chat-header"><span className="ai-chat-avatar"><Icon name="Bot" /></span><div><h2 id="ai-chat-title">Asesor NebuExperiencias</h2><p><span className="ai-chat-live-dot" /><span id="ai-chat-status">{status}</span></p></div><button className="ai-chat-close" type="button" aria-label="Cerrar chat" onClick={() => setOpen(false)}><Icon name="X" /></button></header>
      <div className="ai-chat-messages" aria-live="polite" aria-relevant="additions">{messages.map((item, index) => <p className={`ai-chat-bubble ai-chat-bubble-${item.role}`} key={`${item.role}-${index}`}>{item.text}</p>)}{sending && <p className="ai-chat-bubble ai-chat-bubble-assistant">Un momento, estoy consultando...</p>}</div>
      {handoff && !offline && <p className="ai-chat-fallback">Un asesor del equipo te escribirá pronto. También puedes elegir una opción de contacto aquí abajo.</p>}
      {offline && <p className="ai-chat-fallback">{status === 'Conexión pendiente' ? 'El asesor IA se está configurando.' : status === 'Comprobando conexión...' ? 'Estamos verificando la conexión del asesor.' : 'No pudimos conectar con el asesor.'} Puedes continuar por WhatsApp o cotizar tu proyecto.</p>}
      <div className="ai-chat-actions" aria-label="Otras formas de contacto">
        <Wa className="ai-chat-action ai-chat-action-whatsapp" message={fallbackMessage} data-analytics-location="chat"><Icon name="MessageCircle" />Chatear por WhatsApp</Wa>
        <Wa className="ai-chat-action ai-chat-action-quote" message="Hola, quiero cotizar mi proyecto con NebuExperiencias" data-analytics-location="chat" data-analytics-action="quote"><Icon name="ArrowUpRight" />Cotizar proyecto</Wa>
      </div>
      <form className="ai-chat-form" id="ai-chat-form" onSubmit={submit}><label className="visually-hidden" htmlFor="ai-chat-input">Escribe tu consulta</label><input ref={input} id="ai-chat-input" name="message" maxLength="1000" placeholder="Escribe tu consulta..." autoComplete="off" required value={message} onChange={(event) => setMessage(event.target.value)} /><button type="submit" aria-label="Enviar mensaje" disabled={sending}><Icon name="Send" /></button></form>
    </motion.section>}</AnimatePresence>
    <button className="ai-chat-trigger" id="ai-chat-trigger" type="button" aria-label={open ? 'Cerrar chat con el asesor IA' : offline ? 'Abrir opciones de contacto' : 'Abrir chat con el asesor IA'} aria-expanded={open} aria-controls="ai-chat-panel" onClick={() => setOpen((value) => !value)}><Icon name={open ? 'X' : 'MessageCircle'} /><span className="ai-chat-trigger-label">{offline ? 'Opciones de contacto' : 'Chat IA en línea'}</span><span className="ai-chat-trigger-dot" aria-hidden="true" /></button>
  </aside>;
}

const legalDocs = {
  privacidad: { title: 'Política de privacidad', sections: [
    ['Responsable', 'NebuExperiencias es responsable del tratamiento de los datos personales que nos compartes por el sitio web, el chat con IA, WhatsApp o formularios, conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.'],
    ['Qué datos recopilamos', 'Nombre, teléfono, correo, información de tu negocio y el contenido de tus mensajes o formulario de contacto. No pedimos datos sensibles ni datos de pago por el chat.'],
    ['Para qué los usamos', 'Responder tus consultas, elaborar cotizaciones, ejecutar los servicios contratados y dar seguimiento a la solicitud que nos envíes.'],
    ['Tus derechos', 'Puedes conocer, actualizar, rectificar y suprimir tus datos, y revocar tu autorización, escribiéndonos por WhatsApp al +57 310 659 8981.'],
    ['Terceros', 'No vendemos tus datos. Pueden tratarlos proveedores necesarios para operar el servicio (alojamiento web, mensajería, proveedor de IA y correo electrónico, incluido Resend; Google Analytics solo si das tu consentimiento).'],
  ] },
  terminos: { title: 'Términos y condiciones', sections: [
    ['Alcance', 'Estos términos regulan el uso del sitio y la contratación de servicios de desarrollo web, automatización con IA, optimización y cursos de NebuExperiencias.'],
    ['Cotización y alcance', 'Cada proyecto se define en una cotización o propuesta aceptada por el cliente. Lo que no esté en ella se considera un cambio de alcance y puede tener costo adicional.'],
    ['Pagos', 'Los pagos se harán según el calendario de la propuesta (por lo general un anticipo y un saldo contra entrega). Los precios están en pesos colombianos (COP) salvo que se indique otra cosa.'],
    ['Obligaciones de la agencia', 'Ejecutar el trabajo con diligencia profesional, cumplir los plazos pactados salvo demoras atribuibles al cliente, mantener la confidencialidad de la información y entregar lo acordado.'],
    ['Obligaciones del cliente', 'Entregar a tiempo contenidos, accesos y aprobaciones; garantizar que tiene derechos sobre textos, imágenes y marcas que suministre; y pagar en las fechas acordadas.'],
    ['Propiedad intelectual', 'Una vez pagado el valor total, el cliente recibe los derechos de uso sobre los entregables finales. NebuExperiencias conserva sus herramientas, librerías y componentes reutilizables, y puede mostrar el proyecto como portafolio salvo pacto contrario.'],
    ['Limitación de responsabilidad', 'NebuExperiencias no responde por lucro cesante ni por fallas de servicios de terceros (alojamiento web, dominios, plataformas de mensajería o proveedores de IA). Nuestra responsabilidad máxima se limita al valor pagado por el servicio afectado.'],
    ['Ley aplicable', 'Estos términos se rigen por las leyes de la República de Colombia.'],
  ] },
  cookies: { title: 'Acuerdo de uso de cookies', sections: [
    ['Qué son', 'Pequeños archivos o almacenamiento local que el navegador guarda para recordar preferencias.'],
    ['Las que usamos', 'Guardamos la preferencia de tema y la decisión de consentimiento en el almacenamiento local del navegador. Google Analytics solo se carga después de aceptar; puede usar cookies de medición.'],
    ['Terceros', 'Si incrustamos videos o redes sociales, esos proveedores pueden instalar sus propias cookies bajo sus políticas.'],
    ['Cómo controlarlas', 'Puedes aceptar o rechazar la analítica y cambiar tu decisión desde “Preferencias de cookies” en el pie de página. También puedes borrar los datos desde la configuración del navegador.'],
    ['Aceptación', 'La analítica no se activa antes de que la aceptes. Rechazarla no limita las funciones del sitio.'],
  ] },
  tecnologicas: { title: 'Políticas tecnológicas y de uso del servicio', sections: [
    ['Asistente de IA', 'El chat usa inteligencia artificial y puede cometer errores. Sus respuestas son orientativas y no constituyen una oferta vinculante; precios y alcances se confirman por escrito con una persona del equipo.'],
    ['Datos en el chat', 'No compartas contraseñas, datos bancarios ni información sensible en el chat. Los mensajes pueden procesarse por nuestro proveedor de IA para generar la respuesta.'],
    ['Seguridad', 'Aplicamos buenas prácticas razonables (HTTPS, mínimos privilegios y respaldos). Ningún sistema es 100% invulnerable; el cliente debe proteger sus propias credenciales.'],
    ['Accesos y credenciales', 'Los accesos que el cliente nos entregue se usan únicamente para el proyecto y se devuelven o se revocan al finalizar.'],
    ['Soporte y mantenimiento', 'El soporte incluido es el indicado en el plan contratado. Pasado ese periodo, las mejoras y el mantenimiento se cotizan aparte.'],
    ['Uso aceptable', 'Está prohibido usar nuestros servicios o desarrollos para actividades ilegales, spam, suplantación o contenido que vulnere derechos de terceros.'],
    ['Disponibilidad', 'Los sitios dependen de proveedores externos de alojamiento web y dominio; no garantizamos disponibilidad continua ante fallas ajenas a nuestro control.'],
  ] },
  retraccion: { title: 'Derecho de retracto (5 días) y derechos de las partes', sections: [
    ['Derecho de retracto', 'Si contratas a distancia (por internet, WhatsApp o teléfono) puedes retractarte dentro de los 5 días hábiles siguientes a la contratación, conforme al artículo 47 de la Ley 1480 de 2011 (Estatuto del Consumidor), y se te devolverá lo pagado en un máximo de 30 días.'],
    ['Cuándo no aplica', 'No aplica a servicios cuya ejecución ya comenzó con tu consentimiento expreso, ni a trabajos personalizados o hechos a la medida, ni a contenidos digitales ya descargados o con acceso entregado.'],
    ['Cómo ejercerlo', 'Escríbenos por WhatsApp al +57 310 659 8981 indicando tu nombre y servicio contratado. Se descontarán únicamente los trabajos ya iniciados con tu autorización.'],
    ['Derechos del cliente', 'Recibir lo acordado, información clara y veraz, confidencialidad, correcciones razonables dentro de lo pactado, y la propiedad de los entregables una vez pagados.'],
    ['Derechos de la agencia', 'Cobrar por el trabajo realizado, recibir a tiempo contenidos y aprobaciones, pausar el proyecto por falta de pago o de información, y retener los entregables hasta recibir el pago total.'],
    ['Cancelaciones', 'Si el cliente cancela después del periodo de retracto, se pagan los trabajos ya realizados y los costos de terceros incurridos. El anticipo cubre el trabajo de planeación y diseño iniciado.'],
    ['Garantía', 'Corregimos sin costo los errores de funcionamiento atribuibles a nuestro desarrollo durante el periodo de soporte del plan.'],
  ] },
};

function LegalModal({ doc, onClose }) {
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  return <div className="legal-backdrop" onClick={onClose}>
    <section className="legal-modal" role="dialog" aria-modal="true" aria-labelledby="legal-title" onClick={(event) => event.stopPropagation()}>
      <header><h2 id="legal-title">{doc.title}</h2><button className="icon-btn" type="button" aria-label="Cerrar" onClick={onClose}><Icon name="X" /></button></header>
      <div className="legal-body">
        {doc.sections.map(([heading, text]) => <div key={heading}><h3>{heading}</h3><p>{text}</p></div>)}
        <p className="legal-note">Última actualización: 2026. Este documento es informativo y puede actualizarse; ante dudas escríbenos por WhatsApp.</p>
      </div>
    </section>
  </div>;
}

function Footer() {
  const [legal, setLegal] = useState(null);
  const policies = Object.entries(legalDocs).map(([id, doc]) => [id, doc.title]);
  const shortLabels = { privacidad: 'Política de privacidad', terminos: 'Términos y condiciones', cookies: 'Uso de cookies', tecnologicas: 'Políticas tecnológicas', retraccion: 'Retracto y derechos de las partes' };
  
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <img className="logo logo-for-light" src="assets/img/logo-negro.webp" alt="Nebu, agencia web" width="420" height="240" />
        <img className="logo logo-for-dark" src="assets/img/logo-blanco.webp" alt="" width="420" height="240" aria-hidden="true" />
        <p>Sitios web y asistentes de IA para negocios que quieren atender mejor.</p>
      </div>
      <nav aria-label="Enlaces de interés">
        <h3>Enlaces de interés</h3>
        <ul>
          {nav.slice(1).map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
        </ul>
      </nav>
      <div className="footer-contact">
        <h3>Contacto</h3>
        <ul>
          <li><Wa message="Hola, quiero más información">WhatsApp: +57 310 659 8981</Wa></li>
          {CONTACT.email && <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>}
          {CONTACT.city && <li>{CONTACT.city}, Colombia</li>}
          {CONTACT.hours && <li>Horario: {CONTACT.hours}</li>}
        </ul>
      </div>
    </div>
    
    <nav className="footer-policies" aria-label="Políticas y legal">
      <div className="container">
        <ul>
          {policies.map(([id]) => (
            <li key={id}>
              <button type="button" onClick={() => setLegal(legalDocs[id])}>{shortLabels[id]}</button>
            </li>
          ))}
          {/^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID) && <li><button type="button" onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}>Preferencias de cookies</button></li>}
        </ul>
      </div>
    </nav>
    
    <div className="container footer-bottom">
      <p>© {new Date().getFullYear()} NebuExperiencias. Todos los derechos reservados.</p>
    </div>
    {legal && <LegalModal doc={legal} onClose={() => setLegal(null)} />}
  </footer>;
}

export default function App() {
  const reduced = useReducedMotion();
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    let savedTheme;
    try { savedTheme = localStorage.getItem('theme'); } catch (error) { console.warn('No se pudo leer la preferencia de tema:', error); }
    const initialTheme = savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
  }, []);
  const toggleTheme = () => setTheme((current) => {
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (error) { console.warn('No se pudo guardar la preferencia de tema:', error); }
    return next;
  });
  return <><SEOData /><a className="skip-link" href="#main-content">Saltar al contenido</a><Header theme={theme} toggleTheme={toggleTheme} /><main id="main-content"><Hero reduced={reduced} /><About reduced={reduced} /><Services reduced={reduced} /><Results /><Process /><AssistantDemo /><Plans /><FAQ /><Courses reduced={reduced} /><LeadForm /><FinalCTA /></main><ChatWidget /><CookieConsent /><Footer /></>;
}
