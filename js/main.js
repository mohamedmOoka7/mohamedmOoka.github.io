// ================================================
// MODERN CYBERSECURITY PORTFOLIO - JAVASCRIPT
// ================================================

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  initNavigation()
  initScrollAnimations()
  initTerminal()
  initCursorGlow()
  initStatCounters()
  initSkillBars()
  initParticles()
  initContactForm()
  updateYear()
})

// ================ NAVIGATION ================
function initNavigation() {
  const navbar = document.getElementById("navbar")
  const mobileToggle = document.getElementById("mobile-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    mobileToggle.classList.toggle("active")
  })

  // Close mobile menu on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      mobileToggle.classList.remove("active")
    })
  })

  // Active link on scroll
  const sections = document.querySelectorAll(".section, .hero")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.pageYOffset >= sectionTop - 200) {
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
}

// ================ SCROLL ANIMATIONS ================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all cards and sections
  const elements = document.querySelectorAll(".project-card, .skill-category, .contact-card, .about-content")
  elements.forEach((el) => observer.observe(el))
}

// ================ TERMINAL ANIMATION ================
function initTerminal() {
  const terminalOutput = document.getElementById("terminal-output")

  const commands = [
    { text: "$ initiating threat detection scan...", delay: 0 },
    { text: "[+] Loading security modules...", delay: 1000 },
    { text: "[+] Analyzing network traffic...", delay: 2000 },
    { text: "[!] Suspicious activity detected at 192.168.1.45", delay: 3500 },
    { text: "[+] Running DFIR protocols...", delay: 5000 },
    { text: "[+] Extracting forensic artifacts...", delay: 6500 },
    { text: "[✓] Timeline reconstruction complete", delay: 8000 },
    { text: "[✓] IOCs identified: 15", delay: 9000 },
    { text: "[✓] Malware signature: APT-2024-001", delay: 10000 },
    { text: "$ Incident contained. Generating report...", delay: 11500 },
    { text: "", delay: 13000 },
  ]

  let commandIndex = 0

  function typeCommand() {
    if (commandIndex < commands.length) {
      setTimeout(
        () => {
          const line = document.createElement("div")
          line.className = "terminal-line"
          line.textContent = commands[commandIndex].text

          // Add color coding
          if (line.textContent.includes("[!]")) {
            line.style.color = "#ff006e"
          } else if (line.textContent.includes("[✓]")) {
            line.style.color = "#27c93f"
          } else if (line.textContent.includes("[+]")) {
            line.style.color = "#00d4ff"
          }

          terminalOutput.appendChild(line)
          terminalOutput.scrollTop = terminalOutput.scrollHeight

          commandIndex++
          typeCommand()
        },
        commands[commandIndex].delay - (commandIndex > 0 ? commands[commandIndex - 1].delay : 0),
      )
    } else {
      // Restart animation after a pause
      setTimeout(() => {
        terminalOutput.innerHTML = ""
        commandIndex = 0
        typeCommand()
      }, 5000)
    }
  }

  typeCommand()
}

// ================ CURSOR GLOW EFFECT ================
function initCursorGlow() {
  const cursorGlow = document.querySelector(".cursor-glow")
  let mouseX = 0
  let mouseY = 0
  let glowX = 0
  let glowY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    cursorGlow.style.opacity = "0.5"
  })

  document.addEventListener("mouseleave", () => {
    cursorGlow.style.opacity = "0"
  })

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1
    glowY += (mouseY - glowY) * 0.1

    cursorGlow.style.left = `${glowX - 250}px`
    cursorGlow.style.top = `${glowY - 250}px`

    requestAnimationFrame(animateGlow)
  }

  animateGlow()
}

// ================ STAT COUNTERS ================
function initStatCounters() {
  const statNumbers = document.querySelectorAll(".stat-number")
  let counted = false

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counted) {
          counted = true
          statNumbers.forEach((stat) => {
            const target = Number.parseInt(stat.getAttribute("data-target"))
            animateCounter(stat, target)
          })
        }
      })
    },
    { threshold: 0.5 },
  )

  const heroStats = document.querySelector(".hero-stats")
  if (heroStats) observer.observe(heroStats)
}

function animateCounter(element, target) {
  let current = 0
  const increment = target / 100
  const duration = 2000
  const stepTime = duration / 100

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target + "+"
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current)
    }
  }, stepTime)
}

// ================ SKILL BARS ANIMATION ================
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progress = entry.target.getAttribute("data-progress")
          entry.target.style.width = progress + "%"
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => observer.observe(bar))
}

// ================ PARTICLES CANVAS ================
function initParticles() {
  const canvas = document.getElementById("particles-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = (Math.random() - 0.5) * 0.5
      this.opacity = Math.random() * 0.5
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
      ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`
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

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    // Draw connections
    particles.forEach((particleA, indexA) => {
      particles.slice(indexA + 1).forEach((particleB) => {
        const dx = particleA.x - particleB.x
        const dy = particleA.y - particleB.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 120) {
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 120)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particleA.x, particleA.y)
          ctx.lineTo(particleB.x, particleB.y)
          ctx.stroke()
        }
      })
    })

    requestAnimationFrame(animate)
  }

  animate()

  // Resize canvas on window resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// ================ CONTACT FORM ================
function initContactForm() {
  const form = document.getElementById("contact-form")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      }

      // Show success message
      alert("Thank you for your message! I will get back to you soon.")
      form.reset()

      // In a real application, you would send this data to a server
      console.log("Form data:", formData)
    })
  }
}

// ================ UPDATE YEAR ================
function updateYear() {
  const yearElement = document.getElementById("current-year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }
}

// ================ SMOOTH SCROLL ================
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
