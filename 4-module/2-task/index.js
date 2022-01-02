function makeDiagonalRed(table) {
  // ваш код...
  let rows = table.querySelectorAll('tr');
  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[i].style.backgroundColor = 'red';
  }
}
