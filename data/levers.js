const AN = "https://www.assemblee-nationale.fr/dyn/17/amendements/";

// Annual values are scenario inputs, not certified forecasts. The interface exposes
// the author's estimate, any site-derived bounds, and the overlap between tax bases.
export const levers = [
  {
    id:"exo", family:"Recettes récurrentes", payer:"Entreprises", label:"Resserrer les exonérations de cotisations (sortie à 2,4 SMIC au lieu de 3)",
    central:2, low:1.5, high:2.25, ledger:"fundingTax", sourceId:"lever-exo", sourceLabel:"Amendement CF19 · proposition",
    sourceUrl:AN+"1907/CION_FIN/CF19.pdf", estimateStatus:"Chiffrage des auteurs",
    risk:"coût du travail qualifié; effet sur l'emploi débattu",
    basis:"Les auteurs annoncent 2,25 Md€ en 2026, d'après LexImpact. Le centre à 2 Md€ et la borne basse sont des hypothèses du site."
  },
  {
    id:"csgCap", family:"Recettes récurrentes", payer:"Épargnants et détenteurs de revenus du capital", label:"CSG sur les revenus du capital : +1 point",
    central:2, low:1.5, high:2.2, ledger:"fundingTax", overlapGroup:"capital-tax", sourceId:"lever-csg-capital", sourceLabel:"Amendement n°127 · proposition",
    sourceUrl:AN+"1907/AN/127", estimateStatus:"Extrapolation d'un chiffrage parlementaire",
    risk:"assiette mobile; effet possible sur l'épargne",
    basis:"L'amendement chiffre 2,66 Md€ pour +1,4 point. Le site ramène ce chiffre à un point et propose une fourchette à vérifier."
  },
  {
    id:"pfu", family:"Recettes récurrentes", payer:"Détenteurs de revenus élevés du capital", label:"Relever progressivement la flat tax sur les hauts revenus du capital",
    central:2, low:1.4, high:3, ledger:"fundingTax", overlapGroup:"capital-tax", sourceId:"lever-pfu", sourceLabel:"Amendement CF106 · rejeté",
    sourceUrl:AN+"2247/CION_FIN/CF106", estimateStatus:"Chiffrage des auteurs",
    risk:"rendement sensible aux dividendes et aux comportements d'épargne",
    basis:"L'amendement rejeté annonce 2 Md€ pour une hausse moyenne d'un point. Les bornes sont des hypothèses du site."
  },
  {
    id:"csgGen", family:"Recettes récurrentes", payer:"Salariés, retraités et détenteurs de revenus du capital", label:"CSG sur les revenus concernés : +1 point",
    central:13.2, low:11, high:13.5, ledger:"fundingTax", overlapGroup:"capital-tax", sourceId:"lever-csg-general", sourceLabel:"Rapport du Sénat · 2018",
    sourceUrl:"https://www.senat.fr/rap/a17-068/a17-0681.pdf", estimateStatus:"Repère historique, en euros 2018",
    risk:"effort large sur le pouvoir d'achat; assiettes et exemptions à préciser",
    basis:"Le Sénat estimait 22,4 Md€ bruts pour +1,7 point en 2018. Le centre ramène ce total à un point; fourchette et actualisation restent à établir."
  }
];

export const presets = {
  zero:{ label:"Tout à zéro", levels:{} },
  prudent:{ label:"Une hypothèse prudente", levels:{ exo:.5 } },
  offensif:{ label:"Deux leviers ciblés", levels:{ exo:1, csgCap:1 } },
  tout:{ label:"Ressource large · sans doublon", levels:{ exo:1, csgGen:1 } }
};

export const markets = [["reference","Marché de référence · 3 %"],["zero","Rendement nul"],["early-shock","Choc au début"]];
