// ==================================================
// MAIN JAVASCRIPT FILE
// ==================================================

document.addEventListener("DOMContentLoaded", () => {

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

  /* ===============================================
     FUTURE FEATURES (PLACEHOLDERS)
  =============================================== */

  // Project filtering
  // Dynamic project loading
  // Markdown project rendering

});
