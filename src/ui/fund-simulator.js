import { modelDefaults } from "../../data/site-data.js";
import { annualContributions, calculateFunding } from "../model/funding.js";
import { simulateFund } from "../model/fund.js";
import { buildReturnPaths } from "../model/scenarios.js";

const euroFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits:1, minimumFractionDigits:0 });
const pctFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits:2, minimumFractionDigits:0 });
const get = (id) => document.getElementById(id);
const value = (id, fallback = 0) => {
  const number = Number(get(id)?.value);
  return Number.isFinite(number) ? number : fallback;
};
const bigFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits:0 });
const money = (amount) => `${(Math.abs(amount) >= 100 ? bigFormat : euroFormat).format(amount)} Md€`;
const percent = (amount) => `${pctFormat.format(amount)} %`;
const clamp = (number, min, max) => Math.min(max, Math.max(min, number));

const scenarios = new Map([
  ["reference", { label:"Référence", rate:modelDefaults.realReturnPct }],
  ["low", { label:"Faible", rate:1 }],
  ["zero", { label:"Nul", rate:0 }],
  ["early-shock", { label:"Choc au début", rate:modelDefaults.realReturnPct }],
  ["late-shock", { label:"Krach tardif", rate:modelDefaults.realReturnPct }],
  ["sequence", { label:"Ordre différent", rate:modelDefaults.realReturnPct }]
]);
let selectedScenario = "reference";

function addPairedControls(update) {
  document.querySelectorAll("input[type=range]").forEach((range) => {
    const number = get(range.id.replace("Range", "Number"));
    if (!number) return;
    const copy = (source, target) => {
      if (source.value === "") return;
      target.value = source.value;
      if (target.type === "range") target.value = String(clamp(Number(source.value), Number(target.min), Number(target.max)));
      update();
    };
    range.addEventListener("input", () => copy(range, number));
    number.addEventListener("input", () => copy(number, range));
    number.addEventListener("change", () => {
      const min = Number(number.min || range.min);
      const max = Number(number.max || range.max);
      number.value = String(clamp(Number(number.value || 0), min, max));
      range.value = String(clamp(Number(number.value), Number(range.min), Number(range.max)));
      update();
    });
  });
  document.querySelectorAll("input[data-paired-to]").forEach((number) => {
    const range = get(number.dataset.pairedTo);
    if (!range) return;
    const sync = (fromRange) => {
      number.value = fromRange ? range.value : String(clamp(Number(number.value || 0), Number(range.min), Number(range.max)));
      if (!fromRange) range.value = number.value;
      update();
    };
    range.addEventListener("input", () => sync(true));
    number.addEventListener("input", () => sync(false));
  });
}

function setOutput(id, text) {
  const output = get(id);
  if (output) output.textContent = text;
}

function updateLedger() {
  const fundingAmount = (id) => {
    const input = get(id);
    const parsed = input.value === "" ? 0 : Number(input.value);
    const valid = Number.isFinite(parsed) && parsed >= 0 && parsed <= 250;
    input.setAttribute("aria-invalid", String(!valid));
    return clamp(Number.isFinite(parsed) ? parsed : 0, 0, 250);
  };
  const allocations = {
    tax:fundingAmount("fundingTax"), pension:fundingAmount("fundingPension"),
    reallocate:fundingAmount("fundingReallocate"), other:fundingAmount("fundingOther")
  };
  const targetInput = get("targetNumber");
  const rawTarget = Number(targetInput.value);
  const targetValid = Number.isFinite(rawTarget) && rawTarget >= 0 && rawTarget <= 80;
  targetInput.setAttribute("aria-invalid", String(!targetValid));
  const targetBn = clamp(Number.isFinite(rawTarget) ? rawTarget : modelDefaults.targetAnnualBn, 0, 80);
  const result = calculateFunding({ targetBn, allocations });
  setOutput("targetOut", `${money(targetBn)} / an`);
  get("targetResult").textContent = `${money(targetBn)} / an`;
  get("availableResult").textContent = `${money(result.availableBn)} / an`;
  get("gapResult").textContent = `${money(result.unallocatedBn)} / an`;
  get("excessResult").textContent = `${money(result.excessBn)} / an`;
  get("investedLabel").textContent = `${money(result.fundedBn)} / an`;
  return result;
}

