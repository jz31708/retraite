export function buildReturnPaths(name, totalYears, baseReturnPct, contributionYears = totalYears) {
  if (!Number.isInteger(totalYears) || totalYears < 1) throw new RangeError("totalYears must be a positive integer");
  if (!Number.isFinite(baseReturnPct) || baseReturnPct <= -100) throw new RangeError("baseReturnPct must be greater than -100");
  const base = baseReturnPct / 100;
  const primary = Array(totalYears).fill(base);

  if (name === "late-shock") {
    primary[Math.max(0, Math.min(totalYears, contributionYears) - 3)] = -0.35;
    return { primary, label:"Krach tardif · −35 % trois ans avant la fin des versements, puis le taux choisi" };
  }
  if (name === "early-shock") {
    primary[0] = -0.2;
    if (totalYears > 1) primary[1] = -0.08;
    return { primary, label:"Choc au début · −20 %, −8 %, puis le taux choisi" };
  }
  if (name === "sequence") {
    const reverse = [...primary];
    const comparisonYears = Math.min(20, totalYears);
    const upYears = Math.ceil(comparisonYears / 2);
    for (let year = 0; year < comparisonYears; year++) {
      primary[year] = year < upYears ? 0.05 : -0.01;
      reverse[year] = year < comparisonYears - upYears ? -0.01 : 0.05;
    }
    return { primary, alternate:reverse, label:"Même série de rendements · ordre inversé", comparisonYears, upYears, downYears:comparisonYears-upYears };
  }
  if (name === "low") return { primary:Array(totalYears).fill(0.01), label:"Rendement réel constant · 1 %" };
  if (name === "zero") return { primary:Array(totalYears).fill(0), label:"Rendement réel constant · 0 %" };
  return { primary, label:`Rendement réel constant · ${baseReturnPct.toLocaleString("fr-FR")} %` };
}
