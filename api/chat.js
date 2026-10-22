import { answerChat } from '../server/advisor.js';

export const config = { maxDuration: 30 };

const WINDOW_MS = 60_000;
const LIMIT = 12;
const hits = new Map();

// Límite por instancia: frena abuso básico; el límite global lo aplica el firewall de Vercel.
function isRateLimited(ip) {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((time) => now - time < WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 500) {
        for (const [key, times] of hits) if (now - times.at(-1) >= WINDOW_MS) hits.delete(key);
    }
    return recent.length > LIMIT;
}

function isSameSite(request) {
    const origin = request.headers.origin;
    if (!origin) return true;
    try {
        return new URL(origin).host === request.headers.host;
    } catch {
        return false;
    }
}

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST');
        return response.status(405).json({ error: 'method_not_allowed' });
    }
    if (!isSameSite(request)) return response.status(403).json({ error: 'forbidden_origin' });

    const ip = String(request.headers['x-forwarded-for'] || request.socket?.remoteAddress || 'unknown').split(',')[0].trim();
    if (isRateLimited(ip)) {
        response.setHeader('Retry-After', '60');
        return response.status(429).json({ error: 'rate_limit_exceeded' });
    }

    const { status, body } = await answerChat(request.body?.messages, {
        apiKey: process.env.OPENAI_API_KEY?.trim(),
        model: process.env.OPENAI_MODEL?.trim() || undefined,
    });
    return response.status(status).json(body);
}
