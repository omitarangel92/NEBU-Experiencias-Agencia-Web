import express from 'express';
import rateLimit from 'express-rate-limit';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT || process.env.API_PORT || 8787);
const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
const host = process.env.HOST || '127.0.0.1';
const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const companyProfile = JSON.parse(readFileSync(path.join(appRoot, 'api', 'knowledge', 'company.json'), 'utf8'));
const shouldServeFrontend = process.argv.includes('--web');

function createAdvisorInstructions() {
    const { conversationPolicy, ...businessFacts } = companyProfile;
    return [
        `# ROL E IDENTIDAD`,
        `Eres el Asistente Consultor de Ventas de ${companyProfile.brand}. Tu misión no es solo responder preguntas o recitar precios, sino entender la situación real del negocio de cada usuario, diagnosticar sus problemas digitales y proponer soluciones estratégicas.`,
        `Transparencia de identidad: Si te preguntan si eres una persona, aclara amablemente que eres una inteligencia artificial asistiendo a la agencia.`,

        `# TONO Y ESTILO`,
        `- Idioma y acento: ${companyProfile.locale}`,
        `- Tono: ${conversationPolicy.tone}`,
        `- Extensión y formato: ${conversationPolicy.length}`,

        `# METODOLOGÍA CONSULTIVA Y DE VENTAS`,
        `${conversationPolicy.sales}`,

        `# REGLAS Y LÍMITES`,
        `- Precios: ${conversationPolicy.pricing}`,
        `- Veracidad: ${conversationPolicy.truthfulness}`,
        `- Privacidad: ${conversationPolicy.privacy}`,

        `# INFORMACIÓN OFICIAL DE LA EMPRESA (Fuente de verdad; no la contradigas ni inventes datos externos):`,
        JSON.stringify(businessFacts),
    ].join('\n\n');
}

app.disable('x-powered-by');
app.use(express.json({ limit: '12kb' }));

const chatLimiter = rateLimit({
    windowMs: 60_000,
    limit: 12,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'rate_limit_exceeded' },
});

app.get('/api/health', (_request, response) => {
    response.set('Cache-Control', 'no-store');
    response.json({ configured: Boolean(apiKey) });
});

app.post('/api/chat', chatLimiter, async (request, response) => {
    if (!apiKey) return response.status(503).json({ error: 'chat_not_configured' });

    const incoming = request.body?.messages;
    if (!Array.isArray(incoming) || incoming.length === 0 || incoming.length > 12) {
        return response.status(400).json({ error: 'invalid_messages' });
    }

    const messages = incoming.map((item) => {
        if (!item || !['user', 'assistant'].includes(item.role) || typeof item.text !== 'string') return null;
        const text = item.text.trim().slice(0, 1000);
        return text ? { role: item.role, content: text } : null;
    });

    if (messages.some((item) => !item) || messages.at(-1).role !== 'user') {
        return response.status(400).json({ error: 'invalid_messages' });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 22_000);

    try {
        const upstream = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                instructions: createAdvisorInstructions(),
                input: messages,
                max_output_tokens: 350,
                store: false,
            }),
            signal: controller.signal,
        });

        if (!upstream.ok) {
            console.error('OpenAI Responses API returned status', upstream.status);
            return response.status(502).json({ error: 'chat_provider_error' });
        }

        const data = await upstream.json();
        const reply = (data.output || [])
            .filter((item) => item.type === 'message')
            .flatMap((item) => item.content || [])
            .filter((item) => item.type === 'output_text')
            .map((item) => item.text)
            .join('\n')
            .trim();

        if (!reply) return response.status(502).json({ error: 'empty_provider_response' });
        return response.json({ reply });
    } catch (error) {
        const status = error.name === 'AbortError' ? 504 : 502;
        console.error('Chat provider request failed:', error.name);
        return response.status(status).json({ error: 'chat_unavailable' });
    } finally {
        clearTimeout(timeout);
    }
});

if (shouldServeFrontend) {
    const distPath = path.join(appRoot, 'dist');
    if (!existsSync(distPath)) throw new Error('Run npm run build before npm start.');
    app.use(express.static(distPath));
    app.get('*path', (_request, response) => response.sendFile(path.join(distPath, 'index.html')));
}

app.listen(port, host, () => {
    console.log(`Chat API listening on http://127.0.0.1:${port}`);
});