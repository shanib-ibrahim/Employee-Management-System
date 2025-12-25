import DataService from "./services/DataService.js";
import Table from "./components/Table.js";
import Search from "./components/Search.js";
import Pagination from "./components/Pagination.js";
import AddEmployee from "./components/AddEmployee.js";
import DeleteEmployee from "./components/DeleteEmployee.js";
import DepartmentFilter from "./components/DepartmentFilter.js";
import { exportCSV, exportJSON } from "./utils/helpers.js";

const service = new DataService();
const table = new Table(document.getElementById("tableContainer"));
const pagination = new Pagination(5, "pagination");

let allEmployees = [];

async function init() {
  allEmployees = await service.loadEmployees();

  pagination.setData(allEmployees, render);

  const departments = [...new Set(allEmployees.map((e) => e.department))];

  new DepartmentFilter(
    document.getElementById("deptDropdown"),
    document.getElementById("filterTags"),
    document.getElementById("clearFilterBtn"),
    departments,
    (selected) => {
      let filtered = allEmployees;

      if (selected.length > 0) {
        filtered = filtered.filter((e) => selected.includes(e.department));
      }

      const searchText = document.getElementById("searchInput").value.trim();
      if (searchText) {
        filtered = filtered.filter(
          (e) =>
            e.name.toLowerCase().includes(searchText.toLowerCase()) ||
            e.role.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      pagination.setData(filtered, render);
      render(filtered);
    }
  );

  render(allEmployees);
}

function render(data) {
  table.render(pagination.paginate(data));
}

new Search(document.getElementById("searchInput"), (text) =>
  render(service.collection.filterByText(text))
);

const addEmployee = new AddEmployee((employee) => {
  service.collection.add(employee);
  render(service.collection.employees);
});
addEmployee.render();

const deleteEmployee = new DeleteEmployee((id) => {
  service.collection.remove(id);
  render(service.collection.employees);
});
deleteEmployee.render();

document.getElementById("addEmployeeBtn").onclick = () => {
  addEmployee.show();
};

document.getElementById("exportCSV").onclick = () =>
  exportCSV(service.collection.employees);
document.getElementById("exportJSON").onclick = () =>
  exportJSON(service.collection.employees);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const id = +e.target.dataset.id;
    deleteEmployee.show(id);
  }
});

init();
