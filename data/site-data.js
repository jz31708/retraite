export const verificationDate = "2026-10-03";

export const sourceRegistry = [
  { id:"insee-pop", publisher:"Insee", category:"Démographie", kind:"Projection officielle", title:"Projections de population à l'horizon 2070", publicationDate:"2026-06-08", checkedAt:verificationDate, scope:"Population de la France; scénario central et variantes démographiques", reference:"Publication du 8 juin 2026; tableaux et graphiques de projections", supports:"Effectifs de population, structure par âge et scénarios démographiques.", url:"https://www.insee.fr/fr/statistiques/9004289" },
  { id:"cor-2026", publisher:"Conseil d'orientation des retraites", category:"Retraites", kind:"Rapport public", title:"Rapport annuel — évolutions et perspectives des retraites", publicationDate:"2026-06-11", checkedAt:verificationDate, scope:"Système français de retraite, ensemble des régimes", reference:"Figures 2.2, 2.10 et 2.12; parties 1 et 2; annexe 2, p. 228", supports:"Dépenses, poids dans le PIB, ressources, soldes et leviers.", url:"https://www.cor-retraites.fr/sites/default/files/2026-06/RA_2026_def.pdf" },
  { id:"budget-1000", publisher:"Direction du Budget / Insee", category:"Finances publiques", kind:"Ventilation publique", title:"À quoi servent 1 000 € de prélèvements obligatoires ?", publicationDate:"2025", checkedAt:verificationDate, scope:"Dépenses agrégées des administrations publiques en 2023", reference:"Infographie, données Insee 2023", supports:"Ventilation normalisée par poste; 253 € sur 1 000 pour les retraites.", url:"https://www.budget.gouv.fr/documentation/file-download/30518" },
  { id:"law-2026", publisher:"Journal officiel / Légifrance", category:"Règles en vigueur", kind:"Texte juridique", title:"Loi de financement de la Sécurité sociale pour 2026", publicationDate:"2025-12-30", checkedAt:verificationDate, scope:"Règles françaises d'assurance vieillesse; dispositions par génération et régime", reference:"Loi n° 2025-1403 du 30 décembre 2025", supports:"Modifications des âges et durées applicables à certaines générations.", url:"https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053226384" },
  { id:"frr-assets", publisher:"Fonds de réserve pour les retraites", category:"Capital collectif", kind:"Rapport annuel", title:"Rapport annuel 2025", publicationDate:"2026-07", checkedAt:verificationDate, scope:"Actif du FRR à fin 2025", reference:"Rapport annuel 2025, page de publication", supports:"20,7 Md€ sous gestion à fin 2025; un stock observé, pas une autorisation de transfert.", url:"https://www.fondsdereserve.fr/publications/rapport-annuel/" },
  { id:"frr-cades", publisher:"Fonds de réserve pour les retraites", category:"Capital collectif", kind:"Mission et flux", title:"Créer de la valeur — versements à la Cades", publicationDate:null, checkedAt:verificationDate, scope:"Versements du FRR vers la Cades et actif sous gestion", reference:"Page institutionnelle consultée le 3 octobre 2026", supports:"Versement annuel prévu de 1,45 Md€ de 2025 à 2033; actif de 20,7 Md€ à fin 2025.", url:"https://www.fondsdereserve.fr/a-propos/les-missions-du-frr/creer-de-la-valeur/" },
  { id:"cas-pensions", publisher:"Légifrance", category:"Finances publiques", kind:"Décret en vigueur", title:"Contribution employeur au CAS Pensions", publicationDate:"2025-12-26", checkedAt:verificationDate, scope:"Fonctionnaires civils de l'État; assiette déterminée par le code", reference:"Décret n° 2012-1507 modifié, article 2, en vigueur au 1er janvier 2026", supports:"Taux civil de 82,28 %; ne se compare pas directement à un taux patronal privé.", url:"https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000026865380" },
  { id:"lfi-2026", publisher:"La France insoumise", category:"Positions politiques", kind:"Document officiel du mouvement", title:"Budget 2026 — recettes et mesures", publicationDate:"2025", checkedAt:verificationDate, scope:"Document politique LFI relatif au budget 2026", reference:"Partie recettes; document publié par le mouvement", supports:"Retraite à 60 ans pour 40 annuités et pistes de recettes; leurs rendements ne sont pas validés par le site.", url:"https://lafranceinsoumise.fr/wp-content/uploads/2025/10/Budget-2026_LFI_web_pages.pdf" },
  { id:"ps-project", publisher:"Parti socialiste", category:"Positions politiques", kind:"Projet du parti", title:"Le Projet socialiste — Vivre libres", publicationDate:null, checkedAt:verificationDate, scope:"Propositions de retraite publiées sur le site du Parti socialiste", reference:"Page de projet consultée le 3 octobre 2026", supports:"43 annuités modulables selon la pénibilité, âge de 62 ans comme protection et recettes liées au capital.", url:"https://projet-socialiste.fr/projet/vivre-libres/" },
  { id:"rn-bardella", publisher:"Le Monde", category:"Positions politiques", kind:"Article de presse; propos attribués à un responsable", title:"Évolution de Jordan Bardella sur la réforme des retraites", publicationDate:"2026-05-29", checkedAt:verificationDate, scope:"Déclaration attribuée à Jordan Bardella; ne constitue pas un programme unifié du RN", reference:"Article du 29 mai 2026", supports:"Article rapportant une durée de cotisation, la fin possible de l'âge légal et une éventuelle capitalisation.", url:"https://www.lemonde.fr/politique/article/2026/05/29/au-rn-l-explosion-du-dossier-inflammable-jordan-bardella-enterre-la-reforme-des-retraites-de-marine-le-pen-et-l-age-legal-de-depart_6694791_823448.html" },
  { id:"rn-lepen", publisher:"Le Parisien / AFP", category:"Positions politiques", kind:"Article de presse; propos attribués à une responsable", title:"Marine Le Pen favorable à une part de capitalisation volontaire", publicationDate:"2026-06-14", checkedAt:verificationDate, scope:"Déclaration attribuée à Marine Le Pen; distinguée des propos de Jordan Bardella", reference:"Article du 14 juin 2026", supports:"Déclaration sur une part volontaire de capitalisation et maintien d'un âge légal.", url:"https://www.leparisien.fr/politique/retraites-marine-le-pen-favorable-a-une-part-de-capitalisation-volontaire-et-refute-toute-contradiction-avec-jordan-bardella-14-06-2026-R6ZAASJV4BFHHH6RAR6G45GOPY.php" },
  { id:"attal-2026", publisher:"Gabriel Attal", category:"Positions politiques", kind:"Publication officielle d'un responsable politique", title:"Aux Assises de l'AFER — épargne, retraites et financement des entreprises", publicationDate:"2026-09-29", checkedAt:verificationDate, scope:"Propositions publiées par Gabriel Attal; elles ne sont pas présentées comme un programme adopté de Renaissance", reference:"Publication du 29 septembre 2026", supports:"Capitalisation en complément de la répartition, plan de 1 000 € à la naissance et orientation d'une part de l'intéressement vers des plans retraite.", url:"https://attalpresident.fr/actualites/aux-assises-de-l-afer-gabriel-attal-defend-une-epargne-qui-finance-l-economie-francaise" },
  { id:"swiss-pillars", publisher:"Confédération suisse — ch.ch", category:"International", kind:"Information institutionnelle", title:"Prévoyance vieillesse : le système des trois piliers", publicationDate:null, checkedAt:verificationDate, scope:"Architecture suisse de prévoyance vieillesse", reference:"Page officielle consultée le 3 octobre 2026", supports:"Premier pilier public, prévoyance professionnelle et épargne individuelle.", url:"https://www.ch.ch/fr/retraite/prevoyance-vieillesse/comment-fonctionne-la-prevoyance-vieillesse/" },
  { id:"ssa", publisher:"U.S. Social Security Administration", category:"International", kind:"Information institutionnelle", title:"Retirement benefits", publicationDate:null, checkedAt:verificationDate, scope:"Prestations fédérales américaines de Social Security", reference:"Page institutionnelle consultée le 3 octobre 2026", supports:"Règles des prestations du socle fédéral; les plans d'épargne sont décrits séparément.", url:"https://www.ssa.gov/retirement" },
  { id:"lever-exo", publisher:"Assemblée nationale", category:"Chiffrages de scénarios", kind:"Amendement; estimation des auteurs", title:"Amendement CF19 — point de sortie des exonérations sociales", publicationDate:"2025-10-24", checkedAt:"2026-10-04", scope:"Proposition de ramener le point de sortie des exonérations de 3 à 2,4 SMIC", reference:"PLFSS 2026, amendement CF19; estimation annoncée via LexImpact", supports:"Les auteurs annoncent 2,25 Md€ en 2026; le document ne valide pas les bornes propres au site ni un rendement sur 40 ans.", url:"https://www.assemblee-nationale.fr/dyn/17/amendements/1907/CION_FIN/CF19.pdf" },
  { id:"lever-csg-capital", publisher:"Assemblée nationale", category:"Chiffrages de scénarios", kind:"Amendement; estimation des auteurs", title:"Amendement n°127 — CSG progressive sur les revenus du capital", publicationDate:"2025-10-27", checkedAt:"2026-10-04", scope:"Hausse proposée de la CSG sur les revenus du capital", reference:"PLFSS 2026, amendement n°127; estimation d'une hausse de 1,4 point", supports:"L'auteur annonce 2,66 Md€ pour sa proposition à 1,4 point; le montant par point dans le jeu est une extrapolation linéaire du site.", url:"https://www.assemblee-nationale.fr/dyn/17/amendements/1907/AN/127" },
  { id:"lever-pfu", publisher:"Assemblée nationale", category:"Chiffrages de scénarios", kind:"Amendement rejeté; estimation des auteurs", title:"Amendement CF106 — modulation du prélèvement forfaitaire unique", publicationDate:"2026-01-05", checkedAt:"2026-10-04", scope:"Proposition d'augmenter le PFU sur les revenus élevés du capital", reference:"PLF 2026, nouvelle lecture; amendement rejeté le 8 janvier 2026", supports:"Les auteurs annoncent 2 Md€ pour une hausse moyenne d'un point; ce n'est pas une évaluation indépendante.", url:"https://www.assemblee-nationale.fr/dyn/17/amendements/2247/CION_FIN/CF106" },
  { id:"lever-csg-general", publisher:"Sénat", category:"Chiffrages de scénarios", kind:"Rapport parlementaire; repère historique", title:"Projet de loi de financement de la Sécurité sociale pour 2018", publicationDate:"2017", checkedAt:"2026-10-04", scope:"Hausse de 1,7 point de CSG sur plusieurs assiettes en 2018", reference:"Rapport n°68 (2017-2018), pages 45–46", supports:"Le Sénat estimait 22,4 Md€ bruts pour +1,7 point en 2018; le montant par point affiché dans le jeu est un calcul historique, pas une prévision actuelle.", url:"https://www.senat.fr/rap/a17-068/a17-0681.pdf" },
  { id:"pension-freeze-2026", publisher:"Sénat", category:"Chiffrages de scénarios", kind:"Rapport parlementaire; texte budgétaire initial", title:"PLFSS 2026 — gel des prestations et des pensions", publicationDate:"2025", checkedAt:"2026-10-04", scope:"Texte initial du PLFSS 2026, avant les votes parlementaires", reference:"Rapport n°131 (2025-2026), article 44", supports:"Le chiffre de 3,6 Md€ porte sur un ensemble de prestations et de pensions en 2026; l'Assemblée a supprimé l'article en première lecture.", url:"https://www.senat.fr/rap/l25-131-1/l25-131-117.html" }
];

