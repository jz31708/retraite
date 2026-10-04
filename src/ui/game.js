import { levers, presets, markets } from "../../data/levers.js";
import { decodeGameState, encodeGameState, selectLeverLevel, total, marketResult } from "../model/game.js";

const nf = new Intl.NumberFormat("fr-FR", { maximumFractionDigits:1 });
const md = (n) => `${nf.format(n)} Md€`;
const $ = (id) => document.getElementById(id);

export function initialiseGame() {
  const list = $("gameLevers");
  if (!list) return;
  const state = { target:40, levels:Object.fromEntries(levers.map((l) => [l.id, 0])), shareEnabled:false };

  list.innerHTML = levers.map((l) => `<div class="lever-row"><div><b>${l.label}</b><small>${l.family} · paie : ${l.payer}</small><small>Risque : ${l.risk}</small></div>
    <label><input type="range" min="0" max="100" step="25" value="0" data-lever="${l.id}" aria-describedby="gameOverlapWarning" aria-label="Intensité : ${l.label}"><output id="out-${l.id}"></output></label>
    <small>100 % = ${md(l.central)} (entre ${nf.format(l.low)} et ${nf.format(l.high)}). ${l.basis} <a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.sourceLabel} ↗</a></small></div>`).join("");
  $("gamePresets").innerHTML = Object.entries(presets).map(([id, p]) => `<button type="button" data-preset="${id}" aria-pressed="false">${p.label}</button>`).join("");
  $("gameTable").innerHTML = `<caption class="visually-hidden">Capital simulé après 40 versements annuels constants pour trois hypothèses de rendement.</caption><thead><tr><th scope="col">Hypothèse</th>${markets.map(([, label]) => `<th scope="col">${label}</th>`).join("")}</tr></thead><tbody id="gameRows"></tbody>`;

  const apply = (levels) => { for (const l of levers) state.levels[l.id] = levels[l.id] ?? 0; render(); };

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
    const activeOverlap = levers.find((l) => l.overlapGroup && state.levels[l.id] > 0);
    for (const l of levers) {
      const input = list.querySelector(`[data-lever="${l.id}"]`);
      const level = state.levels[l.id];
      input.value = level * 100;
      input.disabled = Boolean(activeOverlap && l.overlapGroup === activeOverlap.overlapGroup && l.id !== activeOverlap.id);
      $(`out-${l.id}`).textContent = level ? `+${md(level * l.central)}/an` : "0";
    }
    $("gameOverlapWarning").textContent = activeOverlap
      ? `« ${activeOverlap.label} » est sélectionné. La CSG générale et la flat tax peuvent taxer les mêmes revenus du capital : une seule de ces options est activée à la fois.`
      : "La CSG générale et la flat tax peuvent porter sur les mêmes revenus du capital. Une seule de ces options est comptée à la fois.";
    $("gameOverlapWarning").classList.toggle("is-active", Boolean(activeOverlap));
    const [c, lo, hi] = ["central", "low", "high"].map((k) => total(levers, state.levels, k));
    const target = state.target;
    $("gameTarget").value = target;
    $("gameTargetOut").textContent = md(target);
    $("gameTotal").textContent = `${md(c)}/an`;
    $("gameRange").textContent = `Fourchette : ${md(lo)} à ${md(hi)}`;
    $("gameMeter").style.width = `${Math.min(100, (c / target) * 100)}%`;
    $("gameGap").textContent = c >= target ? "Objectif couvert sur le chiffre central." : `Il manque ${md(target - c)} par an sur le chiffre central.`;
    const payers = {};
    for (const l of levers) if (state.levels[l.id]) payers[l.payer] = (payers[l.payer] ?? 0) + state.levels[l.id] * l.central;
    $("gamePayers").textContent = Object.keys(payers).length ? "Qui paie : " + Object.entries(payers).map(([p, v]) => `${p} (${md(v)})`).join(", ") + "." : "Qui paie : personne, pour l'instant.";
    const ref = marketResult(target, "reference");
    const rows = [["Montant central", c], ["Borne basse", lo], ["Borne haute", hi]].map(([label, v]) => `<tr><th scope="row">${label}</th>${markets.map(([m]) => { const cap = marketResult(Math.min(v, target), m); return `<td>${md(cap)}<small>${Math.round((cap / ref) * 100)} % de la cible</small></td>`; }).join("")}</tr>`);
    $("gameRows").innerHTML = rows.join("");
    const shock = marketResult(Math.min(c, target), "late-crash");
    $("gameVerdict").textContent = c === 0 ? "Aucun flux annuel sélectionné : dans ce scénario, le fonds ne reçoit rien." : `Après 40 versements annuels constants, le capital atteint ${Math.round((marketResult(Math.min(c, target), "reference") / ref) * 100)} % de la cible en marché de référence et ${Math.round((shock / ref) * 100)} % après un krach tardif. Cible : ${md(target)}/an versés pendant 40 ans à 3 % réel.`;
    $("gamePresets").querySelectorAll("[data-preset]").forEach((button) => {
      const presetLevels = presets[button.dataset.preset].levels;
      const matches = levers.every((l) => state.levels[l.id] === (presetLevels[l.id] ?? 0));
      button.setAttribute("aria-pressed", String(matches));
    });
    persistShareState();
  }

  list.addEventListener("input", (e) => { const id = e.target.dataset.lever; if (id) { state.levels = selectLeverLevel(levers, state.levels, id, Number(e.target.value) / 100); render(); } });
  $("gamePresets").addEventListener("click", (e) => { const id = e.target.dataset.preset; if (id) apply(presets[id].levels); });
  $("gameTarget").addEventListener("input", (e) => { state.target = Number(e.target.value); render(); });

  function sendToLedger() {
    const sums = { fundingTax:0, fundingPension:0, fundingReallocate:0, fundingOther:0 };
    for (const l of levers) sums[l.ledger] += state.levels[l.id] * l.central;
    for (const [id, v] of Object.entries(sums)) { const input = $(id); if (input) { input.value = Math.min(250, Math.round(v * 2) / 2); input.dispatchEvent(new Event("input", { bubbles:true })); } }
    const range = $("targetRange"); if (range) { range.value = Math.min(80, state.target); range.dispatchEvent(new Event("input", { bubbles:true })); }
    $("transition")?.scrollIntoView({ behavior:"smooth" });
  }
  $("gameSend").addEventListener("click", sendToLedger);
  $("loadExample")?.addEventListener("click", () => { apply(presets.offensif.levels); sendToLedger(); });
  $("gameShare").addEventListener("click", async (e) => { persistShareState(true); try { await navigator.clipboard.writeText(location.href); e.target.textContent = "Lien copié"; } catch { e.target.textContent = "Copie impossible"; } });

  const restored = decodeGameState(new URLSearchParams(location.search).get("jeu"), levers);
  if (restored) {
    state.target = restored.target;
    state.levels = restored.levels;
    state.shareEnabled = true;
  }
  render();
}
