import { describe, it, expect } from 'vitest';
import { AccountName } from '../../../../src/domain/model/account/account-name';

describe('AccountName', () => {
  describe('from', () => {
    it('有効なアカウント名でAccountNameインスタンスが生成される', () => {
      const result = AccountName.from('testuser');
      expect(result.isOk()).toBe(true);
      expect(result._unsafeUnwrap().value).toBe('testuser');
    });

    it('null値でAccountNameErrorが返る', () => {
      const result = AccountName.from(null as any);
      expect(result.isErr()).toBe(true);
      const error = result._unsafeUnwrapErr();
      expect(error.type).toBe('AccountNameError');
      expect(error.message).toBe('ユーザー名が必要です');
    });

    it('空文字でAccountNameErrorが返る', () => {
      const result = AccountName.from('');
      expect(result.isErr()).toBe(true);
      const error = result._unsafeUnwrapErr();
      expect(error.type).toBe('AccountNameError');
      expect(error.message).toBe('ユーザー名が必要です');
    });

    it('空白のみでAccountNameErrorが返る', () => {
      const result = AccountName.from('   ');
      expect(result.isErr()).toBe(true);
      const error = result._unsafeUnwrapErr();
      expect(error.type).toBe('AccountNameError');
      expect(error.message).toBe('ユーザー名が必要です');
    });
  });
});
