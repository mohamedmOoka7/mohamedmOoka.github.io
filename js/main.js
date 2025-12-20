// ==================================================
// MAIN JAVASCRIPT - ENHANCED VERSION
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
    })

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
        menuToggle.classList.remove("active")
      })
    })
  }

  /* ===============================================
     NAVBAR SCROLL EFFECT
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

    lastScroll = currentScroll
  })

  /* ===============================================
     SCROLL REVEAL ANIMATION
  =============================================== */

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
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
     MATRIX RAIN EFFECT
  =============================================== */

  const canvas = document.getElementById("matrix-canvas")
  if (canvas) {
    const ctx = canvas.getContext("2d")

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrix = "01"
    const fontSize = 14
    const columns = canvas.width / fontSize

    const drops = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height
    }

    function drawMatrix() {
      ctx.fillStyle = "rgba(10, 1, 24, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#6366f1"
      ctx.font = fontSize + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    setInterval(drawMatrix, 50)

    // Resize handler
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  }

  /* ===============================================
     PARTICLES EFFECT - Enhanced
  =============================================== */

  const particlesContainer = document.getElementById("particles")
  if (particlesContainer) {
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.style.position = "absolute"
      particle.style.width = Math.random() * 4 + 1 + "px"
      particle.style.height = particle.style.width
      particle.style.background = `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.3})`
      particle.style.borderRadius = "50%"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`
      particle.style.animationDelay = Math.random() * 5 + "s"
      particle.style.boxShadow = "0 0 10px rgba(99, 102, 241, 0.5)"

      particlesContainer.appendChild(particle)
    }
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
     CARD GLOW EFFECT FOLLOW MOUSE
  =============================================== */

  const cards = document.querySelectorAll(".card")
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const glow = card.querySelector(".card-glow")
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.4) 0%, transparent 50%)`
      }
    })
  })

  /* ===============================================
     TYPING EFFECT FOR SUBTITLE
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
        setTimeout(type, 50)
      }
    }

    setTimeout(type, 1000)
  }

  /* ===============================================
     COUNTER ANIMATION FOR STATS - Enhanced
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
     DYNAMIC YEAR IN FOOTER
  =============================================== */

  const footerYear = document.querySelector("footer p")
  if (footerYear && footerYear.textContent.includes("2025")) {
    footerYear.innerHTML = footerYear.innerHTML.replace("2025", new Date().getFullYear())
  }

  /* ===============================================
     ADD FLOATING ANIMATION TO CSS
  =============================================== */

  const style = document.createElement("style")
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translateY(0) translateX(0);
        opacity: 0.3;
      }
      50% {
        transform: translateY(-20px) translateX(10px);
        opacity: 0.7;
      }
    }
  `
  document.head.appendChild(style)
})
