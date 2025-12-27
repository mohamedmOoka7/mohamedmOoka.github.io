// =============================================
// MODERN CYBERSECURITY PORTFOLIO - ENHANCED
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  // ===== CUSTOM CURSOR =====
  const cursorDot = document.querySelector("[data-cursor-dot]")
  const cursorOutline = document.querySelector("[data-cursor-outline]")

  if (cursorDot && cursorOutline && window.innerWidth > 768) {
    let mouseX = 0
    let mouseY = 0
    let outlineX = 0
    let outlineY = 0

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      cursorDot.style.left = `${mouseX}px`
      cursorDot.style.top = `${mouseY}px`
    })

    // Smooth cursor outline animation
    function animateCursor() {
      const distX = mouseX - outlineX
      const distY = mouseY - outlineY

      outlineX += distX * 0.15
      outlineY += distY * 0.15

      cursorOutline.style.left = `${outlineX}px`
      cursorOutline.style.top = `${outlineY}px`

      requestAnimationFrame(animateCursor)
    }
    animateCursor()

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll("a, button, .btn, .work-card, .contact-card, .skill-item")

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1.8)"
        cursorOutline.style.width = "60px"
        cursorOutline.style.height = "60px"
        cursorOutline.style.borderWidth = "1px"
      })

      el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
        cursorOutline.style.width = "40px"
        cursorOutline.style.height = "40px"
        cursorOutline.style.borderWidth = "2px"
      })
    })
  }

  // ===== SCROLL PROGRESS =====
  const scrollProgress = document.querySelector(".scroll-progress")

  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight - windowHeight
    const scrolled = window.scrollY
    const progress = (scrolled / documentHeight) * 100

    if (scrollProgress) {
      scrollProgress.style.transform = `scaleX(${progress / 100})`
    }
  })

  // ===== SMOOTH SCROLL =====
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")

      if (href !== "#" && href.length > 1) {
        e.preventDefault()

        const target = document.querySelector(href)
        if (target) {
          const offsetTop = target.offsetTop

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // ===== PREMIUM ANIMATED BACKGROUND =====
  const canvas = document.getElementById("particles-canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  // Floating Gradient Orbs
  class GradientOrb {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.radius = Math.random() * 200 + 150
      this.vx = (Math.random() - 0.5) * 0.3
      this.vy = (Math.random() - 0.5) * 0.3
      this.hue = Math.random() * 60 + 220
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < -this.radius || this.x > canvas.width + this.radius) {
        this.vx *= -1
      }
      if (this.y < -this.radius || this.y > canvas.height + this.radius) {
        this.vy *= -1
      }
    }

    draw() {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
      gradient.addColorStop(0, `hsla(${this.hue}, 70%, 55%, 0.15)`)
      gradient.addColorStop(0.5, `hsla(${this.hue}, 65%, 50%, 0.08)`)
      gradient.addColorStop(1, `hsla(${this.hue}, 60%, 45%, 0)`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Floating Particles
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 3 + 1
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = (Math.random() - 0.5) * 0.5
      this.opacity = Math.random() * 0.5 + 0.2
      this.hue = Math.random() * 60 + 220
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
    }

    draw() {
      ctx.fillStyle = `hsla(${this.hue}, 70%, 65%, ${this.opacity})`
      ctx.shadowBlur = 15
      ctx.shadowColor = `hsla(${this.hue}, 70%, 65%, 0.6)`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }

  // Create orbs and particles
  const orbs = []
  const particles = []
  const orbCount = 4
  const particleCount = 80

  for (let i = 0; i < orbCount; i++) {
    orbs.push(new GradientOrb())
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw orbs
    orbs.forEach((orb) => {
      orb.update()
      orb.draw()
    })

    // Draw particles
    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 120) {
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.3 * (1 - distance / 120)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(animate)
  }

  animate()

  // ===== BUTTON RIPPLE EFFECT =====
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const ripple = document.createElement("span")
      ripple.style.position = "absolute"
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      ripple.style.width = "0"
      ripple.style.height = "0"
      ripple.style.borderRadius = "50%"
      ripple.style.background = "rgba(255, 255, 255, 0.5)"
      ripple.style.transform = "translate(-50%, -50%)"
      ripple.style.animation = "ripple 0.6s ease-out"
      ripple.style.pointerEvents = "none"

      button.style.position = "relative"
      button.style.overflow = "hidden"
      button.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add ripple animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes ripple {
      to {
        width: 400px;
        height: 400px;
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)

  // ===== IMAGE LOADING OPTIMIZATION =====
  const images = document.querySelectorAll("img")

  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.style.opacity = "1"
    })
  })

  // ===== CONSOLE MESSAGE =====
  console.log(
    "%c🔒 Mohamed Mooka - Cybersecurity Portfolio",
    "font-size: 20px; font-weight: 800; color: #06b6d4; text-shadow: 0 2px 10px rgba(6,182,212,0.6);",
  )
  console.log("%c⚡ Professional Cybersecurity Portfolio", "font-size: 14px; color: #bae6fd;")
  console.log("%c🛡️ DFIR Specialist | SOC Analyst | Threat Hunter", "font-size: 12px; color: #7dd3fc;")

  // ===== PERFORMANCE: REDUCE MOTION FOR USERS WHO PREFER IT =====
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.querySelectorAll("*").forEach((el) => {
      el.style.animationDuration = "0.01ms"
      el.style.transitionDuration = "0.01ms"
    })
  }

  // ===== LOADING STATE =====
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })
})
