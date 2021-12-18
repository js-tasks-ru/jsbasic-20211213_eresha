function factorial(n) {
  if (n < 0) {
    return 'Введите натуральное число';
  }
  let result = 1;
  while (n) {
    result *= n;
    n--;
  }
  return result;
}

