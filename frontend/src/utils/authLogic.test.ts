import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateSignInInput,
  validateSignUpInput,
  validateForgotInput,
  hasErrors,
} from './authLogic';

test('validateSignInInput rejects empty fields and invalid email', () => {
  const empty = validateSignInInput('', '');
  assert.equal(hasErrors(empty), true);
  assert.ok(empty.email);
  assert.ok(empty.password);

  const badEmail = validateSignInInput('not-an-email', 'Sakhi2026!');
  assert.equal(hasErrors(badEmail), true);
  assert.ok(badEmail.email);
  assert.equal(badEmail.password, undefined);
});

test('validateSignInInput accepts valid credentials', () => {
  const valid = validateSignInInput('aria@sakhi.world', 'Sakhi2026!');
  assert.equal(hasErrors(valid), false);
});

test('validateSignUpInput enforces name, 8-char password, and matching confirmation', () => {
  const mismatch = validateSignUpInput('Aria Mehta', 'aria@sakhi.world', 'Sakhi2026!', 'Different1!');
  assert.equal(hasErrors(mismatch), true);
  assert.ok(mismatch.confirmPassword);

  const shortPwd = validateSignUpInput('Aria', 'aria@sakhi.world', 'short', 'short');
  assert.equal(hasErrors(shortPwd), true);
  assert.ok(shortPwd.password);

  const ok = validateSignUpInput('Aria Mehta', 'aria@sakhi.world', 'Sakhi2026!', 'Sakhi2026!');
  assert.equal(hasErrors(ok), false);
});

test('validateForgotInput validates email format', () => {
  assert.equal(hasErrors(validateForgotInput('')), true);
  assert.equal(hasErrors(validateForgotInput('bad@')), true);
  assert.equal(hasErrors(validateForgotInput('aria@sakhi.world')), false);
});
