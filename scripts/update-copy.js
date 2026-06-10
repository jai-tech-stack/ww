const fs = require('fs');
const mod = require('../lib/processed-html');
let html = mod.bodyHtml;
const inlineStyles = mod.inlineStyles;

// 1. REPLACE SLIDER with single static hero image
const sliderStart = html.indexOf('<section id="home" class="section-banner fixed">');
const sliderEnd = html.indexOf('<section id="a', sliderStart);
const oldSlider = html.substring(sliderStart, sliderEnd);

const newHero = `<section id="home" class="section-banner fixed"><div class="fixed-banner"><div class="hero-banner-static"><div class="hero-v1-slide-item-wrap"><img src="/assets/banner-slide.png" loading="eager" alt="White Wolf" class="slider-image-wrap" style="transform: scale3d(1,1,1); width:100%; height:100%; object-fit:cover; object-position:center;"></div></div><div class="banner-info"><div class="w-layout-blockcontainer container w-container"><div class="hero-content-wrapper"><div class="overflow-hidden"><div class="hero-text-wrapper"><div data-w-id="1c44a9bf-c8ac-9016-7f18-535edc4be044" style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;" class="hero-left-text"><p class="hero-text" style="font-size:clamp(1rem,2vw,1.6rem);font-weight:700;line-height:1.2;letter-spacing:-0.02em;">Where Strategy, Design &amp; AI Converge.</p><p class="hero-text" style="font-size:clamp(0.95rem,1.3vw,1.25rem);opacity:0.65;margin-top:0.75rem;line-height:1.6;font-weight:400;font-family:Karla,sans-serif;">Creating brands and digital products that accelerate business growth.</p></div><div data-w-id="45ffb2cd-27ce-9d0f-2bbe-69c49e6b189a" style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;" class="hero-right-text"><p class="hero-text" style="font-size:clamp(0.85rem,1.3vw,1.5rem);font-weight:700;color:#FFFFFF;line-height:1.2;font-family:Karla,sans-serif;margin-bottom:0.5rem;">Branding</p><p class="hero-text" style="font-size:clamp(0.85rem,1.3vw,1.5rem);font-weight:700;color:#FFFFFF;line-height:1.2;font-family:Karla,sans-serif;margin-bottom:0.5rem;">UI/UX Design</p><p class="hero-text" style="font-size:clamp(0.85rem,1.3vw,1.5rem);font-weight:700;color:#FFFFFF;line-height:1.2;font-family:Karla,sans-serif;margin-bottom:0.5rem;">Development</p><p class="hero-text" style="font-size:clamp(0.85rem,1.3vw,1.5rem);font-weight:700;color:#FFFFFF;line-height:1.2;font-family:Karla,sans-serif;">AI Solutions</p></div></div></div><div class="overflow-hidden"><div class="hero-bottom-content"><div data-w-id="50974998-b211-cb75-c973-2bd16b7d0506" style="transform: translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;" class="hero-big-text-wrapper"><img src="/assets/slide-bottom-text.svg" class="hero-big-text" alt="White Wolf" style="width:100%;height:auto;max-width:100%;display:block;" /></div></div></div></div></div></div></div></section>`;

html = html.replace(oldSlider, newHero);
console.log('Slider replaced:', !html.includes('w-slider-mask'));

// 2. REWRITE SERVICES intro tagline
html = html.replace(
  'We deliver end-to-end digital transformation — from strategy and brand to product and AI.',
  'Not just another agency. We become the creative and technical backbone your business needs — bold strategy, sharp design, and AI that actually works for you.'
);

// 3. REWRITE SERVICE descriptions

// Branding (desktop hover)
html = html.replace(
  '<p class="para-2">We create memorable brands with strategic positioning, visual identity systems, and storytelling that connects globally.</p>',
  '<p class="para-2">Your brand is the first story people hear about you — and the one they remember longest. We build identities with real character: sharp strategy, bold visuals, and a voice that sounds unmistakably like yours.</p>'
);

// UI/UX Design
html = html.replace(
  '<p class="para-2">We design intuitive digital experiences that improve engagement, usability, and business growth.</p>',
  '<p class="para-2">Great design isn\'t just about looking good — it\'s about making people feel something. We craft interfaces that guide users naturally, cut friction, and turn visitors into people who keep coming back.</p>'
);

// Development
html = html.replace(
  '<p class="para-2">We build scalable websites, platforms, applications, and digital ecosystems with modern technologies.</p>',
  '<p class="para-2">We don\'t just code — we engineer digital products that perform. From fast marketing sites to complex platforms, everything we build is crafted to scale with your ambitions.</p>'
);

// AI Services
html = html.replace(
  '<p class="para-2">We help businesses integrate AI into products, workflows, customer experiences, and operations.</p>',
  '<p class="para-2">AI isn\'t a trend you can afford to ignore — it\'s a competitive edge. We help you harness it practically: smarter workflows, intelligent experiences, and automation that genuinely frees up your team.</p>'
);

// Branding tablet/mobile duplicate
html = html.replace(
  '<p class="para-2">Our Brand Identity service helps you build a distinctive, memorable, and cohesive presence that resonates with your target audience.</p>',
  '<p class="para-2">Your brand is the first story people hear about you — and the one they remember longest. We build identities with real character: sharp strategy, bold visuals, and a voice that sounds unmistakably like yours.</p>'
);

// 4. REWRITE Work Process section

html = html.replace(
  '<h2 class="sub-heading">Work Process</h2>',
  '<h2 class="sub-heading">How We Work</h2>'
);

html = html.replace(
  '<p class="para-1">See how our proven process transforms your brand with custom design solutions that deliver measurable impact from day one.</p>',
  '<p class="para-1">No bloated timelines. No surprises. Just a clear, honest process that turns your idea into something people genuinely love using.</p>'
);

html = html.replace(
  '<div class="work-card-heading">Research &amp; Define</div><p class="para-2">We begin by understanding the problem, the users, and the business goals from start to finish.</p>',
  '<div class="work-card-heading">Listen &amp; Discover</div><p class="para-2">Before we sketch a single pixel, we get under the skin of your business — your goals, your users, and the gaps your competitors are not filling.</p>'
);

html = html.replace(
  '<div class="work-card-heading">Ideate &amp; Design</div><p class="para-2">We craft clear, user-friendly flows and high-fidelity interfaces.</p>',
  '<div class="work-card-heading">Design &amp; Craft</div><p class="para-2">Ideas become real here. We design with purpose — building flows and visuals that feel effortless to use and are impossible to ignore.</p>'
);

html = html.replace(
  '<div class="work-card-heading">Test &amp; Implement</div><p class="para-2">Refining the final solution, testing usability, and handing off assets for development.</p>',
  '<div class="work-card-heading">Build &amp; Launch</div><p class="para-2">We test, refine, and ship. Every detail is checked, every handoff is clean — and you get something that is genuinely ready for the world.</p>'
);

// Write back
const output = 'module.exports = { bodyHtml: ' + JSON.stringify(html) + ', inlineStyles: ' + JSON.stringify(inlineStyles) + ' };';
fs.writeFileSync('./lib/processed-html.js', output);

console.log('Done.');
console.log('No slider:', !html.includes('w-slider-mask'));
console.log('Static hero:', html.includes('hero-banner-static'));
console.log('How We Work:', html.includes('How We Work'));
console.log('Listen & Discover:', html.includes('Listen'));
console.log('Design & Craft:', html.includes('Design &amp; Craft'));
console.log('Build & Launch:', html.includes('Build &amp; Launch'));
