// =============================================
// ULTRA-PREMIUM PORTFOLIO INTERACTIONS
// Smooth • Sophisticated • Buttery
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

  let scrollTicking = false
  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateScrollProgress()
        scrollTicking = false
      })
      scrollTicking = true
    }
  })

  // ===== ACTIVE NAVIGATION =====
  const sections = document.querySelectorAll("section[id]")
  const navItems = document.querySelectorAll(".nav-item")

  function highlightNav() {
    const scrollY = window.scrollY + 200

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach((item) => {
          item.classList.remove("active")
          if (item.getAttribute("href") === `#${sectionId}`) {
            item.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", highlightNav)

  // ===== SMOOTH SCROLL =====
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")

      if (href !== "#" && href.length > 1) {
        e.preventDefault()
        const target = document.querySelector(href)

        if (target) {
          const offsetTop = target.offsetTop - 100
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // ===== SCROLL REVEAL =====
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
  }

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const revealElements = document.querySelectorAll(
    ".section-intro, .about-text, .expertise-card, .work-item, .contact-method",
  )

  revealElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(40px)"
    el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
    scrollObserver.observe(el)
  })

  // ===== PARALLAX MESH =====
  const meshGradients = document.querySelectorAll(".mesh-gradient")
  let mouseX = 0
  let mouseY = 0
  let currentX = 0
  let currentY = 0

  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  })

  function animateParallax() {
    currentX += (mouseX - currentX) * 0.05
    currentY += (mouseY - currentY) * 0.05

    meshGradients.forEach((mesh, index) => {
      const speed = (index + 1) * 20
      const x = currentX * speed
      const y = currentY * speed
      mesh.style.transform = `translate(${x}px, ${y}px)`
    })

    requestAnimationFrame(animateParallax)
  }

  animateParallax()

  // ===== BUTTON INTERACTIONS =====
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary, .btn-download")

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
    })

    button.addEventListener("mouseleave", () => {
      button.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
    })
  })

  // ===== WORK ANIMATIONS =====
  const workItems = document.querySelectorAll(".work-item")

  workItems.forEach((item) => {
    const decoration = item.querySelector(".work-decoration")

    item.addEventListener("mouseenter", () => {
      if (decoration) {
        decoration.style.transform = "translate(-50%, -50%) scale(1.3)"
        decoration.style.opacity = "0.5"
      }
    })

    item.addEventListener("mouseleave", () => {
      if (decoration) {
        decoration.style.transform = "translate(-50%, -50%) scale(1)"
        decoration.style.opacity = "0.3"
      }
    })
  })

  // ===== CONSOLE SIGNATURE =====
  console.log(
    "%c✨ MOHAMED MOOKA",
    "font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 800; color: #d4af37; text-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);",
  )
  console.log(
    "%c🔒 Cybersecurity Analyst | DFIR Specialist",
    "font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: #b4b4c8;",
  )
  console.log("%c💼 Available for Opportunities", "font-family: 'Inter', sans-serif; font-size: 12px; color: #7a7a94;")

  // ===== PERFORMANCE OPTIMIZATION =====
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.querySelectorAll("*").forEach((el) => {
      el.style.animationDuration = "0.001s"
      el.style.transitionDuration = "0.001s"
    })
  }
})
