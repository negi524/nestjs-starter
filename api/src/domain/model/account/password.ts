import * as bcrypt from 'bcryptjs';
import { errAsync, ResultAsync } from 'neverthrow';
import { PasswordPolicyViolationError } from '../../error/password-policy-violation-error';

/**
 * ハッシュ化済みパスワード
 */
export interface HashedPassword {
  readonly hashedValue: string;
  readonly salt: string;
}

export type { PasswordPolicyViolationError };

/**
 * DBから取得したハッシュとソルトからHashedPasswordを復元する
 */
export function restoreHashedPassword(
  hash: string,
  salt: string,
): HashedPassword {
  return { hashedValue: hash, salt };
}

/**
 * プレーンパスワードをバリデーション・ハッシュ化してHashedPasswordを生成する
 */
export function hashPassword(
  plainPassword: string,
): ResultAsync<HashedPassword, PasswordPolicyViolationError> {
  if (!isValidPassword(plainPassword)) {
    return errAsync(
      PasswordPolicyViolationError(
        'パスワードは8文字以上で、英字・数字・特殊文字を含む必要があります',
      ),
    );
  }
  return ResultAsync.fromSafePromise(
    bcrypt.genSalt(12).then(async (salt) => {
      const hashedValue = await bcrypt.hash(plainPassword, salt);
      return { hashedValue, salt } as HashedPassword;
    }),
  );
}

/**
 * プレーンパスワードとハッシュ化パスワードを照合する
 * @arguments plainPassword プレーンパスワード
 * @arguments hashedPassword ハッシュ化されたパスワード
 * @returns 照合結果（true: 一致, false: 不一致）
 */
export function verifyPassword(
  plainPassword: string,
  hashedPassword: HashedPassword,
): boolean {
  return bcrypt.compareSync(plainPassword, hashedPassword.hashedValue);
}

const SPECIAL_CHARS_PATTERN = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

function isValidPassword(password: string): boolean {
  if (!password || password.length < 8) return false;
  if (!/[A-Za-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  return SPECIAL_CHARS_PATTERN.test(password);
}
