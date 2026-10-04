# Retraites 2070 — modèle, sources et conventions

V14 · Vérification des sources : 5 octobre 2026. Les valeurs affichées, les données structurées et les textes politiques ne sont pas tous du même type. Les fiches du site identifient le périmètre, la date, l'auteur et ce que chaque source étaye.

## Comment lire les chiffres

- **Observé / estimé** décrit une période passée ou un stock constaté.
- **Projection officielle** désigne un scénario institutionnel, pas une prévision certaine.
- **Position politique** renvoie à un texte ou à une déclaration datée et attribuée.
- **Simulation du site** désigne un calcul pédagogique dont les paramètres sont modifiables.

Les personnes de 65 ans ou plus rapportées aux personnes de 20 à 64 ans ne sont ni le nombre de retraités par cotisant, ni un taux de dépendance financière. La série ne montre que trois repères (1970, base 2026, scénario central 2070) et la fourchette Insee 2070. Les dépenses de retraite en part du PIB décrivent un autre périmètre et ne sont pas déduites du ratio démographique.

La ventilation « 253 € sur 1 000 » normalise une répartition agrégée des dépenses publiques. Elle ne représente pas le budget, les impôts ou les prestations d'un ménage donné.

## Repères de financement

Le rapport annuel 2026 du COR estime les dépenses brutes du système de retraite à 422,2 Md€ en 2025, soit 14,1 % du PIB. Il évalue le solde 2025 à −5,1 Md€ hors produits financiers. Les ressources déjà inscrites comprennent 49,3 Md€ de contributions d'équilibre et 7,7 Md€ de subventions d'équilibre. Leur somme (57 Md€) est un calcul du site à partir du tableau du COR; elle est déjà intégrée aux ressources et ne s'ajoute donc pas au solde.

Dans le scénario de référence, les dépenses atteignent 15,3 % du PIB en 2070. Le solde de −2,4 point de PIB affiché dans les leviers correspond à la convention conforme à la législation présentée par le COR en annexe 2, page 228. Ce choix de convention est indiqué auprès du contrôle; il ne doit pas être confondu avec les autres conventions comptables du rapport.

L'actif de 20,7 Md€ du FRR à fin 2025 est un stock. Le FRR prévoit 1,45 Md€ de versements annuels à la Cades jusqu'en 2033. Le site ne suppose ni que ces actifs sont transférables, ni qu'ils financent le nouveau fonds : le capital initial du simulateur vaut zéro par défaut. Une valeur différente saisie dans le contrôle est une expérience de scénario, pas une autorisation ni un financement établi.

## Registre de financement de la transition

Le fonds s'ajoute au financement des pensions en cours : une ressource affectée au fonds n'est plus disponible pour une autre dépense. Quatre lignes permettent de tester des montants annuels hypothétiques : prélèvement/cotisation, effort sur certaines pensions, redéploiement documenté et autre recette récurrente. Toutes valent zéro par défaut.

Pour un objectif annuel `T` et les montants déclarés `aᵢ` :

```text
ressources déclarées = Σ aᵢ
versement investi = min(T, Σ aᵢ)
reste à financer = max(0, T − Σ aᵢ)
excédent non affecté = max(0, Σ aᵢ − T)
```

Le scénario « objectif » suppose l'objectif atteint; le scénario « financé » ne reçoit que les ressources saisies, plafonnées à l'objectif. Un excédent n'est pas investi automatiquement. Les montants saisis sont des hypothèses d'utilisateur, pas des recettes vérifiées.

## Simulateur du fonds

Les montants sont en milliards d'euros constants de 2025. Le rendement est réel (après inflation) et saisi avant frais. Les versements sont supposés constants en pouvoir d'achat; ils ne sont donc pas indexés nominalement dans le calcul. Le capital initial, lorsqu'il est renseigné, est identique dans les trajectoires « objectif » et « financé » afin d'isoler l'effet des versements annuels.

Pour chaque année `t` :

```text
capital après rendement = capital d'ouverture × (1 + rendement réel)
frais = capital après rendement × taux de frais
actifs disponibles = capital après rendement − frais
retrait demandé = capital d'ouverture × taux de retrait, si la date de début est atteinte
retrait payé = min(retrait demandé, actifs disponibles)
capital de clôture = actifs disponibles − retrait payé + versement de fin d'année
```

Les retraits se fondent sur le capital d'ouverture, sont plafonnés aux actifs disponibles et peuvent donc s'interrompre. Le tableau rend visibles les demandes non satisfaites. « Versements moins retraits » exclut le capital initial et mesure des flux cumulés, pas le coût économique complet ni la rentabilité actualisée.

Les scénarios sont des tests de sensibilité :

- **Référence** : taux réel constant de 3 % par défaut.
- **Faible** : 1 % réel constant.
- **Nul** : 0 % réel.
- **Choc au début** : −20 %, puis −8 %, puis le taux choisi.
- **Krach tardif** : baisse de 35 % trois ans avant la fin des versements, puis le taux choisi.
- **Même rendement, ordre différent** : 10 années à +5 % et 10 à −1 %, puis le taux choisi; la seconde trajectoire inverse l'ordre. Si la période comparée est plus courte, les mêmes nombres de rendements sont conservés dans les deux ordres.

