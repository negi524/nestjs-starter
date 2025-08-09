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
  ApiTags,
} from '@nestjs/swagger';
import { EmployeeRequestV1Dto } from './dto/request/employee-request.v1.dto';
import * as csv from '@fast-csv/format';
import { EmployeeCsvV1Dto } from './dto/response/employee-csv.v1.dto';
import { EmployeeUseCase } from '../application/usecase/employee.usecase';
import { EmployeeProfileV1Dto } from './dto/response/employee-profile.v1.dto';

/**
 * 従業員用のコントローラー
 */
@ApiTags('Employee')
@Controller('v1/employee')
export class EmployeeV1Controller {
  constructor(private readonly employeeUseCase: EmployeeUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Employee情報を取得する' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    type: EmployeeProfileV1Dto,
  })
  getEmployee(
    @Query() param: EmployeeRequestV1Dto,
  ): Promise<EmployeeProfileV1Dto[]> {
    return this.employeeUseCase.searchEmployee(param.name);
  }

  @Get('download')
  @ApiProduces('text/csv; charset=utf-8')
  @ApiOperation({ summary: 'Employee一覧をCSVでダウンロードする' })
  @Header('Cache-Control', 'no-store')
  @ApiOkResponse({
    description: 'success',
    type: EmployeeCsvV1Dto,
    example: 'id,name\n1,佐藤 東子\n2,渡辺 里奈',
  })
  async downloadEmployee(): Promise<StreamableFile> {
    const employees = await this.employeeUseCase.fetchAllEmployeeCsv();
    const csvBuffer = await csv.writeToBuffer(employees, { headers: true });
    return new StreamableFile(csvBuffer, {
      type: 'text/csv',
      disposition: 'attachment; filename="employees.csv"',
    });
  }
}
