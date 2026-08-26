# Retraites 2070 — modèle, conventions et limites

Dernière mise à jour : 26 août 2026.

Ce document est la documentation d'audit du site `Retraites 2070`. Il décrit ce qui est observé, ce qui vient d'une projection officielle, ce qui est une position politique et ce qui est une simulation du site.

## 1. Règle éditoriale

Le site utilise quatre catégories :

1. **OBSERVÉ** : donnée mesurée sur une année passée ou un stock constaté à une date donnée.
2. **PROJECTION OFFICIELLE** : scénario publié par une institution (Insee, COR). Une projection n'est pas une prévision certaine.
3. **PROGRAMME / DÉCLARATION** : position politique datée. Elle n'est pas convertie automatiquement en résultat économique.
4. **SIMULATION DU SITE / HYPOTHÈSE ILLUSTRATIVE** : calcul pédagogique dont les hypothèses sont affichées et documentées ici.

Aucune valeur de la catégorie 4 ne doit être présentée comme un chiffrage officiel d'un parti ou du COR.

## 2. Démographie

### Source

Insee, *Projections de population 2026 pour la France*, juin 2026.

Scénario central utilisé par l'Insee :

- fécondité : 1,45 enfant par femme à partir de 2028 ;
- solde migratoire : +150 000 personnes par an à partir de 2026 ;
- poursuite de la baisse des risques de décès selon la méthode Insee.

Repères publiés utilisés dans l'interface :

- population 2026 : 69,1 millions ;
- pic projeté 2037 : 69,8 millions ;
- population 2070 : 65,9 millions ;
- personnes de 65 ans ou plus : +5,8 millions entre 2026 et 2070 ;
- personnes de moins de 45 ans : -8,9 millions ;
- personnes de 80 ans ou plus : +4,6 millions ;
- ratio 65+ / 20-64 : 40 pour 100 en 2026, 49 en 2040, 62 en 2070.

### Interpolation dans le slider

L'Insee ne publie pas dans la page éditoriale un point pour chaque année de chaque indicateur. Pour permettre une animation annuelle, le site effectue une **interpolation linéaire** entre les points d'ancrage affichés dans `v3-data.js`.

Pour deux points `(y0, v0)` et `(y1, v1)`, la valeur d'une année `y` comprise entre les deux est :

```text
t = (y - y0) / (y1 - y0)
v(y) = v0 + t × (v1 - v0)
```

Une valeur intermédiaire n'est donc pas une observation Insee indépendante. Les chiffres de headline utilisent uniquement les points publiés.

## 3. Dépenses et solde du système de retraite

### Source

Conseil d'orientation des retraites, rapport annuel de juin 2026.

Repères utilisés :

- dépenses brutes de retraite 2025 : environ 422,2 Md€, 14,1 % du PIB ;
- dépenses en part de PIB : 14,1 % en 2025, 14,2 % en 2045 et 15,3 % en 2070 dans le scénario de référence ;
- solde projeté : -0,2 % du PIB en 2030 (environ -6,8 Md€), -0,9 % en 2045, -2,4 % en 2070.

Le site évite de présenter `422,2 Md€` comme un faux face-à-face entre « recettes » et « dépenses ». Le COR utilise plusieurs conventions et produits financiers ; ce chiffre est ici un ordre de grandeur de **dépense brute du système**.

Le déficit du système ne signifie pas que « les retraites coûtent 422 Md€ au budget de l'État ». Le système agrège plusieurs régimes, des cotisations, des taxes affectées, des transferts et des contributions publiques.

## 4. Les « 1 000 € de prélèvements obligatoires »

Source : Direction du Budget, données Insee 2023.

L'infographie publique regroupe l'ensemble des administrations publiques. Elle ne dit pas ce que deviennent exactement les 1 000 € payés par un contribuable individuel.

Le site utilise les montants agrégés suivants :

| Poste | € sur 1 000 |
|---|---:|
| Retraites | 253 |
| Santé | 201 |
| Autre protection sociale | 107 |
| Éducation | 88 |
| Autres services publics | 184 |
| Fonctionnement des administrations | 66 |
| Soutien aux activités économiques | 59 |
| Intérêts de la dette | 31 |
| Infrastructures | 11 |
| **Total** | **1 000** |

