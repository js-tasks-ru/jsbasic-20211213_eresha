function highlight(table) {
  let tBodyes = table.tBodies;
  for (let tBodye of tBodyes) {
    for (let row of tBodye.rows) {
      if (+row.cells[1].textContent < 18) {
        row.style = "text-decoration: line-through";
      }
      if (row.cells[2].textContent === `m`) {
        row.classList.add('male');
      }
      if (row.cells[2].textContent === `f`) {
        row.classList.add('female');
      }
      if (row.cells[3].dataset.available === 'true') {
        row.classList.add('available');
      }
      if (row.cells[3].dataset.available === 'false') {
        row.classList.add('unavailable');
      }
      if (row.cells[3].dataset.available === undefined) {
        row.setAttribute('hidden', true);
      }
    }
  }
}
