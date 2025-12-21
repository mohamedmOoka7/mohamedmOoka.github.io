// ============================================
// CYBERSECURITY PORTFOLIO - INTERACTIVE JS
// Mohamed Mooka - Enhanced Version
// ============================================

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ==================== FLOATING NAV ACTIVE STATE ====================
const sections = document.querySelectorAll("section[id]")
const navDots = document.querySelectorAll(".nav-dot")

function updateActiveNav() {
  let current = ""
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200
    const sectionHeight = section.offsetHeight

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navDots.forEach((dot) => {
    dot.classList.remove("active")
    if (dot.getAttribute("data-section") === current) {
      dot.classList.add("active")
    }
  })
}

window.addEventListener("scroll", updateActiveNav)

// ==================== BACK TO TOP BUTTON ====================
const backToTopBtn = document.querySelector(".back-to-top")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    backToTopBtn.classList.add("visible")
  } else {
    backToTopBtn.classList.remove("visible")
  }
})

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ==================== SCROLL REVEAL ANIMATIONS ====================
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active")
    }
  })
}, observerOptions)

// Observe all cards and sections
document.querySelectorAll(".card, .project-card, .contact-card").forEach((el) => {
  el.classList.add("reveal")
  observer.observe(el)
})

// ==================== TYPING EFFECT ENHANCEMENT ====================
const typingElement = document.querySelector(".typing-effect")
const phrases = [
  "Cybersecurity Analyst | DFIR & SOC Operations",
  "Digital Forensics Specialist",
  "Incident Response Handler",
  "SOC Analyst",
]

let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let typingDelay = 100

function typeEffect() {
  if (!typingElement) return

  const currentPhrase = phrases[phraseIndex]

  if (isDeleting) {
    typingElement.textContent = currentPhrase.substring(0, charIndex - 1)
    charIndex--
    typingDelay = 50
  } else {
    typingElement.textContent = currentPhrase.substring(0, charIndex + 1)
    charIndex++
    typingDelay = 100
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typingDelay = 2500
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    typingDelay = 500
  }

  setTimeout(typeEffect, typingDelay)
}

// Start typing effect after page load
setTimeout(typeEffect, 1000)

// ==================== PARALLAX EFFECT ====================
let ticking = false

function updateParallax() {
  const scrolled = window.pageYOffset
  const heroGrid = document.querySelector(".hero-grid")
  const particles = document.querySelector(".particles")

  if (heroGrid) {
    heroGrid.style.transform = `translateY(${scrolled * 0.5}px)`
  }

  if (particles) {
    particles.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0003})`
  }

  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax)
    ticking = true
  }
})

// ==================== UPDATE YEAR IN FOOTER ====================
const yearElement = document.getElementById("year")
if (yearElement) {
  yearElement.textContent = new Date().getFullYear()
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const debouncedUpdateNav = debounce(updateActiveNav, 100)
window.addEventListener("scroll", debouncedUpdateNav)

// ==================== CONSOLE SIGNATURE ====================
console.log("%c🔒 Mohamed Mooka - Cybersecurity Portfolio", "color: #00d9ff; font-size: 20px; font-weight: bold;")
console.log("%cDFIR Specialist | SOC Analyst | Incident Handler", "color: #0066ff; font-size: 14px;")
console.log("%cBuilt with passion for security 🛡️", "color: #6b7a8f; font-size: 12px;")
