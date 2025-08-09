import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employee } from 'generated/prisma';
import { EmployeeCsvV1Dto } from '../../presentation/dto/response/employee-csv.v1.dto';

/**
 * 従業員の操作
 */
@Injectable()
export class EmployeeUseCase {
  constructor(private prisma: PrismaService) {}

  /**
   * 全ての従業員をCSV用のフォーマットで取得する
   * @returns 従業員一覧
   */
  async fetchAllEmployeeCsv(): Promise<EmployeeCsvV1Dto[]> {
    const employees = await this.prisma.employee.findMany();
    return employees.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
  }

  /**
   * 従業員を検索する
   * @param name 従業員名
   * @returns 従業員一覧
   */
  async searchEmployee(name?: string): Promise<Employee[]> {
    if (name === undefined) {
      return this.prisma.employee.findMany();
    }
    return this.prisma.employee.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }
}
