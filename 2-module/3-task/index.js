let calculator = {
  num1: 0,
  num2: 0,
  read(arg1, arg2) {
    this.num1 = arg1;
    this.num2 = arg2;
  },
  sum() {
    return this.num1 + this.num2;
  },
  mul() {
    return this.num1 * this.num2;
  }
};


// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
