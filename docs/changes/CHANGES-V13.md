# Retraites 2070 — V13 : passe texte complète et police

## Police
- **Work Sans** (licence OFL, fichier `fonts/WorkSans-OFL.txt`), embarquée en local : `fonts/*.woff`, quatre graisses (400, 400 italique, 700, 700 italique), sous-ensemble latin d'environ 20 Ko chacune, `font-display: swap`. Aucun appel à un service externe.
- Pourquoi : grotesque sobre aux formes un peu anciennes, lisible en petit, chiffres tabulaires et chiffres alignés disponibles. Elle évite les polices que les outils de génération utilisent par défaut (Inter, serif d'accroche).
- Georgia et Inter sont retirées du CSS. Repli : Helvetica Neue, Arial.

## Texte : principes
- Phrases plus courtes, à l'indicatif, sans méta-commentaire ni formule de précaution inutile.
- Mêmes mots pour les mêmes choses (plancher, fonds, étage, atelier).
- Vouvoiement partout dans l'interface (fini le mélange tu / vous).
- Plus de « fabriquerait un total qui ne correspond à aucune convention comptable », « ce n'est pas un déficit caché », « les contrôles ne transforment pas ces choix en politiques adoptées », etc.
- Espaces insécables avant `%`, `€`, `:`, `?` pour éviter les retours à la ligne au milieu d'un chiffre.

## Sections reprises
Argent (cartes, accordéon, 253 € sur 1 000), fonctionnement du fonds et garde-fous, personas, atelier de transition, simulateur, méthode, intro des sources, jeux (vouvoiement), et les 18 justifications du comparateur des partis (`data/site-data.js`) : même sens, formulation plus courte et uniforme (« Pas de … dans le texte cité »).

## Pas fait
- Fiches de sources (titres et résumés) : elles sont liées à des tests et à des citations, à reprendre une par une avec les sources ouvertes.
- `MODEL.md`, `EDITORIAL-V4.md`, `README.md` : documents internes non relus.
- Apostrophes droites conservées (un test s'appuie sur une chaîne avec apostrophe droite) ; guillemets français sans insécable pour la même raison.
- Aucune relecture juridique ; toujours pas de balises Open Graph, mentions légales, ni compression de l'image de 3,6 Mo.
- Rendu vérifié sur le hero, l'argent, le jeu et le mobile ; pas sur chaque section.
- Tests : 19 passent.
