import { describe, it, expect } from 'vitest';
import { Password } from '../../../../../src/modules/account/domain/model/password';

describe('Password', () => {
  describe('generate', () => {
    it('有効なパスワードでPasswordインスタンスが生成される', () => {
      const plainPassword1 = 'Password123!';
      const password1 = Password.generate(plainPassword1);
      expect(password1.hash).toBeDefined();
      expect(password1.salt).toBeDefined();
      expect(password1.hash).not.toBe(plainPassword1); // ハッシュ化されている

      const plainPassword2 = 'MySecure$Pass1';
      const password2 = Password.generate(plainPassword2);
      expect(password2.hash).toBeDefined();
      expect(password2.salt).toBeDefined();
      expect(password2.hash).not.toBe(plainPassword2); // ハッシュ化されている

      const plainPassword3 = 'Test@123ABC';
      const password3 = Password.generate(plainPassword3);
      expect(password3.hash).toBeDefined();
      expect(password3.salt).toBeDefined();
      expect(password3.hash).not.toBe(plainPassword3); // ハッシュ化されている

      const plainPassword4 = 'Complex#9Pwd';
      const password4 = Password.generate(plainPassword4);
      expect(password4.hash).toBeDefined();
      expect(password4.salt).toBeDefined();
      expect(password4.hash).not.toBe(plainPassword4); // ハッシュ化されている
    });

    it('null値でErrorが発生する', () => {
      expect(() => Password.generate(null as any)).toThrow(
        'パスワードが必要です',
      );
    });

    it('空文字でErrorが発生する', () => {
      expect(() => Password.generate('')).toThrow('パスワードが必要です');
      expect(() => Password.generate('   ')).toThrow('パスワードが必要です');
    });

    it('8文字未満でErrorが発生する', () => {
      expect(() => Password.generate('Short1!')).toThrow(
        'パスワードは8文字以上で、英字・数字・特殊文字を含む必要があります',
      );
    });

    it('小文字がない場合でErrorが発生する', () => {
      expect(() => Password.generate('PASSWORD123!')).toThrow(
        'パスワードは8文字以上で、英字・数字・特殊文字を含む必要があります',
      );
    });

    it('大文字がない場合でErrorが発生する', () => {
      expect(() => Password.generate('password123!')).toThrow(
        'パスワードは8文字以上で、英字・数字・特殊文字を含む必要があります',
      );
    });

    it('数字がない場合でErrorが発生する', () => {
      expect(() => Password.generate('Password!')).toThrow(
        'パスワードは8文字以上で、英字・数字・特殊文字を含む必要があります',
      );
    });

    it('特殊文字がない場合でErrorが発生する', () => {
      expect(() => Password.generate('Password123')).toThrow(
        'パスワードは8文字以上で、英字・数字・特殊文字を含む必要があります',
      );
    });
  });

  describe('verify', () => {
    it('正しいパスワードでverifyがtrueを返す', () => {
      const plainPassword = 'TestPassword123!';
      const password = Password.generate(plainPassword);

      expect(password.verify(plainPassword)).toBe(true);
    });

    it('間違ったパスワードでverifyがfalseを返す', () => {
      const plainPassword = 'TestPassword123!';
      const wrongPassword = 'WrongPassword456@';
      const password = Password.generate(plainPassword);

      expect(password.verify(wrongPassword)).toBe(false);
    });

    it('大文字小文字が異なる場合でverifyがfalseを返す', () => {
      const plainPassword = 'TestPassword123!';
      const differentCase = 'testpassword123!';
      const password = Password.generate(plainPassword);

      expect(password.verify(differentCase)).toBe(false);
    });
  });

  describe('ハッシュ化', () => {
    it('同じパスワードでも異なるソルトとハッシュが生成される', () => {
      const plainPassword = 'TestPassword123!';
      const password1 = Password.generate(plainPassword);
      const password2 = Password.generate(plainPassword);

      expect(password1.salt).not.toBe(password2.salt);
      expect(password1.hash).not.toBe(password2.hash);
    });

    it('平文パスワードがハッシュ化されて保存される', () => {
      const plainPassword = 'TestPassword123!';
      const password = Password.generate(plainPassword);

      expect(password.hash).not.toBe(plainPassword);
      expect(password.hash.length).toBeGreaterThan(plainPassword.length);
    });
  });
});
