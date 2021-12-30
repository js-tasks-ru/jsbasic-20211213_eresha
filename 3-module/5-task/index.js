function getMinMax(str) {
  let arr = str.split(' ').filter(elem => !isNaN(elem)).map(elem => +elem);
  arr.sort((a, b) => a - b);
  let obj = {};
  obj.min = arr[0];
  obj.max = arr[arr.length - 1];

  return obj;
}