`107` correspond au reliquat de la protection sociale après retraites et santé. `184` correspond au reliquat des services publics après l'éducation. Ces regroupements sont faits pour la lisibilité du graphique ; ils ne modifient pas le total publié.

## 5. Retraites des fonctionnaires d'État et convention comptable

### Taux 2026

Légifrance : contribution employeur au CAS Pensions à compter du 1er janvier 2026 :

- 82,28 % pour les personnels civils ;
- 126,07 % pour les personnels militaires.

Ces taux sont appliqués sur une assiette spécifique (notamment traitement indiciaire) et ne sont pas directement comparables à un simple taux patronal du privé.

### Reclassification IPP

L'Institut des politiques publiques propose une convention alternative distinguant davantage :

- le coût contributif / salarial des droits ;
- le transfert permettant de couvrir le déséquilibre démographique et certaines composantes de solidarité ou de régime professionnel.

Repères IPP repris par le site :

- subvention implicite liée au déséquilibre démographique estimée à 18 Md€ ;
- requalification plus large estimée à 25,8 Md€ ;
- exemple du budget de l'enseignement scolaire 2023 : 81,3 Md€ affichés, 70,7 Md€ après correction de convention.

**Important : 81,3 → 70,7 Md€ n'est pas une économie réelle de 10,6 Md€.** C'est un déplacement comptable de la charge. Le solde consolidé des finances publiques n'est pas amélioré mécaniquement.

## 6. Personnages Monique, Bernard et Léa

Les trois personnes sont **des cas fictifs** utilisés pour expliquer la distribution des effets.

Les exemples de sous-indexation sont purement arithmétiques :

```text
perte / gain annuel de revalorisation = pension mensuelle × écart de taux × 12
```

Exemple : 5 000 € × 2 % × 12 = 1 200 € la première année.

Le site ne prétend pas que ces trois profils sont représentatifs de l'ensemble de leur génération.

## 7. Stock et flux

Le site sépare :

- **stock** : valeur d'actifs à une date donnée ;
- **flux** : revenu ou dépense répété sur une période.

Une confiscation ou vente de patrimoine convertit un stock en ressource ponctuelle. Un fonds qui conserve les actifs et perçoit leur rendement vise au contraire à transformer un stock en source récurrente de flux.

Cette distinction ne signifie pas que la fiscalité du patrimoine est inutile : une fiscalité récurrente peut elle-même produire un flux. La question pertinente est alors son rendement annuel durable, son assiette et ses effets économiques.

## 8. Fonds collectif : formule

### Point de départ

Le scénario central utilise l'actif net du Fonds de réserve pour les retraites fin 2025 :

```text
F0 = 20,7 Md€
```

### Accumulation

Pour chaque année :

```text
F(t) = F(t-1) × (1 + r) + C
```

où :

- `F(t)` : capital du fonds après l'année t ;
- `r` : rendement réel annuel constant ;
- `C` : contribution annuelle constante en Md€ réels.

Le versement annuel est modélisé **en fin d'année**, après le rendement de l'encours existant. Une convention de versement en début d'année donnerait un résultat légèrement supérieur.

### Scénario central du site

```text
F0 = 20,7 Md€
C = 40 Md€/an
r = 3 % réel/an
horizon = 40 ans
```

Résultats attendus :

- après 10 ans : ~486 Md€ ;
- après 20 ans : ~1 112 Md€ ;
- après 30 ans : ~1 953 Md€ ;
- après 40 ans : ~3 084 Md€.

### Flux à maturité

Le site calcule :

```text
flux annuel = capital final × taux de prélèvement
```

Avec 3 084 Md€ et un prélèvement de 2,5 % :

```text
≈ 77,1 Md€/an
```

Avec 3 % :

```text
≈ 92,5 Md€/an
```

La comparaison au `422,2 Md€` de dépenses 2025 sert uniquement d'ordre de grandeur. Les dépenses de retraite dans 40 ans ne seront évidemment pas égales en euros courants à celles de 2025 ; le modèle travaille conceptuellement en euros réels.

