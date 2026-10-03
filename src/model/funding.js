const finiteNonNegative = (value, name) => {
  if (!Number.isFinite(value) || value < 0) throw new RangeError(`${name} must be a finite non-negative number`);
  return value;
};

export function calculateFunding({ targetBn, allocations }) {
  finiteNonNegative(targetBn, "targetBn");
  if (!allocations || typeof allocations !== "object") throw new TypeError("allocations must be an object");
  const entries = Object.entries(allocations);
  for (const [name, value] of entries) finiteNonNegative(value, name);
  const availableBn = entries.reduce((sum, [, value]) => sum + value, 0);
  const fundedBn = Math.min(targetBn, availableBn);
  return {
    targetBn,
    availableBn,
    fundedBn,
    unallocatedBn: Math.max(0, targetBn - availableBn),
    excessBn: Math.max(0, availableBn - targetBn)
  };
}

export function annualContributions(amountBn, contributionYears, totalYears) {
  finiteNonNegative(amountBn, "amountBn");
  if (!Number.isInteger(contributionYears) || contributionYears < 0) throw new RangeError("contributionYears must be a non-negative integer");
  if (!Number.isInteger(totalYears) || totalYears < contributionYears) throw new RangeError("totalYears must be an integer at least as large as contributionYears");
  return Array.from({ length: totalYears }, (_, index) => index < contributionYears ? amountBn : 0);
}
