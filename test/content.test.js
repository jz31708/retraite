import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  architectureComparisons, budgetDistribution, claims, demographicAnchors, modelDefaults,
  partyComparisons, sourceRegistry, spendingAnchors
} from "../data/site-data.js";
import { levers } from "../data/levers.js";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const sourceCards = new Map(
  [...html.matchAll(/<article class="source-card" id="source-([^"]+)" data-source-category="([^"]+)">([\s\S]*?)<\/article>/g)]
    .map(([, id, category, body]) => [id, { category, url:body.match(/<a href="([^"]+)"/)?.[1] }])
);
const sourceIds = new Set(sourceRegistry.map((source) => source.id));

test("every registered source has a matching accessible source card and destination", () => {
  assert.equal(sourceRegistry.length, 19);
  assert.equal(sourceCards.size, sourceRegistry.length);
  for (const source of sourceRegistry) {
    const card = sourceCards.get(source.id);
    assert.ok(card, `missing source card ${source.id}`);
    assert.equal(card.category, source.category, `${source.id} category drift`);
    assert.equal(card.url, source.url, `${source.id} URL drift`);
    assert.ok(source.scope && source.supports && source.checkedAt, `${source.id} missing audit metadata`);
  }
});

test("every financing lever points to a reviewed source card", () => {
  for (const lever of levers) {
    const source = sourceRegistry.find((item) => item.id === lever.sourceId);
    assert.ok(source, `${lever.id} references an unregistered source`);
    assert.equal(source.url, lever.sourceUrl, `${lever.id} source URL drift`);
  }
});

test("all numeric claims and political evidence point to registered sources", () => {
  for (const claim of claims) {
    assert.ok(claim.scope && claim.status && claim.reference && claim.method, `${claim.id} is incomplete`);
    for (const sourceId of claim.sourceIds) assert.ok(sourceIds.has(sourceId), `${claim.id} references ${sourceId}`);
  }
  for (const comparison of partyComparisons) {
    for (const sourceId of comparison.sources) assert.ok(sourceIds.has(sourceId), `${comparison.id} references ${sourceId}`);
    for (const evidence of Object.values(comparison.levers)) {
      assert.ok(evidence.category && evidence.rationale && evidence.actorType);
      if (evidence.sourceId) assert.ok(sourceIds.has(evidence.sourceId), `${comparison.id} evidence references ${evidence.sourceId}`);
    }
  }
  for (const comparison of architectureComparisons) {
    for (const sourceId of comparison.sourceIds) assert.ok(sourceIds.has(sourceId));
  }
});

test("displayed anchors reconcile with data and the normalized budget is exactly 1,000", () => {
  assert.deepEqual(demographicAnchors.map(({ year }) => year), [1970, 2026, 2070]);
  assert.deepEqual(spendingAnchors.map(({ value }) => value), [14.7, 14.1, 15.3]);
  assert.equal(budgetDistribution.reduce((total, item) => total + item.value, 0), 1000);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /sequenceComparison/);
  assert.match(html, /Réinitialiser les hypothèses/);
  assert.match(html, /Garde-fous à adopter/);
  assert.match(html, /audit indépendant/);
  assert.match(html, /diversifiant les actifs de retraite à l'international/);
  assert.equal(modelDefaults.startYear + modelDefaults.accumulationYears, 2066);
  assert.equal(modelDefaults.startYear + 44, 2070);
});

test("the political comparator distinguishes silence from disagreement", () => {
  assert.match(html, /« Non identifié » ne veut pas dire « opposé »/);
  assert.equal(partyComparisons.some((comparison) => Object.values(comparison.levers).some((item) => item.category === "not-identified")), true);
  assert.equal(partyComparisons.some((comparison) => Object.values(comparison.levers).some((item) => item.category === "opposed")), false);
});
