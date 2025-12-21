// ==========================================
// ELITE CYBERSECURITY PORTFOLIO - PURE JAVASCRIPT
// Ultra High-Performance, Zero Dependencies, Award-Winning
// ==========================================

;(() => {
  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================

  const $ = (selector) => document.querySelector(selector)
  const $$ = (selector) => document.querySelectorAll(selector)

  const debounce = (func, wait) => {
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

  const throttle = (func, limit) => {
    let inThrottle
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  const random = (min, max, decimals = 0) => {
    const num = Math.random() * (max - min) + min
    return decimals > 0 ? Number.parseFloat(num.toFixed(decimals)) : Math.floor(num)
  }

  // ==========================================
  // ENHANCED ANIMATED PARTICLES
  // ==========================================

  function initParticles() {
    const particlesContainer = $(".particles")
    if (!particlesContainer) return

    const particleCount = window.innerWidth < 768 ? 30 : 60

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      // Random positioning
      particle.style.left = `${random(0, 100)}%`
      particle.style.top = `${random(0, 100)}%`

      const size = random(4, 8)
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random animation delay and duration
      particle.style.animationDelay = `${random(0, 10, 2)}s`
      particle.style.animationDuration = `${random(8, 15, 1)}s`

      particle.style.opacity = random(2, 6, 1) / 10

      particlesContainer.appendChild(particle)
    }
  }

  // ==========================================
  // ENHANCED TYPING EFFECT
  // ==========================================

  function initTypingEffect() {
    const typingElement = $(".typing-effect")
    if (!typingElement) return

    const text = typingElement.textContent
    typingElement.textContent = ""
    let charIndex = 0

    function typeChar() {
      if (charIndex < text.length) {
        typingElement.textContent += text.charAt(charIndex)
        charIndex++

        // Variable typing speed for more natural feel
        const delay = text.charAt(charIndex) === " " ? 100 : random(40, 90)
        setTimeout(typeChar, delay)
      }
    }

    // Start typing after a delay
    setTimeout(typeChar, 700)
  }

  // ==========================================
  // SMOOTH SCROLLING & NAVIGATION
  // ==========================================

  function initSmoothScrolling() {
    const navLinks = $$('a[href^="#"]')

    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href")

        // Skip if href is just "#"
        if (href === "#") return

        e.preventDefault()
        const targetId = href.substring(1)
        const targetSection = $(`#${targetId}`)

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })

          // Update URL without causing jump
          history.pushState(null, null, href)
        }
      })
    })
  }

  // ==========================================
  // ENHANCED ACTIVE NAVIGATION INDICATOR
  // ==========================================

  function updateActiveNav() {
    const sections = $$("section[id]")
    const navDots = $$(".nav-dot")

    const scrollPosition = window.scrollY + window.innerHeight / 3

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navDots.forEach((dot) => dot.classList.remove("active"))

        const activeDot = $(`.nav-dot[data-section="${sectionId}"]`)
        if (activeDot) {
          activeDot.classList.add("active")
        }
      }
    })
  }

  // ==========================================
  // BACK TO TOP BUTTON
  // ==========================================

  function initBackToTop() {
    const backToTopBtn = $(".back-to-top")
    if (!backToTopBtn) return

    function toggleBackToTop() {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add("visible")
      } else {
        backToTopBtn.classList.remove("visible")
      }
    }

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })

    // Initial check
    toggleBackToTop()

    // Update on scroll
    window.addEventListener("scroll", throttle(toggleBackToTop, 100))
  }

  // ==========================================
  // ENHANCED SCROLL ANIMATIONS
  // ==========================================

  function initScrollAnimations() {
    const observerOptions = {
      threshold: [0.1, 0.3, 0.5],
      rootMargin: "0px 0px -80px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0
          setTimeout(() => {
            entry.target.classList.add("fade-in")
            entry.target.style.opacity = "1"
          }, delay)
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe cards and project items with staggered delays
    const animatedElements = $$(".card, .project-card, .contact-card")
    animatedElements.forEach((el, index) => {
      el.style.opacity = "0"
      el.dataset.delay = (index % 3) * 100 // Stagger by row
      observer.observe(el)
    })
  }

  // ==========================================
  // DYNAMIC YEAR IN FOOTER
  // ==========================================

  function updateYear() {
    const yearElement = $("#year")
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear()
    }
  }

  // ==========================================
  // ENHANCED KEYBOARD NAVIGATION
  // ==========================================

  function initKeyboardNav() {
    let ctrlPressed = false

    document.addEventListener("keydown", (e) => {
      // Track Ctrl key
      if (e.key === "Control") ctrlPressed = true

      if (ctrlPressed) {
        // Ctrl + H to go home
        if (e.key === "h" || e.key === "H") {
          e.preventDefault()
          const homeSection = $("#home")
          if (homeSection) homeSection.scrollIntoView({ behavior: "smooth" })
        }

        // Ctrl + P to go to projects
        if (e.key === "p" || e.key === "P") {
          e.preventDefault()
          const projectsSection = $("#projects")
          if (projectsSection) projectsSection.scrollIntoView({ behavior: "smooth" })
        }

        // Ctrl + C to go to contact
        if (e.key === "c" || e.key === "C") {
          e.preventDefault()
          const contactSection = $("#contact")
          if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" })
        }
      }

      // Arrow key navigation
      if (e.key === "ArrowDown") {
        window.scrollBy({ top: 100, behavior: "smooth" })
      }
      if (e.key === "ArrowUp") {
        window.scrollBy({ top: -100, behavior: "smooth" })
      }
    })

    document.addEventListener("keyup", (e) => {
      if (e.key === "Control") ctrlPressed = false
    })
  }

  // ==========================================
  // ENHANCED PARALLAX EFFECT
  // ==========================================

  function initParallax() {
    const heroBackground = $(".hero-background")
    if (!heroBackground) return

    window.addEventListener(
      "scroll",
      throttle(() => {
        const scrolled = window.scrollY
        const heroHeight = $(".hero").offsetHeight

        if (scrolled < heroHeight) {
          const opacity = 1 - (scrolled / heroHeight) * 0.7
          const translateY = scrolled * 0.5
          const scale = 1 + (scrolled / heroHeight) * 0.1

          heroBackground.style.opacity = opacity
          heroBackground.style.transform = `translateY(${translateY}px) scale(${scale})`
        }
      }, 10),
    )
  }

  // ==========================================
  // ENHANCED 3D CARD TILT EFFECT
  // ==========================================

  function initCardTilt() {
    if (window.innerWidth < 768) return

    const cards = $$(".card, .project-card, .contact-card")

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY) / centerY) * 8
        const rotateY = ((centerX - x) / centerX) * 8

        card.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          scale3d(1.03, 1.03, 1.03)
          translateZ(20px)
        `
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = ""
      })

      card.addEventListener("mouseenter", () => {
        card.style.transition = "transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)"
      })
    })
  }

  // ==========================================
  // PERFORMANCE: LAZY LOAD IMAGES
  // ==========================================

  function initLazyLoading() {
    const images = $$("img[data-src]")

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          observer.unobserve(img)

          img.style.opacity = "0"
          img.style.transition = "opacity 0.5s ease"
          img.onload = () => {
            img.style.opacity = "1"
          }
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }

  // ==========================================
  // ENHANCED CONSOLE EASTER EGG
  // ==========================================

  function initEasterEgg() {
    const styles = [
      "color: #00ff88",
      "font-size: 18px",
      "font-weight: bold",
      "text-shadow: 0 0 15px #00ff88, 0 0 30px #00ff88",
      "padding: 10px",
    ].join(";")

    const styles2 = ["color: #94a3b8", "font-size: 14px", "padding: 5px"].join(";")

    const styles3 = ["color: #00ff88", "font-size: 14px", "font-weight: 600"].join(";")

    console.log("%c🛡️ Welcome, Security Researcher!", styles)
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", styles2)
    console.log("%cInterested in the code? Check out the repository on GitHub!", styles2)
    console.log("%c💼 Looking to collaborate? Let's connect!", styles3)
    console.log("%c📧 Email: mohamed.ashraf.abdallah65@gmail.com", styles2)
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", styles2)

    console.log("%c💡 Pro Tip: Use Ctrl+H, Ctrl+P, or Ctrl+C for quick navigation!", "color: #ffa502; font-size: 12px;")
  }

  // ==========================================
  // ENHANCED LOADING ANIMATION
  // ==========================================

  function initLoadingAnimation() {
    document.body.style.opacity = "0"

    window.addEventListener("load", () => {
      setTimeout(() => {
        document.body.style.transition = "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        document.body.style.opacity = "1"
      }, 100)
    })
  }

  // ==========================================
  // THEME DETECTION & SYSTEM PREFERENCES
  // ==========================================

  function detectPreferredTheme() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    console.log(`%c🌓 Color scheme: ${prefersDark ? "Dark" : "Light"}`, "color: #00ff88;")
    console.log(`%c⚡ Reduced motion: ${prefersReducedMotion ? "Enabled" : "Disabled"}`, "color: #00ff88;")
  }

  // ==========================================
  // ENHANCED CURSOR TRAIL (OPTIONAL)
  // ==========================================

  function initCursorTrail() {
    if (window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const trail = []
    const trailLength = 8
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "9999"
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    document.body.appendChild(canvas)

    let mouseX = 0
    let mouseY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      trail.push({ x: mouseX, y: mouseY })
      if (trail.length > trailLength) {
        trail.shift()
      }

      trail.forEach((point, index) => {
        const opacity = (index + 1) / trailLength
        const size = ((index + 1) / trailLength) * 6

        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 136, ${opacity * 0.3})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Resize canvas on window resize
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  }

  // ==========================================
  // ENHANCED SECTION REVEAL ON SCROLL
  // ==========================================

  function initSectionReveal() {
    const sections = $$(".section")

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: "-50px",
      },
    )

    sections.forEach((section) => {
      section.style.opacity = "0"
      section.style.transform = "translateY(30px)"
      section.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      sectionObserver.observe(section)
    })
  }

  // ==========================================
  // FPS COUNTER (DEV MODE)
  // ==========================================

  function initFPSCounter() {
    if (!window.location.search.includes("debug")) return

    const fpsElement = document.createElement("div")
    fpsElement.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      background: rgba(0, 255, 136, 0.9);
      color: #0a0e17;
      padding: 8px 12px;
      font-family: monospace;
      font-size: 14px;
      font-weight: bold;
      border-radius: 4px;
      z-index: 99999;
      pointer-events: none;
    `
    document.body.appendChild(fpsElement)

    let lastTime = performance.now()
    let frames = 0

    function updateFPS() {
      frames++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        fpsElement.textContent = `FPS: ${frames}`
        frames = 0
        lastTime = currentTime
      }

      requestAnimationFrame(updateFPS)
    }

    updateFPS()
  }

  // ==========================================
  // INITIALIZE ALL
  // ==========================================

  function init() {
    console.log("%c🚀 Initializing Elite Portfolio...", "color: #00ff88; font-size: 16px; font-weight: bold;")

    // Core functionality
    initParticles()
    initTypingEffect()
    initSmoothScrolling()
    initBackToTop()
    updateYear()

    // Visual enhancements
    initScrollAnimations()
    initParallax()
    initCardTilt()
    initSectionReveal()

    // Optional enhancements
    initCursorTrail()

    // Utilities
    initKeyboardNav()
    initLazyLoading()

    // Fun stuff
    initEasterEgg()
    detectPreferredTheme()
    initLoadingAnimation()
    initFPSCounter()

    // Event listeners
    window.addEventListener("scroll", throttle(updateActiveNav, 100))

    // Responsive handling
    let resizeTimer
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        // Re-initialize card tilt on resize
        initCardTilt()
      }, 250)
    })

    console.log(
      "%c✅ Portfolio initialized successfully! All systems operational.",
      "color: #00ff88; font-weight: bold;",
    )
    console.log("%c⚡ Performance mode: ULTRA", "color: #00ff88;")
  }

  // ==========================================
  // START APPLICATION
  // ==========================================

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    init()
  }

  window.addEventListener("keydown", (e) => {
    // Skip to main content (Alt + M)
    if (e.altKey && e.key === "m") {
      e.preventDefault()
      const main = $("main")
      if (main) {
        main.focus()
        main.scrollIntoView({ behavior: "smooth" })
      }
    }
  })
})()
