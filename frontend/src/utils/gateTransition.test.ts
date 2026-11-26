import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateGateTransition,
  resolveRouteState,
  routePathForAuthMode,
} from './gateTransition';

test('resolveRouteState maps /, /signup, /signin, and /forgot-password cleanly', () => {
  assert.deepEqual(resolveRouteState('/'), { phase: 'welcome', authMode: 'signup' });
  assert.deepEqual(resolveRouteState('/signup'), { phase: 'auth', authMode: 'signup' });
  assert.deepEqual(resolveRouteState('/signin/'), { phase: 'auth', authMode: 'signin' });
  assert.deepEqual(resolveRouteState('/forgot-password'), { phase: 'auth', authMode: 'forgot' });
});

test('routePathForAuthMode returns canonical route paths', () => {
  assert.equal(routePathForAuthMode('signup'), '/signup');
  assert.equal(routePathForAuthMode('signin'), '/signin');
  assert.equal(routePathForAuthMode('forgot'), '/forgot-password');
});

test('evaluateGateTransition starts at zero, pulses mid-transition, and settles cleanly', () => {
  const start = evaluateGateTransition(0);
  assert.equal(start.energyPulse, 0);
  assert.equal(start.objectExpansion, 0);
  assert.equal(start.cameraDive, 0);
  assert.equal(start.snapDissolveProgress, 0);
  assert.equal(start.portalEmergeProgress, 0);

  const mid = evaluateGateTransition(0.5);
  assert.ok(mid.energyPulse > 0.85);
  assert.ok(mid.objectExpansion > 0.5);
  assert.ok(mid.cameraDive > 0.7);
  assert.ok(mid.lightWaveProgress > 0.5);
  assert.ok(mid.snapDissolveProgress > 0.7);

  const end = evaluateGateTransition(1);
  assert.ok(end.energyPulse < 0.05);
  assert.ok(end.objectExpansion > 0.7);
  assert.equal(end.lightWaveProgress, 1);
  assert.equal(end.snapDissolveProgress, 1);
  assert.equal(end.portalEmergeProgress, 1);
});
