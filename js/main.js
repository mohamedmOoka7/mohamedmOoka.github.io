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
        bars[0].style.transform = "rotate(45deg) translateY(8px)"
        bars[1].style.opacity = "0"
        bars[2].style.transform = "rotate(-45deg) translateY(-8px)"
      } else {
        bars.forEach((bar) => {
          bar.style.transform = ""
          bar.style.opacity = ""
        })
      }
    })

    // Close menu when clicking on a link
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

    if (currentScroll > 100) {
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
    rootMargin: "0px 0px -100px 0px",
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show")
        }, index * 120)
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
    const fontSize = 16
    const columns = canvas.width / fontSize

    const drops = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height
    }

    function drawMatrix() {
      ctx.fillStyle = "rgba(5, 10, 20, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = fontSize + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]

        const brightness = Math.random() * 0.5 + 0.5
        ctx.fillStyle = `rgba(0, 217, 255, ${brightness})`

        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const matrixInterval = setInterval(drawMatrix, 45)

    // Resize handler
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
    const particleCount = 60

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      const size = Math.random() * 5 + 2

      particle.style.position = "absolute"
      particle.style.width = size + "px"
      particle.style.height = size + "px"

      const colorVariant = Math.random()
      if (colorVariant > 0.7) {
        particle.style.background = `rgba(0, 245, 255, ${Math.random() * 0.6 + 0.4})`
      } else if (colorVariant > 0.4) {
        particle.style.background = `rgba(0, 217, 255, ${Math.random() * 0.6 + 0.4})`
      } else {
        particle.style.background = `rgba(0, 153, 255, ${Math.random() * 0.6 + 0.4})`
      }

      particle.style.borderRadius = "50%"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"

      const duration = Math.random() * 12 + 6
      const delay = Math.random() * 6

      particle.style.animation = `floatParticle ${duration}s ease-in-out infinite ${delay}s`
      particle.style.boxShadow = `0 0 ${size * 4}px rgba(0, 217, 255, 0.7), 0 0 ${size * 8}px rgba(0, 217, 255, 0.4)`

      particlesContainer.appendChild(particle)
    }

    const style = document.createElement("style")
    style.textContent = `
      @keyframes floatParticle {
        0%, 100% {
          transform: translate(0, 0) scale(1);
          opacity: 0.4;
        }
        25% {
          transform: translate(30px, -40px) scale(1.2);
          opacity: 0.8;
        }
        50% {
          transform: translate(-20px, -80px) scale(0.9);
          opacity: 0.6;
        }
        75% {
          transform: translate(40px, -120px) scale(1.1);
          opacity: 0.7;
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
        const offsetTop = target.offsetTop - 90
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
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 212, 255, 0.6) 0%, transparent 60%)`
      }

      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * 5
      const rotateY = ((x - centerX) / centerX) * 5

      card.style.transform = `perspective(1200px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`
      card.style.transition = "transform 0.1s ease"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = ""
      card.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
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
        const speed = Math.random() * 50 + 30
        setTimeout(type, speed)
      }
    }

    setTimeout(type, 1200)
  }

  /* ===============================================
     COUNTER ANIMATION FOR STATS - ENHANCED
  =============================================== */

  const statNumbers = document.querySelectorAll(".stat-number[data-count]")

  const animateCounter = (element) => {
    const target = Number.parseInt(element.getAttribute("data-count"))
    const duration = 2500
    const increment = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += increment
      if (current < target) {
        element.textContent = Math.floor(current) + "+"
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target + "+"
        element.style.transform = "scale(1.1)"
        setTimeout(() => {
          element.style.transform = ""
        }, 300)
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

  statNumbers.forEach((stat) => {
    stat.style.transition = "transform 0.3s ease"
    statsObserver.observe(stat)
  })

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
        const speed = (index + 1) * 20
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
  progressBar.style.position = "fixed"
  progressBar.style.top = "0"
  progressBar.style.left = "0"
  progressBar.style.height = "3px"
  progressBar.style.background = "linear-gradient(90deg, #00d9ff, #0099ff, #0066ff)"
  progressBar.style.width = "0%"
  progressBar.style.zIndex = "9999"
  progressBar.style.transition = "width 0.1s ease"
  progressBar.style.boxShadow = "0 0 20px rgba(0, 217, 255, 0.8)"
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

  console.log("[v0] Elite Blue Team Portfolio initialized successfully")
  console.log("[v0] All animations and effects loaded")
})
