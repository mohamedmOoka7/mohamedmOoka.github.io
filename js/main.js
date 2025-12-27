// =============================================
// MODERN CYBERSECURITY PORTFOLIO - ENHANCED UX/UI
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  // ===== LOADING STATE =====
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

      outlineX += distX * 0.2
      outlineY += distY * 0.2

      cursorOutline.style.left = `${outlineX}px`
      cursorOutline.style.top = `${outlineY}px`

      requestAnimationFrame(animateCursor)
    }
    animateCursor()

    const interactiveElements = document.querySelectorAll("a, button, .btn, .work-card, .contact-card, .skill-item")

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(2)"
        cursorOutline.style.width = "70px"
        cursorOutline.style.height = "70px"
        cursorOutline.style.borderWidth = "3px"
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

  // ===== ENHANCED ANIMATED PARTICLE BACKGROUND =====
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
      this.color = this.getRandomColor()
    }

    getRandomColor() {
      const colors = [
        "0, 212, 255", // Cyan
        "102, 126, 234", // Purple
        "240, 147, 251", // Pink
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
  const numberOfParticles = 120

  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle())
  }

  function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x
        const dy = particlesArray[a].y - particlesArray[b].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.3
          ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
          ctx.lineWidth = 1.5
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
      ripple.style.background = "rgba(255, 255, 255, 0.6)"
      ripple.style.transform = "translate(-50%, -50%)"
      ripple.style.animation = "ripple 0.8s ease-out"
      ripple.style.pointerEvents = "none"

      button.style.position = "relative"
      button.style.overflow = "hidden"
      button.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 800)
    })
  })

  if (!document.querySelector("#ripple-animation")) {
    const style = document.createElement("style")
    style.id = "ripple-animation"
    style.textContent = `
      @keyframes ripple {
        to {
          width: 500px;
          height: 500px;
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const animatedElements = document.querySelectorAll(".work-card, .skill-item, .contact-card")
  animatedElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = `all 0.6s ease-out ${index * 0.1}s`
    observer.observe(el)
  })

  // ===== PARALLAX EFFECT ON SCROLL =====
  let lastScrollTop = 0
  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollDelta = scrollTop - lastScrollTop

      const hero = document.querySelector(".hero")
      if (hero && scrollTop < window.innerHeight) {
        hero.style.transform = `translateY(${scrollTop * 0.4}px)`
        hero.style.opacity = 1 - scrollTop / 800
      }

      lastScrollTop = scrollTop
    },
    { passive: true },
  )

  // ===== IMAGE LOADING OPTIMIZATION =====
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.style.opacity = "1"
    })
    img.style.transition = "opacity 0.5s ease-out"
  })

  // ===== ENHANCED CONSOLE MESSAGE =====
  console.log(
    "%c🔒 Mohamed Mooka - Cybersecurity Portfolio",
    "font-size: 24px; font-weight: 900; background: linear-gradient(135deg, #00d4ff, #667eea); -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding: 10px 0;",
  )
  console.log("%c⚡ Enhanced UX/UI Design", "font-size: 16px; color: #00d4ff; font-weight: 600;")
  console.log("%c🛡️ DFIR Specialist | SOC Analyst | Threat Hunter", "font-size: 14px; color: #b4bcd0;")

  // ===== PERFORMANCE: REDUCE MOTION =====
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.querySelectorAll("*").forEach((el) => {
      el.style.animationDuration = "0.01ms"
      el.style.transitionDuration = "0.01ms"
    })
  }

  // ===== EASTER EGG: KONAMI CODE =====
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]
  let konamiIndex = 0

  document.addEventListener("keydown", (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++
      if (konamiIndex === konamiCode.length) {
        document.body.style.filter = "hue-rotate(180deg)"
        setTimeout(() => {
          document.body.style.filter = "none"
        }, 3000)
        konamiIndex = 0
      }
    } else {
      konamiIndex = 0
    }
  })
})
