import express from 'express';
import securityHeaders from './headers.js';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleChat, handleLead, handleTranscript } from './advisor.js';
import { clientIp } from './security.js';

const app = express();
const port = Number(process.env.PORT || process.env.API_PORT || 8787);
const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || undefined;
const host = process.env.HOST || '127.0.0.1';
const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shouldServeFrontend = process.argv.includes('--web');

app.disable('x-powered-by');
app.use(securityHeaders);
app.use(express.json({ limit: '12kb' }));

const adapt = (handler, extra) => async (request, response) => {
    const result = await handler({ method: request.method, headers: request.headers, body: request.body, ip: clientIp(request.headers, request.ip) }, extra);
    response.set({ 'Cache-Control': 'no-store', ...(result.headers || {}) });
    response.status(result.status).json(result.body);
};

app.get('/api/health', (_request, response) => {
    response.set('Cache-Control', 'no-store');
    response.json({ configured: Boolean(apiKey) });
});
app.all('/api/chat', adapt(handleChat, { apiKey, model }));
app.all('/api/lead', adapt(handleLead));
app.all('/api/transcript', adapt(handleTranscript));

if (shouldServeFrontend) {
    const distPath = path.join(appRoot, 'dist');
    if (!existsSync(distPath)) throw new Error('Run npm run build before npm start.');
    app.use(express.static(distPath));
    app.get('*path', (_request, response) => response.sendFile(path.join(distPath, 'index.html')));
}

app.listen(port, host, () => {
    console.log(`Chat API listening on http://127.0.0.1:${port}`);
});
