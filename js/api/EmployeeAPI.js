export default class EmployeeAPI {
  static async fetchEmployees() {
    const res = await fetch("../api-data/employees.json");
    return await res.json();
  }
}
