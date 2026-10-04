import test from "node:test";
import assert from "node:assert/strict";
import { levers, presets } from "../data/levers.js";
import { decodeGameState, encodeGameState, selectLeverLevel, total, marketResult } from "../src/model/game.js";

test("every lever is sourced, bracketed and has a stated risk", () => {
  for (const l of levers) {
    assert.ok(l.low <= l.central && l.central <= l.high, l.id);
    assert.match(l.url, /^https:\/\//);
    assert.ok(l.risk && l.basis && l.payer, l.id);
  }
});
test("presets add up and the zero scenario is empty", () => {
  assert.equal(total(levers, presets.zero.levels), 0);
  assert.equal(total(levers, presets.prudent.levels), 1);
  assert.equal(total(levers, presets.offensif.levels), 4);
  assert.equal(total(levers, presets.tout.levels), 15.2);
});
test("the recurring funding menu excludes measures already in law or limited to one year", () => {
  assert.deepEqual(levers.map((lever) => lever.id), ["exo", "pfu", "csgGen"]);
});
test("CSG and flat-tax estimates never overlap in the selectable presets", () => {
  const grouped = levers.filter((lever) => lever.overlapGroup === "capital-tax");
  assert.equal(grouped.length, 2);
  for (const preset of Object.values(presets)) {
    assert.ok(grouped.filter((lever) => (preset.levels[lever.id] ?? 0) > 0).length <= 1, preset.label);
  }
});
test("choosing one overlapping lever clears the previous selection", () => {
  const levels = { exo:1, pfu:.5, csgGen:0 };
  assert.deepEqual(selectLeverLevel(levers, levels, "csgGen", .75), { exo:1, pfu:0, csgGen:.75 });
});
test("shared scenario state restores objective and levels and rejects overlap", () => {
  const encoded = encodeGameState(35, levers, presets.offensif.levels);
  assert.deepEqual(decodeGameState(encoded, levers), {
    target:35,
    levels:{ exo:1, pfu:1, csgGen:0 }
  });
  assert.equal(decodeGameState("40.0.4.4", levers), null);
  assert.equal(decodeGameState("80.0.0.0", levers), null);
  assert.equal(decodeGameState("40.0.4", levers), null);
});
test("market scenarios rank as expected", () => {
  const ref = marketResult(10, "reference"), zero = marketResult(10, "zero"), shock = marketResult(10, "late-crash");
  assert.equal(Math.round(zero), 400);
  assert.ok(zero < ref && shock < ref);
});
