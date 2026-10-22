import { handleLead } from '../server/advisor.js';
import { clientIp } from '../server/security.js';

export const config = { maxDuration: 15 };

export default async function handler(request, response) {
    const result = await handleLead({
        method: request.method,
        headers: request.headers,
        body: request.body,
        ip: clientIp(request.headers, request.socket?.remoteAddress),
    });
    for (const [key, value] of Object.entries(result.headers || {})) response.setHeader(key, value);
    response.setHeader('Cache-Control', 'no-store');
    return response.status(result.status).json(result.body);
}
