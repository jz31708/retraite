document.getElementById('main').insertAdjacentHTML('beforeend', String.raw`
<section class="hero section-pad">
  <div class="hero-copy reveal">
    <p class="eyebrow">Une proposition de gauche</p>
    <h1>La répartition protège. Elle ne peut pas tout porter seule.</h1>
    <p class="hero-lead">On garde la solidarité. On protège les petites pensions. On demande un effort aux pensions élevées. Et on construit, enfin, un patrimoine collectif qui produit des revenus pour les générations suivantes.</p>
    <div class="hero-actions">
      <a class="button primary" href="#constat">Voir le problème</a>
      <a class="button ghost" href="#proposition">Voir la proposition</a>
    </div>
  </div>
  <div class="hero-numbers reveal" aria-label="Trois chiffres clés">
    <article>
      <span class="big-number">422,2</span>
      <span class="unit">Md€ par an</span>
      <p>de dépenses brutes de retraite en 2025.</p>
      <a class="source-link" href="https://www.cor-retraites.fr/sites/default/files/2026-06/RA_2026_def.pdf" target="_blank" rel="noreferrer">COR 2026</a>
    </article>
    <article>
      <span class="big-number">1,77</span>
      <span class="unit">cotisant</span>
      <p>par retraité, tous régimes, en 2023.</p>
      <a class="source-link" href="https://www.insee.fr/fr/statistiques/2415121" target="_blank" rel="noreferrer">Insee</a>
    </article>
    <article>
      <span class="big-number">22,2 %</span>
      <span class="unit">65 ans ou plus</span>
      <p>dans la population française au 1er janvier 2026.</p>
      <a class="source-link" href="https://www.insee.fr/fr/statistiques/8719824" target="_blank" rel="noreferrer">Insee</a>
    </article>
  </div>
</section>

<section class="section-pad demography" id="constat">
  <div class="section-heading reveal">
    <p class="eyebrow">Le changement qu'on ne vote pas</p>
    <h2>La France de la retraite par répartition n'a plus la même forme.</h2>
    <p>Les cotisations d'aujourd'hui paient les pensions d'aujourd'hui. Quand la structure par âge change, l'équation change avec elle.</p>
  </div>

  <div class="age-compare reveal">
    <article class="age-panel">
      <div class="age-panel-head"><strong>1950</strong><span>profil par âge, total hommes + femmes</span></div>
      <div class="age-shape" id="ageShape1950" role="img" aria-label="Profil de population de la France par âge en 1950"></div>
      <p class="age-caption">Une base jeune, peu de très vieux.</p>
    </article>
    <div class="age-middle" aria-hidden="true"><span>76 ans</span><i></i></div>
    <article class="age-panel">
      <div class="age-panel-head"><strong>2022</strong><span>profil par âge, données Insee</span></div>
      <div class="age-shape" id="ageShapeNow" role="img" aria-label="Profil récent de population de la France par âge"></div>
      <p class="age-caption">Les générations nombreuses ont remonté la pyramide.</p>
    </article>
  </div>

  <div class="history-strip reveal" aria-label="Repères Insee 1946 et 2026">
    <div>
      <span class="history-year">1946</span>
      <strong>29,5 %</strong><small>moins de 20 ans</small>
      <strong>11,1 %</strong><small>65 ans ou plus</small>
    </div>
    <div class="history-shift">
      <span>La part des 65 ans ou plus a doublé.</span>
    </div>
    <div>
      <span class="history-year">2026</span>
      <strong>22,5 %</strong><small>moins de 20 ans</small>
      <strong>22,2 %</strong><small>65 ans ou plus</small>
    </div>
  </div>
  <p class="history-source reveal">Profil 1950 : World Population Prospects de l'ONU via PopulationPyramid.net. Profil 2022 et repères 1946/2026 : Insee. <a class="source-link" href="https://www.populationpyramid.net/fr/france/1950/" target="_blank" rel="noreferrer">1950</a> <a class="source-link" href="https://www.insee.fr/fr/statistiques/8581713?geo=FE-1&sommaire=8581745" target="_blank" rel="noreferrer">2022</a> <a class="source-link" href="https://www.insee.fr/fr/statistiques/6037741" target="_blank" rel="noreferrer">1946</a> <a class="source-link" href="https://www.insee.fr/fr/statistiques/8719824" target="_blank" rel="noreferrer">2026</a></p>

  <div class="ratio-block reveal">
    <div class="ratio-copy">
      <p class="eyebrow">Régime général</p>
      <h3>3,14 cotisants par retraité en 1975. 1,31 en 2016.</h3>
      <p>Le 1,77 de 2023 porte sur tous les régimes. On ne mélange pas les deux séries.</p>
      <a class="source-link" href="https://www.insee.fr/fr/statistiques/3676670" target="_blank" rel="noreferrer">Série CNAV et Insee</a>
    </div>
    <div class="ratio-chart" id="ratioChart" role="img" aria-label="Évolution du nombre de cotisants par retraité au régime général"></div>
  </div>
</section>

<section class="section-pad people" id="arbitrage">
  <div class="section-heading reveal">
    <p class="eyebrow">Trois personnes, pas deux camps</p>
    <h2>Protéger Monique n'oblige pas à traiter Bernard comme Monique.</h2>
    <p>Une politique de gauche peut être très protectrice en bas et demander un effort en haut. Le conflit utile n'est pas jeunes contre vieux. C'est le choix de qui absorbe l'ajustement.</p>
  </div>

  <div class="people-trio reveal">
    <article class="person-card monique">
      <div class="person-top"><span class="person-name">Monique</span><span class="person-tag">cas illustratif</span></div>
      <p class="person-meta">74 ans</p>
      <p class="person-income">1 200 € <span>de pension par mois</span></p>
      <div class="person-impact protected"><span>Dans notre proposition</span><strong>100 %</strong><span>de l'inflation compensée sur cette petite pension.</span></div>
    </article>
    <article class="person-card bernard">
      <div class="person-top"><span class="person-name">Bernard</span><span class="person-tag">cas illustratif</span></div>
      <p class="person-meta">72 ans</p>
      <p class="person-income">5 000 € <span>de pension par mois</span></p>
      <div class="person-impact"><span>Avec 2 % d'inflation</span><strong>1 200 €</strong><span>d'indexation annuelle pour préserver entièrement son pouvoir d'achat.</span></div>
    </article>
    <article class="person-card lea">
      <div class="person-top"><span class="person-name">Léa</span><span class="person-tag">cas illustratif</span></div>
      <p class="person-meta">30 ans</p>
      <p class="person-income">3 000 € <span>brut de salaire par mois</span></p>
      <div class="person-impact"><span>En répartition</span><strong>maintenant</strong><span>ses cotisations paient les pensions versées aujourd'hui. Elles ne s'accumulent pas à son nom.</span></div>
    </article>
  </div>

  <div class="choice-panel reveal">
    <div><p class="eyebrow lightish">Le système doit s'ajuster</p><h3>Qui prend l'effort ?</h3></div>
    <div class="choice-buttons" role="group" aria-label="Choisir un levier d'ajustement">
      <button class="choice active" data-choice="pension">Pensions élevées</button>
      <button class="choice" data-choice="work">Cotisations du travail</button>
      <button class="choice" data-choice="age">Âge futur</button>
      <button class="choice" data-choice="capital">Capital et patrimoine</button>
    </div>
    <p id="choiceText">Sous-indexer une pension élevée réduit son pouvoir d'achat réel sans toucher la petite pension de Monique.</p>
  </div>
</section>

<section class="section-pad magnitude" id="ordres">
  <div class="section-heading reveal">
    <p class="eyebrow">Taxer les riches, oui. Faisons les comptes.</p>
    <h2>48 milliards, c'est beaucoup. Ça ne supprime pas la démographie.</h2>
    <p>LFI ne prétend pas financer les 422 milliards de pensions avec 48 milliards d'impôts nouveaux. Le système existe déjà et dispose déjà de recettes. Le bon test est différent. Quelle marge nouvelle crée-t-on, à quels usages la promet-on, et quelle contrainte reste après ?</p>
  </div>

  <div class="magnitude-callout reveal">
    <div><span>Échelle du système</span><strong>422,2 Md€</strong><small>dépenses brutes de retraite en 2025</small></div>
    <div><span>Recettes fiscales LFI</span><strong>+48 Md€</strong><small>hauts revenus + patrimoines, selon son chiffrage</small></div>
    <div><span>Mesures retraite LFI</span><strong>+26,8 Md€</strong><small>quatre grandes lignes chiffrées dans son budget 2026</small></div>
  </div>
  <div class="magnitude-bars reveal" id="magnitudeBars" aria-label="Ordres de grandeur budgétaires"></div>
  <div class="truth-box reveal">
    <strong>Ce que ce graphique ne dit pas.</strong>
    <p>Il ne dit pas que LFI doit trouver 422 Md€ de recettes nouvelles. Il dit que 48 Md€ est une ressource annuelle supplémentaire limitée, déjà mobilisée par un programme beaucoup plus large, alors que la contrainte démographique continue d'agir sur le système de retraite.</p>
    <div class="link-row"><a class="source-link" href="https://programme.lafranceinsoumise.fr/wp-content/uploads/2024/02/Plan_UP_JUSTICE-FISCALE_web-3-1.pdf" target="_blank" rel="noreferrer">Plan fiscal LFI</a><a class="source-link" href="https://lafranceinsoumise.fr/wp-content/uploads/2025/10/Budget-2026_LFI_web_pages.pdf" target="_blank" rel="noreferrer">Budget LFI 2026</a></div>
  </div>

  <div class="stock-lab reveal">
    <div class="stock-copy">
      <p class="eyebrow">Stock contre flux</p>
      <h3>Choisis une fortune. Puis regarde ce qu'il se passe si on la dépense.</h3>
      <p>Exercice volontairement brutal. On suppose qu'un prélèvement exceptionnel est possible et qu'il n'a aucun effet secondaire. Ce n'est donc pas un argument contre l'impôt sur la fortune. C'est juste de l'arithmétique.</p>
      <label for="wealthStock">Stock saisi une fois</label>
      <input id="wealthStock" type="range" min="20" max="300" step="10" value="120">
      <div class="stock-slider-value"><span id="wealthValue">120</span> Md€</div>
    </div>
    <div class="stock-outcomes">
      <article class="outcome burn">
        <span>Si on le dépense en pensions</span>
        <strong id="monthsCovered">3,4 mois</strong>
        <p>de dépenses brutes couvertes. Puis le stock est parti.</p>
      </article>
      <article class="outcome keep">
        <span>Si on le transforme en actif collectif</span>
        <strong id="annualIncome">3,6 Md€/an</strong>
        <p>à 3 % réel illustratif, tout en conservant le stock. Ce rendement n'est pas garanti.</p>
      </article>
    </div>
  </div>
</section>
`);
