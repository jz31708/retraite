# Retraites 2070

Un site éditorial interactif sur le système français de retraite, son financement et une proposition de fonds collectif. Il sépare les données observées, les projections officielles, les positions politiques sourcées et les hypothèses du simulateur.

## Lancer le site en local

Le projet est volontairement statique et ne dépend d'aucune compilation :

```powershell
python -m http.server 8080
```

Ouvrir ensuite `http://localhost:8080`. Pour vérifier la racine GitHub Pages `/retraite/`, les références d'images, de styles et de scripts restent relatives au dépôt.

## Vérifier le modèle

Node.js 20 ou plus récent suffit; aucune dépendance externe n'est requise.

```powershell
npm test
```

Les tests vérifient les formules de financement et de retraits, les ordres de rendement, l'intégrité du registre de sources, la correspondance entre les fiches affichées et leurs références, ainsi que quelques invariants du contenu.

## Parcours du site

1. Évolution démographique et périmètre des ratios.
2. Dépenses, recettes et conventions de comptabilité.
3. Vignettes fictives pour montrer l'incidence possible d'un même taux.
4. Proposition de préserver la répartition et de bâtir un fonds collectif, avec des garde-fous de propriété, de retrait et de contrôle à adopter.
5. Ateliers liés : leviers annuels, registre de transition et simulation des marchés.
6. Fiche de paie simplifiée et intérêts composés avec paramètres modifiables.
7. Leviers COR séparés du fonds et comparateur politique sourcé.
8. Méthode, limites et fiches de sources officielles.

Le modèle, ses conventions et ses limites sont détaillés dans [MODEL.md](MODEL.md). La note [EDITORIAL-V4.md](EDITORIAL-V4.md) est conservée comme archive et ne décrit plus le site courant.
