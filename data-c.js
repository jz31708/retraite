        age: ["doctrine divisée", "mixed", "60 à 62 ans chez Le Pen, possible fin de l'âge fixe chez Bardella."],
        capitalTax: ["faible", "no", "Pas de forte fiscalité patrimoniale comparable à la gauche."],
        capitalisation: ["débat interne", "mixed", "Bardella a ouvert la porte à une part de capitalisation."],
        socialOwnership: ["fonds évoqué", "mixed", "Un fonds souverain a été évoqué, sans doctrine de propriété sociale comparable au projet présenté ici."],
        demography: ["divisé", "mixed", "Bardella a posé le problème structurel plus directement en 2026."]
      },
      sources: [
        ["Divergence Bardella et Le Pen", "https://www.lemonde.fr/politique/article/2026/05/29/au-rn-l-explosion-du-dossier-inflammable-jordan-bardella-enterre-la-reforme-des-retraites-de-marine-le-pen-et-l-age-legal-de-depart_6694791_823448.html"],
        ["Débat sur le gel, août 2026", "https://www.lemonde.fr/politique/article/2026/08/11/budget-2027-le-gouvernement-rouvre-le-dossier-sensible-du-gel-des-pensions-de-retraite_6744021_823448.html"]
      ]
    },
    {
      id: "ours", name: "Proposition", updated: "version de travail",
      summary: "Répartition de sécurité, petites pensions protégées, effort possible sur les pensions élevées et fonds collectif inaliénable.",
      cells: {
        small: ["très forte", "yes", "Indexation pleine du bas et plancher renforcé."],
        high: ["oui", "yes", "Sous-indexation progressive possible en cas de déséquilibre."],
        workers: ["dernier recours", "yes", "Hausse générale des prélèvements sur le travail en dernier recours."],
        age: ["adaptatif", "mixed", "Pas de 60 ans universel, protections pour carrières longues, pénibilité et handicap."],
        capitalTax: ["très forte", "yes", "Une partie finance la redistribution, une partie construit le fonds."],
        capitalisation: ["collective", "yes", "Capitalisation collective, sans comptes individuels à liquider."],
        socialOwnership: ["centrale", "yes", "Le capital appartient au fonds collectif et reste transmis aux générations suivantes."],
        demography: ["centrale", "yes", "Revue d'équilibre intergénérationnelle régulière."]
      },
      sources: []
    }
  ]
};

const QUOTES = [
  {
    person: "Manuel Bompard", party: "LFI", date: "18 août 2026",
    quote: "Je ne suis pas d'accord avec le fait que le gouvernement cible uniquement la catégorie des retraités.",
    context: "Interrogé sur l'idée de faire davantage contribuer les retraités aisés.",
    bernard: "La position ne sanctuarise pas Bernard contre l'impôt général. Elle refuse de lui demander un effort supplémentaire parce qu'il est retraité.",
    verdict: "Une sous-indexation ciblée de la pension de Bernard est rejetée par ce raisonnement.",
    url: "https://www.replay.fr/face-a-face-manuel-bompard-je-suis-pour-que-les-francais-les-plus-aises-contribue-6742867"
  },
  {
    person: "Aurélien Taché", party: "LFI", date: "21 août 2026",
    quote: "Ces retraités qui doivent continuer à aider leurs enfants et leurs petits-enfants, il faut les laisser tranquilles.",
    context: "Réaction au débat sur le gel ou la sous-indexation de pensions.",
    bernard: "Le propos ne fixe pas de plafond de pension. Pris au pied de la lettre, il protège aussi des retraités aisés qui aident leur famille.",
    verdict: "La logique tend à protéger Bernard d'un effort ciblé sur sa pension.",
    url: "https://x.com/BFMTV/status/2090898858297467099"
  },
  {
    person: "Jean-Philippe Tanguy", party: "RN", date: "11 août 2026",
    quote: "un racket contre les retraites",
    context: "Réaction au retour du débat sur une moindre indexation ou un gel ciblé des pensions.",
    bernard: "Le rejet porte sur le principe d'une économie prise sur les pensions.",
    verdict: "Protection forte des pensions déjà versées.",
    url: "https://www.lemonde.fr/politique/article/2026/08/11/budget-2027-le-gouvernement-rouvre-le-dossier-sensible-du-gel-des-pensions-de-retraite_6744021_823448.html"
  },
  {
    person: "Aleksandar Nikolic", party: "RN", date: "18 août 2026",
    quote: "C'est indécent.",
    context: "À propos d'une contribution des retraités aisés.",
    bernard: "Le propos défend explicitement le principe de ne pas cibler les retraités aisés.",
    verdict: "Oui, cette position protège directement un cas comme Bernard.",
    url: "https://www.dailymotion.com/video/xayv2hy"
  },
  {
    person: "Louis Aliot", party: "RN", date: "22 août 2026",
    quote: "On n'y est pas favorable, c'est prendre pour cible des gens qui sont les premières victimes du système.",
    context: "Réponse à une question sur une contribution des retraités aisés.",
    bernard: "La position refuse le ciblage des retraités aisés en tant que groupe.",
    verdict: "Oui, Bernard entre dans le principe défendu.",
    url: "https://x.com/BFMTV/status/2091085269105602641"
  }
];

