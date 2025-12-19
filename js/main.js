document.addEventListener("DOMContentLoaded", () => {

  if (document.body.classList.contains("no-animate")) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".section, .card")
    .forEach(el => observer.observe(el));

});
