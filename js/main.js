// ===================================
// ELITE PORTFOLIO - MAIN JAVASCRIPT
// Mohamed Mooka - Cybersecurity Analyst
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  // ===================================
  // ADVANCED PARTICLE SYSTEM
  // ===================================
  const particlesCanvas = document.getElementById("particles")
  const ctx = particlesCanvas?.getContext("2d")

  if (ctx && particlesCanvas) {
    function resizeCanvas() {
      particlesCanvas.width = window.innerWidth
      particlesCanvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles = []
    const particleCount = 100
    const connectionDistance = 150
    const mouse = { x: null, y: null, radius: 200 }

    class Particle {
      constructor() {
        this.x = Math.random() * particlesCanvas.width
        this.y = Math.random() * particlesCanvas.height
        this.vx = (Math.random() - 0.5) * 1
        this.vy = (Math.random() - 0.5) * 1
        this.radius = Math.random() * 2.5 + 0.5
        this.opacity = Math.random() * 0.5 + 0.3
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > particlesCanvas.width) this.vx *= -1
        if (this.y < 0 || this.y > particlesCanvas.height) this.vy *= -1

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius
            const angle = Math.atan2(dy, dx)
            this.vx -= Math.cos(angle) * force * 0.3
            this.vy -= Math.sin(angle) * force * 0.3
          }
        }

        // Velocity damping
        this.vx *= 0.99
        this.vy *= 0.99
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3)
        gradient.addColorStop(0, `rgba(0, 240, 255, ${this.opacity})`)
        gradient.addColorStop(1, `rgba(0, 240, 255, 0)`)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x
      mouse.y = e.y
    })

    window.addEventListener("mouseleave", () => {
      mouse.x = null
      mouse.y = null
    })

    function animateParticles() {
      ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.4
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`
            ctx.lineWidth = 1.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animateParticles)
    }

    animateParticles()
  }

  // ===================================
  // NEURAL NETWORK BACKGROUND
  // ===================================
  const neuralCanvas = document.getElementById("neural-network")
  const neuralCtx = neuralCanvas?.getContext("2d")

  if (neuralCtx && neuralCanvas) {
    neuralCanvas.width = window.innerWidth
    neuralCanvas.height = window.innerHeight

    const nodes = []
    const nodeCount = 30

    class Node {
      constructor() {
        this.x = Math.random() * neuralCanvas.width
        this.y = Math.random() * neuralCanvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > neuralCanvas.width) this.vx *= -1
        if (this.y < 0 || this.y > neuralCanvas.height) this.vy *= -1
      }

      draw() {
        neuralCtx.beginPath()
        neuralCtx.arc(this.x, this.y, 3, 0, Math.PI * 2)
        neuralCtx.fillStyle = "rgba(0, 240, 255, 0.6)"
        neuralCtx.fill()
      }
    }

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node())
    }

    function animateNeural() {
      neuralCtx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height)

      nodes.forEach((node) => {
        node.update()
        node.draw()
      })

      // Connect nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 200) {
            neuralCtx.beginPath()
            neuralCtx.strokeStyle = `rgba(0, 240, 255, ${0.2 - distance / 1000})`
            neuralCtx.lineWidth = 1
            neuralCtx.moveTo(nodes[i].x, nodes[i].y)
            neuralCtx.lineTo(nodes[j].x, nodes[j].y)
            neuralCtx.stroke()
          }
        }
      }

      requestAnimationFrame(animateNeural)
    }

    animateNeural()
  }

  // ===================================
  // CUSTOM CURSOR
  // ===================================
  const cursorDot = document.querySelector(".cursor-dot")
  const cursorOutline = document.querySelector(".cursor-outline")

  if (cursorDot && cursorOutline) {
    let cursorX = 0
    let cursorY = 0
    let outlineX = 0
    let outlineY = 0

    document.addEventListener("mousemove", (e) => {
      cursorX = e.clientX
      cursorY = e.clientY
    })

    function animateCursor() {
      outlineX += (cursorX - outlineX) * 0.15
      outlineY += (cursorY - outlineY) * 0.15

      cursorDot.style.left = `${cursorX}px`
      cursorDot.style.top = `${cursorY}px`
      cursorOutline.style.left = `${outlineX}px`
      cursorOutline.style.top = `${outlineY}px`

      requestAnimationFrame(animateCursor)
    }

    animateCursor()

    // Cursor interactions
    const interactiveElements = document.querySelectorAll("a, button, .project-card, .expertise-card, .contact-card")

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(2)"
        cursorOutline.style.width = "48px"
        cursorOutline.style.height = "48px"
      })

      el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
        cursorOutline.style.width = "32px"
        cursorOutline.style.height = "32px"
      })
    })
  }

  // ===================================
  // NAVIGATION - ACTIVE STATE
  // ===================================
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

  // ===================================
  // SMOOTH SCROLLING
  // ===================================
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")

      if (href !== "#" && href.length > 1) {
        e.preventDefault()

        const target = document.querySelector(href)
        if (target) {
          const offsetTop = target.offsetTop - 88

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // ===================================
  // SCROLL ANIMATIONS
  // ===================================
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

  // ===================================
  // PARALLAX SCROLL EFFECTS
  // ===================================
  const glowOrbs = document.querySelectorAll(".glow-orb")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    glowOrbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.05
      orb.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // ===================================
  // EXPERTISE CARDS - PROGRESS ANIMATION
  // ===================================
  const expertiseCards = document.querySelectorAll(".expertise-card")

  const expertiseObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector(".progress-fill")
          if (progressBar) {
            const progress = progressBar.getAttribute("data-progress") || 90
            progressBar.style.transform = `scaleX(${progress / 100})`
          }
          expertiseObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 },
  )

  expertiseCards.forEach((card) => {
    expertiseObserver.observe(card)
  })

  // ===================================
  // STAT COUNTER ANIMATION
  // ===================================
  const statValues = document.querySelectorAll(".stat-value[data-count]")

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = Number.parseInt(entry.target.getAttribute("data-count"))
          const duration = 2000
          const startTime = Date.now()

          function updateCounter() {
            const currentTime = Date.now()
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)

            const current = Math.floor(progress * target)
            entry.target.textContent = current + (target > 20 ? "+" : "")

            if (progress < 1) {
              requestAnimationFrame(updateCounter)
            } else {
              entry.target.textContent = target + "+"
            }
          }

          updateCounter()
          statObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statValues.forEach((stat) => {
    statObserver.observe(stat)
  })

  // ===================================
  // TYPED TEXT EFFECT
  // ===================================
  const typedWords = document.querySelectorAll(".typed-word")
  let currentWordIndex = 0

  if (typedWords.length > 0) {
    setInterval(() => {
      typedWords[currentWordIndex].classList.remove("active")
      currentWordIndex = (currentWordIndex + 1) % typedWords.length
      typedWords[currentWordIndex].classList.add("active")
    }, 4000)
  }

  // ===================================
  // MATRIX RAIN EFFECT
  // ===================================
  const matrixRain = document.getElementById("matrixRain")

  if (matrixRain) {
    const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ"
    const fontSize = 16
    const columns = Math.floor(window.innerWidth / fontSize)
    const drops = Array(columns).fill(1)

    function drawMatrix() {
      let html = ""

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        const x = i * fontSize
        const y = drops[i] * fontSize

        html += `<div style="position: absolute; left: ${x}px; top: ${y}px; color: rgba(0, 240, 255, ${Math.random() * 0.5 + 0.1}); font-size: ${fontSize}px; font-family: monospace;">${text}</div>`

        if (y > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }

      matrixRain.innerHTML = html
    }

    setInterval(drawMatrix, 50)
  }

  // ===================================
  // PROJECT CARDS 3D TILT EFFECT
  // ===================================
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * 5
      const rotateY = ((centerX - x) / centerX) * 5

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-16px)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = ""
    })
  })

  // ===================================
  // MAGNETIC BUTTON EFFECT
  // ===================================
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      const distance = Math.sqrt(x * x + y * y)
      const maxDistance = 60

      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance
        const translateX = x * strength * 0.4
        const translateY = y * strength * 0.4
        button.style.transform = `translate(${translateX}px, ${translateY}px)`
      }
    })

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)"
    })
  })

  // ===================================
  // TERMINAL TYPING EFFECT
  // ===================================
  const terminalLines = document.querySelectorAll(".terminal-line")

  terminalLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = "1"
      line.style.animation = "fadeIn 0.5s ease forwards"
    }, index * 300)
  })

  // ===================================
  // GRADIENT ANIMATION ON SCROLL
  // ===================================
  const gradientTexts = document.querySelectorAll(".gradient-title, .gradient-text")

  window.addEventListener("scroll", () => {
    const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100

    gradientTexts.forEach((text) => {
      text.style.backgroundPosition = `${scrollPercent}% center`
    })
  })

  // ===================================
  // CONSOLE BRANDING
  // ===================================
  console.log(
    "%c⚡ ELITE CYBERSECURITY PORTFOLIO",
    "font-size: 28px; font-weight: 800; background: linear-gradient(135deg, #00f0ff 0%, #7c3aed 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding: 20px 0;",
  )
  console.log(
    "%cMohamed Mooka | DFIR Specialist | Threat Hunter",
    "font-size: 16px; color: #00f0ff; font-weight: 600; padding: 10px 0;",
  )
  console.log("%cCrafted with cutting-edge technology 🚀", "font-size: 14px; color: #7c3aed; font-weight: 600;")

  // ===================================
  // ACCESSIBILITY - REDUCED MOTION
  // ===================================
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.querySelectorAll("*").forEach((el) => {
      el.style.animation = "none !important"
      el.style.transition = "none !important"
    })

    if (ctx) {
      ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height)
    }
  }

  // ===================================
  // KEYBOARD NAVIGATION
  // ===================================
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("active")) {
      nav.classList.remove("active")
      menuBtn.classList.remove("active")
    }
  })

  // ===================================
  // PAGE LOAD - RESET SCROLL
  // ===================================
  window.scrollTo({ top: 0, behavior: "instant" })

  // ===================================
  // PERFORMANCE MONITORING
  // ===================================
  window.addEventListener("load", () => {
    const perfData = window.performance.timing
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
    console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, "color: #10b981; font-weight: 600;")
  })
})
