// ==========================================
// MINIMAL PROFESSIONAL PORTFOLIO JS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  initNavigation()
  initExperienceTabs()
  initScrollReveal()
  initCursorEffect()
})

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
  const nav = document.querySelector(".nav")
  const navToggle = document.querySelector(".nav-toggle")
  const navLinks = document.querySelector(".nav-links")
  let lastScrollY = window.scrollY

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled")
    } else {
      nav.classList.remove("scrolled")
    }
    lastScrollY = window.scrollY
  })

  // Mobile menu
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      navToggle.classList.toggle("active")
      document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : ""
    })

    // Close menu on link click
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
        navToggle.classList.remove("active")
        document.body.style.overflow = ""
      })
    })
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    })
  })
}

// ==========================================
// EXPERIENCE TABS
// ==========================================
function initExperienceTabs() {
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabPanels = document.querySelectorAll(".tab-panel")

  if (tabButtons.length === 0) return

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab")

      // Remove active from all
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabPanels.forEach((panel) => panel.classList.remove("active"))

      // Add active to selected
      button.classList.add("active")
      document.getElementById(targetTab).classList.add("active")
    })
  })
}

// ==========================================
// SCROLL REVEAL
// ==========================================
function initScrollReveal() {
  const sections = document.querySelectorAll(".section")

  const observerOptions = {
    threshold: 0.15,
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

  sections.forEach((section, index) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(20px)"
    section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(section)
  })
}

// ==========================================
// CURSOR EFFECT
// ==========================================
function initCursorEffect() {
  const interactiveElements = document.querySelectorAll("a, button, .project-card, .other-project-card")

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", (e) => {
      element.style.transition = "all 0.3s ease"
    })
  })

  const createScrollIndicator = () => {
    const indicator = document.createElement("div")
    indicator.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #60a5fa, #93c5fd);
      z-index: 9999;
      transition: width 0.1s ease;
    `
    document.body.appendChild(indicator)

    window.addEventListener("scroll", () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (window.scrollY / windowHeight) * 100
      indicator.style.width = scrolled + "%"
    })
  }

  createScrollIndicator()
}
