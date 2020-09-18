const canvas = document.getElementById('canvas');

const increaseBtn = document.getElementById('increase');
const descreaseBtn = document.getElementById('decrease');

let color = 'black';

const sizeSpan = document.getElementById('size');
const colorEl = document.getElementById('color');

const ctx = canvas.getContext('2d');

let size = 10;
let x = 50;
let y = 50;

let isPressed;

canvas.addEventListener('mousedown', (e) => {
  isPressed = true;
});

canvas.addEventListener('mouseup', (e) => {
  isPressed = false;
});

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x = e.offsetX;
    const y = e.offsetY;

    drawCircle(x, y);
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

colorEl.addEventListener('change', (e) => {
  color = e.target.value;
});

function updateSizeOnScreen(size) {
  sizeSpan.textContent = size;
}

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   drawCircle(x, y);

//   requestAnimationFrame(draw);
// }

// draw();
