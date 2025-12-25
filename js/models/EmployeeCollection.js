export default class EmployeeCollection {
  constructor() {
    this.employees = [];
  }

  setEmployees(list) {
    this.employees = list;
  }

  add(employee) {
    this.employees.push(employee);
  }

  remove(id) {
    this.employees = this.employees.filter((e) => e.id !== id);
  }

  filterByText(text) {
    if (!text) return this.employees;
    const lowerText = text.toLowerCase();
    return this.employees.filter(
      (e) =>
        e.name.toLowerCase().includes(lowerText) ||
        e.role.toLowerCase().includes(lowerText) ||
        e.department.toLowerCase().includes(lowerText)
    );
  }
}
