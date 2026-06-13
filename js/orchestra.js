/*
 * Orchestra — instrumentation formula parser + seating-chart diagram
 *
 * Parses bracket formulas like
 *   [3.2.3.2.-2.2.2.1.-timp.+3 perc. –arp. -celesta -12.12.10.8.6.]
 * (woodwinds - brass - timpani/percussion - harp - celesta - strings)
 * and renders an inline SVG stage plan (one dot per player) plus a
 * localized legend.
 *
 * Orchestra.parse() returns null for anything that is not a well-formed
 * formula, so callers can fall back to plain text.
 */

const Orchestra = (() => {
  const WOODWINDS = ['flutes', 'oboes', 'clarinets', 'bassoons'];
  const BRASS = ['horns', 'trumpets', 'trombones', 'tuba'];
  const STRINGS = ['violins1', 'violins2', 'violas', 'cellos', 'basses'];
  const EXTRAS = ['timpani', 'percussion', 'harp', 'celesta'];

  // Orchestral family per section — drives the dot colour and hover grouping.
  const FAMILY = {};
  WOODWINDS.forEach(id => FAMILY[id] = 'woodwinds');
  BRASS.forEach(id => FAMILY[id] = 'brass');
  STRINGS.forEach(id => FAMILY[id] = 'strings');
  FAMILY.timpani = FAMILY.percussion = 'perc';
  FAMILY.harp = FAMILY.celesta = 'keys';

  // Visual front-to-back order for the reveal stagger.
  const STAGGER_ORDER = [...STRINGS, 'harp', 'celesta', ...WOODWINDS, ...BRASS, 'timpani', 'percussion'];

  /* ---------- Parser ---------- */

  // Split on '-' at parenthesis depth 0, so doublings like 3(III=picc.)
  // are never split through.
  function splitSegments(str) {
    const out = [];
    let depth = 0, cur = '';
    for (const ch of str) {
      if (ch === '(') depth++;
      else if (ch === ')') depth = Math.max(0, depth - 1);
      if (ch === '-' && depth === 0) { out.push(cur); cur = ''; }
      else cur += ch;
    }
    out.push(cur);
    return out.map(s => s.trim()).filter(Boolean);
  }

  // e.g. "3.2.3.2." or "3(III=picc.).2.2.2" — paren content is tolerated
  // (doubling info) but not interpreted.
  const NUM_GROUP = /^\d+(\([^)]*\))?(\s*\.\s*\d+(\([^)]*\))?)*\s*\.?$/;

  function parse(str) {
    try {
      if (typeof str !== 'string') return null;
      const m = str.trim().match(/^\[(.*)\]$/);
      if (!m) return null;
      const body = m[1].replace(/[–—−]/g, '-').replace(/\s+/g, ' ');

      const numeric = []; // arrays of ints, in order of appearance
      const extras = [];  // {id, count}
      for (const seg of splitSegments(body)) {
        if (NUM_GROUP.test(seg)) {
          numeric.push(
            seg.replace(/\([^)]*\)/g, '').replace(/\s+/g, '').replace(/\.$/, '')
              .split('.').map(p => parseInt(p, 10))
          );
          continue;
        }
        let known = false;
        if (/timp/i.test(seg)) { extras.push({ id: 'timpani', count: 1 }); known = true; }
        const perc = seg.match(/(\d+)\s*perc/i);
        if (perc) { extras.push({ id: 'percussion', count: parseInt(perc[1], 10) }); known = true; }
        const harp = seg.match(/^(\d+)?\s*(arp|hp|harp)/i);
        if (harp) { extras.push({ id: 'harp', count: harp[1] ? parseInt(harp[1], 10) : 1 }); known = true; }
        if (/cel/i.test(seg)) { extras.push({ id: 'celesta', count: 1 }); known = true; }
        if (!known) return null;
      }

      const fours = numeric.filter(g => g.length === 4);
      const winds = fours[0];
      const brass = fours[1];
      const strings = numeric.find(g => g.length === 5);
      if (!winds || !brass || !strings) return null;

      const sections = [];
      const add = (ids, counts) => ids.forEach((id, i) => {
        if (counts[i] > 0) sections.push({ id, count: counts[i] });
      });
      add(WOODWINDS, winds);
      add(BRASS, brass);
      EXTRAS.forEach(id => {
        const e = extras.find(x => x.id === id);
        if (e && e.count > 0) sections.push(e);
      });
      add(STRINGS, strings);
      return sections;
    } catch (e) {
      return null;
    }
  }

  /* ---------- Labels ---------- */

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Sections with a singular form in the translations
  const HAS_ONE = new Set([...WOODWINDS, ...BRASS, ...EXTRAS]);

  function name(id, count) {
    const key = 'works.orchestra.' + id;
    return I18n.t(count === 1 && HAS_ONE.has(id) ? key + '.one' : key);
  }

  // Full localized name with count, e.g. "2 fagots" / "tuba" — shared by the
  // legend and the SVG section tooltips.
  function fullLabel(id, count) {
    return count === 1 ? name(id, count) : `${count} ${name(id, count)}`;
  }

  // Diagram labels use standard score abbreviations (language-independent);
  // the legend next to the diagram spells out the full localized names.
  const ABBR = {
    flutes: 'Fl', oboes: 'Ob', clarinets: 'Cl', bassoons: 'Fg',
    horns: 'Cor', trumpets: 'Tpt', trombones: 'Tbn', tuba: 'Tba',
    timpani: 'Timp', percussion: 'Perc', harp: 'Arpa', celesta: 'Cel',
    violins1: 'Vl I', violins2: 'Vl II', violas: 'Vla', cellos: 'Vc', basses: 'Cb',
  };

  function labelText(id, count) {
    return count === 1 ? ABBR[id] : `${ABBR[id]} · ${count}`;
  }

  /* ---------- SVG seating chart ---------- */

  // Polar layout around the conductor: 180° = stage left (audience view),
  // 90° = straight back, 0° = stage right.
  const W = 640, H = 460, CX = 320, CY = 415;
  const DEG = Math.PI / 180;
  const ROW_GAP = 24;
  const pos = (a, r) => [CX + r * Math.cos(a * DEG), CY - r * Math.sin(a * DEG)];

  // String sections fan out in front of the conductor.
  const STRING_FANS = {
    violins1: { wedge: [128, 170], r0: 90, maxPerRow: 5, anchor: 'end' },
    violins2: { wedge: [95, 127], r0: 90, maxPerRow: 4 },
    violas:   { wedge: [62, 93], r0: 90, maxPerRow: 4 },
    cellos:   { wedge: [26, 60], r0: 90, maxPerRow: 4, labelGap: 36 },
    basses:   { wedge: [14, 40], r0: 196, maxPerRow: 3 },
  };

  // Fill a wedge with concentric rows, inner row first, seats left to right.
  function fanSeats(count, [a0, a1], r0, maxPerRow) {
    const rows = Math.ceil(count / maxPerRow);
    const base = Math.floor(count / rows);
    let extra = count % rows;
    const dots = [];
    let r = r0;
    for (let i = 0; i < rows; i++) {
      const n = base + (extra-- > 0 ? 1 : 0);
      for (let j = 0; j < n; j++) dots.push(pos(a1 - (j + 0.5) * (a1 - a0) / n, r));
      if (i < rows - 1) r += ROW_GAP;
    }
    return { dots, outerR: r };
  }

  // One arc shared by several sections, seated left (a1) to right (a0).
  // Returns per-section dots and the angular midpoint for its label.
  function sharedRow(parts, [a0, a1], r) {
    const total = parts.reduce((s, p) => s + p.count, 0);
    const slot = (a1 - a0) / total;
    const out = [];
    let k = 0;
    for (const p of parts) {
      const start = a1 - k * slot;
      const dots = [];
      for (let j = 0; j < p.count; j++, k++) dots.push(pos(a1 - (k + 0.5) * slot, r));
      out.push({ id: p.id, count: p.count, dots, midAngle: (start + (a1 - k * slot)) / 2 });
    }
    return out;
  }

  function buildSVG(sections) {
    const count = id => {
      const s = sections.find(x => x.id === id);
      return s ? s.count : 0;
    };
    // Each section's dots + label live in one record so they can share a
    // <g> (colour, hover, stagger, tooltip).
    const groups = []; // { id, count, dots: [[x,y],…], label: {x, y, text, anchor} }
    const emit = (id, n, dots, xy, anchor) =>
      groups.push({ id, count: n, dots,
        label: { x: xy[0], y: xy[1], text: labelText(id, n), anchor: anchor || 'middle' } });

    // Strings
    STRINGS.forEach(id => {
      const n = count(id);
      if (!n) return;
      const cfg = STRING_FANS[id];
      const fan = fanSeats(n, cfg.wedge, cfg.r0, cfg.maxPerRow);
      emit(id, n, fan.dots, pos((cfg.wedge[0] + cfg.wedge[1]) / 2, fan.outerR + (cfg.labelGap || 22)), cfg.anchor);
    });

    // Woodwinds: two arcs behind the strings; labels in front of the first
    // row and behind the second.
    const row = (ids, arc, r, labelR) => {
      const parts = ids.map(id => ({ id, count: count(id) })).filter(p => p.count);
      sharedRow(parts, arc, r).forEach(p => emit(p.id, p.count, p.dots, pos(p.midAngle, labelR)));
    };
    row(['flutes', 'oboes'], [70, 110], 230, 200);
    row(['clarinets', 'bassoons'], [70, 110], 258, 280);

    // Brass: horns stage left, the rest in one back arc
    const horns = count('horns');
    if (horns) {
      const fan = fanSeats(horns, [112, 136], 310, 4);
      emit('horns', horns, fan.dots, pos(127, fan.outerR + 22));
    }
    row(['trumpets', 'trombones', 'tuba'], [52, 104], 310, 332);

    // Timpani + percussion at the far back
    if (count('timpani')) {
      emit('timpani', count('timpani'), [pos(102, 356)], pos(102, 378));
    }
    const perc = count('percussion');
    if (perc) {
      const fan = fanSeats(perc, [56, 88], 356, 4);
      emit('percussion', perc, fan.dots, pos(72, fan.outerR + 22));
    }

    // Harp and celesta on the stage-left side
    if (count('harp')) {
      const fan = fanSeats(count('harp'), [146, 154], 255, 2);
      const at = pos(150, 255);
      emit('harp', count('harp'), fan.dots, [at[0], at[1] + 18]);
    }
    if (count('celesta')) {
      const at = pos(158, 305);
      emit('celesta', count('celesta'), [pos(158, 305)], [at[0], at[1] + 18]);
    }

    const f = n => Math.round(n * 10) / 10;
    const present = STAGGER_ORDER.filter(id => groups.some(g => g.id === id));

    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(I18n.t('works.orchestra.diagram.label'))}" xmlns="http://www.w3.org/2000/svg">`;
    // Stage shell behind the players (pointer-events disabled in CSS)
    svg += '<g class="orch-shell" aria-hidden="true">'
      + '<path d="M 153.7 379.7 A 170 170 0 0 1 486.3 379.7"/>'
      + '<path d="M 41.2 355.7 A 285 285 0 0 1 598.8 355.7"/>'
      + '<path d="M 25.1 167.5 A 385 385 0 0 1 614.9 167.5"/>'
      + '<path class="orch-stage-edge" d="M 90 437 Q 320 459 550 437"/></g>';
    // One group per section
    svg += groups.map(g =>
      `<g class="orch-section" data-section="${g.id}" data-family="${FAMILY[g.id]}" style="--i:${present.indexOf(g.id)}">`
      + `<title>${esc(fullLabel(g.id, g.count))}</title>`
      + g.dots.map(([x, y]) => `<circle class="orch-dot" cx="${f(x)}" cy="${f(y)}" r="4.5"/>`).join('')
      + `<text class="orch-label" x="${f(g.label.x)}" y="${f(g.label.y)}" text-anchor="${g.label.anchor}">${esc(g.label.text)}</text>`
      + '</g>').join('');
    // Conductor mark — outside any section group
    svg += `<circle class="orch-conductor" cx="${CX}" cy="${CY - 6}" r="5"/>`;
    svg += `<rect class="orch-podium" x="${CX - 11}" y="${CY + 3}" width="22" height="5"/>`;
    svg += `<text class="orch-label" x="${CX}" y="${CY + 26}" text-anchor="middle">${esc(I18n.t('works.orchestra.conductor'))}</text>`;
    svg += '</svg>';
    return svg;
  }

  /* ---------- Legend ---------- */

  function buildLegend(sections) {
    const items = sections.map(s =>
      `<li data-section="${s.id}" data-family="${FAMILY[s.id]}">${esc(fullLabel(s.id, s.count))}</li>`);
    return `<ul class="orchestra-legend">${items.join('')}</ul>`;
  }

  function renderPanel(sections) {
    return `<div class="orchestra-panel-inner"><div class="orchestra-diagram">${buildSVG(sections)}</div>${buildLegend(sections)}</div>`;
  }

  /* ---------- Hover sync (legend ↔ diagram) ---------- */

  // Highlights the hovered section on both sides and dims the rest.
  function bind(panel) {
    const inner = panel.querySelector('.orchestra-panel-inner');
    if (!inner) return;
    const setHover = id => {
      inner.classList.toggle('has-hover', !!id);
      inner.querySelectorAll('[data-section]').forEach(el =>
        el.classList.toggle('is-hover', !!id && el.dataset.section === id));
    };
    inner.addEventListener('mouseover', e => {
      const t = e.target.closest('[data-section]');
      setHover(t ? t.dataset.section : null);
    });
    inner.addEventListener('mouseleave', () => setHover(null));
  }

  return { parse, renderPanel, bind };
})();
