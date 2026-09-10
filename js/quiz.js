/* ==========================================================================
   ENEM NO ENIRA — QUIZ ILIMITADO (QUIZ.JS)
   ========================================================================== */

let quizCurrentQuestions = [];
let quizIndex = 0;
let quizScore = 0;

document.addEventListener('DOMContentLoaded', () => {
  const btnStart = document.getElementById('btnStartQuiz');
  const btnNext = document.getElementById('btnNextQuizQuestion');
  const btnRestart = document.getElementById('btnRestartQuiz');

  btnStart?.addEventListener('click', startQuiz);
  btnNext?.addEventListener('click', nextQuestion);
  btnRestart?.addEventListener('click', () => {
    document.getElementById('quizResult').classList.add('hidden');
    document.getElementById('quizSetup').classList.remove('hidden');
  });
});

function startQuiz() {
  quizCurrentQuestions = [...BANCO_DADOS.questoesQuiz];
  quizIndex = 0;
  quizScore = 0;

  document.getElementById('quizSetup').classList.add('hidden');
  document.getElementById('quizPlay').classList.remove('hidden');

  showQuestion();
}

function showQuestion() {
  const q = quizCurrentQuestions[quizIndex];
  document.getElementById('quizQuestionTitle').textContent = q.enunciado;
  document.getElementById('quizProgressText').textContent = `Questão ${quizIndex + 1}/${quizCurrentQuestions.length}`;
  document.getElementById('quizAreaBadge').textContent = q.area;

  const optionsBox = document.getElementById('quizOptionsList');
  optionsBox.innerHTML = '';

  document.getElementById('quizExplanation').classList.add('hidden');
  document.getElementById('btnNextQuizQuestion').classList.add('hidden');

  q.opcoes.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline full-width';
    btn.style.margin = '4px 0';
    btn.style.textAlign = 'left';
    btn.textContent = `${String.fromCharCode(65 + idx)}) ${opt}`;
    btn.onclick = () => selectOption(idx, q.correta);
    optionsBox.appendChild(btn);
  });
}

function selectOption(selectedIndex, correctIndex) {
  const options = document.getElementById('quizOptionsList').children;
  for (let i = 0; i < options.length; i++) {
    options[i].disabled = true;
    if (i === correctIndex) options[i].style.background = 'rgba(34, 197, 94, 0.2)';
    if (i === selectedIndex && i !== correctIndex) options[i].style.background = 'rgba(239, 68, 68, 0.2)';
  }

  if (selectedIndex === correctIndex) quizScore++;

  const expBox = document.getElementById('quizExplanation');
  expBox.textContent = BANCO_DADOS.questoesQuiz[quizIndex].explicacao;
  expBox.classList.remove('hidden');

  document.getElementById('btnNextQuizQuestion').classList.remove('hidden');
}

function nextQuestion() {
  quizIndex++;
  if (quizIndex < quizCurrentQuestions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  document.getElementById('quizPlay').classList.add('hidden');
  document.getElementById('quizResult').classList.remove('hidden');

  const pct = Math.round((quizScore / quizCurrentQuestions.length) * 100);
  document.getElementById('quizScoreCircle').textContent = `${pct}%`;

  // Salvar no localStorage
  const currentTotal = parseInt(localStorage.getItem('enira_questoes_total') || '0');
  const currentCorrect = parseInt(localStorage.getItem('enira_questoes_acertos') || '0');

  localStorage.setItem('enira_questoes_total', currentTotal + quizCurrentQuestions.length);
  localStorage.setItem('enira_questoes_acertos', currentCorrect + quizScore);
}
