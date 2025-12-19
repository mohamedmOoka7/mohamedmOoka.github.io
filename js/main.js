// ==================================================
// MAIN JAVASCRIPT FILE
// ==================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================================
     DARK MODE TOGGLE
  =============================================== */

  const toggleButton = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Function to toggle theme
  const toggleTheme = () => {
    const currentTheme = body.dataset.theme || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.dataset.theme = newTheme;
    toggleButton.innerHTML = newTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', newTheme); // Save to localStorage
  };

  // Set initial theme from localStorage or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.dataset.theme = savedTheme;
  toggleButton.innerHTML = savedTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

  // Add event listener to toggle button
  toggleButton.addEventListener('click', toggleTheme);

  /* ===============================================
     DISABLE ANIMATION ON PROJECT PAGES
  =============================================== */

  if (document.body.classList.contains("no-animate")) {
    return;
  }

  /* ===============================================
     SCROLL REVEAL ANIMATION
  =============================================== */

  const observerOptions = {
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target); // improve performance
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(".section, .card");
  revealElements.forEach(el => revealObserver.observe(el));

  /* ===============================================
     FOOTER YEAR AUTO UPDATE
  =============================================== */

  const footerYear = document.querySelector("footer p");
  if (footerYear) {
    footerYear.innerHTML = `© ${new Date().getFullYear()} Mohamed Mooka — Cybersecurity Portfolio`;
  }

});
