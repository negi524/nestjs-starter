import { ApiProperty } from '@nestjs/swagger';

/**
 * 従業員のCSVエクスポート用オブジェクト
 */
export class EmployeeCsvV1Dto {
  @ApiProperty({
    description: 'ID',
    example: '01K24SZV7B6QTJB9RQ9J8D8HXH',
  })
  id: string;
  @ApiProperty({
    description: 'ユーザー名',
    example: 'user1',
  })
  name: string;
}
