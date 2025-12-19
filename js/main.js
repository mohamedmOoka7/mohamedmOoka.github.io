// ==================================================
// MAIN JAVASCRIPT FILE
// ==================================================

document.addEventListener("DOMContentLoaded", () => {

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

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 8;
    const rotateY = ((x / rect.width) - 0.5) * -8;

    card.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});




window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = (scrollTop / height) * 100;
  document.getElementById("scroll-progress").style.width =
    progress + "%";
});


document.getElementById("analyst-toggle")
  ?.addEventListener("click", () => {
    document.body.classList.toggle("analyst-mode");
  });

