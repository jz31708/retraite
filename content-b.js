document.getElementById('main').insertAdjacentHTML('beforeend', String.raw`
<section class="section-pad debt" id="dette">
  <div class="debt-intro reveal">
    <p class="eyebrow">Le vrai coût de la dette</p>
    <h2>La dette n'est pas le problème en soi. Les intérêts peuvent le devenir.</h2>
    <p>Emprunter pour traverser une crise ou investir peut avoir du sens. Le coût apparaît quand une part croissante du budget sert chaque année à payer les intérêts du stock accumulé.</p>
  </div>

  <div class="debt-compare reveal" aria-label="Comparaison entre intérêts publics et budget de l'enseignement scolaire">
    <article class="debt-card interest-card">
      <a class="source-badge light" href="https://www.insee.fr/fr/statistiques/2381404" target="_blank" rel="noreferrer" aria-label="Source Insee pour les intérêts publics" title="Source : Insee">↗</a>
      <span class="debt-kicker">Intérêts publics, 2025</span>
      <strong>64,7 Md€</strong>
      <p>payés par l'ensemble des administrations publiques.</p>
    </article>
    <div class="debt-versus" aria-hidden="true"><span>≈</span></div>
    <article class="debt-card school-card">
      <a class="source-badge" href="https://www.budget.gouv.fr/documentation/file-download/30562" target="_blank" rel="noreferrer" aria-label="Source budget de l'État pour l'enseignement scolaire" title="Source : budget de l'État">↗</a>
      <span class="debt-kicker">Enseignement scolaire, 2026</span>
      <strong>64,5 Md€</strong>
      <p>de crédits budgétaires, hors contribution directe au CAS Pensions.</p>
    </article>
  </div>
  <p class="debt-compare-note reveal">Deux années et deux périmètres différents. La comparaison donne un ordre de grandeur, pas une équivalence comptable. La Cour des comptes fait elle-même ce rapprochement.</p>

  <div class="debt-trend reveal">
    <div class="debt-trend-head">
      <div>
        <span class="debt-kicker">La facture monte</span>
        <h3>51 Md€ en 2023. Plus de 100 Md€ possibles en 2029.</h3>
      </div>
      <a class="source-badge light" href="https://www.ccomptes.fr/fr/publications/la-situation-des-finances-publiques-debut-2026" target="_blank" rel="noreferrer" aria-label="Source Cour des comptes pour les projections d'intérêts" title="Source : Cour des comptes">↗</a>
    </div>
    <div class="debt-bars" role="img" aria-label="Charge d'intérêts des administrations publiques : 51 milliards en 2023, 58,1 en 2024, 64,7 en 2025, près de 74 projetés en 2026 et plus de 100 projetés en 2029">
      <div class="debt-bar observed"><i style="height:46%"></i><b>51,0</b><span>2023</span><small>observé</small></div>
      <div class="debt-bar observed"><i style="height:53%"></i><b>58,1</b><span>2024</span><small>observé</small></div>
      <div class="debt-bar observed"><i style="height:59%"></i><b>64,7</b><span>2025</span><small>observé</small></div>
      <div class="debt-bar projected"><i style="height:67%"></i><b>≈74</b><span>2026</span><small>projection</small></div>
      <div class="debt-bar projected"><i style="height:94%"></i><b>&gt;100</b><span>2029</span><small>projection</small></div>
    </div>
    <div class="debt-chart-sources">
      <a class="source-link light" href="https://www.insee.fr/fr/statistiques/documentation/annexe_ir_prov_apu--20260326.pdf" target="_blank" rel="noreferrer">Insee 2023 à 2025</a>
      <a class="source-link light" href="https://www.ccomptes.fr/fr/publications/la-situation-des-finances-publiques-debut-2026" target="_blank" rel="noreferrer">Cour des comptes 2026 et 2029</a>
    </div>
  </div>

  <div class="debt-copy reveal">
    <h3>Le stock n'est pas une facture annuelle. Les intérêts, si.</h3>
    <p>Plus la dette doit être refinancée à des taux élevés, plus son coût courant monte. Cet argent ne disparaît pas dans le vide, il rémunère les créanciers. Mais il n'est plus disponible pour l'école, la santé, l'investissement ou la construction de notre fonds collectif.</p>
    <details><summary>Et si on annulait une partie de la dette ?</summary><p>Une annulation envers des créanciers privés est un défaut ou une restructuration. Pour la dette détenue par l'Eurosystème, une perpétualisation à taux très faible est une piste politique radicale. Elle demanderait de changer le cadre européen actuel et ne crée pas un coffre de cash égal au nominal annulé.</p><div class="link-row"><a class="source-link light" href="https://eur-lex.europa.eu/eli/treaty/tfeu_2016/art_123/oj/eng" target="_blank" rel="noreferrer">Article 123 TFUE</a><a class="source-link light" href="https://www.ecb.europa.eu/pub/pdf/scpops/ecb.op273~fae24ce432.en.pdf" target="_blank" rel="noreferrer">BCE</a></div></details>
  </div>
</section>

<section class="section-pad proposal" id="proposition">
  <div class="section-heading reveal">
    <p class="eyebrow">La proposition</p>
    <h2>Ne socialisons pas seulement la dépense. Socialisons aussi la propriété.</h2>
    <p>La répartition reste le filet de sécurité. Le changement est ailleurs. Une partie de la richesse prélevée sert à acheter ou recevoir des actifs qui restent dans un fonds collectif.</p>
  </div>

  <div class="system-flow reveal" aria-label="Fonctionnement proposé du système">
    <div class="flow-stage">
      <span class="flow-label">Aujourd'hui</span>
      <div class="flow-node">Travail</div><i>→</i><div class="flow-node">Cotisations</div><i>→</i><div class="flow-node strong">Pensions</div>
    </div>
    <div class="flow-stage transition">
      <span class="flow-label">Pendant la transition</span>
      <div class="flow-node">Patrimoines, profits, successions</div><i>→</i><div class="flow-node social">Fonds collectif</div><i>→</i><div class="flow-node">Parts d'entreprises</div>
    </div>
    <div class="flow-stage future">
      <span class="flow-label">À terme</span>
      <div class="flow-node">Cotisations</div><span class="plus">+</span><div class="flow-node social">Revenus du fonds</div><i>→</i><div class="flow-node strong">Pensions</div>
    </div>
  </div>

  <div class="guardrails reveal">
    <article><span>01</span><h3>Le bas ne sert pas de variable d'ajustement.</h3><p>Petites pensions et minima restent protégés. Pénibilité, handicap et carrières longues gardent des règles propres.</p></article>
    <article><span>02</span><h3>Les pensions élevées peuvent contribuer.</h3><p>La sous-indexation se fait par tranches pour éviter un seuil absurde à un euro près.</p></article>
    <article><span>03</span><h3>Les jeunes ne financent pas seuls la transition.</h3><p>Le fonds reçoit aussi du patrimoine, des profits, des successions et des actifs publics déjà existants.</p></article>
    <article><span>04</span><h3>Le capital du fonds ne se liquide pas.</h3><p>Pas de compte individuel à vider. Les générations héritent du fonds et de ses revenus.</p></article>
  </div>

  <div class="ownership reveal">
    <div class="ownership-copy">
      <p class="eyebrow">Qui reçoit les profits ?</p>
      <h3>Si les actionnaires captent une partie de la valeur, changeons progressivement les actionnaires.</h3>
      <p>Un salarié avec un PEA est déjà travailleur et actionnaire. Le projet porte cette idée au niveau collectif. Le fonds devient propriétaire d'une part croissante de l'appareil productif. Les dividendes reviennent aussi à la collectivité.</p>
      <details><summary>Une idée de gauche qui a déjà existé</summary><p>Dans les années 1970, Rudolf Meidner et la confédération syndicale suédoise LO ont proposé des fonds collectifs de salariés alimentés par des actions d'entreprises. La réforme finalement appliquée dans les années 1980 fut beaucoup plus limitée que le projet initial.</p><div class="link-row"><a class="source-link" href="https://swopec.hhs.se/iuiwop/papers/iuiwop0533.pdf" target="_blank" rel="noreferrer">Plan Meidner</a><a class="source-link" href="https://access.archive-ouverte.unige.ch/access/metadata/24179d08-1f31-4435-8b3c-0232ccfcc155/download" target="_blank" rel="noreferrer">Expérience suédoise</a></div></details>
    </div>
    <div class="ownership-visual" aria-label="Schéma illustratif de propriété du capital">
      <div class="profit-line"><span>Entreprise</span><i></i><strong>Profits</strong></div>
      <div class="owners-row">
        <div class="owner private"><span>Actionnaires privés</span><b>aujourd'hui</b></div>
        <div class="owner social"><span>Fonds collectif</span><b>progressivement</b></div>
      </div>
      <div class="ownership-bar"><i></i><b></b></div>
      <p>Répartition illustrative, pas objectif chiffré. La zone verte représente la propriété sociale qui s'accumule et reste.</p>
    </div>
  </div>

  <div class="fund-sim reveal">
    <div>
      <p class="eyebrow">Simulation, pas promesse</p>
      <h3>Combien peut peser un fonds en quarante ans ?</h3>
      <p>Point de départ 20,7 Md€ du FRR. Rendement réel illustratif de 3 %. Aucun retrait dans ce calcul simple.</p>
    </div>
    <div class="sim-controls">
      <label for="annualContribution">Abondement annuel</label>
      <input id="annualContribution" min="20" max="60" step="10" type="range" value="40">
      <div class="sim-value"><span id="annualValue">40</span> Md€ par an</div>
    </div>
    <div class="sim-result">
      <div><span>20 ans</span><strong id="fund20">1 112 Md€</strong></div>
      <div><span>40 ans</span><strong id="fund40">3 084 Md€</strong></div>
      <div><span>2,5 % du stock à 40 ans</span><strong id="income40">77 Md€ par an</strong></div>
    </div>
    <p class="small-print">Le rendement n'est pas garanti. Une trajectoire réelle doit intégrer volatilité, frais, retraits, fiscalité et croissance des pensions.</p>
  </div>
</section>
`);
