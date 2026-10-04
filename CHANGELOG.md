# Retraites 2070 — récapitulatif de toutes les modifications (V6 → V14)

Les notes détaillées de chaque version sont dans `docs/changes/`. Ce fichier les résume par thème.

## En bref
Le site est passé d'un état des lieux au ton « slogan » à un site en deux parties : **des faits** (démographie, argent, autres pays, partis), puis **une thèse assumée** (plancher en répartition, fonds souverain, épargne libre) avec ses risques, des **ateliers chiffrés**, et une refonte visuelle éditoriale.

## Versions
| Version | Contenu |
|---|---|
| V7 | Séparation faits / thèse, pivot, bilan avantages-risques, titres descriptifs, premiers correctifs (barres, nav, mobile) |
| V8 | Jeu « Construis ton financement » : six leviers sourcés, scénarios, tableau sous trois marchés, envoi vers le registre |
| V9 | « Ailleurs » (Norvège, Canada, Suède, Suisse), jeu fiche de paie, jeu intérêts composés |
| V10 | « Ailleurs » en comparaison de principes, trois étages (plancher, fonds, épargne libre) |
| V11 | Réarchitecture en cinq temps, voix de gauche assumée, ménage des formules « IA » |
| V12 | Refonte visuelle : presse, dense, sobre ; suppression du laboratoire de leviers |
| V13 | Police Work Sans embarquée, passe texte complète, comparateur reformulé |
| V14 | Ateliers fusionnés, projection de krach tardif, calculateurs enrichis, sources et métadonnées de publication vérifiées |

## 1. Thèse et architecture
- **Deux parties** : les faits, puis « À partir d'ici, nous prenons position ».
- **Trois étages** : plancher garanti par la répartition (niveau à décider), fonds souverain à règle de retrait, épargne individuelle libre avec avantages fiscaux conservés.
- **Ordre final** : hero, démographie, argent, ailleurs, partis, pivot, fiche de paie, trois étages, fonctionnement du fonds, bilan, personas, ateliers (4), conclusion, méthode, sources.
- « Notre modèle » est retiré du comparateur des partis. Les personas (Monique, Bernard, Léa) passent côté thèse.
- Le bilan dit ce que ça apporte, ce que ça coûte et **ce que le fonds ne fait pas** (pas de richesse créée, pas de protection contre les récessions, capture politique, épargne individuelle inégalitaire). Plus aucune mention d'« objections de gauche ».

## 2. Contenu
- **Ailleurs** : tableau Norvège / Canada / Suède / Suisse (qui alimente, qui décide, quand on retire, qui porte le risque). Le chiffre du fonds suisse, de source d'assureurs, est retiré.
- **Fiche de paie** : taux 2026 (plafond 48 060 €), environ 28 % du brut en cotisations retraite aux trois niveaux testés.
- **Texte** : titres descriptifs, phrases courtes, vouvoiement dans l'interface, espaces insécables, 18 justifications du comparateur raccourcies sans changer leur sens.

## 3. Ateliers
1. **Construire le financement** : trois recettes récurrentes, chiffre central et fourchette, qui paie, risque, source. Les estimations de CSG générale et de flat tax dont les assiettes se recoupent ne peuvent pas être cumulées.
2. **Chiffrer et tester la transition** *(V14)* : registre des ressources et simulateur forment un seul outil en deux étapes. Le jeu y envoie son montage, le simulateur le reprend aussitôt. Bouton « Charger un exemple ».
3. **Intérêts composés** : versement, durée, rendement, versement constant ou croissant, retrait à 3 % rapporté aux 422 Md€ de dépenses.
- **Marchés testés** : référence, rendement nul, krach de −35 % trois ans avant la fin des versements (nouveau). Le « choc au début » ne faisait presque rien sur un fonds vide.
- Le laboratoire de leviers en points de PIB est supprimé (doublon).

## 4. Design
- Palette papier / noir chaud / un accent brique. Fin des aplats orange et jaune.
- **Work Sans** embarquée (`fonts/`, licence OFL), plus de Georgia ni d'Inter. Titres descriptifs, hero avec le « 62 » en grand chiffre.
- Deux bandes sombres seulement : le pivot et la section argent.

## 5. Corrections
- Barres du ratio proportionnelles (une hauteur maximale écrasait 40 et 62).
- Débordement horizontal mobile corrigé, logo « 70 » qui dépassait supprimé.
- Montants sans décimale au-delà de 100 Md€.
- Mon erreur de revue : les barres de la part du PIB étaient déjà proportionnelles, et le séparateur de milliers existait (masqué par l'interlettrage).

## 6. Données ajoutées (`data/levers.js`, `src/model/payslip.js`)
| Levier | Central (Md€/an) | Fourchette | Source |
|---|---|---|---|
| Exonérations resserrées (3 → 2,4 SMIC) | 2 | 1,5–2,25 | Amendement PLFSS 2026 |
| Flat tax relevée | 2 | 1,4–3 | Amendement parlementaire; proposition rejetée |
| CSG sur les revenus concernés +1 pt | 13,2 | 11–13,5 | Rapport du Sénat 2018, actualisation à établir |

Les montants sont des ordres de grandeur, pas des recettes garanties. Le scénario annuel exclut les mesures ponctuelles et les économies déjà attendues du droit en vigueur. La hausse de CSG sur plusieurs revenus du capital étant déjà inscrite dans le droit 2026, elle n'est pas comptée comme nouvelle recette. CSG générale et flat tax sont mutuellement exclusives afin d'éviter le double comptage de leurs assiettes.

## 7. Tests
Les tests couvrent le contenu, les sources, les calculateurs, les scénarios financiers et les règles de cumul du jeu. Le nombre exact est indiqué par `npm test`.

## Suivis éditoriaux après publication
- Préciser les coordonnées de l'éditeur dans des mentions légales avant une campagne de diffusion plus large.
- Compléter la relecture visuelle mobile de toutes les sections et vérifier les textes alternatifs.
- Continuer à remplacer les chiffrages de propositions par des évaluations publiques indépendantes quand elles existent; les montants restant hypothétiques sont étiquetés comme tels.
- Réexaminer la sélection des partis et mouvements couverts; le périmètre actuel n'est pas exhaustif.
- Les portraits illustratifs encore utilisés sont crédités dans `assets/CREDITS.md`. Les portraits de responsables et logos inutilisés ont été retirés du site.
