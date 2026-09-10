/* ==========================================================================
   ENEM NO ENIRA — CALENDÁRIO (CALENDARIO.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('timelineGrid');
  if (!container) return;

  container.innerHTML = BANCO_DADOS.calendario.map(c => `
    <div class="timeline-item">
      <strong>${c.evento}</strong> — <span style="color: var(--primary-gold);">${c.data}</span>
      <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">${c.detalhe}</p>
    </div>
  `).join('');
});
