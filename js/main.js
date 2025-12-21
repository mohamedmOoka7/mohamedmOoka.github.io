// ============================================
// CYBERSECURITY PORTFOLIO - INTERACTIVE JS
// Mohamed Mooka
// ============================================

// ==================== SMOOTH SCROLL ====================
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

      // Close mobile menu if open
      const mobileMenu = document.querySelector(".mobile-menu")
      if (mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active")
      }
    }
  })
})

// ==================== MOBILE MENU TOGGLE ====================
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const mobileMenu = document.querySelector(".mobile-menu")

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")

    // Animate hamburger icon
    const spans = mobileMenuBtn.querySelectorAll("span")
    if (mobileMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translateY(10px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translateY(-10px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })
}

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector(".top-nav")
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

// ==================== INTERSECTION OBSERVER - ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections
document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease"
  observer.observe(section)
})

// ==================== TERMINAL TYPING EFFECT ====================
const terminalCommands = [
  "investigate --threat-hunting",
  "analyze --malware-sample",
  "hunt --advanced-threats",
  "forensics --memory-dump",
]

let commandIndex = 0
let charIndex = 0
let isDeleting = false
let typingSpeed = 100

const typingElement = document.querySelector(".typing-animation")

function typeCommand() {
  if (!typingElement) return

  const currentCommand = terminalCommands[commandIndex]

  if (isDeleting) {
    typingElement.textContent = currentCommand.substring(0, charIndex - 1)
    charIndex--
    typingSpeed = 50
  } else {
    typingElement.textContent = currentCommand.substring(0, charIndex + 1)
    charIndex++
    typingSpeed = 100
  }

  if (!isDeleting && charIndex === currentCommand.length) {
    // Pause at end
    typingSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    commandIndex = (commandIndex + 1) % terminalCommands.length
    typingSpeed = 500
  }

  setTimeout(typeCommand, typingSpeed)
}

// Start typing effect
setTimeout(typeCommand, 1000)

// ==================== UPDATE YEAR IN FOOTER ====================
const yearElement = document.getElementById("year")
if (yearElement) {
  yearElement.textContent = new Date().getFullYear()
}

// ==================== ACTIVE NAV LINK ON SCROLL ====================
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 150
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`)

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.style.color = ""
      })
      if (navLink) {
        navLink.style.color = "var(--color-primary-light)"
      }
    }
  })
})

// ==================== PARALLAX EFFECT FOR ORBS ====================
window.addEventListener("mousemove", (e) => {
  const orbs = document.querySelectorAll(".gradient-orb")
  const x = e.clientX / window.innerWidth
  const y = e.clientY / window.innerHeight

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 20
    const xMove = (x - 0.5) * speed
    const yMove = (y - 0.5) * speed

    orb.style.transform = `translate(${xMove}px, ${yMove}px)`
  })
})

// ==================== CONSOLE LOG ====================
console.log("%c🔒 Mohamed Mooka - Cybersecurity Portfolio", "color: #3b82f6; font-size: 20px; font-weight: bold;")
console.log("%cSpecializing in DFIR & SOC Operations", "color: #06b6d4; font-size: 14px;")
console.log("%cInterested in collaboration? Reach out!", "color: #94a3b8; font-size: 12px;")

// ==================== PREVENT INSPECT ELEMENT (Optional) ====================
// Uncomment if you want to add basic protection
/*
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
      (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
      (e.ctrlKey && e.keyCode === 85)) { // Ctrl+U
    e.preventDefault();
  }
});
*/
