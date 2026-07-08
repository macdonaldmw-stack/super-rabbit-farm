document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.getElementById('navToggle');
  const list = document.getElementById('navList');
  if (toggle && list) {
    toggle.addEventListener('click', () => list.classList.toggle('open'));
    list.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => list.classList.remove('open'))
    );
  }

  // ---- Render available rabbits (rabbits.html) ----
  const rabbitsContainer = document.getElementById('rabbitsContainer');
  if (rabbitsContainer && typeof rabbitsData !== 'undefined') {
    if (rabbitsData.length === 0) {
      rabbitsContainer.innerHTML = '<p class="placeholder-note">No rabbits listed right now — check back soon.</p>';
    } else {
      rabbitsContainer.innerHTML = rabbitsData.map(r => {
        const statusLabel = r.status === 'available' ? 'Available' : 'Reserved';
        const photoHtml = r.photo
          ? `<img src="${escapeHtml(r.photo)}" alt="${escapeHtml(r.breed)}" style="width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:8px; margin-bottom:0.9rem;" onerror="this.style.display='none'">`
          : '';
        const waText = encodeURIComponent(`Hi, I'm interested in rabbit tag ${r.tag}`);
        return `
          <div class="ear-tag">
            ${photoHtml}
            <div class="tag-id">Tag #${escapeHtml(r.tag)}</div>
            <h3>${escapeHtml(r.breed)} — ${escapeHtml(r.sex)}</h3>
            <div class="meta"><span>${escapeHtml(r.age)} old</span><span>${escapeHtml(r.weight)}</span></div>
            <span class="status ${r.status}">${statusLabel}</span>
            <div class="price">${escapeHtml(r.price)}</div>
            <a class="btn btn-whatsapp" href="https://wa.me/254701229122?text=${waText}" target="_blank" rel="noopener">Ask on WhatsApp</a>
          </div>`;
      }).join('');
    }
  }

  // ---- Render gallery (gallery.html) ----
  const galleryContainer = document.getElementById('galleryContainer');
  if (galleryContainer && typeof galleryData !== 'undefined') {
    if (galleryData.length === 0) {
      galleryContainer.innerHTML = '<p class="placeholder-note">No photos yet.</p>';
    } else {
      galleryContainer.innerHTML = galleryData.map(g => {
        if (g.photo) {
          return `<div class="gallery-item" style="opacity:1; border-style:solid; padding:0; overflow:hidden;">
            <img src="${escapeHtml(g.photo)}" alt="${escapeHtml(g.caption)}" style="width:100%; height:100%; object-fit:cover;" onerror="this.parentElement.outerHTML=this.parentElement.outerHTML.replace('opacity:1','opacity:0.6')">
          </div>`;
        }
        return `<div class="gallery-item" title="${escapeHtml(g.caption)}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg></div>`;
      }).join('');
    }
  }
});

function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
