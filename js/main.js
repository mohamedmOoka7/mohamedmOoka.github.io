// ==================================================
// MAIN JAVASCRIPT - ULTIMATE BLUE TEAM PORTFOLIO EDITION
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] Enhanced Portfolio Initialized ✨")

  /* ===============================================
     MOBILE MENU TOGGLE
  =============================================== */

  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      menuToggle.classList.toggle("active")

      const bars = menuToggle.querySelectorAll("span")
      if (navLinks.classList.contains("active")) {
        bars[0].style.transform = "rotate(45deg) translateY(10px)"
        bars[1].style.opacity = "0"
        bars[2].style.transform = "rotate(-45deg) translateY(-10px)"
      } else {
        bars.forEach((bar) => {
          bar.style.transform = ""
          bar.style.opacity = ""
        })
      }
    })

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
        menuToggle.classList.remove("active")

        const bars = menuToggle.querySelectorAll("span")
        bars.forEach((bar) => {
          bar.style.transform = ""
          bar.style.opacity = ""
        })
      })
    })
  }

  /* ===============================================
     NAVBAR SCROLL EFFECT - ENHANCED
  =============================================== */

  const navbar = document.querySelector(".navbar")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    if (currentScroll > lastScroll && currentScroll > 150) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }

    lastScroll = currentScroll
  })

  /* ===============================================
     SCROLL REVEAL ANIMATION - ENHANCED
  =============================================== */

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show")
        revealObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  document
    .querySelectorAll(".section, .card, .expertise-card, .project-card, .contact-card, .skill-item")
    .forEach((el) => {
      revealObserver.observe(el)
    })

  /* ===============================================
     MATRIX RAIN EFFECT - ENHANCED
  =============================================== */

  const matrixCanvas = document.getElementById("matrix-canvas")
  if (matrixCanvas) {
    const ctx = matrixCanvas.getContext("2d")
    matrixCanvas.width = window.innerWidth
    matrixCanvas.height = window.innerHeight

    const chars = "01アイウエオカキクケコサシスセソ"
    const fontSize = 14
    const columns = matrixCanvas.width / fontSize
    const drops = Array(Math.floor(columns)).fill(1)

    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height)

      ctx.font = fontSize + "px monospace"

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize

        ctx.fillStyle = `rgba(0, 217, 255, ${Math.random() * 0.5 + 0.3})`
        ctx.fillText(char, x, y * fontSize)

        if (y * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      })
    }

    setInterval(drawMatrix, 50)

    window.addEventListener("resize", () => {
      matrixCanvas.width = window.innerWidth
      matrixCanvas.height = window.innerHeight
    })
  }

  /* ===============================================
     NEURAL NETWORK CANVAS EFFECT
  =============================================== */

  const neuralCanvas = document.getElementById("neural-network")
  if (neuralCanvas) {
    const ctx = neuralCanvas.getContext("2d")
    neuralCanvas.width = window.innerWidth
    neuralCanvas.height = window.innerHeight

    const nodes = []
    const nodeCount = 50

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * neuralCanvas.width,
        y: Math.random() * neuralCanvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 2,
      })
    }

    function drawNeuralNetwork() {
      ctx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height)

      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > neuralCanvas.width) node.vx *= -1
        if (node.y < 0 || node.y > neuralCanvas.height) node.vy *= -1

        // Draw connections
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const dx = node.x - otherNode.x
            const dy = node.y - otherNode.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              const opacity = 1 - distance / 150
              ctx.strokeStyle = `rgba(0, 217, 255, ${opacity * 0.3})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(otherNode.x, otherNode.y)
              ctx.stroke()
            }
          }
        })

        // Draw node
        ctx.fillStyle = "rgba(0, 217, 255, 0.6)"
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(drawNeuralNetwork)
    }

    drawNeuralNetwork()

    window.addEventListener("resize", () => {
      neuralCanvas.width = window.innerWidth
      neuralCanvas.height = window.innerHeight
    })
  }

  /* ===============================================
     ENHANCED PARTICLES
  =============================================== */

  const particlesContainer = document.getElementById("particles")
  if (particlesContainer) {
    const particleCount = 60

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      const size = Math.random() * 5 + 2

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 217, 255, ${Math.random() * 0.6 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 ${size * 4}px rgba(0, 217, 255, 0.6);
        animation: floatParticle ${Math.random() * 20 + 15}s ease-in-out infinite ${Math.random() * 5}s;
      `

      particlesContainer.appendChild(particle)
    }

    const style = document.createElement("style")
    style.textContent = `
      @keyframes floatParticle {
        0%, 100% {
          transform: translate(0, 0);
          opacity: 0.4;
        }
        25% {
          transform: translate(30px, -40px);
          opacity: 0.8;
        }
        50% {
          transform: translate(-20px, -80px);
          opacity: 0.5;
        }
        75% {
          transform: translate(40px, -120px);
          opacity: 0.7;
        }
      }
    `
    document.head.appendChild(style)
  }

  /* ===============================================
     ENHANCED SMOOTH READING EXPERIENCE
  =============================================== */

  // Smooth scroll with offset for fixed navbar
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#") return

      e.preventDefault()
      const target = document.querySelector(href)

      if (target) {
        const offsetTop = target.offsetTop - 100 // Better offset for readability
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  /* ===============================================
     CARD GLOW EFFECT FOLLOW MOUSE - ENHANCED
  =============================================== */

  const glowCards = document.querySelectorAll(".card, .expertise-card, .project-card, .contact-card, .stat-card")

  glowCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const ambientGlow = card.querySelector(".card-ambient-glow, .stat-glow")
      if (ambientGlow) {
        ambientGlow.style.background = `radial-gradient(circle 400px at ${x}px ${y}px, rgba(0, 217, 255, 0.4) 0%, transparent 60%)`
      }
    })
  })

  /* ===============================================
     TYPING EFFECT FOR SUBTITLE - ENHANCED
  =============================================== */

  const typingText = document.querySelector(".typing-text")
  if (typingText) {
    const text = typingText.getAttribute("data-text")
    typingText.textContent = ""
    let i = 0

    function type() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i)
        i++
        setTimeout(type, Math.random() * 60 + 30)
      }
    }

    setTimeout(type, 1500)
  }

  /* ===============================================
     COUNTER ANIMATION FOR STATS - ENHANCED
  =============================================== */

  const statNumbers = document.querySelectorAll(".stat-number[data-count]")

  const animateCounter = (element) => {
    const target = Number.parseInt(element.getAttribute("data-count"))
    const duration = 2500
    const increment = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += increment
      if (current < target) {
        element.textContent = Math.floor(current)
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target
      }
    }

    updateCounter()
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statNumbers.forEach((stat) => statsObserver.observe(stat))

  /* ===============================================
     PARALLAX EFFECT FOR HERO ORBS - ENHANCED
  =============================================== */

  const orbs = document.querySelectorAll(".orb")

  if (orbs.length > 0) {
    let mouseX = 0.5
    let mouseY = 0.5

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX / window.innerWidth
      mouseY = e.clientY / window.innerHeight
    })

    function animateOrbs() {
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20
        const x = (mouseX - 0.5) * speed
        const y = (mouseY - 0.5) * speed

        orb.style.transform = `translate(${x}px, ${y}px)`
      })

      requestAnimationFrame(animateOrbs)
    }

    animateOrbs()
  }

  /* ===============================================
     ENHANCED SCROLL PROGRESS INDICATOR
  =============================================== */

  const progressBar = document.createElement("div")
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #00d9ff, #0099ff, #00f5ff);
    width: 0%;
    z-index: 10000;
    transition: width 0.1s ease;
    box-shadow: 0 0 15px rgba(0, 217, 255, 0.8), 0 0 30px rgba(0, 217, 255, 0.4);
  `
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    progressBar.style.width = scrollPercent + "%"
  })

  /* ===============================================
     CURSOR GLOW EFFECT - ENHANCED
  =============================================== */

  const cursorTrail = document.querySelector(".cursor-trail")

  if (cursorTrail) {
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    const speed = 0.12

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursorTrail.style.opacity = "1"
    })

    document.addEventListener("mouseleave", () => {
      cursorTrail.style.opacity = "0"
    })

    function animateCursor() {
      const distX = mouseX - cursorX
      const distY = mouseY - cursorY

      cursorX += distX * speed
      cursorY += distY * speed

      cursorTrail.style.left = cursorX + "px"
      cursorTrail.style.top = cursorY + "px"

      requestAnimationFrame(animateCursor)
    }

    animateCursor()
  }

  /* ===============================================
     DYNAMIC YEAR IN FOOTER
  =============================================== */

  const footerYear = document.querySelector(".footer-copyright")
  if (footerYear && footerYear.textContent.includes("2025")) {
    footerYear.textContent = footerYear.textContent.replace("2025", new Date().getFullYear())
  }

  console.log("[v0] Enhanced reading experience activated ✨")
})
