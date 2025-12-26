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

  // ===== ANIMATED PARTICLE BACKGROUND =====
  const canvas = document.getElementById("particles-canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  // Grid configuration
  const gridSize = 50
  const waveSpeed = 0.02
  const waveAmplitude = 15
  let time = 0

  class GridPoint {
    constructor(x, y) {
      this.baseX = x
      this.baseY = y
      this.x = x
      this.y = y
    }

    update() {
      const distanceFromCenter = Math.sqrt(
        Math.pow(this.baseX - canvas.width / 2, 2) + Math.pow(this.baseY - canvas.height / 2, 2),
      )

      const wave = Math.sin(distanceFromCenter * 0.01 + time) * waveAmplitude
      this.y = this.baseY + wave
    }

    draw() {
      const opacity = 0.15
      ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const gridPoints = []

  for (let x = 0; x < canvas.width; x += gridSize) {
    for (let y = 0; y < canvas.height; y += gridSize) {
      gridPoints.push(new GridPoint(x, y))
    }
  }

  function connectGrid() {
    for (let i = 0; i < gridPoints.length; i++) {
      const point = gridPoints[i]

      // Connect to right neighbor
      const rightNeighbor = gridPoints.find((p) => p.baseX === point.baseX + gridSize && p.baseY === point.baseY)
      if (rightNeighbor) {
        const gradient = ctx.createLinearGradient(point.x, point.y, rightNeighbor.x, rightNeighbor.y)
        gradient.addColorStop(0, "rgba(99, 102, 241, 0.1)")
        gradient.addColorStop(1, "rgba(139, 92, 246, 0.1)")

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(point.x, point.y)
        ctx.lineTo(rightNeighbor.x, rightNeighbor.y)
        ctx.stroke()
      }

      // Connect to bottom neighbor
      const bottomNeighbor = gridPoints.find((p) => p.baseX === point.baseX && p.baseY === point.baseY + gridSize)
      if (bottomNeighbor) {
        const gradient = ctx.createLinearGradient(point.x, point.y, bottomNeighbor.x, bottomNeighbor.y)
        gradient.addColorStop(0, "rgba(99, 102, 241, 0.1)")
        gradient.addColorStop(1, "rgba(139, 92, 246, 0.1)")

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(point.x, point.y)
        ctx.lineTo(bottomNeighbor.x, bottomNeighbor.y)
        ctx.stroke()
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    time += waveSpeed

    for (let i = 0; i < gridPoints.length; i++) {
      gridPoints[i].update()
      gridPoints[i].draw()
    }

    connectGrid()
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
    "font-size: 20px; font-weight: 800; color: #3b82f6; text-shadow: 0 2px 10px rgba(59,130,246,0.3);",
  )
  console.log("%c⚡ Modern Professional Design", "font-size: 14px; color: #a3a3a3;")
  console.log("%c🛡️ DFIR Specialist | SOC Analyst | Threat Hunter", "font-size: 12px; color: #737373;")

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
