import DataService from "./services/DataService.js";
import TableComponent from "./components/TableComponent.js";
import SearchComponent from "./components/SearchComponent.js";
import PaginationComponent from "./components/PaginationComponent.js";
import AddEmployeeComponent from "./components/AddEmployeeComponent.js";
import DeleteEmployeeComponent from "./components/DeleteEmployeeComponent.js";
import { exportCSV, exportJSON } from "./utils/helpers.js";

const service = new DataService();
const table = new TableComponent(document.getElementById("tableContainer"));
const pagination = new PaginationComponent(5, "pagination");

let allEmployees = [];

async function init() {
  allEmployees = await service.loadEmployees();
  pagination.setData(allEmployees, render);
  render(allEmployees);
}

function render(data) {
  table.render(pagination.paginate(data));
}

new SearchComponent(document.getElementById("searchInput"), (text) =>
  render(service.collection.filterByText(text))
);

const addEmployee = new AddEmployeeComponent((employee) => {
  service.collection.add(employee);
  render(service.collection.employees);
});
addEmployee.render();

const deleteEmployee = new DeleteEmployeeComponent((id) => {
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
