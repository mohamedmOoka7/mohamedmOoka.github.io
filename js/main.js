// ===========================
// Smooth Scroll Animation
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href")

    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ===========================
// Intersection Observer for Scroll Animations
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe all sections and project cards
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in class to elements that should animate on scroll
  const animatedElements = document.querySelectorAll(".section-header, .about-content, .project-card, .footer-content")

  animatedElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// ===========================
// Project Card Interactions
// ===========================
const projectCards = document.querySelectorAll(".project-card")

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.zIndex = "10"
  })

  card.addEventListener("mouseleave", function () {
    this.style.zIndex = "1"
  })

  // Add click handler for project cards (can be customized)
  card.addEventListener("click", function (e) {
    // Prevent if clicking on a link inside the card
    if (e.target.tagName === "A") return

    const projectTitle = this.querySelector(".project-title").textContent
    console.log("Project clicked:", projectTitle)
    // You can add navigation or modal logic here
  })
})

// ===========================
// Dynamic Grid Background Animation
// ===========================
const gridOverlay = document.querySelector(".grid-overlay")

if (gridOverlay) {
  let mouseX = 0
  let mouseY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    const xPercent = (mouseX / window.innerWidth) * 20 - 10
    const yPercent = (mouseY / window.innerHeight) * 20 - 10

    gridOverlay.style.transform = `translate(${xPercent}px, ${yPercent}px)`
  })
}

// ===========================
// Performance: Reduce animations on low-power devices
// ===========================
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

if (prefersReducedMotion.matches) {
  document.documentElement.style.scrollBehavior = "auto"

  // Disable complex animations
  const style = document.createElement("style")
  style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
        }
    `
  document.head.appendChild(style)
}

// ===========================
// Add subtle parallax effect to hero section
// ===========================
let ticking = false

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset
      const hero = document.querySelector(".hero-content")
      const heroDecoration = document.querySelector(".hero-decoration")

      if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8
      }

      if (heroDecoration && scrolled < window.innerHeight) {
        heroDecoration.style.transform = `translateY(${scrolled * 0.15}px)`
      }

      ticking = false
    })

    ticking = true
  }
})

// ===========================
// Stats Counter Animation (when visible)
// ===========================
const statItems = document.querySelectorAll(".stat-item")

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease forwards"
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

statItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`
  item.style.opacity = "0"
  statsObserver.observe(item)
})

// ===========================
// Initialize
// ===========================
console.log("Portfolio initialized successfully")
