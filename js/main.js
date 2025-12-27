// =============================================
// PREMIUM PORTFOLIO INTERACTIONS
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  // ===== SCROLL PROGRESS =====
  const scrollProgress = document.querySelector(".scroll-progress")

  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight - windowHeight
    const scrolled = window.scrollY
    const progress = (scrolled / documentHeight) * 100

    if (scrollProgress) {
      scrollProgress.style.transform = `scaleX(${progress / 100})`
    }
  })

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  function highlightNavigation() {
    const scrollY = window.scrollY

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 150
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

  window.addEventListener("scroll", highlightNavigation)

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

  // ===== SCROLL REVEAL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const animatedElements = document.querySelectorAll(".section-header, .about-card, .project-card, .contact-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    observer.observe(el)
  })

  // ===== PARALLAX ORBS =====
  const orbs = document.querySelectorAll(".gradient-orb")

  window.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.05
      const x = (mouseX - 0.5) * 100 * speed
      const y = (mouseY - 0.5) * 100 * speed

      orb.style.transform = `translate(${x}px, ${y}px)`
    })
  })

  // ===== CONSOLE MESSAGE =====
  console.log(
    "%c🔒 MOHAMED MOOKA - CYBERSECURITY ANALYST",
    "font-size: 18px; font-weight: 800; color: #00d4ff; text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);",
  )
  console.log("%c⚡ Premium Portfolio Design", "font-size: 14px; color: #a1a1aa;")
  console.log("%c🛡️ DFIR | SOC | THREAT HUNTING", "font-size: 12px; color: #52525b;")
})
