/**
 * 従業員
 */
export class Employee {
  private constructor(
    private readonly id: string,
    private readonly name: string,
  ) {}

  public from(id: string, name: string): Employee {
    return new Employee(id, name);
  }
}
