# retraite

Site politique sur les retraites, l'équité entre générations et une proposition de propriété sociale du capital.

## Direction

Le site part d'un constat simple : la répartition reste un socle de solidarité, mais la démographie et la charge transmise aux actifs imposent de choisir qui absorbe l'ajustement. La proposition protège fortement les petites pensions, accepte un effort sur les pensions élevées et construit progressivement un fonds collectif inaliénable dont les revenus peuvent financer une part croissante des retraites.

Le comparateur politique sert à situer cette proposition face aux partis. Il ne remplace pas le propos principal.

## Direction visuelle

Le design emprunte davantage au journal, au tract et au média politique indépendant qu'à une landing page produit :

- noir, rouge, vert acide et papier brut ;
- typographie très large et condensée ;
- aplats francs, traits épais, angles droits ;
- presque aucune ombre ni carte arrondie ;
- graphiques intégrés à la mise en page comme des éléments éditoriaux ;
- un code couleur différent pour chaque grand chapitre.

`editorial.css` est chargé après les feuilles de style de base. Il porte cette identité et doit être traité comme la direction visuelle du projet, pas comme un thème facultatif.

## Lancer le site

Le site est statique. Les fichiers de données du comparateur sont chargés côté navigateur, donc lancez un petit serveur HTTP depuis la racine du dépôt :

```bash
python -m http.server 8080
```

Puis ouvrez `http://localhost:8080`.

## Méthode

Les chiffres observés renvoient vers leurs sources. Les simulations sont annoncées comme telles. Les choix politiques sont séparés des constats statistiques. Quand deux séries n'ont pas le même périmètre, le site le dit au lieu de les fusionner.
