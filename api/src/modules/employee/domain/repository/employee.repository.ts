import { Employee } from '../model/employee';

export abstract class EmployeeRepository {
  /**
   * 全ての従業員を取得する
   */
  abstract fetchAllEmployees(): Promise<Employee[]>;
  /**
   * 従業員を検索する
   */
  abstract searchEmployees(name: string): Promise<Employee[]>;
}
