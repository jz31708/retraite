(() => {
  'use strict';

  const D = window.RETRAITE_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const set = (s, value, r = document, asHtml = false) => {
    const el = $(s, r);
    if (!el) return;
    if (asHtml) el.innerHTML = value;
    else el.textContent = value;
  };

  document.title = 'Retraites 2070 | Les chiffres et les choix';
  const description = $('meta[name="description"]');
  if (description) description.content = "Démographie, dépenses, financement des retraites, choix politiques et simulation d'un fonds public.";

  function hero() {
    const r = $('.hero');
    if (!r) return;
    set('.eyebrow', 'France · retraites · données 2026', r);
    set('h1', '<em>60, 62, 64 ans.</em><br>Le financement ne se résume pas à l\'âge de départ.', r, true);
    set('.hero-lead', "En 1970, la France comptait environ 24 personnes de 65 ans ou plus pour 100 personnes de 20 à 64 ans. En 2026, on est autour de 40. L'Insee en projette 62 en 2070 dans son scénario central. Il faut donc choisir qui travaille plus longtemps, qui paie davantage, quelles pensions progressent moins vite et si une part du financement doit venir d'un patrimoine collectif.", r);
    set('.btn-primary', 'Voir les données', r);
    set('.text-link', 'Méthode et sources', r);
    const stats = $$('.hero-stats article', r);
    if (stats[0]) {
      set('.stat-label', '65 ans ou plus pour 100 personnes de 20 à 64 ans', stats[0]);
      set('strong', '<span class="accent">24</span> → 40 → <span class="accent">62</span>', stats[0], true);
      set('small', '1970 observé, 2026 observé, 2070 scénario central Insee', stats[0]);
    }
    if (stats[1]) {
      set('.stat-label', "Ressources d'équilibre déjà comptées en 2025", stats[1]);
      set('strong', '<span class="accent">57 Md€</span>', stats[1], true);
      set('small', "49,3 Md€ de contributions et 7,7 Md€ de subventions. Le solde COR est calculé après ces versements.", stats[1]);
    }
    if (stats[2]) {
      set('.stat-label', 'Dépenses brutes de retraite en 2025', stats[2]);
      set('small', '14,1 % du PIB selon le COR', stats[2]);
    }
  }

  function demography() {
    const r = $('#demographie');
    if (!r) return;
    set('.eyebrow', '01 · Démographie', r);
    set('h2', 'La France a déjà vieilli. Le mouvement continue.', r);
    set('.section-intro', "Le vieillissement n'arrive pas en 2070. Il est déjà dans les données. Le ratio des 65 ans ou plus aux 20 à 64 ans est passé d'environ 24 pour 100 en 1970 à 40 en 2026. Le scénario central Insee arrive à 62 en 2070.", r);
    set('.demo-history h3', 'De 24 à 40 depuis 1970.', r);
    set('.age-pyramid-card h3', "2026 et 2070, tranche d'âge par tranche d'âge.", r);
    set('.v4-history-caption', '<span><b>1970 · 24</b><br>65 ans ou plus pour 100 personnes de 20 à 64 ans</span><span><b>2026 · 40</b><br>niveau observé au départ des projections</span><span><b>2070 · 50 à 78</b><br>selon les scénarios Insee, 62 dans le scénario central</span>', r, true);
  }

  function money() {
    const r = $('#argent');
    if (!r) return;
    set('.section-head .eyebrow', "02 · Ce que l'on paie", r);
    set('.section-head h2', '422 Md€ par an. Regardons ce que ce nombre recouvre.', r);
    set('.section-head .section-intro', "Les retraites sont l'un des plus gros postes de dépense publique. Pour comprendre le montant, il faut regarder son poids dans le PIB et la façon dont certains régimes publics sont financés.", r);

    const thousand = $('.v4-thousand', r);
    if (thousand) {
      set('h3', 'Sur 1 000 € de dépense publique, 253 € vont aux retraites.', thousand);
      set('.v4-source-clarifier', "La Direction du Budget présente cette ventilation comme l'usage de 1 000 € de prélèvements obligatoires. Ici, elle sert seulement à comparer la taille des postes de dépense. Les administrations publiques peuvent dépenser plus qu'elles ne prélèvent, donc ce graphique ne décrit pas un budget à l'équilibre.", thousand);
      set('.caption', '<b>253 €</b> pour les retraites, <b>201 €</b> pour la santé et <b>88 €</b> pour l\'éducation. Les postes affichés totalisent 1 000 €.', thousand, true);
    }

    const story = $('.spending-story', r);
    if (story) {
      set('h3', '422 Md€ en 2025. Pour comparer dans le temps, regardons la part du PIB.', story);
      const p = $('p:not(.source-line)', story);
      if (p) p.textContent = "Les retraites représentaient environ 11,8 % du PIB en 2002 et 14,1 % en 2025. Le pic de 2020 tient aussi à la chute du PIB pendant le Covid. Dans le scénario de référence du COR, la part reste proche de 14 % pendant encore plusieurs années puis atteint 15,3 % en 2070.";
    }

    const a = $('.v4-accounting', r);
    if (a) {
      set('.v4-kicker', "Retraites des fonctionnaires d'État", a);
      set('.accounting-v4-copy h3', 'Une partie du financement passe directement par les budgets des ministères.', a);
      const ps = $$('.accounting-v4-copy p', a);
      if (ps[0]) ps[0].textContent = "L'État verse une contribution employeur au régime de ses fonctionnaires. Ce taux sert aussi à équilibrer le régime. Il n'est donc pas comparable tel quel au taux patronal d'une entreprise privée.";
      if (ps[1]) ps[1].textContent = "Quand ce taux augmente, les dépenses de personnel des ministères augmentent aussi. L'IPP propose une autre convention pour séparer la part comparable à une cotisation employeur du reste du financement public.";
      set('.accounting-kpi', '<strong>82,28 %</strong><span>taux employeur de l\'État pour les civils en 2026. Il était de 55,71 % en 2008.</span>', a, true);
      set('.accounting-warning', '<strong>81,3 Md€ deviennent 70,7 Md€ dans la convention IPP.</strong> Aucun euro n\'est économisé. Une partie du coût quitte simplement le budget du ministère dans cette présentation comptable.', a, true);
      const cards = $$('.balance-conventions article', a);
      if (cards[0]) {
        set('span', "Solde COR 2025 après ressources d'équilibre", cards[0]);
        set('p', 'Le COR obtient ce solde après avoir compté les contributions et subventions versées pour équilibrer certains régimes.', cards[0]);
      }
      if (cards[1]) {
        set('span', "Contributions et subventions d'équilibre comptées en recettes", cards[1]);
        set('p', "49,3 Md€ de contributions et 7,7 Md€ de subventions. Ce n'est pas un déficit caché de 57 Md€. C'est du financement déjà inclus avant de calculer le solde.", cards[1]);
      }
      if (cards[2]) {
        set('span', 'Estimation IPP avec une autre convention', cards[2]);
        set('p', "L'IPP estime 18 Md€ pour le déséquilibre démographique et 25,8 Md€ avec un reclassement plus large. Le périmètre diffère du solde COR. On ne les additionne pas.", cards[2]);
      }
    }
  }

  function people() {
    const r = $('#humains');
    if (!r) return;
    set('.eyebrow', "03 · Qui supporte l'effort ?", r);
    set('h2', "24 € par mois n'ont pas le même poids pour tout le monde.", r);
    set('.section-intro', "Une sous-indexation, une hausse de cotisation ou deux années de travail en plus ne touchent pas les mêmes personnes de la même façon. Le revenu, le patrimoine, la pénibilité et l'âge d'entrée dans l'emploi changent le résultat.", r);
    const cards = $$('.person-card', r);
    if (cards[0]) {
      set('p', 'Avec 1 180 € par mois et un loyer à payer, 2 % de revalorisation en moins représentent environ 24 € par mois la première année.', cards[0]);
      set('.person-principle', 'À ce niveau de pension, 24 € comptent.', cards[0]);
    }
    if (cards[1]) {
      set('p', 'Avec 5 000 € par mois, une revalorisation de 2 % ajoute 100 € par mois, soit 1 200 € sur un an.', cards[1]);
      set('.person-principle', 'Faut-il appliquer le même taux à toutes les pensions ?', cards[1]);
    }
    if (cards[2]) {
      set('p', "Elle finance les pensions actuelles par les prélèvements sur son travail. Son salaire, lui, n'est pas automatiquement indexé sur les prix.", cards[2]);
      set('.person-principle', "Sa retraite dépendra aussi de ce que l'on construit aujourd'hui.", cards[2]);
    }
  }

  function stockFlow() {
    const r = $('#stockflux');
    if (!r) return;
    set('.eyebrow', '04 · Stock et revenu', r);
    set('h2', 'Un patrimoine est un stock.<br>Les pensions sont une dépense annuelle.', r, true);
    set('.section-intro', "Vendre un actif donne de l'argent une fois. Taxer un patrimoine chaque année peut créer une recette récurrente. Garder des actifs dans un fonds permet aussi de toucher leurs revenus sans consommer tout le capital.", r);
    const cards = $$('.stock-flow-demo article', r);
    if (cards[0]) set('p', 'Actions, immobilier, obligations, entreprises. Si on vend le stock, on obtient une ressource ponctuelle.', cards[0]);
    if (cards[1]) set('p', "Les pensions sont payées chaque mois. Il faut donc une recette qui revient chaque année, quelle qu'en soit la source.", cards[1]);
    set('.stock-thesis', 'La proposition testée ici consiste à <b>accumuler une partie du patrimoine dans un fonds collectif</b>, puis à utiliser une fraction de ses revenus pour les retraites.', r, true);
  }

  function proposal() {
    const r = $('#proposition');
    if (!r) return;
    set('.eyebrow', '05 · Le scénario testé ici', r);
    set('h2', 'Garder la répartition et construire un fonds public.', r);
    set('.section-intro', "Les cotisations continuent de payer les pensions. En parallèle, une ressource dédiée alimente un fonds public pendant plusieurs décennies. Le capital reste investi. Une fois le fonds assez gros, une partie de ses revenus peut financer les retraites.", r);
    const cards = $$('.proposal-flow article', r);
    const copy = [
      "Le FRR existe déjà. À cette échelle, il ne change pas le financement courant des retraites.",
      "Avec 40 Md€ versés chaque année et 3 % de rendement réel, le fonds atteindrait environ 715 Md€.",
      "Autour de 1 419 Md€, les gains annuels du capital commencent à compter autant que les nouveaux versements.",
      "Après 44 ans, le calcul donne environ 3 638 Md€. Un prélèvement annuel de 2,5 % représenterait environ 91 Md€ par an."
    ];
    cards.forEach((card, i) => { if (copy[i]) set('p', copy[i], card); });
    const own = $('.ownership-copy', r);
    if (own) {
      set('h3', 'Le FRR existe déjà, mais il ne pèse que 20,7 Md€.', own);
      const ps = $$('p:not(.source-line)', own);
      if (ps[0]) ps[0].textContent = "Fin 2025, le Fonds de réserve pour les retraites détenait 20,7 Md€ d'actifs. Le simulateur part de ce montant, puis teste ce qui se passerait avec des versements beaucoup plus importants.";
      if (ps[1]) ps[1].textContent = "Concentrer le fonds uniquement en France ferait dépendre l'emploi, les impôts et le portefeuille des retraites du même pays. Le scénario prévoit donc des actifs français et une diversification internationale.";
    }
  }

  function simulator() {
    const r = $('#simulateur');
    if (!r) return;
    set('.eyebrow', '06 · Calculer le fonds', r);
    set('h2', 'Que donne un fonds alimenté chaque année pendant quarante ans ?', r);
    set('.section-intro', "Choisissez le versement annuel, le rendement réel, la durée et le taux de prélèvement final. Le calcul applique les mêmes hypothèses chaque année. Il ne prévoit ni les crises de marché ni les effets économiques de la nouvelle contribution.", r);
    const notes = $$('.sim-controls small', r);
    ['montant versé au fonds chaque année', 'rendement après inflation', "durée d'accumulation", 'part du capital versée chaque année à la fin'].forEach((v, i) => { if (notes[i]) notes[i].textContent = v; });
    set('.model-caveats', '<b>Ce calcul laisse de côté plusieurs coûts.</b> Il ne modélise pas le double financement pendant la transition, les effets des nouveaux prélèvements sur l\'économie, la volatilité, les frais ni les règles d\'investissement. MODEL.md donne le détail.', r, true);
  }

  function levers() {
    const r = $('#arbitrages');
    if (!r) return;
    set('.eyebrow', "07 · Répartir l'écart", r);
    set('h2', "Testez comment répartir l'écart projeté pour 2070.", r);
    set('.section-intro', "Dans le scénario de référence du COR, le solde atteint moins 2,4 points de PIB en 2070. Les curseurs répartissent cet écart entre recettes, dépenses de pension et emploi ou durée d'activité. C'est une addition comptable, pas une prévision macroéconomique.", r);
    const gap = $('.gap-card', r);
    if (gap) {
      const ps = $$('p', gap);
      if (ps[0]) ps[0].textContent = 'Solde du scénario COR en 2070 avant ajustements';
      if (ps[1]) ps[1].textContent = 'Solde après les effets saisis';
      set('small', "Le calcul additionne des points de PIB. Il ne calcule pas les réactions de l'emploi, des salaires ou de la croissance.", gap);
    }
  }

  const partyCopy = {
    actuel: [
      "Le système reste principalement financé par répartition. La réforme de 2023 agit surtout sur l'âge et la durée de cotisation. Son calendrier est suspendu en 2026, mais aucune nouvelle architecture ne l'a remplacée.",
      ["Pas de règle générale pour demander davantage aux pensions les plus élevées.", "L'âge et la durée de cotisation restent les principaux leviers.", "Le FRR et l'épargne retraite restent secondaires.", "Le capital se partage entre FRR public et épargne privée ou d'entreprise."]
    ],
    lfi: [
      "LFI veut revenir à 60 ans avec 40 annuités. Le financement supplémentaire viendrait surtout des cotisations et de nouvelles recettes, notamment sur certains revenus financiers.",
      ["Le programme mise surtout sur une fiscalité plus progressive.", "Il réduit l'âge de départ et cherche davantage de recettes.", "La capitalisation n'est pas un pilier important du projet.", "Le FRR reste public sans devenir un grand fonds d'accumulation."]
    ],
    ps: [
      "Le projet socialiste de juillet 2026 veut abroger la réforme Borne, conserver 62 ans comme âge minimal et moduler les 43 annuités selon la pénibilité. Il cherche aussi de nouvelles recettes sur le capital.",
      ["Le projet cherche des recettes supplémentaires sur le capital.", "La durée de cotisation reste importante avec des aménagements liés à la pénibilité.", "Le projet ne crée pas de grand pilier de capitalisation.", "Aucune nouvelle architecture de propriété du capital n'est au centre du projet."]
    ],
    rn: [
      "La ligne du RN n'est pas stabilisée en 2026. Jordan Bardella parle d'un système fondé sur la durée de cotisation et d'un possible fonds souverain. Marine Le Pen défend encore un âge légal et une capitalisation volontaire.",
      ["Pas de règle stabilisée sur les pensions élevées.", "Bardella et Le Pen ne défendent pas la même règle sur l'âge légal.", "Une part de capitalisation est discutée.", "Bardella évoque un fonds souverain. Le Pen parle de capitalisation volontaire individuelle."]
    ],
    attal: [
      "Gabriel Attal propose de remplacer l'âge légal fixe par une logique davantage fondée sur la durée de cotisation. Il défend aussi une part de capitalisation.",
      ["Un effort spécifique sur les pensions élevées n'est pas au centre de la proposition.", "La durée de cotisation devient plus importante que l'âge légal fixe.", "Une part de capitalisation fait explicitement partie de la proposition.", "La forme précise du capital diffère du fonds collectif testé ici."]
    ],
    notre: [
      "Ce scénario garde un socle par répartition, protège davantage les petites pensions et demande plus d'effort aux pensions élevées. En parallèle, il construit un fonds public dont les revenus deviennent une ressource supplémentaire à long terme.",
      ["Les pensions élevées peuvent être moins revalorisées au-dessus d'un seuil protégé.", "L'effort est réparti entre recettes, emploi, pensions élevées et construction du fonds.", "Le fonds accumule du capital public pendant plusieurs décennies.", "Le capital appartient à un fonds public séparé du budget courant."]
    ]
  };

  const partyLead = {
    actuel: "Le droit actuel fait surtout porter l'ajustement sur l'âge et la durée de cotisation.",
    lfi: "LFI cherche surtout l'argent du côté des cotisations et de nouvelles recettes.",
    ps: 'Le PS combine durée de cotisation et recettes supplémentaires.',
    rn: 'Le RN discute durée de cotisation et capitalisation, sans ligne unique en 2026.',
    attal: "Attal met l'accent sur la durée de cotisation et ajoute une part de capitalisation.",
    notre: "Ce scénario répartit l'effort et ajoute un revenu à long terme avec un fonds public."
  };

  function patchData() {
    if (!D) return;
    Object.entries(partyCopy).forEach(([key, value]) => {
      const p = D.parties?.[key];
      if (!p) return;
      p.summary = value[0];
      p.answers.forEach((answer, i) => { if (value[1][i]) answer.a = value[1][i]; });
    });
    const arch = {
      payg: ['Répartition dominante', "Les pensions sont payées surtout avec les cotisations et impôts de l'année. Les ajustements passent par les recettes, l'emploi, l'âge et le niveau relatif des pensions."],
      collective: ['Répartition avec un fonds public', 'La répartition reste le socle. Un fonds public accumule des actifs en parallèle et ajoute progressivement leurs revenus au financement.'],
      swiss: ['Trois piliers', 'Un pilier public par répartition, un pilier professionnel capitalisé et un pilier privé facultatif.'],
      usa: ['Social Security et épargne capitalisée', "La Social Security fédérale coexiste avec des plans d'employeur et de l'épargne retraite individuelle."],
      libertarian: ['Filet public limité et épargne individuelle', "Archétype utilisé pour comparer les mécanismes. Il ne décrit pas le système américain réel."]
    };
    D.architectures?.forEach(a => { if (arch[a.key]) [a.title, a.text] = arch[a.key]; });
  }

  function politicsStatic() {
    const r = $('#politiques');
    if (!r) return;
    set('.politics-v4-head .eyebrow', '08 · Programmes et financement', r);
    set('.politics-v4-head h2', "Chaque programme place l'effort<br>à un endroit différent.", r, true);
    set('.politics-v4-head p', "Le comparateur montre quels leviers chaque projet utilise le plus : âge ou durée de travail, nouvelles recettes, effort sur certaines pensions, capitalisation. Il ne chiffre pas le coût des programmes.", r);
    set('.arch-map-head .eyebrow', 'Comparer les systèmes', r);
    set('.arch-map-head h3', 'Deux axes pour voir ce qui change.', r);
    set('.arch-map-head p', "Horizontalement, on passe d'un financement presque entièrement courant à une place plus importante du capital accumulé. Verticalement, on passe d'une propriété surtout collective ou publique à une propriété surtout individuelle ou privée. Les positions sont qualitatives.", r);
  }

  function politicsDynamic() {
    const r = $('#politiques');
    if (!r) return;
    set('.pressure-title h3', 'Importance de chaque levier dans la proposition', r);
    set('.pressure-title span', 'Synthèse éditoriale, de 0 à 3', r);
    set('.pressure-disclaimer', "Ces niveaux résument les textes et déclarations cités. Ce ne sont pas des chiffrages officiels et ils ne comparent pas le coût budgétaire des programmes.", r);
    const active = $('.party-button.active', r)?.dataset.party;
    const lead = $('.politics-quote p b', r);
    if (lead && active && partyLead[active]) lead.textContent = partyLead[active];
  }

  function bindPolitics() {
    const r = $('#politiques');
    if (!r) return;
    $$('.party-button', r).forEach(b => b.addEventListener('click', () => setTimeout(politicsDynamic, 0)));
  }

  function ending() {
    const r = $('.final-choice');
    if (!r) return;
    set('.eyebrow', '09 · 2070', r);
    set('h2', '62 personnes de 65 ans ou plus<br><span>pour 100 adultes de 20 à 64 ans.</span>', r, true);
    set('.final-thesis', "C'est le scénario central de l'Insee. <em>Aucun chiffre ne dit quelle politique choisir, mais les pensions devront toujours être financées.</em>", r, true);
    const ps = $$(':scope > .final-inner > p', r);
    if (ps.length) ps[ps.length - 1].textContent = "On peut répartir l'effort entre travail, prélèvements, niveau des pensions, emploi, capital et dette. Les combinaisons changent. Le besoin de financement reste là.";
  }

  function methodAndSources() {
    const m = $('#methode');
    if (m) {
      set('.eyebrow', '10 · Méthode', m);
      set('h2', "D'où viennent les chiffres ?", m);
      set('.v4-note', "Les données observées, les projections, les positions politiques et les simulations n'ont pas le même statut. Les détails sont regroupés ici pour permettre de vérifier le raisonnement.", m);
      const s = $$('summary', m);
      if (s[0]) s[0].textContent = 'Données observées, projections et simulations';
      if (s[1]) s[1].textContent = 'Pourquoi le solde dépend-il de la convention comptable ?';
      if (s[2]) s[2].textContent = 'Limites des simulateurs';
    }
    const r = $('#sources');
    if (r) {
      set('.eyebrow', '11 · Sources', r);
      set('h2', 'Sources, dates et périmètres.', r);
      set('.section-intro', "Les chiffres viennent en priorité de l'Insee, du COR, de la Direction du Budget, du Sénat et de l'IPP. Pour les positions politiques récentes, le site cite le programme ou la déclaration utilisée et sa date.", r);
      set('.update-note', 'Dernière mise à jour éditoriale : 26 août 2026. Les positions politiques peuvent changer avant 2027.', r);
    }
    const footer = $('footer span');
    if (footer) footer.textContent = 'Données, hypothèses et formules documentées dans MODEL.md.';
  }

  patchData();
  hero();
  demography();
  money();
  people();
  stockFlow();
  proposal();
  simulator();
  levers();
  politicsStatic();
  politicsDynamic();
  bindPolitics();
  ending();
  methodAndSources();
})();
