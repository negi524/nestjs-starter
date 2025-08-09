import { ApiProperty } from '@nestjs/swagger';

export class CreateUserV1Dto {
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
