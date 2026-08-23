document.getElementById('main').insertAdjacentHTML('beforeend', String.raw`
<section class="section-pad debt" id="dette">
  <div class="debt-number reveal">
    <span>64,7 Md€</span>
    <p>d'intérêts payés en 2025 par l'ensemble des administrations publiques.</p>
    <a class="source-link light" href="https://www.insee.fr/fr/statistiques/2381404" target="_blank" rel="noreferrer">Insee</a>
  </div>
  <div class="debt-copy reveal">
    <p class="eyebrow">Ce qu'on transmet</p>
    <h2>Une dette laisse une obligation. Un investissement peut laisser un actif.</h2>
    <p>La santé, le chômage, l'éducation et les minima sociaux ne sont pas des dépenses inutiles parce qu'elles sont courantes. Le problème est plus précis. S'endetter durablement pour la consommation présente sans construire d'actif en face laisse la facture au futur sans le patrimoine.</p>
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
