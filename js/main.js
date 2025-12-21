// ===============================================
// MODERN PORTFOLIO - JAVASCRIPT
// Mohamed Mooka | 2025
// ===============================================

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href === "#") return

    e.preventDefault()
    const target = document.querySelector(href)

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 20,
        behavior: "smooth",
      })
    }
  })
})

// ================= SCROLL ANIMATIONS =================
const ScrollAnimations = {
  init() {
    const elements = document.querySelectorAll(".hero-content, .about-wrapper, .project-card, .contact-card")

    const observerOptions = {
      threshold: 0.15,
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

    elements.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(el)
    })
  },
}

// ================= PROJECT CARDS HOVER =================
const ProjectCards = {
  init() {
    const cards = document.querySelectorAll(".project-card:not(.project-card-disabled)")

    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      })
    })
  },
}

// ================= CONTACT CARDS INTERACTION =================
const ContactCards = {
  init() {
    const cards = document.querySelectorAll(".contact-card")

    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        const icon = this.querySelector(".contact-icon")
        if (icon) {
          icon.style.transform = "scale(1.1) rotate(5deg)"
          icon.style.transition = "transform 0.3s ease"
        }
      })

      card.addEventListener("mouseleave", function () {
        const icon = this.querySelector(".contact-icon")
        if (icon) {
          icon.style.transform = "scale(1) rotate(0deg)"
        }
      })
    })
  },
}

// ================= YEAR UPDATE =================
const updateYear = () => {
  const yearElement = document.getElementById("year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }
}

// ================= INITIALIZE ALL =================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all features
  ScrollAnimations.init()
  ProjectCards.init()
  ContactCards.init()
  updateYear()

  // Add loaded class for any CSS transitions
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 100)
})

// ================= PERFORMANCE: PASSIVE SCROLL LISTENER =================
let ticking = false

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Add any scroll-based animations here
        ticking = false
      })
      ticking = true
    }
  },
  { passive: true },
)
