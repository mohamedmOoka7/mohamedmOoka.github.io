// Navbar Scroll Effect
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

// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Active Navigation Link
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav-link[href*=" + sectionId + "]")?.classList.add("active")
    } else {
      document.querySelector(".nav-link[href*=" + sectionId + "]")?.classList.remove("active")
    }
  })
}

window.addEventListener("scroll", scrollActive)

// Typing Effect
const texts = ["SOC Analyst", "DFIR Specialist", "Cybersecurity Expert", "Threat Hunter"]

let textIndex = 0
let charIndex = 0
let isDeleting = false
let typingSpeed = 100

const typingElement = document.getElementById("typingText")

function type() {
  const currentText = texts[textIndex]

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1)
    charIndex--
    typingSpeed = 50
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1)
    charIndex++
    typingSpeed = 100
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true
    typingSpeed = 2000
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % texts.length
    typingSpeed = 500
  }

  setTimeout(type, typingSpeed)
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 1000)
})

// Particle Animation
const particlesContainer = document.getElementById("particles")
const particleCount = 50

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement("div")
  particle.className = "particle"

  const size = Math.random() * 4 + 1
  particle.style.width = `${size}px`
  particle.style.height = `${size}px`
  particle.style.left = `${Math.random() * 100}%`
  particle.style.top = `${Math.random() * 100}%`
  particle.style.animationDelay = `${Math.random() * 20}s`
  particle.style.animationDuration = `${Math.random() * 20 + 10}s`

  particlesContainer.appendChild(particle)
}

// Stats Counter Animation
function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-target"))
  const duration = 2000
  const increment = target / (duration / 16)
  let current = 0

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target + "+"
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current)
    }
  }, 16)
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate")

      // Animate stats when they come into view
      if (entry.target.classList.contains("stat-number")) {
        animateCounter(entry.target)
      }
    }
  })
}, observerOptions)

// Observe all elements with data-aos attribute
document.querySelectorAll("[data-aos]").forEach((element) => {
  observer.observe(element)
})

// Smooth Scroll
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

// Form Submission
const contactForm = document.querySelector(".contact-form")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)

  // Here you would typically send the data to a server
  // For now, we'll just show a success message
  alert("Thank you for your message! I will get back to you soon.")
  contactForm.reset()
})

// Cursor Effect (Optional - adds a custom cursor trail)
const cursorDot = document.createElement("div")
cursorDot.className = "cursor-dot"
document.body.appendChild(cursorDot)

document.addEventListener("mousemove", (e) => {
  cursorDot.style.left = e.clientX + "px"
  cursorDot.style.top = e.clientY + "px"
})

// Add cursor dot styles dynamically
const style = document.createElement("style")
style.textContent = `
    .cursor-dot {
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.6;
        transition: transform 0.2s ease;
    }
`
document.head.appendChild(style)

// Project Card Tilt Effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
  })
})

// Loading Animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Easter Egg - Konami Code
let konamiCode = []
const konamiPattern = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.key)
  konamiCode = konamiCode.slice(-10)

  if (konamiCode.join("") === konamiPattern.join("")) {
    document.body.style.filter = "hue-rotate(180deg)"
    setTimeout(() => {
      document.body.style.filter = "none"
    }, 3000)
  }
})

console.log("%c💻 Cybersecurity Portfolio by Mohamed Mooka", "font-size: 20px; color: #00ff88; font-weight: bold;")
console.log("%c🔒 Securing the digital world, one line of code at a time", "font-size: 14px; color: #0066ff;")
