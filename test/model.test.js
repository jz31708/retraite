import test from "node:test";
import assert from "node:assert/strict";
import { annualContributions, calculateFunding } from "../src/model/funding.js";
import { simulateFund } from "../src/model/fund.js";
import { buildReturnPaths } from "../src/model/scenarios.js";

test("funding ledger separates the gap, invested amount, and excess", () => {
  assert.deepEqual(calculateFunding({ targetBn:40, allocations:{ tax:0, pensions:0 } }), {
    targetBn:40, availableBn:0, fundedBn:0, unallocatedBn:40, excessBn:0
  });
  assert.deepEqual(calculateFunding({ targetBn:40, allocations:{ tax:20, pensions:10, other:30 } }), {
    targetBn:40, availableBn:60, fundedBn:40, unallocatedBn:0, excessBn:20
  });
  assert.deepEqual(annualContributions(12, 2, 4), [12, 12, 0, 0]);
});

test("fund applies annual return, one fee, opening-balance withdrawal, then end-year contribution", () => {
  const result = simulateFund({
    initialCapitalBn:100,
    annualReturns:[0.1],
    contributions:[5],
    feeRate:0.02,
    withdrawalRate:0.25,
    withdrawalStartYear:1
  });
  assert.ok(Math.abs(result.rows[0].afterReturnBn - 110) < 1e-9);
  assert.ok(Math.abs(result.rows[0].feeBn - 2.2) < 1e-9);
  assert.equal(result.rows[0].requestedWithdrawalBn, 25);
  assert.equal(result.rows[0].withdrawalBn, 25);
  assert.ok(Math.abs(result.rows[0].closingBn - 87.8) < 1e-9);
  assert.equal(result.cumulativeContributionsBn, 5);
  assert.equal(result.cumulativeWithdrawalsBn, 25);
  assert.equal(result.netTransfersBn, -20);
});

test("withdrawals stop at available assets and record the unfunded request", () => {
  const result = simulateFund({
    initialCapitalBn:100,
    annualReturns:[-0.99],
    contributions:[0],
    withdrawalRate:0.5,
    withdrawalStartYear:1
  });
  assert.equal(result.rows[0].requestedWithdrawalBn, 50);
  assert.ok(Math.abs(result.rows[0].withdrawalBn - 1) < 1e-9);
  assert.ok(Math.abs(result.rows[0].shortfallBn - 49) < 1e-9);
  assert.equal(result.finalCapitalBn, 0);
});

test("a 40-year, 3% real target annuity matches the stated order of magnitude", () => {
  const rows = simulateFund({
    annualReturns:Array(40).fill(0.03),
    contributions:Array(40).fill(40)
  }).rows;
  assert.ok(Math.abs(rows.at(-1).closingBn - 3016.5) < 2);
});

test("seeded reference values and first requested payouts reproduce the handoff table", () => {
  const references = [[14, 714.8, 17.9], [24, 1419.1, 35.5], [40, 3083.6, 77.1], [44, 3637.9, 90.9], [50, 4602.6, 115.1]];
  for (const [years, expectedCapital, expectedPayout] of references) {
    const result = simulateFund({
      initialCapitalBn:20.7,
      annualReturns:Array(years + 1).fill(0.03),
      contributions:Array.from({ length:years + 1 }, (_, index) => index < years ? 40 : 0),
      withdrawalRate:0.025,
      withdrawalStartYear:years + 1
    });
    const capitalAfterAccumulation = result.rows[years - 1].closingBn;
    const firstRequestedPayout = result.rows[years].requestedWithdrawalBn;
    assert.ok(Math.abs(capitalAfterAccumulation - expectedCapital) < 1, `${years}-year capital`);
    assert.ok(Math.abs(firstRequestedPayout - expectedPayout) < 0.2, `${years}-year payout`);
  }
});

test("starting withdrawals sooner reduces capital while preserving the same assumptions", () => {
  const early = simulateFund({ initialCapitalBn:100, annualReturns:[0, 0], contributions:[20, 0], withdrawalRate:0.1, withdrawalStartYear:1 });
  const later = simulateFund({ initialCapitalBn:100, annualReturns:[0, 0], contributions:[20, 0], withdrawalRate:0.1, withdrawalStartYear:2 });
  assert.equal(early.finalCapitalBn, 99);
  assert.equal(later.finalCapitalBn, 108);
  assert.equal(early.rows[0].withdrawalBn, 10);
  assert.equal(later.rows[0].withdrawalBn, 0);
});

test("equal return sets in opposite order produce different outcomes with contributions", () => {
  const earlyGain = simulateFund({ annualReturns:[0.1, -0.1], contributions:[100, 100] });
  const earlyLoss = simulateFund({ annualReturns:[-0.1, 0.1], contributions:[100, 100] });
  assert.equal(earlyGain.finalCapitalBn, 190);
  assert.equal(earlyLoss.finalCapitalBn, 210);
});

test("scenario presets stay finite and sequence comparison preserves its return set", () => {
  const shock = buildReturnPaths("early-shock", 4, 3);
  assert.deepEqual(shock.primary, [-0.2, -0.08, 0.03, 0.03]);
  const sequence = buildReturnPaths("sequence", 9, 3);
  assert.deepEqual([...sequence.primary].sort(), [...sequence.alternate].sort());
  assert.equal(sequence.primary.length, 9);
  assert.equal(buildReturnPaths("zero", 2, 3).primary.reduce((sum, amount) => sum + amount, 0), 0);
});

test("model rejects invalid rates, balances, and inconsistent horizons", () => {
  assert.throws(() => simulateFund({ annualReturns:[-1], contributions:[0] }), RangeError);
  assert.throws(() => simulateFund({ annualReturns:[0], contributions:[0], feeRate:1 }), RangeError);
  assert.throws(() => simulateFund({ annualReturns:[0], contributions:[-1] }), RangeError);
  assert.throws(() => calculateFunding({ targetBn:-1, allocations:{} }), RangeError);
  assert.throws(() => annualContributions(1, 3, 2), RangeError);
});