function makeSvg(tag, attributes = {}, text = null) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([key, val]) => node.setAttribute(key, String(val)));
  if (text !== null) node.textContent = text;
  return node;
}

function renderChart(svg, series, totalYears, startYear, title) {
  const width = 800; const height = 340;
  const left = 72; const right = 22; const top = 20; const bottom = 48;
  const plotW = width - left - right; const plotH = height - top - bottom;
  const maxValue = Math.max(1, ...series.flatMap((item) => item.points.map((point) => Math.max(0, point))));
  const maxRounded = 10 ** Math.ceil(Math.log10(maxValue));
  const yMax = maxValue < maxRounded * .55 ? maxRounded * .6 : maxRounded;
  const x = (index) => left + (index / Math.max(1, totalYears)) * plotW;
  const y = (point) => top + plotH - (Math.max(0, point) / yMax) * plotH;
  const fragment = document.createDocumentFragment();
  for (let tick = 0; tick <= 4; tick++) {
    const tickValue = yMax * tick / 4;
    const tickY = y(tickValue);
    fragment.append(makeSvg("line", { x1:left, x2:width-right, y1:tickY, y2:tickY, class:"chart-grid" }));
    fragment.append(makeSvg("text", { x:left-9, y:tickY+4, "text-anchor":"end" }, euroFormat.format(tickValue)));
  }
  fragment.append(makeSvg("line", { x1:left, x2:left, y1:top, y2:height-bottom, class:"chart-axis" }));
  fragment.append(makeSvg("line", { x1:left, x2:width-right, y1:height-bottom, y2:height-bottom, class:"chart-axis" }));
  fragment.append(makeSvg("text", { x:left, y:height-12, "text-anchor":"start" }, String(startYear)));
  fragment.append(makeSvg("text", { x:width-right, y:height-12, "text-anchor":"end" }, String(startYear+totalYears)));
  fragment.append(makeSvg("text", { x:left, y:top-7, "text-anchor":"start" }, "Capital (Md€)"));
  for (const item of series) {
    const path = item.points.map((point, index) => `${index ? "L" : "M"}${x(index).toFixed(2)} ${y(point).toFixed(2)}`).join(" ");
    fragment.append(makeSvg("path", { d:path, class:"chart-series", stroke:item.color, ...(item.dash ? { "stroke-dasharray":item.dash } : {}) }));
  }
  svg.replaceChildren(fragment);
  const accessibleTitle = svg.querySelector("title") || makeSvg("title", { id:"fundChartTitle" });
  const accessibleDescription = svg.querySelector("desc") || makeSvg("desc", { id:"fundChartDesc" });
  accessibleTitle.textContent = title;
  const endItems = series.map((item) => `${item.label} : ${money(item.points.at(-1))}`).join("; ");
  accessibleDescription.textContent = `Capital du fonds, de ${startYear} à ${startYear+totalYears}. ${endItems}.`;
  svg.prepend(accessibleDescription);
  svg.prepend(accessibleTitle);
}

function updateTrajectoryTable(target, funded, sequence) {
  const body = get("trajectoryRows");
  body.replaceChildren();
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < funded.rows.length; index++) {
    const targetRow = target.rows[index]; const fundedRow = funded.rows[index];
    const tr = document.createElement("tr");
    const cells = [
      String(modelDefaults.startYear + index), percent(fundedRow.returnRate * 100),
      money(fundedRow.contributionBn), money(fundedRow.withdrawalBn),
      money(targetRow.closingBn), money(fundedRow.closingBn)
    ];
    cells.forEach((cell, cellIndex) => {
      const td = document.createElement("td"); td.textContent = cell;
      if (sequence && cellIndex === 1) td.title = "Ordre principal : rendements positifs d'abord, puis négatifs";
      tr.append(td);
    });
    fragment.append(tr);
  }
  body.append(fragment);
}

