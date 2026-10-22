import { escapeHtml } from './security.js';

export function emailConfigured() {
    return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.NOTIFY_EMAIL?.trim());
}

// Envía el seguimiento de la conversación al correo del dueño mediante Resend.
export async function sendTranscript({ reason, conversationId, customer, messages, ip }) {
    if (!emailConfigured()) {
        console.error('Notificación omitida: faltan RESEND_API_KEY o NOTIFY_EMAIL');
        return false;
    }
    const titles = {
        handoff: 'Quiere hablar con una persona',
        lead: 'Nuevo contacto interesado',
        ai_error: 'El asistente IA no pudo responder',
        closed: 'Conversación del chat',
    };
    const name = customer?.name || 'Sin nombre';
    const phone = String(customer?.contact || '').replace(/[^\d]/g, '');
    const waLink = phone.length >= 10 ? `https://wa.me/${phone.length === 10 ? `57${phone}` : phone}` : '';
    const rows = messages
        .map((item) => `<p style="margin:6px 0"><strong>${item.role === 'user' ? escapeHtml(name) : 'Asistente IA'}:</strong> ${escapeHtml(item.text)}</p>`)
        .join('');
    const html = `<div style="font-family:Arial,sans-serif;max-width:640px">
<h2>${escapeHtml(titles[reason] || titles.closed)}</h2>
<p><strong>Nombre:</strong> ${escapeHtml(name)}<br>
<strong>Contacto:</strong> ${escapeHtml(customer?.contact || 'No indicado')}<br>
<strong>Resumen:</strong> ${escapeHtml(customer?.summary || 'Sin resumen')}<br>
<strong>ID:</strong> ${escapeHtml(conversationId)} · IP ${escapeHtml(ip)}</p>
${waLink ? `<p><a href="${escapeHtml(waLink)}">Responder por WhatsApp</a></p>` : ''}
<hr>${rows}</div>`;

    const upstream = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            from: process.env.FROM_EMAIL?.trim() || 'Chat NebuExperiencias <onboarding@resend.dev>',
            to: [process.env.NOTIFY_EMAIL.trim()],
            subject: `[Chat Nebu] ${titles[reason] || titles.closed} · ${name}`,
            html,
        }),
        signal: AbortSignal.timeout(10_000),
    }).catch((error) => {
        console.error('Resend request failed:', error.name);
        return null;
    });
    if (!upstream?.ok) console.error('Resend returned status', upstream?.status);
    return Boolean(upstream?.ok);
}
