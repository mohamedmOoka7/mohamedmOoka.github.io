// ==========================================
// PROFESSIONAL PORTFOLIO - CLEAN JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  initNavigation()
  initParticles()
  initScrollAnimations()
  initCounters()
  initSmoothScroll()
})

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
  const nav = document.querySelector(".nav")
  const navToggle = document.querySelector(".nav-toggle")
  const navLinks = document.querySelector(".nav-links")

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled")
    } else {
      nav.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      navToggle.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
        navToggle.classList.remove("active")
      })
    })
  }
}

// ==========================================
// PARTICLES BACKGROUND - Optimized
// ==========================================
function initParticles() {
  const canvas = document.getElementById("particles-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  let particlesArray = []
  const mouse = { x: null, y: null, radius: 150 }

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
  })

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.x
    mouse.y = event.y
  })

  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x
      this.y = y
      this.directionX = directionX
      this.directionY = directionY
      this.size = size
      this.color = color
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
      ctx.fillStyle = this.color
      ctx.fill()
    }

    update() {
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY
      }

      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius
        const angle = Math.atan2(dy, dx)
        const moveX = Math.cos(angle) * force * 2
        const moveY = Math.sin(angle) * force * 2

        this.x -= moveX
        this.y -= moveY
      }

      this.x += this.directionX
      this.y += this.directionY
      this.draw()
    }
  }

  function init() {
    particlesArray = []
    const numberOfParticles = Math.min((canvas.width * canvas.height) / 15000, 80)

    const colors = ["rgba(0, 212, 255, 0.4)", "rgba(0, 153, 255, 0.3)", "rgba(0, 212, 255, 0.5)"]

    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 2 + 0.5
      const x = Math.random() * (canvas.width - size * 2) + size
      const y = Math.random() * (canvas.height - size * 2) + size
      const directionX = Math.random() * 0.4 - 0.2
      const directionY = Math.random() * 0.4 - 0.2
      const color = colors[Math.floor(Math.random() * colors.length)]

      particlesArray.push(new Particle(x, y, directionX, directionY, size, color))
    }
  }

  function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x
        const dy = particlesArray[a].y - particlesArray[b].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 100

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.3
          ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
          ctx.stroke()
        }
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update()
    }
    connect()
  }

  init()
  animate()
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const fadeElements = document.querySelectorAll(
    ".expertise-card, .project-card, .stat-item, .skill-category, .contact-item",
  )
  fadeElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
}

// ==========================================
// ANIMATED COUNTERS
// ==========================================
function initCounters() {
  const counters = document.querySelectorAll(".stat-value")
  const speed = 200

  const observerOptions = {
    threshold: 0.5,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = +counter.getAttribute("data-target")
        const increment = target / speed

        const updateCount = () => {
          const count = +counter.innerText

          if (count < target) {
            counter.innerText = Math.ceil(count + increment)
            setTimeout(updateCount, 10)
          } else {
            counter.innerText = target + "+"
          }
        }

        updateCount()
        observer.unobserve(counter)
      }
    })
  }, observerOptions)

  counters.forEach((counter) => observer.observe(counter))
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        const offsetTop = target.offsetTop - 70
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}
