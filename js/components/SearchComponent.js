export default class SearchComponent {
  constructor(input, onSearch) {
    input.addEventListener("input", (e) => {
      onSearch(e.target.value);
    });
  }
}
