const fs = require('fs');
const mod = require('../lib/processed-html');
let html = mod.bodyHtml;
const inlineStyles = mod.inlineStyles;

// 1. Services intro
const before1 = 'We deliver end-to-end digital transformation — from strategy and brand to product and AI.';
const after1 = 'From the first idea to the final launch, we handle it all — brand strategy, design, engineering, and AI woven into one seamless journey that moves your business forward.';
html = html.replace(before1, after1);

// 2. Our projects intro
const before2 = 'A thoughtfully curated portfolio demonstrating our commitment to simplicity and purposeful design.';
const after2 = 'A handpicked selection of work we are genuinely proud of — where sharp thinking, clean design, and real craft come together to solve actual problems.';
html = html.replace(before2, after2);

fs.writeFileSync('./lib/processed-html.js',
  'module.exports = { bodyHtml: ' + JSON.stringify(html) + ', inlineStyles: ' + JSON.stringify(inlineStyles) + ' };');

console.log('Services updated:', html.includes(after1));
console.log('Projects updated:', html.includes(after2));
