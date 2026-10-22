// Utilidades de seguridad compartidas por Express (local) y las funciones de Vercel.

const MAX_TEXT = 500;
const MAX_MESSAGES = 12;
const MAX_USER_TURNS = 20;

const BAD_UA = /(sqlmap|nikto|masscan|nmap|acunetix|nessus|havij|zgrab|python-requests|curl\/|wget|libwww|go-http-client|scrapy|httpclient|okhttp|java\/|headlesschrome|phantomjs|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|bytespider)/i;

const INJECTION = [
    /ignor[ae]\s+(todas?\s+)?(las\s+)?(instrucciones|reglas|indicaciones)/i,
    /olvida\s+(todas?\s+)?(las\s+)?(instrucciones|reglas)/i,
    /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|rules)/i,
    /(system|developer)\s*(prompt|message)/i,
    /prompt\s+del\s+sistema/i,
    /(muestra|revela|repite|imprime|dime)\s+.{0,30}(instrucciones|prompt|reglas internas)/i,
    /\b(jailbreak|DAN mode|developer mode|modo desarrollador)\b/i,
    /(act[uú]a|compórtate|comportate|pretend|act)\s+(como|as)\s+(si\s+fueras\s+)?(un|una|an?)\s+(?!asesor)/i,
    /<\s*\/?\s*(script|iframe|system)/i,
];

export function cleanText(value, max = MAX_TEXT) {
    return String(value ?? '')
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2060\uFEFF]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, max);
}

export function isInjection(text) {
    return INJECTION.some((pattern) => pattern.test(text));
}

// Mensajes sin sentido (relleno, teclazos, repeticiones): se responden localmente sin gastar tokens.
export function isJunk(text) {
    const letters = (text.match(/\p{L}/gu) || []).length;
    const digits = (text.match(/\d/g) || []).length;
    if (letters === 0 && digits < 7) return true;
    if (/(.)\1{9,}/u.test(text)) return true;
    const words = text.toLowerCase().split(' ').filter(Boolean);
    if (words.length >= 6 && new Set(words).size <= Math.ceil(words.length / 4)) return true;
    if (text.length >= 15 && ((text.match(/[aeiouáéíóú]/gi) || []).length / Math.max(letters, 1)) < 0.2) return true;
    return false;
}

export function validateMessages(incoming) {
    if (!Array.isArray(incoming) || incoming.length === 0 || incoming.length > 40) return null;
    const messages = [];
    for (const item of incoming.slice(-MAX_MESSAGES)) {
        if (!item || !['user', 'assistant'].includes(item.role) || typeof item.text !== 'string') return null;
        const text = cleanText(item.text, item.role === 'user' ? MAX_TEXT : 800);
        if (!text) return null;
        messages.push({ role: item.role, text });
    }
    if (messages.at(-1).role !== 'user') return null;
    const userTurns = incoming.filter((item) => item?.role === 'user').length;
    return { messages, userTurns };
}

export const LIMITS = { MAX_USER_TURNS };

const buckets = new Map();

// Ventana deslizante en memoria (por instancia). El firewall de Vercel cubre el límite global.
export function rateLimited(key, limit, windowMs) {
    const now = Date.now();
    const recent = (buckets.get(key) || []).filter((time) => now - time < windowMs);
    recent.push(now);
    buckets.set(key, recent);
    if (buckets.size > 2000) {
        for (const [name, times] of buckets) if (now - times.at(-1) >= 3_600_000) buckets.delete(name);
    }
    return recent.length > limit;
}

export function clientIp(headers, fallback = 'unknown') {
    return String(headers['x-real-ip'] || headers['x-forwarded-for'] || fallback).split(',')[0].trim();
}

function sameSite(headers) {
    const source = headers.origin || headers.referer;
    if (!source) return false;
    try {
        const url = new URL(source);
        const local = /^(localhost|127\.0\.0\.1)$/;
        return url.host === headers.host || (local.test(url.hostname) && local.test(String(headers.host).split(':')[0]));
    } catch {
        return false;
    }
}

// Valida método, origen, tipo de contenido, bots conocidos y límites por IP. Devuelve null si todo está bien.
export function guard({ method, headers, body }, { name, perMinute, perHour }) {
    if (method !== 'POST') return { status: 405, body: { error: 'method_not_allowed' }, headers: { Allow: 'POST' } };
    if (!sameSite(headers)) return { status: 403, body: { error: 'forbidden_origin' } };
    if (!String(headers['content-type'] || '').includes('application/json')) return { status: 415, body: { error: 'unsupported_media_type' } };
    if (BAD_UA.test(headers['user-agent'] || '') || !headers['user-agent']) return { status: 403, body: { error: 'forbidden' } };
    if (!body || typeof body !== 'object' || Array.isArray(body) || JSON.stringify(body).length > 12_000) return { status: 400, body: { error: 'invalid_body' } };
    if (body.website) return { status: 200, body: { reply: 'Gracias.' } }; // honeypot: los bots rellenan este campo oculto
    const ip = clientIp(headers);
    if (rateLimited(`${name}:m:${ip}`, perMinute, 60_000) || rateLimited(`${name}:h:${ip}`, perHour, 3_600_000)) {
        return { status: 429, body: { error: 'rate_limit_exceeded' }, headers: { 'Retry-After': '60' } };
    }
    return null;
}

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
