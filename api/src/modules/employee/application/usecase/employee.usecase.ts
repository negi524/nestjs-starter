import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeCsvV1Dto } from '../../presentation/dto/response/employee-csv.v1.dto';
import { EmployeeRepository } from '../../domain/repository/employee.repository';
import { EmployeeProfileV1Dto } from '../../presentation/dto/response/employee-profile.v1.dto';

/**
 * 従業員の操作
 */
@Injectable()
export class EmployeeUseCase {
  constructor(
    private prisma: PrismaService,
    private employeeRepository: EmployeeRepository,
  ) {}

  /**
   * 全ての従業員をCSV用のフォーマットで取得する
   * @returns 従業員一覧
   */
  async fetchAllEmployeeCsv(): Promise<EmployeeCsvV1Dto[]> {
    const employees = await this.employeeRepository.fetchAllEmployees();
    return employees.map((item) => EmployeeCsvV1Dto.from(item));
  }

  /**
   * 従業員を検索する
   * @param name 従業員名
   * @returns 従業員一覧
   */
  async searchEmployee(name?: string): Promise<EmployeeProfileV1Dto[]> {
    if (name === undefined) {
      return (await this.employeeRepository.fetchAllEmployees()).map((item) =>
        EmployeeProfileV1Dto.from(item),
      );
    }

    return (await this.employeeRepository.searchEmployees(name)).map((item) =>
      EmployeeProfileV1Dto.from(item),
    );
  }
}
