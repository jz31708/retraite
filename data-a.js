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
      id: "pcf", name: "PCF", updated: "août 2026",
      summary: "60 ans à taux plein, pension à 75 % du revenu net d'activité et aucune pension sous le SMIC. Le financement repose sur les cotisations, l'emploi, les salaires et une cotisation sur les revenus financiers.",
      cells: {
        small: ["très forte", "yes", "Le PCF fixe un objectif de pension à 75 % du revenu net d'activité et aucune pension sous le SMIC."],
        high: ["faible", "no", "Les textes récents consultés renforcent les pensions et ne prévoient pas d'effort spécifique sur les pensions élevées."],
        workers: ["cotisations", "no", "Le PCF veut financer le système par les cotisations sociales, avec emploi et salaires plus élevés."],
        age: ["60 ans", "no", "Retraite à 60 ans à taux plein pour une carrière complète."],
        capitalTax: ["revenus financiers", "yes", "Le PCF propose de soumettre les revenus financiers des entreprises et banques à cotisation."],
        capitalisation: ["non", "no", "Le parti défend un système intégralement financé par la cotisation sociale."],
        socialOwnership: ["investissement public", "mixed", "Le PCF défend un rôle public fort dans l'économie, mais pas le fonds social de retraite décrit ici."],
        demography: ["réponse par l'emploi", "mixed", "Le parti répond au financement par l'emploi, les salaires, les cotisations et les revenus financiers plutôt que par une baisse des droits."]
      },
      sources: [
        ["Programme PCF, retraite à 60 ans", "https://www.pcf.fr/objectif_1"],
        ["Pétition PCF et financement", "https://www.pcf.fr/petition_retraite"]
      ]
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
      id: "ps", name: "PS", updated: "avril 2026",
      summary: "Le projet socialiste veut abroger la réforme Borne puis fonder le droit au départ sur 43 annuités, avec une durée réduite selon la pénibilité.",
      cells: {
        small: ["forte", "yes", "Le projet défend un système par répartition et une retraite en bonne santé. Le détail des minima doit encore être chiffré."],
        high: ["à préciser", "unknown", "Le projet d'avril 2026 ne fixe pas de règle spécifique d'effort pour les pensions élevées."],
        workers: ["43 annuités", "mixed", "Le projet retient une durée de cotisation de 43 annuités, réduite selon la pénibilité."],
        age: ["durée plutôt qu'âge", "mixed", "Après abrogation de la réforme Borne, le projet propose un droit calculé selon 43 annuités, avec réduction pour pénibilité."],
        capitalTax: ["à préciser", "unknown", "Le volet retraite du projet ne permet pas à lui seul de fixer une note sur la fiscalité du capital."],
        capitalisation: ["répartition", "no", "Le texte consulté propose de refonder le système par répartition."],
        socialOwnership: ["non documentée", "unknown", "Le projet retraite ne décrit pas de fonds de propriété sociale."],
        demography: ["réponse par la durée", "mixed", "Le projet abandonne le seul âge légal comme pivot et retient une durée de cotisation."]
      },
      sources: [["Projet socialiste, avril 2026", "https://ressources-militantes.parti-socialiste.fr/assets/pdf/PROJET_PS_V21avril-2.pdf"]]
    },
    {
      id: "pp", name: "Place publique", updated: "juin 2025",
      summary: "Raphaël Glucksmann a explicitement parlé de rééquilibrage entre classes d'âge et veut sortir du débat limité au seul âge légal.",
      cells: {
        small: ["forte", "yes", "Protection sociale revendiquée."],
        high: ["ouverte", "mixed", "Glucksmann a posé la question d'un rééquilibrage entre classes d'âge."],
        workers: ["rééquilibrer", "yes", "Le travail ne doit pas supporter seul la charge selon ses déclarations."],
        age: ["différencié", "mixed", "Certains à 60 ans, d'autres plus tard. Refus de focaliser tout le débat sur un âge unique."],
