import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountRequestV1Dto {
  @ApiProperty({
    description: 'ユーザー名',
    example: 'user1',
  })
  name: string;
  @ApiProperty({
    description: 'パスワード',
    example: 'Passw0rd!',
  })
  password: string;
}
