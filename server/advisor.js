import companyProfile from './knowledge/company.json' with { type: 'json' };

export function createAdvisorInstructions() {
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

// Devuelve { status, body } para que lo usen tanto Express como las funciones de Vercel.
export async function answerChat(incoming, { apiKey, model = 'gpt-4.1-mini' }) {
    if (!apiKey) return { status: 503, body: { error: 'chat_not_configured' } };

    if (!Array.isArray(incoming) || incoming.length === 0 || incoming.length > 12) {
        return { status: 400, body: { error: 'invalid_messages' } };
    }

    const messages = incoming.map((item) => {
        if (!item || !['user', 'assistant'].includes(item.role) || typeof item.text !== 'string') return null;
        const text = item.text.trim().slice(0, 1000);
        return text ? { role: item.role, content: text } : null;
    });

    if (messages.some((item) => !item) || messages.at(-1).role !== 'user') {
        return { status: 400, body: { error: 'invalid_messages' } };
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
            return { status: 502, body: { error: 'chat_provider_error' } };
        }

        const data = await upstream.json();
        const reply = (data.output || [])
            .filter((item) => item.type === 'message')
            .flatMap((item) => item.content || [])
            .filter((item) => item.type === 'output_text')
            .map((item) => item.text)
            .join('\n')
            .trim();

        if (!reply) return { status: 502, body: { error: 'empty_provider_response' } };
        return { status: 200, body: { reply } };
    } catch (error) {
        console.error('Chat provider request failed:', error.name);
        return { status: error.name === 'AbortError' ? 504 : 502, body: { error: 'chat_unavailable' } };
    } finally {
        clearTimeout(timeout);
    }
}
