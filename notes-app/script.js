const notesEl = document.querySelector('.notes');

const editBtn = document.querySelector('.edit');
const deleteBtn = document.querySelector('.delete');

const textArea = notesEl.querySelector('textarea');
const main = notesEl.querySelector('.main');

editBtn.addEventListener('click', () => {
  main.classList.toggle('hidden');
  textArea.classList.toggle('hidden');
});

textArea.addEventListener('input', (e) => {
  const { value } = e.target;

  main.innerHTML = marked(value);
});
