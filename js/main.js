document.addEventListener("DOMContentLoaded", () => {
  // ===== MATRIX RAIN ANIMATION =====
  const matrixCanvas = document.getElementById("matrixCanvas")
  const matrixCtx = matrixCanvas.getContext("2d")

  function resizeMatrixCanvas() {
    matrixCanvas.width = window.innerWidth
    matrixCanvas.height = window.innerHeight
  }
  resizeMatrixCanvas()
  window.addEventListener("resize", resizeMatrixCanvas)

  // Matrix rain characters
  const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
  const fontSize = 14
  const columns = matrixCanvas.width / fontSize
  const drops = []

  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100
  }

  function drawMatrix() {
    matrixCtx.fillStyle = "rgba(10, 10, 10, 0.05)"
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height)

    matrixCtx.fillStyle = "#3b82f6"
    matrixCtx.font = fontSize + "px monospace"

    for (let i = 0; i < drops.length; i++) {
      const char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
      const x = i * fontSize
      const y = drops[i] * fontSize

      matrixCtx.fillText(char, x, y)

      if (y > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  setInterval(drawMatrix, 50)

  // ===== PARTICLES ANIMATION =====
  const particlesCanvas = document.getElementById("particlesCanvas")
  const particlesCtx = particlesCanvas.getContext("2d")

  function resizeParticlesCanvas() {
    particlesCanvas.width = window.innerWidth
    particlesCanvas.height = window.innerHeight
  }
  resizeParticlesCanvas()
  window.addEventListener("resize", resizeParticlesCanvas)

  const particles = []
  const particleCount = 60
  const connectionDistance = 150

  class Particle {
    constructor() {
      this.x = Math.random() * particlesCanvas.width
      this.y = Math.random() * particlesCanvas.height
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = (Math.random() - 0.5) * 0.5
      this.radius = Math.random() * 2 + 1
      this.opacity = Math.random() * 0.5 + 0.3
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0 || this.x > particlesCanvas.width) this.vx *= -1
      if (this.y < 0 || this.y > particlesCanvas.height) this.vy *= -1
    }

    draw() {
      particlesCtx.beginPath()
      particlesCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      particlesCtx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`
      particlesCtx.fill()
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  const mouse = { x: null, y: null, radius: 150 }

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x
    mouse.y = e.y
  })

  window.addEventListener("mouseleave", () => {
    mouse.x = null
    mouse.y = null
  })

  function animateParticles() {
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height)

    particles.forEach((particle) => {
      particle.update()
      particle.draw()

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius
          const angle = Math.atan2(dy, dx)
          particle.vx -= Math.cos(angle) * force * 0.15
          particle.vy -= Math.sin(angle) * force * 0.15
        }
      }
    })

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.2
          particlesCtx.beginPath()
          particlesCtx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
          particlesCtx.lineWidth = 1
          particlesCtx.moveTo(particles[i].x, particles[i].y)
          particlesCtx.lineTo(particles[j].x, particles[j].y)
          particlesCtx.stroke()
        }
      }
    }

    requestAnimationFrame(animateParticles)
  }

  animateParticles()

  // ===== NAVIGATION =====
  const nav = document.querySelector(".nav")
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section[id]")
  const menuBtn = document.querySelector(".menu-btn")

  function updateActiveNav() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 200
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", updateActiveNav)
  updateActiveNav()

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active")
      menuBtn.classList.toggle("active")
    })

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active")
        menuBtn.classList.remove("active")
      })
    })

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove("active")
        menuBtn.classList.remove("active")
      }
    })
  }

  // ===== SMOOTH SCROLL =====
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")

      if (href !== "#" && href.length > 1) {
        e.preventDefault()

        const target = document.querySelector(href)
        if (target) {
          const offsetTop = target.offsetTop - 80

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // ===== SCROLL ANIMATIONS =====
  const animatedElements = document.querySelectorAll("[data-animate]")

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  }

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-delay") || 0
        setTimeout(() => {
          entry.target.classList.add("animated")
        }, delay)
        scrollObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  animatedElements.forEach((element) => {
    scrollObserver.observe(element)
  })

  // ===== PARALLAX EFFECT FOR GRADIENT ORBS =====
  const orbs = document.querySelectorAll(".gradient-orb")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.05
      orb.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // ===== WORK CARD SPOTLIGHT =====
  const workCards = document.querySelectorAll(".work-card")

  workCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      card.style.setProperty("--mouse-x", `${x}%`)
      card.style.setProperty("--mouse-y", `${y}%`)
    })
  })

  // ===== MAGNETIC BUTTONS =====
  const magneticButtons = document.querySelectorAll(".btn-primary, .btn-secondary")

  magneticButtons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
    })

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)"
    })
  })

  // ===== CONSOLE MESSAGE =====
  console.log(
    "%cMohamed Mooka | Cybersecurity Portfolio",
    "font-size: 20px; font-weight: 800; color: #3b82f6; text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);",
  )
  console.log("%cEnhanced Professional Design", "font-size: 14px; color: #8b5cf6; font-weight: 600;")

  // ===== PERFORMANCE: REDUCE MOTION =====
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.querySelectorAll("*").forEach((el) => {
      el.style.animation = "none"
      el.style.transition = "none"
    })
  }

  // ===== ACCESSIBILITY: KEYBOARD NAVIGATION =====
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("active")) {
      nav.classList.remove("active")
      menuBtn.classList.remove("active")
    }
  })
})
