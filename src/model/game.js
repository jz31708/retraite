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

export function marketResult(amountBn, market, years = 40, returnPct = 3) {
  const { primary } = buildReturnPaths(market, years, returnPct);
  return simulateFund({ annualReturns:primary, contributions:annualContributions(amountBn, years, years) }).finalCapitalBn;
}