Ce ne sont ni des probabilités ni des rendements prévus. Le modèle ne simule pas la volatilité, la diversification, l'inflation nominale, les impôts, les frais de transaction, la taille ou le risque du portefeuille, les recettes réellement collectées, la démographie des bénéficiaires, les règles d'indexation, ni une garantie de revenu permanent.

Valeur de référence : 40 Md€ versés en fin d'année pendant 40 ans à 3 % réel, sans frais, retrait ni capital initial, donnent environ 3 016 Md€ à l'horizon. Le scénario financé reste à zéro tant qu'aucune ressource n'est déclarée. Cette valeur est une illustration mécanique, non une proposition chiffrée ou validée.

## Leviers COR et propositions politiques

Le calcul des leviers commence à −2,4 point de PIB en 2070 sous la convention indiquée. Il additionne simplement trois valeurs saisies (recettes, dépenses/pensions, activité). Il ne traduit aucun levier en mesure précise, coût, effet sur l'emploi ou rendement économique. Il reste indépendant du financement du fonds.

Le comparateur politique décrit des écrits ou déclarations explicitement cités : âge/durée, recettes, effort sur pensions élevées, capital collectif. Les statuts sont « au centre de la proposition », « mention explicite », « élément secondaire », « non identifié dans le texte cité » et « incertain ou divergent ». « Non identifié » ne signifie pas « opposé ». Les propos rapportés de personnes sont attribués individuellement et ne sont pas convertis en programme de parti. Les rendements budgétaires proposés par un mouvement ne sont pas repris comme vérifiés par le site.

La proposition du site est normative : maintien d'un socle public par répartition, meilleure protection des petites pensions, effort à préciser pour les pensions élevées et constitution d'un actif collectif diversifié. La proposition ajoute quatre garde-fous à inscrire dans les règles futures : propriété collective non cessible à titre individuel, retraits encadrés par une mission publique, comptes audités et contrôle démocratique, et distinction entre une part bornée d’investissement productif en France et un portefeuille de retraite diversifié à l’international. Ces choix de gouvernance, leurs seuils, leurs garanties et leur forme juridique restent à arbitrer; ils ne sont pas présentés comme le droit en vigueur.

## Atelier de financement annuel

Les trois leviers affichés sont des estimations indicatives tirées de textes parlementaires et d'un rapport public historique. Le site ne les traite pas comme des recettes acquises : les fourchettes qui ne figurent pas directement dans la source sont des hypothèses, et les effets de comportement, d'assiette et de calendrier ne sont pas simulés. Les montants sélectionnés sont projetés constants pendant 40 ans uniquement pour comparer leur effet mécanique sur le capital.

La loi de financement 2026 a déjà relevé à 10,6 % le taux de CSG applicable à plusieurs catégories de revenus du capital, avec des exceptions. Cette recette n'est pas proposée une seconde fois. La CSG générale et la flat tax peuvent viser des revenus qui se recoupent : l'interface les rend mutuellement exclusives, et l'état partagé dans l'URL refuse aussi toute combinaison qui les cumule. Les économies d'une mesure ponctuelle et celles déjà attendues du droit en vigueur ne figurent pas parmi les nouvelles recettes récurrentes.

Les scénarios prédéfinis affichent 0, 1, 4 et 15,2 Md€ par an au chiffre central. Ils sont des illustrations arithmétiques, pas des recommandations ni des propositions validées.

## Fiche de paie et intérêts composés

La fiche de paie utilise les taux 2026 d'assurance vieillesse du régime général et de retraite complémentaire Agirc-Arrco. Elle applique le plafond annuel de la Sécurité sociale de 48 060 €, calcule les tranches 1 et 2 jusqu'à huit plafonds et ajoute la CET lorsque le salaire dépasse le plafond. L'exemple réunit les parts salariée et patronale pour un salarié non-cadre du privé; il exclut la CSG, l'impôt, les allègements et les situations particulières. Le pourcentage affiché ne vaut donc pas pour tous les salaires.

Le calcul d'intérêts composés verse les sommes en fin d'année, en euros constants. Le montant annuel peut rester constant ou croître selon le taux choisi. Les rendements sont des hypothèses réelles, avant frais; les simulations ne prédisent pas le rendement d'un portefeuille.

## Sources principales

Les liens, les dates de vérification, les périmètres et les références de page/figure sont dans `data/site-data.js` et dans les fiches du site. Le registre contient notamment les projections démographiques Insee 2026, le rapport annuel COR de juin 2026, la loi de financement de la Sécurité sociale 2026, les publications du FRR, les textes des partis et les déclarations politiques attribuées. Chaque source étaye les éléments indiqués dans sa fiche; elle n'endosse pas l'interprétation du site.
