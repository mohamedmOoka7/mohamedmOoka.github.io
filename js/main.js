// ==================================================
// ULTRA-MODERN PORTFOLIO - MAIN JAVASCRIPT
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================================
     PARTICLE ANIMATION CANVAS
  =============================================== */

  const canvas = document.getElementById("particlesCanvas")
  if (canvas) {
    const ctx = canvas.getContext("2d")
    let particles = []
    const particleCount = 50

    // Resize canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    function initParticles() {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    // Connect particles
    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * (1 - distance / 150)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      connectParticles()
      requestAnimationFrame(animate)
    }

    initParticles()
    animate()
  }

  /* ===============================================
     MOBILE NAVIGATION TOGGLE
  =============================================== */

  const mobileToggle = document.getElementById("mobileToggle")
  const navLinks = document.getElementById("navLinks")

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      mobileToggle.classList.toggle("active")
    })

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
        mobileToggle.classList.remove("active")
      })
    })

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove("active")
        mobileToggle.classList.remove("active")
      }
    })
  }

  /* ===============================================
     NAVBAR SCROLL EFFECT
  =============================================== */

  const navbar = document.getElementById("navbar")

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  }

  /* ===============================================
     SMOOTH SCROLL
  =============================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#" || href === "") return

      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  /* ===============================================
     INTERSECTION OBSERVER - REVEAL ANIMATIONS
  =============================================== */

  const revealElements = document.querySelectorAll(".experience-card, .project-card, .info-card, .stat-card")

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`
          }, index * 100)
          revealObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  revealElements.forEach((el) => {
    el.style.opacity = "0"
    revealObserver.observe(el)
  })

  /* ===============================================
     ANIMATED COUNTER FOR STATS
  =============================================== */

  const statNumbers = document.querySelectorAll(".stat-number")

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target
          const targetValue = Number.parseInt(target.getAttribute("data-target"))
          let current = 0
          const increment = targetValue / 60

          const timer = setInterval(() => {
            current += increment
            if (current >= targetValue) {
              target.textContent = targetValue + (targetValue === 100 ? "%" : "+")
              clearInterval(timer)
            } else {
              target.textContent = Math.floor(current) + (targetValue === 100 ? "%" : "+")
            }
          }, 30)

          statsObserver.unobserve(target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statNumbers.forEach((stat) => statsObserver.observe(stat))

  /* ===============================================
     3D TILT EFFECT ON CARDS
  =============================================== */

  const cards = document.querySelectorAll(".experience-card, .project-card, .contact-card, .info-card")

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 15
      const rotateY = (centerX - x) / 15

      card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = ""
    })
  })

  /* ===============================================
     DYNAMIC YEAR IN FOOTER
  =============================================== */

  const yearElement = document.getElementById("year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }

  /* ===============================================
     PARALLAX EFFECT ON SCROLL
  =============================================== */

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroContent = document.querySelector(".hero-content")
    const shapes = document.querySelectorAll(".shape")

    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.4}px)`
      heroContent.style.opacity = 1 - scrolled / 700
    }

    shapes.forEach((shape, index) => {
      if (scrolled < window.innerHeight) {
        const speed = 0.2 + index * 0.1
        shape.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed * 0.5}px)`
      }
    })
  })

  /* ===============================================
     CONSOLE EASTER EGG
  =============================================== */

  console.log(
    "%c🔒 Mohamed Mooka - Cybersecurity Portfolio",
    "color: #06b6d4; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);",
  )
  console.log("%c⚡ Built with modern web technologies", "color: #3b82f6; font-size: 14px;")
  console.log("%c🛡️ Passionate about securing digital systems", "color: #8b5cf6; font-size: 14px;")
})
