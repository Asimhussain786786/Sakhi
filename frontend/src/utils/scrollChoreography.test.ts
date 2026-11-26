import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateLivingCameraMotion,
  evaluateScrollChoreography,
  getAuraTheme,
} from './scrollChoreography';

test('hero scroll state frames flower on left and keeps petals gently poised', () => {
  const hero = evaluateScrollChoreography(0, false);
  assert.equal(hero.chapter, 0);
  assert.equal(hero.phaseNumber, 1);
  assert.ok(hero.flowerBloom < 0.35);
  assert.ok(hero.cameraTarget[0] > 1.0);
  assert.equal(hero.particleMorph, 0);
  assert.equal(hero.bgHex, '#fcebf3');
  assert.ok(hero.veilIntensity > 0.5);
  assert.ok(hero.rayIntensity > 0.4);
});

test('chapter 01 opens petals, moves camera forward, and shifts background toward lavender', () => {
  const ch1 = evaluateScrollChoreography(0.28, false);
  const hero = evaluateScrollChoreography(0, false);
  assert.equal(ch1.chapter, 1);
  assert.equal(ch1.phaseNumber, 2);
  assert.ok(ch1.flowerBloom > hero.flowerBloom);
  assert.ok(ch1.cameraPos[2] < hero.cameraPos[2]);
  assert.ok(ch1.particleVisibility > hero.particleVisibility);
  assert.ok(ch1.paletteMix > 0.1);
});

test('chapter 02 reveals 3D floating experience panels and deepens 4D veils', () => {
  const ch2 = evaluateScrollChoreography(0.54, false);
  assert.equal(ch2.chapter, 2);
  assert.equal(ch2.phaseNumber, 3);
  assert.ok(ch2.panelReveal > 0.7);
  assert.ok(ch2.veilIntensity > 0.9);
  assert.ok(ch2.rayIntensity > 0.85);
});

test('chapter 03 coalesces particles into feminine sculpture and completes finale', () => {
  const ch3 = evaluateScrollChoreography(0.95, false);
  assert.equal(ch3.chapter, 3);
  assert.equal(ch3.phaseNumber, 4);
  assert.equal(ch3.flowerBloom, 1);
  assert.equal(ch3.particleMorph, 1);
  assert.equal(ch3.sculptureGlow, 1);
  assert.ok(ch3.finaleReveal > 0.9);
  assert.equal(ch3.panelReveal, 0);
  assert.equal(ch3.bgHex, '#e5d3f8');
});

test('compact viewport centers camera target on hero', () => {
  const mobileHero = evaluateScrollChoreography(0, true);
  assert.equal(mobileHero.cameraTarget[0], 0);
});

test('living camera motion drifts continuously while idle and honors reduced motion', () => {
  const a = evaluateLivingCameraMotion(0.5, 0, 0, true, false);
  const b = evaluateLivingCameraMotion(3.2, 0.5, -0.4, true, false);
  assert.notEqual(a.driftX, b.driftX);
  assert.notEqual(a.roll, b.roll);

  const reduced = evaluateLivingCameraMotion(3.2, 0.5, -0.4, true, true);
  assert.equal(reduced.driftZ, 0);
  assert.equal(reduced.roll, 0);
});

test('getAuraTheme returns distinct pastel palettes', () => {
  const rose = getAuraTheme('rose-dawn');
  const lav = getAuraTheme('lavender-dream');
  const pearl = getAuraTheme('celestial-pearl');
  assert.notEqual(rose.bgStart, lav.bgStart);
  assert.notEqual(lav.bgStart, pearl.bgStart);
});
