/* ==========================================================================
   ENEM NO ENIRA — APLICAÇÃO PRINCIPAL (APP.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTheme();
  initProfile();
  initCountdown();
  renderStudyAreas();
  renderRepertorios();
  initNavigation();
});

/* Relógio e Data em Tempo Real (America/Sao_Paulo) */
function initClock() {
  const clockEl = document.getElementById('clockDisplay');
  const dateEl = document.getElementById('dateDisplay');

  function update() {
    const now = new Date();
    const timeOptions = { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateOptions = { timeZone: 'America/Sao_Paulo', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if (clockEl) clockEl.textContent = new Intl.DateTimeFormat('pt-BR', timeOptions).format(now);
    if (dateEl) dateEl.textContent = new Intl.DateTimeFormat('pt-BR', dateOptions).format(now);
  }

  update();
  setInterval(update, 1000);
}

/* Modo Escuro / Claro com localStorage */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('enira_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  toggleBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('enira_theme', newTheme);
  });
}

/* Perfil do Estudante via localStorage */
function initProfile() {
  const nameInput = document.getElementById('userNameInput');
  const saveBtn = document.getElementById('btnSaveProfile');
  const welcomeMsg = document.getElementById('welcomeMsg');

  const savedName = localStorage.getItem('enira_user_name');

  if (savedName) {
    if (welcomeMsg) welcomeMsg.innerHTML = `Olá, <strong>${savedName}</strong>! Bons estudos.`;
    if (nameInput) nameInput.value = savedName;
  } else {
    if (welcomeMsg) welcomeMsg.textContent = 'Crie seu perfil local para acompanhar o progresso:';
  }

  saveBtn?.addEventListener('click', () => {
    const val = nameInput.value.trim();
    if (val) {
      localStorage.setItem('enira_user_name', val);
      if (welcomeMsg) welcomeMsg.innerHTML = `Olá, <strong>${val}</strong>! Perfil atualizado.`;
      alert('Perfil salvo localmente!');
    }
  });
}

/* Contagem Regressiva para o ENEM 2026 */
function initCountdown() {
  const d1Date = new Date('2026-11-08T13:30:00-03:00').getTime();
  const d2Date = new Date('2026-11-15T13:30:00-03:00').getTime();

  function calcTime(target, prefix) {
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById(`${prefix}-days`).textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const elDays = document.getElementById(`${prefix}-days`);
    const elHours = document.getElementById(`${prefix}-hours`);
    const elMin = document.getElementById(`${prefix}-min`);
    const elSec = document.getElementById(`${prefix}-sec`);

    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMin) elMin.textContent = String(mins).padStart(2, '0');
    if (elSec) elSec.textContent = String(secs).padStart(2, '0');
  }

  setInterval(() => {
    calcTime(d1Date, 'd1');
    calcTime(d2Date, 'd2');
  }, 1000);
}

/* Renderizar Módulo de Estudos */
function renderStudyAreas() {
  const container = document.getElementById('studyAreasGrid');
  if (!container) return;

  container.innerHTML = BANCO_DADOS.areasEstudo.map(area => `
    <div class="area-card">
      <span class="badge-tag">${area.disciplinas[0]}</span>
      <h3>${area.titulo}</h3>
      <p>${area.resumo}</p>
      <small style="color: var(--text-muted); display: block; margin-top: 10px;">
        Disciplinas: ${area.disciplinas.join(', ')}
      </small>
    </div>
  `).join('');
}

/* Renderizar Banco de Repertórios */
function renderRepertorios() {
  const container = document.getElementById('repertoriosGrid');
  if (!container) return;

  container.innerHTML = BANCO_DADOS.repertorios.map(rep => `
    <div class="area-card">
      <span class="badge-tag red">${rep.categoria}</span>
      <h3>${rep.nome}</h3>
      <p><strong>Ideia Central:</strong> ${rep.ideia}</p>
      <p><small style="color: var(--primary-gold);">💡 Uso no ENEM: ${rep.exemplo}</small></p>
    </div>
  `).join('');
}

/* Navegação Mobile Toggle */
function initNavigation() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  toggle?.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}
