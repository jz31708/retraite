(() => {
  'use strict';
  const D = window.RETRAITE_DATA;
  if (!D) throw new Error('RETRAITE_DATA absent');
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (n, digits = 1) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n);
  const svgEl = (tag, attrs = {}) => { const el = document.createElementNS('http://www.w3.org/2000/svg', tag); Object.entries(attrs).forEach(([k,v]) => el.setAttribute(k, v)); return el; };

  const SOURCE = {
    insee: 'https://www.insee.fr/fr/statistiques/9004289',
    cor: 'https://www.cor-retraites.fr/sites/default/files/2026-06/RA_2026_def.pdf',
    ipp: 'https://www.ipp.eu/publication/retraites-des-fonctionnaires-detat-faut-il-changer-la-convention-comptable/',
    senate: 'https://www.senat.fr/rap/l25-139-324/l25-139-3240.html',
    budget: 'https://www.budget.gouv.fr/documentation/file-download/30518'
  };

  const dependency = [
    [1970,23.71],[1980,25.33],[1985,22.03],[1990,23.86],[2000,27.11],[2010,28.34],[2015,32.32],[2020,36.67],[2025,39.49],
    [2026,40.14],[2030,42.97],[2040,48.63],[2050,51.89],[2060,56.55],[2070,61.92]
  ];
  const depYoung = [[2026,39.96],[2040,46.52],[2050,47.58],[2060,48.47],[2070,50.17]];
  const depOld = [[2026,40.32],[2040,51.01],[2050,56.94],[2060,66.67],[2070,77.88]];

  const pyramidBins = [
    {age:'0–9',m26:3599579,m70:2454611,f26:3430057,f70:2309867},
    {age:'10–19',m26:4369677,m70:3092496,f26:4128216,f70:2853573},
    {age:'20–29',m26:4014870,m70:3183106,f26:3916017,f70:3003367},
    {age:'30–39',m26:4142561,m70:3424064,f26:4282272,f70:3364293},
    {age:'40–49',m26:4220974,m70:3880392,f26:4400067,f70:3826481},
    {age:'50–59',m26:4382279,m70:4484845,f26:4509900,f70:4450278},
    {age:'60–69',m26:3995628,m70:4352159,f26:4342703,f70:4399779},
    {age:'70–79',m26:3188199,m70:3809976,f26:3835764,f70:4096335},
    {age:'80–89',m26:1339217,m70:2866760,f26:1946840,f70:3407816},
    {age:'90–99',m26:292729,m70:1027000,f26:707447,f70:1441159},
    {age:'100+',m26:5484,m70:47143,f26:31516,f70:111656}
  ];

  const spending = [
    [2002,11.8],[2014,14.1],[2019,13.7],[2020,14.7],[2022,13.6],[2025,14.1],[2030,14.1],[2045,14.2],[2070,15.3]
  ];

  const partyPressure = {
    actuel:{work:3, revenue:1, pensions:.3, capital:.5, label:'Âge et durée restent le levier le plus structurant.'},
    lfi:{work:.2, revenue:3, pensions:1.2, capital:.2, label:'Le déplacement principal est vers davantage de recettes et de cotisations.'},
    ps:{work:1.4, revenue:2.7, pensions:.8, capital:.2, label:'Recettes supplémentaires et durée de cotisation, avec un âge-plancher plus bas.'},
    rn:{work:2.3, revenue:.7, pensions:.3, capital:1.6, label:'Ligne 2026 instable : durée de cotisation et capitalisation sont discutées.'},
    attal:{work:2.8, revenue:.6, pensions:.2, capital:2.1, label:'Durée de cotisation + une dose de capitalisation.'},
    notre:{work:1.2, revenue:1.8, pensions:2.4, capital:3, label:'Effort plus distribué, avec un nouveau flux futur issu d’un capital collectif.'}
  };

  const archPos = {
    payg:{x:16,y:30}, collective:{x:53,y:18}, swiss:{x:65,y:46}, usa:{x:72,y:69}, libertarian:{x:88,y:82}
  };

  function rewriteHero() {
    const root = $('.hero-stats');
    if (!root) return;
    root.innerHTML = `
      <article><span class="stat-label">65+ pour 100 personnes de 20–64 ans</span><strong><span class="accent">24</span> → 40 → <span class="accent">62</span></strong><small>1970 observé → 2026 → 2070 scénario central Insee</small></article>
      <article class="v4-convention"><span class="stat-label">Le « déficit » dépend de la convention</span><strong>57 Md€</strong><small>de ressources 2025 sont déjà classées par le COR comme contributions ou subventions d’équilibre. Le solde publié vient après ces flux.</small></article>
      <article><span class="stat-label">Dépenses brutes de retraite</span><strong>422,2 Md€</strong><small>2025 · 14,1 % du PIB · 24,3 % des dépenses publiques</small></article>`;
  }

  function rewriteDemography() {
    const root = $('#demographie');
    if (!root) return;
    root.innerHTML = `
      <div class="section-head split-head">
        <div><p class="eyebrow dark">01 · La forme du pays</p><h2>La pyramide devient une toupie.</h2></div>
        <p class="section-intro">Le vieillissement ne commence pas en 2026. Le ratio des 65+ aux 20–64 ans est passé d’environ <b>24 pour 100 en 1970</b> à <b>40 en 2026</b>. Dans le scénario central Insee, il monte à <b>62 en 2070</b>.</p>
      </div>
      <div class="demo-v4-grid">
        <article class="demo-history">
          <div class="demo-history-head"><div><span class="data-badge observed">1970–2026 observé</span><h3>Le vieillissement est déjà là.</h3></div><span class="data-badge projection">2027–2070 projeté</span></div>
          <svg id="dependencyChart" viewBox="0 0 900 380" role="img" aria-label="Rapport des 65 ans ou plus aux 20 à 64 ans, historique et projections"></svg>
          <div class="v4-history-caption"><span><b>1970 · 24</b><br>65+ pour 100 personnes de 20–64 ans</span><span><b>2026 · 40</b><br>le changement est déjà massif</span><span><b>2070 · 50 à 78</b><br>selon les scénarios Insee ; central ≈ 62</span></div>
        </article>
        <article class="age-pyramid-card">
          <div class="pyramid-head"><div><span class="data-badge projection">Insee · effectifs par sexe et âge</span><h3>Une vraie pyramide des âges.</h3></div><div class="pyramid-switch" role="group" aria-label="Année de la pyramide"><button class="active" data-pyramid-year="2026">2026</button><button data-pyramid-year="2070">2070</button></div></div>
          <div class="pyramid-legend"><span>Hommes ←</span><span>âge</span><span>→ Femmes</span></div>
          <div class="pyramid" id="agePyramid"></div>
          <div class="pyramid-summary" id="pyramidSummary"></div>
        </article>
      </div>
      <div class="demo-v4-punch">
        <article><b>−8,9 M</b><span>de moins de 45 ans entre 2026 et 2070</span></article>
        <article><b>+5,8 M</b><span>de personnes de 65 ans ou plus</span></article>
        <article><b>+4,6 M</b><span>de personnes de 80 ans ou plus</span></article>
      </div>
      <p class="source-line">Source : <a href="${SOURCE.insee}" target="_blank" rel="noreferrer">Insee, projections de population 2026</a>. Jusqu’en 2026 : bilan démographique ; après 2026 : scénarios, pas certitudes.</p>`;
  }

  function rewriteMoney() {
    const thousand = $('.thousand-card');
    if (thousand) {
      thousand.classList.add('v4-thousand');
      thousand.innerHTML = `
        <div class="card-topline"><span class="data-badge observed">Ventilation 2023</span><span>Direction du Budget · Insee</span></div>
        <h3>Si on ramène la dépense publique à 1 000 €, où part l’argent ?</h3>
        <div class="v4-source-clarifier"><b>Pourquoi je ne l’appelle plus « 1 000 € de prélèvements » :</b> la publication officielle formule ainsi son infographie, mais elle représente des postes de dépenses. Comme les dépenses publiques dépassent les prélèvements lorsqu’il y a déficit, cette page l’utilise comme <b>ventilation normalisée de 1 000 € de dépenses</b>, pas comme un budget parfaitement équilibré.</div>
        <div class="treemap" id="treemap" aria-label="Ventilation normalisée de 1 000 euros de dépenses publiques"></div>
        <p class="caption"><b>253 €</b> vont aux retraites dans cette ventilation, <b>201 €</b> à la santé et <b>88 €</b> à l’éducation. Total affiché : 1 000 €.</p>
        <p class="source-line"><a href="${SOURCE.budget}" target="_blank" rel="noreferrer">Source : Direction du Budget / Insee, données 2023</a></p>`;
    }
    const story = $('.money-story');
    if (story) {
      story.className = 'spending-story';
      story.innerHTML = `
        <span class="data-badge observed">Histoire + projection</span>
        <div class="big-number">14,1 <small>% du PIB</small></div>
        <h3>Le bon chiffre n’est pas 422 Md€ tout seul. C’est sa trajectoire.</h3>
        <p>La part des retraites dans le PIB a déjà fortement monté depuis le début des années 2000. Elle a culminé avec les crises, puis les réformes et la croissance l’ont contenue. Le scénario COR 2026 la fait repartir à la hausse après 2045.</p>
        <svg class="spending-chart" id="spendingChart" viewBox="0 0 700 290" role="img" aria-label="Part des dépenses de retraite dans le PIB de 2002 à 2070"></svg>
        <div class="spend-caption"><span><b>2002 · 11,8 %</b> observé</span><span><b>2020 · 14,7 %</b> pic Covid / PIB comprimé</span><span><b>2025 · 14,1 %</b> observé</span><span><b>2070 · 15,3 %</b> scénario COR</span></div>
        <p class="source-line"><a href="${SOURCE.cor}" target="_blank" rel="noreferrer">COR 2026, figure 2.2</a></p>`;
    }
    const accounting = $('.accounting-block');
    if (accounting) {
      accounting.classList.add('v4-accounting');
      accounting.innerHTML = `
        <div class="accounting-v4-layout">
          <div class="accounting-v4-copy">
            <p class="v4-kicker">Le morceau caché dans les ministères</p>
            <h3>Un régime peut sembler « presque équilibré » parce que l’État augmente lui-même la recette.</h3>
            <p>Pour les fonctionnaires d’État, la contribution employeur n’est pas un taux comparable tel quel à celui d’une entreprise privée : elle sert aussi de variable d’équilibre du régime. Quand le besoin augmente, la dépense remonte dans les budgets des ministères.</p>
            <div class="accounting-kpi"><strong>82,28 %</strong><span>du traitement indiciaire pour les civils en 2026. C’était 55,71 % en 2008.</span></div>
            <p>Le Sénat le dit explicitement : toute hausse du taux se répercute sur les dépenses de personnel des ministères. L’IPP propose donc une autre convention pour isoler ce qui ressemble à une cotisation employeur « normale » de ce qui relève de la solidarité / subvention.</p>
          </div>
          <div class="rate-timeline">
            <div class="rate-timeline-label">Taux de contribution employeur État · civils</div>
            <div class="rate-points">
              <div class="rate-point" style="--lift:0px"><b>55,71 %</b><span>2008</span><small>avant remontée</small></div>
              <div class="rate-point" style="--lift:22px"><b>71,78 %</b><span>2013</span><small>+16 pts</small></div>
              <div class="rate-point" style="--lift:30px"><b>74,28 %</b><span>2014–24</span><small>plateau</small></div>
              <div class="rate-point" style="--lift:42px"><b>78,28 %</b><span>2025</span><small>+4 pts</small></div>
              <div class="rate-point" style="--lift:55px"><b>82,28 %</b><span>2026</span><small>+4 pts</small></div>
            </div>
            <div class="rate-benchmark">34,7 % · taux comparable utilisé par l’IPP dans sa convention alternative</div>
          </div>
        </div>
        <div class="accounting-bridge">
          <div><span class="bridge-label">Budget enseignement scolaire 2023 affiché</span><div class="bridge-number">81,3 Md€</div></div>
          <div class="bridge-arrow">→</div>
          <div><span class="bridge-label">Même politique publique, convention IPP</span><div class="bridge-number orange">70,7 Md€</div></div>
        </div>
        <div class="accounting-warning"><strong>Ce n’est pas 10,6 Md€ d’économie.</strong> C’est exactement le point : une partie du coût des retraites est comptée dans les budgets ministériels. Changer la convention déplace le coût, il ne le fait pas disparaître.</div>
        <div class="balance-conventions">
          <article class="primary"><span>Solde COR 2025 · après recettes d’équilibre</span><strong>−5,1 Md€</strong><p>Solde publié hors produits/charges financiers. Correct dans la convention COR, mais insuffisant pour raconter l’effort public complet.</p></article>
          <article><span>Ressources d’équilibre dans les comptes COR 2025</span><strong>57,0 Md€</strong><p>49,3 Md€ de contributions d’équilibre + 7,7 Md€ de subventions d’équilibre. Ce n’est pas un « déficit caché » de 57 Md€, mais cela montre pourquoi −5 Md€ n’est pas le coût économique total.</p></article>
          <article><span>Convention alternative IPP</span><strong>18 à 25,8 Md€</strong><p>18 Md€ de subvention implicite liée au déséquilibre démographique ; 25,8 Md€ dans le reclassement plus large proposé par l’IPP. Année et périmètre différents : on ne les additionne pas au solde COR.</p></article>
        </div>
        <p class="source-line"><a href="${SOURCE.cor}" target="_blank" rel="noreferrer">COR 2026</a> · <a href="${SOURCE.senate}" target="_blank" rel="noreferrer">Sénat, CAS Pensions 2026</a> · <a href="${SOURCE.ipp}" target="_blank" rel="noreferrer">IPP, convention comptable</a></p>`;
    }
  }

  function rewriteProposalTimeline() {
    const section = $('#proposition');
    if (!section) return;
    const flow = $('.proposal-flow', section);
    if (flow) {
      flow.innerHTML = `
        <article><span>2026</span><h3>20,7 Md€</h3><p>FRR existant. La répartition finance presque tout le flux courant.</p></article>
        <div class="flow-arrow">→</div>
        <article><span>2040</span><h3>≈ 715 Md€</h3><p>Avec 40 Md€/an et 3 % réel, le fonds devient visible mais reste en phase d’accumulation.</p></article>
        <div class="flow-arrow">→</div>
        <article class="highlight"><span>2050</span><h3>≈ 1 419 Md€</h3><p>Le rendement composé commence à peser autant que les nouveaux versements.</p></article>
        <div class="flow-arrow">→</div>
        <article><span>2070</span><h3>≈ 3 638 Md€</h3><p>À 2,5 % de prélèvement : ≈ 91 Md€/an. Scénario mécanique, pas promesse de rendement.</p></article>`;
    }
    const head = $('.section-intro.wide', section);
    if (head) head.textContent = "La question intéressante n'est pas seulement « qui possède le fonds ? », mais comment sa place évolue dans le temps. Le scénario central ci-dessous montre la transition : au début il coûte, puis le rendement composé commence à créer un nouveau flux.";
  }

  function rewritePolitics() {
    const root = $('#politiques');
    if (!root) return;
    root.innerHTML = `
      <div class="politics-v4-head">
        <p class="eyebrow">08 · Politiques 2026</p>
        <h2>La même facture.<br>Pas le même payeur.</h2>
        <p>Oublie le tableau de programmes. Le vrai clivage est plus simple : <b>quel levier chaque projet accepte de pousser</b> — durée de travail, recettes, effort sur les pensions élevées, ou capitalisation.</p>
      </div>
      <div class="party-picker v4-picker" role="tablist" id="partyPicker"></div>
      <div class="politics-stage" id="politicsStage"></div>
      <div class="politics-quote" id="politicsQuote"></div>
      <div class="arch-map-wrap">
        <div class="arch-map-head"><div><p class="eyebrow">Architectures, pas partis</p></div><div><h3>Deux questions suffisent : qui possède le capital, et combien le système en utilise ?</h3><p>Cette carte est qualitative. Elle sert à comparer la logique institutionnelle, pas à prétendre que la Suisse ou les États-Unis ont « x % de capitalisation » exactement comparable à la France.</p></div></div>
        <div class="arch-map" id="archMap"><div class="arch-axis-x"><span>Financement surtout courant</span><span>Capital accumulé important</span></div><div class="arch-axis-y"><span>Collectif / public</span><span>Individuel / privé</span></div><div class="arch-explain" id="archExplain"></div></div>
      </div>`;
  }

  function rewriteFinal() {
    const root = $('.final-choice');
    if (!root) return;
    root.classList.add('v4-final');
    root.innerHTML = `<div class="final-inner">
      <p class="eyebrow">09 · Ce qu’on ne peut pas éviter</p>
      <h2>2070 n’est pas un âge.<br><span>C’est une facture.</span></h2>
      <p class="final-thesis">La démographie fixe la contrainte. <em>La politique décide qui paie, quand, et avec quel patrimoine.</em></p>
      <div class="final-equation">
        <article><span>65+ / 20–64</span><strong>≈ 62 / 100</strong><small>scénario central Insee</small></article>
        <article><span>Cotisants par retraité</span><strong>≈ 1,3</strong><small>projection COR 2070</small></article>
        <article><span>Dépenses retraites / PIB</span><strong>≈ 15,3 %</strong><small>scénario COR 2070</small></article>
      </div>
      <p>On peut déplacer l’effort entre plusieurs endroits. On ne peut pas le faire disparaître.</p>
      <div class="final-choices"><span>travailler plus longtemps</span><span>prélever davantage</span><span>faire évoluer les pensions relatives</span><span>augmenter l’emploi/productivité</span><span>accumuler du capital</span><span>laisser davantage de dette</span></div>
    </div>`;
  }

  function rewriteMethod() {
    const root = $('#methode');
    if (!root) return;
    root.classList.add('v4-method');
    root.innerHTML = `
      <div class="section-head"><div><p class="eyebrow dark">10 · Coulisses</p><h2>Comment lire les chiffres.</h2></div><p class="v4-note">La méthode doit être disponible pour l’audit, pas casser la conclusion du récit.</p></div>
      <div class="method-details">
        <details><summary>Observé, projection, simulation : quelle différence ?</summary><p><b>Observé</b> = mesure passée. <b>Projection officielle</b> = scénario institutionnel sous hypothèses explicites. <b>Position politique</b> = document ou déclaration datée. <b>Simulation du site</b> = calcul mécanique documenté dans MODEL.md.</p></details>
        <details><summary>Pourquoi le « déficit des retraites » n’a pas un chiffre unique ?</summary><p>Parce que les ressources de certains régimes publics incluent des contributions et subventions d’équilibre. Le site affiche donc le solde COR, mais aussi les flux d’équilibre et la convention alternative de l’IPP au lieu de faire croire qu’un seul nombre décrit tout.</p></details>
        <details><summary>Qu’est-ce qui est volontairement simplifié ?</summary><p>Le fonds utilise rendement réel et versement annuel constants ; le laboratoire additionne des effets en points de PIB ; la carte politique est qualitative. Ces objets expliquent des mécanismes, ils ne remplacent pas un modèle macroéconomique complet.</p></details>
      </div>
      <div class="method-links"><a href="MODEL.md">Lire MODEL.md →</a><a href="#sources">Voir toutes les sources →</a></div>`;
    const sources = $('#sources'); if (sources) sources.classList.add('v4-sources');
  }

  function initNavigation() {
    const toggle = $('#menuToggle'), nav = $('#siteNav');
    toggle?.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
    $$('#siteNav a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));
    const progress = $('#scrollProgress');
    const update = () => {
      if (progress) progress.style.width = `${clamp(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight), 0, 1) * 100}%`;
      const sections = $$('[data-nav]'); let active = null;
      sections.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .42) active = s.dataset.nav; });
      $$('#siteNav a').forEach(a => a.classList.toggle('active', active && a.getAttribute('href') === `#${active}`));
    };
    addEventListener('scroll', update, { passive:true }); update();
  }

  function pathFor(series, x, y) { return series.map((d,i) => `${i?'L':'M'}${x(d[0]).toFixed(1)},${y(d[1]).toFixed(1)}`).join(' '); }

  function drawDependency() {
    const svg = $('#dependencyChart'); if (!svg) return; svg.innerHTML='';
    const w=900,h=380,m={l:58,r:32,t:28,b:42};
    const x = yr => m.l + (yr-1970)/(2070-1970)*(w-m.l-m.r);
    const y = v => m.t + (80-v)/(80-20)*(h-m.t-m.b);
    [20,30,40,50,60,70,80].forEach(v => { const l=svgEl('line',{x1:m.l,x2:w-m.r,y1:y(v),y2:y(v),class:'v4-gridline'}); svg.append(l); const t=svgEl('text',{x:m.l-10,y:y(v)+4,'text-anchor':'end',class:'v4-axis'}); t.textContent=v; svg.append(t); });
    [1970,1990,2010,2026,2040,2070].forEach(v=>{const t=svgEl('text',{x:x(v),y:h-14,'text-anchor':v===1970?'start':v===2070?'end':'middle',class:'v4-axis'});t.textContent=v;svg.append(t)});
    const obs=dependency.filter(d=>d[0]<=2026), proj=dependency.filter(d=>d[0]>=2026);
    svg.append(svgEl('path',{d:pathFor(depYoung,x,y),class:'v4-scenario young'}),svgEl('path',{d:pathFor(depOld,x,y),class:'v4-scenario old'}));
    svg.append(svgEl('path',{d:pathFor(obs,x,y),class:'v4-observed'}),svgEl('path',{d:pathFor(proj,x,y),class:'v4-projected'}));
    svg.append(svgEl('line',{x1:x(2026),x2:x(2026),y1:m.t,y2:h-m.b,class:'v4-boundary'}));
    const lab=svgEl('text',{x:x(2026)+8,y:m.t+15,class:'v4-proj-label'}); lab.textContent='projection →'; svg.append(lab);
    [[1970,23.71,'24'],[2026,40.14,'40'],[2070,61.92,'62']].forEach(([yr,v,label])=>{const c=svgEl('circle',{cx:x(yr),cy:y(v),r:6,class:'spend-dot'});svg.append(c);const t=svgEl('text',{x:x(yr)+(yr===2070?-10:10),y:y(v)-12,'text-anchor':yr===2070?'end':'start',class:'v4-label'});t.textContent=label;svg.append(t)});
    const lo=svgEl('text',{x:x(2070)-8,y:y(50.17)+18,'text-anchor':'end',class:'v4-axis'});lo.textContent='scénario jeune 50';svg.append(lo);
    const hi=svgEl('text',{x:x(2070)-8,y:y(77.88)-7,'text-anchor':'end',class:'v4-axis'});hi.textContent='scénario âgé 78';svg.append(hi);
  }

  let pyramidYear = 2026;
  function renderPyramid() {
    const root=$('#agePyramid'); if(!root)return; root.innerHTML='';
    const max = Math.max(...pyramidBins.flatMap(d => [pyramidYear===2026?d.m26:d.m70,pyramidYear===2026?d.f26:d.f70]));
    pyramidBins.forEach(d=>{
      const m=pyramidYear===2026?d.m26:d.m70, f=pyramidYear===2026?d.f26:d.f70;
      const row=document.createElement('div');row.className='pyramid-row';
      row.innerHTML=`<div class="pyramid-side left"><span class="pyramid-value">${fmt(m/1e6,1)} M</span><i class="pyramid-bar" style="width:${m/max*100}%"></i></div><div class="pyramid-age">${d.age}</div><div class="pyramid-side right"><i class="pyramid-bar" style="width:${f/max*100}%"></i><span class="pyramid-value">${fmt(f/1e6,1)} M</span></div>`;
      root.append(row);
    });
    const summary=$('#pyramidSummary');
    if(pyramidYear===2026) summary.innerHTML='<div><span>Population</span><b>69,1 M</b></div><div><span>65 ans ou +</span><b>15,3 M</b></div><div class="hot"><span>80 ans ou +</span><b>4,3 M</b></div>';
    else summary.innerHTML='<div><span>Population</span><b>65,9 M</b></div><div><span>65 ans ou +</span><b>21,1 M</b></div><div class="hot"><span>80 ans ou +</span><b>8,9 M</b></div>';
    $$('[data-pyramid-year]').forEach(b=>b.classList.toggle('active',Number(b.dataset.pyramidYear)===pyramidYear));
  }
  function initPyramid(){ $$('[data-pyramid-year]').forEach(b=>b.addEventListener('click',()=>{pyramidYear=Number(b.dataset.pyramidYear);renderPyramid()})); renderPyramid(); }

  function initTreemap() {
    const root=$('#treemap'); if(!root)return; root.innerHTML='';
    const rows=[D.thousandEuros.slice(0,3),D.thousandEuros.slice(3,5),D.thousandEuros.slice(5)];
    const totals=rows.map(r=>r.reduce((s,x)=>s+x.value,0));
    rows.forEach((row,ri)=>{const rr=document.createElement('div');rr.className='treemap-row';rr.style.height=`${totals[ri]/10}%`;row.forEach(item=>{const el=document.createElement('div');el.className=`treemap-item ${item.className}`;el.style.flex=`${item.value} 1 0`;el.innerHTML=`<b>${item.value} €</b><span>${item.label}</span>`;rr.append(el)});root.append(rr)});
  }

  function drawSpending() {
    const svg=$('#spendingChart');if(!svg)return;svg.innerHTML='';const w=700,h=290,m={l:45,r:22,t:20,b:36};
    const x=yr=>m.l+(yr-2002)/(2070-2002)*(w-m.l-m.r);const y=v=>m.t+(16-v)/(16-11)*(h-m.t-m.b);
    [11,12,13,14,15,16].forEach(v=>{svg.append(svgEl('line',{x1:m.l,x2:w-m.r,y1:y(v),y2:y(v),class:'v4-gridline'}));const t=svgEl('text',{x:m.l-8,y:y(v)+4,'text-anchor':'end',class:'v4-axis'});t.textContent=`${v}%`;svg.append(t)});
    [2002,2014,2025,2045,2070].forEach(v=>{const t=svgEl('text',{x:x(v),y:h-10,'text-anchor':v===2002?'start':v===2070?'end':'middle',class:'v4-axis'});t.textContent=v;svg.append(t)});
    const obs=spending.filter(d=>d[0]<=2025),proj=spending.filter(d=>d[0]>=2025);svg.append(svgEl('path',{d:pathFor(obs,x,y),class:'spend-observed'}),svgEl('path',{d:pathFor(proj,x,y),class:'spend-projected'}));
    spending.forEach(([yr,v])=>{if([2002,2014,2020,2025,2070].includes(yr))svg.append(svgEl('circle',{cx:x(yr),cy:y(v),r:5,class:'spend-dot'}))});
    const boundary=svgEl('line',{x1:x(2025),x2:x(2025),y1:m.t,y2:h-m.b,class:'v4-boundary'});svg.append(boundary);const covid=svgEl('text',{x:x(2020),y:y(14.7)-12,'text-anchor':'middle',class:'spend-covid'});covid.textContent='Covid';svg.append(covid);
  }

  function fundProjection(initial, annual, ratePct, years){let c=initial;const out=[[0,c]];for(let i=1;i<=years;i++){c=c*(1+ratePct/100)+annual;out.push([i,c])}return out}
  function drawFund(series){const svg=$('#fundChart');if(!svg)return;svg.innerHTML='';const w=900,h=380,m={l:62,r:28,t:24,b:40};const max=Math.max(...series.map(d=>d[1]))*1.08;const years=series.at(-1)[0];const x=v=>m.l+v/years*(w-m.l-m.r),y=v=>m.t+(1-v/max)*(h-m.t-m.b);for(let i=0;i<5;i++){const gy=m.t+i*(h-m.t-m.b)/4;svg.append(svgEl('line',{x1:m.l,x2:w-m.r,y1:gy,y2:gy,class:'fund-grid'}));const t=svgEl('text',{x:m.l-10,y:gy+4,'text-anchor':'end',class:'fund-axis'});t.textContent=`${fmt(max*(1-i/4),0)} Md€`;svg.append(t)}const d=series.map((p,i)=>`${i?'L':'M'}${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join(' ');svg.append(svgEl('path',{d,class:'fund-line'}));[0,Math.round(years/2),years].forEach(yr=>{const t=svgEl('text',{x:x(yr),y:h-12,'text-anchor':yr===0?'start':yr===years?'end':'middle',class:'fund-axis'});t.textContent=yr?`+${yr} ans`:'départ';svg.append(t)})}
  function updateFund(){const annual=Number($('#fundAnnual')?.value||40),rate=Number($('#fundReturn')?.value||3),years=Number($('#fundYears')?.value||40),draw=Number($('#fundDraw')?.value||2.5);if($('#fundAnnualOut'))$('#fundAnnualOut').textContent=`${fmt(annual,0)} Md€`;if($('#fundReturnOut'))$('#fundReturnOut').textContent=`${fmt(rate,2)} %`;if($('#fundYearsOut'))$('#fundYearsOut').textContent=`${years} ans`;if($('#fundDrawOut'))$('#fundDrawOut').textContent=`${fmt(draw,2)} %`;const s=fundProjection(D.meta.fundInitialBn,annual,rate,years),cap=s.at(-1)[1],pay=cap*draw/100;if($('#fundCapital'))$('#fundCapital').textContent=`${fmt(cap,0)} Md€`;if($('#fundPayout'))$('#fundPayout').textContent=`${fmt(pay,0)} Md€/an`;if($('#fundVsPensions'))$('#fundVsPensions').textContent=`≈ ${fmt(pay/D.meta.pensionSpendBn2025*100,0)} % des dépenses 2025`;drawFund(s)}
  function initFund(){['fundAnnual','fundReturn','fundYears','fundDraw'].forEach(id=>$(`#${id}`)?.addEventListener('input',updateFund));$('#fundReset')?.addEventListener('click',()=>{$('#fundAnnual').value=40;$('#fundReturn').value=3;$('#fundYears').value=40;$('#fundDraw').value=2.5;updateFund()});updateFund()}

  function updateLevers(){const a=Number($('#levyRevenue')?.value||.5),b=Number($('#levyPension')?.value||.5),c=Number($('#levyWork')?.value||.5);if($('#levyRevenueOut'))$('#levyRevenueOut').textContent=`${fmt(a,1)} pt de PIB`;if($('#levyPensionOut'))$('#levyPensionOut').textContent=`${fmt(b,1)} pt de PIB`;if($('#levyWorkOut'))$('#levyWorkOut').textContent=`${fmt(c,1)} pt de PIB`;const gap=-2.4+a+b+c;if($('#gapAfter'))$('#gapAfter').textContent=`${gap>0?'+':''}${fmt(gap,1)} % PIB`;const rem=Math.max(0,-gap);if($('#gapMeter')){$('#gapMeter').style.width=`${clamp(rem/2.4,0,1)*100}%`;$('#gapMeter').style.background=rem>1.2?'#ff5a1f':rem>.2?'#ffd52a':'#5eb785'}}
  function initLevers(){['levyRevenue','levyPension','levyWork'].forEach(id=>$(`#${id}`)?.addEventListener('input',updateLevers));updateLevers()}

  let activeParty='actuel';
  function renderPolitics(){const p=D.parties[activeParty],q=partyPressure[activeParty],stage=$('#politicsStage');if(!p||!stage)return;const logo=p.logo?`<img src="${p.logo}" alt="Logo ${p.label}">`:`<span>${activeParty==='notre'?'R/70':'FR'}</span>`;const dims=[['Âge / durée de travail',q.work],['Recettes / cotisations / impôts',q.revenue],['Effort sur pensions élevées',q.pensions],['Capitalisation / patrimoine futur',q.capital]];stage.innerHTML=`<div class="politics-identity"><div class="politics-logo">${logo}</div><div class="politics-status">${p.status}</div><h3>${p.label}</h3><p class="politics-summary">${p.summary}</p></div><div class="politics-pressure"><div class="pressure-title"><h3>Où le projet pousse le levier ?</h3><span>lecture qualitative · 0 à 3</span></div>${dims.map(([name,val])=>`<div class="pressure-row"><span>${name}</span><div class="pressure-track"><i style="--w:${val/3*100}%"></i></div><b>${val<.7?'faible':val<1.7?'modéré':val<2.6?'fort':'très fort'}</b></div>`).join('')}<div class="pressure-disclaimer">Cette intensité est une synthèse éditoriale des positions citées, pas le chiffrage officiel d’un programme. L’objectif est de rendre le mécanisme comparable sans inventer des milliards.</div></div>`;
    const sourceLinks=p.sources.map(id=>D.sources[id]).filter(Boolean).map(s=>`<a href="${s.url}" target="_blank" rel="noreferrer">${s.institution} ↗</a>`).join(' · ');$('#politicsQuote').innerHTML=`<p><b>${q.label}</b><br>${p.answers.map(x=>x.a).join(' ')}</p><div>${sourceLinks}</div>`;$$('.party-button').forEach(b=>{b.classList.toggle('active',b.dataset.party===activeParty);b.setAttribute('aria-selected',String(b.dataset.party===activeParty))})}
  function initPolitics(){const picker=$('#partyPicker');if(!picker)return;Object.entries(D.parties).forEach(([key,p])=>{const b=document.createElement('button');b.type='button';b.className='party-button';b.dataset.party=key;b.setAttribute('role','tab');b.innerHTML=`${p.logo?`<img src="${p.logo}" alt="">`:''}<span>${p.label}</span>`;b.addEventListener('click',()=>{activeParty=key;renderPolitics()});picker.append(b)});renderPolitics();const map=$('#archMap');D.architectures.forEach(a=>{const pos=archPos[a.key];if(!pos)return;const b=document.createElement('button');b.type='button';b.className=`arch-point ${a.key==='collective'?'ours':''}`;b.style.setProperty('--x',`${pos.x}%`);b.style.setProperty('--y',`${pos.y}%`);b.dataset.arch=a.key;b.textContent=a.label;b.addEventListener('click',()=>renderArch(a.key));map.append(b)});renderArch('collective')}
  function renderArch(key){const a=D.architectures.find(x=>x.key===key);if(!a)return;$$('.arch-point').forEach(b=>b.classList.toggle('active',b.dataset.arch===key));const src=a.source&&D.sources[a.source]?` <a href="${D.sources[a.source].url}" target="_blank" rel="noreferrer">Source ↗</a>`:'';$('#archExplain').innerHTML=`<b>${a.label}</b><p><strong>${a.title}</strong><br>${a.text}${src}</p>`}

  let sourceCategory='Toutes';
  function renderSources(){const root=$('#sourceList');if(!root)return;root.innerHTML='';Object.entries(D.sources).filter(([,s])=>sourceCategory==='Toutes'||s.category===sourceCategory).forEach(([id,s])=>{const a=document.createElement('article');a.className='source-card';a.id=`source-${id}`;a.innerHTML=`<div class="source-meta"><b>${s.institution}</b>${s.category}<br>${s.date}</div><div><h3>${s.title}</h3><p>${s.supports}</p></div><a href="${s.url}" target="_blank" rel="noreferrer">↗</a>`;root.append(a)})}
  function initSources(){const filters=$('#sourceFilters');if(!filters)return;filters.innerHTML='';['Toutes',...new Set(Object.values(D.sources).map(s=>s.category))].forEach(cat=>{const b=document.createElement('button');b.type='button';b.className='source-filter';b.textContent=cat;b.classList.toggle('active',cat===sourceCategory);b.addEventListener('click',()=>{sourceCategory=cat;$$('.source-filter').forEach(x=>x.classList.toggle('active',x===b));renderSources()});filters.append(b)});renderSources()}

  rewriteHero();
  rewriteDemography();
  rewriteMoney();
  rewriteProposalTimeline();
  rewritePolitics();
  rewriteFinal();
  rewriteMethod();
  initNavigation();
  drawDependency();
  initPyramid();
  initTreemap();
  drawSpending();
  initFund();
  initLevers();
  initPolitics();
  initSources();
})();