export const claims = [
  { id:"ratio-1970", value:23.71, unit:"personnes de 65+ pour 100 personnes de 20–64 ans", year:1970, scope:"France; ratio calculé à partir des groupes d'âge", status:"calcul du site sur données démographiques publiées", sourceIds:["insee-pop"], reference:"Repère historique; affiché arrondi à 24", method:"Effectif des 65+ divisé par l'effectif des 20–64 ans, multiplié par 100." },
  { id:"ratio-2026", value:40.14, unit:"personnes de 65+ pour 100 personnes de 20–64 ans", year:2026, scope:"France; base des projections", status:"repère Insee", sourceIds:["insee-pop"], reference:"Point de départ du scénario, affiché arrondi à 40", method:"Valeur de base des projections démographiques; ne mesure pas cotisants par pensionné." },
  { id:"ratio-2070", value:61.92, range:[50.17,77.88], unit:"personnes de 65+ pour 100 personnes de 20–64 ans", year:2070, scope:"France; scénario central et variantes Insee", status:"projection officielle", sourceIds:["insee-pop"], reference:"Scénario central affiché arrondi à 62; variantes affichées 50–78", method:"Aucune interpolation annuelle n'est montrée." },
  { id:"population-2070", value:65.9, unit:"millions de personnes", year:2070, scope:"France; scénario central Insee", status:"projection officielle", sourceIds:["insee-pop"], reference:"Publication Insee de juin 2026", method:"Valeur publiée." },
  { id:"pension-spending-2025", value:422.2, unit:"Md€ courants", year:2025, scope:"Dépenses brutes de l'ensemble du système de retraite", status:"observé / estimation COR 2025", sourceIds:["cor-2026"], reference:"COR 2026, chapitre sur les dépenses", method:"Montant annuel brut; distinct des dépenses nettes de prélèvements." },
  { id:"pension-gdp-2020", value:14.7, unit:"% du PIB", year:2020, scope:"Dépenses brutes de retraite", status:"observé", sourceIds:["cor-2026"], reference:"COR 2026, figure 2.2", method:"Pic associé notamment à la contraction du PIB pendant la crise sanitaire." },
  { id:"pension-gdp-2025", value:14.1, unit:"% du PIB", year:2025, scope:"Dépenses brutes de retraite", status:"observé / estimation COR", sourceIds:["cor-2026"], reference:"COR 2026, figure 2.2", method:"Valeur publiée." },
  { id:"pension-gdp-2070", value:15.3, unit:"% du PIB", year:2070, scope:"Scénario de référence du COR", status:"projection officielle", sourceIds:["cor-2026"], reference:"COR 2026, figure 2.2", method:"Scénario, non prévision certaine." },
  { id:"cor-balance-2070-law-convention", value:-2.4, unit:"points de PIB", year:2070, scope:"Solde du système de retraite; convention conforme à la législation", status:"projection officielle", sourceIds:["cor-2026"], reference:"COR 2026, annexe 2, p. 228", method:"Scénario de référence; convention comptable explicitée auprès du levier." },
  { id:"cor-balance-2025", value:-5.1, unit:"Md€", year:2025, scope:"Solde du système hors charges et produits financiers", status:"estimation COR", sourceIds:["cor-2026"], reference:"COR 2026, section 1.1", method:"Solde après comptabilisation des ressources correspondantes." },
  { id:"cor-equilibrium-contributions", value:49.3, unit:"Md€", year:2025, scope:"Ressources du système de retraite", status:"estimation COR", sourceIds:["cor-2026"], reference:"COR 2026, figure 2.10", method:"Contributions d'équilibre, dont cotisations imputées au sens de la convention du COR." },
  { id:"cor-equilibrium-subsidies", value:7.7, unit:"Md€", year:2025, scope:"Ressources du système de retraite", status:"estimation COR", sourceIds:["cor-2026"], reference:"COR 2026, figure 2.10", method:"Subventions d'équilibre." },
  { id:"cor-equilibrium-resources", value:57.0, unit:"Md€", year:2025, scope:"Somme de ressources déjà incluses dans les comptes du COR", status:"calcul du site à partir du tableau COR", sourceIds:["cor-2026"], reference:"Figure 2.10: 49,3 + 7,7", method:"Somme arithmétique; ne s'ajoute pas au solde COR." },
  { id:"budget-retirement-share", value:253, unit:"€ sur une ventilation normalisée de 1 000 €", year:2023, scope:"Dépenses publiques agrégées", status:"valeur publiée / intitulé du site clarifié", sourceIds:["budget-1000"], reference:"Infographie Direction du Budget / Insee", method:"Répartition agrégée; ne décrit pas un budget individuel équilibré." },
  { id:"frr-assets-2025", value:20.7, unit:"Md€ d'actifs sous gestion", year:2025, scope:"Fonds de réserve pour les retraites", status:"observé au 31 décembre 2025", sourceIds:["frr-assets","frr-cades"], reference:"Rapport annuel 2025 et page institutionnelle", method:"Stock d'actifs; disponibilité pour transfert non présumée." },
  { id:"frr-cades-payment", value:1.45, unit:"Md€ par an", year:"2025–2033", scope:"Versements programmés du FRR à la Cades", status:"flux prévu selon le FRR", sourceIds:["frr-cades"], reference:"Page institutionnelle FRR consultée le 3 octobre 2026", method:"Information distincte de l'actif total sous gestion." },
  { id:"cas-civil-rate-2026", value:82.28, unit:"% de l'assiette réglementaire", year:2026, scope:"Contribution employeur au CAS Pensions pour les personnels civils", status:"droit en vigueur", sourceIds:["cas-pensions"], reference:"Décret n° 2012-1507 modifié, article 2", method:"Assiette spécifique définie par le code; non comparable directement au taux patronal privé." }
];

