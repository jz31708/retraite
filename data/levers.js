// Ordres de grandeur annuels en Md€, pas des évaluations officielles.
// Les hypothèses et leurs recoupements sont explicités dans l'atelier.
const AN = "https://www.assemblee-nationale.fr/dyn/17/amendements/";
export const levers = [
  { id:"exo", family:"Recettes récurrentes", payer:"Entreprises", label:"Resserrer les exonérations de cotisations (sortie à 2,4 SMIC au lieu de 3)", central:2, low:1.5, high:2.25, ledger:"fundingTax",
    risk:"coût du travail qualifié, effet sur l'emploi débattu", basis:"Les auteurs annoncent 2,25 Md€ en 2026; le centre et la borne basse sont des hypothèses du site.", sourceLabel:"Amendement PLFSS 2026", url:AN+"1907/CION_FIN/CF19.pdf" },
  { id:"pfu", family:"Recettes récurrentes", payer:"Actionnaires", label:"Relever la flat tax sur les hauts revenus du capital", central:2, low:1.4, high:3, ledger:"fundingTax", overlapGroup:"capital-tax",
    risk:"rendement sensible aux dividendes et aux comportements d'épargne", basis:"L'amendement rejeté annonce 2 Md€; le site donne une fourchette indicative.", sourceLabel:"Amendement PLF 2026 · rejeté", url:AN+"2247/CION_FIN/CF106" },
  { id:"csgGen", family:"Recettes récurrentes", payer:"Salariés, retraités et détenteurs de revenus du capital", label:"CSG sur les revenus concernés : +1 point", central:13.2, low:11, high:13.5, ledger:"fundingTax", overlapGroup:"capital-tax",
    risk:"effort large sur le pouvoir d'achat; exemptions et assiettes à préciser", basis:"Le Sénat rapportait 22,4 Md€ pour +1,7 point en 2018. 13,2 Md€ est le calcul du site (22,4 ÷ 1,7), pas une actualisation de l'assiette 2026.", sourceLabel:"Rapport du Sénat · 2018", url:"https://www.senat.fr/rap/a17-068/a17-068_mono.html" }
];

export const presets = {
  zero:{ label:"Ne rien changer", levels:{} },
  prudent:{ label:"Prudent · 1 Md€", levels:{ exo:.5 } },
  offensif:{ label:"Ciblé · 4 Md€", levels:{ exo:1, pfu:1 } },
  tout:{ label:"Large · 15,2 Md€", levels:{ exo:1, csgGen:1 } }
};

export const markets = [["reference","Marché de référence · 3 %"],["zero","Rendement nul"],["late-crash","Krach de −35 % en année 38"]];
