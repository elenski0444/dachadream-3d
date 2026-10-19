// Запуск: node update-catalog.mjs
// Читает папку models/ и обновляет список "models" в catalog.json. Цвета и остальное не трогает.
// Если у модели в catalog.json есть свои поля (url, specs, note, name), они сохраняются.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const cat = JSON.parse(readFileSync('catalog.json', 'utf8'));
const files = readdirSync('models').filter(f => /\.glb$/i.test(f));
const old = new Map((cat.models || []).map(m => typeof m === 'string' ? ['models/' + m.split('/').pop(), m] : [m.file, m]));
cat.models = files.sort((a, b) => a.localeCompare(b, 'ru', { numeric: true })).map(f => old.get('models/' + f) || ('models/' + f));
writeFileSync('catalog.json', JSON.stringify(cat, null, 2) + '\n');
console.log('Моделей в каталоге:', cat.models.length);
