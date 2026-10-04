// Versements en fin d'année, euros constants, rendement réel. growthPct = croissance annuelle du versement.
export function compound({ annual, years, returnPct, growthPct = 0 }) {
  let capital = 0, paid = 0;
  const series = [];
  for (let y = 1; y <= years; y += 1) {
    const payment = annual * (1 + growthPct / 100) ** (y - 1);
    capital = capital * (1 + returnPct / 100) + payment;
    paid += payment;
    series.push({ year: y, capital, paid });
  }
  return { capital, paid, gains: capital - paid, series };
}
