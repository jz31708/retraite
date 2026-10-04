import { payslip } from "../model/payslip.js";
import { compound } from "../model/compound.js";

const eur = new Intl.NumberFormat("fr-FR", { maximumFractionDigits:0 });
const nf = new Intl.NumberFormat("fr-FR", { maximumFractionDigits:1 });
const $ = (id) => document.getElementById(id);
const bases = {
  capital:"Revenus du capital (dividendes, plus-values) : l'assiette est étroite et mobile, mais concentrée sur les plus aisés.",
  conso:"Consommation (TVA) : large assiette et rendement stable, mais ce sont les ménages modestes qui y consacrent la plus grande part de leurs revenus.",
  patrimoine:"Patrimoine et successions : visent l'héritage, mais le rendement est faible et très contesté."
};

export function initialiseCalculators() {
  if ($("slipGross")) {
    const run = () => {
      const g = Number($("slipGross").value) || 0, s = Number($("slipShift").value);
      const p = payslip(g, s);
      $("slipShiftOut").textContent = `${s} %`;
      $("slipOut").innerHTML = `<p>Sur <b>${eur.format(g)} €</b> brut par mois, la retraite prélève <b>${eur.format(p.employeeMonthly)} €</b> côté salarié et <b>${eur.format(p.employerMonthly)} €</b> côté employeur, soit <b>${nf.format(p.totalRate * 100)} %</b> du brut.</p>
      <p class="slip-result">Si ${s} % de ce financement passe hors des salaires : <b>+${eur.format(p.employeeGainMonthly)} €/mois</b> pour le salarié (avant impôt) et <b>−${eur.format(p.employerSavingMonthly)} €/mois</b> de coût pour l'employeur.</p>
      <p><b>${eur.format(p.toFindElsewhereYear)} €/an</b> par salarié sont à trouver ailleurs. ${bases[$("slipBase").value]}</p>`;
    };
    for (const id of ["slipGross", "slipShift", "slipBase"]) $(id).addEventListener("input", run);
    document.querySelectorAll("[data-gross]").forEach((b) => b.addEventListener("click", () => { $("slipGross").value = b.dataset.gross; run(); }));
    run();
  }
  if ($("capAnnual")) {
    const run = () => {
      const annual = Number($("capAnnual").value), years = Number($("capYears").value), r = Number($("capReturn").value), g = Number($("capGrowth").value);
      $("capAnnualOut").textContent = `${annual} Md€/an`; $("capYearsOut").textContent = `${years} ans`; $("capReturnOut").textContent = `${nf.format(r)} %`;
      const res = compound({ annual, years, returnPct:r, growthPct:g });
      const draw = res.capital * 0.03;
      const max = res.capital || 1, pts = (k) => res.series.map((p, i) => `${(i / Math.max(1, years - 1)) * 580 + 10},${210 - (p[k] / max) * 190}`).join(" ");
      $("capChart").innerHTML = `<polyline points="${pts("paid")}" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5 4"/><polyline points="${pts("capital")}" fill="none" stroke="var(--orange)" stroke-width="3"/>`;
      $("capOut").innerHTML = `<p>Capital après ${years} ans : <b>${eur.format(res.capital)} Md€</b> dont <b>${eur.format(res.paid)} Md€</b> versés et <b>${eur.format(res.gains)} Md€</b> de gains (${eur.format((res.gains / res.capital) * 100 || 0)} %).</p>
      <p class="slip-result">Un retrait de 3 % par an donnerait <b>${nf.format(draw)} Md€/an</b>, soit <b>${nf.format((draw / 422.2) * 100)} %</b> des dépenses de retraites de 2025 (422,2 Md€).</p>
      <p>Les intérêts composés travaillent lentement : il faut des décennies et des montants élevés pour peser sur un système de cette taille. Versements en fin d'année, euros constants de 2025, rendement réel supposé constant.</p>`;
    };
    for (const id of ["capAnnual", "capYears", "capReturn", "capGrowth"]) $(id).addEventListener("input", run);
    $("capGrowing")?.addEventListener("click", () => { $("capGrowth").value = 3; run(); });
    run();
  }
}
