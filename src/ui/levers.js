const read = (id) => {
  const amount = Number(document.getElementById(id)?.value);
  return Number.isFinite(amount) ? Math.max(0, amount) : 0;
};

export function initialiseLevers() {
  const baseBalance = -2.4;
  const ids = ["levyRevenue", "levyPension", "levyWork"];
  const outputs = ["levyRevenueOut", "levyPensionOut", "levyWorkOut"];
  const fields = ids.map((id) => document.getElementById(id)).filter(Boolean);
  if (fields.length !== ids.length) return;

  const recalculate = () => {
    ids.forEach((id, index) => {
      const amount = read(id);
      const paired = document.querySelector(`[data-paired-to="${id}"]`);
      if (paired && document.activeElement !== paired) paired.value = String(amount);
      const output = document.getElementById(outputs[index]);
      output.textContent = `${amount.toLocaleString("fr-FR", { maximumFractionDigits:1 })} ${amount > 1 ? "pts" : "pt"} de PIB`;
    });
    const remainder = baseBalance + ids.reduce((sum, id) => sum + read(id), 0);
    const formatted = `${remainder < 0 ? "−" : remainder > 0 ? "+" : ""}${Math.abs(remainder).toLocaleString("fr-FR", { maximumFractionDigits:1 })} % PIB`;
    document.getElementById("gapAfter").textContent = formatted;
    const meter = document.getElementById("gapMeter");
    const remaining = Math.min(100, Math.max(0, (remainder / baseBalance) * 100));
    meter.style.width = `${remaining}%`;
    meter.parentElement.setAttribute("aria-valuenow", String(Math.round(remaining)));
    meter.parentElement.setAttribute("aria-valuetext", `Solde après addition illustrative : ${formatted}`);
  };
  fields.forEach((field) => field.addEventListener("input", recalculate));
  document.querySelectorAll("input[data-paired-to^=levy]").forEach((field) => field.addEventListener("input", recalculate));
  recalculate();
}
