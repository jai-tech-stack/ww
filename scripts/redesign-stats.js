const fs = require('fs');
const mod = require('../lib/processed-html');
let html = mod.bodyHtml;
const inlineStyles = mod.inlineStyles;

// Locate current stats block (wrapper ... closing </script></div>)
const start = html.indexOf('<div class="highlight-stats-wrapper"');
const endMarker = '</script></div>';
const end = html.indexOf(endMarker, start) + endMarker.length;
if (start < 0 || end < endMarker.length) {
  console.error('Stats block not found — aborting.');
  process.exit(1);
}
const oldBlock = html.substring(start, end);

const newBlock =
'<div class="highlight-stats-wrapper"><div class="w-layout-blockcontainer container w-container"><div class="ww-stats-grid">' +
'<div class="ww-stat-item"><div class="ww-stat-value">20<span class="ww-stat-plus">+</span></div><p class="ww-stat-label">Years Industry Experience</p></div>' +
'<div class="ww-stat-item"><div class="ww-stat-value">Global</div><p class="ww-stat-label">Delivery Capability</p></div>' +
'<div class="ww-stat-item"><div class="ww-stat-value">End&#8209;to&#8209;End</div><p class="ww-stat-label">Product Expertise</p></div>' +
'<div class="ww-stat-item"><div class="ww-stat-value">AI</div><p class="ww-stat-label">Integrated Solutions</p></div>' +
'</div></div>' +
'<script>(function(){var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.querySelectorAll(".ww-stat-item").forEach(function(el,i){setTimeout(function(){el.classList.add("ww-stat-visible");},i*110);});obs.unobserve(e.target);}});},{threshold:0.3});function init(){var g=document.querySelector(".ww-stats-grid");if(g)obs.observe(g);}if(document.readyState!=="loading")init();else document.addEventListener("DOMContentLoaded",init);})();</script></div>';

html = html.replace(oldBlock, newBlock);

fs.writeFileSync('./lib/processed-html.js',
  'module.exports = { bodyHtml: ' + JSON.stringify(html) + ', inlineStyles: ' + JSON.stringify(inlineStyles) + ' };');

console.log('Stats redesigned:', html.includes('Product Expertise'));
console.log('Old count-up removed:', !html.includes('data-target'));
