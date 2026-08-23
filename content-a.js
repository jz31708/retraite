document.getElementById('main').insertAdjacentHTML('beforeend', String.raw`
<section class="hero section-pad">
<div class="hero-copy reveal">
<p class="eyebrow">Une proposition de gauche</p>
<h1>La répartition protège. Elle ne peut pas tout porter seule.</h1>
<p class="hero-lead">Protéger les petites pensions. Faire contribuer les plus hautes. Taxer les grandes fortunes. Et transformer une partie de cette richesse en capital détenu collectivement.</p>
<div class="hero-actions">
<a class="button primary" href="#proposition">Voir la proposition</a>
<a class="button ghost" href="#partis">Comparer les partis</a>
</div>
</div>
<div aria-label="Chiffres clés" class="hero-numbers reveal">
<article>
<span class="big-number">422,2</span>
<span class="unit">Md€ par an</span>
<p>de dépenses brutes de retraite en 2025.</p>
<a class="source-link" href="https://www.cor-retraites.fr/sites/default/files/2026-06/RA_2026_def.pdf" rel="noreferrer" target="_blank">COR 2026</a>
</article>
<article>
<span class="big-number">1,77</span>
<span class="unit">cotisant</span>
<p>par retraité, tous régimes, en 2023.</p>
<a class="source-link" href="https://www.insee.fr/fr/statistiques/2415121" rel="noreferrer" target="_blank">Insee</a>
</article>
<article>
<span class="big-number">22,2 %</span>
<span class="unit">de la population</span>
<p>a 65 ans ou plus en 2026.</p>
<a class="source-link" href="https://www.insee.fr/fr/statistiques/8719824" rel="noreferrer" target="_blank">Insee</a>
</article>
</div>
</section>
<section class="section-pad demography" id="constat">
<div class="section-heading reveal">
<p class="eyebrow">1946, 2026</p>
<h2>Le pays a vieilli. Le financement n'a pas changé de nature.</h2>
<p>En répartition, les cotisations d'aujourd'hui paient les pensions d'aujourd'hui. La démographie compte donc directement.</p>
</div>
<div class="pyramid-grid reveal">
<figure class="pyramid-card">
<div class="figure-label">
<span>1950</span>
<span>ONU, WPP 2024</span>
</div>
<img alt="Pyramide des âges de la France en 1950" loading="lazy" src="https://images.populationpyramid.net/capture/?selector=%23pyramid-share-container&amp;url=https%3A%2F%2Fwww.populationpyramid.net%2Ffr%2Ffrance%2F1950%2F%3Fshare%3Dtrue"/>
<figcaption>11,4 % de la population a 65 ans ou plus. <a class="source-link" href="https://www.populationpyramid.net/fr/france/1950/" rel="noreferrer" target="_blank">Source</a></figcaption>
</figure>
<div aria-hidden="true" class="pyramid-arrow">
<span>76 ans</span>
<i></i>
</div>
<figure class="pyramid-card">
<div class="figure-label">
<span>2026</span>
<span>ONU, WPP 2024</span>
</div>
<img alt="Pyramide des âges de la France en 2026" loading="lazy" src="https://images.populationpyramid.net/capture/?selector=%23pyramid-share-container&amp;url=https%3A%2F%2Fwww.populationpyramid.net%2Ffr%2Ffrance%2F2026%2F%3Fshare%3Dtrue"/>
<figcaption>En France, l'Insee compte 22,2 % de 65 ans ou plus au 1er janvier 2026. <a class="source-link" href="https://www.populationpyramid.net/fr/france/2026/" rel="noreferrer" target="_blank">Pyramide</a></figcaption>
</figure>
</div>
<div aria-label="Comparaison de la structure par âge en 1946 et 2026" class="history-strip reveal">
<div>
<span class="history-year">1946</span>
<strong>29,5 %</strong><small>moins de 20 ans</small>
<strong>11,1 %</strong><small>65 ans ou plus</small>
</div>
<div aria-hidden="true" class="history-shift">
<span>La part des 65 ans ou plus a doublé.</span>
</div>
<div>
<span class="history-year">2026</span>
<strong>22,5 %</strong><small>moins de 20 ans</small>
<strong>22,2 %</strong><small>65 ans ou plus</small>
</div>
</div>
<p class="history-source reveal">1946, France métropolitaine. 2026, France. <a class="source-link" href="https://www.insee.fr/fr/statistiques/6037741" rel="noreferrer" target="_blank">Insee, série historique</a> <a class="source-link" href="https://www.insee.fr/fr/statistiques/8719824" rel="noreferrer" target="_blank">Insee, 2026</a></p>
<details class="method-note reveal">
<summary>Pourquoi 1950 et pas 1946 sur les pyramides ?</summary>
<div>
<p>Les ordonnances de 1945 créent le régime général. Pour comparer deux pyramides construites avec la même source et la même méthode, nous utilisons ici la série ONU disponible à partir de 1950.</p>
<p>Le repère historique Insee de 1946 donne 29,5 % de moins de 20 ans et 11,1 % de 65 ans ou plus en France métropolitaine. Nous gardons cette série pour le contrôle historique.</p>
<a class="source-link" href="https://www.insee.fr/fr/statistiques/6037741" rel="noreferrer" target="_blank">Voir la série Insee</a>
</div>
</details>
<div class="ratio-block reveal">
<div class="ratio-copy">
<p class="eyebrow">Régime général</p>
<h3>3,14 cotisants par retraité en 1975. 1,31 en 2016.</h3>
<p>Ce n'est pas la même série que le 1,77 tous régimes de 2023. On les sépare volontairement.</p>
<a class="source-link" href="https://www.insee.fr/fr/statistiques/3676670" rel="noreferrer" target="_blank">Série CNAV et Insee</a>
</div>
<div aria-label="Évolution du nombre de cotisants par retraité dans le régime général de 1975 à 2016" class="ratio-chart" id="ratioChart" role="img"></div>
</div>
</section>
<section class="section-pad people" id="arbitrage">
<div class="section-heading reveal">
<p class="eyebrow">Qui absorbe l'effort ?</p>
<h2>Bernard touche 5 000 €. Léa gagne 3 000 €. Qui prend l'effort ?</h2>
</div>
<div class="people-grid reveal">
<article class="person-card bernard">
<div class="person-top">
<span class="person-name">Bernard</span>
<span class="person-tag">cas illustratif</span>
</div>
<p class="person-meta">72 ans</p>
<p class="person-income">5 000 € <span>brut par mois de pension</span></p>
<div class="person-impact">
<span>Inflation à 2 %</span>
<strong>+1 200 €</strong>
<span>d'indexation sur un an pour conserver le même pouvoir d'achat.</span>
</div>
</article>
<div class="people-question">
<span>Qui paie l'ajustement ?</span>
<button class="choice active" data-choice="pension">Pension élevée</button>
<button class="choice" data-choice="work">Cotisations du travail</button>
<button class="choice" data-choice="age">Âge futur</button>
<button class="choice" data-choice="capital">Capital et patrimoine</button>
<p id="choiceText">Sous-indexer une pension élevée réduit son pouvoir d'achat réel. Les petites pensions peuvent rester entièrement protégées.</p>
</div>
<article class="person-card lea">
<div class="person-top">
<span class="person-name">Léa</span>
<span class="person-tag">cas illustratif</span>
</div>
<p class="person-meta">30 ans</p>
<p class="person-income">3 000 € <span>brut par mois de salaire</span></p>
<div class="person-impact">
<span>En répartition</span>
<strong>aujourd'hui</strong>
<span>ses cotisations financent les pensions versées maintenant. Elles ne vont pas sur un compte à son nom.</span>
</div>
</article>
</div>
<p class="section-footnote reveal">La question n'est pas de savoir si Bernard "mérite" sa pension. La question est de savoir qui supporte un ajustement quand le système en demande un.</p>
</section>
<section class="section-pad magnitude" id="ordres">
<div class="section-heading reveal">
<p class="eyebrow">Ordres de grandeur</p>
<h2>Taxer les riches, oui. Faire disparaître la démographie, non.</h2>
<p>LFI ne finance pas son projet uniquement avec les milliardaires. Son programme augmente aussi les cotisations et élargit leur assiette. Le test utile consiste à comparer les montants.</p>
</div>
<div aria-label="Comparaison des ordres de grandeur" class="magnitude-bars reveal" id="magnitudeBars"></div>
<div class="magnitude-note reveal">
<p><strong>48 Md€</strong> est le chiffrage LFI de recettes supplémentaires sur hauts revenus et patrimoines dans son plan de justice fiscale. C'est beaucoup. Cela reste très inférieur au flux annuel des retraites, et le même euro ne peut pas financer à la fois retraites, école, santé, climat et investissement.</p>
<div class="link-row">
<a class="source-link" href="https://programme.lafranceinsoumise.fr/wp-content/uploads/2024/02/Plan_UP_JUSTICE-FISCALE_web-3-1.pdf" rel="noreferrer" target="_blank">Plan fiscal LFI</a>
<a class="source-link" href="https://lafranceinsoumise.fr/wp-content/uploads/2025/10/Budget-2026_LFI_web_pages.pdf" rel="noreferrer" target="_blank">Budget LFI 2026</a>
</div>
</div>
<div class="stock-flow reveal">
<div class="stock-flow-copy">
<p class="eyebrow">Stock et flux</p>
<h3>Une fortune saisie une fois n'est pas une pension payée chaque année.</h3>
<p>Exemple volontairement extrême. Un patrimoine de 120 Md€ entièrement saisi puis dépensé couvrirait environ 3,4 mois des dépenses brutes actuelles de retraite. L'année suivante, le patrimoine a disparu. La facture revient.</p>
</div>
<div class="stock-flow-visual">
<div class="tank stock">
<span>120 Md€</span>
<small>stock hypothétique</small>
</div>
<div class="pipe"></div>
<div class="tank flow">
<span>422 Md€</span>
<small>chaque année</small>
</div>
</div>
<div class="stock-flow-turn">
<span>Autre usage du stock</span>
<div class="turn-line"></div>
<strong>Le transformer en actif collectif qui reste.</strong>
</div>
</div>
</section>
`);
