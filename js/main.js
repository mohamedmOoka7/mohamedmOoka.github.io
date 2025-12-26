// ================================
// Theme Toggle
// ================================
const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement
 
// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem("theme") || "dark"
html.setAttribute("data-theme", currentTheme)
 
themeToggle.addEventListener("click", () => {
  const theme = html.getAttribute("data-theme") === "dark" ? "light" : "dark"
  html.setAttribute("data-theme", theme)
  localStorage.setItem("theme", theme)
})
 
// ================================
// Mobile Menu
// ================================
const menuBtn = document.getElementById("menuBtn")
const navMenu = document.getElementById("navMenu")
 
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active")
  navMenu.classList.toggle("active")
})
 
// Close menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active")
    navMenu.classList.remove("active")
  })
})
 
// ================================
// Navbar Scroll Effect
// ================================
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
 
// ================================
// Active Navigation Link
// ================================
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")
 
window.addEventListener("scroll", () => {
  let current = ""
 
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })
 
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})
 
// ================================
// Stats Counter Animation
// ================================
const stats = document.querySelectorAll(".stat-number")
let animated = false
 
const animateStats = () => {
  if (animated) return
 
  stats.forEach((stat) => {
    const target = Number.parseInt(stat.getAttribute("data-target"))
    const increment = target / 100
    let current = 0
 
    const updateCount = () => {
      if (current < target) {
        current += increment
        stat.textContent = Math.ceil(current)
        setTimeout(updateCount, 20)
      } else {
        stat.textContent = target + (target === 100 ? "+" : "")
      }
    }
 
    updateCount()
  })
 
  animated = true
}
 
// Trigger animation when stats section is in view
const statsSection = document.querySelector(".stats")
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats()
      }
    })
  },
  { threshold: 0.5 },
)
 
if (statsSection) {
  observer.observe(statsSection)
}
 
// ================================
// Scroll Animations (AOS-like)
// ================================
const animateOnScroll = () => {
  const elements = document.querySelectorAll("[data-aos]")
 
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150
 
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("aos-animate")
    }
  })
}
 
window.addEventListener("scroll", animateOnScroll)
window.addEventListener("load", animateOnScroll)
 
// ================================
// Back to Top Button
// ================================
const backToTop = document.getElementById("backToTop")
 
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add("visible")
  } else {
    backToTop.classList.remove("visible")
  }
})
 
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})
 
// ================================
// Custom Cursor
// ================================
const cursorDot = document.querySelector("[data-cursor-dot]")
const cursorOutline = document.querySelector("[data-cursor-outline]")
 
if (window.innerWidth > 768) {
  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX
    const posY = e.clientY
 
    cursorDot.style.left = `${posX}px`
    cursorDot.style.top = `${posY}px`
 
    cursorOutline.style.left = `${posX}px`
    cursorOutline.style.top = `${posY}px`
  })
 
  // Cursor effects on interactive elements
  const interactiveElements = document.querySelectorAll("a, button, .work-card, .skill-card, .cert-card")
 
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorOutline.style.width = "50px"
      cursorOutline.style.height = "50px"
    })
 
    element.addEventListener("mouseleave", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
      cursorOutline.style.width = "32px"
      cursorOutline.style.height = "32px"
    })
  })
}
 
// ================================
// Particles Animation (Canvas)
// ================================
const canvas = document.getElementById("particles")
const ctx = canvas.getContext("2d")
 
canvas.width = window.innerWidth
canvas.height = window.innerHeight
 
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 2 + 0.5
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 - 0.25
    this.opacity = Math.random() * 0.5 + 0.2
  }
 
  update() {
    this.x += this.speedX
    this.y += this.speedY
 
    if (this.x > canvas.width) this.x = 0
    if (this.x < 0) this.x = canvas.width
    if (this.y > canvas.height) this.y = 0
    if (this.y < 0) this.y = canvas.height
  }
 
  draw() {
    ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}
 
const particlesArray = []
const numberOfParticles = 100
 
for (let i = 0; i < numberOfParticles; i++) {
  particlesArray.push(new Particle())
}
 
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
 
  particlesArray.forEach((particle) => {
    particle.update()
    particle.draw()
  })
 
  // Connect particles
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i + 1; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x
      const dy = particlesArray[i].y - particlesArray[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)
 
      if (distance < 150) {
        ctx.strokeStyle = `rgba(0, 217, 255, ${0.2 * (1 - distance / 150)})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
        ctx.stroke()
      }
    }
  }
 
  requestAnimationFrame(animateParticles)
}
 
animateParticles()
 
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})
 
// ================================
// Contact Form Handler
// ================================
const contactForm = document.getElementById("contactForm")
 
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()
 
  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)
 
  // Here you would typically send the data to a backend
  console.log("Form submitted:", data)
 
  // Show success message (you can customize this)
  alert("Thank you for your message! I will get back to you soon.")
  contactForm.reset()
})
 
// ================================
// Smooth Scroll for Anchor Links
// ================================
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
 
// ================================
// Lazy Loading Images
// ================================
const images = document.querySelectorAll("img[data-src]")
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.removeAttribute("data-src")
      observer.unobserve(img)
    }
  })
})
 
images.forEach((img) => imageObserver.observe(img))
 
// ================================
// Console Message
// ================================
console.log("%c👋 Hello, Fellow Developer!", "color: #00d9ff; font-size: 20px; font-weight: bold;")
console.log("%cInterested in how this portfolio was built?", "color: #a0a0b5; font-size: 14px;")
console.log("%cCheck out the source code on my GitHub!", "color: #a0a0b5; font-size: 14px;")
console.log("%c🔒 Stay secure, stay curious!", "color: #00ff88; font-size: 16px; font-weight: bold;")
 
