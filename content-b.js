document.getElementById('main').insertAdjacentHTML('beforeend', String.raw`
<section class="section-pad debt" id="dette">
<div class="debt-number reveal">
<span>64,7 Md€</span>
<p>d'intérêts payés en 2025 par l'ensemble des administrations publiques.</p>
<a class="source-link light" href="https://www.insee.fr/fr/statistiques/2381404" rel="noreferrer" target="_blank">Insee</a>
</div>
<div class="debt-copy reveal">
<p class="eyebrow">Dette</p>
<h2>Une dette laisse une obligation. Un investissement peut laisser un actif.</h2>
<p>Ce n'est pas un procès contre toute dépense courante. Santé, chômage, minima sociaux et éducation ont une fonction propre. Le problème apparaît quand on reporte durablement une dépense présente sur le futur sans construire de patrimoine ou de capacité productive en face.</p>
<details>
<summary>Et l'annulation de dette ?</summary>
<p>Une annulation de dette détenue par des créanciers privés est un défaut ou une restructuration. Pour la dette détenue par l'Eurosystème, une perpétualisation à taux très faible est une piste politique radicale, mais elle demanderait une rupture avec le cadre européen actuel. Elle ne crée pas un montant de cash égal à la dette annulée.</p>
<div class="link-row">
<a class="source-link light" href="https://eur-lex.europa.eu/eli/treaty/tfeu_2016/art_123/oj/eng" rel="noreferrer" target="_blank">Article 123 TFUE</a>
<a class="source-link light" href="https://www.ecb.europa.eu/pub/pdf/scpops/ecb.op273~fae24ce432.en.pdf" rel="noreferrer" target="_blank">Étude BCE</a>
</div>
</details>
</div>
</section>
<section class="section-pad proposal" id="proposition">
<div class="section-heading reveal">
<p class="eyebrow">La proposition</p>
<h2>Garder la solidarité. Construire un patrimoine commun.</h2>
<p>Le fonds ne remplace pas la répartition. Il ajoute un deuxième revenu au système, issu d'actifs détenus collectivement.</p>
</div>
<div class="proposal-grid reveal">
<article>
<span class="step">01</span>
<h3>La répartition reste.</h3>
<p>Elle finance le socle commun, les petites pensions, les carrières hachées, la maladie, le handicap, la pénibilité et les carrières longues.</p>
</article>
<article>
<span class="step">02</span>
<h3>Le bas est protégé.</h3>
<p>La règle de travail protège intégralement les petites pensions. Plus la pension monte, plus une sous-indexation peut entrer dans l'ajustement.</p>
</article>
<article>
<span class="step">03</span>
<h3>Les actifs ne paient pas seuls.</h3>
<p>Une hausse générale des prélèvements sur le travail arrive en dernier recours, pas en première réponse.</p>
</article>
<article>
<span class="step">04</span>
<h3>On taxe toujours le patrimoine.</h3>
<p>Mais une partie des prélèvements sur les grands patrimoines, successions et profits sert à construire un actif collectif au lieu d'être entièrement consommée.</p>
</article>
<article>
<span class="step">05</span>
<h3>Le fonds ne se liquide pas.</h3>
<p>Pas de compte individuel à retirer. Le capital reste commun. Les générations suivantes héritent du fonds. Les engagements de pension ne sont plus leur seul héritage.</p>
</article>
<article>
<span class="step">06</span>
<h3>Les revenus arrivent plus tard.</h3>
<p>Au début, le fonds réinvestit presque tout. Quand il a grossi, une part de ses revenus finance les retraites.</p>
</article>
</div>
<div class="ownership reveal">
<div class="ownership-copy">
<p class="eyebrow">Propriété du capital</p>
<h3>Si les actionnaires captent une partie des profits, changeons progressivement qui possède les actions.</h3>
<p>Un salarié qui épargne dans un PEA est déjà travailleur et actionnaire. Le projet pousse cette logique au niveau collectif. Le fonds achète ou reçoit des parts d'entreprises. Les dividendes reviennent alors aussi à la collectivité.</p>
<details>
<summary>Ce n'est pas une idée sortie de nulle part</summary>
<p>Dans les années 1970, Rudolf Meidner et la confédération syndicale suédoise LO ont proposé des fonds collectifs de salariés qui auraient reçu progressivement des actions d'entreprises. La version mise en place dans les années 1980 fut beaucoup plus limitée.</p>
<div class="link-row">
<a class="source-link" href="https://swopec.hhs.se/iuiwop/papers/iuiwop0533.pdf" rel="noreferrer" target="_blank">Étude historique</a>
<a class="source-link" href="https://access.archive-ouverte.unige.ch/access/metadata/24179d08-1f31-4435-8b3c-0232ccfcc155/download" rel="noreferrer" target="_blank">Expérience suédoise</a>
</div>
</details>
</div>
<div aria-label="Schéma de propriété du capital" class="ownership-diagram">
<div class="ownership-now">
<span>Aujourd'hui</span>
<div class="ownership-track"><i style="width:100%"></i></div>
<small>capital privé et participations publiques existantes</small>
</div>
<div class="ownership-later">
<span>Progressivement</span>
<div class="ownership-track split"><i></i><b></b></div>
<small>capital privé + fonds collectif inaliénable</small>
</div>
</div>
</div>
<div class="fund-sim reveal">
<div>
<p class="eyebrow">Simulation, pas prévision</p>
<h3>Que donne un fonds alimenté chaque année ?</h3>
<p>Point de départ 20,7 Md€ du FRR. Rendement réel illustratif de 3 %. Aucun retrait dans ce calcul simple.</p>
</div>
<div class="sim-controls">
<label for="annualContribution">Abondement annuel</label>
<input id="annualContribution" max="60" min="20" step="10" type="range" value="40"/>
<div class="sim-value"><span id="annualValue">40</span> Md€ par an</div>
</div>
<div class="sim-result">
<div><span>20 ans</span><strong id="fund20">1 112 Md€</strong></div>
<div><span>40 ans</span><strong id="fund40">3 084 Md€</strong></div>
<div><span>2,5 % du stock à 40 ans</span><strong id="income40">77 Md€ par an</strong></div>
</div>
<p class="small-print">Le rendement n'est pas garanti. Une trajectoire réelle doit intégrer volatilité, frais, retraits et croissance des pensions.</p>
</div>
</section>
<section class="section-pad parties" id="partis">
<div class="section-heading reveal">
<p class="eyebrow">Comparer les partis</p>
<h2>Qui protège quoi, et qui paie ?</h2>
<p>Pas de note magique. Chaque case renvoie à une position datée. Quand la doctrine bouge, on le dit.</p>
</div>
<div aria-label="Filtrer le comparateur" class="party-toolbar reveal" role="group">
<button class="filter active" data-filter="all">Tout voir</button>
<button class="filter" data-filter="retirees">Retraités actuels</button>
<button class="filter" data-filter="workers">Actifs</button>
<button class="filter" data-filter="capital">Capital</button>
</div>
<div class="party-scroll reveal">
<table class="party-table" id="partyTable">
<thead></thead>
<tbody></tbody>
</table>
</div>
<p class="small-print reveal">Mise à jour de travail, août 2026. Les programmes 2027 ne sont pas tous stabilisés. Une case "à préciser" vaut mieux qu'une position inventée.</p>
</section>
`);
