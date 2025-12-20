// ==================================================
// UTILITY FUNCTIONS
// ==================================================

// Debounce function for performance
const debounce = (fn, delay = 100) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Throttle function for scroll events
const throttle = (fn, limit = 100) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ==================================================
// PAGE LOADER
// ==================================================

window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader")
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0"
      setTimeout(() => {
        loader.remove()
      }, 500)
    }, 800)
  }
})

// ==================================================
// NAVBAR FUNCTIONALITY
// ==================================================

const navbar = document.getElementById("navbar")
const navLinks = document.querySelectorAll(".nav-links a")
const sections = document.querySelectorAll("section[id]")
let lastScrollY = window.pageYOffset

// Navbar scroll effect with throttling
const handleNavbarScroll = throttle(() => {
  const currentScrollY = window.pageYOffset

  // Add/remove scrolled class
  if (currentScrollY > 100) {
    navbar.classList.add("scrolled")

    // Hide navbar on scroll down, show on scroll up
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
}, 100)

window.addEventListener("scroll", handleNavbarScroll)

// Active nav link highlighting
const highlightNavigation = throttle(() => {
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
}, 100)

window.addEventListener("scroll", highlightNavigation)

// ==================================================
// STATS COUNTER ANIMATION
// ==================================================

const animateCounter = (element) => {
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
        const delay = Number.parseInt(entry.target.getAttribute("data-delay")) || 0

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

// Initialize reveal animations
const initRevealAnimations = () => {
  const revealElements = document.querySelectorAll("[data-reveal]")
  revealElements.forEach((el) => revealObserver.observe(el))
}

// ==================================================
// TYPING EFFECT
// ==================================================

const initTypingEffect = () => {
  const typingText = document.querySelector(".typing-text")
  if (!typingText) return

  const text = typingText.getAttribute("data-text") || typingText.textContent
  typingText.textContent = ""
  let index = 0

  const type = () => {
    if (index < text.length) {
      typingText.textContent += text.charAt(index)
      index++
      setTimeout(type, 80)
    } else {
      // Add blinking cursor
      setInterval(() => {
        const currentColor = typingText.style.borderRightColor
        typingText.style.borderRightColor = currentColor === "transparent" ? "var(--color-primary)" : "transparent"
      }, 530)
    }
  }

  setTimeout(type, 1000)
}

// ==================================================
// SMOOTH SCROLL
// ==================================================

const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const target = document.querySelector(targetId)

      if (target) {
        const offset = 80
        const targetPosition = target.offsetTop - offset

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        closeMobileMenu()
      }
    })
  })
}

// ==================================================
// MOBILE MENU
// ==================================================

const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navLinksContainer = document.querySelector(".nav-links")

const closeMobileMenu = () => {
  if (navLinksContainer && mobileMenuToggle) {
    navLinksContainer.classList.remove("active")
    mobileMenuToggle.classList.remove("active")
    mobileMenuToggle.setAttribute("aria-expanded", "false")
    document.body.style.overflow = "auto"
  }
}

const initMobileMenu = () => {
  if (!mobileMenuToggle || !navLinksContainer) return

  mobileMenuToggle.addEventListener("click", () => {
    const isExpanded = mobileMenuToggle.getAttribute("aria-expanded") === "true"

    navLinksContainer.classList.toggle("active")
    mobileMenuToggle.classList.toggle("active")
    mobileMenuToggle.setAttribute("aria-expanded", !isExpanded)
    document.body.style.overflow = isExpanded ? "auto" : "hidden"
  })

  // Close menu on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // Close menu on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinksContainer.classList.contains("active")) {
      closeMobileMenu()
    }
  })
}

// ==================================================
// HEXAGONAL GRID BACKGROUND ANIMATION
// ==================================================

const initParticlesCanvas = () => {
  const canvas = document.getElementById("particles-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const resizeCanvas = () => {
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
      this.hexagons = []
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

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      gradient.addColorStop(0, `rgba(0, 229, 255, ${opacity * 0.8})`)
      gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity * 0.3})`)

      ctx.strokeStyle = gradient
      ctx.lineWidth = 1.5
      ctx.stroke()

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
      this.hexagons.forEach((hex) => {
        const wave1 = Math.sin(hex.x * 0.005 + this.time) * 0.5 + 0.5
        const wave2 = Math.cos(hex.y * 0.005 + this.time * 0.8) * 0.5 + 0.5
        const wave3 = Math.sin(hex.phase) * 0.5 + 0.5
        const opacity = (wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.3) * 0.4
        this.drawHexagon(hex.x, hex.y, this.hexSize - 3, opacity)
      })
    }
  }

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
      this.hue = Math.random() > 0.5 ? 180 : 270
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset()
      }
    }

    draw() {
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
  const particles = Array.from({ length: particleCount }, () => new FloatingParticle())

  let animationId
  const animate = () => {
    ctx.fillStyle = "rgba(5, 10, 31, 0.15)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    hexGrid.update()
    hexGrid.draw()

    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    animationId = requestAnimationFrame(animate)
  }

  animate()

  // Handle resize with debouncing
  const handleResize = debounce(() => {
    resizeCanvas()
    hexGrid.rows = Math.ceil(canvas.height / (hexGrid.hexSize * 1.5)) + 2
    hexGrid.cols = Math.ceil(canvas.width / (hexGrid.hexSize * Math.sqrt(3))) + 2
    hexGrid.init()
  }, 200)

  window.addEventListener("resize", handleResize)

  // Pause animation when page is hidden
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

const initBackToTop = () => {
  const backToTopBtn = document.querySelector(".back-to-top")
  if (!backToTopBtn) return

  const handleScroll = throttle(() => {
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add("visible")
    } else {
      backToTopBtn.classList.remove("visible")
    }
  }, 100)

  window.addEventListener("scroll", handleScroll)

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// ==================================================
// SCROLL INDICATOR
// ==================================================

const initScrollIndicator = () => {
  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (!scrollIndicator) return

  const handleScroll = throttle(() => {
    scrollIndicator.style.opacity = window.pageYOffset > 100 ? "0" : "1"
  }, 100)

  window.addEventListener("scroll", handleScroll)
}

// ==================================================
// LINK PREFETCHING
// ==================================================

const initLinkPrefetching = () => {
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
}

// ==================================================
// INITIALIZE ALL
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  initRevealAnimations()
  initTypingEffect()
  initSmoothScroll()
  initMobileMenu()
  initParticlesCanvas()
  initBackToTop()
  initScrollIndicator()
  initLinkPrefetching()
})