function updateModel(fundingResult) {
  const boundedInput = (id, min, max, fallback) => {
    const input = get(id);
    const parsed = input.value === "" ? fallback : Number(input.value);
    const valid = Number.isFinite(parsed) && parsed >= min && parsed <= max;
    input.setAttribute("aria-invalid", String(!valid));
    return clamp(Number.isFinite(parsed) ? parsed : fallback, min, max);
  };
  const years = Math.round(boundedInput("yearsNumber", 10, 50, modelDefaults.accumulationYears));
  const baseReturnPct = boundedInput("returnNumber", -20, 8, modelDefaults.realReturnPct);
  const initialCapitalBn = boundedInput("capitalNumber", 0, 1000, modelDefaults.initialCapitalBn);
  const feeRate = boundedInput("feeNumber", 0, 10, modelDefaults.annualFeePct) / 100;
  const withdrawalRatePct = boundedInput("withdrawalNumber", 0, 20, modelDefaults.withdrawalRatePct);
  const withdrawalStartYear = Math.round(boundedInput("withdrawalStart", 1, 100, modelDefaults.withdrawalStartYear));
  const payoutYears = Math.round(boundedInput("payoutYears", 1, 40, modelDefaults.payoutYears));
  const totalYears = Math.max(years, withdrawalStartYear + payoutYears - 1);
  const path = buildReturnPaths(selectedScenario, totalYears, baseReturnPct, years);
  const primaryContributions = annualContributions(fundingResult.fundedBn, years, totalYears);
  const targetContributions = annualContributions(fundingResult.targetBn, years, totalYears);
  const target = simulateFund({ initialCapitalBn, annualReturns:path.primary, contributions:targetContributions, feeRate, withdrawalRate:withdrawalRatePct/100, withdrawalStartYear });
  const funded = simulateFund({ initialCapitalBn, annualReturns:path.primary, contributions:primaryContributions, feeRate, withdrawalRate:withdrawalRatePct/100, withdrawalStartYear });
  const horizonTarget = target.rows[years-1];
  const horizonFunded = funded.rows[years-1];

  setOutput("yearsOut", `${years} ans · fin ${modelDefaults.startYear + years}`);
  setOutput("returnOut", percent(baseReturnPct));
  setOutput("capitalOut", money(initialCapitalBn));
  setOutput("feeOut", percent(feeRate*100));
  setOutput("withdrawalOut", percent(withdrawalRatePct));
  get("horizonLabel").textContent = `${years} ans`;
  get("scenarioLabel").textContent = `${path.label} · euros constants 2025`;
  get("targetCapital").textContent = money(horizonTarget.closingBn);
  get("fundedCapital").textContent = money(horizonFunded.closingBn);
  const firstTarget = target.rows[withdrawalStartYear-1];
  const firstFunded = funded.rows[withdrawalStartYear-1];
  get("targetPayout").textContent = `Premier retrait demandé : ${money(firstTarget?.requestedWithdrawalBn ?? 0)} / an à partir de ${modelDefaults.startYear + withdrawalStartYear-1}`;
  get("fundedPayout").textContent = firstFunded?.withdrawalBn
    ? `Premier retrait payé : ${money(firstFunded.withdrawalBn)} / an${firstFunded.shortfallBn ? ` · manque ${money(firstFunded.shortfallBn)}` : ""}`
    : `Premier retrait payé : ${money(0)} / an · aucun actif financé au début de la période`;
  get("cumulativeContributions").textContent = money(funded.cumulativeContributionsBn);
  get("cumulativeWithdrawals").textContent = money(funded.cumulativeWithdrawalsBn);
  get("payoutShortfall").textContent = money(funded.cumulativeShortfallBn);
  get("netTransfers").textContent = money(funded.netTransfersBn);

  const series = [
    { label:"Objectif · ordre principal", color:"#ef5a36", dash:"9 7", points:[initialCapitalBn, ...target.rows.map((row) => row.closingBn)] },
    { label:"Financé · ordre principal", color:"#191916", points:[initialCapitalBn, ...funded.rows.map((row) => row.closingBn)] }
  ];
  const alternate = selectedScenario === "sequence" && path.alternate;
  if (alternate) {
    const altTarget = simulateFund({ initialCapitalBn, annualReturns:path.alternate, contributions:targetContributions, feeRate, withdrawalRate:withdrawalRatePct/100, withdrawalStartYear });
    const altFunded = simulateFund({ initialCapitalBn, annualReturns:path.alternate, contributions:primaryContributions, feeRate, withdrawalRate:withdrawalRatePct/100, withdrawalStartYear });
    series.push(
      { label:"Objectif · ordre inversé", color:"#ef5a36", dash:"2 7", points:[initialCapitalBn, ...altTarget.rows.map((row) => row.closingBn)] },
      { label:"Financé · ordre inversé", color:"#707066", dash:"8 6", points:[initialCapitalBn, ...altFunded.rows.map((row) => row.closingBn)] }
    );
    const note = get("sequenceComparison");
    note.hidden = false;
    note.querySelector("p").textContent = `Même série de rendements (${path.upYears} × +5 %, ${path.downYears} × −1 %, puis le taux choisi), dans un ordre inversé. À ${years} ans : cible ${money(horizonTarget.closingBn)} contre ${money(altTarget.rows[years-1].closingBn)}; financé ${money(horizonFunded.closingBn)} contre ${money(altFunded.rows[years-1].closingBn)}. Versements et retraits sont appliqués aux mêmes années dans les deux cas.`;
    const legend = document.querySelector(".chart-legend");
    legend.querySelectorAll(".sequence-only").forEach((item) => item.remove());
    for (const [label, className] of [["objectif · ordre inversé", "legend-target-alt"], ["financé · ordre inversé", "legend-funded-alt"]]) {
      const item = document.createElement("span"); item.className = "sequence-only";
      const key = document.createElement("i"); key.className = className;
      item.append(key, document.createTextNode(label)); legend.append(item);
    }
  } else {
    get("sequenceComparison").hidden = true;
    document.querySelectorAll(".chart-legend .sequence-only").forEach((item) => item.remove());
  }
  const svg = get("fundChart");
  renderChart(svg, series, totalYears, modelDefaults.startYear, "Trajectoires de capital, objectif et ressources affectées");
  updateTrajectoryTable(target, funded, Boolean(alternate));
}

