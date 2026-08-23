# retraite

Prototype d'un site politique sur les retraites et la propriété collective du capital.

## Ouvrir le site

Le site est statique. Les fragments de données sont chargés avec `fetch`, donc il faut le servir en HTTP plutôt que d'ouvrir `index.html` directement.

```bash
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## Contenu

- démographie 1946 / 2026 et ratio cotisants-retraités ;
- cas Bernard / Léa pour rendre les arbitrages concrets ;
- ordres de grandeur LFI, retraites, stock contre flux ;
- dette et intérêts ;
- proposition de fonds collectif inaliénable ;
- simulateur d'accumulation ;
- comparateur des principaux partis ;
- citations récentes et sources cliquables ;
- annexes sur le financement public des retraites.

Les hypothèses de travail sont présentées comme telles. Les données observées renvoient vers leurs sources.
