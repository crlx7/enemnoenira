/* ==========================================================================
   ENEM NO ENIRA — NOTÍCIAS (NOTICIAS.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('noticiasGrid');
  if (!container) return;

  container.innerHTML = BANCO_DADOS.noticias.map(n => `
    <article class="noticia-card">
      <span class="badge-tag red">${n.fonte}</span>
      <h3 style="font-size: 16px; margin: 8px 0;">${n.titulo}</h3>
      <p style="font-size: 13px; color: var(--text-muted);">${n.resumo}</p>
      <small style="display: block; margin-top: 12px; color: var(--primary-gold);">${n.data}</small>
    </article>
  `).join('');
});
