export type AuthMode = 'signin' | 'signup' | 'otp' | 'forgot';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  provider: 'email' | 'google';
  joinedAt: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function validateSignInInput(email: string, password: string): ValidationErrors {
  const errors: ValidationErrors = {};
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Please enter your password.';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

export function validateSignUpInput(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
): ValidationErrors {
  const errors: ValidationErrors = {};
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Please create a password.';
  } else if (password.length < 8) {
    errors.password = 'Use at least 8 characters for your password.';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

export function validateForgotInput(email: string): ValidationErrors {
  const errors: ValidationErrors = {};
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    errors.email = 'Please enter the email linked to your account.';
  } else if (!isValidEmail(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  return errors;
}

export function validateOtpPhone(phone: string): ValidationErrors {
  const errors: ValidationErrors = {};
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (!cleaned) {
    errors.email = 'Please enter your 10-digit mobile number.';
  } else if (cleaned.length < 10) {
    errors.email = 'Please enter a valid 10-digit mobile number.';
  }
  return errors;
}

export function validateOtpCode(code: string): ValidationErrors {
  const errors: ValidationErrors = {};
  const trimmed = code.trim();
  if (!trimmed) {
    errors.password = 'Please enter the 4-digit verification code.';
  } else if (trimmed.length < 4) {
    errors.password = 'Verification code must be 4 digits.';
  }
  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
