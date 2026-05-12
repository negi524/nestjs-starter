export interface PasswordPolicyViolationError {
  type: 'PasswordPolicyViolationError';
  message: string;
}

export function PasswordPolicyViolationError(
  message: string,
): PasswordPolicyViolationError {
  return { type: 'PasswordPolicyViolationError', message };
}
