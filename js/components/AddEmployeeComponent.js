export default class AddEmployeeComponent {
  constructor(onSave) {
    this.onSave = onSave;
    this.modal = null;
  }

  render() {
    this.modal = document.createElement("div");
    this.modal.className = "modal";
    this.modal.style.display = "none";

    this.modal.innerHTML = `
        <div class="modal-content">
          <h3>Add Employee</h3>
  
          <label>
            Name
            <input type="text" id="empName" />
            <small class="error" id="nameError"></small>
          </label>
  
          <label>
            Role
            <input type="text" id="empRole" />
            <small class="error" id="roleError"></small>
          </label>
  
          <label>
            Department
            <input type="text" id="empDept" />
            <small class="error" id="deptError"></small>
          </label>
  
          <div style="text-align:right; margin-top:10px;">
            <button id="saveEmployee">Save</button>
            <button id="closeModal" style="background:#6b7280;">Cancel</button>
          </div>
        </div>
      `;

    document.body.appendChild(this.modal);
    this.bindEvents();
  }

  bindEvents() {
    this.modal.querySelector("#closeModal").onclick = () => this.hide();

    this.modal.onclick = (e) => {
      if (e.target === this.modal) {
        this.hide();
      }
    };

    this.modal.querySelector("#saveEmployee").onclick = () => {
      const nameInput = this.modal.querySelector("#empName");
      const roleInput = this.modal.querySelector("#empRole");
      const deptInput = this.modal.querySelector("#empDept");

      const name = nameInput.value.trim();
      const role = roleInput.value.trim();
      const dept = deptInput.value.trim();

      this.clearErrors();

      let isValid = true;

      if (!name) {
        this.showError("nameError", "Name is required");
        isValid = false;
      }

      if (!role) {
        this.showError("roleError", "Role is required");
        isValid = false;
      }

      if (!dept) {
        this.showError("deptError", "Department is required");
        isValid = false;
      }

      if (!isValid) return;

      this.onSave({
        id: Date.now(),
        name,
        role,
        department: dept,
      });

      this.clear();
      this.hide();
    };
  }

  showError(id, message) {
    const el = this.modal.querySelector(`#${id}`);
    el.textContent = message;
  }

  clearErrors() {
    this.modal.querySelectorAll(".error").forEach((e) => (e.textContent = ""));
  }

  show() {
    this.modal.style.display = "flex";
  }

  hide() {
    this.modal.style.display = "none";
  }

  clear() {
    this.modal.querySelector("#empName").value = "";
    this.modal.querySelector("#empRole").value = "";
    this.modal.querySelector("#empDept").value = "";
    this.clearErrors();
  }
}
