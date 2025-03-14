import { ApiProperty } from '@nestjs/swagger';

/**
 * 従業員のCSVエクスポート用オブジェクト
 */
export class EmployeeCsvDto {
  @ApiProperty({
    description: 'ID',
    example: '1',
  })
  id: number;
  @ApiProperty({
    description: 'ユーザー名',
    example: 'user1',
  })
  name: string;
}