## 9. Ce que le modèle de fonds ne chiffre pas

Le simulateur **ne doit pas être utilisé comme business plan**. Il ne modélise pas :

- la transition complète du financement des retraites ;
- la charge simultanée consistant à payer les retraités actuels et à accumuler le fonds ;
- l'incidence fiscale et comportementale d'une contribution de 40 Md€/an ;
- la volatilité annuelle des actifs ;
- le risque de séquence de rendement ;
- les frais, impôts ou coûts de gouvernance ;
- les changements de population active ou de salaire induits par la réforme ;
- l'effet d'éviction éventuel sur l'épargne privée ou l'investissement ;
- les règles européennes d'aides d'État, de concurrence ou de gouvernance des participations ;
- les problèmes de contrôle politique du capital ;
- un calibrage optimal entre actifs français et mondiaux.

Le rendement réel constant de 3 % est une **hypothèse illustrative**, pas une promesse.

## 10. France seulement ou diversification mondiale

Le site ne retient plus un fonds composé uniquement d'entreprises françaises.

Raison : une concentration France ferait coïncider :

- emploi ;
- salaires ;
- recettes fiscales ;
- démographie ;
- et actifs du fonds.

Une crise française pourrait alors détériorer simultanément toutes les sources de financement. La proposition distingue donc :

1. une poche stratégique française, ayant aussi un objectif de souveraineté et de propriété publique ;
2. une poche internationale diversifiée, ayant d'abord un objectif financier.

La répartition précise n'est pas chiffrée dans cette version.

## 11. Laboratoire des leviers

Le COR distingue classiquement plusieurs leviers de retour à l'équilibre :

- baisse / moindre croissance des dépenses de retraite ;
- hausse de prélèvements / cotisations ;
- recul de l'âge ou augmentation de l'emploi/durée d'activité.

Le laboratoire du site laisse l'utilisateur saisir trois effets en **points de PIB**. Le calcul est volontairement comptable :

```text
solde simulé 2070
= solde COR 2070
+ recettes supplémentaires
+ réduction de dépenses
+ effet emploi / durée
```

Exemple par défaut :

```text
-2,4 + 0,5 + 0,5 + 0,5 = -0,9 % du PIB
```

Ce n'est **pas** un modèle macroéconomique : les effets de second tour, interactions entre leviers, élasticités de l'emploi et conséquences sur le PIB sont ignorés.

Le fonds n'est pas automatiquement converti en points de PIB dans ce calcul, afin de ne pas combiner un stock projeté avec un PIB futur non modélisé.

## 12. Positions politiques

Le comparateur ne prétend pas fournir un chiffrage complet des programmes. Il répond à quatre questions institutionnelles et cite les sources utilisées.

### Droit actuel / suspension 2026

Le calendrier de la réforme Borne a été suspendu. Les pages et analyses de juin 2026 indiquent qu'en l'absence d'une nouvelle réforme, la montée en charge doit reprendre en 2028.

### LFI

Source : *L'Avenir en commun 2025*, position encore revendiquée en 2026.

Repères :

- retraite à 60 ans à taux plein pour 40 annuités ;
- hausse de 0,25 point par an des cotisations vieillesse pendant le quinquennat ;
- assujettissement de certains revenus financiers et d'épargne salariale ;
- indexation des pensions sur les salaires ;
- répartition comme architecture centrale.

### Parti socialiste

Source : projet socialiste adopté le 2 juillet 2026.

Repères :

- abrogation de la réforme Borne ;
- âge légal à 62 ans comme protection minimale ;
- 43 annuités, réductibles selon la pénibilité ;
- financement supplémentaire notamment par imposition du capital et certaines assiettes de rémunération.

### Rassemblement national

La ligne 2026 est **explicitement non stabilisée** :

- Marine Le Pen : maintien d'un âge légal et ouverture à une capitalisation volontaire ;
- Jordan Bardella : a envisagé la suppression de l'âge légal au profit de la durée de cotisation et une part de capitalisation pouvant passer par un fonds souverain.

Le site ne fusionne pas ces deux positions en un faux programme cohérent.

### Gabriel Attal / Renaissance

La proposition publique mise en avant en 2025-2026 comprend :

