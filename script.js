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

document.addEventListener('DOMContentLoaded', () => {
    /* ── Lightbox galería ── */
    const galItems = document.querySelectorAll('.gal-item');
    if (!galItems.length) return;

    const galImages = Array.from(galItems).map(item => {
        const img = item.querySelector('img');
        return { src: img.src, alt: img.alt };
    });

    let lbIndex = 0;
    let lbEl = null;
    let lbImg = null;
    let lbCounter = null;

    function openLightbox(index) {
        lbIndex = index;

        lbEl = document.createElement('div');
        lbEl.className = 'gal-lightbox';
        lbEl.setAttribute('role', 'dialog');
        lbEl.setAttribute('aria-modal', 'true');
        lbEl.setAttribute('aria-label', 'Galería de imágenes');

        const inner = document.createElement('div');
        inner.className = 'gal-lightbox-inner';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'gal-lb-close';
        closeBtn.setAttribute('aria-label', 'Cerrar galería');
        closeBtn.textContent = '×';
        closeBtn.addEventListener('click', closeLightbox);

        const prevBtn = document.createElement('button');
        prevBtn.className = 'gal-lb-arrow gal-lb-prev';
        prevBtn.setAttribute('aria-label', 'Imagen anterior');
        prevBtn.innerHTML = '&#8592;';
        prevBtn.addEventListener('click', () => navigateLightbox(-1));

        const nextBtn = document.createElement('button');
        nextBtn.className = 'gal-lb-arrow gal-lb-next';
        nextBtn.setAttribute('aria-label', 'Imagen siguiente');
        nextBtn.innerHTML = '&#8594;';
        nextBtn.addEventListener('click', () => navigateLightbox(1));

        lbImg = document.createElement('img');
        lbImg.src = galImages[lbIndex].src;
        lbImg.alt = galImages[lbIndex].alt;

        lbCounter = document.createElement('div');
        lbCounter.className = 'gal-lb-counter';
        updateCounter();

        inner.appendChild(prevBtn);
        inner.appendChild(lbImg);
        inner.appendChild(nextBtn);
        lbEl.appendChild(closeBtn);
        lbEl.appendChild(inner);
        lbEl.appendChild(lbCounter);

        document.body.appendChild(lbEl);
        document.body.style.overflow = 'hidden';

        lbEl.addEventListener('click', e => { if (e.target === lbEl) closeLightbox(); });
        document.addEventListener('keydown', handleKeydown);
    }

    function closeLightbox() {
        if (!lbEl) return;
        document.body.removeChild(lbEl);
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeydown);
        lbEl = null; lbImg = null; lbCounter = null;
    }

    function navigateLightbox(dir) {
        if (!lbImg) return;
        const exitClass = dir === 1 ? 'lb-exit-left' : 'lb-exit-right';
        lbImg.classList.add(exitClass);
        setTimeout(() => {
            lbIndex = ((lbIndex + dir) % galImages.length + galImages.length) % galImages.length;
            lbImg.classList.remove(exitClass);
            lbImg.classList.add('lb-enter');
            lbImg.src = galImages[lbIndex].src;
            lbImg.alt = galImages[lbIndex].alt;
            updateCounter();
            lbImg.getBoundingClientRect(); // forzar reflow
            lbImg.classList.remove('lb-enter');
        }, 280);
    }

    function updateCounter() {
        if (lbCounter) lbCounter.textContent = `${lbIndex + 1} / ${galImages.length}`;
    }

    function handleKeydown(e) {
        if (e.key === 'ArrowRight') navigateLightbox(1);
        if (e.key === 'ArrowLeft')  navigateLightbox(-1);
        if (e.key === 'Escape')     closeLightbox();
    }

    galItems.forEach((item, i) => {
        item.addEventListener('click', () => openLightbox(i));
    });

});

