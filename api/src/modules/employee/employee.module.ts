import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmployeeController } from './presentation/employee.controller';
import { EmployeeUseCase } from './application/usecase/employee.usecase';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeController],
  providers: [EmployeeUseCase, EmployeeController],
})
export class EmployeeModule {}
