import { Employee } from '../model/employee';

export abstract class EmployeeRepository {
  abstract fetchAllEmployees(): Promise<Employee[]>;
}
