const fs = require('fs');
const mod = require('../lib/processed-html');
let html = mod.bodyHtml;
const inlineStyles = mod.inlineStyles;

const oldStats = html.substring(
  html.indexOf('<div class="highlight-stats-wrapper"'),
  html.indexOf('</div></div></div></section><section data-w-id="812be99e', html.indexOf('<div class="highlight-stats-wrapper"')) + 20
);

const newStats = `<div class="highlight-stats-wrapper"><div class="w-layout-blockcontainer container w-container"><p class="ww-stats-eyebrow">Highlight Stats</p><div class="ww-stats-grid"><div class="ww-stat-item"><div class="ww-stat-value"><span class="ww-stat-count" data-target="20">0</span><span class="ww-stat-plus">+</span></div><p class="ww-stat-label">Years of Industry Experience</p></div><div class="ww-stat-divider"></div><div class="ww-stat-item"><div class="ww-stat-value"><span class="ww-stat-count" data-target="50">0</span><span class="ww-stat-plus">+</span></div><p class="ww-stat-label">Projects Delivered Globally</p></div><div class="ww-stat-divider"></div><div class="ww-stat-item"><div class="ww-stat-value"><span class="ww-stat-count" data-target="4">0</span></div><p class="ww-stat-label">Core Service Disciplines</p></div><div class="ww-stat-divider"></div><div class="ww-stat-item"><div class="ww-stat-value ww-stat-value--word">AI</div><p class="ww-stat-label">Integrated Solutions</p></div><div class="ww-stat-divider"></div><div class="ww-stat-item"><div class="ww-stat-value ww-stat-value--word">Global</div><p class="ww-stat-label">Delivery Capability</p></div></div></div><script>(function(){function countUp(el,target){var start=0,duration=1800,startTime=null;function step(ts){if(!startTime)startTime=ts;var p=Math.min((ts-startTime)/duration,1),ease=1-Math.pow(1-p,3);el.textContent=Math.round(ease*target);if(p<1)requestAnimationFrame(step);else el.textContent=target;}requestAnimationFrame(step);}var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.querySelectorAll('[data-target]').forEach(function(el){countUp(el,parseInt(el.getAttribute('data-target')));});e.target.querySelectorAll('.ww-stat-item').forEach(function(el,i){setTimeout(function(){el.classList.add('ww-stat-visible');},i*120);});obs.unobserve(e.target);}});},{threshold:0.25});document.addEventListener('DOMContentLoaded',function(){var g=document.querySelector('.ww-stats-grid');if(g)obs.observe(g);});})();</script></div>`;

html = html.replace(oldStats, newStats);
console.log('Stats replaced:', html.includes('ww-stat-count'));

fs.writeFileSync('./lib/processed-html.js', 'module.exports = { bodyHtml: ' + JSON.stringify(html) + ', inlineStyles: ' + JSON.stringify(inlineStyles) + ' };');
console.log('Done.');
