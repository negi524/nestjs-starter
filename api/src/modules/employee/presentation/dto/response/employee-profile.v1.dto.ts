import { ApiProperty } from '@nestjs/swagger';
import { Employee } from 'src/modules/employee/domain/model/employee';

export class EmployeeProfileV1Dto {
  @ApiProperty({
    description: 'ID',
    example: '01K24SZV7B6QTJB9RQ9J8D8HXH',
  })
  id: string;
  @ApiProperty({
    description: 'ユーザー名',
    example: '中島 勝',
  })
  name: string;
  @ApiProperty({
    description: '作成日時',
    example: '2025-08-08T12:20:16.236Z',
  })
  createdAt: Date;
  @ApiProperty({
    description: '更新日時',
    example: '2025-08-08T12:20:16.236Z',
  })
  updatedAt: Date;

  constructor(id: string, name: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static from(employee: Employee): EmployeeProfileV1Dto {
    return new EmployeeProfileV1Dto(
      employee.id,
      employee.name,
      employee.createdAt,
      employee.updatedAt,
    );
  }
}
