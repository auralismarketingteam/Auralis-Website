document.addEventListener('DOMContentLoaded', () => {
  // 1. Two-way scroll trigger (triggers upon scroll-down and scroll-up)
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

  // 2. DriftWall 3D Mouse Parallax Follow
  const wallContainer = document.getElementById('driftWall');
  const wallPlane = document.getElementById('driftPlane');

  if (wallContainer && wallPlane) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let isHovering = false;

    wallContainer.addEventListener('mouseenter', () => {
      isHovering = true;
    });

    wallContainer.addEventListener('mousemove', (e) => {
      const rect = wallContainer.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    });

    wallContainer.addEventListener('mouseleave', () => {
      isHovering = false;
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