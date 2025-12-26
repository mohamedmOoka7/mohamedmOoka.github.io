// ====================================
// Navigation & Mobile Menu
// ====================================
const nav = document.getElementById("nav")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Add scrolled class to nav on scroll
let lastScroll = 0
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 50) {
    nav.classList.add("scrolled")
  } else {
    nav.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// ====================================
// Terminal Animation
// ====================================
const terminal = document.getElementById("terminal")

const terminalCommands = [
  { type: "command", text: "sudo analyze --mode=deep", delay: 0 },
  { type: "output", text: "Initializing security analysis...", delay: 1000 },
  { type: "output", text: "Loading threat intelligence feeds...", delay: 1500 },
  { type: "success", text: "✓ Threat database updated", delay: 2000 },
  { type: "output", text: "Scanning for indicators of compromise...", delay: 2500 },
  { type: "success", text: "✓ 0 threats detected", delay: 3500 },
  { type: "output", text: "Monitoring network traffic...", delay: 4000 },
  { type: "success", text: "✓ All systems secure", delay: 5000 },
  { type: "command", text: "status --verbose", delay: 6000 },
  { type: "success", text: "System Status: Protected ✓", delay: 6500 },
]

let commandIndex = 0

function typeTerminalLine() {
  if (commandIndex >= terminalCommands.length) {
    // Restart animation after all commands
    setTimeout(() => {
      terminal.innerHTML =
        '<div class="terminal-line"><span class="prompt">$</span> <span class="command">sudo analyze --mode=deep</span></div>'
      commandIndex = 0
      setTimeout(typeTerminalLine, 3000)
    }, 5000)
    return
  }

  const cmd = terminalCommands[commandIndex]

  setTimeout(() => {
    const line = document.createElement("div")
    line.className = "terminal-line"

    if (cmd.type === "command") {
      line.innerHTML = `<span class="prompt">$</span> <span class="command">${cmd.text}</span>`
    } else if (cmd.type === "success") {
      line.innerHTML = `<span class="output success">${cmd.text}</span>`
    } else {
      line.innerHTML = `<span class="output">${cmd.text}</span>`
    }

    terminal.appendChild(line)
    terminal.scrollTop = terminal.scrollHeight

    commandIndex++
    typeTerminalLine()
  }, cmd.delay)
}

// Start terminal animation
setTimeout(() => {
  typeTerminalLine()
}, 1000)

// ====================================
// Smooth Scroll Enhancement
// ====================================
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

// ====================================
// Intersection Observer for Animations
// ====================================
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

// Observe all sections for fade-in animation
document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "all 0.8s ease"
  observer.observe(section)
})

// Observe skill categories
document.querySelectorAll(".skill-category").forEach((category, index) => {
  category.style.opacity = "0"
  category.style.transform = "translateY(30px)"
  category.style.transition = `all 0.6s ease ${index * 0.1}s`
  observer.observe(category)
})

// Observe project cards
document.querySelectorAll(".project-card").forEach((card, index) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(30px)"
  card.style.transition = `all 0.6s ease ${index * 0.1}s`
  observer.observe(card)
})

// ====================================
// Active Navigation Link
// ====================================
const sections = document.querySelectorAll(".section, .hero")

function updateActiveLink() {
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

window.addEventListener("scroll", updateActiveLink)

// ====================================
// Typing Effect for Hero Subtitle
// ====================================
const typingText = document.querySelector(".typing-text")
const textToType = "Cybersecurity Analyst"
let charIndex = 0

function typeCharacter() {
  if (charIndex < textToType.length) {
    typingText.textContent = textToType.substring(0, charIndex + 1)
    charIndex++
    setTimeout(typeCharacter, 100)
  }
}

// Start typing effect after page load
window.addEventListener("load", () => {
  typingText.textContent = ""
  setTimeout(typeCharacter, 500)
})

// ====================================
// Performance: Reduce animations on slow devices
// ====================================
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll('[style*="transition"]').forEach((element) => {
    element.style.transition = "none"
  })
}

console.log("[v0] Portfolio website initialized successfully")
