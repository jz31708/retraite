const finiteNonNegative = (value, name) => {
  if (!Number.isFinite(value) || value < 0) throw new RangeError(`${name} must be a finite non-negative number`);
  return value;
};

export function simulateFund({
  initialCapitalBn = 0,
  annualReturns,
  contributions,
  feeRate = 0,
  withdrawalRate = 0,
  withdrawalStartYear = Number.POSITIVE_INFINITY
}) {
  finiteNonNegative(initialCapitalBn, "initialCapitalBn");
  finiteNonNegative(feeRate, "feeRate");
  finiteNonNegative(withdrawalRate, "withdrawalRate");
  if (feeRate >= 1) throw new RangeError("feeRate must be less than 1");
  if (!Array.isArray(annualReturns) || !Array.isArray(contributions) || annualReturns.length !== contributions.length) {
    throw new TypeError("annualReturns and contributions must be arrays of equal length");
  }
  if (!(withdrawalStartYear === Number.POSITIVE_INFINITY || (Number.isInteger(withdrawalStartYear) && withdrawalStartYear >= 1))) {
    throw new RangeError("withdrawalStartYear must be a positive integer or Infinity");
  }

  let balanceBn = initialCapitalBn;
  let cumulativeContributionsBn = 0;
  let cumulativeWithdrawalsBn = 0;
  let cumulativeShortfallBn = 0;

  const rows = annualReturns.map((returnRate, index) => {
    const year = index + 1;
    if (!Number.isFinite(returnRate) || returnRate <= -1) throw new RangeError("each real return must be finite and greater than -100%");
    const contributionBn = finiteNonNegative(contributions[index], `contributions[${index}]`);
    const openingBn = balanceBn;
    const afterReturnBn = openingBn * (1 + returnRate);
    const feeBn = afterReturnBn * feeRate;
    const assetsBeforeWithdrawalBn = afterReturnBn - feeBn;
    const requestedWithdrawalBn = year >= withdrawalStartYear ? openingBn * withdrawalRate : 0;
    const withdrawalBn = Math.min(requestedWithdrawalBn, assetsBeforeWithdrawalBn);
    const shortfallBn = requestedWithdrawalBn - withdrawalBn;
    balanceBn = assetsBeforeWithdrawalBn - withdrawalBn + contributionBn;
    cumulativeContributionsBn += contributionBn;
    cumulativeWithdrawalsBn += withdrawalBn;
    cumulativeShortfallBn += shortfallBn;

    return {
      year, openingBn, returnRate, afterReturnBn, feeBn, assetsBeforeWithdrawalBn,
      requestedWithdrawalBn, withdrawalBn, shortfallBn, contributionBn, closingBn:balanceBn,
      cumulativeContributionsBn, cumulativeWithdrawalsBn, cumulativeShortfallBn
    };
  });

  return {
    initialCapitalBn,
    rows,
    finalCapitalBn:balanceBn,
    cumulativeContributionsBn,
    cumulativeWithdrawalsBn,
    cumulativeShortfallBn,
    netTransfersBn:cumulativeContributionsBn - cumulativeWithdrawalsBn
  };
}
