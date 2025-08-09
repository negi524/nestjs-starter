import { ApiProperty } from '@nestjs/swagger';

/**
 * 従業員一覧リクエスト時のリクエストパラメータ
 */
export class EmployeeRequestV1Dto {
  @ApiProperty({
    description: '従業員名',
    example: '山田',
    required: false,
  })
  name?: string;
}
