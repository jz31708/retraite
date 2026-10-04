import { levers, presets, markets } from "../../data/levers.js";
import { decodeGameState, encodeGameState, total, marketResult } from "../model/game.js";

const nf = new Intl.NumberFormat("fr-FR", { maximumFractionDigits:1 });
const md = (n) => `${nf.format(n)} Md€`;
const $ = (id) => document.getElementById(id);

export function initialiseGame() {
  const list = $("gameLevers");
  if (!list) return;
  const state = { target:40, levels:Object.fromEntries(levers.map((lever) => [lever.id, 0])), shareEnabled:false };

  list.innerHTML = levers.map((lever) => `<div class="lever-row"><div><b>${lever.label}</b><small>${lever.family} · payeur dans cette hypothèse : ${lever.payer}</small><small>Risque : ${lever.risk}</small></div>
    <label><input type="range" min="0" max="100" step="25" value="0" data-lever="${lever.id}" aria-describedby="gameOverlapWarning" aria-label="Intensité : ${lever.label}"><output id="out-${lever.id}"></output></label>
    <small><b>${lever.estimateStatus}.</b> 100 % = ${md(lever.central)}/an (entre ${nf.format(lever.low)} et ${nf.format(lever.high)}). ${lever.basis} <a href="${lever.sourceUrl}" target="_blank" rel="noopener noreferrer">${lever.sourceLabel} ↗</a></small></div>`).join("");
  $("gamePresets").innerHTML = Object.entries(presets).map(([id, preset]) => `<button type="button" data-preset="${id}" aria-pressed="false">${preset.label}</button>`).join("");
  $("gameTable").innerHTML = `<caption class="visually-hidden">Capital simulé après 40 ans pour trois hypothèses de rendement. Les versements sont supposés identiques chaque année.</caption><thead><tr><th scope="col">Hypothèse</th>${markets.map(([, label]) => `<th scope="col">${label}</th>`).join("")}</tr></thead><tbody id="gameRows"></tbody>`;

  const apply = (levels) => {
    for (const lever of levers) state.levels[lever.id] = levels[lever.id] ?? 0;
    render();
  };

  function persistShareState(force = false) {
    const hasChanges = state.target !== 40 || Object.values(state.levels).some((level) => level > 0);
    if (!force && !state.shareEnabled && !hasChanges) return;
    const url = new URL(location.href);
    url.searchParams.set("jeu", encodeGameState(state.target, levers, state.levels));
    url.hash = "jeu";
    history.replaceState(null, "", url);
    state.shareEnabled = true;
  }

  function render() {
    const activeOverlap = levers.find((lever) => lever.overlapGroup && state.levels[lever.id] > 0);
    for (const lever of levers) {
      const input = list.querySelector(`[data-lever="${lever.id}"]`);
      const level = state.levels[lever.id];
      input.value = level * 100;
      input.disabled = Boolean(activeOverlap && lever.overlapGroup === activeOverlap.overlapGroup && lever.id !== activeOverlap.id);
      $(`out-${lever.id}`).textContent = level ? `+${md(level * lever.central)}/an` : "0";
    }
    const overlapWarning = $("gameOverlapWarning");
    overlapWarning.hidden = !activeOverlap;
    overlapWarning.textContent = activeOverlap
      ? `Hypothèse active : « ${activeOverlap.label} ». Les deux autres options sur la fiscalité du capital et la CSG sont désactivées pour éviter un double comptage. Ramenez ce curseur à zéro pour en choisir une autre.`
      : "Choisissez une seule option sur la fiscalité du capital et la CSG : leurs assiettes se recoupent.";

    const [central, low, high] = ["central", "low", "high"].map((key) => total(levers, state.levels, key));
    const target = state.target;
    $("gameTarget").value = target;
    $("gameTargetOut").textContent = md(target);
    $("gameTotal").textContent = `${md(central)}/an`;
    $("gameRange").textContent = `Fourchette indicative : ${md(low)} à ${md(high)}/an`;
    $("gameMeter").style.width = `${Math.min(100, (central / target) * 100)}%`;
    $("gameGap").textContent = central >= target
      ? `Objectif couvert dans cette hypothèse; surplus arithmétique : ${md(central - target)}/an.`
      : `Écart arithmétique : ${md(target - central)}/an sur un objectif de ${md(target)}/an.`;

    const payers = {};
    for (const lever of levers) if (state.levels[lever.id]) payers[lever.payer] = (payers[lever.payer] ?? 0) + state.levels[lever.id] * lever.central;
    $("gamePayers").textContent = Object.keys(payers).length
      ? "À qui l'effort est attribué dans cette hypothèse : " + Object.entries(payers).map(([payer, value]) => `${payer} (${md(value)}/an)`).join(", ") + "."
      : "Aucun nouveau prélèvement ou redéploiement sélectionné.";

    const referenceCapital = marketResult(target, "reference");
    const rows = [["Montant central", central], ["Borne basse", low], ["Borne haute", high]].map(([label, amount]) => `<tr><th scope="row">${label}</th>${markets.map(([market]) => {
      const capital = marketResult(Math.min(amount, target), market);
      return `<td>${md(capital)}<small>${Math.round((capital / referenceCapital) * 100)} % de la cible</small></td>`;
    }).join("")}</tr>`);
    $("gameRows").innerHTML = rows.join("");

    const referenceShare = Math.round((marketResult(Math.min(central, target), "reference") / referenceCapital) * 100);
    const shockShare = Math.round((marketResult(Math.min(central, target), "early-shock") / referenceCapital) * 100);
    $("gameVerdict").textContent = central === 0
      ? "Aucun flux annuel n'est sélectionné; le scénario zéro ne finance pas le fonds."
      : `Sous ces hypothèses, le capital atteint ${referenceShare} % de la cible en marché de référence et ${shockShare} % après un choc au début. Calcul sur 40 versements annuels constants, en euros réels, sans délai d'entrée en vigueur ni réaction de l'assiette.`;

    $("gamePresets").querySelectorAll("[data-preset]").forEach((button) => {
      const presetLevels = presets[button.dataset.preset].levels;
      const matches = levers.every((lever) => state.levels[lever.id] === (presetLevels[lever.id] ?? 0));
      button.setAttribute("aria-pressed", String(matches));
    });
    persistShareState();
  }

  list.addEventListener("input", (event) => {
    const id = event.target.dataset.lever;
    if (!id) return;
    const lever = levers.find((item) => item.id === id);
    state.levels[id] = Number(event.target.value) / 100;
    if (lever?.overlapGroup && state.levels[id] > 0) {
      for (const other of levers) if (other.overlapGroup === lever.overlapGroup && other.id !== id) state.levels[other.id] = 0;
    }
    render();
  });
  $("gamePresets").addEventListener("click", (event) => {
    const id = event.target.dataset.preset;
    if (id) apply(presets[id].levels);
  });
  $("gameTarget").addEventListener("input", (event) => { state.target = Number(event.target.value); render(); });

  function sendToLedger() {
    const sums = { fundingTax:0, fundingPension:0, fundingReallocate:0, fundingOther:0 };
    for (const lever of levers) sums[lever.ledger] += state.levels[lever.id] * lever.central;
    for (const [id, amount] of Object.entries(sums)) {
      const input = $(id);
      if (input) { input.value = Math.min(250, Math.round(amount * 2) / 2); input.dispatchEvent(new Event("input", { bubbles:true })); }
    }
    const range = $("targetRange");
    if (range) { range.value = Math.min(80, state.target); range.dispatchEvent(new Event("input", { bubbles:true })); }
    $("transition")?.scrollIntoView({ behavior:"smooth" });
  }

  $("gameSend").addEventListener("click", sendToLedger);
  $("loadExample")?.addEventListener("click", () => { apply(presets.offensif.levels); sendToLedger(); });
  $("gameShare").addEventListener("click", async (event) => {
    persistShareState(true);
    try { await navigator.clipboard.writeText(location.href); event.target.textContent = "Lien copié"; }
    catch { event.target.textContent = "Copie impossible"; }
  });

  const restored = decodeGameState(new URLSearchParams(location.search).get("jeu"), levers);
  if (restored) {
    state.target = restored.target;
    state.levels = restored.levels;
    state.shareEnabled = true;
  }
  render();
}
