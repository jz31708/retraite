# Retraites 2070 — changements V6 → V7

## Principe
Le site fait désormais deux choses séparées au lieu de les mélanger.
- **Partie 1 · Les faits** : démographie, argent, positions des partis. Ton sobre.
- **Un pivot explicite**, puis **Partie 2 · Notre position** : proposition, bilan avantages/risques, personas, transition, simulateur, leviers.

## Structure
Ordre des sections : hero, démographie, argent, **comparateur des partis**, **pivot**, proposition, **bilan**, personas, transition, simulateur, leviers, conclusion, méthode, sources.
- Le comparateur passe avant la proposition. L'onglet « Notre modèle » est retiré du comparateur (filtre dans `src/ui/politics.js`; les données restent dans `site-data.js`).
- Nouvelle section **pivot** : « Jusqu'ici : les faits. Désormais : notre position. »
- Nouvelle section **bilan** : avantages et risques (double charge, rendements, capture politique, fuite de l'assiette, ce qui reste à chiffrer).
- Les personas (Monique, Bernard, Léa) passent en partie 2 : c'est un argument de notre thèse (protéger les petites pensions), pas un fait. La question orientée sur Bernard devient une position assumée avec sa limite juridique.
- Navigation : Les faits · L'argent · Les partis · Notre proposition · La transition · Les sources. Les numéros de section sont recalculés dans l'ordre.

## Texte
- Fin du schéma « slogan gras + phrase en italique » : les titres décrivent la section (« Une population qui vieillit. », « La transition coûte : deux charges à la fois. »). L'italique reste réservé à la partie 2.
- Retrait des négations défensives (« ce n'est ni une note ni… », « ce ratio ne mesure pas… »). Restent les avertissements nécessaires.
- Hero : un contrepoint chiffré (part des retraites dans le PIB : 14,1 % → 15,3 %) à côté du ratio 62.
- Jargon retiré : « registre », « MODEL.md » devient « documentation ».
- Tampon décoratif « À vous de chiffrer » supprimé.

## Style (CSS, bloc « V7 » en fin de `site.css`)
- Interlettrage et interligne moins serrés, titres un peu plus petits.
- Échelle de texte relevée (`html` à 112,5 % sur desktop, 106 % sur mobile) : les petits textes de 11-12 px passent à environ 13 px.
- Jaune du simulateur adouci, texte plus contrasté sur l'orange.
- Marge d'ancre augmentée pour que les titres ne collent plus sous le header.
- Mobile : badge ↗ du hero masqué (il chevauchait « INSEE · 2070 »).

## Correctifs
- **Barres du ratio** : la hauteur maximale de 205 px écrasait les barres 40 et 62. Elles sont maintenant proportionnelles (77 / 128 / 198 px).
- **Montants** : plus de décimale au-dessus de 100 Md€ (« 3 016 Md€ »). Le séparateur de milliers existait déjà, mais le `letter-spacing` négatif le masquait.

## Corrections de ma revue initiale
- Les barres de la part du PIB (14,7 / 14,1 / 15,3 %) sont bien proportionnelles à zéro : pas d'axe tronqué. Elles paraissent proches parce que les valeurs le sont.
- Le séparateur de milliers n'était pas absent (voir plus haut).

## Pas fait
- Le **jeu** de construction de financement (leviers à chiffre central, fourchette en petit, verdict sous chocs de marché).
- La page des **trois scénarios** (prudent / offensif / rupture) plus le scénario zéro, et la liste de leviers sourcés.
- Un état d'exemple pré-rempli dans le simulateur (il démarre toujours à 0 Md€).
- Les sources de la partie « leviers » restent à ajouter; aucun rendement fiscal n'a été vérifié.
- Les textes des sources, des cartes de garde-fous et de MODEL.md n'ont pas été repris.
- Pas de rendu navigateur après patch : à vérifier visuellement (mobile surtout).

## Vérification
`npm test` : 13 tests passent.
