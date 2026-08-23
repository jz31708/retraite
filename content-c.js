document.getElementById('main').insertAdjacentHTML('beforeend', String.raw`
<section class="section-pad parties" id="partis">
  <div class="section-heading reveal">
    <p class="eyebrow">Comparer les partis</p>
    <h2>Quatre questions suffisent pour voir où part la facture.</h2>
    <p>Le verdict rapide est volontairement simple. Clique sur une case pour voir la justification et les sources. La matrice complète reste disponible juste dessous.</p>
  </div>
  <div class="quick-compare reveal" id="quickCompare"></div>
  <details class="full-compare reveal">
    <summary>Voir la comparaison complète, 8 critères × 11 colonnes</summary>
    <div class="party-toolbar" role="group" aria-label="Filtrer le comparateur">
      <button class="filter active" data-filter="all">Tout voir</button>
      <button class="filter" data-filter="retirees">Retraités actuels</button>
      <button class="filter" data-filter="workers">Actifs</button>
      <button class="filter" data-filter="capital">Capital</button>
    </div>
    <div class="party-scroll"><table class="party-table" id="partyTable"><thead></thead><tbody></tbody></table></div>
  </details>
  <p class="small-print reveal">Positions datées. Quand un parti n'a pas de doctrine claire ou stable, la case le dit au lieu de deviner.</p>
</section>

<section class="section-pad quotes" id="paroles">
  <div class="section-heading reveal">
    <p class="eyebrow">Le test Bernard</p>
    <h2>Quand on dit "les retraités", est-ce qu'on parle aussi d'une pension à 5 000 € ?</h2>
    <p>Une citation n'est pas un programme. Elle montre ce qu'un responsable a défendu dans un débat précis. Le contexte et la source restent visibles.</p>
  </div>
  <div class="quote-grid reveal" id="quoteGrid"></div>
</section>

<section class="section-pad faq" id="faq">
  <div class="section-heading reveal"><p class="eyebrow">Objections</p><h2>Les questions qui peuvent casser le projet.</h2></div>
  <div class="faq-list reveal">
    <details><summary>"J'ai cotisé toute ma vie. Cette pension est mon argent."</summary><p>En répartition, les cotisations passées ont surtout payé les retraités de l'époque. Elles ont ouvert un droit social. Elles n'ont pas constitué un portefeuille d'actifs à votre nom.</p></details>
    <details><summary>"C'est de la capitalisation."</summary><p>Oui, il y a accumulation de capital. La différence est la propriété. Le fonds est collectif, inaliénable et non transmissible individuellement. La répartition reste le socle de sécurité.</p></details>
    <details><summary>"La Bourse peut s'effondrer."</summary><p>Oui. C'est précisément pourquoi le fonds ne remplace jamais la répartition. Un fonds de long terme diversifie ses actifs et limite ce qu'il distribue chaque année.</p></details>
    <details><summary>"Pourquoi ne pas investir 100 % en France ?"</summary><p>Une forte part française augmente la propriété nationale. Le 100 % France concentre aussi emploi, impôts, retraites et portefeuille sur la même économie. Le dosage reste à trancher.</p></details>
  </div>
</section>

<section class="section-pad deep-dive" id="approfondir">
  <div class="section-heading reveal">
    <p class="eyebrow">Pour vérifier, pas pour le hero</p>
    <h2>Le déficit COR n'est pas faux. Il ne répond pas à toutes les questions.</h2>
    <p>Le COR compte les contributions publiques comme des recettes du système. C'est la convention officielle. On peut ensuite demander quelle part de ces recettes vient du budget général.</p>
  </div>
  <div class="deep-grid reveal">
    <details><summary>Pourquoi l'État verse-t-il 82,28 % pour ses fonctionnaires civils ?</summary><p>Depuis le 1er janvier 2026, le taux employeur de l'État pour les pensions civiles est de 82,28 % du traitement indiciaire concerné. L'agent verse 11,10 %. Le 82,28 % est un taux d'équilibre.</p><p>Il ne se compare pas directement au taux patronal du privé. Les assiettes, les primes et les règles de pension diffèrent. Il montre en revanche qu'une part du financement arrive par le budget employeur avant d'être comptée comme recette du régime.</p><div class="link-row"><a class="source-link" href="https://retraitesdeletat.gouv.fr/professionnels/le-versement-des-cotisations/les-etablissements-publics-nationaux-ou-organismes" target="_blank" rel="noreferrer">Retraites de l'État</a><a class="source-link" href="https://www.legifrance.gouv.fr/eli/decret/2025/12/26/2025-1341/jo/texte" target="_blank" rel="noreferrer">Décret 2025-1341</a></div></details>
    <details><summary>Alors, quel est le "vrai" déficit ?</summary><p>Il n'y a pas un chiffre magique indépendant des conventions. Le solde COR répond à la comptabilité officielle. Un rapport du Sénat propose un autre retraitement et obtient un besoin de financement bien plus élevé. Le site montre les deux lectures sans baptiser l'une d'elles "vérité".</p><a class="source-link" href="https://www.senat.fr/rap/a25-126/a25-126_mono.html" target="_blank" rel="noreferrer">Sénat, PLFSS 2026</a></details>
    <details><summary>Pourquoi le fonds ne doit-il pas être un énorme PEA public ?</summary><p>Parce qu'un compte individuel se liquide et s'hérite. Ici, le capital reste collectif. Les revenus peuvent financer la protection sociale, le principal continue d'appartenir aux générations suivantes.</p></details>
  </div>
</section>

<section class="section-pad sources" id="sources">
  <div class="section-heading reveal"><p class="eyebrow">Sources</p><h2>Un chiffre important doit être vérifiable sans nous croire.</h2></div>
  <div class="source-grid reveal" id="sourceGrid"></div>
  <details class="source-method reveal"><summary>Les quatre erreurs de présentation qu'on évite</summary><p>On ne mélange pas un ratio du régime général avec un ratio tous régimes. On ne compare pas directement les 82,28 % de contribution employeur de l'État à un taux patronal privé. On ne compte pas les participations publiques existantes comme un nouvel apport gratuit. On ne présente pas un rendement de 3 % réel comme garanti.</p></details>
</section>
`);