export function initialiseFundSimulator() {
  const fundingFields = ["fundingTax", "fundingPension", "fundingReallocate", "fundingOther"];
  const run = () => {
    const funding = updateLedger();
    updateModel(funding);
  };
  fundingFields.forEach((id) => get(id)?.addEventListener("input", run));
  addPairedControls(run);

  document.querySelectorAll("[data-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedScenario = button.dataset.scenario;
      document.querySelectorAll("[data-scenario]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      run();
    });
  });
  ["withdrawalStart", "payoutYears"].forEach((id) => get(id)?.addEventListener("input", run));

  get("resetInputs")?.addEventListener("click", () => {
    ["fundingTax", "fundingPension", "fundingReallocate", "fundingOther"].forEach((id) => { get(id).value = "0"; });
    get("targetRange").value = String(modelDefaults.targetAnnualBn);
    get("targetNumber").value = String(modelDefaults.targetAnnualBn);
    run();
  });
  get("resetModel")?.addEventListener("click", () => {
    get("yearsRange").value = String(modelDefaults.accumulationYears); get("yearsNumber").value = String(modelDefaults.accumulationYears);
    get("returnRange").value = String(modelDefaults.realReturnPct); get("returnNumber").value = String(modelDefaults.realReturnPct);
    get("capitalRange").value = String(modelDefaults.initialCapitalBn); get("capitalNumber").value = String(modelDefaults.initialCapitalBn);
    get("feeRange").value = String(modelDefaults.annualFeePct); get("feeNumber").value = String(modelDefaults.annualFeePct);
    get("withdrawalRange").value = String(modelDefaults.withdrawalRatePct); get("withdrawalNumber").value = String(modelDefaults.withdrawalRatePct);
    get("withdrawalStart").value = String(modelDefaults.withdrawalStartYear); get("payoutYears").value = String(modelDefaults.payoutYears);
    selectedScenario = "reference";
    document.querySelectorAll("[data-scenario]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.scenario === selectedScenario)));
    run();
  });
  run();
}
