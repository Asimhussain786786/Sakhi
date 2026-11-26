import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SAKHI_BACKDROP_DEFAULT_ASPECT,
  SAKHI_BACKDROP_URL,
  computeCoverUvScale,
  evaluateBackdropParams,
} from './backdropMath';

test('SAKHI_BACKDROP_URL points to local static public asset path', () => {
  assert.ok(SAKHI_BACKDROP_URL.startsWith('/assets/aistudio/'));
  assert.ok(SAKHI_BACKDROP_URL.endsWith('.jpg'));
});

test('computeCoverUvScale preserves aspect ratio on desktop and portrait mobile', () => {
  const desktop = computeCoverUvScale(1440 / 900, SAKHI_BACKDROP_DEFAULT_ASPECT, 1.07);
  assert.ok(desktop.scaleX > 0 && desktop.scaleX < desktop.scaleY);
  assert.equal(desktop.focusX, 0.5);

  const mobile = computeCoverUvScale(390 / 844, SAKHI_BACKDROP_DEFAULT_ASPECT, 1.07);
  assert.ok(mobile.scaleX > 0 && mobile.scaleX < 0.35);
  assert.ok(mobile.scaleY > 0.85 && mobile.scaleY < 1.0);
  assert.ok(mobile.focusX > 0.52);

  const ultrawide = computeCoverUvScale(3.2, SAKHI_BACKDROP_DEFAULT_ASPECT, 1.1);
  assert.ok(ultrawide.scaleY < ultrawide.scaleX);
});

test('evaluateBackdropParams smoothly scales zoom and sunBoost across scroll and pulse', () => {
  const hero = evaluateBackdropParams(0, 0, 'rose-dawn');
  const finale = evaluateBackdropParams(0.95, 0, 'rose-dawn');
  const pulsed = evaluateBackdropParams(0, 0.9, 'lavender-dream');
  const pearl = evaluateBackdropParams(0.5, 0, 'celestial-pearl');

  assert.ok(finale.zoom > hero.zoom);
  assert.ok(finale.sunBoost > hero.sunBoost);
  assert.ok(pulsed.sunBoost > hero.sunBoost);
  assert.equal(pulsed.tintHex, '#d5bfff');
  assert.ok(pearl.vignetteStrength < pulsed.vignetteStrength);
});
