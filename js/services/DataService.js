import Employee from "../models/Employee.js";
import EmployeeCollection from "../models/EmployeeCollection.js";
import EmployeeAPI from "../api/EmployeeAPI.js";

export default class DataService {
  constructor() {
    this.collection = new EmployeeCollection();
  }

  async loadEmployees() {
    const data = await EmployeeAPI.fetchEmployees();
    console.log("Fetched Employees:", data);
    const employees = data.map(
      (employee) =>
        new Employee({
          id: employee.id,
          name: `${employee.name}`,
          role: employee?.role || "Staff",
          department: employee?.department || "General",
        })
    );
    this.collection.setEmployees(employees);
    return employees;
  }
}
