# Publicación y dominio

## Dominio propio en Vercel

El sitio usa actualmente `https://nebu-experiencias.vercel.app` como URL de producción. Cuando se confirme el dominio propio:

1. Agrégalo en **Project Settings → Domains** en Vercel.
2. Sigue los registros DNS que Vercel muestre para ese dominio y espera la verificación.
3. Selecciona el dominio principal y configura la redirección del dominio alternativo desde el panel de Vercel.
4. En el entorno de producción configura `VITE_SITE_URL=https://tu-dominio-confirmado`.
5. Vuelve a desplegar y verifica el canonical, Open Graph, sitemap y `robots.txt`.
6. Comprueba HTTPS y registra el dominio en Google Search Console.
7. Envía el sitemap y revisa canonical, cobertura y errores de rastreo en Search Console.
8. Valida los datos estructurados con la Prueba de resultados enriquecidos de Google.

No se configura una redirección automática desde el dominio `.vercel.app` porque aún no se ha confirmado el dominio de destino. No reemplaces `tu-dominio-confirmado` hasta tenerlo.

## Video de presentación

La sección de video está desactivada hasta que exista un video real. Para habilitarla, configura `VITE_PRESENTATION_VIDEO` con una URL de video propia o de un proveedor y cambia `SHOW_INTRO_VIDEO` en `src/App.jsx`. Antes de publicarlo, agrega subtítulos y una imagen de portada optimizada.

## HTML prerenderizado

`npm run build` prerenderiza la página principal en `dist/index.html` para que el contenido esencial (incluido el H1, servicios, planes y preguntas frecuentes) esté disponible antes de ejecutar JavaScript. El cliente hidrata ese HTML. Revisa el HTML generado después de cambios en el arranque de la aplicación y conserva los estados iniciales compatibles con renderizado en servidor.

## Analítica con consentimiento

La analítica está desactivada hasta que se configure. Para habilitarla:

1. Crea una propiedad web de Google Analytics 4 y copia su Measurement ID (`G-...`).
2. En **Project Settings → Environment Variables** de Vercel, configura `VITE_GA_MEASUREMENT_ID` para los entornos que correspondan. Este ID es público; no pongas secretos en variables `VITE_`.
3. Despliega de nuevo. El sitio mostrará opciones para aceptar o rechazar la analítica, y no cargará GA4 hasta que se acepte.
4. Verifica en GA4 los eventos `click_whatsapp`, `click_cotizar`, `click_plan_*`, `open_faq` y `submit_lead`. El enlace “Preferencias de cookies” del pie permite cambiar o retirar la decisión.

Si el ID queda vacío, no se carga GA4 ni se muestra el aviso. La configuración de Content Security Policy en `vercel.json` y `server/headers.js` permite únicamente los endpoints de Google Analytics requeridos.

## Formulario y recepción de leads

El formulario publica a `/api/lead` y entrega las solicitudes al correo configurado; no guarda una base de datos ni envía una respuesta automática al visitante.

1. En Resend, verifica un dominio remitente y crea una API key con permisos de envío.
2. En Vercel, configura `RESEND_API_KEY`, `NOTIFY_EMAIL` y `FROM_EMAIL`. Usa como `FROM_EMAIL` una dirección del dominio verificado en Resend; `NOTIFY_EMAIL` es el buzón que recibirá los leads.
3. Despliega y envía una solicitud de prueba con un correo o WhatsApp válido. Revisa tanto la bandeja de destino como los registros de la función `/api/lead`.
4. Configura las mismas variables en `.env` para probar localmente. No subas `.env` ni expongas la clave de Resend en variables `VITE_`.

El endpoint verifica método, origen, formato, consentimiento, campos, honeypot y límites de frecuencia. Las solicitudes se notifican por correo usando la integración existente con Resend; errores de configuración o entrega se informan en el formulario.

## Datos de negocio pendientes

Completa correo, ciudad y horario en la configuración de contacto de `src/App.jsx` únicamente cuando esos datos estén confirmados. El precio y el alcance del plan Web + Asistente IA también deben definirse antes de anunciarse.

## Vista previa para redes

`public/og-image.svg` es una imagen vectorial de vista previa de 1200 × 630. Verifica su apariencia en los validadores de Open Graph de las plataformas donde se vaya a compartir. Si una plataforma no admite SVG, reemplázala por un PNG/JPEG optimizado de las mismas dimensiones.

`robots.txt` permite rastreo a crawlers de búsqueda/consulta como OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User y PerplexityBot. Mantiene bloqueados crawlers de entrenamiento y herramientas SEO automatizadas. Revisa la política de cada proveedor antes de cambiar esta lista: `robots.txt` expresa preferencias de rastreo, no es un control de acceso.
