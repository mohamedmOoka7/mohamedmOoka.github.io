// ==================================================
// MAIN JAVASCRIPT FILE
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================================
     DISABLE ANIMATION ON PROJECT PAGES
  =============================================== */

  if (document.body.classList.contains("no-animate")) {
    return
  }

  /* ===============================================
     CUSTOM CURSOR
  =============================================== */

  const cursor = document.querySelector(".custom-cursor")
  const cursorDot = document.querySelector(".custom-cursor-dot")

  if (cursor && cursorDot) {
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    function animateCursor() {
      const speed = 0.15
      const dotSpeed = 0.3

      cursorX += (mouseX - cursorX) * speed
      cursorY += (mouseY - cursorY) * speed
      dotX += (mouseX - dotX) * dotSpeed
      dotY += (mouseY - dotY) * dotSpeed

      cursor.style.left = cursorX + "px"
      cursor.style.top = cursorY + "px"
      cursorDot.style.left = dotX + "px"
      cursorDot.style.top = dotY + "px"

      requestAnimationFrame(animateCursor)
    }

    animateCursor()

    // Cursor hover effects
    const hoverElements = document.querySelectorAll("a, button, .btn")
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.width = "60px"
        cursor.style.height = "60px"
        cursor.style.borderColor = "var(--secondary)"
        cursor.style.opacity = "0.8"
      })

      el.addEventListener("mouseleave", () => {
        cursor.style.width = "40px"
        cursor.style.height = "40px"
        cursor.style.borderColor = "var(--primary)"
        cursor.style.opacity = "0.6"
      })
    })

    const magneticElements = document.querySelectorAll(".magnetic-btn")

    magneticElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.width = "60px"
        cursor.style.height = "60px"
        cursor.style.borderColor = "var(--secondary)"
        cursor.style.opacity = "0.8"
        cursor.style.background = "rgba(124, 58, 237, 0.1)"
      })

      el.addEventListener("mouseleave", () => {
        cursor.style.width = "40px"
        cursor.style.height = "40px"
        cursor.style.borderColor = "var(--primary)"
        cursor.style.opacity = "0.6"
        cursor.style.background = "transparent"
      })

      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
      })

      el.addEventListener("mouseleave", () => {
        el.style.transform = ""
      })
    })

    const tiltCards = document.querySelectorAll(".tilt-card")

    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = ""
      })
    })
  }

  /* ===============================================
     NEURAL NETWORK CANVAS ANIMATION
  =============================================== */

  const canvas = document.getElementById("neural-canvas")
  if (canvas) {
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 80
    const connectionDistance = 150

    class Particle {
      constructor() {
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
        ctx.fillStyle = "rgba(0, 245, 255, 0.5)"
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 245, 255, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      connectParticles()

      requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  }

  /* ===============================================
     MOBILE MENU TOGGLE
  =============================================== */

  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")
  const navItems = document.querySelectorAll(".nav-link")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
      document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : ""
    })

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        navLinks.classList.remove("active")
        document.body.style.overflow = ""
      })
    })
  }

  /* ===============================================
     TYPING EFFECT
  =============================================== */

  const typedTextSpan = document.querySelector(".typed-text")

  if (typedTextSpan) {
    const textArray = ["Cybersecurity Analyst", "DFIR Specialist", "SOC Operations Expert", "Incident Response Pro"]
    const typingDelay = 100
    const erasingDelay = 50
    const newTextDelay = 2000
    let textArrayIndex = 0
    let charIndex = 0

    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex)
        charIndex++
        setTimeout(type, typingDelay)
      } else {
        setTimeout(erase, newTextDelay)
      }
    }

    function erase() {
      if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1)
        charIndex--
        setTimeout(erase, erasingDelay)
      } else {
        textArrayIndex++
        if (textArrayIndex >= textArray.length) textArrayIndex = 0
        setTimeout(type, typingDelay + 500)
      }
    }

    setTimeout(type, 1000)
  }

  /* ===============================================
     SCROLL REVEAL ANIMATION
  =============================================== */

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show")
        revealObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const revealElements = document.querySelectorAll(".section, .card")
  revealElements.forEach((el) => revealObserver.observe(el))

  /* ===============================================
     CARD GLOW EFFECT (FOLLOW MOUSE)
  =============================================== */

  const cards = document.querySelectorAll(".card, .project-card")

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / card.offsetWidth) * 100
      const y = ((e.clientY - rect.top) / card.offsetHeight) * 100

      card.style.setProperty("--mouse-x", `${x}%`)
      card.style.setProperty("--mouse-y", `${y}%`)
    })
  })

  /* ===============================================
     COUNTER ANIMATION FOR STATS
  =============================================== */

  const animateCounter = (element) => {
    const target = Number.parseInt(element.getAttribute("data-target"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += increment
      if (current < target) {
        element.textContent = Math.floor(current)
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target + "+"
      }
    }

    updateCounter()
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll(".stat-number[data-target]")
          statNumbers.forEach((stat) => {
            if (!stat.classList.contains("counted")) {
              stat.classList.add("counted")
              animateCounter(stat)
            }
          })
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  const aboutSection = document.getElementById("about")
  if (aboutSection) {
    statsObserver.observe(aboutSection)
  }

  /* ===============================================
     ENHANCED SCROLL EFFECTS
  =============================================== */

  let ticking = false

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY
        const navbar = document.querySelector(".navbar")

        // Navbar effects
        if (scrolled > 50) {
          navbar.classList.add("scrolled")
        } else {
          navbar.classList.remove("scrolled")
        }

        // Parallax effect for hero
        const heroContent = document.querySelector(".hero-content")
        if (heroContent && scrolled < window.innerHeight) {
          heroContent.style.transform = `translateY(${scrolled * 0.3}px)`
          heroContent.style.opacity = 1 - scrolled / 500
        }

        // Update active nav state
        const sections = document.querySelectorAll(".section")
        const navItems = document.querySelectorAll(".nav-link")
        let current = ""

        sections.forEach((section) => {
          const sectionTop = section.offsetTop
          if (scrolled >= sectionTop - 200) {
            current = section.getAttribute("id")
          }
        })

        navItems.forEach((item) => {
          item.classList.remove("active")
          if (item.getAttribute("href").slice(1) === current) {
            item.classList.add("active")
          }
        })

        // Scroll to top button
        const scrollTopBtn = document.querySelector(".scroll-top")
        if (scrollTopBtn) {
          if (scrolled > 500) {
            scrollTopBtn.classList.add("visible")
          } else {
            scrollTopBtn.classList.remove("visible")
          }
        }

        ticking = false
      })

      ticking = true
    }
  })

  /* ===============================================
     SCROLL TO TOP BUTTON
  =============================================== */

  const scrollTopBtn = document.querySelector(".scroll-top")

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  /* ===============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
  =============================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        const offsetTop = target.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  /* ===============================================
     FOOTER YEAR AUTO UPDATE
  =============================================== */

  const footerYear = document.querySelector("footer p")
  if (footerYear) {
    footerYear.innerHTML = `© ${new Date().getFullYear()} Mohamed Mooka — Cybersecurity Portfolio`
  }
})

window.addEventListener("load", () => {
  const pageLoader = document.querySelector(".page-loader")

  setTimeout(() => {
    if (pageLoader) {
      pageLoader.classList.add("hidden")
      setTimeout(() => {
        pageLoader.style.display = "none"
      }, 500)
    }
  }, 800)
})

window.addEventListener("scroll", () => {
  const scrollProgress = document.querySelector(".scroll-progress")

  if (scrollProgress) {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (window.scrollY / windowHeight) * 100
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`
  }
})
