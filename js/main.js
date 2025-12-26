// ====================================
// Ultimate Portfolio - Main JavaScript
// By BLACKBOX AI
// ====================================

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initParticles()
  initScrollAnimations()
  initCardEffects()
  initSmoothScroll()
  initTypewriter()
  initTechTags()
  initPerformanceOptimizations()

  console.log("[v0] Ultimate Portfolio initialized successfully!")
})

// ====================================
// Particles Animation
// ====================================
function initParticles() {
  const canvas = document.getElementById("particles-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const particles = []
  const particleCount = 60
  const connectionDistance = 150

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  class Particle {
    constructor() {
      this.reset()
      this.y = Math.random() * canvas.height
      this.opacity = Math.random() * 0.5 + 0.2
    }

    reset() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = (Math.random() - 0.5) * 0.5
      this.radius = Math.random() * 2 + 1
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3)
      gradient.addColorStop(0, `rgba(0, 229, 255, ${this.opacity})`)
      gradient.addColorStop(1, `rgba(0, 229, 255, 0)`)
      ctx.fillStyle = gradient
      ctx.fill()
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  const mouse = { x: null, y: null, radius: 200 }

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })

  window.addEventListener("mouseleave", () => {
    mouse.x = null
    mouse.y = null
  })

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.update()
      particle.draw()

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius
          const angle = Math.atan2(dy, dx)
          particle.vx -= Math.cos(angle) * force * 0.15
          particle.vy -= Math.sin(angle) * force * 0.15
        }
      }
    })

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.25
          ctx.beginPath()
          ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`
          ctx.lineWidth = 1
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// ====================================
// Scroll Animations
// ====================================
function initScrollAnimations() {
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

  // Observe project cards with stagger
  document.querySelectorAll(".project-card-modern").forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(50px)"
    card.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`
    observer.observe(card)
  })

  // Observe section header
  const sectionHeader = document.querySelector(".section-header-modern")
  if (sectionHeader) {
    sectionHeader.style.opacity = "0"
    sectionHeader.style.transform = "translateY(30px)"
    sectionHeader.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
    observer.observe(sectionHeader)
  }

  // Observe notes
  const projectsNote = document.querySelector(".projects-note-modern")
  if (projectsNote) {
    projectsNote.style.opacity = "0"
    projectsNote.style.transform = "translateY(30px)"
    projectsNote.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s"
    observer.observe(projectsNote)
  }
}

// ====================================
// Card 3D Effects
// ====================================
function initCardEffects() {
  const cards = document.querySelectorAll(".project-card-modern")

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * 5
      const rotateY = ((centerX - x) / centerX) * 5

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = ""
    })
  })
}

// ====================================
// Smooth Scroll
// ====================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        const offsetTop = target.offsetTop - 20
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// ====================================
// Typewriter Effect (Already in CSS)
// ====================================
function initTypewriter() {
  // Typewriter effect is handled by CSS animations
  // This function is for future enhancements
}

// ====================================
// Tech Tags Interaction
// ====================================
function initTechTags() {
  const techTags = document.querySelectorAll(".tech-tag")

  techTags.forEach((tag) => {
    tag.addEventListener("click", function (e) {
      e.stopPropagation()

      // Add ripple effect
      const ripple = document.createElement("span")
      ripple.style.position = "absolute"
      ripple.style.borderRadius = "50%"
      ripple.style.background = "rgba(0, 229, 255, 0.6)"
      ripple.style.width = "20px"
      ripple.style.height = "20px"
      ripple.style.animation = "ripple 0.6s ease-out"
      ripple.style.pointerEvents = "none"

      const rect = this.getBoundingClientRect()
      ripple.style.left = e.clientX - rect.left - 10 + "px"
      ripple.style.top = e.clientY - rect.top - 10 + "px"

      this.style.position = "relative"
      this.appendChild(ripple)

      setTimeout(() => ripple.remove(), 600)

      // Log tech selection
      console.log("[v0] Tech tag clicked:", this.textContent.trim())
    })
  })

  // Add ripple animation if not exists
  if (!document.getElementById("ripple-styles")) {
    const style = document.createElement("style")
    style.id = "ripple-styles"
    style.textContent = `
      @keyframes ripple {
        to {
          width: 100px;
          height: 100px;
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

// ====================================
// Parallax Effects
// ====================================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset

  // Parallax for background elements
  const parallaxElements = document.querySelectorAll(".grid-background, .gradient-orb")

  parallaxElements.forEach((element, index) => {
    const speed = 0.3 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })

  // Parallax for hero content
  const heroContent = document.querySelector(".hero-content")
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
    heroContent.style.opacity = 1 - scrolled / 800
  }
})

// ====================================
// Performance Optimizations
// ====================================
function initPerformanceOptimizations() {
  // Reduce animations for users who prefer reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("*").forEach((element) => {
      element.style.animation = "none !important"
      element.style.transition = "none !important"
    })
    console.log("[v0] Reduced motion mode activated")
  }

  // Lazy load images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute("data-src")
            imageObserver.unobserve(img)
          }
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // Page load fade-in
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
}

// ====================================
// Button Hover Effects
// ====================================
document.querySelectorAll(".contact-btn").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.zIndex = "10"
  })

  button.addEventListener("mouseleave", function () {
    this.style.zIndex = "1"
  })
})

// ====================================
// Grid Background Animation
// ====================================
function animateGrid() {
  const grid = document.querySelector(".grid-background")
  if (!grid) return

  let opacity = 0.6
  let increasing = false

  setInterval(() => {
    if (increasing) {
      opacity += 0.005
      if (opacity >= 0.8) increasing = false
    } else {
      opacity -= 0.005
      if (opacity <= 0.4) increasing = true
    }
    grid.style.opacity = opacity
  }, 50)
}

animateGrid()

// ====================================
// Console Branding
// ====================================
console.log(
  "%c⚡ Mohamed Mooka - Cybersecurity Portfolio",
  "font-size: 20px; font-weight: 800; background: linear-gradient(135deg, #00e5ff 0%, #0093c4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding: 15px 0;",
)

console.log(
  "%c🚀 Ultimate Edition by BLACKBOX AI",
  "font-size: 14px; color: #8b5cf6; font-weight: 600; padding: 10px 0;",
)

console.log("%c✨ All systems operational", "font-size: 12px; color: #00ff88; padding: 5px 0;")
