export default class DeleteEmployeeComponent {
  constructor(onDelete) {
    this.onDelete = onDelete;
    this.modal = null;
    this.employeeId = null;
  }

  render() {
    this.modal = document.createElement("div");
    this.modal.className = "modal";
    this.modal.style.display = "none";

    this.modal.innerHTML = `
        <div class="modal-content">
          <h3>Confirm Delete</h3>
          <p>Are you sure you want to delete this employee?</p>
          <div style="text-align:right; margin-top:10px;">
            <button id="confirmDelete" style="background:#dc2626;">Yes</button>
            <button id="cancelDelete" style="background:#6b7280;">No</button>
          </div>
        </div>
      `;

    document.body.appendChild(this.modal);
    this.bindEvents();
  }

  bindEvents() {
    this.modal.querySelector("#cancelDelete").onclick = () => this.hide();

    this.modal.onclick = (e) => {
      if (e.target === this.modal) {
        this.hide();
      }
    };

    this.modal.querySelector("#confirmDelete").onclick = () => {
      if (this.employeeId !== null) {
        this.onDelete(this.employeeId);
        this.hide();
      }
    };
  }

  show(id) {
    this.employeeId = id;
    this.modal.style.display = "flex";
  }

  hide() {
    this.modal.style.display = "none";
    this.employeeId = null;
  }
}
