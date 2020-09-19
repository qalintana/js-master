const quizData = [
  {
    question: "How old is Florin?",
    a: "10",
    b: "17",
    c: "26",
    d: 110,
    correct: "c",
  },
  {
    question: "What is the most used programming language in 2019?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "Javascript",
    correct: "d",
  },

  {
    question: "Who is he President of US",
    a: "Maida Santana",
    b: "Paito Paulo",
    c: "Donald Trump",
    d: "Miahi Muat",
    correct: "c",
  },
  {
    question: "What doews HTML stand for",
    a: "Hypertext markup language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helipomo Mm",
    correct: "a",
  },
  {
    question: "What year Javascript launched",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "2001",
    correct: "a",
  },
];

const question = document.getElementById("question");
const answersEl = document.getElementsByName("answer");
const quiz = document.getElementById("quiz");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

const sendButton = document.getElementById("send");

let currentQuestion = 0;
let score = 0;

loadQuiz();

sendButton.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (
      quizData[currentQuestion] &&
      answer === quizData[currentQuestion].correct
    ) {
      score++;
    }

    if (currentQuestion < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `<h2>Terminou com ${score}</h2> <button onclick="location.reload()">Reload</button>`;
      currentQuestion = 0;
      loadQuiz();
    }
    currentQuestion++;
  }
});

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuestion];

  question.innerHTML = currentQuizData.question;
  document.title = currentQuizData.question;

  a_text.innerHTML = currentQuizData.a;
  b_text.innerHTML = currentQuizData.b;
  c_text.innerHTML = currentQuizData.c;
  d_text.innerHTML = currentQuizData.d;
}

function getSelected() {
  let answer = undefined;
  answersEl.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function deselectAnswers() {
  answersEl.forEach((answer) => {
    answer.checked = false;
  });
}
