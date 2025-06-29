import {
  Controller,
  Get,
  Header,
  HttpStatus,
  Query,
  StreamableFile,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiResponse,
} from '@nestjs/swagger';
import EmployeeRequestDto from './dto/request/employeeRequestDto';
import { Employee } from '@prisma/client';
import * as csv from '@fast-csv/format';
import { EmployeeService } from '../application/employee.service';
import { EmployeeCsvDto } from './dto/response/employeeCsvDto';

/**
 * 従業員用のコントローラー
 */
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @ApiOperation({ summary: 'Employee情報を取得する' })
  @ApiResponse({ status: HttpStatus.OK, description: 'success' })
  getEmployee(@Query() param: EmployeeRequestDto): Promise<Employee[]> {
    return this.employeeService.searchEmployee(param.name);
  }

  @Get('download')
  @ApiProduces('text/csv; charset=utf-8')
  @ApiOperation({ summary: 'Employee一覧をCSVでダウンロードする' })
  @Header('Cache-Control', 'no-store')
  @ApiOkResponse({
    description: 'success',
    type: EmployeeCsvDto,
    example: 'id,name\n1,佐藤 東子\n2,渡辺 里奈',
  })
  async downloadEmployee(): Promise<StreamableFile> {
    const employees = await this.employeeService.fetchAllEmployeeCsv();
    const csvBuffer = await csv.writeToBuffer(employees, { headers: true });
    return new StreamableFile(csvBuffer, {
      type: 'text/csv',
      disposition: 'attachment; filename="employees.csv"',
    });
  }
}
