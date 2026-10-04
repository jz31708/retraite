import { simulateFund } from "./fund.js";
import { buildReturnPaths } from "./scenarios.js";
import { annualContributions } from "./funding.js";

export const total = (levers, levels, key = "central") => levers.reduce((sum, lever) => sum + (levels[lever.id] ?? 0) * lever[key], 0);

export function encodeGameState(target, levers, levels) {
  return [target, ...levers.map((lever) => Math.round((levels[lever.id] ?? 0) * 4))].join(".");
}

export function decodeGameState(value, levers) {
  if (typeof value !== "string") return null;
  const parts = value.split(".").map(Number);
  if (parts.length !== levers.length + 1 || parts.some((part) => !Number.isInteger(part))) return null;
  const [target, ...levelsByLever] = parts;
  if (target < 10 || target > 60 || (target - 10) % 5 !== 0 || levelsByLever.some((level) => level < 0 || level > 4)) return null;

  const levels = Object.fromEntries(levers.map((lever, index) => [lever.id, levelsByLever[index] / 4]));
  for (const group of new Set(levers.map((lever) => lever.overlapGroup).filter(Boolean))) {
    if (levers.filter((lever) => lever.overlapGroup === group && levels[lever.id] > 0).length > 1) return null;
  }
  return { target, levels };
}

export function selectLeverLevel(levers, levels, selectedId, selectedLevel) {
  const next = { ...levels, [selectedId]:selectedLevel };
  const selected = levers.find((lever) => lever.id === selectedId);
  if (selected?.overlapGroup && selectedLevel > 0) {
    for (const lever of levers) {
      if (lever.id !== selectedId && lever.overlapGroup === selected.overlapGroup) next[lever.id] = 0;
    }
  }
  return next;
}

export function marketResult(amountBn, market, years = 40, returnPct = 3) {
  let primary;
  if (market === "late-crash") { primary = Array(years).fill(returnPct / 100); primary[Math.max(0, years - 3)] = -0.35; }
  else ({ primary } = buildReturnPaths(market, years, returnPct));
  return simulateFund({ annualReturns:primary, contributions:annualContributions(amountBn, years, years) }).finalCapitalBn;
}