export const demographicAnchors = [
  { year:1970, value:23.71, kind:"observed" },
  { year:2026, value:40.14, kind:"insee-base" },
  { year:2070, value:61.92, kind:"central", low:50.17, high:77.88 }
];

export const spendingAnchors = [
  { year:2020, value:14.7, kind:"observed" },
  { year:2025, value:14.1, kind:"observed" },
  { year:2070, value:15.3, kind:"projection" }
];

export const budgetDistribution = [
  { label:"Retraites", value:253 }, { label:"Santé", value:201 },
  { label:"Autre protection sociale", value:107 }, { label:"Éducation", value:88 },
  { label:"Autres services publics", value:184 }, { label:"Administration", value:66 },
  { label:"Soutien à l'économie", value:59 }, { label:"Intérêts de la dette", value:31 },
  { label:"Infrastructures", value:11 }
];

export const personas = [
  { name:"Monique", age:78, pension:1180, revaluationLossPct:2, rent:true, image:"./assets/people/monique.jpg" },
  { name:"Bernard", age:72, pension:5000, revaluationLossPct:2, rent:false, image:"./assets/people/bernard.jpg" },
  { name:"Léa", age:29, salary:3100, image:"./assets/people/lea.jpg" }
];

export const modelDefaults = {
  startYear:2026, priceYear:2025, targetAnnualBn:40, initialCapitalBn:0,
  accumulationYears:40, realReturnPct:3, annualFeePct:0, withdrawalRatePct:2.5,
  withdrawalStartYear:41, payoutYears:20, corBalancePctGdp:-2.4
};

