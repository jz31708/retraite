import test from "node:test";
import assert from "node:assert/strict";
import { retirementContributions, payslip } from "../src/model/payslip.js";
import { compound } from "../src/model/compound.js";

test("retirement contributions for 3 000 € gross per month", () => {
  const c = retirementContributions(36000);
  assert.ok(Math.abs(c.employee - 4071.6) < 0.01);
  assert.ok(Math.abs(c.employer - 6001.2) < 0.01);
  assert.ok(Math.abs(payslip(3000, 0).totalRate * 100 - 27.98) < 0.01);
});
test("the technical-balance contribution applies above PASS to both shares", () => {
  const c = retirementContributions(72000);
  assert.ok(Math.abs(c.employee - 7959.114) < 0.01);
  assert.ok(Math.abs(c.employer - 12155.994) < 0.01);
});
test("an empty pay input does not render a non-finite percentage", () => {
  assert.equal(payslip(0, 20).totalRate, 0);
});
test("shifting nothing changes nothing, shifting half halves the burden", () => {
  assert.equal(payslip(3000, 0).toFindElsewhereYear, 0);
  assert.ok(Math.abs(payslip(3000, 50).toFindElsewhereYear - 5036.4) < 0.01);
});
test("compound interest matches the closed form", () => {
  assert.equal(Math.round(compound({ annual:10, years:40, returnPct:0 }).capital), 400);
  assert.equal(Math.round(compound({ annual:10, years:40, returnPct:3 }).capital), 754);
  assert.ok(compound({ annual:10, years:40, returnPct:3, growthPct:3 }).capital > 754);
});
