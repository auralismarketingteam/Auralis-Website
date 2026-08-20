document.addEventListener('DOMContentLoaded', () => {
  // 1. Two-way scroll trigger
  const scrollElements = document.querySelectorAll('.scroll-hidden');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-visible');
      } else {
        entry.target.classList.remove('scroll-visible');
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  scrollElements.forEach(el => scrollObserver.observe(el));

  // 2. Functional Reel Showcase Carousels
  const showcaseSlides = [
    { img: 'image/showcase-ads-review.jpg', fallback: 'https://picsum.photos/id/1015/600/400', caption: 'AIMFRESH Brand Film' },
    { img: 'image/showcase-filler-style.jpg', fallback: 'https://picsum.photos/id/1025/600/400', caption: 'DRSA Campaign' },
    { img: 'image/showcase-education.jpg', fallback: 'https://picsum.photos/id/1039/600/400', caption: 'Beverage Shoot' },
    { img: 'image/showcase-vlog.jpg', fallback: 'https://picsum.photos/id/1043/600/400', caption: '3D Logo Stinger' }
  ];

  document.querySelectorAll('.show-card').forEach((card, index) => {
    let currentIndex = index % showcaseSlides.length;
    const prevBtn = card.querySelector('.nav-prev');
    const nextBtn = card.querySelector('.nav-next');
    const mainImg = card.querySelector('.stack-main img');
    const captionEl = card.querySelector('.show-caption');
    const sideImgs = card.querySelectorAll('.stack-side img');

    const updateSlide = (idx) => {
      const slide = showcaseSlides[idx];
      mainImg.src = slide.img;
      mainImg.onerror = () => { mainImg.src = slide.fallback; };
      if (captionEl) captionEl.textContent = slide.caption;

      sideImgs.forEach(sImg => {
        sImg.src = slide.img;
        sImg.onerror = () => { sImg.src = slide.fallback; };
      });
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + showcaseSlides.length) % showcaseSlides.length;
        updateSlide(currentIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % showcaseSlides.length;
        updateSlide(currentIndex);
      });
    }
  });

  // 3. DriftWall 3D Mouse Parallax Follow
  const wallContainer = document.getElementById('driftWall');
  const wallPlane = document.getElementById('driftPlane');

  if (wallContainer && wallPlane) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    wallContainer.addEventListener('mousemove', (e) => {
      const rect = wallContainer.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    });

    wallContainer.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });

    const updatePlaneTilt = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      const tiltX = 16 - currentY * 14;
      const turnY = -14 + currentX * 14;

      wallPlane.style.transform = `translate(-50%, -50%) scale(1.15) rotateX(${tiltX}deg) rotateY(${turnY}deg) translateZ(-100px)`;
      requestAnimationFrame(updatePlaneTilt);
    };

    updatePlaneTilt();
  }
});
