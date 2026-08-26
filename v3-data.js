/* Retraites 2070 — source registry and editorial data.
 * Values tagged "simulation" or "assumption" are deliberately separated from observed/official data.
 */
window.RETRAITE_DATA = {
  meta: {
    updated: "2026-08-26",
    edition: "2026",
    baselineYear: 2025,
    fundInitialBn: 20.7,
    pensionSpendBn2025: 422.2,
    pensionSpendPctGdp2025: 14.1,
    corDeficit: { 2030: -0.2, 2045: -0.9, 2070: -2.4 }
  },

  demography: {
    // Published anchor points. Intermediate UI years are linearly interpolated and labelled as such in MODEL.md.
    ratio65to20_64: [
      { year: 2026, value: 40 },
      { year: 2040, value: 49 },
      { year: 2070, value: 62 }
    ],
    populationM: [
      { year: 2026, value: 69.1 },
      { year: 2037, value: 69.8 },
      { year: 2040, value: 69.7 },
      { year: 2050, value: 69.1 },
      { year: 2060, value: 67.8 },
      { year: 2070, value: 65.9 }
    ],
    // Only the endpoints are used as headline facts. Intermediate values are display interpolation.
    share65plus: [
      { year: 2026, value: 22.1 },
      { year: 2070, value: 32.0 }
    ],
    facts: {
      under45DeltaM: -8.9,
      over65DeltaM: 5.8,
      over80DeltaM: 4.6,
      fertilityFrom2028: 1.45,
      netMigrationPerYear: 150000,
      peakPopulationYear: 2037,
      peakPopulationM: 69.8
    }
  },

  thousandEuros: [
    { label: "Retraites", value: 253, className: "retirement" },
    { label: "Santé", value: 201, className: "health" },
    { label: "Autre protection sociale", value: 107, className: "social" },
    { label: "Éducation", value: 88, className: "education" },
    { label: "Autres services publics", value: 184, className: "services" },
    { label: "Fonctionnement des administrations", value: 66, className: "admin" },
    { label: "Soutien à l'économie", value: 59, className: "economy" },
    { label: "Intérêts de la dette", value: 31, className: "debt" },
    { label: "Infrastructures", value: 11, className: "infra" }
  ],

  parties: {
    actuel: {
      label: "Droit actuel",
      logo: null,
      status: "Règles en vigueur / suspension 2026",
      summary: "Répartition dominante. La montée vers 64 ans prévue par la réforme Borne a été suspendue ; sans nouvelle réforme, son calendrier doit reprendre en 2028.",
      answers: [
        { q: "Les pensions les plus élevées peuvent-elles contribuer davantage ?", a: "Pas par une règle générale d'indexation différenciée aujourd'hui.", tone: "neutral" },
        { q: "L'effort repose-t-il surtout sur le travail et l'âge ?", a: "La réforme 2023 utilise fortement l'âge et la durée de cotisation.", tone: "neutral" },
        { q: "Prépare-t-on des revenus futurs autrement que par les cotisations ?", a: "À la marge : FRR et épargne retraite existent, mais la répartition reste centrale.", tone: "neutral" },
        { q: "Si oui, qui possède ce capital ?", a: "FRR public + épargne privée individuelle ou d'entreprise.", tone: "neutral" }
      ],
      sources: ["current-2026", "frr-2025"]
    },
    lfi: {
      label: "LFI",
      logo: "assets/logos/lfi.png",
      status: "Programme publié",
      summary: "Retour à 60 ans à taux plein pour 40 annuités, hausse progressive des cotisations vieillesse, assujettissement de revenus financiers et indexation des pensions sur les salaires.",
      answers: [
        { q: "Les pensions les plus élevées peuvent-elles contribuer davantage ?", a: "La fiscalité est très progressive, mais le programme prévoit l'indexation générale des pensions sur les salaires.", tone: "neutral" },
        { q: "L'effort repose-t-il surtout sur le travail et l'âge ?", a: "Non : le programme réduit l'âge et cherche davantage de recettes/cotisations.", tone: "neutral" },
        { q: "Prépare-t-on des revenus futurs autrement que par les cotisations ?", a: "Pas comme pilier central : la répartition reste le modèle revendiqué.", tone: "neutral" },
        { q: "Si oui, qui possède ce capital ?", a: "Le FRR public existe, mais n'est pas transformé en pilier massif de capitalisation collective.", tone: "neutral" }
      ],
      sources: ["lfi-program"]
    },
    ps: {
      label: "PS",
      logo: "assets/logos/ps.svg",
      status: "Projet adopté en juillet 2026",
      summary: "Abrogation de la réforme Borne, âge légal ramené à 62 ans comme protection minimale, 43 annuités réductibles selon la pénibilité, et recettes supplémentaires issues notamment du capital.",
      answers: [
        { q: "Les pensions les plus élevées peuvent-elles contribuer davantage ?", a: "Le projet met l'accent sur la fiscalité du capital ; une indexation différenciée des hautes pensions n'est pas un axe central explicite.", tone: "neutral" },
        { q: "L'effort repose-t-il surtout sur le travail et l'âge ?", a: "Durée de cotisation de 43 ans, avec réduction liée à la pénibilité ; 62 ans reste un plancher protecteur.", tone: "neutral" },
        { q: "Prépare-t-on des revenus futurs autrement que par les cotisations ?", a: "Pas via un grand pilier de capitalisation dans le projet présenté.", tone: "neutral" },
        { q: "Si oui, qui possède ce capital ?", a: "Non spécifié comme architecture retraite centrale.", tone: "neutral" }
      ],
      sources: ["ps-project"]
    },
    rn: {
      label: "RN",
      logo: "assets/logos/rn.svg",
      status: "Ligne non stabilisée en 2026",
      summary: "Les dirigeants ont divergé : Marine Le Pen a défendu le maintien d'un âge légal et une capitalisation volontaire ; Jordan Bardella a envisagé un système sans âge légal, fondé sur la durée de cotisation, avec une possible part de capitalisation via un fonds souverain.",
      answers: [
        { q: "Les pensions les plus élevées peuvent-elles contribuer davantage ?", a: "Pas de doctrine stabilisée d'indexation différenciée identifiée dans la ligne 2026.", tone: "neutral" },
        { q: "L'effort repose-t-il surtout sur le travail et l'âge ?", a: "Point de désaccord interne : âge légal maintenu côté Le Pen, durée de cotisation sans âge légal envisagée côté Bardella.", tone: "warning" },
        { q: "Prépare-t-on des revenus futurs autrement que par les cotisations ?", a: "Oui, une part de capitalisation est désormais discutée, mais son caractère et son ampleur ne sont pas stabilisés.", tone: "warning" },
        { q: "Si oui, qui possède ce capital ?", a: "Bardella a évoqué un futur fonds souverain ; Le Pen a parlé de capitalisation volontaire individuelle.", tone: "warning" }
      ],
      sources: ["rn-bardella", "rn-lepen"]
    },
    attal: {
      label: "Attal / Renaissance",
      logo: "assets/logos/renaissance.svg",
      status: "Proposition politique 2025–2026",
      summary: "Gabriel Attal défend un nouveau système sans âge légal de départ, davantage lié à la durée de cotisation, avec une part de capitalisation.",
      answers: [
        { q: "Les pensions les plus élevées peuvent-elles contribuer davantage ?", a: "Ce n'est pas le cœur public de sa proposition telle qu'elle a été présentée.", tone: "neutral" },
        { q: "L'effort repose-t-il surtout sur le travail et l'âge ?", a: "Il veut sortir de l'âge légal fixe et raisonner davantage en durée de cotisation.", tone: "neutral" },
        { q: "Prépare-t-on des revenus futurs autrement que par les cotisations ?", a: "Oui : il défend explicitement une part de capitalisation.", tone: "neutral" },
        { q: "Si oui, qui possède ce capital ?", a: "La forme a varié dans les propositions macronistes ; le principe publié ne se confond pas avec le fonds collectif défendu par ce site.", tone: "neutral" }
      ],
      sources: ["attal-2026"]
    },
    notre: {
      label: "Notre modèle",
      logo: null,
      status: "Proposition du site — pas un programme existant",
      summary: "Répartition recentrée sur un socle redistributif, indexation plus protectrice pour les petites pensions, ajustements partagés et constitution d'un grand fonds public productif sur plusieurs décennies.",
      answers: [
        { q: "Les pensions les plus élevées peuvent-elles contribuer davantage ?", a: "Oui : sous-indexation ou effort progressif possible au-dessus de seuils protégés.", tone: "accent" },
        { q: "L'effort repose-t-il surtout sur le travail et l'âge ?", a: "Non : l'effort est partagé entre recettes, pensions élevées, emploi/durée et revenus du fonds.", tone: "accent" },
        { q: "Prépare-t-on des revenus futurs autrement que par les cotisations ?", a: "Oui : accumulation de capital public productif pendant 30 à 50 ans.", tone: "accent" },
        { q: "Si oui, qui possède ce capital ?", a: "Un fonds public sanctuarisé, propriété collective, avec gouvernance indépendante du budget courant.", tone: "accent" }
      ],
      sources: ["frr-2025", "cor-levers"]
    }
  },

  architectures: [
    {
      key: "payg",
      label: "Répartition renforcée",
      kicker: "Architecture",
      title: "Solidarité intergénérationnelle dominante",
      text: "Les cotisations et impôts courants financent l'essentiel des pensions. Les ajustements passent surtout par recettes, âge/emploi et niveau relatif des pensions.",
      tags: ["répartition", "redistribution", "peu de capitalisation"]
    },
    {
      key: "collective",
      label: "Propriété collective",
      kicker: "Proposition du site",
      title: "Répartition + fonds productif public",
      text: "Le socle reste public et redistributif, mais une part croissante du financement futur vient d'un patrimoine collectif accumulé et diversifié.",
      tags: ["répartition", "fonds public", "capital collectif"]
    },
    {
      key: "swiss",
      label: "Suisse",
      kicker: "Architecture réelle",
      title: "Trois piliers",
      text: "Premier pilier public par répartition, deuxième pilier professionnel financé par capitalisation, troisième pilier privé facultatif.",
      tags: ["public", "professionnel", "privé"],
      source: "swiss-pillars"
    },
    {
      key: "usa",
      label: "États-Unis",
      kicker: "Architecture réelle",
      title: "Social Security + épargne capitalisée",
      text: "Un socle fédéral Social Security coexiste avec des plans d'employeur et de l'épargne retraite individuelle. Ce n'est pas un système de retraite purement libertarien.",
      tags: ["Social Security", "employeur", "épargne individuelle"],
      source: "usa-ssa"
    },
    {
      key: "libertarian",
      label: "Libertarien",
      kicker: "Archétype théorique",
      title: "Petit filet public + capitalisation individuelle",
      text: "Scénario conceptuel utilisé pour comparer les mécanismes. Il ne décrit pas le système américain réel.",
      tags: ["filet minimal", "individuel", "risque privé"]
    }
  ],

  sources: {
    "insee-proj": {
      category: "Démographie",
      institution: "Insee",
      title: "Projections de population à l'horizon 2070 : une population plus âgée qu'en 2026, et probablement moins nombreuse",
      date: "8 juin 2026",
      url: "https://www.insee.fr/fr/statistiques/9004289",
      supports: "Population 2026/2070, pic 2037, ratio 65+/20–64, vieillissement, fécondité 1,45, solde migratoire +150 000."
    },
    "cor-2026": {
      category: "Retraites",
      institution: "Conseil d'orientation des retraites",
      title: "Rapport annuel du COR — juin 2026",
      date: "11 juin 2026",
      url: "https://www.cor-retraites.fr/rapports-du-cor/rapport-annuel-cor-juin-2026-evolutions-perspectives-retraites-france",
      supports: "Dépenses 2025, hypothèses 2026, déficits projetés 2030/2045/2070, structure du financement."
    },
    "budget-1000": {
      category: "Finances publiques",
      institution: "Direction du Budget / Insee",
      title: "Budget de l'État — à quoi servent 1 000 € de prélèvements obligatoires ?",
      date: "Données 2023, publication 2025",
      url: "https://www.economie.gouv.fr/files/files/2025/fipu/Budget_flyer.pdf",
      supports: "Répartition agrégée des 1 000 € : 561 € protection sociale dont 253 € retraites, 272 € services publics, etc."
    },
    "legifrance-cas": {
      category: "Comptabilité publique",
      institution: "Légifrance",
      title: "Taux de contribution employeur au CAS Pensions",
      date: "En vigueur depuis le 1er janvier 2026",
      url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000053217025/2026-05-28",
      supports: "82,28 % pour les personnels civils et 126,07 % pour les personnels militaires."
    },
    "ipp-cas": {
      category: "Comptabilité publique",
      institution: "Institut des politiques publiques",
      title: "Retraites des fonctionnaires d'État : faut-il changer la convention comptable ?",
      date: "mise à jour 5 juin 2026",
      url: "https://www.ipp.eu/publication/retraites-des-fonctionnaires-detat-faut-il-changer-la-convention-comptable/",
      supports: "18 Md€ de subvention implicite estimée ; reclassification à 25,8 Md€ ; exemple enseignement scolaire 81,3 → 70,7 Md€."
    },
    "frr-2025": {
      category: "Capital collectif",
      institution: "Fonds de réserve pour les retraites",
      title: "Résultats 2025 du FRR",
      date: "20 mars / juillet 2026",
      url: "https://www.fondsdereserve.fr/rapport-annuel-2025/",
      supports: "Actif net du FRR : 20,7 Md€ fin 2025 et mission de réserve au service des retraites."
    },
    "cor-levers": {
      category: "Retraites",
      institution: "Conseil d'orientation des retraites",
      title: "Impact macroéconomique des leviers d'équilibre financier d'un système de retraite",
      date: "26 mars 2026",
      url: "https://www.cor-retraites.fr/reunions-du-cor/impact-macroeconomique-leviers-dequilibre-financier-dun-systeme-retraite",
      supports: "Familles de leviers : dépenses, cotisations/prélèvements, âge de départ ; possibilité de les combiner."
    },
    "current-2026": {
      category: "Politiques",
      institution: "LCP — Assemblée nationale",
      title: "Présidentielle 2027 : qui propose quoi sur les retraites ?",
      date: "juin 2026",
      url: "https://lcp.fr/actualites/presidentielle-2027-qui-propose-quoi-sur-les-retraites-437864",
      supports: "État du calendrier après suspension de la réforme, positions comparées LFI/PS et autres acteurs."
    },
    "lfi-program": {
      category: "Politiques",
      institution: "La France insoumise",
      title: "L'Avenir en commun 2025 — Garantir une retraite digne",
      date: "édition 2025, position maintenue en 2026",
      url: "https://programme.lafranceinsoumise.fr/wp-content/uploads/2025/avenir_en_commun_2025.pdf",
      supports: "60 ans / 40 annuités, hausse cotisations vieillesse, revenus financiers, indexation pensions sur salaires, FRR."
    },
    "ps-project": {
      category: "Politiques",
      institution: "Parti socialiste",
      title: "Le Projet Socialiste — Vivre libres",
      date: "projet adopté le 2 juillet 2026",
      url: "https://projet-socialiste.fr/projet/vivre-libres/",
      supports: "Abrogation Borne, 62 ans comme protection minimale, 43 annuités réductibles selon pénibilité, recettes du capital."
    },
    "rn-bardella": {
      category: "Politiques",
      institution: "Le Monde",
      title: "Jordan Bardella rompt avec la réforme des retraites de Marine Le Pen et l'âge légal de départ",
      date: "29 mai 2026",
      url: "https://www.lemonde.fr/politique/article/2026/05/29/au-rn-l-explosion-du-dossier-inflammable-jordan-bardella-enterre-la-reforme-des-retraites-de-marine-le-pen-et-l-age-legal-de-depart_6694791_823448.html",
      supports: "Bardella envisage suppression de l'âge légal, durée de cotisation et possible capitalisation via fonds souverain ; ligne non tranchée."
    },
    "rn-lepen": {
      category: "Politiques",
      institution: "Le Parisien / AFP",
      title: "Marine Le Pen favorable à une part de capitalisation volontaire",
      date: "14 juin 2026",
      url: "https://www.leparisien.fr/politique/retraites-marine-le-pen-favorable-a-une-part-de-capitalisation-volontaire-et-refute-toute-contradiction-avec-jordan-bardella-14-06-2026-R6ZAASJV4BFHHH6RAR6G45GOPY.php",
      supports: "Le Pen maintient un âge légal et évoque une capitalisation volontaire."
    },
    "attal-2026": {
      category: "Politiques",
      institution: "RMC",
      title: "Gabriel Attal : « Je propose un nouveau système de retraites »",
      date: "27 janvier 2026",
      url: "https://www.youtube.com/watch?v=OAe-hKWflSk",
      supports: "Proposition sans âge légal de départ et avec une dose de capitalisation."
    },
    "swiss-pillars": {
      category: "International",
      institution: "Confédération suisse — ch.ch",
      title: "Prévoyance vieillesse : le système des trois piliers",
      date: "consulté en août 2026",
      url: "https://www.ch.ch/fr/retraite/prevoyance-vieillesse/comment-fonctionne-la-prevoyance-vieillesse/",
      supports: "Premier pilier public obligatoire et solidaire, deuxième pilier professionnel, troisième pilier privé."
    },
    "usa-ssa": {
      category: "International",
      institution: "U.S. Social Security Administration",
      title: "Retirement benefits",
      date: "consulté en août 2026",
      url: "https://www.ssa.gov/retirement",
      supports: "Existence du socle fédéral Social Security ; âge possible de début des prestations à partir de 62 ans selon conditions."
    },
    "drees-2025": {
      category: "Retraités",
      institution: "DREES",
      title: "Les retraités et les retraites — Édition 2025",
      date: "31 juillet 2025",
      url: "https://drees.solidarites-sante.gouv.fr/publications-communique-de-presse-documents-de-reference/250731_PANORAMAS-retraites",
      supports: "Effectifs, niveaux de pensions, niveau de vie et données distributives."
    }
  }
};
