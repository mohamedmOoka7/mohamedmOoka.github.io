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

window.addEventListener("scroll", () => {
  const currentScrollY = window.pageYOffset

  if (currentScrollY > 100) {
    navbar.classList.add("scrolled")

    // Hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 500) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }
  } else {
    navbar.classList.remove("scrolled")
    navbar.style.transform = "translateY(0)"
  }

  lastScrollY = currentScrollY
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
// PARTICLES BACKGROUND
// ==================================================

const canvas = document.getElementById("particles-canvas")
const ctx = canvas ? canvas.getContext("2d") : null

if (canvas && ctx) {
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()

  class Particle {
    constructor() {
      this.reset()
    }

    reset() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = (Math.random() - 0.5) * 0.5
      this.size = Math.random() * 2 + 1
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset()
      }
    }

    draw() {
      ctx.fillStyle = "rgba(0, 212, 255, 0.6)"
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const particleCount = window.innerWidth < 768 ? 40 : 80
  const particles = []

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 150)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
  }

  let animationId
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach((p) => {
      p.update()
      p.draw()
    })
    connectParticles()
    animationId = requestAnimationFrame(animate)
  }

  animate()

  let resizeTimeout
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      resizeCanvas()
    }, 250)
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
