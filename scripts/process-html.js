// Run this script locally to regenerate lib/processed-html.js
// node scripts/process-html.js

const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "..", "..", "whitewolf", "Novasite - Webflow HTML Website Template.html");
let raw = fs.readFileSync(htmlPath, "utf-8");

// Fix asset paths
raw = raw.replace(/\.\/Novasite - Webflow HTML Website Template_files\//g, "/assets/");
raw = raw.replace(/Novasite - Webflow HTML Website Template_files\//g, "/assets/");
raw = raw.replace(/\.js\.download/g, ".js");
raw = raw.replace(/novasite-oly\.webflow\.shared\.84fe4dca9\.css/g, "whitewolf.css");
raw = raw.replace(/webflow\.734d2955\.7950910bb4aecaef\.js/g, "whitewolf.js");
raw = raw.replace(/webflow\.schunk\.e0c428ff9737f919\.js/g, "whitewolf.schunk1.js");
raw = raw.replace(/webflow\.schunk\.be7637ad0e011449\.js/g, "whitewolf.schunk2.js");
raw = raw.replace(/\/assets\/webfont\.js/g, "/assets/whitewolf.fonts.js");
raw = raw.replace(/\/assets\/api\.js/g, "/assets/whitewolf.api.js");
raw = raw.replace(/href="\/assets\/css"/g, 'href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"');

// Nav links to pages
raw = raw.replace(/href="https:\/\/novasite-oly\.webflow\.io\/"/g, 'href="/"');
raw = raw.replace(/href="https:\/\/novasite-oly\.webflow\.io\/#home"/g, 'href="/"');
raw = raw.replace(/href="https:\/\/novasite-oly\.webflow\.io\/#about"/g, 'href="/about"');
raw = raw.replace(/href="https:\/\/novasite-oly\.webflow\.io\/#service"/g, 'href="/services"');
raw = raw.replace(/href="https:\/\/novasite-oly\.webflow\.io\/#project"/g, 'href="/case-studies"');
raw = raw.replace(/href="https:\/\/novasite-oly\.webflow\.io\/#contact"/g, 'href="/contact"');
raw = raw.replace(/href="#home"/g, 'href="/"');
raw = raw.replace(/href="#about"/g, 'href="/about"');
raw = raw.replace(/href="#service"/g, 'href="/services"');
raw = raw.replace(/href="#project"/g, 'href="/case-studies"');
raw = raw.replace(/href="#contact"/g, 'href="/contact"');

// Remove webfont loader
raw = raw.replace(/<script[^>]*whitewolf\.fonts\.js[^>]*><\/script>/gi, "");
raw = raw.replace(/<script[^>]*webfont[^>]*>[\s\S]*?<\/script>/gi, "");
raw = raw.replace(/WebFont\.load\([^)]*\);?/g, "");

// Hero text
raw = raw.replace(
  '<p class="hero-text">We  patner with brands to create digital design that drives conversion and commands attention.</p>',
  '<p class="hero-text" style="font-size:clamp(1rem,1.4vw,1.35rem);font-weight:700;line-height:1.3;letter-spacing:-0.01em;">We Build Brands, Products &amp; AI Solutions That Lead Markets.</p><p class="hero-text" style="font-size:clamp(0.8rem,1vw,1rem);opacity:0.65;margin-top:0.75rem;line-height:1.6;font-weight:400;">White Wolf helps global businesses transform ideas into scalable digital experiences through branding, UI/UX, development, and AI-powered innovation.</p>'
);
raw = raw.replace(
  '<p class="hero-text">Brand Identity</p><p class="hero-text">UI/UX Design</p><p class="hero-text">Development</p><p class="hero-text">Product Design</p>',
  '<p class="hero-text">Branding</p><p class="hero-text">UI/UX Design</p><p class="hero-text">Web &amp; Product Development</p><p class="hero-text">AI-Integrated Solutions</p>'
);

// Slider images
raw = raw.replace(/src="\/assets\/692581415d9dd72f224a2b6b_111014928a394176cdd98bc826b9853a_Rectangle 1 \(4\)\.svg"/g, 'src="/assets/banner-slide.png"');
raw = raw.replace(/src="\/assets\/6926a2d0272d47967f374562_e7de7db6fcfa8d2a5f04445b05e4f03c_Rectangle 1 \(1\) \(1\)\.svg"/g, 'src="/assets/banner-slide2.jpg"');
raw = raw.replace(/src="\/assets\/6926a2d0fca3a521f0f1362b_b0a121c8a0716fd706c9ecbe1cf42534_Rectangle 1 \(2\) \(1\)\.svg"/g, 'src="/assets/banner-slide3.jpg"');

// Remove registered trademark
raw = raw.replace(/ÃÂ®/g, "");
raw = raw.replace(/&#174;/g, "");
raw = raw.replace(/Â®/g, "");
raw = raw.replace(/®/g, "");

// Brand name replacements
raw = raw.replace(/novasite/gi, "White Wolf");
raw = raw.replace(/portofio/gi, "White Wolf");
raw = raw.replace(/Portolio/gi, "White Wolf");

// Remove Webflow branding
raw = raw.replace(/<div class="footer-info-right-wrap">[\s\S]*?<\/div>\s*<\/div>/i, "");
raw = raw.replace(/Designed by\s*<[^>]+>Flowoly[^<]*<\/a>[^<]*/gi, "");
raw = raw.replace(/Powered by\s*&nbsp;\s*<[^>]+>[^<]*Webflow[^<]*<\/a>/gi, "");
raw = raw.replace(/Made in Webflow/gi, "");
raw = raw.replace(/Flowoly/gi, "");
raw = raw.replace('content="Webflow" name="generator"', 'content="White Wolf" name="generator"');

// Hero heading SVG
raw = raw.replace(
  /<h1 class="hero-big-text">[^<]*<\/h1>/,
  '<img src="/assets/slide-bottom-text.svg" class="hero-big-text" alt="White Wolf" style="width:100%;height:auto;max-width:100%;display:block;" />'
);

// Logo swap
raw = raw.replace(/src="\/assets\/[^"]*White Wolf\.svg"/g, 'src="/assets/white-wolf-logo.svg"');

// Footer marquee
raw = raw.replace(/<h1 class="footer-bottom-text">White Wolf<\/h1>/g, '<img src="/assets/slide-bottom-text.svg" class="footer-bottom-text" style="height:70px;width:auto;display:inline-block;vertical-align:middle;" alt="White Wolf">');

// Copyright
raw = raw.replace(/2025 White Wolf\./gi, "2025 White Wolf Digital Agency.");

// Helper functions
function replaceSection(html, uniqueClass, newHtml) {
  const markerIdx = html.indexOf(uniqueClass);
  if (markerIdx === -1) return html;
  const sectionStart = html.lastIndexOf('<section', markerIdx);
  const sectionEnd = html.indexOf('</section>', sectionStart) + '</section>'.length;
  return html.substring(0, sectionStart) + newHtml + html.substring(sectionEnd);
}

function replaceDivContent(html, className, newContent) {
  const startTag = '<div class="' + className + '">';
  const startIdx = html.indexOf(startTag);
  if (startIdx === -1) return html;
  let depth = 1, i = startIdx + startTag.length;
  while (i < html.length && depth > 0) {
    if (html.substring(i, i + 4) === '<div') depth++;
    if (html.substring(i, i + 6) === '</div>') { depth--; if (depth === 0) break; }
    i++;
  }
  return html.substring(0, startIdx) + '<div class="' + className + '">' + newContent + '</div>' + html.substring(i + 6);
}

// About section
raw = raw.replace(
  /aria-label="We[^"]*UI\/UX designers[^"]*"/,
  'aria-label="Backed by 20+ years of industry leadership, White Wolf combines strategic thinking, world-class design, engineering excellence, and AI integration to create meaningful business impact."'
);
raw = replaceDivContent(raw, 'medium-content-text',
  '<p style="font-size:clamp(1.1rem,1.8vw,1.5rem);line-height:1.65;color:rgba(255,255,255,0.85);">Backed by 20+ years of industry leadership, White Wolf combines strategic thinking, world-class design, engineering excellence, and AI integration to create meaningful business impact.</p>'
);

// Services
raw = raw.replace(/aria-label="We create powerful brands[^"]*"/, 'aria-label="We deliver end-to-end digital transformation — from strategy and brand to product and AI."');
raw = replaceDivContent(raw, 'service-tag-description', '<p style="font-size:clamp(1.1rem,1.8vw,1.5rem);line-height:1.65;color:rgba(255,255,255,0.85);">We deliver end-to-end digital transformation — from strategy and brand to product and AI.</p>');
raw = raw.replace(/(<div[^>]*class="content-title"[^>]*>)Brand Identity(<\/div>)/g, '$1Branding$2');
raw = raw.replace('Our Brand Identity service helps you build a distinctive, memorable, and cohesive presence that resonates with your target audience.', 'We create memorable brands with strategic positioning, visual identity systems, and storytelling that connects globally.');
raw = raw.replace(/(<div[^>]*class="content-title"[^>]*>)ui\/ux design(<\/div>)/g, '$1UI/UX Design$2');
raw = raw.replace('Our UI/UX design service focuses on creating intuitive, visually engaging, and user-centered digital experiences that drive results.', 'We design intuitive digital experiences that improve engagement, usability, and business growth.');
raw = raw.replace('Our development services are designed to help businesses transform ideas into high-quality digital solutions.', 'We build scalable websites, platforms, applications, and digital ecosystems with modern technologies.');
raw = raw.replace(/(<div[^>]*class="content-title"[^>]*>)product design(<\/div>)/g, '$1AI Integrated Services$2');
raw = raw.replace('Our product design service helps transform your ideas into intuitive, market-ready solutions that balance aesthetics, functionality, and user experience.', 'We help businesses integrate AI into products, workflows, customer experiences, and operations.');
raw = raw.replace(/<div class="service-name">User Research<\/div>/g, '<div class="service-name">AI workflow automation</div>');
raw = raw.replace(/<div class="service-name">Product Strategy<\/div>/g, '<div class="service-name">AI chatbot integration</div>');
raw = raw.replace(/<div class="service-name">Journey Mapping<\/div>/g, '<div class="service-name">AI-powered UX</div>');
raw = raw.replace(/<div class="service-name">Concept Validation<\/div>/g, '<div class="service-name">Data-driven intelligence</div>');
raw = raw.replace('<div class="service-tag-wrapper"><div class="white-dot"></div><div class="service-tag">Service</div></div>', '<div class="service-tag-wrapper"><div class="white-dot"></div><div class="service-tag">Services Overview</div></div>');
raw = raw.replace('</div></div></div></div></div></section><section id="project"', '<div style="margin-top:3rem;padding-top:2rem;border-top:1px solid rgba(106,170,199,0.12);"><a href="/contact" class="nav-button w-inline-block" style="border-color:#6AAAC7;color:#6AAAC7;"><div class="nav-button-dot"></div><div class="nav-button-text-wrap"><div class="nav-button-text">Explore Services</div><div class="nav-button-text">Explore Services</div></div></a></div></div></div></div></div></section><section id="project"');

// Why White Wolf
const whySection = `<section class="section ww-why" id="why"><div class="w-layout-blockcontainer container w-container"><div class="sub-heading-content" style="margin-bottom:3rem;"><div class="overflow-hidden"><h2 class="sub-heading" style="font-size:clamp(2rem,5vw,4.5rem);">Why White Wolf</h2></div></div><div class="ww-why-grid"><div class="ww-why-card"><div class="ww-why-number">01</div><h4 class="ww-why-title">Strategic Thinking</h4><p class="ww-why-desc">We align business goals with user experience and technology.</p></div><div class="ww-why-card"><div class="ww-why-number">02</div><h4 class="ww-why-title">Design Excellence</h4><p class="ww-why-desc">Minimal, elegant, conversion-focused interfaces built for global audiences.</p></div><div class="ww-why-card"><div class="ww-why-number">03</div><h4 class="ww-why-title">Technology Expertise</h4><p class="ww-why-desc">Robust engineering for scalable digital products.</p></div><div class="ww-why-card"><div class="ww-why-number">04</div><h4 class="ww-why-title">AI Innovation</h4><p class="ww-why-desc">Practical AI integration that creates measurable value.</p></div><div class="ww-why-card ww-why-card--wide"><div class="ww-why-number">05</div><h4 class="ww-why-title">Senior-Led Execution</h4><p class="ww-why-desc">Experienced leadership involved throughout every engagement.</p></div></div></div></section>`;
raw = replaceSection(raw, 'class="section testimonial"', whySection);
raw = replaceSection(raw, 'class="section tablet-testimonial"', '');
raw = replaceSection(raw, 'class="section big-image"', '');

// Process section
const processSection = `<section class="section ww-process" id="process"><div class="w-layout-blockcontainer container w-container"><div class="sub-heading-content" style="margin-bottom:3rem;"><div class="overflow-hidden"><h2 class="sub-heading" style="font-size:clamp(2rem,5vw,4.5rem);">Process Snapshot</h2></div></div><div class="ww-process-steps"><div class="ww-step"><div class="ww-step-line"></div><span class="ww-step-num">01</span><h5 class="ww-step-label">Discover</h5></div><div class="ww-step"><div class="ww-step-line"></div><span class="ww-step-num">02</span><h5 class="ww-step-label">Strategize</h5></div><div class="ww-step"><div class="ww-step-line"></div><span class="ww-step-num">03</span><h5 class="ww-step-label">Design</h5></div><div class="ww-step"><div class="ww-step-line"></div><span class="ww-step-num">04</span><h5 class="ww-step-label">Build</h5></div><div class="ww-step"><div class="ww-step-line"></div><span class="ww-step-num">05</span><h5 class="ww-step-label">Launch</h5></div><div class="ww-step"><div class="ww-step-line"></div><span class="ww-step-num">06</span><h5 class="ww-step-label">Scale</h5></div></div><div style="margin-top:3rem;text-align:center;"><a href="/contact" class="nav-button w-inline-block ww-process-cta"><div class="nav-button-dot"></div><div class="nav-button-text-wrap"><div class="nav-button-text">Learn Our Process</div><div class="nav-button-text">Learn Our Process</div></div></a></div></div></section>`;
raw = replaceSection(raw, 'class="section award"', processSection);

// Contact section
const contactSection = `<section id="contact" class="section ww-contact"><div class="w-layout-blockcontainer container w-container"><div class="ww-contact-grid"><div class="ww-contact-left"><div class="overflow-hidden"><h2 class="sub-heading" style="font-size:clamp(2rem,5vw,4.5rem);">Let's Build<br/>Something<br/>Extraordinary</h2></div><p class="para-1" style="margin-top:1.5rem;max-width:360px;line-height:1.8;">Tell us about your project and we'll get back to you within 24 hours.</p><div class="ww-contact-info" style="margin-top:2.5rem;"><a href="mailto:selestin.s@gmail.com" class="ww-contact-link">selestin.s@gmail.com</a><a href="tel:+919880459502" class="ww-contact-link">+91 98804 59502</a><span class="ww-contact-link" style="cursor:default;">Bangalore, India</span></div></div><div class="ww-contact-right"><form id="ww-contact-form" class="ww-form" novalidate><div class="ww-form-row"><div class="ww-form-group"><label class="ww-form-label" for="ww-name">Name *</label><input class="ww-form-input" type="text" id="ww-name" name="name" placeholder="Selestin Anthony" required /></div><div class="ww-form-group"><label class="ww-form-label" for="ww-company">Company</label><input class="ww-form-input" type="text" id="ww-company" name="company" placeholder="White Wolf Agency" /></div></div><div class="ww-form-row"><div class="ww-form-group"><label class="ww-form-label" for="ww-email">Email *</label><input class="ww-form-input" type="email" id="ww-email" name="email" placeholder="hello@whitewolf.in" required /></div><div class="ww-form-group"><label class="ww-form-label" for="ww-country">Country</label><input class="ww-form-input" type="text" id="ww-country" name="country" placeholder="India" /></div></div><div class="ww-form-row"><div class="ww-form-group"><label class="ww-form-label" for="ww-project-type">Project Type</label><select class="ww-form-input ww-form-select" id="ww-project-type" name="projectType"><option value="" disabled selected>Select service</option><option value="Branding">Branding</option><option value="UI/UX Design">UI/UX Design</option><option value="Web Development">Web &amp; Product Development</option><option value="AI-Integrated Solutions">AI-Integrated Solutions</option><option value="Full Service">Full Service</option></select></div><div class="ww-form-group"><label class="ww-form-label" for="ww-budget">Budget Range</label><select class="ww-form-input ww-form-select" id="ww-budget" name="budgetRange"><option value="" disabled selected>Select budget</option><option value="Under $5K">Under $5K</option><option value="$5K - $15K">$5K - $15K</option><option value="$15K - $50K">$15K - $50K</option><option value="$50K+">$50K+</option></select></div></div><div class="ww-form-group" style="grid-column:1/-1;"><label class="ww-form-label" for="ww-details">Project Details *</label><textarea class="ww-form-input ww-form-textarea" id="ww-details" name="details" placeholder="Briefly describe your project, goals, and timeline..." required></textarea></div><div class="ww-form-footer"><button type="submit" class="ww-form-btn" id="ww-submit-btn"><span class="ww-btn-text">Send Enquiry</span><span class="ww-btn-loading" style="display:none;">Sending...</span></button><p class="ww-form-msg" id="ww-form-msg" style="display:none;"></p></div></form></div></div></div></section><script>(function(){var form=document.getElementById('ww-contact-form');if(!form)return;form.addEventListener('submit',function(e){e.preventDefault();var btn=document.getElementById('ww-submit-btn');var msg=document.getElementById('ww-form-msg');var btnText=btn.querySelector('.ww-btn-text');var btnLoading=btn.querySelector('.ww-btn-loading');btnText.style.display='none';btnLoading.style.display='inline';btn.disabled=true;msg.style.display='none';var data={name:form.querySelector('[name=name]').value,company:form.querySelector('[name=company]').value,email:form.querySelector('[name=email]').value,country:form.querySelector('[name=country]').value,projectType:form.querySelector('[name=projectType]').value,budgetRange:form.querySelector('[name=budgetRange]').value,details:form.querySelector('[name=details]').value};fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(function(r){return r.json();}).then(function(res){msg.style.display='block';if(res.message&&res.message.includes('success')){msg.className='ww-form-msg ww-form-msg--success';msg.textContent='Message sent! We will get back to you within 24 hours.';form.reset();}else{msg.className='ww-form-msg ww-form-msg--error';msg.textContent=res.message||'Something went wrong. Please try again.';}}).catch(function(){msg.style.display='block';msg.className='ww-form-msg ww-form-msg--error';msg.textContent='Network error. Please email us directly.';}).finally(function(){btnText.style.display='inline';btnLoading.style.display='none';btn.disabled=false;});});})();</script>`;
raw = replaceSection(raw, 'id="contact" class="section contact"', contactSection);

// Footer
raw = raw.replace(
  /<div class="overflow-hidden"><div class="footer-info-middle-wrap">[\s\S]*?<\/div><\/div><\/div>/,
  '<div class="overflow-hidden"><div class="footer-info-middle-wrap"><div class="footer-info-text" style="opacity:0.4;font-family:\'Karla\',sans-serif;font-size:0.85rem;">Bangalore, India</div></div></div>'
);
raw = raw.replace(/<a[^>]*utility-page-link[^>]*>[\s\S]*?<\/a>/g, "");
const servicesSubmenu = '<div class="overflow-hidden _3"><div class="footer-menu-block"><p style="font-family:\'Karla\',sans-serif;font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:1.2rem;margin-top:0;">Services</p><a href="/services/branding" class="footer-section-id-link w-inline-block"><h6 class="footer-menu-iteam hover">Branding</h6></a><a href="/services/ui-ux-design" class="footer-section-id-link w-inline-block"><h6 class="footer-menu-iteam hover">UI/UX Design</h6></a><a href="/services/development" class="footer-section-id-link w-inline-block"><h6 class="footer-menu-iteam hover">Development</h6></a><a href="/services/ai-integrated-services" class="footer-section-id-link w-inline-block"><h6 class="footer-menu-iteam hover">AI Integrated Services</h6></a></div></div>';
raw = raw.replace(
  /<div class="overflow-hidden _3">[\s\S]*?<\/div><\/div><\/div><div class="footer-bottom-wrap">/,
  servicesSubmenu + '<div class="footer-bottom-wrap">'
);

// Extract body
const bodyStart = raw.indexOf("<body");
const bodyTagEnd = raw.indexOf(">", bodyStart) + 1;
const bodyClose = raw.lastIndexOf("</body>");
let bodyHtml = raw.substring(bodyTagEnd, bodyClose);
bodyHtml = bodyHtml.replace(/<script\b[^>]*\bsrc=['"][^'"]+['"][^>]*><\/script>/gi, "");

// Extract inline styles
const headStart = raw.indexOf("<head>");
const headEnd = raw.indexOf("</head>");
const headSection = raw.substring(headStart, headEnd);
const styleMatches = [...headSection.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
const inlineStyles = styleMatches.map(m => m[1]).join("\n");

// Save output
const output = `// AUTO-GENERATED — do not edit manually
// Run: node scripts/process-html.js to regenerate after updating the source HTML

module.exports = {
  bodyHtml: ${JSON.stringify(bodyHtml)},
  inlineStyles: ${JSON.stringify(inlineStyles)},
};
`;

const outPath = path.join(__dirname, "..", "lib", "processed-html.js");
fs.writeFileSync(outPath, output, "utf-8");
console.log("Done. Saved to lib/processed-html.js — size:", Math.round(output.length / 1024) + "KB");
