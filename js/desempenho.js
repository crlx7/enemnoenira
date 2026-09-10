/* ==========================================================================
   ENEM NO ENIRA — MEU DESEMPENHO (DESEMPENHO.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  updateDashboard();

  document.getElementById('btnClearData')?.addEventListener('click', () => {
    if (confirm('Deseja realmente limpar todos os seus dados locais de estudo?')) {
      localStorage.clear();
      updateDashboard();
      alert('Dados limpos com sucesso.');
      location.reload();
    }
  });
});

function updateDashboard() {
  const total = parseInt(localStorage.getItem('enira_questoes_total') || '0');
  const acertos = parseInt(localStorage.getItem('enira_questoes_acertos') || '0');
  const redacoes = JSON.parse(localStorage.getItem('enira_redacoes') || '[]').length;

  const pct = total > 0 ? Math.round((acertos / total) * 100) : 0;

  document.getElementById('dashTotalQuestions').textContent = total;
  document.getElementById('dashAccuracyRate').textContent = `${pct}%`;
  document.getElementById('dashRedSaved').textContent = redacoes;

  // Mini estatísticas do Hero
  document.getElementById('miniStatsQuest').textContent = total;
  document.getElementById('miniStatsRed').textContent = redacoes;

  // Nível do usuário baseado em questões
  let level = 'Iniciante';
  if (total >= 10) level = 'Estudante';
  if (total >= 50) level = 'Preparado';
  if (total >= 100) level = 'Mestre ENEM';

  document.getElementById('dashUserRank').textContent = level;
  document.getElementById('userLevel').textContent = level;
}
