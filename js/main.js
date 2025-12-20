// ==================================================
// PAGE LOADER
// ==================================================

window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader")
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0"
      setTimeout(() => {
        loader.style.display = "none"
        document.body.style.overflow = "auto"
      }, 500)
    }, 800)
  }
})

// ==================================================
// NAVBAR SCROLL EFFECT
// ==================================================

const navbar = document.getElementById("navbar")
let lastScrollY = window.pageYOffset

let scrollTimeout
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    const currentScrollY = window.pageYOffset

    if (currentScrollY > 100) {
      navbar.classList.add("scrolled")

      // Improved scroll direction detection with smoother threshold
      if (currentScrollY > lastScrollY && currentScrollY > 400) {
        navbar.style.transform = "translateY(-100%)"
      } else {
        navbar.style.transform = "translateY(0)"
      }
    } else {
      navbar.classList.remove("scrolled")
      navbar.style.transform = "translateY(0)"
    }

    lastScrollY = currentScrollY
  }, 10)
})

const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-links a")

function highlightNavigation() {
  const scrollPosition = window.pageYOffset + 200

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

window.addEventListener("scroll", highlightNavigation)

// ==================================================
// STATS COUNTER ANIMATION
// ==================================================

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-target"))
  const duration = 2000
  const increment = target / (duration / 16)
  let current = 0

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target + "+"
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current) + "+"
    }
  }, 16)
}

// ==================================================
// SCROLL REVEAL ANIMATIONS
// ==================================================

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-delay") || 0
        setTimeout(() => {
          entry.target.classList.add("revealed")
        }, delay)

        // Animate stats on reveal
        if (entry.target.classList.contains("stats-inline")) {
          const statNumbers = entry.target.querySelectorAll(".stat-number")
          statNumbers.forEach((stat) => {
            if (!stat.classList.contains("animated")) {
              setTimeout(() => {
                animateCounter(stat)
                stat.classList.add("animated")
              }, delay)
            }
          })
        }

        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
)

document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll("[data-reveal]")
  revealElements.forEach((el) => revealObserver.observe(el))
})

// ==================================================
// TYPING EFFECT
// ==================================================

const typingText = document.querySelector(".typing-text")
if (typingText) {
  const text = typingText.textContent
  typingText.textContent = ""
  let index = 0

  function type() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index)
      index++
      setTimeout(type, 80)
    } else {
      typingText.style.borderRight = "2px solid var(--primary)"
      typingText.style.paddingRight = "5px"
      setInterval(() => {
        typingText.style.borderRightColor =
          typingText.style.borderRightColor === "transparent" ? "var(--primary)" : "transparent"
      }, 530)
    }
  }

  setTimeout(type, 1000)
}

// ==================================================
// SMOOTH SCROLL
// ==================================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offset = 80
      const targetPosition = target.offsetTop - offset

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// ==================================================
// MOBILE MENU
// ==================================================

const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navLinksContainer = document.querySelector(".nav-links")

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    const isExpanded = mobileMenuToggle.getAttribute("aria-expanded") === "true"

    navLinksContainer.classList.toggle("active")
    mobileMenuToggle.classList.toggle("active")

    mobileMenuToggle.setAttribute("aria-expanded", !isExpanded)

    document.body.style.overflow = isExpanded ? "auto" : "hidden"
  })

  // Close menu on link click
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("active")
      mobileMenuToggle.classList.remove("active")
      mobileMenuToggle.setAttribute("aria-expanded", "false")
      document.body.style.overflow = "auto"
    })
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinksContainer.classList.contains("active")) {
      navLinksContainer.classList.remove("active")
      mobileMenuToggle.classList.remove("active")
      mobileMenuToggle.setAttribute("aria-expanded", "false")
      document.body.style.overflow = "auto"
    }
  })
}

// ==================================================
// HEXAGONAL GRID BACKGROUND - PROFESSIONAL CYBERSECURITY THEME
// ==================================================

const canvas = document.getElementById("particles-canvas")
const ctx = canvas ? canvas.getContext("2d") : null

