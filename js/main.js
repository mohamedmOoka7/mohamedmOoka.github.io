// ==================================================
// ADVANCED PORTFOLIO INTERACTIONS
// Mohamed Mooka - Cybersecurity Portfolio
// ==================================================

class PortfolioApp {
  constructor() {
    this.state = {
      isAnimating: false,
      scrollY: 0,
      mouseX: 0,
      mouseY: 0,
    }

    this.init()
  }

  init() {
    if (document.body.classList.contains("no-animate")) return

    this.setupParticles()
    this.setupNavigation()
    this.setupScrollEffects()
    this.setupInteractions()
    this.setupUtilities()
    this.setupMagneticEffects()
    this.setupCursorTrail()
    this.setupTextAnimations()
  }

  /* ===============================================
     PARTICLES SYSTEM - Enhanced with WebGL-like effects
  =============================================== */

  setupParticles() {
    const canvas = document.querySelector(".particles-canvas")
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: false })
    let particles = []
    let animationFrameId
    let isVisible = true

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()

    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          resizeCanvas()
          initParticles()
        })
      }, 250)
    }

    window.addEventListener("resize", handleResize)

    class Particle {
      constructor() {
        this.reset()
        this.vx = 0
        this.vy = 0
        this.life = Math.random() * 100
      }

      reset() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.size = Math.random() * 3 + 0.5
        this.baseSpeedX = (Math.random() - 0.5) * 0.8
        this.baseSpeedY = (Math.random() - 0.5) * 0.8
        this.opacity = Math.random() * 0.5 + 0.3
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.angle = Math.random() * Math.PI * 2
      }

      update(mouseX, mouseY) {
        this.life++

        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          this.vx -= (dx / distance) * force * 0.5
          this.vy -= (dy / distance) * force * 0.5
        }

        this.vx *= 0.95
        this.vy *= 0.95

        this.x += this.baseSpeedX + this.vx
        this.y += this.baseSpeedY + this.vy

        this.opacity = 0.3 + Math.sin(this.life * this.pulseSpeed) * 0.3

        if (this.x > window.innerWidth + 10) this.x = -10
        if (this.x < -10) this.x = window.innerWidth + 10
        if (this.y > window.innerHeight + 10) this.y = -10
        if (this.y < -10) this.y = window.innerHeight + 10
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)
        gradient.addColorStop(0, `rgba(59, 130, 246, ${this.opacity})`)
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${this.opacity * 0.5})`)
        gradient.addColorStop(1, `rgba(59, 130, 246, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles = []
      const numberOfParticles = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 10000), 150)

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle())
      }
    }

    const connectParticles = () => {
      const maxDistance = 120
      const maxDistanceSq = maxDistance * maxDistance

      for (let i = 0; i < particles.length; i++) {
        let connections = 0
        for (let j = i + 1; j < particles.length && connections < 3; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distanceSq = dx * dx + dy * dy

          if (distanceSq < maxDistanceSq) {
            const opacity = 0.15 * (1 - Math.sqrt(distanceSq) / maxDistance)
            const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
            gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`)
            gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            connections++
          }
        }
      }
    }

    const animate = () => {
      if (!isVisible) return

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      particles.forEach((particle) => {
        particle.update(this.state.mouseX, this.state.mouseY)
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

    initParticles()
    animate()

    window.addEventListener("beforeunload", () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    })
  }

  /* ===============================================
     SMART NAVIGATION SYSTEM
  =============================================== */

  setupNavigation() {
    const navDots = document.querySelectorAll(".nav-dot")
    const sections = document.querySelectorAll("section[id]")

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("id")
            navDots.forEach((dot) => {
              const isActive = dot.getAttribute("data-section") === sectionId
              dot.classList.toggle("active", isActive)

              if (isActive) {
                dot.style.transform = "scale(1.2)"
                setTimeout(() => {
                  dot.style.transform = ""
                }, 300)
              }
            })
          }
        })
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-80px 0px -80px 0px",
      },
    )

    sections.forEach((section) => navObserver.observe(section))

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

            this.createRipple(e)
          }
        }
      })
    })
  }

  /* ===============================================
     ADVANCED SCROLL EFFECTS
  =============================================== */

  setupScrollEffects() {
    let ticking = false

    const parallaxElements = document.querySelectorAll(".hero-background, .gradient-orb")

    const updateParallax = () => {
      const scrolled = window.pageYOffset
      this.state.scrollY = scrolled

      parallaxElements.forEach((element, index) => {
        const speed = 0.3 + index * 0.1
        element.style.transform = `translateY(${scrolled * speed}px)`
      })

      ticking = false
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    })

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("show")
              revealObserver.unobserve(entry.target)
            }, index * 100)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    document.querySelectorAll(".section, .card, .project-card").forEach((el) => revealObserver.observe(el))
  }

  /* ===============================================
     INTERACTIVE ELEMENTS
  =============================================== */

  setupInteractions() {
    const backToTopButton = document.querySelector(".back-to-top")

    if (backToTopButton) {
      let ticking = false

      window.addEventListener("scroll", () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollPercent =
              (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            backToTopButton.style.setProperty("--scroll-percent", `${scrollPercent}%`)
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

    const typingElement = document.querySelector(".typing-effect")

    if (typingElement) {
      const text = typingElement.textContent
      typingElement.textContent = ""
      let charIndex = 0
      const isDeleting = false

      const type = () => {
        if (!isDeleting && charIndex < text.length) {
          typingElement.textContent += text.charAt(charIndex)
          charIndex++
          setTimeout(type, 80 + Math.random() * 40)
        }
      }

      setTimeout(type, 1200)
    }

    document.querySelectorAll(".project-card").forEach((card, index) => {
      card.addEventListener("mouseenter", (e) => {
        card.style.setProperty("--hover-x", `${e.clientX - card.offsetLeft}px`)
        card.style.setProperty("--hover-y", `${e.clientY - card.offsetTop}px`)
      })

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20

        card.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-10px)`
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = ""
      })
    })
  }

  /* ===============================================
     MAGNETIC BUTTON EFFECTS
  =============================================== */

  setupMagneticEffects() {
    const magneticElements = document.querySelectorAll(".btn, .contact-card, .nav-dot")

    magneticElements.forEach((element) => {
      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        const distance = Math.sqrt(x * x + y * y)
        const maxDistance = 100

        if (distance < maxDistance) {
          const strength = (maxDistance - distance) / maxDistance
          element.style.transform = `translate(${x * strength * 0.3}px, ${y * strength * 0.3}px)`
        }
      })

      element.addEventListener("mouseleave", () => {
        element.style.transform = ""
      })
    })
  }

  /* ===============================================
     CURSOR TRAIL EFFECT
  =============================================== */

  setupCursorTrail() {
    if (window.innerWidth > 768) {
      let mouseX = 0
      let mouseY = 0
      let cursorX = 0
      let cursorY = 0

      document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
        this.state.mouseX = mouseX
        this.state.mouseY = mouseY
      })

      const animateCursor = () => {
        const speed = 0.15
        cursorX += (mouseX - cursorX) * speed
        cursorY += (mouseY - cursorY) * speed

        requestAnimationFrame(animateCursor)
      }

      animateCursor()
    }
  }

  /* ===============================================
     TEXT ANIMATIONS
  =============================================== */

  setupTextAnimations() {
    const animatedHeadings = document.querySelectorAll(".hero-title-xl, .section h2")

    animatedHeadings.forEach((heading) => {
      const text = heading.textContent
      const words = text.split(" ")

      heading.innerHTML = words
        .map((word, index) => {
          return `<span class="word" style="--word-index: ${index}">${word}</span>`
        })
        .join(" ")
    })
  }

  /* ===============================================
     UTILITY FUNCTIONS
  =============================================== */

  setupUtilities() {
    const yearElement = document.getElementById("year")
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear()
    }

    const images = document.querySelectorAll("img[data-src]")

    if (images.length > 0) {
      const imageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target
              img.classList.add("loading")

              img.src = img.dataset.src
              img.onload = () => {
                img.classList.remove("loading")
                img.classList.add("loaded")
              }

              img.removeAttribute("data-src")
              observer.unobserve(img)
            }
          })
        },
        {
          rootMargin: "50px",
        },
      )

      images.forEach((img) => imageObserver.observe(img))
    }

    const styles = {
      title: "font-size: 24px; font-weight: bold; color: #3b82f6; text-shadow: 0 0 20px rgba(59, 130, 246, 0.8);",
      subtitle: "font-size: 16px; color: #8b5cf6; font-style: italic; font-weight: 600;",
      info: "font-size: 13px; color: #60a5fa; background: rgba(59, 130, 246, 0.1); padding: 4px 8px; border-radius: 4px;",
    }

    console.log("%c🛡️ Mohamed Mooka Portfolio", styles.title)
    console.log("%cCybersecurity Analyst | DFIR & SOC Operations", styles.subtitle)
    console.log("%c📧 mohamed.ashraf.abdallah65@gmail.com", styles.info)
    console.log("%c🔗 github.com/mohamedmOoka7", styles.info)
  }

  createRipple(e) {
    const ripple = document.createElement("span")
    ripple.classList.add("ripple")
    ripple.style.left = `${e.clientX}px`
    ripple.style.top = `${e.clientY}px`

    document.body.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.portfolioApp = new PortfolioApp()
})

if (window.location.hostname === "localhost") {
  window.addEventListener("load", () => {
    const perfData = window.performance.timing
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
    console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, "color: #10b981; font-weight: bold;")
  })
}
