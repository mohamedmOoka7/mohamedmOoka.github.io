// ==================================================
// CUSTOM CURSOR
// ==================================================

const cursor = document.querySelector(".cursor")
const cursorFollower = document.querySelector(".cursor-follower")

let mouseX = 0
let mouseY = 0
let followerX = 0
let followerY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY

  if (cursor) {
    cursor.style.left = mouseX + "px"
    cursor.style.top = mouseY + "px"
  }
})

function animateFollower() {
  const diffX = mouseX - followerX
  const diffY = mouseY - followerY

  followerX += diffX * 0.1
  followerY += diffY * 0.1

  if (cursorFollower) {
    cursorFollower.style.left = followerX + "px"
    cursorFollower.style.top = followerY + "px"
  }

  requestAnimationFrame(animateFollower)
}

animateFollower()

// Cursor hover effects
const interactiveElements = document.querySelectorAll("a, button, .card, .project-card")
interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    if (cursorFollower) {
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.opacity = "0.5"
    }
  })

  el.addEventListener("mouseleave", () => {
    if (cursorFollower) {
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.opacity = "0.3"
    }
  })
})

// ==================================================
// NAVBAR SCROLL EFFECT
// ==================================================

const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// ==================================================
// STATS COUNTER ANIMATION
// ==================================================

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-target"))
  const duration = 2000
  const increment = target / (duration / 16)
  let current = 0

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target + (element.textContent.includes("%") ? "" : "+")
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current) + (element.textContent.includes("%") ? "" : "+")
    }
  }, 16)
}

// ==================================================
// SCROLL REVEAL ANIMATIONS
// ==================================================

const revealElements = document.querySelectorAll("[data-reveal]")

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")

        // Animate stats when they come into view
        if (entry.target.classList.contains("stats-inline")) {
          const statNumbers = entry.target.querySelectorAll(".stat-number")
          statNumbers.forEach((stat) => {
            if (!stat.classList.contains("animated")) {
              animateCounter(stat)
              stat.classList.add("animated")
            }
          })
        }
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

revealElements.forEach((el) => revealObserver.observe(el))

// Auto-add reveal animation to sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section")
  const cards = document.querySelectorAll(".card, .project-card, .expertise-card, .timeline-item")

  sections.forEach((section) => {
    if (!section.hasAttribute("data-reveal")) {
      section.setAttribute("data-reveal", "")
    }
  })

  cards.forEach((card, index) => {
    if (!card.hasAttribute("data-reveal")) {
      card.setAttribute("data-reveal", "")
      card.style.transitionDelay = `${index * 0.1}s`
    }
  })

  // Re-observe new elements
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    revealObserver.observe(el)
  })

  // Trigger stats animation when in view
  const statsSection = document.querySelector(".stats-inline")
  if (statsSection) {
    statsSection.setAttribute("data-reveal", "")
    revealObserver.observe(statsSection)
  }
})

// ==================================================
// TYPING EFFECT
// ==================================================

const typingText = document.querySelector(".typing-text")
if (typingText) {
  const text = typingText.textContent
  typingText.textContent = ""
  let index = 0

  function type() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index)
      index++
      setTimeout(type, 100)
    }
  }

  setTimeout(type, 500)
}

// ==================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==================================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// ==================================================
// MOBILE MENU TOGGLE
// ==================================================

const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navLinks = document.querySelector(".nav-links")

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    mobileMenuToggle.classList.toggle("active")
  })

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active")
      mobileMenuToggle.classList.remove("active")
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active")
      mobileMenuToggle.classList.remove("active")
    }
  })
}

// ==================================================
// ANIMATED PARTICLES BACKGROUND
// ==================================================

const canvas = document.getElementById("particles-canvas")
const ctx = canvas ? canvas.getContext("2d") : null

if (canvas && ctx) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = (Math.random() - 0.5) * 0.5
      this.size = Math.random() * 2 + 1
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1
    }

    draw() {
      ctx.fillStyle = "rgba(0, 212, 255, 0.5)"
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const particles = []
  const particleCount = 80

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 150)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    connectParticles()

    requestAnimationFrame(animate)
  }

  animate()

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// ==================================================
// PERFORMANCE OPTIMIZATION
// ==================================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Apply debounce to scroll handler
window.addEventListener(
  "scroll",
  debounce(() => {
    // Your scroll logic here
  }, 10),
)

// Log page load
console.log("[v0] Elite portfolio loaded successfully")
console.log("[v0] All animations and interactions initialized")
console.log("[v0] Particle system active")