if (canvas && ctx) {
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()

  class HexagonGrid {
    constructor() {
      this.hexSize = 30
      this.rows = Math.ceil(canvas.height / (this.hexSize * 1.5)) + 2
      this.cols = Math.ceil(canvas.width / (this.hexSize * Math.sqrt(3))) + 2
      this.hexagons = []
      this.time = 0
      this.init()
    }

    init() {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          const x = col * this.hexSize * Math.sqrt(3) + ((row % 2) * this.hexSize * Math.sqrt(3)) / 2
          const y = row * this.hexSize * 1.5
          this.hexagons.push({
            x,
            y,
            phase: Math.random() * Math.PI * 2,
            speed: 0.002 + Math.random() * 0.003,
          })
        }
      }
    }

    drawHexagon(x, y, size, opacity) {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const hx = x + size * Math.cos(angle)
        const hy = y + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(hx, hy)
        else ctx.lineTo(hx, hy)
      }
      ctx.closePath()

      // Gradient stroke for depth
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      gradient.addColorStop(0, `rgba(0, 229, 255, ${opacity * 0.8})`)
      gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity * 0.3})`)

      ctx.strokeStyle = gradient
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Glow effect for highlighted hexagons
      if (opacity > 0.3) {
        ctx.shadowBlur = 15
        ctx.shadowColor = `rgba(0, 229, 255, ${opacity * 0.6})`
        ctx.stroke()
        ctx.shadowBlur = 0
      }
    }

    update() {
      this.time += 0.01

      this.hexagons.forEach((hex) => {
        hex.phase += hex.speed
      })
    }

    draw() {
      this.hexagons.forEach((hex, index) => {
        // Create wave effect based on position and time
        const wave1 = Math.sin(hex.x * 0.005 + this.time) * 0.5 + 0.5
        const wave2 = Math.cos(hex.y * 0.005 + this.time * 0.8) * 0.5 + 0.5
        const wave3 = Math.sin(hex.phase) * 0.5 + 0.5

        // Combine waves for complex pattern
        const opacity = (wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.3) * 0.4

        this.drawHexagon(hex.x, hex.y, this.hexSize - 3, opacity)
      })
    }
  }

  // Floating particles for additional depth
  class FloatingParticle {
    constructor() {
      this.reset()
    }

    reset() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = (Math.random() - 0.5) * 0.5
      this.size = Math.random() * 3 + 1
      this.opacity = Math.random() * 0.6 + 0.2
      this.hue = Math.random() > 0.5 ? 180 : 270 // Cyan or Purple
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset()
      }
    }

    draw() {
      // Draw particle with glow
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)

      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
      gradient.addColorStop(0, `hsla(${this.hue}, 100%, 60%, ${this.opacity})`)
      gradient.addColorStop(1, `hsla(${this.hue}, 100%, 60%, 0)`)

      ctx.fillStyle = gradient
      ctx.fill()
    }
  }

  const hexGrid = new HexagonGrid()
  const particleCount = window.innerWidth < 768 ? 30 : 60
  const particles = []

  for (let i = 0; i < particleCount; i++) {
    particles.push(new FloatingParticle())
  }

  let animationId
  function animate() {
    // Clear with slight fade for trail effect
    ctx.fillStyle = "rgba(5, 10, 31, 0.15)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw hexagonal grid
    hexGrid.update()
    hexGrid.draw()

    // Update and draw floating particles
    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    animationId = requestAnimationFrame(animate)
  }

  animate()

  let resizeTimeout
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      resizeCanvas()
      hexGrid.hexagons = []
      hexGrid.rows = Math.ceil(canvas.height / (hexGrid.hexSize * 1.5)) + 2
      hexGrid.cols = Math.ceil(canvas.width / (hexGrid.hexSize * Math.sqrt(3))) + 2
      hexGrid.init()
    }, 200)
  })

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId)
    } else {
      animate()
    }
  })
}

// ==================================================
// BACK TO TOP BUTTON
// ==================================================

const backToTopBtn = document.querySelector(".back-to-top")

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add("visible")
    } else {
      backToTopBtn.classList.remove("visible")
    }
  })

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// ==================================================
// SCROLL INDICATOR HIDE ON SCROLL
// ==================================================

const scrollIndicator = document.querySelector(".scroll-indicator")
if (scrollIndicator) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      scrollIndicator.style.opacity = "0"
    } else {
      scrollIndicator.style.opacity = "1"
    }
  })
}

// ==================================================
// PERFORMANCE OPTIMIZATIONS
// ==================================================

if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]')
  images.forEach((img) => {
    img.src = img.dataset.src
  })
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement("script")
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"
  document.body.appendChild(script)
}

document.querySelectorAll('a[href^="project-"]').forEach((link) => {
  link.addEventListener(
    "mouseenter",
    () => {
      const linkElement = document.createElement("link")
      linkElement.rel = "prefetch"
      linkElement.href = link.href
      document.head.appendChild(linkElement)
    },
    { once: true },
  )
})
