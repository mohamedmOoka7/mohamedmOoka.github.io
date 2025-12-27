// =============================================
// ULTRA PROFESSIONAL RED THEME - CHRISTMAS EDITION
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 100)

  // ===== ENHANCED CUSTOM CURSOR =====
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

    const interactiveElements = document.querySelectorAll(
      "a, button, .btn, .work-card, .contact-card, .skill-item, .stat-card",
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1.6)"
        cursorOutline.style.width = "60px"
        cursorOutline.style.height = "60px"
        cursorOutline.style.borderWidth = "2px"
      })

      el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
        cursorOutline.style.width = "40px"
        cursorOutline.style.height = "40px"
        cursorOutline.style.borderWidth = "2px"
      })
    })
  }

  // ===== ENHANCED SCROLL PROGRESS =====
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

  // ===== PROFESSIONAL RED PARTICLE BACKGROUND =====
  const canvas = document.getElementById("particles-canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  let resizeTimeout
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }, 250)
  })

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 0.5
      this.speedX = Math.random() * 0.6 - 0.3
      this.speedY = Math.random() * 0.6 - 0.3
      this.opacity = Math.random() * 0.35 + 0.1
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
  const numberOfParticles = 60 // Reduced for better performance

  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle())
  }

  function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x
        const dy = particlesArray[a].y - particlesArray[b].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 110) {
          const opacity = (1 - distance / 110) * 0.2
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
  // </CHANGE>

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

  // ===== PROFESSIONAL SCROLL REVEAL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -60px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        observer.unobserve(entry.target) // Stop observing after animation
      }
    })
  }, observerOptions)

  const animatedElements = document.querySelectorAll(".work-card, .skill-item, .contact-card, .stat-card")
  animatedElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(15px)"
    el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`
    observer.observe(el)
  })
  // </CHANGE>

  // ===== SUBTLE PARALLAX EFFECT ON SCROLL =====
  let ticking = false

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const hero = document.querySelector(".hero")

          if (hero && scrollTop < window.innerHeight) {
            hero.style.transform = `translateY(${scrollTop * 0.25}px)`
            hero.style.opacity = Math.max(0, 1 - scrollTop / 700)
          }

          ticking = false
        })

        ticking = true
      }
    },
    { passive: true },
  )
  // </CHANGE>

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
    snowflake.style.animationDuration = Math.random() * 4 + 10 + "s"
    snowflake.style.opacity = Math.random() * 0.5 + 0.2
    snowflake.style.fontSize = Math.random() * 8 + 8 + "px"

    document.body.appendChild(snowflake)

    setTimeout(() => {
      snowflake.remove()
    }, 15000)
  }

  // Create snowflakes less frequently for subtle effect
  setInterval(createSnowflake, 600)
  // </CHANGE>

  // ===== PROFESSIONAL CONSOLE MESSAGE =====
  console.log(
    "%c🎄 Mohamed Mooka - Professional Portfolio",
    "font-size: 22px; font-weight: 900; background: linear-gradient(135deg, #dc2626, #fbbf24); -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding: 8px 0;",
  )
  console.log("%c🎅 Happy Holidays & Merry Christmas!", "font-size: 15px; color: #fbbf24; font-weight: 700;")
  console.log("%c🛡️ DFIR Specialist | SOC Analyst | Threat Hunter", "font-size: 13px; color: #d4a5a5;")
  console.log("%c⚡ Ultra Professional Red Theme with Festive Touches", "font-size: 12px; color: #a37676;")

  // ===== PERFORMANCE: REDUCE MOTION =====
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.querySelectorAll("*").forEach((el) => {
      el.style.animationDuration = "0.01ms"
      el.style.transitionDuration = "0.01ms"
    })
  }
})
