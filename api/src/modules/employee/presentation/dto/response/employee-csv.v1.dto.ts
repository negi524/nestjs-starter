import { ApiProperty } from '@nestjs/swagger';
import { Employee } from 'src/modules/employee/domain/model/employee';

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

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public static from(employee: Employee): EmployeeCsvV1Dto {
    return new EmployeeCsvV1Dto(employee.id, employee.name);
  }
}
