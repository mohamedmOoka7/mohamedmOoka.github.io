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
    const interactiveElements = document.querySelectorAll(
      "a, button, .btn, .nav-link, .work-card, .expertise-card, .contact-card, .skill-item, .tool-tag",
    )

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

  // ===== NAVIGATION =====
  const nav = document.querySelector(".nav")
  const navLinks = document.querySelectorAll(".nav-link")
  const menuBtn = document.querySelector(".menu-btn")

  // Mobile menu toggle
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

  // ===== ANIMATED PARTICLE BACKGROUND =====
  const canvas = document.getElementById("particles-canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 3 + 1
      this.speedX = Math.random() * 1 - 0.5
      this.speedY = Math.random() * 1 - 0.5
      this.opacity = Math.random() * 0.5 + 0.2
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX
      }
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY
      }
    }

    draw() {
      ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`
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

  function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x
        const dy = particlesArray[a].y - particlesArray[b].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 120) {
          const opacity = (1 - distance / 120) * 0.3
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
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
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update()
      particlesArray[i].draw()
    }

    connectParticles()
    requestAnimationFrame(animate)
  }

  animate()

  // ===== PARALLAX EFFECT FOR BACKGROUND ORBS =====
  const orbs = document.querySelectorAll(".gradient-orb")

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.05
      orb.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

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

  // ===== TERMINAL TYPING EFFECT =====
  const terminalLines = document.querySelectorAll(".terminal-line")
  let terminalAnimated = false

  const terminalObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !terminalAnimated) {
          terminalAnimated = true
          animateTerminal()
        }
      })
    },
    { threshold: 0.5 },
  )

  const terminal = document.querySelector(".terminal")
  if (terminal) {
    terminalObserver.observe(terminal)
  }

  function animateTerminal() {
    terminalLines.forEach((line, index) => {
      line.style.opacity = "0"
      setTimeout(() => {
        line.style.transition = "opacity 0.3s ease"
        line.style.opacity = "1"
      }, index * 100)
    })
  }

  // ===== SCROLL INDICATOR HIDE ON SCROLL =====
  const scrollIndicator = document.querySelector(".scroll-indicator")

  if (scrollIndicator) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        scrollIndicator.style.opacity = "0"
        scrollIndicator.style.pointerEvents = "none"
      } else {
        scrollIndicator.style.opacity = "1"
        scrollIndicator.style.pointerEvents = "all"
      }
    })
  }

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
    "font-size: 20px; font-weight: 800; color: #3b82f6; text-shadow: 0 2px 10px rgba(59,130,246,0.3);",
  )
  console.log("%c⚡ Modern Professional Design", "font-size: 14px; color: #a3a3a3;")
  console.log("%c🛡️ DFIR Specialist | SOC Analyst | Threat Hunter", "font-size: 12px; color: #737373;")

  // ===== ACCESSIBILITY: KEYBOARD NAVIGATION =====
  document.addEventListener("keydown", (e) => {
    // Press 'Esc' to close mobile menu
    if (e.key === "Escape") {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active")
        if (menuBtn) {
          menuBtn.classList.remove("active")
        }
      }
    }
  })

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
