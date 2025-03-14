import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
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
