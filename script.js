/* ============================================================
   COLAB — Script principal optimizado
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  /* ── Año dinámico footer ── */
  const yearEl = document.querySelector('.year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Header scroll (si existe) ── */
  const espHeader = document.querySelector('.esp-header');
  if (espHeader) {
    const onScroll = () => espHeader.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── SLIDER PROXIMAMENTE ── */
  const slides = document.querySelectorAll('#calendario .proximamente-track .slide');
  const btnPrev = document.querySelector('#calendario #prevSlide');
  const btnNext = document.querySelector('#calendario #nextSlide');

  if (slides.length && btnPrev && btnNext) {
    let current = 0;
    const total = slides.length;

    function goTo(newIndex, direction) {
      const outgoing = slides[current];
      outgoing.classList.remove('slide--active');
      outgoing.style.opacity = '0';
      outgoing.style.transform = `translateX(${-30 * direction}px)`;

      current = ((newIndex % total) + total) % total;
      const incoming = slides[current];

      incoming.style.transition = 'none';
      incoming.style.opacity = '0';
      incoming.style.transform = `translateX(${30 * direction}px)`;

      incoming.getBoundingClientRect(); // Trigger reflow

      incoming.style.transition = '';
      incoming.classList.add('slide--active');
      incoming.style.transform = 'translateX(0)';
      incoming.style.opacity = '1';
    }

    btnNext.addEventListener('click', () => goTo(current + 1, 1));
    btnPrev.addEventListener('click', () => goTo(current - 1, -1));
    
    // Auto-play opcional (descomenta si quieres)
    // setInterval(() => goTo(current + 1, 1), 5000);
  }

  /* ── Smooth scroll enlaces ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Lightbox galería (si existe) ── */
  const galItems = document.querySelectorAll('.gal-item');
  if (galItems.length) {
    // Tu código lightbox aquí (mantenlo intacto)
    // ... (código lightbox anterior)
  }
});
