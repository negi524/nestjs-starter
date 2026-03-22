import { describe, it, expect } from 'vitest';
import { Password } from '../../../../../src/modules/account/domain/model/password';

describe('Password', () => {
  describe('generate', () => {
    it('有効なパスワードでPasswordインスタンスが生成される', () => {
      const plainPassword1 = 'Password123!';
      const result1 = Password.generate(plainPassword1);
      expect(result1.isOk()).toBe(true);
      const password1 = result1._unsafeUnwrap();
      expect(password1.hash).toBeDefined();
      expect(password1.salt).toBeDefined();
      expect(password1.hash).not.toBe(plainPassword1); // ハッシュ化されている

      const plainPassword2 = 'MySecure$Pass1';
      const result2 = Password.generate(plainPassword2);
      expect(result2.isOk()).toBe(true);
      const password2 = result2._unsafeUnwrap();
      expect(password2.hash).toBeDefined();
      expect(password2.salt).toBeDefined();
      expect(password2.hash).not.toBe(plainPassword2); // ハッシュ化されている

      const plainPassword3 = 'Test@123ABC';
      const result3 = Password.generate(plainPassword3);
      expect(result3.isOk()).toBe(true);
      const password3 = result3._unsafeUnwrap();
      expect(password3.hash).toBeDefined();
      expect(password3.salt).toBeDefined();
      expect(password3.hash).not.toBe(plainPassword3); // ハッシュ化されている

      const plainPassword4 = 'Complex#9Pwd';
      const result4 = Password.generate(plainPassword4);
      expect(result4.isOk()).toBe(true);
      const password4 = result4._unsafeUnwrap();
      expect(password4.hash).toBeDefined();
      expect(password4.salt).toBeDefined();
      expect(password4.hash).not.toBe(plainPassword4); // ハッシュ化されている
    });

    it('null値でErrorが発生する', () => {
      const result = Password.generate(null as any);
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr().type).toBe('EMPTY_PASSWORD');
    });

    it('空文字でErrorが発生する', () => {
      const result1 = Password.generate('');
      expect(result1.isErr()).toBe(true);
      expect(result1._unsafeUnwrapErr().type).toBe('EMPTY_PASSWORD');

      const result2 = Password.generate('   ');
      expect(result2.isErr()).toBe(true);
      expect(result2._unsafeUnwrapErr().type).toBe('EMPTY_PASSWORD');
    });

    it('8文字未満でErrorが発生する', () => {
      const result = Password.generate('Short1!');
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr().type).toBe('INVALID_PASSWORD');
    });

    it('小文字がない場合でErrorが発生する', () => {
      const result = Password.generate('PASSWORD123!');
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr().type).toBe('INVALID_PASSWORD');
    });

    it('大文字がない場合でErrorが発生する', () => {
      const result = Password.generate('password123!');
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr().type).toBe('INVALID_PASSWORD');
    });

    it('数字がない場合でErrorが発生する', () => {
      const result = Password.generate('Password!');
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr().type).toBe('INVALID_PASSWORD');
    });

    it('特殊文字がない場合でErrorが発生する', () => {
      const result = Password.generate('Password123');
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr().type).toBe('INVALID_PASSWORD');
    });
  });

  describe('verify', () => {
    it('正しいパスワードでverifyがtrueを返す', () => {
      const plainPassword = 'TestPassword123!';
      const result = Password.generate(plainPassword);
      expect(result.isOk()).toBe(true);
      const password = result._unsafeUnwrap();

      expect(password.verify(plainPassword)).toBe(true);
    });

    it('間違ったパスワードでverifyがfalseを返す', () => {
      const plainPassword = 'TestPassword123!';
      const wrongPassword = 'WrongPassword456@';
      const result = Password.generate(plainPassword);
      expect(result.isOk()).toBe(true);
      const password = result._unsafeUnwrap();

      expect(password.verify(wrongPassword)).toBe(false);
    });

    it('大文字小文字が異なる場合でverifyがfalseを返す', () => {
      const plainPassword = 'TestPassword123!';
      const differentCase = 'testpassword123!';
      const result = Password.generate(plainPassword);
      expect(result.isOk()).toBe(true);
      const password = result._unsafeUnwrap();

      expect(password.verify(differentCase)).toBe(false);
    });
  });

  describe('ハッシュ化', () => {
    it('同じパスワードでも異なるソルトとハッシュが生成される', () => {
      const plainPassword = 'TestPassword123!';
      const result1 = Password.generate(plainPassword);
      const result2 = Password.generate(plainPassword);
      expect(result1.isOk()).toBe(true);
      expect(result2.isOk()).toBe(true);
      const password1 = result1._unsafeUnwrap();
      const password2 = result2._unsafeUnwrap();

      expect(password1.salt).not.toBe(password2.salt);
      expect(password1.hash).not.toBe(password2.hash);
    });

    it('平文パスワードがハッシュ化されて保存される', () => {
      const plainPassword = 'TestPassword123!';
      const result = Password.generate(plainPassword);
      expect(result.isOk()).toBe(true);
      const password = result._unsafeUnwrap();

      expect(password.hash).not.toBe(plainPassword);
      expect(password.hash.length).toBeGreaterThan(plainPassword.length);
    });
  });
});
