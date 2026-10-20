export const origin = 'https://miqueloliu.com';
// Cloudflare serves individual HTML files at extensionless URLs.
export const canonicalPath = file => file === 'index.html' ? '/' : `/${file.replace(/\.html$/, '')}`;
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');

export const pageMetadata = {
  'index.html': ['Miquel Oliu — Compositor', 'Web oficial de Miquel Oliu, compositor i pianista. Descobreix la seva biografia, el catàleg d’obres, les partitures i els enregistraments.'],
  'biografia.html': ['Biografia de Miquel Oliu — Compositor i pianista', 'Biografia de Miquel Oliu Nieto (Barcelona, 1973), compositor i pianista guardonat amb el Premi Reina Sofia de Composició Musical el 2015.'],
  'catalogue.html': ['Catàleg d’obres i partitures — Miquel Oliu', 'Catàleg d’obres de Miquel Oliu per a orquestra, cambra, veu i instruments solistes. Consulta les partitures, els enregistraments i les notes de programa.'],
  'recordings.html': ['Enregistraments i discografia — Miquel Oliu', 'Escolta la música de Miquel Oliu: enregistraments de les seves obres, intèrprets i àlbums com Llibre d’hores, amb el pianista Miquel Villalba.'],
  'premsa.html': ['Premsa i entrevistes — Miquel Oliu', 'Entrevistes, articles, pòdcasts i textos sobre Miquel Oliu i la seva música. Descobreix les veus que acompanyen la seva obra.'],
  'contact.html': ['Contacte — Miquel Oliu, compositor', 'Contacta amb el compositor Miquel Oliu per a informació sobre les seves obres, partitures, concerts i projectes musicals.'],
};

// Translate empty shell placeholders at build time. The browser still applies
// the visitor’s chosen language using the existing data-i18n attributes.
export function populateText(html, translations) {
  return html.split(/(<script\b[\s\S]*?<\/script>)/gi).map(part => {
    if (/^<script\b/i.test(part)) return part;
    return part.replace(/<([a-z][a-z0-9-]*)\b([^>]*\bdata-i18n(-html)?="([^"]+)"[^>]*)>\s*<\/\1>/gi,
      (match, tag, attrs, rich, key) => {
        if (!(key in translations)) return match;
        const value = translations[key].replace(/\{year\}/g, new Date().getFullYear());
        return `<${tag}${attrs}>${rich ? value : escape(value)}</${tag}>`;
      });
  }).join('');
}

export function addMetadata(html, file, { title, description, image, mainEntity, language = 'ca', noindex = false }) {
  const url = origin + canonicalPath(file);
  const person = { '@type': 'Person', '@id': `${origin}/#person`, name: 'Miquel Oliu', alternateName: 'Miquel Oliu Nieto', url: `${origin}/`, jobTitle: 'Compositor i pianista' };
  const graph = [
    person,
    { '@type': 'WebSite', '@id': `${origin}/#website`, name: 'Miquel Oliu', url: `${origin}/`, inLanguage: ['ca', 'es', 'en'], about: { '@id': person['@id'] } },
    { '@type': file === 'biografia.html' ? 'AboutPage' : file === 'contact.html' ? 'ContactPage' : 'WebPage', '@id': `${url}#webpage`, url, name: title, description, inLanguage: language, isPartOf: { '@id': `${origin}/#website` }, about: { '@id': person['@id'] }, ...(mainEntity ? { mainEntity } : {}) },
  ];
  const imageUrl = new URL(image || '/img/portada.jpg', origin).href;
  const meta = `  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  <link rel="canonical" href="${escape(url)}">
  ${noindex ? '<meta name="robots" content="noindex, follow">' : ''}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Miquel Oliu">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${escape(url)}">
  <meta property="og:image" content="${escape(imageUrl)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escape(title)}">
  <meta name="twitter:description" content="${escape(description)}">
  <meta name="twitter:image" content="${escape(imageUrl)}">
  <script type="application/ld+json">${json({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
  return html.replace(/<title>[\s\S]*?<\/title>\s*/i, '').replace(/<meta name="description"[^>]*>\s*/i, '').replace('</head>', `${meta}\n</head>`);
}

export function renderCatalogue(catalogue, noteIndex) {
  const loc = value => typeof value === 'string' ? value : value?.ca || '';
  const fmt = value => escape(loc(value)).replace(/\*(.+?)\*/g, '<strong>$1</strong>').replace(/(?<!\w)_(.+?)_(?!\w)/g, '<em>$1</em>').replace(/\n/g, '<br>');
  const renderWork = (work, part = false) => {
    const tag = part ? 'h4' : 'h3';
    const info = noteIndex[work.id];
    return `<article class="work${part ? ' work-part' : ''}" id="work-${escape(work.id)}">
      <${tag} class="work-title">${fmt(work.title)}${work.years ? ` <span class="work-years">(${escape(work.years)})</span>` : ''}</${tag}>
      ${['subtitle', 'instrumentation', 'duration'].map(key => work[key] ? `<p class="work-${key}">${fmt(work[key])}</p>` : '').join('')}
      ${work.movements?.length ? `<ul class="work-movements">${work.movements.map(m => `<li>${fmt(m)}</li>`).join('')}</ul>` : ''}
      ${(work.details || []).map(d => `<p class="work-detail">${d.url ? `<a href="${escape(d.url)}">${fmt(d)}</a>` : fmt(d)}</p>`).join('')}
      ${info ? `<p class="work-links"><a href="${escape(info.href)}">Nota de programa: ${fmt(work.title)}</a></p>` : ''}
      ${work.links?.score || work.score === 'contact' ? `<p class="work-detail work-score"><a href="${escape(work.links?.score || 'contact.html')}">Partitura: ${fmt(work.title)}</a></p>` : ''}
      ${work.parts?.length ? `<details class="work-parts" id="parts-${escape(work.id)}"><summary class="work-parts-summary">Quaderns i peces</summary>${work.parts.map(p => renderWork(p, true)).join('')}</details>` : ''}
    </article>`;
  };
  return catalogue.map(category => `<section class="works-category" id="${escape(category.id)}"><h2 class="works-category-title">${fmt(category.name)}</h2>${category.works.map(w => renderWork(w)).join('')}</section>`).join('\n');
}
