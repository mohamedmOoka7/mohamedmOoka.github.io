// ===============================================
// MODERN CYBERSECURITY PORTFOLIO - JAVASCRIPT
// Mohamed Mooka | 2025
// ===============================================

// ================= GLOBAL STATE =================
const isScrolling = false

// ================= MATRIX RAIN ANIMATION =================
const MatrixRain = {
  canvas: null,
  ctx: null,
  chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?",
  fontSize: 14,
  columns: 0,
  drops: [],

  init() {
    this.canvas = document.getElementById("matrix-canvas")
    if (!this.canvas) return

    this.ctx = this.canvas.getContext("2d")
    this.resize()
    window.addEventListener("resize", () => this.resize())
    this.animate()
  },

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.columns = Math.floor(this.canvas.width / this.fontSize)
    this.drops = Array(this.columns).fill(1)
  },

  animate() {
    this.ctx.fillStyle = "rgba(5, 8, 22, 0.05)"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.fillStyle = "#00d4ff"
    this.ctx.font = `${this.fontSize}px monospace`

    for (let i = 0; i < this.drops.length; i++) {
      const char = this.chars[Math.floor(Math.random() * this.chars.length)]
      const x = i * this.fontSize
      const y = this.drops[i] * this.fontSize

      this.ctx.fillText(char, x, y)

      if (y > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0
      }
      this.drops[i]++
    }

    requestAnimationFrame(() => this.animate())
  },
}

// ================= NAVIGATION =================
const Navigation = {
  nav: null,
  dots: [],
  sections: [],

  init() {
    this.nav = document.querySelector(".floating-nav")
    if (!this.nav) return

    this.dots = Array.from(this.nav.querySelectorAll(".nav-dot"))
    this.sections = this.dots.map((dot) => document.querySelector(dot.getAttribute("href")))

    this.dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(dot.getAttribute("href"))
        this.scrollToSection(target)
      })
    })

    window.addEventListener("scroll", () => this.updateActiveSection(), { passive: true })
    this.updateActiveSection()
  },

  scrollToSection(target) {
    if (!target) return

    const offset = 80
    const targetPosition = target.offsetTop - offset

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })
  },

  updateActiveSection() {
    const scrollPos = window.scrollY + 200

    this.sections.forEach((section, index) => {
      if (!section) return

      const sectionTop = section.offsetTop
      const sectionBottom = sectionTop + section.offsetHeight

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        this.dots.forEach((dot) => dot.classList.remove("active"))
        this.dots[index]?.classList.add("active")
      }
    })
  },
}

// ================= SMOOTH SCROLL =================
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href")
        if (href === "#") return

        e.preventDefault()
        const target = document.querySelector(href)

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
  },
}

// ================= BACK TO TOP =================
const BackToTop = {
  button: null,

  init() {
    this.button = document.querySelector(".back-to-top")
    if (!this.button) return

    this.button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })

    window.addEventListener("scroll", () => this.toggle(), { passive: true })
  },

  toggle() {
    if (window.scrollY > 500) {
      this.button.classList.add("visible")
    } else {
      this.button.classList.remove("visible")
    }
  },
}

// ================= SCROLL ANIMATIONS =================
const ScrollAnimations = {
  elements: [],

  init() {
    this.elements = document.querySelectorAll("[data-aos]")

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    this.elements.forEach((el) => observer.observe(el))
  },
}

// ================= CURSOR EFFECTS =================
const CursorEffects = {
  init() {
    // Add hover effects to cards
    const cards = document.querySelectorAll(".glass-card")

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        card.style.setProperty("--mouse-x", `${x}px`)
        card.style.setProperty("--mouse-y", `${y}px`)
      })
    })
  },
}

// ================= TYPING EFFECT =================
const TypingEffect = {
  init() {
    const element = document.querySelector(".typing-text")
    if (!element) return

    const text = element.textContent
    element.textContent = ""
    element.style.borderRight = "2px solid var(--color-primary)"

    let index = 0

    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index)
        index++
        setTimeout(type, 80)
      } else {
        // Keep blinking cursor
        setTimeout(() => {
          element.style.animation = "blink 0.75s step-end infinite"
        }, 500)
      }
    }

    setTimeout(type, 1000)
  },
}

// ================= PROJECT CARDS PARALLAX =================
const ProjectParallax = {
  init() {
    const cards = document.querySelectorAll(".project-card")

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 20
        const rotateY = (centerX - x) / 20

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = ""
      })
    })
  },
}

// ================= PERFORMANCE OPTIMIZATIONS =================
const Performance = {
  init() {
    // Lazy load images
    const images = document.querySelectorAll("img[data-src]")

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  },
}

// ================= YEAR UPDATE =================
const YearUpdate = {
  init() {
    const yearElement = document.getElementById("year")
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear()
    }
  },
}

// ================= HEADER HIDE ON SCROLL =================
const HeaderScroll = {
  lastScroll: 0,

  init() {
    window.addEventListener(
      "scroll",
      () => {
        const currentScroll = window.scrollY

        // You can add header hide/show logic here if needed

        this.lastScroll = currentScroll
      },
      { passive: true },
    )
  },
}

// ================= INITIALIZE ALL =================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all modules
  MatrixRain.init()
  Navigation.init()
  SmoothScroll.init()
  BackToTop.init()
  ScrollAnimations.init()
  CursorEffects.init()
  TypingEffect.init()
  ProjectParallax.init()
  Performance.init()
  YearUpdate.init()
  HeaderScroll.init()

  // Add loaded class to body
  document.body.classList.add("loaded")

  console.log("%c🔐 Portfolio Loaded Successfully", "color: #00d4ff; font-size: 16px; font-weight: bold;")
  console.log("%cMohamed Mooka | Cybersecurity Analyst", "color: #7b2cbf; font-size: 14px;")
})

// ================= UTILITY FUNCTIONS =================

// Throttle function for performance
function throttle(func, wait) {
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

// Debounce function for performance
function debounce(func, wait) {
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
