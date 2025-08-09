import { PrismaService } from 'src/prisma/prisma.service';
import { Employee } from '../domain/model/employee';
import { EmployeeRepository } from '../domain/repository/employee.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeRepositoryImpl implements EmployeeRepository {
  constructor(private prismaService: PrismaService) {}

  async fetchAllEmployees(): Promise<Employee[]> {
    const employees = await this.prismaService.employeeEntity.findMany();
    return employees.map((item) => {
      return Employee.from(item.id, item.name, item.createdAt, item.updatedAt);
    });
  }

  async searchEmployees(name: string): Promise<Employee[]> {
    return this.prismaService.employeeEntity.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }
}
