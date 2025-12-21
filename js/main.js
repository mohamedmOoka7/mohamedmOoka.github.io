// Navbar scroll effect
const navbar = document.getElementById("navbar")
const navLinks = document.querySelectorAll(".nav-link")
const menuToggle = document.getElementById("menuToggle")
const navMenu = document.getElementById("navMenu")

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)
    const offsetTop = targetSection.offsetTop - 80

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  })
})

// Particles animation in hero section
function createParticles() {
  const particlesContainer = document.getElementById("particles")
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.style.position = "absolute"
    particle.style.width = Math.random() * 3 + "px"
    particle.style.height = particle.style.width
    particle.style.background = "rgba(0, 255, 136, 0.5)"
    particle.style.borderRadius = "50%"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`
    particle.style.animationDelay = Math.random() * 5 + "s"
    particlesContainer.appendChild(particle)
  }
}

createParticles()

// Intersection Observer for fade-in animations
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

// Observe all sections and cards
document.querySelectorAll("section, .skill-category, .project-card, .cert-card, .timeline-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(50px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Contact form handling
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value

  // Here you would normally send the data to a server
  // For now, we'll just show an alert
  alert(`Thank you ${name}!\n\nYour message has been received and I will reply to you soon at ${email}`)

  // Reset form
  contactForm.reset()
})

// Typing effect for hero subtitle
const typingText = document.querySelector(".typing-text")
const text = typingText.textContent
typingText.textContent = ""
let charIndex = 0

function typeWriter() {
  if (charIndex < text.length) {
    typingText.textContent += text.charAt(charIndex)
    charIndex++
    setTimeout(typeWriter, 100)
  }
}

// Start typing effect when page loads
window.addEventListener("load", () => {
  setTimeout(typeWriter, 500)
})

// Add active class to current navigation item
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 100) {
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

// Scroll to top button functionality
const scrollIndicator = document.querySelector(".scroll-indicator")
scrollIndicator.addEventListener("click", () => {
  const aboutSection = document.getElementById("about")
  aboutSection.scrollIntoView({ behavior: "smooth" })
})

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")
  const securityShield = document.querySelector(".security-shield")

  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`
  }

  if (securityShield) {
    securityShield.style.transform = `translateY(${scrolled * 0.2}px) rotate(${scrolled * 0.1}deg)`
  }
})

// Add hover effect to skill tags
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1) rotate(2deg)"
  })

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) rotate(0deg)"
  })
})

// Dynamic year in footer
const currentYear = new Date().getFullYear()
document.querySelector(".footer-text p").innerHTML = `&copy; ${currentYear} Mohamed Mooka. All Rights Reserved.`

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})

console.log(
  "%c🔒 Portfolio by Mohamed Mooka - Cybersecurity Analyst & DFIR Specialist",
  "color: #00ff88; font-size: 16px; font-weight: bold;",
)
console.log(
  "%c⚠️ Warning: This is a browser console. Pasting code here can be dangerous!",
  "color: #ff0055; font-size: 14px; font-weight: bold;",
)
