# retraite

Site politique statique sur les retraites, l'équité entre générations et la propriété sociale du capital.

## Ce que montre la version actuelle

Le parcours principal tient sur quelques idées visibles avant les détails :

1. la structure par âge a changé ;
2. protéger une petite pension n'oblige pas à protéger une pension élevée de la même manière ;
3. une fortune est un stock, une retraite un flux annuel ;
4. une partie des prélèvements sur le capital peut construire un actif collectif durable ;
5. les revenus de cet actif peuvent compléter la répartition à long terme ;
6. les partis sont comparés sur les mêmes critères, avec dates et sources.

Le site sépare les données observées, les simulations et la proposition politique. Les chiffres importants renvoient vers leur source.

## Lancer en local

Le site utilise `fetch()` pour assembler les données du comparateur. Il faut donc le servir en HTTP.

```bash
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## Fichiers

- `content-a.js`, `content-b.js`, `content-c.js` contiennent le parcours éditorial ;
- `data-a.js`, `data-b.js`, `data-c.js` contiennent les positions politiques, citations et sources ;
- `data-loader.js` assemble ces données avant de charger l'application ;
- `app.js` gère les graphiques et interactions ;
- `styles-a.css`, `styles-b.css`, `styles-c.css` contiennent la mise en page responsive.
