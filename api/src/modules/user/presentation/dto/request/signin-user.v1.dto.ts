import { ApiProperty } from '@nestjs/swagger';

/**
 * サインイン用のリクエストオブジェクト
 */
export class SigninUserV1Dto {
  @ApiProperty({
    description: 'ユーザー名',
    example: 'user1',
  })
  name: string;
  @ApiProperty({
    description: 'パスワード',
    example: 'password',
  })
  password: string;
}
