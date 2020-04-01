const calculator = {
  displayValue: '0',
  firstNumber: null,
  waitingForSecondNumber: false,
  operator: null,
};
const keys = document.querySelectorAll('.key');

const updateDisplay = () => {
  const display = document.querySelector('.key-display');
  display.value = calculator.displayValue;
  // console.log(`Display value: ${display.value}`);
};
const inputDigit = (digit) => {
  const { displayValue, waitingForSecondNumber } = calculator;
  if(calculator.waitingForSecondNumber === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondNumber = false;
  } else {        
      // Overwrite `displayValue` if the current value is '0' otherwise append to it
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  
  // console.table(calculator);
};
const inputDigitDot = (dot) => {
  if (calculator.waitingForSecondNumber === true) return;
  // If the `displayValue` does not contain a decimal point
  if(!calculator.displayValue.includes(dot)) {
      // If the `displayValue` does not contain a decimal point
      calculator.displayValue += dot;
  }
};
const inputAllClear = () => {
  calculator.displayValue = '0';
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
  calculator.operator = null;

  // console.table(calculator);
};
const handleOperator = (nextOperator) => {
  const { firstNumber, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  
  if (operator && calculator.waitingForSecondNumber)  {
      calculator.operator = nextOperator;
      // console.table(calculator);
      return;
    }

  if (firstNumber == null) {
      calculator.firstNumber = inputValue;
  } else if (operator) {
      const currentValue = firstNumber || 0;
      const result = calculatedResult[operator](firstNumber, inputValue);
  
      calculator.displayValue = String(result);
      calculator.firstNumber = result;
    }
  
  calculator.waitingForSecondNumber = true;
  calculator.operator = nextOperator;
  // console.table(calculator);
};
const calculatedResult = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

  'X': (firstNumber, secondNumber) => firstNumber * secondNumber,

  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

  '=': (firstNumber, secondNumber) => secondNumber
};

keys.forEach(key => key.addEventListener('click', calculate));

function calculate(event) {
  const target = event.target;
  // is equal to -> const { target } = event;
  
  if (!target.matches('button')) {
      return;
  }
  
  if (target.classList.contains('key-operator')) {
      // console.log(`operator ${target.value}`);
      // calculator.operator = target.value;
      handleOperator(target.value);
      updateDisplay();
      return;
  }
  
  if (target.classList.contains('key-decimal')) {
      // console.log(`decimal ${target.value}`);
      inputDigitDot(target.value);
      updateDisplay();
      return;
  }
  
  if (target.classList.contains('key-ac')) {
      // console.log(`clear ${target.value}`);
      inputAllClear();
      updateDisplay();
      return;
  }
  
  inputDigit(target.value);
  updateDisplay();
}