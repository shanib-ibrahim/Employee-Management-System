export default class TableComponent {
  constructor(container) {
    this.container = container;
  }

  render(employees) {
    this.container.innerHTML = `
        <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Dept</th>
            <th>Action</th>
          </tr>
          </thead>
          ${
            employees && employees.length > 0
              ? employees
                  .map(
                    (e) => `
                    <tr>
                      <td data-label="Name">${e.name}</td>
                      <td data-label="Role">${e.role}</td>
                      <td data-label="Department">${e.department}</td>
                      <td data-label="Action">
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
