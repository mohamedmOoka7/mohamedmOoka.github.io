// =============================================
// PROFESSIONAL PORTFOLIO - CLEAN & PERFORMANT
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  // ===== SCROLL PROGRESS =====
  const scrollProgress = document.querySelector(".scroll-progress")

  function updateScrollProgress() {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight - windowHeight
    const scrolled = window.scrollY
    const progress = (scrolled / documentHeight) * 100

    if (scrollProgress) {
      scrollProgress.style.transform = `scaleX(${progress / 100})`
    }
  }

  window.addEventListener("scroll", updateScrollProgress, { passive: true })

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")

      if (href !== "#" && href.length > 1) {
        e.preventDefault()
        const target = document.querySelector(href)

        if (target) {
          const offsetTop = target.offsetTop - 20

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        fadeInObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Add fade-in effect to cards
  const animatedElements = document.querySelectorAll(".work-card, .skill-item, .contact-card")

  animatedElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    fadeInObserver.observe(el)
  })

  // ===== BUTTON CLICK FEEDBACK =====
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Simple scale effect
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })

  // ===== IMAGE LAZY LOADING =====
  const images = document.querySelectorAll("img")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.style.opacity = "1"
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    img.style.opacity = "0"
    img.style.transition = "opacity 0.4s ease"
    imageObserver.observe(img)
  })

  // ===== CONSOLE BRANDING =====
  console.log(
    "%c🔒 Mohamed Mooka - Cybersecurity Portfolio",
    "font-size: 18px; font-weight: bold; color: #ef4444; padding: 8px 0;",
  )
  console.log("%cDFIR Specialist | SOC Analyst | Threat Hunter", "font-size: 13px; color: #b8b8b8; font-weight: 600;")

  // ===== PERFORMANCE: RESPECT REDUCED MOTION =====
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.querySelectorAll("*").forEach((el) => {
      el.style.animationDuration = "0.01ms"
      el.style.transitionDuration = "0.01ms"
    })
  }

  // Initial scroll progress update
  updateScrollProgress()
})
