export default class DepartmentFilter {
  constructor(dropdownEl, tagsContainer, clearBtn, departments, onFilter) {
    this.dropdownEl = dropdownEl;
    this.tagsContainer = tagsContainer;
    this.clearBtn = clearBtn;
    this.departments = departments;
    this.onFilter = onFilter;
    this.selected = [];

    this.trigger = this.dropdownEl.querySelector(".select-trigger");
    this.optionsContainer = this.dropdownEl.querySelector(".options");

    this.init();
  }

  init() {
    this.optionsContainer.innerHTML = "";
    this.departments.forEach((dept) => {
      const option = document.createElement("div");
      option.textContent = dept;
      option.onclick = () => this.toggleSelection(dept);
      this.optionsContainer.appendChild(option);
    });

    this.trigger.onclick = () => {
      this.dropdownEl.classList.toggle("active");
    };

    document.addEventListener("click", (e) => {
      if (!this.dropdownEl.contains(e.target)) {
        this.dropdownEl.classList.remove("active");
      }
    });

    this.clearBtn.onclick = () => {
      this.selected = [];
      this.renderTags();
      this.onFilter(this.selected);
    };

    this.renderTags();
  }

  toggleSelection(dept) {
    if (this.selected.includes(dept)) {
      this.selected = this.selected.filter((d) => d !== dept);
    } else {
      this.selected.push(dept);
    }
    this.renderTags();
    this.onFilter(this.selected);
  }

  renderTags() {
    this.tagsContainer.innerHTML = "";
    this.selected.forEach((dept) => {
      const tag = document.createElement("div");
      tag.className = "tag";
      tag.innerHTML = `${dept} <span class="remove">&times;</span>`;
      tag.querySelector(".remove").onclick = () => this.toggleSelection(dept);
      this.tagsContainer.appendChild(tag);
    });

    this.trigger.textContent =
      this.selected.length > 0
        ? this.selected.join(", ")
        : "Select Department(s)";
  }
}
