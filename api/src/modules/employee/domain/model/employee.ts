/**
 * 従業員
 */
export class Employee {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static from(
    id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
  ): Employee {
    return new Employee(id, name, createdAt, updatedAt);
  }
}
