import { handleChat } from '../server/advisor.js';
import { clientIp } from '../server/security.js';

export const config = { maxDuration: 30 };

export default async function handler(request, response) {
    const result = await handleChat(
        { method: request.method, headers: request.headers, body: request.body, ip: clientIp(request.headers, request.socket?.remoteAddress) },
        { apiKey: process.env.OPENAI_API_KEY?.trim(), model: process.env.OPENAI_MODEL?.trim() || undefined },
    );
    for (const [key, value] of Object.entries(result.headers || {})) response.setHeader(key, value);
    response.setHeader('Cache-Control', 'no-store');
    return response.status(result.status).json(result.body);
}
