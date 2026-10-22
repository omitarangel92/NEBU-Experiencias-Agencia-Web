import { answerChat } from '../server/advisor.js';

export const config = { maxDuration: 30 };

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST');
        return response.status(405).json({ error: 'method_not_allowed' });
    }
    const { status, body } = await answerChat(request.body?.messages, {
        apiKey: process.env.OPENAI_API_KEY?.trim(),
        model: process.env.OPENAI_MODEL?.trim() || undefined,
    });
    return response.status(status).json(body);
}
