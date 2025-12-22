// Mobile Navigation Toggle
const mobileToggle = document.getElementById("mobileToggle")
const navMenu = document.getElementById("navMenu")

mobileToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  mobileToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    mobileToggle.classList.remove("active")
  })
})

// Navbar scroll effect
const nav = document.getElementById("nav")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    nav.classList.add("scrolled")
  } else {
    nav.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
  const start = 0
  const increment = target / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target + "+"
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current) + "+"
    }
  }, 16)
}

// Intersection Observer for counter animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statValue = entry.target
      const target = Number.parseInt(statValue.getAttribute("data-target"))
      animateCounter(statValue, target)
      statsObserver.unobserve(statValue)
    }
  })
}, observerOptions)

// Observe all stat values
document.querySelectorAll(".stat-value").forEach((stat) => {
  statsObserver.observe(stat)
})

// Smooth scroll with offset for fixed nav
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

// Intersection Observer for fade-in animations
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

// Add fade-in animation to sections
document.querySelectorAll(".about-card, .skill-category, .project-card, .contact-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  fadeObserver.observe(el)
})

// Terminal typing animation (enhanced)
const terminalCommands = document.querySelectorAll(".typing-animation")
terminalCommands.forEach((cmd) => {
  const text = cmd.textContent
  cmd.textContent = ""
  let i = 0

  const typing = setInterval(() => {
    if (i < text.length) {
      cmd.textContent += text.charAt(i)
      i++
    } else {
      clearInterval(typing)
    }
  }, 100)
})

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active")
    mobileToggle.classList.remove("active")
  }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")
  const heroTerminal = document.querySelector(".hero-terminal")

  if (heroContent && window.innerWidth > 768) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`
    heroTerminal.style.transform = `translateY(${scrolled * 0.2}px)`
  }
})

// Performance optimization: Debounce scroll events
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

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

const highlightNav = debounce(() => {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
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
}, 100)

window.addEventListener("scroll", highlightNav)

// Lazy loading for images (if any additional images are added)
if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]')
  images.forEach((img) => {
    img.src = img.dataset.src
  })
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement("script")
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"
  document.body.appendChild(script)
}

// Console message for developers
console.log("%c👋 Hello there!", "font-size: 20px; font-weight: bold; color: #3b82f6;")
console.log("%cInterested in the code? Check out the GitHub repo!", "font-size: 14px; color: #94a3b8;")
console.log("%chttps://github.com/mohamedmOoka7", "font-size: 14px; color: #10b981;")
