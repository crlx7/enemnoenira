/* ==========================================================================
   ENEM NO ENIRA — OFICINA DE REDAÇÃO (REDACAO.JS)
   ========================================================================== */

let redTimerInterval = null;
let redTimerSeconds = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderThemesList();
  initRedacaoEditor();
});

function renderThemesList() {
  const container = document.getElementById('themesList');
  if (!container) return;

  container.innerHTML = BANCO_DADOS.temasRedacao.map(t => `
    <div class="theme-item" onclick="loadTheme(${t.id})">
      <span class="badge-tag">${t.categoria}</span>
      <strong>${t.titulo}</strong>
    </div>
  `).join('');
}

function loadTheme(id) {
  const theme = BANCO_DADOS.temasRedacao.find(t => t.id === id);
  if (!theme) return;

  document.getElementById('activeThemeTitle').textContent = theme.titulo;
  document.getElementById('activeThemeCat').textContent = theme.categoria;

  const textsBox = document.getElementById('activeThemeTexts');
  textsBox.innerHTML = theme.textosMotivadores.map(txt => `<p style="font-size: 12px; margin-top: 4px;">${txt}</p>`).join('');
}

function initRedacaoEditor() {
  const textarea = document.getElementById('redTextarea');
  const wordCount = document.getElementById('wordCount');
  const charCount = document.getElementById('charCount');

  textarea?.addEventListener('input', () => {
    const text = textarea.value.trim();
    charCount.textContent = textarea.value.length;
    wordCount.textContent = text ? text.split(/\s+/).length : 0;
  });

  document.getElementById('btnStartTimer')?.addEventListener('click', () => {
    if (!redTimerInterval) {
      redTimerInterval = setInterval(() => {
        redTimerSeconds++;
        const hrs = String(Math.floor(redTimerSeconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((redTimerSeconds % 3600) / 60)).padStart(2, '0');
        const secs = String(redTimerSeconds % 60).padStart(2, '0');
        document.getElementById('redTimer').textContent = `${hrs}:${mins}:${secs}`;
      }, 1000);
    }
  });

  document.getElementById('btnPauseTimer')?.addEventListener('click', () => {
    clearInterval(redTimerInterval);
    redTimerInterval = null;
  });

  document.getElementById('btnSaveRedacao')?.addEventListener('click', () => {
    const text = textarea.value;
    if (!text) return alert('Digite algum texto para salvar.');
    
    let saved = JSON.parse(localStorage.getItem('enira_redacoes') || '[]');
    saved.push({ data: new Date().toLocaleDateString(), texto: text });
    localStorage.setItem('enira_redacoes', JSON.stringify(saved));
    alert('Rascunho salvo no seu navegador!');
  });

  document.getElementById('btnEvaluateRedacao')?.addEventListener('click', evaluateRedacao);
}

function evaluateRedacao() {
  const text = document.getElementById('redTextarea').value.trim();
  if (text.length < 100) {
    return alert('Escreva um texto mais longo para gerar uma avaliação estimada.');
  }

  // Algoritmo simulado de competências
  const words = text.split(/\s+/).length;
  let score = 600;

  if (words > 150) score += 100;
  if (words > 250) score += 100;
  if (text.includes('portanto') || text.includes('dessa forma')) score += 80;

  document.getElementById('totalRedScore').textContent = Math.min(score, 1000);
  document.getElementById('redacaoFeedbackBox').classList.remove('hidden');
}
