# Retraites 2070 — changements V7 → V8

## Ajouts
- **Jeu « Construis ton financement »** (section `#jeu`, avant le registre de transition). Le joueur fixe l'objectif annuel (10 à 60 Md€, 40 par défaut), puis règle l'intensité de six leviers (0, 25, 50, 75, 100 %).
  - Chaque levier affiche un chiffre central, une fourchette en petit, qui paie, le risque et un lien vers sa source.
  - Panneau de résultat : total central et fourchette, jauge vs objectif, payeurs, et tableau du capital final à 40 ans sous trois marchés (référence 3 %, rendement nul, choc au début), pour le chiffre central et la fourchette basse.
  - Quatre scénarios prédéfinis : **Ne rien changer** (scénario zéro), **Prudent** (6 Md€), **Offensif** (15,6 Md€), **Tout actionner** (35,2 Md€, sous l'objectif de 40).
  - « Envoyer au simulateur » remplit les quatre lignes du registre et l'objectif. « Copier mon montage » partage l'état dans l'URL (`#jeu=…`).
- **Exemple pré-rempli** : bouton « Charger un exemple » dans le registre (scénario Offensif). Le registre reste à zéro par défaut.

## Leviers et sources (`data/levers.js`)
| Levier | Central | Fourchette | Base |
|---|---|---|---|
| Exonérations resserrées (3 → 2,4 SMIC) | 2 | 1,5–2,25 | amendement PLFSS 2026 |
| CSG capital +1 pt | 2 | 1,5–2,2 | amendements AN |
| Flat tax relevée sur gros revenus | 2 | 1,4–3 | amendement PLF 2026 |
| CSG générale +1 pt | 12 | 11–13,5 | MoneyVox (chiffrage 2017) |
| Âge légal 64 ans | 13,6 | 10–17,7 | Public Sénat |
| Gel des pensions (1 an) | 3,6 | 3–4 | Previssima |

Chaque fiche dit ce qui est sourcé et ce qui est une hypothèse du site (`basis`). Les bornes sans source directe sont signalées comme telles.

## Limites à connaître
- Ce sont des **ordres de grandeur** tirés d'amendements parlementaires, de presse et de notes d'intérêt. Ils portent la marque de leurs auteurs : à remplacer par COR, Cour des comptes ou CAE avant publication large.
- Le chiffrage de la CSG générale date de 2017 (euros 2017).
- Le gain de l'âge à 64 ans est contesté (de 2,8 à 17,7 Md€ selon les sources); le jeu retient la version Sénat au centre.
- **Non inclus faute de chiffrage sourcé** : droits de succession, émission obligatoire d'actions (modèle suédois), participations publiques, plafonnement ou effort ciblé sur les hautes pensions, capitalisation individuelle. La taxe Zucman est exclue à ta demande.
- Les leviers ne sont pas additifs en toute rigueur (effets de comportement et d'assiette croisés) : le total est une somme simple.
- Pas de rendu navigateur : j'ai vérifié les tests (`npm test`, 16 passent), pas l'affichage.