- sortie d'un âge légal fixe ;
- rôle accru de la durée de cotisation ;
- part de capitalisation.

La forme précise de cette capitalisation n'est pas traitée comme identique au fonds public du site.

### « Notre modèle »

Ce n'est **pas un programme officiel**. C'est la proposition normative développée dans le site :

- répartition conservée ;
- petites pensions fortement protégées ;
- possibilité de sous-indexer / faire contribuer davantage les pensions élevées ;
- pas de droit universel à 60 ans indépendant de la démographie ;
- fonds public productif comme pilier croissant ;
- dette structurelle évitée ;
- diversification du risque.

## 13. Architectures internationales

### Suisse

La Suisse est décrite avec ses trois piliers :

1. prévoyance étatique / AVS, fondée sur la solidarité et la répartition ;
2. prévoyance professionnelle ;
3. prévoyance privée facultative.

Le site n'affirme pas que la Suisse est directement transposable à la France.

### États-Unis

Le site indique uniquement que Social Security subsiste comme socle public et coexiste avec de l'épargne retraite capitalisée via employeurs et individus. Il évite donc l'erreur « États-Unis = retraite entièrement privée ».

### Archétype libertarien

Il est explicitement marqué comme **archétype théorique** : petit filet public et capitalisation principalement individuelle. Il ne décrit aucun pays précis.

## 14. Dette et intérêts

La version V3 ne transforme pas automatiquement les déficits COR en trajectoire de dette publique, parce qu'une telle conversion exigerait au minimum :

- une trajectoire de PIB nominal ;
- un taux d'intérêt de financement ;
- la distinction dette du système / dette publique consolidée ;
- les mesures de financement intermédiaires ;
- un scénario macroéconomique cohérent.

L'ancien prototype mélangeait trop facilement ces grandeurs. Cette version préfère ne pas afficher un chiffre de dette artificiellement précis.

## 15. Contrôles attendus avant publication

La branche est volontairement structurée pour être simple à auditer. Avant déploiement public, vérifier :

- `node --check v3-data.js` ;
- `node --check v3.js` ;
- absence de `NaN` / `undefined` dans l'UI ;
- valeur centrale du fonds : ~3 083,6 Md€ à 40 ans ;
- flux à 2,5 % : ~77,1 Md€ ;
- total du graphique 1 000 € : exactement 1 000 ;
- liens de sources ;
- menu mobile ;
- slider tactile ;
- rendu 360 / 390 / 412 px ;
- desktop 1280 / 1440 / 1920 ;
- absence de débordement horizontal ;
- `prefers-reduced-motion` ;
- navigation clavier ;
- contraste ;
- console sans erreur ;
- 404 sur assets.

## 16. Principales sources

- Insee, projections de population 2026 : https://www.insee.fr/fr/statistiques/9004289
- COR, rapport annuel juin 2026 : https://www.cor-retraites.fr/rapports-du-cor/rapport-annuel-cor-juin-2026-evolutions-perspectives-retraites-france
- COR, leviers d'équilibre : https://www.cor-retraites.fr/reunions-du-cor/impact-macroeconomique-leviers-dequilibre-financier-dun-systeme-retraite
- Direction du Budget, représentation des 1 000 € : https://www.economie.gouv.fr/files/files/2025/fipu/Budget_flyer.pdf
- Légifrance, CAS Pensions : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000053217025/2026-05-28
- IPP, convention comptable fonction publique d'État : https://www.ipp.eu/publication/retraites-des-fonctionnaires-detat-faut-il-changer-la-convention-comptable/
- FRR, rapport annuel 2025 : https://www.fondsdereserve.fr/rapport-annuel-2025/
- LFI, Avenir en commun 2025 : https://programme.lafranceinsoumise.fr/wp-content/uploads/2025/avenir_en_commun_2025.pdf
- PS, projet adopté 2026 : https://projet-socialiste.fr/projet/vivre-libres/
- Suisse, système des trois piliers : https://www.ch.ch/fr/retraite/prevoyance-vieillesse/comment-fonctionne-la-prevoyance-vieillesse/
- U.S. Social Security Administration : https://www.ssa.gov/retirement
