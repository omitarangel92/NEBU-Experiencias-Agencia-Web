import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight, Bot, Check, ChevronLeft, ChevronRight, Clock, Clock3, Eye, Gauge, Globe,
  HeartHandshake, LayoutTemplate, Menu, MessageCircle,
  MessagesSquare, Moon, MoreHorizontal, Pause, Play, RefreshCw, Rocket, Search, Send,
  Share2, Signal, Smartphone, Sparkles, Sun, WandSparkles, X, Zap,
} from 'lucide-react';

import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

const WA_NUMBER = '573106598981';
const HOTMART = ['https://hotmart.com', 'https://hotmart.com', 'https://hotmart.com'];
const EASE = [0.23, 1, 0.32, 1];
const icons = { ArrowUpRight, Bot, Check, ChevronLeft, ChevronRight, Clock, Clock3, Eye, Gauge, Globe, HeartHandshake, LayoutTemplate, Menu, MessageCircle, MessagesSquare, Moon, MoreHorizontal, Pause, Play, RefreshCw, Rocket, Search, Send, Signal, Smartphone, Sparkles, Sun, WandSparkles, X, Zap };
const nav = [['home', 'Home'], ['quienes-somos', 'Quiénes somos'], ['servicios', 'Servicios'], ['planes', 'Planes'], ['cursos', 'Cursos']];
const slides = [
  { image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=2400&q=90', video: 'videos/hero-1.mp4', kicker: 'Automatización inteligente', title: 'Tecnología que atiende a tus clientes mientras tú descansas', copy: 'Diseñamos sitios web rápidos y asistentes de inteligencia artificial para WhatsApp y chat web que responden, orientan y venden las 24 horas.', action: 'Hablar por WhatsApp', message: 'Hola, quiero conocer los servicios de NebuExperiencias', points: [['Zap', 'Sitios que cargan en menos de 2 segundos'], ['Clock', 'Asistentes activos 24/7']] },
  { image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=90', video: 'videos/hero-2.mp4', kicker: 'Diseño y desarrollo', title: 'Sitios web modernos que convierten visitas en clientes', copy: 'Desarrollamos páginas veloces, atractivas y adaptadas a cualquier pantalla, para que tu negocio se vea profesional y venda más.', action: 'Cotizar mi sitio web', message: 'Hola, quiero cotizar un sitio web', points: [['Smartphone', 'Diseño adaptable a celular, tablet y computador'], ['Search', 'Optimizado para aparecer en Google']] },
  { image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=90', video: 'videos/hero-3.mp4', kicker: 'Optimización y crecimiento', title: 'Tu sitio actual puede cargar más rápido y vender más', copy: 'Revisamos y rediseñamos tu página para que sea más clara, más veloz y mucho más fácil de usar desde el celular.', action: 'Pedir una revisión', message: 'Hola, quiero una revisión de mi sitio web actual', points: [['Gauge', 'Auditoría de velocidad y usabilidad'], ['RefreshCw', 'Rediseño sin perder tu posicionamiento']] },
];
const services = [
  { icon: 'LayoutTemplate', art: 'service-art-web', title: 'Desarrollo web dinámico', copy: 'Sitios modernos, veloces y adaptados a celular, tablet y computador, listos para convertir visitas en clientes.', points: ['Diseño a la medida de tu marca', 'Optimizado para Google', 'Formularios, reservas y pagos'] },
  { icon: 'Bot', art: 'service-art-ai', title: 'Automatización con IA', copy: 'Asistentes inteligentes en WhatsApp y en el chat de tu web que responden preguntas y atienden clientes 24/7.', points: ['Respuestas con la información de tu negocio', 'Agendamiento y toma de pedidos', 'Traspaso a una persona cuando hace falta'] },
  { icon: 'WandSparkles', art: 'service-art-redesign', title: 'Optimización y rediseño', copy: 'Renovamos tu sitio actual para que sea más rápido, más claro y mucho más fácil de usar desde el celular.', points: ['Auditoría de velocidad y usabilidad', 'Nuevo diseño sin perder tu posicionamiento', 'Mejoras de contenido y llamados a la acción'] },
];
const plans = [
  { name: 'Esencial', for: 'Para presentar tu negocio en internet.', price: <><span>Desde</span> $1.200.000 <small>COP</small></>, points: ['Sitio de hasta 5 secciones', 'Diseño adaptable a todo dispositivo', 'Botón directo a WhatsApp', '1 mes de soporte'], action: 'Elegir Esencial', message: 'Hola, me interesa el plan Esencial' },
  { name: 'Crecimiento', for: 'Para atender y vender sin parar.', price: <><span>Desde</span> $2.800.000 <small>COP</small></>, points: ['Todo lo del plan Esencial', 'Asistente de IA en WhatsApp o chat web', 'Agendamiento o catálogo integrado', '3 meses de soporte y ajustes'], action: 'Elegir Crecimiento', message: 'Hola, me interesa el plan Crecimiento', featured: true },
  { name: 'A la medida', for: 'Para proyectos con necesidades propias.', price: <>Cotización <small>personalizada</small></>, points: ['Plataformas y tiendas en línea', 'Automatizaciones con tus sistemas', 'Rediseño de sitios existentes', 'Acompañamiento continuo'], action: 'Pedir cotización', message: 'Hola, quiero una cotización a la medida' },
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

function Wa({ message, className, children, ...props }) {
  return <a className={className} href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener" {...props}>{children}</a>;
}

function Flow({ reduced }) {
  if (reduced) return null;
  return <motion.div className="section-lightstream" aria-hidden="true" animate={{ x: ['-7%', '7%'], y: ['-2%', '2%'], rotate: -7 }} transition={{ duration: 24, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }} />;
}

function Reveal({ as: Component = motion.div, children, className, delay = 0, move = true }) {
  const reduced = useReducedMotion();
  const hiddenState = { opacity: 0, ...(move ? { y: 20 } : {}) };
  const visibleState = { opacity: 1, ...(move ? { y: 0 } : {}) };
  return <Component className={className} initial={reduced ? false : hiddenState} whileInView={reduced ? undefined : visibleState} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.58, delay, ease: EASE }}>{children}</Component>;
}

function useMobileLayout() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 560px)').matches);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 560px)');
    const update = (event) => setIsMobile(event.matches);
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
      <a className="brand" href="#home" aria-label="NebuExperiencias, ir al inicio"><img className={`logo ${theme === 'dark' ? 'logo-for-dark' : 'logo-for-light'}`} src={`assets/img/logo-${theme === 'dark' ? 'blanco' : 'negro'}.png`} alt="NebuExperiencias" width="700" height="301" /></a>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="nav-links">{nav.map(([id, label]) => <li key={id}><a href={`#${id}`} className={`nav-link ${active === id ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{label}</a></li>)}</ul>
      <div className="nav-actions">
        <button className="icon-btn" id="theme-toggle" type="button" aria-label={theme === 'dark' ? 'Cambiar a modo luz' : 'Cambiar a modo nocturno'} aria-pressed={theme === 'dark'} onClick={toggleTheme}><Icon name={theme === 'dark' ? 'Sun' : 'Moon'} /></button>
        <button className="icon-btn menu-btn" id="menu-btn" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setMenuOpen((value) => !value)}><Icon name={menuOpen ? 'X' : 'Menu'} /></button>
      </div>
    </nav></header>
  );
}

function Hero({ reduced }) {
  const [current, setCurrent] = useState(0);
  const [userPaused, setUserPaused] = useState(Boolean(reduced));
  const [hoverPaused, setHoverPaused] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
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
          <motion.img className="hero-bg" src={slide.image} alt="" aria-hidden="true" fetchPriority={current === 0 ? 'high' : 'auto'} initial={false} animate={reduced ? {} : { scale: [1.025, 1.075], x: ['0%', '-1%'], y: ['0%', '1%'] }} transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }} />
          <HeroVideo slide={slide} reduced={reduced} />
          <div className="hero-shade" aria-hidden="true" />
          <div className="container hero-layout">
            <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.58, ease: EASE }}>
              <p className="hero-kicker">{slide.kicker} <span>·</span> NebuExperiencias</p>{current === 0 ? <h1 className="hero-title">{slide.title}</h1> : <h2 className="hero-title">{slide.title}</h2>}
              <p className="lead">{slide.copy}</p><div className="hero-cta"><a className="btn btn-primary" href="#servicios"><Icon name="Sparkles" />Ver servicios</a><Wa className="btn" message={slide.message}><Icon name="MessageCircle" />{slide.action}</Wa></div>
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

function HeroVideo({ slide, reduced }) {
  const [failed, setFailed] = useState(false);
  if (failed || reduced) return null;
  return <video className="hero-video" src={`${import.meta.env.BASE_URL}${slide.video}`} poster={slide.image} autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1} onError={() => setFailed(true)} />;
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
  return <button className="video-play" type="button" aria-label="Reproducir video de presentación" onClick={() => source && setPlaying(true)}>
    <img className="video-preview" src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85" alt="" loading="lazy" /><span className="video-wash" aria-hidden="true" /><span className="play-circle"><Icon name="Play" /></span><span className="video-caption">Conoce NebuExperiencias en 60 segundos</span><small className="video-hint">Aquí irá tu video de presentación</small>
  </button>;
}

function About({ reduced }) {
  const values = [['HeartHandshake', 'Cercanía', 'Te acompañamos antes, durante y después del lanzamiento.'], ['Gauge', 'Rendimiento', 'Todo lo que hacemos es rápido, liviano y fácil de usar.'], ['Eye', 'Claridad', 'Hablamos sin tecnicismos y con precios transparentes.']];
  return <section className="section section-about motion-surface" id="quienes-somos"><Flow reduced={reduced} /><div className="container about-grid">
    <Reveal as={motion.div}><h2>Hacemos que la tecnología se sienta simple</h2><p className="lead">NebuExperiencias es una agencia que ayuda a negocios a atender mejor, vender más y ahorrar tiempo con sitios web modernos y automatización con IA.</p><div className="vision inset"><h3>Nuestra visión</h3><p>Que cualquier negocio, sin importar su tamaño, tenga una presencia digital profesional y un asistente que nunca deje un cliente sin respuesta.</p></div>
      <ul className="values">{values.map(([icon, title, copy]) => <li key={title}><span className="icon-well"><Icon name={icon} /></span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ul>
    </Reveal><Reveal as={motion.div} delay={0.12}><div className="video-slot raised" id="video-slot" data-video=""><VideoButton /></div></Reveal>
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
        <Wa className="text-link" message={`Hola, me interesa el servicio de ${service.title}`}>Cotizar este servicio<Icon name="ArrowUpRight" /></Wa>
      </motion.div>}
    </AnimatePresence>
  </Reveal>;
}

function Services({ reduced }) {
  return <section className="section section-services motion-surface" id="servicios"><Flow reduced={reduced} /><div className="container">
    <Reveal className="section-head"><h2>Servicios</h2><p className="lead">Tres formas de poner la tecnología a trabajar para tu negocio.</p></Reveal>
    <div className="services-grid">{services.map((service, index) => <ServiceCard service={service} index={index} key={service.title} />)}</div>
  </div></section>;
}

function Plans({ reduced }) {
  const isMobile = useMobileLayout();
  const [activeIndex, setActiveIndex] = useState(1);
  const touchStartX = useRef(null);
  const goTo = (index) => setActiveIndex((index + plans.length) % plans.length);

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 48) goTo(activeIndex + (deltaX < 0 ? 1 : -1));
    touchStartX.current = null;
  }

  return <section className="section section-plans motion-surface" id="planes"><Flow reduced={reduced} /><div className="container">
    <Reveal className="section-head"><h2>Planes</h2><p className="lead">Elige el punto de partida. Siempre puedes crecer después.</p></Reveal>
    <div className={`plans-grid ${isMobile ? 'plans-carousel' : ''}`} onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }} onTouchEnd={handleTouchEnd}>
      {plans.map((plan, index) => {
        const active = index === activeIndex;
        const distance = (index - activeIndex + plans.length) % plans.length;
        const position = distance === 0 ? 'is-active' : distance === 1 ? 'is-next' : 'is-prev';
        return <Reveal as={motion.article} className={`card plan ${plan.featured ? 'plan-featured' : ''} ${isMobile ? `plan-slide ${position}` : ''}`} key={plan.name} delay={index * 0.08} move={false} aria-hidden={isMobile && !active} inert={isMobile && !active}>
          {plan.featured && <span className="badge">Más elegido</span>}<h3>{plan.name}</h3><p className="plan-for">{plan.for}</p><p className="price">{plan.price}</p><ul className="checks">{plan.points.map((point) => <li key={point}><Icon name="Check" />{point}</li>)}</ul><Wa className={`btn ${plan.featured ? 'btn-primary' : ''}`} message={plan.message}>{plan.action}</Wa>
        </Reveal>;
      })}
    </div>
    {isMobile && <div className="plans-carousel-controls" aria-label="Controles de planes">
      <button className="icon-btn" type="button" aria-label="Ver plan anterior" onClick={() => goTo(activeIndex - 1)}><Icon name="ChevronLeft" /></button>
      <div className="plans-carousel-dots" role="group" aria-label="Elegir plan">{plans.map((plan, index) => <button key={plan.name} className={`plans-carousel-dot ${activeIndex === index ? 'is-active' : ''}`} type="button" aria-label={`Ver plan ${plan.name}`} aria-current={activeIndex === index ? 'true' : undefined} onClick={() => goTo(index)} />)}</div>
      <button className="icon-btn" type="button" aria-label="Ver siguiente plan" onClick={() => goTo(activeIndex + 1)}><Icon name="ChevronRight" /></button>
    </div>}
  </div></section>;
}

function Courses({ reduced }) {
  return <section className="section section-courses motion-surface" id="cursos"><Flow reduced={reduced} /><div className="container courses-layout">
    <Reveal as={motion.div} className="courses-intro"><p className="eyebrow">Aprende · aplica · crece</p><h2>Conocimiento que se convierte en acción</h2><p className="lead">Rutas prácticas para llevar la tecnología a tu negocio, a tu ritmo y con proyectos reales.</p><div className="course-count"><strong>03</strong><span>programas prácticos<br />para empezar hoy</span></div></Reveal>
    <div className="courses-grid">{courses.map((course, index) => <Reveal as={motion.article} className="course course-row" key={course.title} delay={index * 0.08} move={false}>
      <div className={`course-art ${course.art}`} aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span></div><div className="course-copy"><p className="course-kicker">{course.kicker}</p><h3>{course.title}</h3><p>{course.copy}</p><p className="meta"><span><Icon name="Signal" />{course.level}</span><span><Icon name="Clock3" />{course.duration}</span></p><a className="text-link" href={HOTMART[index]} target="_blank" rel="noopener">Explorar curso<Icon name="ArrowUpRight" /></a></div>
    </Reveal>)}</div>
  </div></section>;
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', text: '¡Hola! Soy el asesor de NebuExperiencias. ¿Qué te gustaría mejorar de tu negocio?' }]);
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
        body: JSON.stringify({ messages: conversation }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('El asesor no pudo responder.');
      const data = await response.json();
      if (typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('Respuesta vacía.');
      setMessages((current) => [...current, { role: 'assistant', text: data.reply.trim() }]);
      setStatus('Asesor IA conectado');
    } catch {
      setFallbackMessage(text);
      setOffline(true);
      setStatus('Usa WhatsApp por ahora');
    }
    finally { window.clearTimeout(timeout); setSending(false); input.current?.focus(); }
  }
  const whatsapp = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(fallbackMessage)}`;
  return <aside className={`ai-chat ${offline ? 'is-offline' : ''}`} aria-label="Chat con el asesor de NebuExperiencias">
    <AnimatePresence>{open && <motion.section className="ai-chat-panel" id="ai-chat-panel" role="dialog" aria-labelledby="ai-chat-title" aria-modal="false" initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.985 }} transition={{ duration: 0.18, ease: EASE }}>
      <header className="ai-chat-header"><span className="ai-chat-avatar"><Icon name="Bot" /></span><div><h2 id="ai-chat-title">Asesor NebuExperiencias</h2><p><span className="ai-chat-live-dot" /><span id="ai-chat-status">{status}</span></p></div><button className="ai-chat-close" type="button" aria-label="Cerrar chat" onClick={() => setOpen(false)}><Icon name="X" /></button></header>
      <div className="ai-chat-messages" aria-live="polite" aria-relevant="additions">{messages.map((item, index) => <p className={`ai-chat-bubble ai-chat-bubble-${item.role}`} key={`${item.role}-${index}`}>{item.text}</p>)}{sending && <p className="ai-chat-bubble ai-chat-bubble-assistant">Un momento, estoy consultando...</p>}</div>
      {offline && <p className="ai-chat-fallback">{status === 'Conexión pendiente' ? 'El asesor IA se está configurando.' : status === 'Comprobando conexión...' ? 'Estamos verificando la conexión del asesor.' : 'No pudimos conectar con el asesor.'} Mientras tanto, podemos atenderte por <a href={whatsapp} target="_blank" rel="noopener">WhatsApp</a>.</p>}
      <form className="ai-chat-form" id="ai-chat-form" onSubmit={submit}><label className="visually-hidden" htmlFor="ai-chat-input">Escribe tu consulta</label><input ref={input} id="ai-chat-input" name="message" maxLength="1000" placeholder="Escribe tu consulta..." autoComplete="off" required value={message} onChange={(event) => setMessage(event.target.value)} /><button type="submit" aria-label="Enviar mensaje" disabled={sending}><Icon name="Send" /></button></form>
    </motion.section>}</AnimatePresence>
    <button className="ai-chat-trigger" id="ai-chat-trigger" type="button" aria-expanded={open} aria-controls="ai-chat-panel" onClick={() => setOpen((value) => !value)}><Icon name={open ? 'X' : 'MessageCircle'} /><span className="ai-chat-trigger-label">Chat IA en línea</span><span className="ai-chat-trigger-dot" aria-hidden="true" /></button>
  </aside>;
}

