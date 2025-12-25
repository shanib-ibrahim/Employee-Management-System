export default class Search {
  constructor(input, onSearch) {
    input.addEventListener("input", (e) => {
      onSearch(e.target.value);
    });
  }
}
