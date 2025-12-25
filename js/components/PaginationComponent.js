export default class PaginationComponent {
  constructor(limit = 10, containerId = "pagination") {
    this.limit = limit;
    this.page = 1;
    this.container = document.getElementById(containerId);
    this.data = [];
    this.onPageChange = null;
  }

  setData(data, onPageChange) {
    this.data = data;
    this.onPageChange = onPageChange;
    this.page = 1;
    this.renderButtons();
  }

  paginate() {
    const start = (this.page - 1) * this.limit;
    return this.data.slice(start, start + this.limit);
  }

  goToPage(page) {
    if (page < 1 || page > this.totalPages()) return;
    this.page = page;
    this.renderButtons();
    if (this.onPageChange) this.onPageChange(this.paginate());
  }

  totalPages() {
    return Math.ceil(this.data.length / this.limit) || 1;
  }

  renderButtons() {
    if (!this.container) return;

    const total = this.totalPages();
    let html = "";

    html += `<button ${this.page === 1 ? "disabled" : ""} data-page="${
      this.page - 1
    }">Prev</button>`;

    for (let i = 1; i <= total; i++) {
      html += `<button class="${
        i === this.page ? "active" : ""
      }" data-page="${i}">${i}</button>`;
    }

    html += `<button ${this.page === total ? "disabled" : ""} data-page="${
      this.page + 1
    }">Next</button>`;

    this.container.innerHTML = html;

    this.container.querySelectorAll("button").forEach((btn) => {
      btn.onclick = () => this.goToPage(+btn.dataset.page);
    });
  }
}
