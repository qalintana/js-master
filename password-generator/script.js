const pwEL = document.getElementById('pw');
const lengthEL = document.getElementById('length');
const copyEl = document.getElementById('copy');
const upperEL = document.getElementById('upper');
const lowerEL = document.getElementById('lower');
const numberEL = document.getElementById('number');
const symbolEL = document.getElementById('symbol');
const generateBtn = document.getElementById('generate');

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = upperLetters.toLowerCase();
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+';

function getLowerCase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}
function getUpperCase() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}
function getNumbers() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbls() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
  const length = Number(lengthEL.value);
  let password = '';

  for (let a = 0; a < length; a++) {
    const x = generateX();
    password += x;
  }

  pwEL.innerHTML = password;
}

function generateX() {
  const xs = [];
  if (upperEL.checked) {
    xs.push(getUpperCase());
  }

  if (lowerEL.checked) {
    xs.push(getLowerCase());
  }
  if (numberEL.checked) {
    xs.push(getNumbers());
  }
  if (symbolEL.checked) {
    xs.push(getSymbls());
  }

  if (xs.length === 0) return '';

  return xs[Math.floor(Math.random() * xs.length)];
}

generateBtn.addEventListener('click', generatePassword);

copyEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');

  const password = pwEL.innerHTML;

  if (!password) return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('password copied to clipboard');
});
