import { Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeCsvDto } from './employeeCsvDto';

/**
 * 従業員の操作
 */
@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  /**
   * 全ての従業員をCSV用のフォーマットで取得する
   * @returns 従業員一覧
   */
  async fetchAllEmployeeCsv(): Promise<EmployeeCsvDto[]> {
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
