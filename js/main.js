// ==================== CONFIGURATION ====================
const CONFIG = {
  scrollOffset: 80,
  backToTopThreshold: 400,
  animationDelay: 100,
  animationDuration: 800,
  animationStagger: 150,
}

// ==================== UTILITY FUNCTIONS ====================
const Utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },

  // Check if element is in viewport
  isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset && rect.bottom >= 0
  },

  // Smooth scroll to element
  scrollToElement(element, offset = CONFIG.scrollOffset) {
    const targetPosition = element.offsetTop - offset
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })
  },
}

// ==================== SMOOTH SCROLL NAVIGATION ====================
const SmoothScroll = {
  init() {
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href")

        // Skip empty hash
        if (href === "#" || href === "#!") return

        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          Utils.scrollToElement(targetElement)

          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, href)
          }
        }
      })
    })
  },
}

// ==================== SCROLL ANIMATIONS ====================
const ScrollAnimations = {
  elements: null,
  observer: null,

  init() {
    this.elements = document.querySelectorAll(
      ".hero-content, .about-content, .about-visual, .project-card, .contact-card, .stat-card",
    )

    if (!this.elements.length) return

    const options = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 50)

          this.observer.unobserve(entry.target)
        }
      })
    }, options)

    this.setupElements()
  },

  setupElements() {
    this.elements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(40px)"
      element.style.transition = `opacity ${CONFIG.animationDuration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${CONFIG.animationDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`

      this.observer.observe(element)
    })
  },
}

// ==================== BACK TO TOP BUTTON ====================
const BackToTop = {
  button: null,
  isVisible: false,

  init() {
    this.button = document.querySelector(".back-to-top")
    if (!this.button) return

    this.button.addEventListener("click", () => this.scrollToTop())
    window.addEventListener(
      "scroll",
      Utils.throttle(() => this.handleScroll(), 100),
    )
  },

  handleScroll() {
    const shouldShow = window.pageYOffset > CONFIG.backToTopThreshold

    if (shouldShow && !this.isVisible) {
      this.show()
    } else if (!shouldShow && this.isVisible) {
      this.hide()
    }
  },

  show() {
    this.button.classList.add("visible")
    this.isVisible = true
  },

  hide() {
    this.button.classList.remove("visible")
    this.isVisible = false
  },

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  },
}

// ==================== PROJECT CARDS ====================
const ProjectCards = {
  init() {
    const cards = document.querySelectorAll(".project-card")

    cards.forEach((card) => {
      // Add 3D tilt effect on mouse move
      card.addEventListener("mousemove", (e) => this.handleMouseMove(e, card))
      card.addEventListener("mouseleave", () => this.handleMouseLeave(card))
    })
  },

  handleMouseMove(e, card) {
    // Only apply to non-disabled cards
    if (card.classList.contains("project-card-disabled")) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 30
    const rotateY = (centerX - x) / 30

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
  },

  handleMouseLeave(card) {
    card.style.transform = ""
  },
}

// ==================== CONTACT CARDS ====================
const ContactCards = {
  init() {
    const cards = document.querySelectorAll(".contact-card")

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => this.handleHover(card))
      card.addEventListener("mouseleave", () => this.handleLeave(card))
    })
  },

  handleHover(card) {
    const icon = card.querySelector(".contact-icon")
    if (icon) {
      icon.style.transform = "scale(1.1) rotate(5deg)"
    }
  },

  handleLeave(card) {
    const icon = card.querySelector(".contact-icon")
    if (icon) {
      icon.style.transform = "scale(1) rotate(0deg)"
    }
  },
}

// ==================== GRADIENT ORBS ANIMATION ====================
const GradientOrbs = {
  init() {
    const orbs = document.querySelectorAll(".gradient-orb")

    orbs.forEach((orb, index) => {
      this.animateOrb(orb, index)
    })
  },

  animateOrb(orb, index) {
    const duration = 20000 + index * 5000
    const offset = index * 7000

    orb.style.animationDuration = `${duration}ms`
    orb.style.animationDelay = `${offset}ms`
  },
}

// ==================== FOOTER YEAR ====================
const Footer = {
  init() {
    const yearElement = document.getElementById("year")
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear()
    }
  },
}

// ==================== PERFORMANCE MONITORING ====================
const Performance = {
  init() {
    // Use passive event listeners for better performance
    this.addPassiveListeners()

    // Prefetch links on hover
    this.setupPrefetch()
  },

  addPassiveListeners() {
    const passiveEvents = ["scroll", "touchstart", "touchmove", "wheel"]

    passiveEvents.forEach((event) => {
      document.addEventListener(event, () => {}, { passive: true })
    })
  },

  setupPrefetch() {
    const links = document.querySelectorAll('a[href^="project-"]')

    links.forEach((link) => {
      link.addEventListener("mouseenter", function () {
        const href = this.getAttribute("href")
        if (href && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
          const prefetchLink = document.createElement("link")
          prefetchLink.rel = "prefetch"
          prefetchLink.href = href
          document.head.appendChild(prefetchLink)
        }
      })
    })
  },
}

// ==================== INITIALIZE APPLICATION ====================
class App {
  constructor() {
    this.init()
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup())
    } else {
      this.setup()
    }
  }

  setup() {
    // Initialize all modules
    SmoothScroll.init()
    ScrollAnimations.init()
    BackToTop.init()
    ProjectCards.init()
    ContactCards.init()
    GradientOrbs.init()
    Footer.init()
    Performance.init()

    // Add loaded class for transitions
    setTimeout(() => {
      document.body.classList.add("loaded")
    }, CONFIG.animationDelay)

    // Log successful initialization
    console.log("[v0] Portfolio initialized successfully")
  }
}

// ==================== START APPLICATION ====================
new App()

// ==================== EXPORTS (for testing) ====================
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    Utils,
    SmoothScroll,
    ScrollAnimations,
    BackToTop,
    ProjectCards,
    ContactCards,
    GradientOrbs,
    Footer,
  }
}
