export interface AccountNameError {
  type: 'AccountNameError';
  message: string;
}

export function AccountNameError(message: string): AccountNameError {
  return { type: 'AccountNameError', message };
}
