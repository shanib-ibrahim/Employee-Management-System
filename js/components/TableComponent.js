export default class TableComponent {
  constructor(container) {
    this.container = container;
  }

  render(employees) {
    this.container.innerHTML = `
        <table>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Dept</th>
            <th>Action</th>
          </tr>
          ${
            employees && employees.length > 0
              ? employees
                  .map(
                    (e) => `
                    <tr>
                      <td>${e.name}</td>
                      <td>${e.role}</td>
                      <td>${e.department}</td>
                      <td>
                        <button data-id="${e.id}" class="deleteBtn">Delete</button>
                      </td>
                    </tr>
                  `
                  )
                  .join("")
              : `<tr>
                   <td colspan="4" style="text-align:center; padding:15px;">No data available</td>
                 </tr>`
          }
        </table>
      `;
  }
}
