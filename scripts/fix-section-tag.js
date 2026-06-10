const fs = require('fs');
const mod = require('../lib/processed-html');
let html = mod.bodyHtml;
const inlineStyles = mod.inlineStyles;

const broken = '</script></div>section><section data-w-id="812be99e';
const fixed  = '</script></div></section><section data-w-id="812be99e';

if (!html.includes(broken)) {
  console.error('Broken pattern not found — aborting.');
  process.exit(1);
}
html = html.replace(broken, fixed);

fs.writeFileSync('./lib/processed-html.js',
  'module.exports = { bodyHtml: ' + JSON.stringify(html) + ', inlineStyles: ' + JSON.stringify(inlineStyles) + ' };');

const opens = (html.match(/<section\b/g) || []).length;
const closes = (html.match(/<\/section>/g) || []).length;
console.log('Fixed. <section:', opens, '| </section>:', closes, '| balanced:', opens === closes);
