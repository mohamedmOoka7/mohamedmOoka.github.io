document.addEventListener("DOMContentLoaded", () => {
  // Loading Screen
  const loadingScreen = document.querySelector(".loading-screen")

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("hide")
    }, 1500)
  })

  // Custom Cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`
      cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`
    })

    document.querySelectorAll("a, button, .nav-link").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform += " scale(1.5)"
        cursorFollower.style.transform += " scale(1.5)"
      })

      el.addEventListener("mouseleave", () => {
        cursor.style.transform = cursor.style.transform.replace(" scale(1.5)", "")
        cursorFollower.style.transform = cursorFollower.style.transform.replace(" scale(1.5)", "")
      })
    })
  }

  // Particles Canvas
  const particlesCanvas = document.getElementById("particles")
  const ctx = particlesCanvas.getContext("2d")

  function resizeCanvas() {
    particlesCanvas.width = window.innerWidth
    particlesCanvas.height = window.innerHeight
  }
  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  const particles = []
  const particleCount = 80
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

  // Navigation
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

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active")
      menuBtn.classList.toggle("active")
    })

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active")
        menuBtn.classList.remove("active")
      })
    })

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove("active")
        menuBtn.classList.remove("active")
      }
    })
  }

  // Smooth Scrolling
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

  // Scroll Animations
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

  // Parallax Orbs
  const glowOrbs = document.querySelectorAll(".glow-orb")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    glowOrbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.03
      orb.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // Skill Bars Animation
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

  // Counter Animation
  const counters = document.querySelectorAll(".stat-value[data-count]")

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target
          const count = Number.parseInt(target.getAttribute("data-count"))
          const duration = 2000
          const increment = count / (duration / 16)
          let current = 0

          const updateCounter = () => {
            current += increment
            if (current < count) {
              target.textContent = Math.floor(current)
              requestAnimationFrame(updateCounter)
            } else {
              target.textContent = count
            }
          }

          updateCounter()
          counterObserver.unobserve(target)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })

  // Back to Top Button
  const backToTop = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      backToTop.classList.add("show")
    } else {
      backToTop.classList.remove("show")
    }
  })

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Contact Cards Shine Effect
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

  // Project Cards 3D Effect
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth > 1024) {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 20
        const rotateY = (centerX - x) / 20

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`
      }
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = ""
    })
  })

  // Accessibility
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
    }
  })

  // Console Message
  console.log(
    "%c✨ محمد موكا - بورتفوليو أمن سيبراني",
    "font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding: 20px 0;",
  )
  console.log(
    "%c🚀 تصميم ثوري بواسطة BLACKBOX AI",
    "font-size: 14px; color: #8b5cf6; font-weight: 600; padding: 10px 0;",
  )
})
