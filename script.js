// ARC Kenya - script.js

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (navLinks) navLinks.classList.remove('show');
      }
    });
  });

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  const updateActive = () => {
    let current = '';
    sections.forEach(sec => {
      const top = window.scrollY;
      const offset = sec.offsetTop - 120;
      if (top >= offset) current = sec.id;
    });

    links.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + current
      );
    });
  };

  window.addEventListener('scroll', updateActive);
  updateActive();

  // Counter animation
  const counters = document.querySelectorAll('.stat h3, .stats-grid h3');

  const animateCounter = el => {
    const raw = el.textContent.replace(/[^\d]/g, '');
    const target = parseInt(raw || '0', 10);
    if (!target) return;

    let value = 0;
    const step = Math.max(1, Math.ceil(target / 80));

    const timer = setInterval(() => {
      value += step;
      if (value >= target) {
        value = target;
        clearInterval(timer);
      }
      el.textContent = value.toLocaleString() + '+';
    }, 25);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));

  // Back-to-top button
  const topBtn = document.createElement('button');
  topBtn.id = 'backToTop';
  topBtn.innerHTML = '↑';
  Object.assign(topBtn.style, {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    display: 'none',
    padding: '12px 16px',
    cursor: 'pointer',
    zIndex: '999'
  });
  document.body.appendChild(topBtn);

  window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
