import { describe, it, expect } from 'vitest';
import {
  hashPassword,
  restoreHashedPassword,
  verifyPassword,
} from '../../../../src/domain/model/account/password';

describe('hashPassword', () => {
  it('有効なパスワードでHashedPasswordが生成される', async () => {
    const result1 = await hashPassword('Password123!');
    expect(result1.isOk()).toBe(true);
    const password1 = result1._unsafeUnwrap();
    expect(password1.hashedValue).toBeDefined();
    expect(password1.salt).toBeDefined();
    expect(password1.hashedValue).not.toBe('Password123!');

    const result2 = await hashPassword('MySecure$Pass1');
    expect(result2.isOk()).toBe(true);
    const password2 = result2._unsafeUnwrap();
    expect(password2.hashedValue).toBeDefined();
    expect(password2.salt).toBeDefined();

    const result3 = await hashPassword('Test@123ABC');
    expect(result3.isOk()).toBe(true);
    const password3 = result3._unsafeUnwrap();
    expect(password3.hashedValue).toBeDefined();
    expect(password3.salt).toBeDefined();

    const result4 = await hashPassword('Complex#9Pwd');
    expect(result4.isOk()).toBe(true);
    const password4 = result4._unsafeUnwrap();
    expect(password4.hashedValue).toBeDefined();
    expect(password4.salt).toBeDefined();
  });

  it('null値でPasswordPolicyViolationErrorが返る', async () => {
    const result = await hashPassword(null as any);
    expect(result.isErr()).toBe(true);
    const error = result._unsafeUnwrapErr();
    expect(error.type).toBe('PasswordPolicyViolationError');
    expect(error.message).toBe(
      'パスワードは8文字以上で、英字・数字・特殊文字を含む必要があります',
    );
  });

  it('空文字でPasswordPolicyViolationErrorが返る', async () => {
    const result1 = await hashPassword('');
    expect(result1.isErr()).toBe(true);
    expect(result1._unsafeUnwrapErr().type).toBe(
      'PasswordPolicyViolationError',
    );

    const result2 = await hashPassword('   ');
    expect(result2.isErr()).toBe(true);
    expect(result2._unsafeUnwrapErr().type).toBe(
      'PasswordPolicyViolationError',
    );
  });

  it('8文字未満でPasswordPolicyViolationErrorが返る', async () => {
    const result = await hashPassword('Short1!');
    expect(result.isErr()).toBe(true);
    const error = result._unsafeUnwrapErr();
    expect(error.type).toBe('PasswordPolicyViolationError');
    expect(error.message).toBe(
      'パスワードは8文字以上で、英字・数字・特殊文字を含む必要があります',
    );
  });

  it('英字がない場合でPasswordPolicyViolationErrorが返る', async () => {
    const result = await hashPassword('12345678!');
    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr().type).toBe('PasswordPolicyViolationError');
  });

  it('数字がない場合でPasswordPolicyViolationErrorが返る', async () => {
    const result = await hashPassword('Password!');
    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr().type).toBe('PasswordPolicyViolationError');
  });

  it('特殊文字がない場合でPasswordPolicyViolationErrorが返る', async () => {
    const result = await hashPassword('Password123');
    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr().type).toBe('PasswordPolicyViolationError');
  });
});

describe('verifyPassword', () => {
  it('正しいパスワードでtrueを返す', async () => {
    const plainPassword = 'TestPassword123!';
    const password = (await hashPassword(plainPassword))._unsafeUnwrap();

    expect(verifyPassword(plainPassword, password)).toBe(true);
  });

  it('間違ったパスワードでfalseを返す', async () => {
    const plainPassword = 'TestPassword123!';
    const wrongPassword = 'WrongPassword456@';
    const password = (await hashPassword(plainPassword))._unsafeUnwrap();

    expect(verifyPassword(wrongPassword, password)).toBe(false);
  });

  it('大文字小文字が異なる場合でfalseを返す', async () => {
    const plainPassword = 'TestPassword123!';
    const differentCase = 'testpassword123!';
    const password = (await hashPassword(plainPassword))._unsafeUnwrap();

    expect(verifyPassword(differentCase, password)).toBe(false);
  });
});

describe('restoreHashedPassword / ハッシュ化', () => {
  it('同じパスワードでも異なるソルトとハッシュが生成される', async () => {
    const plainPassword = 'TestPassword123!';
    const password1 = (await hashPassword(plainPassword))._unsafeUnwrap();
    const password2 = (await hashPassword(plainPassword))._unsafeUnwrap();

    expect(password1.salt).not.toBe(password2.salt);
    expect(password1.hashedValue).not.toBe(password2.hashedValue);
  });

  it('平文パスワードがハッシュ化されて保存される', async () => {
    const plainPassword = 'TestPassword123!';
    const password = (await hashPassword(plainPassword))._unsafeUnwrap();

    expect(password.hashedValue).not.toBe(plainPassword);
    expect(password.hashedValue.length).toBeGreaterThan(plainPassword.length);
  });

  it('restoreHashedPasswordでHashedPasswordが復元される', () => {
    const hash = '$2b$12$examplehash';
    const salt = '$2b$12$examplesalt';
    const restored = restoreHashedPassword(hash, salt);

    expect(restored.hashedValue).toBe(hash);
    expect(restored.salt).toBe(salt);
  });
});
