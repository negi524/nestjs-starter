import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmployeeController } from './presentation/employee.controller';
import { EmployeeService } from './application/employee.service';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeController],
})
export class EmployeeModule {}