const legalDocs = {
  privacidad: { title: 'Política de privacidad', sections: [
    ['Responsable', 'NebuExperiencias es responsable del tratamiento de los datos personales que nos compartes por el sitio web, el chat con IA, WhatsApp o formularios, conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.'],
    ['Qué datos recopilamos', 'Nombre, teléfono, correo, información de tu negocio y el contenido de tus mensajes. No pedimos datos sensibles ni datos de pago por el chat.'],
    ['Para qué los usamos', 'Responder tus consultas, elaborar cotizaciones, ejecutar los servicios contratados, enviarte información relacionada si lo autorizas y mejorar nuestro servicio.'],
    ['Tus derechos', 'Puedes conocer, actualizar, rectificar y suprimir tus datos, y revocar tu autorización, escribiéndonos por WhatsApp al +57 310 659 8981.'],
    ['Terceros', 'No vendemos tus datos. Pueden tratarlos proveedores necesarios para operar el servicio (hosting, mensajería y proveedor de IA), bajo deberes de confidencialidad.'],
  ] },
  terminos: { title: 'Términos y condiciones', sections: [
    ['Alcance', 'Estos términos regulan el uso del sitio y la contratación de servicios de desarrollo web, automatización con IA, optimización y cursos de NebuExperiencias.'],
    ['Cotización y alcance', 'Cada proyecto se define en una cotización o propuesta aceptada por el cliente. Lo que no esté en ella se considera un cambio de alcance y puede tener costo adicional.'],
    ['Pagos', 'Los pagos se harán según el calendario de la propuesta (por lo general un anticipo y un saldo contra entrega). Los precios están en pesos colombianos (COP) salvo que se indique otra cosa.'],
    ['Obligaciones de la agencia', 'Ejecutar el trabajo con diligencia profesional, cumplir los plazos pactados salvo demoras atribuibles al cliente, mantener la confidencialidad de la información y entregar lo acordado.'],
    ['Obligaciones del cliente', 'Entregar a tiempo contenidos, accesos y aprobaciones; garantizar que tiene derechos sobre textos, imágenes y marcas que suministre; y pagar en las fechas acordadas.'],
    ['Propiedad intelectual', 'Una vez pagado el valor total, el cliente recibe los derechos de uso sobre los entregables finales. NebuExperiencias conserva sus herramientas, librerías y componentes reutilizables, y puede mostrar el proyecto como portafolio salvo pacto contrario.'],
    ['Limitación de responsabilidad', 'NebuExperiencias no responde por lucro cesante ni por fallas de servicios de terceros (hosting, dominios, plataformas de mensajería o proveedores de IA). Nuestra responsabilidad máxima se limita al valor pagado por el servicio afectado.'],
    ['Ley aplicable', 'Estos términos se rigen por las leyes de la República de Colombia.'],
  ] },
  cookies: { title: 'Acuerdo de uso de cookies', sections: [
    ['Qué son', 'Pequeños archivos o almacenamiento local que el navegador guarda para recordar preferencias.'],
    ['Las que usamos', 'Preferencia de tema (claro u oscuro) y, si se habilita, métricas anónimas de uso. No usamos cookies publicitarias propias.'],
    ['Terceros', 'Si incrustamos videos o redes sociales, esos proveedores pueden instalar sus propias cookies bajo sus políticas.'],
    ['Cómo controlarlas', 'Puedes bloquearlas o borrarlas desde la configuración de tu navegador. Algunas funciones podrían dejar de recordar tus preferencias.'],
    ['Aceptación', 'Al seguir navegando el sitio aceptas el uso de las cookies descritas aquí.'],
  ] },
  tecnologicas: { title: 'Políticas tecnológicas y de uso del servicio', sections: [
    ['Asistente de IA', 'El chat usa inteligencia artificial y puede cometer errores. Sus respuestas son orientativas y no constituyen una oferta vinculante; precios y alcances se confirman por escrito con una persona del equipo.'],
    ['Datos en el chat', 'No compartas contraseñas, datos bancarios ni información sensible en el chat. Los mensajes pueden procesarse por nuestro proveedor de IA para generar la respuesta.'],
    ['Seguridad', 'Aplicamos buenas prácticas razonables (HTTPS, mínimos privilegios y respaldos). Ningún sistema es 100% invulnerable; el cliente debe proteger sus propias credenciales.'],
    ['Accesos y credenciales', 'Los accesos que el cliente nos entregue se usan únicamente para el proyecto y se devuelven o se revocan al finalizar.'],
    ['Soporte y mantenimiento', 'El soporte incluido es el indicado en el plan contratado. Pasado ese periodo, las mejoras y el mantenimiento se cotizan aparte.'],
    ['Uso aceptable', 'Está prohibido usar nuestros servicios o desarrollos para actividades ilegales, spam, suplantación o contenido que vulnere derechos de terceros.'],
    ['Disponibilidad', 'Los sitios dependen de proveedores externos de hosting y dominio; no garantizamos disponibilidad continua ante fallas ajenas a nuestro control.'],
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
  const socials = [
    { name: 'Facebook', Logo: FaFacebookF, href: 'https://www.facebook.com/' },
    { name: 'Instagram', Logo: FaInstagram, href: 'https://www.instagram.com/' },
    { name: 'YouTube', Logo: FaYoutube, href: 'https://www.youtube.com/' },
    { name: 'GitHub', Logo: FaGithub, href: 'https://github.com/omitarangel92' },
    { name: 'LinkedIn', Logo: FaLinkedinIn, href: 'https://www.linkedin.com/' },
  ];
  const policies = Object.entries(legalDocs).map(([id, doc]) => [id, doc.title]);
  const shortLabels = { privacidad: 'Política de privacidad', terminos: 'Términos y condiciones', cookies: 'Uso de cookies', tecnologicas: 'Políticas tecnológicas', retraccion: 'Retracto y derechos de las partes' };
  
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <img className="logo logo-for-light" src="assets/img/logo-negro.png" alt="NebuExperiencias" width="700" height="301" />
        <img className="logo logo-for-dark" src="assets/img/logo-blanco.png" alt="" width="700" height="301" aria-hidden="true" />
        <p>Sitios web y asistentes de IA para negocios que quieren atender mejor.</p>
      </div>
      <nav aria-label="Enlaces de interés">
        <h3>Enlaces de interés</h3>
        <ul>
          {nav.slice(1).map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
        </ul>
      </nav>
      <div>
        <h3>Síguenos</h3>
        <ul className="socials">
          {socials.map(({ name, Logo, href }) => (
            <li key={name}>
              <a className="icon-btn" href={href} aria-label={name} target="_blank" rel="noopener noreferrer">
                <Logo aria-hidden="true" />
              </a>
            </li>
          ))}
          <li>
            <Wa className="icon-btn" message="Hola, quiero más información" aria-label="WhatsApp">
              <Icon name="MessageCircle" />
            </Wa>
          </li>
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
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);
  const toggleTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark');
  return <><a className="skip-link" href="#home">Saltar al contenido</a><Header theme={theme} toggleTheme={toggleTheme} /><main><Hero reduced={reduced} /><About reduced={reduced} /><Services reduced={reduced} /><Plans reduced={reduced} /><Courses reduced={reduced} /></main><ChatWidget /><Footer /></>;
}
