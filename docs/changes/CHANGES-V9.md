# Retraites 2070 — changements V8 → V9

## Ajouts
- **Section « Ailleurs »** (partie 1, avant les partis) : Norvège, Canada, Suède, Suisse. Pour chaque pays : faits chiffrés, ce que le cas montre, ce qu'il ne montre pas, sources. Repère France : FRR 20,7 Md€, environ 5 % d'une année de dépenses.
  - Lecture assumée : la Suède et la Suisse sont les plus proches de notre idée (répartition conservée + matelas). Le fait que la réserve française soit bien plus petite est dit explicitement.
- **Jeu 2 « Qui paie »** : simulateur de fiche de paie. Salaire brut, part du financement déplacée hors salaires (0 à 50 %), base de remplacement (capital, TVA, patrimoine). Résultat : cotisations retraite salarié et employeur, gain net mensuel, économie employeur, somme à trouver ailleurs par salarié.
- **Jeu 3 « Combien investir »** : versement annuel, durée, rendement réel, versement constant ou croissant (+2 / +3 %/an). Résultat : capital, versements, gains, retrait à 3 % rapporté aux 422,2 Md€ de dépenses. La phrase « brutale » est voulue.
- **Texte de la proposition** : « La répartition reste le socle… Le fonds est un matelas de sécurité… Il ne remplace aucune pension. »
- Nav : entrée « Les jeux ».
- Tests : 19 passent (calcul de fiche de paie et d'intérêts composés vérifiés).

## Taux utilisés (fiche de paie, 2026)
Plafond de la Sécurité sociale 48 060 €. Vieillesse plafonnée 6,90 % salarié / 8,55 % employeur; déplafonnée 0,40 % / 2,11 %. Agirc-Arrco T1 3,15 % / 4,72 % plus CEG 0,86 % / 1,29 %; T2 8,64 % / 12,95 % plus CEG 1,08 % / 1,62 %. Sources croisées : Weblex, Payfit, MSA, Hayot. À recouper avec l'Urssaf et Agirc-Arrco avant publication.

## Limites
- Fiche de paie simplifiée : pas de CSG, d'impôt, de chômage, ni de statut cadre/non-cadre ou de régimes spéciaux. Elle ne dit pas non plus combien rapporte l'autre assiette à l'échelle du pays : aucun chiffre sourcé.
- Norvège : le fonds finance le budget de l'État, pas directement les pensions. Je l'ai écrit, mais un lecteur pressé peut l'oublier.
- Chiffre du fonds suisse (35 Md CHF fin 2023) : source d'un syndicat d'assureurs, à recouper avec compenswiss ou l'OFAS. Sources canadiennes et suédoises : presse et sites de fonds, pas encore les rapports officiels.
- Le Canada et la Suède ne sont pas des preuves du fonds qu'on propose (cotisations investies, tampon d'un système contributif). Le texte le dit.
- Les sections ne sont pas dans le registre de sources (leurs liens sont dans les cartes).

## Pas fait
- Débordement mobile (403 px pour 390), logo « 70 » qui dépasse, textes sous 12 px : non corrigés.
- Le scénario « choc au début » du jeu 1 est trompeur (fonds vide). À remplacer par un krach tardif.
- Jeux non reliés entre eux (la fiche de paie n'alimente pas le registre de transition).
- Pas de rendu mobile vérifié des nouvelles sections.