export const leverNames = [
  { id:"work", label:"Âge et durée d'activité" },
  { id:"revenue", label:"Recettes et cotisations" },
  { id:"highPensions", label:"Effort sur les pensions élevées" },
  { id:"collectiveCapital", label:"Capital collectif accumulé" }
];

const evidence = (category, rationale, sourceId, actorType="programme") => ({ category, rationale, sourceId, actorType });
export const partyComparisons = [
  {
    id:"current-law", label:"Droit en vigueur", shortLabel:"Droit actuel",
    status:"Règles juridiques applicables; calendrier modifié en 2026",
    summary:"Les pensions restent principalement financées par répartition. Les règles d'âge et de durée varient selon les générations et les régimes.",
    sources:["law-2026","cor-2026"],
    levers:{
      work:evidence("central","Les âges et durées d'assurance sont des paramètres du droit en vigueur; la loi de 2026 modifie le calendrier pour certaines générations.","law-2026","loi"),
      revenue:evidence("explicit","Le rapport du COR décrit un système où les cotisations et prélèvements affectés sont les principales ressources.","cor-2026","rapport officiel"),
      highPensions:evidence("not-identified","La loi citée n'instaure pas de règle générale de contribution additionnelle sur les pensions élevées.","law-2026","loi"),
      collectiveCapital:evidence("secondary","Le FRR existe, mais le droit cité n'institue pas un grand fonds collectif alimenté par une recette nouvelle.","frr-assets","institution")
    }
  },
  {
    id:"lfi", label:"LFI", shortLabel:"LFI",
    status:"Document officiel — budget 2026",
    summary:"Le document consulté réaffirme une retraite à 60 ans pour 40 annuités et présente des propositions de recettes. Le comparateur n'en valide pas les rendements.",
    sources:["lfi-2026"],
    levers:{
      work:evidence("explicit","Le document formule 60 ans et 40 annuités.","lfi-2026","document officiel"),
      revenue:evidence("explicit","Le document présente des pistes de recettes pour financer progressivement ses mesures; elles ne sont pas recalculées ici.","lfi-2026","document officiel"),
      highPensions:evidence("not-identified","Un effort distinct sur les pensions élevées n'est pas identifié dans le document cité.","lfi-2026","document officiel"),
      collectiveCapital:evidence("not-identified","Le document cité ne présente pas un fonds collectif de retraite comme pilier central; les recettes tirées du capital sont une autre mesure.","lfi-2026","document officiel")
    }
  },
  {
    id:"ps", label:"PS", shortLabel:"Parti socialiste",
    status:"Projet du parti publié sur son site",
    summary:"Le projet défend la répartition, 43 annuités modulables selon la pénibilité, 62 ans comme protection minimale et de nouvelles recettes, notamment liées au capital.",
    sources:["ps-project"],
    levers:{
      work:evidence("explicit","Le projet fixe 43 annuités avec modulation selon la pénibilité et maintient 62 ans comme protection minimale.","ps-project","projet du parti"),
      revenue:evidence("explicit","Le projet cite l'imposition du capital et l'assujettissement de certains compléments de rémunération aux cotisations.","ps-project","projet du parti"),
      highPensions:evidence("not-identified","Une règle générale d'effort différencié sur les pensions élevées n'est pas identifiée dans le texte cité.","ps-project","projet du parti"),
      collectiveCapital:evidence("not-identified","Le texte cité ne propose pas un fonds collectif capitalisé comme pilier central.","ps-project","projet du parti")
    }
  },
  {
    id:"bardella", label:"Jordan Bardella", shortLabel:"Bardella · RN",
    status:"Déclaration individuelle rapportée — 29 mai 2026; pas un programme unifié",
    summary:"Les propos rapportés associent durée de cotisation, remise en cause de l'âge légal et éventuelle capitalisation. Ils sont présentés séparément des déclarations de Marine Le Pen.",
    sources:["rn-bardella"],
    levers:{
      work:evidence("explicit","L'article rapporte une évolution vers la durée de cotisation et la fin possible de l'âge légal.","rn-bardella","déclaration individuelle rapportée"),
      revenue:evidence("not-identified","La source citée ne donne pas de financement supplémentaire chiffré ou détaillé.","rn-bardella","déclaration individuelle rapportée"),
      highPensions:evidence("not-identified","La source citée n'établit pas de doctrine sur un effort ciblé des pensions élevées.","rn-bardella","déclaration individuelle rapportée"),
      collectiveCapital:evidence("unclear-divergent","L'article évoque une possibilité de capitalisation; son ampleur et sa forme ne sont pas établies par cette déclaration.","rn-bardella","déclaration individuelle rapportée")
    }
  },
  {
    id:"lepen", label:"Marine Le Pen", shortLabel:"Le Pen · RN",
    status:"Déclaration individuelle rapportée — 14 juin 2026; distincte de celle de Jordan Bardella",
    summary:"La déclaration rapportée porte sur une part volontaire de capitalisation. Elle n'est pas fusionnée avec les positions attribuées à Jordan Bardella.",
    sources:["rn-lepen"],
    levers:{
      work:evidence("unclear-divergent","La source citée décrit une position distincte sur l'âge légal; elle ne vaut pas programme commun des dirigeants.","rn-lepen","déclaration individuelle rapportée"),
      revenue:evidence("not-identified","La déclaration citée ne précise pas de recette additionnelle.","rn-lepen","déclaration individuelle rapportée"),
      highPensions:evidence("not-identified","La déclaration citée n'établit pas de position sur un effort ciblé des pensions élevées.","rn-lepen","déclaration individuelle rapportée"),
      collectiveCapital:evidence("explicit","L'article rapporte une proposition de capitalisation volontaire; elle ne décrit pas le fonds public collectif défendu ici.","rn-lepen","déclaration individuelle rapportée")
    }
  },
  {
    id:"attal", label:"Gabriel Attal", shortLabel:"Attal",
    status:"Propositions publiées le 29 septembre 2026; attribution personnelle",
    summary:"Défend une retraite universelle fondée sur la durée de cotisation et le développement de la capitalisation en complément de la répartition.",
    sources:["attal-2026"],
    levers:{
      work:evidence("explicit","Le texte défend un système universel fondé sur la durée de cotisation, avec surcote et décote.","attal-2026","publication personnelle"),
      revenue:evidence("explicit","Le texte propose d'orienter une partie de l'intéressement et de la participation vers des plans retraite.","attal-2026","publication personnelle"),
      highPensions:evidence("not-identified","La publication citée ne présente pas de règle générale d'effort sur les pensions élevées.","attal-2026","publication personnelle"),
      collectiveCapital:evidence("explicit","La capitalisation est proposée en complément de la répartition; le mécanisme décrit repose sur des plans d'épargne retraite.","attal-2026","publication personnelle")
    }
  },
  {
    id:"site-model", label:"Notre proposition", shortLabel:"Notre modèle",
    status:"Position normative de ce site — 3 octobre 2026",
    summary:"Socle redistributif, protection renforcée des petites pensions, effort possible sur les pensions élevées et constitution d'un fonds collectif diversifié. Les modalités restent ouvertes.",
    sources:[],
    levers:{
      work:evidence("secondary","Le modèle partage l'effort entre activité, ressources et patrimoine collectif; il ne fixe pas ici d'âge légal nouveau.",null,"proposition du site"),
      revenue:evidence("central","Une ressource récurrente dédiée est nécessaire; sa base et son rendement ne sont pas encore identifiés.",null,"proposition du site"),
      highPensions:evidence("central","Le site défend une protection des petites pensions et un effort plus important sur les pensions élevées; aucun seuil n'est arrêté.",null,"proposition du site"),
      collectiveCapital:evidence("central","Le site défend un fonds public productif, diversifié et à gouvernance à définir; ce choix n'est pas une règle adoptée.",null,"proposition du site")
    }
  }
];

export const evidenceLabels = {
  central:"Élément central",
  explicit:"Mention explicite",
  secondary:"Élément secondaire",
  "not-identified":"Non identifié dans le texte cité",
  "unclear-divergent":"Incertain ou divergent"
};

export const architectureComparisons = [
  { id:"site", title:"Socle public + fonds collectif", label:"Proposition du site", text:"La propriété des actifs, les seuils et la gouvernance sont des choix encore à définir.", sourceIds:[] },
  { id:"swiss", title:"Trois piliers", label:"Suisse", text:"Un premier pilier public obligatoire coexiste avec la prévoyance professionnelle et l'épargne individuelle.", sourceIds:["swiss-pillars"] },
  { id:"usa", title:"Social Security + épargne", label:"États-Unis", text:"Le socle fédéral coexiste avec des plans professionnels et de l'épargne privée.", sourceIds:["ssa"] }
];