const SOURCES = [
  {kind:"Institution", title:"COR, rapport annuel 2026", note:"Dépenses, projections, solde et hypothèses du système de retraite.", url:"https://www.cor-retraites.fr/sites/default/files/2026-06/RA_2026_def.pdf"},
  {kind:"Institution", title:"Insee, cotisants et retraités", note:"Série tous régimes et rapport démographique récent.", url:"https://www.insee.fr/fr/statistiques/2415121"},
  {kind:"Institution", title:"Insee, régime général", note:"Longue série CNAV du rapport cotisants sur retraités.", url:"https://www.insee.fr/fr/statistiques/3676670"},
  {kind:"Institution", title:"Insee, démographie 2026", note:"Structure par âge et vieillissement de la population.", url:"https://www.insee.fr/fr/statistiques/8719824"},
  {kind:"Institution", title:"Insee, population historique", note:"Série par âge depuis 1946 pour comparer la France de l'après-guerre à aujourd'hui.", url:"https://www.insee.fr/fr/statistiques/6037741"},
  {kind:"Institution", title:"Insee, profil par âge 2022", note:"Population par groupes d'âge utilisée pour le profil récent du graphique.", url:"https://www.insee.fr/fr/statistiques/8581713?geo=FE-1&sommaire=8581745"},
  {kind:"Institution", title:"Insee, projections 2070", note:"Nouvelles projections démographiques publiées en 2026.", url:"https://www.insee.fr/fr/statistiques/9004289"},
  {kind:"Données démographiques", title:"World Population Prospects, France 1950", note:"Profil par âge de 1950 utilisé pour rendre visible la structure de la population d'après-guerre.", url:"https://www.populationpyramid.net/fr/france/1950/"},
  {kind:"Programme", title:"LFI, Avenir en commun 2025", note:"Âge, durée, cotisations, indexation et financement proposés.", url:"https://programme.lafranceinsoumise.fr/wp-content/uploads/2025/avenir_en_commun_2025.pdf"},
  {kind:"Programme", title:"LFI, plan de justice fiscale", note:"Chiffrage des recettes supplémentaires sur hauts revenus et patrimoines.", url:"https://programme.lafranceinsoumise.fr/wp-content/uploads/2024/02/Plan_UP_JUSTICE-FISCALE_web-3-1.pdf"},
  {kind:"Fonds public", title:"Fonds de réserve pour les retraites", note:"20,7 Md€ d'actifs fin 2025. Précédent public français d'investissement pour les retraites.", url:"https://www.fondsdereserve.fr/"},
  {kind:"Capital public", title:"Agence des participations de l'État", note:"209,1 Md€ de portefeuille au 30 juin 2025. Des actifs déjà publics, pas un financement nouveau.", url:"https://www.economie.gouv.fr/agence-participations-etat/comprendre-lape/les-entreprises-de-lape"},
  {kind:"Dette", title:"Insee, intérêts des administrations publiques", note:"64,7 Md€ en 2025.", url:"https://www.insee.fr/fr/statistiques/2381404"},
  {kind:"Financement public", title:"Service des retraites de l'État", note:"Taux de contribution employeur pour les pensions civiles. 82,28 % en 2026.", url:"https://retraitesdeletat.gouv.fr/professionnels/le-versement-des-cotisations/les-etablissements-publics-nationaux-ou-organismes"},
  {kind:"Histoire", title:"Sécurité sociale, grandes dates", note:"Ordonnances de 1945 et construction du régime général.", url:"https://www.securite-sociale.fr/la-secu-cest-quoi/histoire/les-grandes-dates"},
  {kind:"Recherche", title:"Plan Meidner et wage-earner funds", note:"Travaux historiques sur une tentative de propriété collective progressive du capital en Suède.", url:"https://swopec.hhs.se/iuiwop/papers/iuiwop0533.pdf"}
];