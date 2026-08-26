(() => {
  'use strict';
  const D = window.RETRAITE_DATA;
  if (!D) throw new Error('RETRAITE_DATA absent');

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const fmt = (v, d = 0) => new Intl.NumberFormat('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
  const fmtSigned = (v, d = 1) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${fmt(Math.abs(v), d)}`;

  function interp(points, year) {
    if (year <= points[0].year) return points[0].value;
    if (year >= points[points.length - 1].year) return points[points.length - 1].value;
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i], b = points[i + 1];
      if (year >= a.year && year <= b.year) {
        const t = (year - a.year) / (b.year - a.year);
        return a.value + (b.value - a.value) * t;
      }
    }
    return points[points.length - 1].value;
  }

  function svgEl(name, attrs = {}) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
    return el;
  }

  function initNavigation() {
    const header = $('#siteHeader');
    const menu = $('#siteNav');
    const toggle = $('#menuToggle');
    toggle?.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    $$('#siteNav a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }));

    const sections = $$('[data-nav]');
    const navLinks = $$('#siteNav a');
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? scrollY / max : 0;
      $('#scrollProgress').style.width = `${p * 100}%`;
      header?.classList.toggle('scrolled', scrollY > 30);
      let current = '';
      sections.forEach(s => {
        if (s.getBoundingClientRect().top < 145) current = s.dataset.nav || '';
      });
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initCounters() {
    const els = $$('.counter');
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      const decimals = Number(el.dataset.decimals || 0);
      const start = performance.now();
      const duration = 850;
      const tick = now => {
        const t = clamp((now - start) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(target * eased, decimals);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    }), { threshold: .5 });
    els.forEach(el => io.observe(el));
  }

  let demoMetric = 'ratio';
  function demoSeries(metric) {
    const points = metric === 'ratio' ? D.demography.ratio65to20_64 : D.demography.populationM;
    return Array.from({ length: 45 }, (_, i) => {
      const year = 2026 + i;
      return { year, value: interp(points, year) };
    });
  }

  function drawDemoChart() {
    const svg = $('#demoChart');
    if (!svg) return;
    svg.innerHTML = '';
    const w = 900, h = 390, m = { l: 55, r: 30, t: 30, b: 45 };
    const series = demoSeries(demoMetric);
    const values = series.map(d => d.value);
    let min = Math.min(...values), max = Math.max(...values);
    const pad = (max - min) * .16 || 1;
    min -= pad; max += pad;
    const x = y => m.l + ((y - 2026) / (2070 - 2026)) * (w - m.l - m.r);
    const yy = v => m.t + ((max - v) / (max - min)) * (h - m.t - m.b);

    const defs = svgEl('defs');
    const grad = svgEl('linearGradient', { id: 'demoGradient', x1: 0, x2: 0, y1: 0, y2: 1 });
    grad.append(svgEl('stop', { offset: '0%', 'stop-color': '#ff5a1f', 'stop-opacity': .32 }), svgEl('stop', { offset: '100%', 'stop-color': '#ff5a1f', 'stop-opacity': 0 }));
    defs.append(grad); svg.append(defs);

    for (let i = 0; i < 5; i++) {
      const gy = m.t + i * (h - m.t - m.b) / 4;
      svg.append(svgEl('line', { x1: m.l, x2: w - m.r, y1: gy, y2: gy, class: 'chart-grid' }));
      const val = max - i * (max - min) / 4;
      const t = svgEl('text', { x: m.l - 10, y: gy + 4, 'text-anchor': 'end', class: 'chart-axis' });
      t.textContent = demoMetric === 'ratio' ? fmt(val, 0) : `${fmt(val, 1)} M`;
      svg.append(t);
    }
    [2026, 2040, 2050, 2060, 2070].forEach(year => {
      const t = svgEl('text', { x: x(year), y: h - 14, 'text-anchor': year === 2026 ? 'start' : year === 2070 ? 'end' : 'middle', class: 'chart-axis' });
      t.textContent = year; svg.append(t);
    });

    const pts = series.map(d => [x(d.year), yy(d.value)]);
    const lineD = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
    const areaD = `${lineD} L${x(2070)},${h - m.b} L${x(2026)},${h - m.b} Z`;
    svg.append(svgEl('path', { d: areaD, class: 'chart-area' }), svgEl('path', { d: lineD, class: 'chart-line' }));

    const year = Number($('#demoYear')?.value || 2026);
    const val = interp(demoMetric === 'ratio' ? D.demography.ratio65to20_64 : D.demography.populationM, year);
    const mx = x(year), my = yy(val);
    svg.append(svgEl('line', { x1: mx, x2: mx, y1: m.t, y2: h - m.b, class: 'chart-marker' }));
    svg.append(svgEl('circle', { cx: mx, cy: my, r: 8, class: 'chart-dot' }));
    const label = svgEl('text', { x: clamp(mx + 12, m.l + 5, w - 110), y: my - 13, class: 'chart-label' });
    label.textContent = demoMetric === 'ratio' ? `${fmt(val, 0)} / 100` : `${fmt(val, 1)} M`;
    svg.append(label);
  }

  function updateDemoReadout() {
    const year = Number($('#demoYear').value);
    const ratio = interp(D.demography.ratio65to20_64, year);
    const pop = interp(D.demography.populationM, year);
    const older = interp(D.demography.share65plus, year);
    $('#demoYearOut').textContent = String(year);
    $('#demoRatioBig').textContent = fmt(ratio, 0);
    $('#demoPopulation').textContent = `${fmt(pop, 1)} M`;
    $('#demoOlder').textContent = `${fmt(older, 0)} %`;
    $('#demoBalance').textContent = year <= 2026 ? 'déjà négatif' : 'négatif';
    let note = 'Interpolation pédagogique entre points publiés par l’Insee.';
    if (year === 2026) note = 'Point de départ des nouvelles projections Insee 2026.';
    if (year === 2037) note = 'Pic projeté de population : environ 69,8 millions.';
    if (year === 2040) note = 'L’Insee projette 49 personnes de 65+ pour 100 personnes de 20–64 ans.';
    if (year === 2070) note = 'Scénario central : 65,9 millions d’habitants et 62 personnes de 65+ pour 100 personnes de 20–64 ans.';
    $('#demoAnnotation').textContent = note;
    drawDemoChart();
  }

  function initDemography() {
    $('#demoYear')?.addEventListener('input', updateDemoReadout);
    $$('[data-demo-metric]').forEach(btn => btn.addEventListener('click', () => {
      demoMetric = btn.dataset.demoMetric;
      $$('[data-demo-metric]').forEach(b => b.classList.toggle('active', b === btn));
      drawDemoChart();
    }));
    updateDemoReadout();
  }

  function initTreemap() {
    const root = $('#treemap');
    if (!root) return;
    root.innerHTML = '';
    const rows = [D.thousandEuros.slice(0, 3), D.thousandEuros.slice(3, 5), D.thousandEuros.slice(5)];
    const rowTotals = rows.map(r => r.reduce((s, x) => s + x.value, 0));
    rows.forEach((row, ri) => {
      const rowEl = document.createElement('div');
      rowEl.className = 'treemap-row';
      rowEl.style.height = `${rowTotals[ri] / 10}%`;
      row.forEach(item => {
        const el = document.createElement('div');
        el.className = `treemap-item ${item.className}`;
        el.style.flex = `${item.value} 1 0`;
        el.innerHTML = `<b>${item.value} €</b><span>${item.label}</span>`;
        el.title = `${item.label} : ${item.value} € sur 1 000 €`;
        rowEl.append(el);
      });
      root.append(rowEl);
    });
  }

  function fundProjection(initialBn, annualBn, ratePct, years) {
    const r = ratePct / 100;
    const out = [{ year: 0, value: initialBn }];
    let capital = initialBn;
    for (let y = 1; y <= years; y++) {
      capital = capital * (1 + r) + annualBn;
      out.push({ year: y, value: capital });
    }
    return out;
  }

  function drawFundChart(series) {
    const svg = $('#fundChart');
    if (!svg) return;
    svg.innerHTML = '';
    const w = 900, h = 380, m = { l: 62, r: 28, t: 24, b: 40 };
    const maxY = Math.max(...series.map(d => d.value)) * 1.08;
    const years = series[series.length - 1].year;
    const x = y => m.l + (y / years) * (w - m.l - m.r);
    const yy = v => m.t + (1 - v / maxY) * (h - m.t - m.b);

    const defs = svgEl('defs');
    const grad = svgEl('linearGradient', { id: 'fundGradient', x1: 0, x2: 0, y1: 0, y2: 1 });
    grad.append(svgEl('stop', { offset: '0%', 'stop-color': '#ffd52a', 'stop-opacity': .32 }), svgEl('stop', { offset: '100%', 'stop-color': '#ffd52a', 'stop-opacity': 0 }));
    defs.append(grad); svg.append(defs);
    for (let i = 0; i < 5; i++) {
      const gy = m.t + i * (h - m.t - m.b) / 4;
      svg.append(svgEl('line', { x1: m.l, x2: w - m.r, y1: gy, y2: gy, class: 'fund-grid' }));
      const val = maxY * (1 - i / 4);
      const t = svgEl('text', { x: m.l - 10, y: gy + 4, 'text-anchor': 'end', class: 'fund-axis' }); t.textContent = `${fmt(val, 0)} Md€`; svg.append(t);
    }
    [0, Math.round(years / 2), years].forEach(y => {
      const t = svgEl('text', { x: x(y), y: h - 12, 'text-anchor': y === 0 ? 'start' : y === years ? 'end' : 'middle', class: 'fund-axis' });
      t.textContent = y === 0 ? 'départ' : `+${y} ans`; svg.append(t);
    });
    const pts = series.map(d => [x(d.year), yy(d.value)]);
    const lineD = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
    const areaD = `${lineD} L${x(years)},${h - m.b} L${x(0)},${h - m.b} Z`;
    svg.append(svgEl('path', { d: areaD, class: 'fund-area' }), svgEl('path', { d: lineD, class: 'fund-line' }));
  }

  function updateFund() {
    const annual = Number($('#fundAnnual').value);
    const rate = Number($('#fundReturn').value);
    const years = Number($('#fundYears').value);
    const draw = Number($('#fundDraw').value);
    $('#fundAnnualOut').textContent = `${fmt(annual)} Md€`;
    $('#fundReturnOut').textContent = `${fmt(rate, rate % 1 ? 2 : 1)} %`;
    $('#fundYearsOut').textContent = `${years} ans`;
    $('#fundDrawOut').textContent = `${fmt(draw, draw % 1 ? 2 : 1)} %`;
    const series = fundProjection(D.meta.fundInitialBn, annual, rate, years);
    const capital = series[series.length - 1].value;
    const payout = capital * draw / 100;
    $('#fundCapital').textContent = `${fmt(capital, 0)} Md€`;
    $('#fundPayout').textContent = `${fmt(payout, 0)} Md€/an`;
    $('#fundVsPensions').textContent = `≈ ${fmt(payout / D.meta.pensionSpendBn2025 * 100, 0)} % des dépenses de retraite 2025 en flux annuel`;
    drawFundChart(series);
  }

  function initFund() {
    ['fundAnnual', 'fundReturn', 'fundYears', 'fundDraw'].forEach(id => $(`#${id}`)?.addEventListener('input', updateFund));
    $('#fundReset')?.addEventListener('click', () => {
      $('#fundAnnual').value = 40; $('#fundReturn').value = 3; $('#fundYears').value = 40; $('#fundDraw').value = 2.5; updateFund();
    });
    updateFund();
  }

  function updateLevers() {
    const revenue = Number($('#levyRevenue').value);
    const pension = Number($('#levyPension').value);
    const work = Number($('#levyWork').value);
    $('#levyRevenueOut').textContent = `${fmt(revenue, 1)} pt de PIB`;
    $('#levyPensionOut').textContent = `${fmt(pension, 1)} pt de PIB`;
    $('#levyWorkOut').textContent = `${fmt(work, 1)} pt de PIB`;
    const gap = D.meta.corDeficit[2070] + revenue + pension + work;
    $('#gapAfter').textContent = `${fmtSigned(gap, 1)} % PIB`;
    const remaining = Math.max(0, -gap);
    const ratio = clamp(remaining / 2.4, 0, 1);
    $('#gapMeter').style.width = `${ratio * 100}%`;
    $('#gapMeter').style.background = remaining > 1.2 ? '#ff5a1f' : remaining > .2 ? '#ffd52a' : '#5eb785';
  }
  function initLevers() {
    ['levyRevenue', 'levyPension', 'levyWork'].forEach(id => $(`#${id}`)?.addEventListener('input', updateLevers));
    updateLevers();
  }

  let activeParty = 'actuel';
  function sourceAnchor(id) {
    const s = D.sources[id];
    return s ? `<a href="${s.url}" target="_blank" rel="noreferrer">${s.institution}</a>` : '';
  }
  function renderParty() {
    const p = D.parties[activeParty];
    const root = $('#partyProfile');
    const logo = p.logo ? `<img src="${p.logo}" alt="Logo ${p.label}">` : `<span class="fallback-logo">${p.label === 'Notre modèle' ? 'R/70' : 'FR'}</span>`;
    root.innerHTML = `
      <div class="party-summary">
        <div class="party-identity">${logo}<div><span class="party-status">${p.status}</span><h3>${p.label}</h3></div></div>
        <p>${p.summary}</p>
      </div>
      <div class="party-answers">${p.answers.map((x, i) => `<article class="answer-card ${x.tone || ''}"><span>QUESTION ${i + 1}</span><h4>${x.q}</h4><p>${x.a}</p></article>`).join('')}</div>
      <div class="party-sources">Sources / repères : ${p.sources.map(sourceAnchor).join(' · ')}</div>`;
    $$('.party-button').forEach(b => {
      b.classList.toggle('active', b.dataset.party === activeParty);
      b.setAttribute('aria-selected', String(b.dataset.party === activeParty));
    });
  }
  function initParties() {
    const picker = $('#partyPicker');
    Object.entries(D.parties).forEach(([key, p]) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'party-button'; b.dataset.party = key; b.setAttribute('role', 'tab');
      b.innerHTML = `${p.logo ? `<img src="${p.logo}" alt="">` : ''}<span>${p.label}</span>`;
      b.addEventListener('click', () => { activeParty = key; renderParty(); });
      picker.append(b);
    });
    renderParty();

    const arch = $('#architectureGrid');
    D.architectures.forEach(a => {
      const article = document.createElement('article'); article.className = 'architecture-card';
      article.innerHTML = `<span class="arch-kicker">${a.kicker}</span><h4>${a.label}<br>${a.title}</h4><p>${a.text}</p><div class="tag-row">${a.tags.map(t => `<span>${t}</span>`).join('')}</div>${a.source ? `<a class="arch-source" href="${D.sources[a.source].url}" target="_blank" rel="noreferrer">Source →</a>` : ''}`;
      arch.append(article);
    });
  }

  let activeSourceCategory = 'Toutes';
  function renderSources() {
    const root = $('#sourceList');
    root.innerHTML = '';
    Object.entries(D.sources).filter(([, s]) => activeSourceCategory === 'Toutes' || s.category === activeSourceCategory).forEach(([id, s]) => {
      const article = document.createElement('article'); article.className = 'source-card'; article.id = `source-${id}`; article.dataset.category = s.category;
      article.innerHTML = `<div class="source-meta"><b>${s.institution}</b>${s.category}<br>${s.date}</div><div><h3>${s.title}</h3><p>${s.supports}</p></div><a href="${s.url}" target="_blank" rel="noreferrer" aria-label="Ouvrir la source ${s.title}">↗</a>`;
      root.append(article);
    });
  }
  function initSources() {
    const categories = ['Toutes', ...new Set(Object.values(D.sources).map(s => s.category))];
    const filters = $('#sourceFilters');
    categories.forEach(cat => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'source-filter'; b.textContent = cat; b.classList.toggle('active', cat === activeSourceCategory);
      b.addEventListener('click', () => { activeSourceCategory = cat; $$('.source-filter').forEach(x => x.classList.toggle('active', x === b)); renderSources(); });
      filters.append(b);
    });
    renderSources();

    $$('[data-source]').forEach(link => link.addEventListener('click', e => {
      const id = link.dataset.source;
      if (!D.sources[id]) return;
      e.preventDefault();
      activeSourceCategory = 'Toutes';
      $$('.source-filter').forEach(x => x.classList.toggle('active', x.textContent === 'Toutes'));
      renderSources();
      $('#sources').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      setTimeout(() => {
        const card = $(`#source-${CSS.escape(id)}`);
        card?.animate([{ background: '#ffd52a' }, { background: 'transparent' }], { duration: 1300, easing: 'ease-out' });
      }, 450);
    }));
  }

  function staticSanity() {
    const sourceIds = new Set(Object.keys(D.sources));
    Object.values(D.parties).flatMap(p => p.sources).forEach(id => {
      if (!sourceIds.has(id)) console.warn('Unknown source id in party data:', id);
    });
    D.architectures.filter(a => a.source).forEach(a => {
      if (!sourceIds.has(a.source)) console.warn('Unknown source id in architecture:', a.source);
    });
  }

  initNavigation();
  initCounters();
  initDemography();
  initTreemap();
  initFund();
  initLevers();
  initParties();
  initSources();
  staticSanity();
})();
