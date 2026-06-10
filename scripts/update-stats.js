const fs = require('fs');
const mod = require('../lib/processed-html');
let html = mod.bodyHtml;
const inlineStyles = mod.inlineStyles;

// Replace the entire highlight-stats-wrapper block with redesigned version
const statsStart = html.indexOf('<div class="highlight-stats-wrapper"');
const statsEnd = html.indexOf('</div></div></div></section><section data-w-id="812be99e', statsStart);
const oldStats = html.substring(statsStart, statsEnd);

const newStats = `<div class="highlight-stats-wrapper"><div class="w-layout-blockcontainer container w-container"><p class="ww-stats-eyebrow">Highlight Stats</p><div class="ww-stats-grid"><div class="ww-stat-item"><div class="ww-stat-value">20<span class="ww-stat-plus">+</span></div><div class="ww-stat-label">Years of Industry Leadership</div></div><div class="ww-stat-divider"></div><div class="ww-stat-item"><div class="ww-stat-value">50<span class="ww-stat-plus">+</span></div><div class="ww-stat-label">Projects Delivered Globally</div></div><div class="ww-stat-divider"></div><div class="ww-stat-item"><div class="ww-stat-value">4</div><div class="ww-stat-label">Core Service Disciplines</div></div><div class="ww-stat-divider"></div><div class="ww-stat-item"><div class="ww-stat-value ww-stat-value--text">AI</div><div class="ww-stat-label">Native Solutions & Automation</div></div><div class="ww-stat-divider"></div><div class="ww-stat-item"><div class="ww-stat-value ww-stat-value--text">S→E</div><div class="ww-stat-label">Startup to Enterprise Scale</div></div></div></div></div>`;

html = html.replace(oldStats, newStats);
console.log('Stats replaced:', html.includes('ww-stats-grid'));
console.log('20+ present:', html.includes('ww-stat-value'));

const output = 'module.exports = { bodyHtml: ' + JSON.stringify(html) + ', inlineStyles: ' + JSON.stringify(inlineStyles) + ' };';
fs.writeFileSync('./lib/processed-html.js', output);
console.log('Done.');
