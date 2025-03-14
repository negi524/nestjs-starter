import { ApiProperty } from '@nestjs/swagger';

/**
 * サインイン用のリクエストオブジェクト
 */
export default class SigninUserDto {
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
