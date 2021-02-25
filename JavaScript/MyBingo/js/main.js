'use strict'

{
  function createColumn(col) {

    const source = [];
    for (let i = 0; i < 15; i++) {
      source[i] = i + 1 + 15 * col;
    }

    const column = [];
    for (let i = 0; i < 5; i++) {
      column[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    }

    return column;
  }

  const columns = [];
  columns[0] = createColumn(0);
  columns[1] = createColumn(1);
  columns[2] = createColumn(2);
  columns[3] = createColumn(3);
  columns[4] = createColumn(4);
  columns[2][2] = 'FREE';

  const bingo = [];
  for (let r = 0; r < 5; r++) {
    bingo[r] = [];
    for (let c = 0; c < 5; c++) {
      bingo[r][c] = columns[c][r]
    }
  }
  console.table(bingo);

  const tr = document.createElement('tr');
  for (let col = 0; col < 5; col++) {
    const td = document.createElement('td');
    td.textContent = bingo[0][col];
    tr.appendChild(td);
  }
  document.querySelector('tbody').appendChild(tr);
}