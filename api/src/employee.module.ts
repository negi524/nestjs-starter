import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmployeeV1Controller } from './presentation/controller/employee.v1.controller';
import { EmployeeUseCase } from './application/usecase/employee.usecase';
import { EmployeeRepository } from './domain/repository/employee.repository';
import { EmployeeRepositoryImpl } from './infrastructure/repository/employee.repositoryimpl';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeV1Controller],
  providers: [
    EmployeeUseCase,
    EmployeeV1Controller,
    {
      provide: EmployeeRepository,
      useClass: EmployeeRepositoryImpl,
    },
  ],
})
export class EmployeeModule {}
