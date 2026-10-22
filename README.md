# NebuExperiencias

React + Vite website with a Node API for the AI advisor.

## Run locally

1. Install dependencies with `npm install`.
2. Create a local environment file: `Copy-Item .env.example .env`.
3. Add your OpenAI API key to `.env` as `OPENAI_API_KEY=...`. Keep this key on the server; never add a `VITE_` prefix or commit `.env`.
4. Start Vite and the chat API together with `npm run dev`.

The chat uses OpenAI's Responses API. `OPENAI_MODEL` defaults to `gpt-4.1-mini`. If no API key is configured, the site shows its WhatsApp fallback instead of pretending the assistant is online.

## Advisor knowledge and tone

Edit `server/knowledge/company.json` to update NebuExperiencias' services, plan prices, included work, courses, and conversation policy. The API loads this file as trusted context for each answer. Keep it factual and update it whenever the website's offers change; restart the API after editing it. The tone rules ask one useful question at a time, recommend a fitting option without pressure, answer warmly but concisely, and say when information is not known.

## Production

Build with `npm run build`, then run `npm start`. Configure `OPENAI_API_KEY` and optionally `OPENAI_MODEL`, `HOST`, and `PORT` in the hosting provider's server environment. The production host must run Node.js; a static-only host cannot serve `/api/chat`.

`GET /api/health` reports whether the server has a provider key configured. `POST /api/chat` accepts recent `{ role, text }` messages and returns `{ reply }`. Requests are size-checked, limited to 12 per minute per IP, and sent to OpenAI with response storage disabled.

## Seguimiento por correo y traspaso a una persona

El chat devuelve datos estructurados (alcance, nombre, contacto, traspaso). Cuando el cliente pide hablar con una persona, o la IA no puede resolver, se envia un correo con la conversacion completa via Resend. Tambien se envia al cerrar el chat (2+ mensajes) o si la IA falla. Configura RESEND_API_KEY, NOTIFY_EMAIL y opcionalmente FROM_EMAIL. El equipo responde por WhatsApp o correo (no hay chat en vivo).

## Seguridad

Cabeceras (CSP, HSTS, X-Frame-Options, etc.) en vercel.json y server/headers.js; robots.txt, sitemap.xml y .well-known/security.txt en public/. La API valida origen, tipo de contenido, bots conocidos, honeypot, limites por IP (10/min, 60/h), filtra inyeccion de prompts y mensajes sin sentido sin gastar tokens, y limita la conversacion a 20 turnos.
