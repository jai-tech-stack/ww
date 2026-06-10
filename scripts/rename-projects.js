const fs = require('fs');
const mod = require('../lib/processed-html');
let html = mod.bodyHtml;
const inlineStyles = mod.inlineStyles;

const before = '<h2 class="sub-heading">Our projects</h2>';
const after = '<h2 class="sub-heading">Our Work</h2>';

if (!html.includes(before)) {
  console.error('Heading not found — aborting.');
  process.exit(1);
}
html = html.replace(before, after);

fs.writeFileSync('./lib/processed-html.js',
  'module.exports = { bodyHtml: ' + JSON.stringify(html) + ', inlineStyles: ' + JSON.stringify(inlineStyles) + ' };');

console.log('Heading renamed to "Our Work":', html.includes(after));
console.log('Stat label still intact:', html.includes('Projects Delivered Globally'));
