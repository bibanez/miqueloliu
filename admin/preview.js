/* Live previews use the current entry, including changes that have not been saved. */
(() => {
  const { CMS, h, createClass } = window;
  const languages = { ca: 'Català', es: 'Castellà', en: 'Anglès', fr: 'Francès', de: 'Alemany', eu: 'Euskera' };
  const loc = (value, language) => typeof value === 'string' ? value : value?.[language] || value?.ca || '';
  const list = value => Array.isArray(value) ? value : [];
  const safeUrl = value => {
    const url = String(value || '').trim();
    if (/[\u0000-\u001f\u007f\\]/.test(url)) return '';
    return /^(?:https?:|blob:|mailto:)/i.test(url) || (url && !/^(?:[a-z\d+.-]*:|[\\/]{2})/i.test(url)) ? url : '';
  };
  const asset = (props, value) => {
    if (!value || !safeUrl(value)) return '';
    const resolved = String(props.getAsset(value) || value);
    const url = safeUrl(resolved);
    return url && !/^(?:[a-z]+:|\/)/i.test(url) ? `/${url}` : url;
  };
  const link = (url, label) => h('a', { href: safeUrl(url), target: '_blank', rel: 'noopener noreferrer' }, label);
  const picture = (props, value, alt) => value && h('img', { className: 'cms-preview-image', src: asset(props, value), alt });
  const attachments = (props, items) => list(items).length > 0 && h('aside', { className: 'cms-preview-attachments' },
    h('h3', {}, 'Fitxers adjunts'),
    h('ul', {}, list(items).map((item, index) => h('li', { key: index }, link(asset(props, item.file), item.file || 'Fitxer')))));
  // Match the catalogue's lightweight *bold* / _italic_ notation, without inserting HTML.
  const formatted = value => String(value || '').split(/(\*[^*\n]+\*|(?<!\w)_[^_\n]+_(?!\w)|\n)/g).map((part, index) => {
    if (part === '\n') return h('br', { key: index });
    if (part.startsWith('*') && part.endsWith('*')) return h('strong', { key: index }, part.slice(1, -1));
    if (part.startsWith('_') && part.endsWith('_')) return h('em', { key: index }, part.slice(1, -1));
    return part;
  });
  const markdown = window.markdownit({ html: false, linkify: false, breaks: false });
  const renderImage = markdown.renderer.rules.image;
  markdown.renderer.rules.image = (tokens, index, options, env, renderer) => {
    tokens[index].attrSet('src', asset(env.props, tokens[index].attrGet('src')));
    return renderImage(tokens, index, options, env, renderer);
  };
  const renderLink = markdown.renderer.rules.link_open;
  markdown.renderer.rules.link_open = (tokens, index, options, env, renderer) => {
    tokens[index].attrSet('target', '_blank');
    tokens[index].attrSet('rel', 'noopener noreferrer');
    return renderLink ? renderLink(tokens, index, options, env, renderer) : renderer.renderToken(tokens, index, options);
  };
  const rich = (props, value) => h('div', { className: 'cms-preview-rich', dangerouslySetInnerHTML: { __html: markdown.render(value || '', { props }) } });

  const recordings = (props, items) => list(items).map((recording, index) => h('figure', { key: index, className: 'cms-preview-recording' },
    h('figcaption', {}, h('strong', {}, recording.title || 'Enregistrament'),
      h('p', {}, [recording.performer, recording.composer, recording.duration].filter(Boolean).join(' · '))),
    recording.src && h('audio', { controls: true, preload: 'none', src: asset(props, recording.src) })));

  const workCard = (props, work, language) => h('section', { className: 'work' },
    h('h2', { className: 'work-title' }, formatted(loc(work.title, language) || 'Obra sense títol'),
      work.years && h('span', { className: 'work-years' }, ` (${work.years})`)),
    ['subtitle', 'instrumentation', 'duration'].map(field => loc(work[field], language) && h('p', { key: field, className: `work-${field}` }, formatted(loc(work[field], language)))),
    list(work.movements).length > 0 && h('ul', { className: 'work-movements' }, list(work.movements).map((movement, index) => h('li', { key: index }, formatted(loc(movement, language))))),
    list(work.details).map((detail, index) => h('p', { key: index, className: 'work-detail' }, formatted(loc(detail, language)))),
    work.score && h('p', { className: 'work-detail' }, `Partitura: ${work.score === 'ficta' ? 'Ficta' : 'Sota demanda'}`),
    work.links?.score && h('p', {}, link(asset(props, work.links.score), 'Partitura')),
    work.links?.audio && h('p', {}, link(asset(props, work.links.audio), 'Àudio')),
    recordings(props, work.recordings), attachments(props, work.assets),
    list(work.parts).map((part, index) => h('div', { key: index, className: 'work-part' }, workCard(props, part, language))));

  const workPreview = (props, data, language) => {
    const sections = list(data.programmeNote?.sections);
    const section = sections.find(item => item.language === language) || sections.find(item => item.language === 'ca') || sections[0];
    return h('div', {},
      data.archived && h('p', { className: 'cms-preview-notice' }, 'Obra arxivada: no apareixerà al catàleg públic.'),
      workCard(props, data, language),
      section && h('section', { className: 'cms-preview-note', lang: section.language },
        h('p', { className: 'cms-preview-label' }, `Nota de programa · ${languages[section.language] || section.language}`),
        h('h2', {}, section.title),
        h('div', { className: 'work-info' }, list(section.blocks).map((block, index) => h('div', { key: index },
          block.type === 'prose' ? rich(props, block.body) : block.type === 'poem'
            ? h('div', { className: 'work-info-poem' }, String(block.text || '').split('\n').map((line, lineIndex) => line.trim()
              ? h('p', { key: lineIndex, className: 'work-info-poem-line' }, line)
              : h('div', { key: lineIndex, className: 'work-info-stanza-break' })))
            : h('div', { className: 'work-info-stanza-break' })))),
        attachments(props, data.programmeNote?.assets)));
  };
  const biographyPreview = (props, data, language) => h('div', {},
    picture(props, data.heroImage, 'Miquel Oliu'),
    ['short', 'full'].map(version => {
      const blocks = list(data[version]?.[language]);
      return h('section', { key: version, className: 'cms-preview-section' },
        h('h2', {}, version === 'short' ? 'Biografia curta' : 'Biografia completa'),
        (blocks.length ? blocks : list(data[version]?.ca)).map((block, index) => h('div', { key: index, className: 'bio-block' }, rich(props, block.body))));
    }), attachments(props, data.assets));
  const textPreview = (props, data, language) => h('div', {}, list(data.entries).map((entry, index) => {
    const value = loc(entry, language);
    let content;
    if (entry.format === 'rich') content = rich(props, value);
    else if (entry.format === 'attribution') {
      const [author, ...source] = value.split('\n');
      content = h('p', {}, author, source.length > 0 && h('span', { className: 'quote-source cms-preview-source' }, source.join('\n')));
    } else content = h('p', { className: entry.format === 'lines' ? 'cms-preview-lines' : '' }, value);
    return h('section', { key: index, className: 'cms-preview-section' }, content);
  }));

  const homePreview = (props, data, language) => h('div', {},
    picture(props, data.heroImage, 'Imatge de portada'),
    list(data.additionalTestimonials).map((item, index) => h('section', { key: index, className: 'cms-preview-section' },
      rich(props, loc(item.text, language)), h('cite', {}, loc(item.author, language)))),
    attachments(props, data.assets));
  const pressPreview = (props, data, language) => {
    const sections = list(data.sections);
    const section = sections.find(item => item.language === language) || sections.find(item => item.language === 'ca') || sections[0];
    return h('div', {},
      data.archived && h('p', { className: 'cms-preview-notice' }, 'Article arxivat: no apareixerà a la pàgina de premsa.'),
      h('p', { className: 'cms-preview-label' }, loc(data.kind, language)),
      h('h2', {}, loc(data.title, language)), h('p', {}, loc(data.author, language)),
      data.url && h('p', {}, link(data.url, 'Font original')),
      section && h('section', { className: 'cms-preview-section', lang: section.language },
        h('h3', {}, section.title), rich(props, section.body)));
  };
  const recordingPreview = (props, data) => h('div', {},
    data.archived && h('p', { className: 'cms-preview-notice' }, 'Enregistrament arxivat: no apareixerà a la pàgina pública.'),
    picture(props, data.cover, data.release || data.title || 'Portada'),
    h('h2', {}, data.title), h('p', {}, data.year),
    h('p', {}, data.release), h('p', {}, data.performers),
    data.spotifyUrl && h('p', {}, link(data.spotifyUrl, 'Escoltar a Spotify')));

  const register = (name, title, render, multilingual = true) => CMS.registerPreviewTemplate(name, createClass({
    getInitialState() { return { language: 'ca' }; },
    render() {
      const data = this.props.entry.get('data')?.toJS() || {};
      const available = [...new Set(['ca', 'es', 'en', ...[...list(data.programmeNote?.sections), ...list(data.sections)].map(section => section.language).filter(Boolean)])];
      const language = available.includes(this.state.language) ? this.state.language : 'ca';
      return h('main', { className: 'cms-preview', lang: language },
        h('header', { className: 'cms-preview-toolbar' },
          h('p', { className: 'cms-preview-label' }, title),
          h('p', { className: 'cms-preview-help' }, 'Vista prèvia dels camps mentre editeu. Deseu per veure el web complet amb l’enllaç de previsualització.'),
          multilingual && h('div', { className: 'cms-preview-languages', role: 'group', 'aria-label': 'Idioma de la previsualització' }, available.map(code => h('button', {
            key: code, type: 'button', 'aria-pressed': language === code, onClick: () => this.setState({ language: code }),
          }, languages[code] || code)))),
        h('div', { className: 'cms-preview-content' }, render(this.props, data, language)));
    },
  }));

  CMS.registerPreviewStyle('/css/style.css');
  CMS.registerPreviewStyle('/admin/preview.css');
  register('works', 'Obra', workPreview);
  register('biography', 'Biografia', biographyPreview);
  register('home', 'Inici', homePreview);
  register('press', 'Premsa', pressPreview);
  register('recordings', 'Enregistrament', recordingPreview, false);
  register('contact', 'Contacte', (props, data) => h('div', {},
    picture(props, data.image, 'Fotografia de contacte'),
    h('h2', {}, 'Contacte'), h('p', {}, link(`mailto:${data.contactEmail || ''}`, data.contactEmail)),
    h('h3', {}, 'Editorial'), h('p', {}, link(data.publisherUrl, data.publisherUrl)), attachments(props, data.assets)), false);
  register('categories', 'Categoria del catàleg', (_props, data, language) => h('div', {},
    h('h2', {}, loc(data.name, language)), h('p', { className: 'cms-preview-label' }, `Ordre: ${data.order ?? ''}`)));
  for (const name of ['home-plain', 'home-lines', 'home-attribution', 'home-rich', 'bio-plain', 'contact-plain', 'catalogue-plain', 'nav-plain', 'footer-plain', 'works-plain', 'recording-plain', 'recordings-plain']) {
    register(name, 'Textos i traduccions', textPreview);
  }
})();
