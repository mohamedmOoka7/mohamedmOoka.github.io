// =============================================
// PROFESSIONAL RED THEME WITH CHRISTMAS TOUCHES
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 100)

  // ===== SMOOTH SCROLL WITH EASING =====
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")

      if (href !== "#" && href.length > 1) {
        e.preventDefault()
        const target = document.querySelector(href)

        if (target) {
          const offsetTop = target.offsetTop - 20

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // ===== RED PARTICLE BACKGROUND =====
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
      this.size = Math.random() * 2.5 + 0.8
      this.speedX = Math.random() * 0.8 - 0.4
      this.speedY = Math.random() * 0.8 - 0.4
      this.opacity = Math.random() * 0.4 + 0.15
      this.color = this.getRandomColor()
    }

    getRandomColor() {
      const colors = [
        "220, 38, 38", // Red
        "153, 27, 27", // Dark Red
        "251, 191, 36", // Gold
        "239, 68, 68", // Bright Red
      ]
      return colors[Math.floor(Math.random() * colors.length)]
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
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const particlesArray = []
  const numberOfParticles = 80 // Reduced for better performance

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
          const opacity = (1 - distance / 120) * 0.25
          ctx.strokeStyle = `rgba(220, 38, 38, ${opacity})`
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

  // ===== ENHANCED BUTTON RIPPLE EFFECT =====
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
      ripple.style.animation = "ripple 0.7s ease-out"
      ripple.style.pointerEvents = "none"

      button.style.position = "relative"
      button.style.overflow = "hidden"
      button.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 700)
    })
  })

  if (!document.querySelector("#ripple-animation")) {
    const style = document.createElement("style")
    style.id = "ripple-animation"
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
  }

  // ===== IMAGE LOADING OPTIMIZATION =====
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.style.opacity = "1"
    })
    img.style.transition = "opacity 0.4s ease-out"
  })

  // ===== FESTIVE CHRISTMAS SNOWFLAKES =====
  function createSnowflake() {
    const snowflake = document.createElement("div")
    snowflake.classList.add("snowflake")
    snowflake.innerHTML = "❄"
    snowflake.style.left = Math.random() * window.innerWidth + "px"
    snowflake.style.animationDuration = Math.random() * 3 + 8 + "s"
    snowflake.style.opacity = Math.random() * 0.6 + 0.3
    snowflake.style.fontSize = Math.random() * 10 + 10 + "px"

    document.body.appendChild(snowflake)

    setTimeout(() => {
      snowflake.remove()
    }, 12000)
  }

  // Create snowflakes periodically
  setInterval(createSnowflake, 400)

  // ===== ENHANCED CONSOLE MESSAGE =====
  console.log(
    "%c🎄 Mohamed Mooka - Professional Portfolio",
    "font-size: 22px; font-weight: 900; background: linear-gradient(135deg, #dc2626, #fbbf24); -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding: 8px 0;",
  )
  console.log("%c🎅 Happy Holidays & Merry Christmas!", "font-size: 15px; color: #fbbf24; font-weight: 700;")
  console.log("%c🛡️ DFIR Specialist | SOC Analyst | Threat Hunter", "font-size: 13px; color: #d4a5a5;")
  console.log("%c⚡ Professional Red Theme with Festive Touches", "font-size: 12px; color: #a37676;")

  // ===== PERFORMANCE: REDUCE MOTION =====
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.querySelectorAll("*").forEach((el) => {
      el.style.animationDuration = "0.01ms"
      el.style.transitionDuration = "0.01ms"
    })
  }
})
