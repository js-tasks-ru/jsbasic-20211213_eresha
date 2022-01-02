function camelize(str) {
  return str.split('-').map((elem, index) => (index === 0) ? elem : elem[0].toUpperCase() + elem.slice(1)).join('');
}

// function camelize(str) {
//   let arrSymbols = str.split('');
//   let newArr = [];
//   for (let i = 0; i < arrSymbols.length; i++) {
//     if (arrSymbols[i] === '-') {
//       newArr.push(arrSymbols[i + 1].toUpperCase());
//       i++;
//     } else {
//       newArr.push(arrSymbols[i]);
//     }
//   }
//   return newArr.join('');
// }
