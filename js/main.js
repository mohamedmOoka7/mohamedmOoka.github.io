// ==================================================
// PROFESSIONAL PORTFOLIO - OPTIMIZED PERFORMANCE
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================================
     NAVBAR SCROLL EFFECT
  =============================================== */

  const navbar = document.querySelector(".navbar")
  let lastScroll = 0

  const handleScroll = () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 80) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }

    lastScroll = currentScroll
  }

  let ticking = false
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll()
        ticking = false
      })
      ticking = true
    }
  })

  /* ===============================================
     SMOOTH SCROLL WITH OFFSET
  =============================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#") return

      e.preventDefault()
      const target = document.querySelector(href)

      if (target) {
        const offset = 80
        const targetPosition = target.offsetTop - offset

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  /* ===============================================
     INTERSECTION OBSERVER FOR ANIMATIONS
  =============================================== */

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all sections and cards
  document.querySelectorAll(".section, .skill-card, .project-card, .stat-card").forEach((el) => {
    observer.observe(el)
  })

  /* ===============================================
     DYNAMIC YEAR IN FOOTER
  =============================================== */

  const footer = document.querySelector(".footer-content p")
  if (footer && footer.textContent.includes("2025")) {
    footer.textContent = footer.textContent.replace("2025", new Date().getFullYear())
  }
})
