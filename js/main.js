document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("no-animate")) {
    return
  }

  /* ===============================================
     FLOATING NAVIGATION ACTIVE STATE
  =============================================== */

  const navDots = document.querySelectorAll(".nav-dot")
  const sections = document.querySelectorAll("section[id]")

  function updateActiveNav() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 200
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navDots.forEach((dot) => {
          dot.classList.remove("active")
          if (dot.getAttribute("data-section") === sectionId) {
            dot.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", updateActiveNav)

  /* ===============================================
     SMOOTH SCROLL WITH OFFSET
  =============================================== */

  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
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

  const observerOptions = {
    threshold: 0.1,
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
     BACK TO TOP BUTTON
  =============================================== */

  const backToTopButton = document.querySelector(".back-to-top")

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 500) {
        backToTopButton.classList.add("show")
      } else {
        backToTopButton.classList.remove("show")
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
     TYPING EFFECT FOR SUBTITLE
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
     PARALLAX EFFECT FOR HERO
  =============================================== */

  const heroBackground = document.querySelector(".hero-background")

  if (heroBackground) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallaxSpeed = 0.5

      heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`
    })
  }

  /* ===============================================
     PARTICLES CANVAS ANIMATION
  =============================================== */

  const canvas = document.getElementById("particlesCanvas")

  if (canvas) {
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

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
        ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particlesArray = []
    const numberOfParticles = 100

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesArray.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 - distance / 500})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animateParticles)
    }

    animateParticles()

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  }

  /* ===============================================
     SKILL BARS ANIMATION
  =============================================== */

  const skillBarsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll(".skill-progress")
          progressBars.forEach((bar) => {
            const width = bar.style.width
            bar.style.width = "0%"
            setTimeout(() => {
              bar.style.width = width
            }, 100)
          })
          skillBarsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  const skillsSection = document.getElementById("skills")
  if (skillsSection) {
    skillBarsObserver.observe(skillsSection)
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

  /* ===============================================
     MOUSE CURSOR EFFECT (OPTIONAL)
  =============================================== */

  const cursor = document.createElement("div")
  cursor.className = "custom-cursor"
  document.body.appendChild(cursor)

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  })

  /* ===============================================
     PERFORMANCE OPTIMIZATION
  =============================================== */

  function debounce(func, wait = 10) {
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

  window.addEventListener(
    "scroll",
    debounce(() => {
      updateActiveNav()
    }, 10),
  )

  /* ===============================================
     CONSOLE MESSAGE
  =============================================== */

  console.log("%c🛡️ Mohamed Mooka Portfolio", "font-size: 20px; font-weight: bold; color: #38bdf8;")
  console.log("%cLooking for a Cybersecurity Analyst? Let's connect!", "font-size: 14px; color: #9ca3af;")
})
