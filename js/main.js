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
console.log("[v0] Portfolio loaded successfully")
console.log("[v0] All animations and interactions initialized")
