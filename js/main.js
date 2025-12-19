// js/main.js

/* ================================
   Smooth Reveal on Scroll
   ================================ */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  {
    threshold: 0.15
  }
);

const hiddenElements = document.querySelectorAll('.section, .card');
hiddenElements.forEach(el => observer.observe(el));

/* ================================
   Simple Year Auto Update
   ================================ */

const footer = document.querySelector('footer p');
if (footer) {
  const year = new Date().getFullYear();
  footer.innerHTML = `© ${year} Mohamed Mooka — Cybersecurity Portfolio`;
}

/* ================================
   Future Expansion (Placeholders)
   ================================ */

// Project filtering
// Dynamic project loading
// Markdown project rendering
