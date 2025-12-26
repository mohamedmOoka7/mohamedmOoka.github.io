document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loadingScreen")

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("hidden")
    }, 1000)
  })

  const particlesCanvas = document.getElementById("particles")
  const ctx = particlesCanvas.getContext("2d")

  function resizeCanvas() {
    particlesCanvas.width = window.innerWidth
    particlesCanvas.height = window.innerHeight
  }
  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Particle system
  const particles = []
  const particleCount = window.innerWidth < 768 ? 40 : 80
  const connectionDistance = 120

  class Particle {
    constructor() {
      this.x = Math.random() * particlesCanvas.width
      this.y = Math.random() * particlesCanvas.height
      this.vx = (Math.random() - 0.5) * 0.8
      this.vy = (Math.random() - 0.5) * 0.8
      this.radius = Math.random() * 2.5 + 0.5
      this.opacity = Math.random() * 0.5 + 0.2
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0 || this.x > particlesCanvas.width) this.vx *= -1
      if (this.y < 0 || this.y > particlesCanvas.height) this.vy *= -1
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2)
      gradient.addColorStop(0, `rgba(59, 130, 246, ${this.opacity})`)
      gradient.addColorStop(1, `rgba(59, 130, 246, 0)`)
      ctx.fillStyle = gradient
      ctx.fill()
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  const mouse = { x: null, y: null, radius: 180 }

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x
    mouse.y = e.y
  })

  window.addEventListener("mouseleave", () => {
    mouse.x = null
    mouse.y = null
  })

  function animateParticles() {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height)

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
          particle.vx -= Math.cos(angle) * force * 0.2
          particle.vy -= Math.sin(angle) * force * 0.2
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
          const opacity = (1 - distance / connectionDistance) * 0.3
          ctx.beginPath()
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
          ctx.lineWidth = 1
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(animateParticles)
  }

  animateParticles()

  const nav = document.querySelector(".nav")
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section[id]")
  const menuBtn = document.querySelector(".menu-btn")

  function updateActiveNav() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 200
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", updateActiveNav)
  updateActiveNav()

  // Mobile menu toggle
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const isActive = nav.classList.toggle("active")
      menuBtn.classList.toggle("active")
      menuBtn.setAttribute("aria-expanded", isActive.toString())
    })

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active")
        menuBtn.classList.remove("active")
        menuBtn.setAttribute("aria-expanded", "false")
      })
    })

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove("active")
        menuBtn.classList.remove("active")
        menuBtn.setAttribute("aria-expanded", "false")
      }
    })
  }

  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")

      if (href !== "#" && href.length > 1) {
        e.preventDefault()

        const target = document.querySelector(href)
        if (target) {
          const offsetTop = target.offsetTop - 80

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  const animatedElements = document.querySelectorAll("[data-animate]")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -80px 0px",
  }

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-delay") || 0
        setTimeout(() => {
          entry.target.classList.add("animated")
        }, delay)
        scrollObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  animatedElements.forEach((element) => {
    scrollObserver.observe(element)
  })

  const glowOrbs = document.querySelectorAll(".glow-orb")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    glowOrbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.03
      orb.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  const skillCards = document.querySelectorAll(".skill-card")

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector(".skill-progress")
          if (progressBar) {
            const progress = progressBar.getAttribute("data-progress") || 90
            progressBar.style.transform = `scaleX(${progress / 100})`
          }
          skillObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 },
  )

  skillCards.forEach((card) => {
    skillObserver.observe(card)
  })

  const statValues = document.querySelectorAll(".stat-value")

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target
          const count = target.getAttribute("data-count")

          if (count) {
            const finalValue = Number.parseInt(count)
            const duration = 2000
            const increment = finalValue / (duration / 16)
            let current = 0

            const timer = setInterval(() => {
              current += increment
              if (current >= finalValue) {
                current = finalValue
                clearInterval(timer)
              }
              target.textContent = Math.floor(current) + (target.textContent.includes("%") ? "%" : "+")
            }, 16)
          }

          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statValues.forEach((stat) => {
    if (stat.getAttribute("data-count")) {
      statsObserver.observe(stat)
    }
  })

  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = ""
    })
  })

  const contactCards = document.querySelectorAll(".contact-card")

  contactCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const shine = card.querySelector(".card-shine")
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`
      }
    })
  })

  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      const distance = Math.sqrt(x * x + y * y)
      const maxDistance = 50

      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance
        button.style.transform = `translate(${x * strength * 0.3}px, ${y * strength * 0.3}px)`
      }
    })

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)"
    })
  })

  const backToTopBtn = document.getElementById("backToTop")

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

  const cursorTrail = []
  const maxTrailLength = 15

  document.addEventListener("mousemove", (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() })

    if (cursorTrail.length > maxTrailLength) {
      cursorTrail.shift()
    }
  })

  const gradientTexts = document.querySelectorAll(".gradient-title")

  window.addEventListener("scroll", () => {
    const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100

    gradientTexts.forEach((text) => {
      text.style.backgroundPosition = `${scrollPercent}% center`
    })
  })

  console.log(
    "%c✨ Mohamed Mooka - Cybersecurity Portfolio",
    "font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding: 20px 0;",
  )

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.querySelectorAll("*").forEach((el) => {
      el.style.animation = "none !important"
      el.style.transition = "none !important"
    })

    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height)
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("active")) {
      nav.classList.remove("active")
      menuBtn.classList.remove("active")
      menuBtn.setAttribute("aria-expanded", "false")
    }
  })

  const images = document.querySelectorAll("img[loading='lazy']")

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.classList.add("loaded")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => {
      imageObserver.observe(img)
    })
  }

  window.scrollTo({ top: 0, behavior: "instant" })

  const heroTitle = document.querySelector(".gradient-title")
  if (heroTitle) {
    const chars = heroTitle.querySelectorAll(".char")
    chars.forEach((char, index) => {
      char.style.animationDelay = `${0.5 + index * 0.05}s`
    })
  }
})
