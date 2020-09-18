const canvas = document.getElementById('canvas');

const increaseBtn = document.getElementById('increase');
const descreaseBtn = document.getElementById('decrease');

let color = 'black';

const sizeSpan = document.getElementById('size');
const colorEl = document.getElementById('color');

const clearBtn = document.getElementById('clear');

const ctx = canvas.getContext('2d');

let size = 10;
let x = undefined;
let y = undefined;

let isPressed;

canvas.addEventListener('mousedown', (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener('mouseup', (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    // drawCircle(x2, y2);
    line(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

increaseBtn.addEventListener('click', (e) => {
  size += 5;

  if (size > 50) {
    size = 50;
  }
  updateSizeOnScreen(size);
});

descreaseBtn.addEventListener('click', (e) => {
  size -= 5;

  if (size < 5) {
    size = 5;
  }
  updateSizeOnScreen(size);
});

function line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.stroke();
}

colorEl.addEventListener('change', (e) => {
  color = e.target.value;
});

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function updateSizeOnScreen(size) {
  sizeSpan.textContent = size;
}
