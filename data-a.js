const PARTY_DATA = {
  criteria: [
    { id: "small", label: "Petites pensions", group: "retirees" },
    { id: "high", label: "Effort sur pensions élevées", group: "retirees" },
    { id: "workers", label: "Effort demandé aux actifs", group: "workers" },
    { id: "age", label: "Âge et durée", group: "workers" },
    { id: "capitalTax", label: "Taxe capital et patrimoine", group: "capital" },
    { id: "capitalisation", label: "Capitalisation", group: "capital" },
    { id: "socialOwnership", label: "Propriété collective du capital", group: "capital" },
    { id: "demography", label: "Contrainte démographique reconnue", group: "workers" }
  ],
  parties: [
    {
      id: "lfi", name: "LFI", updated: "août 2026",
      summary: "60 ans et 40 annuités, pensions mieux protégées, hausse des cotisations et fiscalité forte du capital.",
      cells: {
        small: ["forte", "yes", "Minimums relevés et carrière complète au SMIC revalorisé."],
        high: ["faible", "no", "Doctrine récente opposée au ciblage spécifique des retraités aisés."],
        workers: ["hausse", "no", "+0,25 point de cotisation vieillesse par an dans le programme."],
        age: ["60 ans", "no", "60 ans à taux plein pour 40 annuités."],
        capitalTax: ["très forte", "yes", "Hauts revenus, patrimoines et assiettes financières davantage taxés."],
        capitalisation: ["non", "no", "Pas de grand pilier nouveau de capitalisation dans le programme."],
        socialOwnership: ["partielle", "mixed", "Intervention publique et nationalisations possibles, mais pas de fonds social d'accumulation tel que proposé ici."],
        demography: ["autre réponse", "mixed", "Le financement passe surtout par salaires, emploi, cotisations et partage de la valeur."]
      },
      sources: [
        ["Avenir en commun 2025", "https://programme.lafranceinsoumise.fr/wp-content/uploads/2025/avenir_en_commun_2025.pdf"],
        ["Budget LFI 2026", "https://lafranceinsoumise.fr/wp-content/uploads/2025/10/Budget-2026_LFI_web_pages.pdf"]
      ]
    },
    {
      id: "pcf", name: "PCF", updated: "à consolider",
      summary: "Ligne historique proche de LFI sur 60 ans, répartition, salaires et pensions. La doctrine 2027 doit encore être sourcée avec un texte national récent.",
      cells: {
        small: ["forte", "yes", "Ligne historique très protectrice."],
        high: ["faible", "no", "Pas de mécanisme récent vérifié ici visant les pensions élevées."],
        workers: ["cotisations", "mixed", "Financement par emploi, salaires et cotisations dans les textes disponibles."],
        age: ["60 ans", "no", "Position historique du parti."],
        capitalTax: ["forte", "yes", "Contribution accrue du capital dans la doctrine du parti."],
        capitalisation: ["non", "no", "Défense de la répartition."],
        socialOwnership: ["oui, autre forme", "mixed", "Tradition de propriété publique, sans le mécanisme précis de fonds proposé ici."],
        demography: ["à préciser", "unknown", "Programme national 2027 à consolider."]
      },
      sources: [["Document PCF disponible", "https://23.pcf.fr/sites/default/files/argumentaire_retraite_0.pdf"]]
    },
    {
      id: "eco", name: "Écologistes", updated: "juillet 2026",
      summary: "Abrogation de la réforme Borne, retour à 62 ans, objectif 60 ans selon la pénibilité, rejet de la capitalisation.",
      cells: {
        small: ["forte", "yes", "Protection sociale forte dans le programme."],
        high: ["à préciser", "unknown", "Pas de doctrine détaillée vérifiée ici sur la sous-indexation des pensions élevées."],
        workers: ["à préciser", "unknown", "Financement complet à détailler."],
        age: ["62 ans", "mixed", "Retour à 62 ans, 60 ans selon pénibilité."],
        capitalTax: ["forte", "yes", "Fiscalité écologique et progressive du capital."],
        capitalisation: ["non", "no", "Rejet annoncé d'une évolution vers la capitalisation."],
        socialOwnership: ["à préciser", "unknown", "Pas de fonds social retraite vérifié."],
        demography: ["partielle", "mixed", "Le programme ajuste l'âge selon pénibilité mais refuse la capitalisation."]
      },
      sources: [["Programme 2027 présenté en juillet 2026", "https://www.lemonde.fr/politique/article/2026/07/13/premiere-republique-ecologique-et-citoyenne-le-programme-des-ecologistes-pour-peser-en-2027_6723128_823448.html"]]
    },
    {
      id: "ps", name: "PS", updated: "août 2026",
      summary: "Doctrine 2027 encore mouvante. Défense de la répartition, opposition au recul à 64 ans, positions internes différentes sur l'effort des retraités aisés.",
      cells: {
        small: ["forte", "yes", "Protection des petites pensions largement partagée."],
        high: ["divisé", "mixed", "Des responsables acceptent une contribution, d'autres la contestent."],
        workers: ["à préciser", "unknown", "Doctrine finale 2027 non stabilisée."],
        age: ["< 64", "mixed", "Le parti a poussé la suspension de la réforme, doctrine finale à préciser."],
        capitalTax: ["forte", "yes", "Fiscalité progressive du capital dans la tradition programmatique récente."],
        capitalisation: ["fonds de réserve", "mixed", "Des responsables évoquent plutôt un fonds de réserve public qu'un compte individuel."],
        socialOwnership: ["à préciser", "unknown", "Pas de doctrine nationale stabilisée sur la propriété sociale."],
        demography: ["divisé", "mixed", "Le débat interne existe sur le partage de l'effort."]
      },
      sources: [["Doctrine 2027 à consolider", "https://www.parti-socialiste.fr/"]]
    },
    {
      id: "pp", name: "Place publique", updated: "juin 2025",
      summary: "Raphaël Glucksmann a explicitement parlé de rééquilibrage entre classes d'âge et veut sortir du débat limité au seul âge légal.",
      cells: {
        small: ["forte", "yes", "Protection sociale revendiquée."],
        high: ["ouverte", "mixed", "Glucksmann a posé la question d'un rééquilibrage entre classes d'âge."],
        workers: ["rééquilibrer", "yes", "Le travail ne doit pas supporter seul la charge selon ses déclarations."],
        age: ["différencié", "mixed", "Certains à 60 ans, d'autres plus tard. Refus de focaliser tout le débat sur un âge unique."]
