document.addEventListener("DOMContentLoaded", () => {
  // Skip all animations on project pages
  if (document.body.classList.contains("no-animate")) {
    return
  }

  /* ===============================================
     PARTICLES ANIMATION - Optimized Canvas
  =============================================== */

  const canvas = document.querySelector(".particles-canvas")

  if (canvas) {
    const ctx = canvas.getContext("2d", { alpha: true })
    let particles = []
    let animationFrameId
    let isVisible = true

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()

    let resizeTimeout
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resizeCanvas()
        init()
      }, 250)
    })

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.size = Math.random() * 2.5 + 1
        this.speedX = Math.random() * 0.6 - 0.3
        this.speedY = Math.random() * 0.6 - 0.3
        this.opacity = Math.random() * 0.6 + 0.3
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x > window.innerWidth) this.x = 0
        if (this.x < 0) this.x = window.innerWidth
        if (this.y > window.innerHeight) this.y = 0
        if (this.y < 0) this.y = window.innerHeight
      }

      draw() {
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(59, 130, 246, ${this.opacity})`
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    function init() {
      particles = []
      const numberOfParticles = Math.floor((window.innerWidth * window.innerHeight) / 12000)

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle())
      }
    }

    function connectParticles() {
      const maxDistance = 150
      const maxDistanceSq = maxDistance * maxDistance

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distanceSq = dx * dx + dy * dy

          if (distanceSq < maxDistanceSq) {
            const opacity = 0.2 * (1 - Math.sqrt(distanceSq) / maxDistance)
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      if (!isVisible) return

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    document.addEventListener("visibilitychange", () => {
      isVisible = !document.hidden
      if (isVisible) {
        animate()
      } else {
        cancelAnimationFrame(animationFrameId)
      }
    })

    init()
    animate()

    // Cleanup on page unload
    window.addEventListener("beforeunload", () => {
      cancelAnimationFrame(animationFrameId)
    })
  }

  /* ===============================================
     FLOATING NAVIGATION - Active State
  =============================================== */

  const navDots = document.querySelectorAll(".nav-dot")
  const sections = document.querySelectorAll("section[id]")

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id")
          navDots.forEach((dot) => {
            dot.classList.toggle("active", dot.getAttribute("data-section") === sectionId)
          })
        }
      })
    },
    {
      threshold: 0.5,
      rootMargin: "-100px 0px -100px 0px",
    },
  )

  sections.forEach((section) => navObserver.observe(section))

  /* ===============================================
     SMOOTH SCROLL
  =============================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")

      if (href !== "#" && href.length > 1) {
        e.preventDefault()

        const target = document.querySelector(href)
        if (target) {
          const offsetTop = target.offsetTop - 50

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  /* ===============================================
     SCROLL REVEAL ANIMATION
  =============================================== */

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show")
          revealObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  document.querySelectorAll(".section, .card").forEach((el) => revealObserver.observe(el))

  /* ===============================================
     BACK TO TOP BUTTON
  =============================================== */

  const backToTopButton = document.querySelector(".back-to-top")

  if (backToTopButton) {
    let ticking = false

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          backToTopButton.classList.toggle("show", window.pageYOffset > 500)
          ticking = false
        })
        ticking = true
      }
    })

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  /* ===============================================
     TYPING EFFECT
  =============================================== */

  const typingElement = document.querySelector(".typing-effect")

  if (typingElement) {
    const text = typingElement.textContent
    typingElement.textContent = ""
    let charIndex = 0

    function type() {
      if (charIndex < text.length) {
        typingElement.textContent += text.charAt(charIndex)
        charIndex++
        setTimeout(type, 100)
      }
    }

    setTimeout(type, 1000)
  }

  /* ===============================================
     PARALLAX EFFECT
  =============================================== */

  const heroBackground = document.querySelector(".hero-background")

  if (heroBackground) {
    let ticking = false

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset
          const parallaxSpeed = 0.5
          heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`
          ticking = false
        })
        ticking = true
      }
    })
  }

  /* ===============================================
     FOOTER YEAR AUTO UPDATE
  =============================================== */

  const yearElement = document.getElementById("year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }

  /* ===============================================
     LAZY LOADING IMAGES
  =============================================== */

  const images = document.querySelectorAll("img[data-src]")

  if (images.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          observer.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }

  /* ===============================================
     CONSOLE BRANDING
  =============================================== */

  console.log(
    "%c🛡️ Mohamed Mooka Portfolio",
    "font-size: 20px; font-weight: bold; color: #3b82f6; text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);",
  )
  console.log("%cCybersecurity Analyst | DFIR & SOC Operations", "font-size: 14px; color: #94a3b8; font-style: italic;")
  console.log("%cLooking to connect? mohamed.ashraf.abdallah65@gmail.com", "font-size: 12px; color: #60a5fa;")
})
