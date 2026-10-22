import express from 'express';
import rateLimit from 'express-rate-limit';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { answerChat } from './advisor.js';

const app = express();
const port = Number(process.env.PORT || process.env.API_PORT || 8787);
const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || undefined;
const host = process.env.HOST || '127.0.0.1';
const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shouldServeFrontend = process.argv.includes('--web');

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
    const { status, body } = await answerChat(request.body?.messages, { apiKey, model });
    response.status(status).json(body);
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
