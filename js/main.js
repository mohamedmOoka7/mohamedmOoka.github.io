// =============================================
// MODERN PORTFOLIO - REDESIGNED
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  // ===== ACTIVE NAV LINK ON SCROLL =====
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section[id]")

  function updateActiveNav() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", updateActiveNav)
  updateActiveNav()

  // ===== SMOOTH SCROLL =====
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")

      if (href !== "#" && href.length > 1) {
        e.preventDefault()
        const target = document.querySelector(href)

        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // ===== INTERSECTION OBSERVER FOR FADE IN =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const animatedElements = document.querySelectorAll(".project-item, .contact-card, .skill-item")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    observer.observe(el)
  })

  // ===== CONSOLE MESSAGE =====
  console.log("%c Mohamed Mooka - Cybersecurity Portfolio", "font-size: 16px; font-weight: 700; color: #3b82f6;")
  console.log("%c DFIR Specialist | SOC Analyst | Threat Hunter", "font-size: 12px; color: #888888;")
})
