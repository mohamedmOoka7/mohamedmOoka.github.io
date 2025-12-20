// ==================================================
// MAIN JAVASCRIPT - MASTERPIECE EDITION
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================================
     MOBILE MENU TOGGLE
  =============================================== */

  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      menuToggle.classList.toggle("active")

      const bars = menuToggle.querySelectorAll("span")
      if (navLinks.classList.contains("active")) {
        bars[0].style.transform = "rotate(45deg) translateY(10px)"
        bars[1].style.opacity = "0"
        bars[2].style.transform = "rotate(-45deg) translateY(-10px)"
      } else {
        bars.forEach((bar) => {
          bar.style.transform = ""
          bar.style.opacity = ""
        })
      }
    })

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
        menuToggle.classList.remove("active")

        const bars = menuToggle.querySelectorAll("span")
        bars.forEach((bar) => {
          bar.style.transform = ""
          bar.style.opacity = ""
        })
      })
    })
  }

  /* ===============================================
     NAVBAR SCROLL EFFECT - ENHANCED
  =============================================== */

  const navbar = document.querySelector(".navbar")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 80) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    if (currentScroll > lastScroll && currentScroll > 150) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }

    lastScroll = currentScroll
  })

  /* ===============================================
     SCROLL REVEAL ANIMATION - ENHANCED
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

  const revealElements = document.querySelectorAll(".section, .card, .skill-category, .project-card")
  revealElements.forEach((el) => revealObserver.observe(el))

  /* ===============================================
     MATRIX RAIN EFFECT - ENHANCED
  =============================================== */

  const canvas = document.getElementById("matrix-canvas")
  if (canvas) {
    const ctx = canvas.getContext("2d")

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrix = "01アイウエオカキクケコサシスセソタチツテト"
    const fontSize = 14
    const columns = canvas.width / fontSize

    const drops = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height
    }

    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = fontSize + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]

        const brightness = Math.random() * 0.5 + 0.5
        ctx.fillStyle = `rgba(0, 217, 255, ${brightness * 0.5})`

        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    setInterval(drawMatrix, 50)

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  }

  /* ===============================================
     PARTICLES EFFECT - ENHANCED WITH MORE VARIETY
  =============================================== */

  const particlesContainer = document.getElementById("particles")
  if (particlesContainer) {
    const particleCount = 40

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      const size = Math.random() * 4 + 1

      particle.style.position = "absolute"
      particle.style.width = size + "px"
      particle.style.height = size + "px"
      particle.style.background = `rgba(0, 217, 255, ${Math.random() * 0.5 + 0.3})`
      particle.style.borderRadius = "50%"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"

      const duration = Math.random() * 15 + 10
      const delay = Math.random() * 5

      particle.style.animation = `floatParticle ${duration}s ease-in-out infinite ${delay}s`
      particle.style.boxShadow = `0 0 ${size * 3}px rgba(0, 217, 255, 0.5)`

      particlesContainer.appendChild(particle)
    }

    const style = document.createElement("style")
    style.textContent = `
      @keyframes floatParticle {
        0%, 100% {
          transform: translate(0, 0);
          opacity: 0.3;
        }
        25% {
          transform: translate(20px, -30px);
          opacity: 0.6;
        }
        50% {
          transform: translate(-15px, -60px);
          opacity: 0.4;
        }
        75% {
          transform: translate(25px, -90px);
          opacity: 0.5;
        }
      }
    `
    document.head.appendChild(style)
  }

  /* ===============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
  =============================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#") return

      e.preventDefault()
      const target = document.querySelector(href)

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
     CARD GLOW EFFECT FOLLOW MOUSE - ENHANCED
  =============================================== */

  const cards = document.querySelectorAll(".card, .skill-category, .project-card, .contact-card")

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const glow = card.querySelector(".card-glow")
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 217, 255, 0.4) 0%, transparent 60%)`
      }
    })
  })

  /* ===============================================
     TYPING EFFECT FOR SUBTITLE - ENHANCED
  =============================================== */

  const typingText = document.querySelector(".typing-text")
  if (typingText) {
    const text = typingText.textContent
    typingText.textContent = ""
    let i = 0

    function type() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i)
        i++
        setTimeout(type, Math.random() * 50 + 30)
      }
    }

    setTimeout(type, 1000)
  }

  /* ===============================================
     COUNTER ANIMATION FOR STATS - ENHANCED
  =============================================== */

  const statNumbers = document.querySelectorAll(".stat-number[data-count]")

  const animateCounter = (element) => {
    const target = Number.parseInt(element.getAttribute("data-count"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += increment
      if (current < target) {
        element.textContent = Math.floor(current) + "+"
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
          animateCounter(entry.target)
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statNumbers.forEach((stat) => statsObserver.observe(stat))

  /* ===============================================
     PARALLAX EFFECT FOR HERO ORBS
  =============================================== */

  const orbs = document.querySelectorAll(".orb")

  if (orbs.length > 0) {
    let mouseX = 0.5
    let mouseY = 0.5

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX / window.innerWidth
      mouseY = e.clientY / window.innerHeight
    })

    function animateOrbs() {
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 15
        const x = (mouseX - 0.5) * speed
        const y = (mouseY - 0.5) * speed

        orb.style.transform = `translate(${x}px, ${y}px)`
      })

      requestAnimationFrame(animateOrbs)
    }

    animateOrbs()
  }

  /* ===============================================
     DYNAMIC YEAR IN FOOTER
  =============================================== */

  const footerYear = document.querySelector("footer .footer-right p")
  if (footerYear && footerYear.textContent.includes("2025")) {
    footerYear.innerHTML = footerYear.innerHTML.replace("2025", new Date().getFullYear())
  }

  /* ===============================================
     SCROLL PROGRESS INDICATOR
  =============================================== */

  const progressBar = document.createElement("div")
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #00d9ff, #0099ff);
    width: 0%;
    z-index: 9999;
    transition: width 0.1s ease;
  `
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100

    progressBar.style.width = scrollPercent + "%"
  })

  /* ===============================================
     CURSOR GLOW EFFECT
  =============================================== */

  const cursorGlow = document.querySelector(".cursor-glow")

  if (cursorGlow) {
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    const speed = 0.15

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursorGlow.style.opacity = "1"
    })

    document.addEventListener("mouseleave", () => {
      cursorGlow.style.opacity = "0"
    })

    function animateCursor() {
      const distX = mouseX - cursorX
      const distY = mouseY - cursorY

      cursorX += distX * speed
      cursorY += distY * speed

      cursorGlow.style.left = cursorX + "px"
      cursorGlow.style.top = cursorY + "px"

      requestAnimationFrame(animateCursor)
    }

    animateCursor()
  }

  console.log("[v0] DarkEntry-inspired portfolio initialized")
})
