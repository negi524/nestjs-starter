import { ApiProperty } from '@nestjs/swagger';
import User from '../../../domain/model/user';

export default class UserResponseDto {
  @ApiProperty({
    description: 'ユーザーID',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'ユーザー名',
    example: 'user1',
  })
  name: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
  }
}
