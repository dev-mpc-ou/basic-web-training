const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname,'..', 'exam', 'data');
const files = fs.readdirSync(dataDir).filter(f => {
    return f.endsWith('.json') && !f.startsWith('_') && f !== 'data.json';
});

const result = files.map(f => {
    const raw = fs.readFileSync(path.join(dataDir, f), 'utf-8');
    const d = JSON.parse(raw);
    return {
        id: f.replace('.json', ''),
        title: d.title || '',
        description: d.description || '',
        duration: d.duration || 0,
        questionCount: (d.questions || []).length
    };
});

fs.writeFileSync(
    path.join(dataDir, 'data.json'),
    JSON.stringify(result, null, 2),
    'utf-8'
);

console.log('Generated data.json with', result.length, 'exams:');
console.log(JSON.stringify(result, null, 2));
