// ============================================
// PROFESSIONAL PORTFOLIO - MAIN JAVASCRIPT
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 100)

  // Initialize all features
  initCustomCursor()
  initScrollProgress()
  initSmoothScroll()
  initParticleBackground()
  initButtonRipple()
  initScrollReveal()
  initParallaxEffect()
  initImageLoading()
  initSnowflakes()
  displayConsoleMessage()
  handleReducedMotion()
})

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
  const cursorDot = document.querySelector("[data-cursor-dot]")
  const cursorOutline = document.querySelector("[data-cursor-outline]")

  if (!cursorDot || !cursorOutline || window.innerWidth <= 768) return

  let mouseX = 0
  let mouseY = 0
  let outlineX = 0
  let outlineY = 0
  let animationId = null

  const handleMouseMove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    cursorDot.style.left = `${mouseX}px`
    cursorDot.style.top = `${mouseY}px`
  }

  window.addEventListener("mousemove", handleMouseMove, { passive: true })

  function animateCursor() {
    const distX = mouseX - outlineX
    const distY = mouseY - outlineY

    outlineX += distX * 0.15
    outlineY += distY * 0.15

    cursorOutline.style.left = `${outlineX}px`
    cursorOutline.style.top = `${outlineY}px`

    animationId = requestAnimationFrame(animateCursor)
  }

  animationId = requestAnimationFrame(animateCursor)

  const interactiveElements = document.querySelectorAll("a, button, .btn, .work-card, .contact-card, .skill-item")

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1.6)"
      cursorOutline.style.width = "60px"
      cursorOutline.style.height = "60px"
    })

    el.addEventListener("mouseleave", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
      cursorOutline.style.width = "40px"
      cursorOutline.style.height = "40px"
    })
  })

  return () => {
    if (animationId) cancelAnimationFrame(animationId)
    window.removeEventListener("mousemove", handleMouseMove)
  }
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
  const scrollProgress = document.querySelector(".scroll-progress")
  if (!scrollProgress) return

  const updateProgress = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight - windowHeight
    const scrolled = window.scrollY
    const progress = Math.min((scrolled / documentHeight) * 100, 100)

    scrollProgress.style.transform = `scaleX(${progress / 100})`
    scrollProgress.setAttribute("aria-valuenow", Math.round(progress))
  }

  window.addEventListener("scroll", throttle(updateProgress, 16), { passive: true })
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")

      if (href && href !== "#" && href.length > 1) {
        const target = document.querySelector(href)

        if (target) {
          e.preventDefault()
          const offsetTop = target.offsetTop - 20

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })
}

// ============================================
// PARTICLE BACKGROUND
// ============================================
function initParticleBackground() {
  const canvas = document.getElementById("particles-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d", { alpha: true })
  if (!ctx) return

  let animationId = null

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resizeCanvas()

  window.addEventListener("resize", debounce(resizeCanvas, 250), { passive: true })

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
      const colors = ["220, 38, 38", "153, 27, 27", "251, 191, 36", "239, 68, 68"]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX
      if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY
    }

    draw() {
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const particlesArray = []
  const numberOfParticles = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000))

  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle())
  }

  function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
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
    animationId = requestAnimationFrame(animate)
  }

  animate()

  return () => {
    if (animationId) cancelAnimationFrame(animationId)
  }
}

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================
function initButtonRipple() {
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const ripple = document.createElement("span")
      ripple.className = "btn-ripple"
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        animation: ripple 0.7s ease-out forwards;
        pointer-events: none;
        z-index: 0;
      `

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => ripple.remove(), 700)
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
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const animatedElements = document.querySelectorAll(".work-card, .skill-item, .contact-card")

  animatedElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = `all 0.5s ease-out ${index * 0.08}s`
    observer.observe(el)
  })
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallaxEffect() {
  let ticking = false

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const hero = document.querySelector(".hero")

        if (hero && scrollTop < window.innerHeight) {
          hero.style.transform = `translateY(${scrollTop * 0.3}px)`
          hero.style.opacity = Math.max(0, 1 - scrollTop / 600)
        }

        ticking = false
      })

      ticking = true
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true })
}

// ============================================
// IMAGE LOADING OPTIMIZATION
// ============================================
function initImageLoading() {
  const images = document.querySelectorAll("img")

  images.forEach((img) => {
    if (img.complete) {
      img.style.opacity = "1"
    } else {
      img.style.opacity = "0"
      img.style.transition = "opacity 0.4s ease-out"

      const handleLoad = () => {
        img.style.opacity = "1"
        img.removeEventListener("load", handleLoad)
      }

      img.addEventListener("load", handleLoad)
    }
  })
}

// ============================================
// FESTIVE SNOWFLAKES
// ============================================
function initSnowflakes() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (prefersReducedMotion) return

  let snowflakeCount = 0
  const maxSnowflakes = 50

  function createSnowflake() {
    if (snowflakeCount >= maxSnowflakes) return

    const snowflake = document.createElement("div")
    snowflake.classList.add("snowflake")
    snowflake.textContent = "❄"
    snowflake.style.left = `${Math.random() * window.innerWidth}px`
    snowflake.style.animationDuration = `${Math.random() * 3 + 8}s`
    snowflake.style.opacity = `${Math.random() * 0.6 + 0.3}`
    snowflake.style.fontSize = `${Math.random() * 10 + 10}px`
    snowflake.setAttribute("aria-hidden", "true")

    document.body.appendChild(snowflake)
    snowflakeCount++

    setTimeout(() => {
      snowflake.remove()
      snowflakeCount--
    }, 12000)
  }

  setInterval(createSnowflake, 400)
}

// ============================================
// CONSOLE MESSAGE
// ============================================
function displayConsoleMessage() {
  const styles = {
    title:
      "font-size: 22px; font-weight: 900; background: linear-gradient(135deg, #dc2626, #fbbf24); -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding: 8px 0;",
    holiday: "font-size: 15px; color: #fbbf24; font-weight: 700;",
    role: "font-size: 13px; color: #d4a5a5;",
    theme: "font-size: 12px; color: #a37676;",
  }

  console.log("%c🎄 Mohamed Mooka - Professional Portfolio", styles.title)
  console.log("%c🎅 Happy Holidays & Merry Christmas!", styles.holiday)
  console.log("%c🛡️ DFIR Specialist | SOC Analyst | Threat Hunter", styles.role)
  console.log("%c⚡ Professional Red Theme with Festive Touches", styles.theme)
}

// ============================================
// REDUCED MOTION SUPPORT
// ============================================
function handleReducedMotion() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty("scroll-behavior", "auto")
  }

  prefersReducedMotion.addEventListener("change", (e) => {
    if (e.matches) {
      document.documentElement.style.setProperty("scroll-behavior", "auto")
    } else {
      document.documentElement.style.setProperty("scroll-behavior", "smooth")
    }
  })
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance optimization
function debounce(func, wait = 250) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for performance optimization
function throttle(func, limit = 16) {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

window.addEventListener("error", (event) => {
  console.error("Portfolio Error:", event.error)
})

if ("performance" in window && "memory" in performance) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0]
      console.log(`Page Load Time: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`)
    }, 0)
  })
}
