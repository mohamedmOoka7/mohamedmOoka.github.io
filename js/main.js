// ==========================================
// ULTRA-MODERN PORTFOLIO - ENHANCED JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all features
  initNavigation()
  initParticles()
  initScrollAnimations()
  initCounters()
  initSmoothScroll()
  initCursorEffect()
  initParallax()
  initTextAnimation()
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
    if (window.scrollY > 100) {
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
// ANIMATED PARTICLES BACKGROUND
// ==========================================
function initParticles() {
  const canvas = document.getElementById("particles-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  let particlesArray = []
  const mouse = { x: null, y: null, radius: 180 }

  // Set canvas size
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
  })

  // Mouse movement
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
      this.baseX = x
      this.baseY = y
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
      ctx.shadowBlur = 15
      ctx.shadowColor = this.color
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.shadowBlur = 0
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
      const maxDistance = mouse.radius + this.size

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance
        const angle = Math.atan2(dy, dx)
        const moveX = Math.cos(angle) * force * 3
        const moveY = Math.sin(angle) * force * 3

        this.x -= moveX
        this.y -= moveY
      } else {
        // Return to base position
        if (this.x !== this.baseX) {
          const dx = this.baseX - this.x
          this.x += dx * 0.05
        }
        if (this.y !== this.baseY) {
          const dy = this.baseY - this.y
          this.y += dy * 0.05
        }
      }

      this.x += this.directionX
      this.y += this.directionY
      this.draw()
    }
  }

  function init() {
    particlesArray = []
    const numberOfParticles = Math.min((canvas.width * canvas.height) / 12000, 120)

    const colors = [
      "rgba(0, 245, 255, 0.6)",
      "rgba(153, 69, 255, 0.5)",
      "rgba(255, 0, 110, 0.4)",
      "rgba(0, 255, 148, 0.5)",
    ]

    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 2.5 + 1
      const x = Math.random() * (canvas.width - size * 2) + size
      const y = Math.random() * (canvas.height - size * 2) + size
      const directionX = Math.random() * 0.6 - 0.3
      const directionY = Math.random() * 0.6 - 0.3
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
        const maxDistance = 120

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.5
          const gradient = ctx.createLinearGradient(
            particlesArray[a].x,
            particlesArray[a].y,
            particlesArray[b].x,
            particlesArray[b].y,
          )
          gradient.addColorStop(0, `rgba(0, 245, 255, ${opacity})`)
          gradient.addColorStop(1, `rgba(153, 69, 255, ${opacity})`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
          ctx.stroke()
        }
      }
    }
  }

  // Animation loop
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
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all elements with fade-in class
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
        const offsetTop = target.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// ==========================================
// CUSTOM CURSOR EFFECT
// ==========================================
function initCursorEffect() {
  const cursor = document.createElement("div")
  cursor.className = "custom-cursor"
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgba(0, 245, 255, 0.8);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease, border-color 0.2s ease;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px rgba(0, 245, 255, 0.6);
  `
  document.body.appendChild(cursor)

  const cursorDot = document.createElement("div")
  cursorDot.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(0, 245, 255, 1);
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.15s ease;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(0, 245, 255, 1);
  `
  document.body.appendChild(cursorDot)

  let mouseX = 0,
    mouseY = 0
  let cursorX = 0,
    cursorY = 0
  let dotX = 0,
    dotY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  function animate() {
    // Smooth cursor follow
    cursorX += (mouseX - cursorX) * 0.1
    cursorY += (mouseY - cursorY) * 0.1
    dotX += (mouseX - dotX) * 0.15
    dotY += (mouseY - dotY) * 0.15

    cursor.style.left = cursorX + "px"
    cursor.style.top = cursorY + "px"
    cursorDot.style.left = dotX + "px"
    cursorDot.style.top = dotY + "px"

    requestAnimationFrame(animate)
  }
  animate()

  document.querySelectorAll("a, button, .project-card, .expertise-card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursor.style.borderColor = "rgba(153, 69, 255, 0.8)"
      cursor.style.boxShadow = "0 0 30px rgba(153, 69, 255, 0.8)"
      cursorDot.style.background = "rgba(153, 69, 255, 1)"
    })

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursor.style.borderColor = "rgba(0, 245, 255, 0.8)"
      cursor.style.boxShadow = "0 0 20px rgba(0, 245, 255, 0.6)"
      cursorDot.style.background = "rgba(0, 245, 255, 1)"
    })
  })
}

// ==========================================
// PARALLAX SCROLLING EFFECT
// ==========================================
function initParallax() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating-card, .hero-content")

    parallaxElements.forEach((el, index) => {
      const speed = 0.5 + index * 0.1
      el.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

// ==========================================
// TEXT TYPING ANIMATION
// ==========================================
function initTextAnimation() {
  const subtitle = document.querySelector(".hero-subtitle")
  if (!subtitle) return

  const text = subtitle.textContent
  subtitle.textContent = ""
  let index = 0

  function typeWriter() {
    if (index < text.length) {
      subtitle.textContent += text.charAt(index)
      index++
      setTimeout(typeWriter, 100)
    }
  }

  setTimeout(typeWriter, 500)
}
