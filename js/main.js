document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("no-animate")) {
    return
  }

  /* ===============================================
     MATRIX RAIN EFFECT
  =============================================== */

  const matrixCanvas = document.getElementById("matrix-canvas")
  const matrixCtx = matrixCanvas.getContext("2d")

  matrixCanvas.width = window.innerWidth
  matrixCanvas.height = window.innerHeight

  const matrix = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const fontSize = 14
  const columns = matrixCanvas.width / fontSize

  const drops = []
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100
  }

  function drawMatrix() {
    matrixCtx.fillStyle = "rgba(2, 6, 23, 0.05)"
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height)

    matrixCtx.fillStyle = "rgba(56, 189, 248, 0.8)"
    matrixCtx.font = fontSize + "px monospace"

    for (let i = 0; i < drops.length; i++) {
      const text = matrix[Math.floor(Math.random() * matrix.length)]
      matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }

      drops[i]++
    }
  }

  setInterval(drawMatrix, 50)

  window.addEventListener("resize", () => {
    matrixCanvas.width = window.innerWidth
    matrixCanvas.height = window.innerHeight
  })

  /* ===============================================
     ADVANCED PARTICLE SYSTEM
  =============================================== */

  const canvas = document.getElementById("particle-canvas")
  const ctx = canvas.getContext("2d")

  let particlesArray = []
  const mouse = {
    x: null,
    y: null,
    radius: 150,
  }

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x
    mouse.y = e.y
  })

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
  })

  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x
      this.y = y
      this.directionX = directionX
      this.directionY = directionY
      this.size = size
      this.color = color
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
      ctx.fillStyle = this.color
      ctx.fill()
    }

    update() {
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY
      }

      // Check collision with mouse
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < mouse.radius + this.size) {
        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
          this.x += 5
        }
        if (mouse.x > this.x && this.x > this.size * 10) {
          this.x -= 5
        }
        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
          this.y += 5
        }
        if (mouse.y > this.y && this.y > this.size * 10) {
          this.y -= 5
        }
      }

      this.x += this.directionX
      this.y += this.directionY

      this.draw()
    }
  }

  function init() {
    particlesArray = []
    const numberOfParticles = (canvas.height * canvas.width) / 9000
    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 3 + 1
      const x = Math.random() * (window.innerWidth - size * 2 - size * 2) + size * 2
      const y = Math.random() * (window.innerHeight - size * 2 - size * 2) + size * 2
      const directionX = Math.random() * 0.4 - 0.2
      const directionY = Math.random() * 0.4 - 0.2
      const color = "rgba(56, 189, 248, 0.8)"

      particlesArray.push(new Particle(x, y, directionX, directionY, size, color))
    }
  }

  function connect() {
    let opacityValue = 1
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const distance =
          (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) +
          (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y)
        if (distance < (canvas.width / 7) * (canvas.height / 7)) {
          opacityValue = 1 - distance / 20000
          ctx.strokeStyle = "rgba(56, 189, 248," + opacityValue + ")"
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
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update()
    }
    connect()
  }

  init()
  animate()

  /* ===============================================
     FLOATING NAVIGATION ACTIVE STATE
  =============================================== */

  const navDots = document.querySelectorAll(".nav-dot")
  const sections = document.querySelectorAll("section[id]")

  function updateActiveNav() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 200
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navDots.forEach((dot) => {
          dot.classList.remove("active")
          if (dot.getAttribute("data-section") === sectionId) {
            dot.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", updateActiveNav)

  /* ===============================================
     SMOOTH SCROLL WITH OFFSET
  =============================================== */

  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")

      if (href !== "#" && href.length > 1) {
        e.preventDefault()

        const target = document.querySelector(href)
        if (target) {
          const offsetTop = target.offsetTop - 50

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  /* ===============================================
     SCROLL REVEAL ANIMATION
  =============================================== */

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show")
        if (entry.target.classList.contains("card")) {
          const cards = entry.target.parentElement.querySelectorAll(".card")
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("show")
            }, index * 100)
          })
        }
        revealObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const revealElements = document.querySelectorAll(".section, .card")
  revealElements.forEach((el) => revealObserver.observe(el))

  /* ===============================================
     BACK TO TOP BUTTON
  =============================================== */

  const backToTopButton = document.querySelector(".back-to-top")

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 500) {
        backToTopButton.classList.add("show")
      } else {
        backToTopButton.classList.remove("show")
      }
    })

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  /* ===============================================
     TYPING EFFECT FOR SUBTITLE
  =============================================== */

  const typingElement = document.querySelector(".typing-effect")

  if (typingElement) {
    const text = typingElement.textContent
    typingElement.textContent = ""
    let charIndex = 0

    function type() {
      if (charIndex < text.length) {
        typingElement.textContent += text.charAt(charIndex)
        charIndex++
        setTimeout(type, 100)
      }
    }

    setTimeout(type, 1000)
  }

  /* ===============================================
     PARALLAX EFFECT FOR HERO
  =============================================== */

  const heroBackground = document.querySelector(".hero-background")

  if (heroBackground) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallaxSpeed = 0.5

      heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`
    })
  }

  /* ===============================================
     3D TILT EFFECT FOR CARDS
  =============================================== */

  const cards = document.querySelectorAll(".card")

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * 10
      const rotateY = ((centerX - x) / centerX) * 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = ""
    })
  })

  /* ===============================================
     MAGNETIC EFFECT FOR BUTTONS
  =============================================== */

  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      button.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px) scale(1.05)`
    })

    button.addEventListener("mouseleave", () => {
      button.style.transform = ""
    })
  })

  /* ===============================================
     FOOTER YEAR AUTO UPDATE
  =============================================== */

  const yearElement = document.getElementById("year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }

  /* ===============================================
     LAZY LOADING IMAGES
  =============================================== */

  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  /* ===============================================
     SCROLL PROGRESS INDICATOR
  =============================================== */

  const scrollProgressBar = document.querySelector(".scroll-progress-bar")

  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollPercentage = (scrollTop / scrollHeight) * 100

    if (scrollProgressBar) {
      scrollProgressBar.style.width = scrollPercentage + "%"
    }
  }

  window.addEventListener("scroll", updateScrollProgress)

  /* ===============================================
     SKILL BARS ANIMATION
  =============================================== */

  const skillBarsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillItems = entry.target.querySelectorAll(".skill-item")
          skillItems.forEach((item, index) => {
            setTimeout(() => {
              const progress = item.querySelector(".skill-progress")
              const progressValue = progress.getAttribute("data-progress")
              progress.style.setProperty("--progress-width", progressValue + "%")
              item.classList.add("animate")
            }, index * 200)
          })
          skillBarsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  const skillsSection = document.querySelector(".skills-section")
  if (skillsSection) {
    skillBarsObserver.observe(skillsSection)
  }

  /* ===============================================
     ENHANCED SMOOTH CURSOR FOLLOWER
  =============================================== */

  const cursor = document.createElement("div")
  cursor.classList.add("cursor-follower")
  cursor.style.cssText = `
    position: fixed;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.6), transparent);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease, opacity 0.3s ease;
    mix-blend-mode: screen;
    display: none;
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.8);
  `
  document.body.appendChild(cursor)

  const cursorRing = document.createElement("div")
  cursorRing.classList.add("cursor-ring")
  cursorRing.style.cssText = `
    position: fixed;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid rgba(56, 189, 248, 0.5);
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.2s ease, opacity 0.3s ease;
    display: none;
  `
  document.body.appendChild(cursorRing)

  let cursorX = 0
  let cursorY = 0
  let currentX = 0
  let currentY = 0
  let ringX = 0
  let ringY = 0

  document.addEventListener("mousemove", (e) => {
    cursorX = e.clientX
    cursorY = e.clientY
  })

  function animateCursor() {
    currentX += (cursorX - currentX) * 0.15
    currentY += (cursorY - currentY) * 0.15
    ringX += (cursorX - ringX) * 0.1
    ringY += (cursorY - ringY) * 0.1

    cursor.style.left = currentX - 12.5 + "px"
    cursor.style.top = currentY - 12.5 + "px"
    cursorRing.style.left = ringX - 20 + "px"
    cursorRing.style.top = ringY - 20 + "px"

    requestAnimationFrame(animateCursor)
  }

  // Cursor hover effects
  const interactiveElements = document.querySelectorAll("a, button, .card")
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(1.5)"
      cursorRing.style.transform = "scale(1.5)"
    })
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)"
      cursorRing.style.transform = "scale(1)"
    })
  })

  // Only show custom cursor on desktop
  if (window.innerWidth > 768) {
    cursor.style.display = "block"
    cursorRing.style.display = "block"
    animateCursor()
  }

  /* ===============================================
     PERFORMANCE OPTIMIZATION
  =============================================== */

  function debounce(func, wait = 10) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  window.addEventListener(
    "scroll",
    debounce(() => {
      // Scroll-dependent functions already called above
    }, 10),
  )

  /* ===============================================
     CONSOLE MESSAGE
  =============================================== */

  console.log("%c🛡️ Mohamed Mooka Portfolio", "font-size: 20px; font-weight: bold; color: #38bdf8;")
  console.log("%cLooking for a Cybersecurity Analyst? Let's connect!", "font-size: 14px; color: #9ca3af;")
})
