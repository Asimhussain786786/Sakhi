import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateTransitionEnvelope,
  getQualityBudget,
  resolveChapterFromProgress,
  sampleShowcaseCamera,
} from './showcaseChoreography';

test('sampleShowcaseCamera blooms lotus monotonically from closed Ch.1 to open Ch.4', () => {
  const ch1 = sampleShowcaseCamera(0);
  const ch2 = sampleShowcaseCamera(1 / 3);
  const ch3 = sampleShowcaseCamera(2 / 3);
  const ch4 = sampleShowcaseCamera(1);

  assert.ok(ch1.lotusBloom < 0.15);
  assert.ok(ch2.lotusBloom > ch1.lotusBloom);
  assert.ok(ch3.lotusBloom > ch2.lotusBloom);
  assert.equal(ch4.lotusBloom, 1);
  // Ch.02 flies low along path; Ch.03 rises above crystals
  assert.ok(ch2.position[1] < ch1.position[1]);
  assert.ok(ch3.position[1] > ch2.position[1]);
  assert.ok(ch4.position[2] > 10.5);
});

test('evaluateTransitionEnvelope activates Petal Wipe, Bloom Iris, and Shimmer Dissolve at boundaries', () => {
  const idle = evaluateTransitionEnvelope(0);
  assert.equal(idle.type, 0);
  assert.equal(idle.windMultiplier, 1);

  const wipe = evaluateTransitionEnvelope(1 / 6);
  assert.equal(wipe.type, 1);
  assert.ok(wipe.intensity > 0.95);
  assert.ok(wipe.bloomFlash > 0.8);
  assert.ok(wipe.windMultiplier >= 2.9);

  const iris = evaluateTransitionEnvelope(0.5);
  assert.equal(iris.type, 2);
  assert.ok(iris.intensity > 0.95);

  const dissolve = evaluateTransitionEnvelope(5 / 6);
  assert.equal(dissolve.type, 3);
  assert.ok(dissolve.intensity > 0.95);
});

test('resolveChapterFromProgress maps progress bands cleanly to chapters 0..3', () => {
  assert.equal(resolveChapterFromProgress(0), 0);
  assert.equal(resolveChapterFromProgress(0.33), 1);
  assert.equal(resolveChapterFromProgress(0.66), 2);
  assert.equal(resolveChapterFromProgress(0.95), 3);
});

test('getQualityBudget matches exact 900/450/180 petal budgets across desktop, tablet, mobile', () => {
  assert.equal(getQualityBudget('high', 1440, false).petalCount, 900);
  assert.equal(getQualityBudget('high', 900, false).petalCount, 450);
  assert.equal(getQualityBudget('high', 390, false).petalCount, 180);
  assert.equal(getQualityBudget('high', 1440, false).sporeCount, 1500);
  assert.equal(getQualityBudget('high', 1440, false).starSpriteCount, 300);
});
