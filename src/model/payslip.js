// Salarié du privé, cas général, taux 2026. Hors cadres, allègements, CSG et impôt.
// PASS 2026 = 48 060 €. Les parts salarié/employeur suivent les taux légaux et Agirc-Arrco.
export const PASS = 48060;
const T1 = { employee: 0.069 + 0.0315 + 0.0086, employer: 0.0855 + 0.0472 + 0.0129 };
const T2 = { employee: 0.0864 + 0.0108, employer: 0.1295 + 0.0162 };
const FLAT = { employee: 0.004, employer: 0.0211 };
const CET = { employee: 0.0014, employer: 0.0021 };

export function retirementContributions(grossYear) {
  const t1 = Math.min(grossYear, PASS);
  const t2 = Math.max(0, Math.min(grossYear, 8 * PASS) - PASS);
  const cetBase = grossYear > PASS ? Math.min(grossYear, 8 * PASS) : 0;
  return {
    employee: t1 * T1.employee + t2 * T2.employee + grossYear * FLAT.employee + cetBase * CET.employee,
    employer: t1 * T1.employer + t2 * T2.employer + grossYear * FLAT.employer + cetBase * CET.employer
  };
}

export function payslip(grossMonthly, shiftPct) {
  const c = retirementContributions(grossMonthly * 12);
  const share = shiftPct / 100;
  return {
    employeeMonthly: c.employee / 12, employerMonthly: c.employer / 12,
    employeeGainMonthly: (c.employee * share) / 12, employerSavingMonthly: (c.employer * share) / 12,
    toFindElsewhereYear: (c.employee + c.employer) * share, totalRate: grossMonthly > 0 ? (c.employee + c.employer) / (grossMonthly * 12) : 0
  };
}
