// =============================================
// CYBER PORTFOLIO - Interactive Scripts
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  // ===== MATRIX RAIN ANIMATION =====
  const canvas = document.getElementById("matrix-rain")
  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`"
  const fontSize = 16
  const columns = canvas.width / fontSize
  const drops = []

  for (let i = 0; i < columns; i++) {
    drops[i] = 1
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(10, 14, 39, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#00ff9f"
    ctx.font = fontSize + "px monospace"

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length))
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }

      drops[i]++
    }
  }

  setInterval(drawMatrix, 35)

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  // ===== TYPING ANIMATION =====
  const typingText = document.getElementById("typing-text")
  const phrases = ["Cybersecurity Analyst", "DFIR Expert", "Threat Hunter", "SOC Analyst", "Security Specialist"]
  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      setTimeout(() => (isDeleting = true), 2000)
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
    }

    const typingSpeed = isDeleting ? 50 : 100
    setTimeout(typeEffect, typingSpeed)
  }

  typeEffect()

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll(".stat-number")

  const observerOptions = {
    threshold: 0.5,
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = +counter.getAttribute("data-target")
        const increment = target / 100

        const updateCounter = () => {
          const current = +counter.innerText

          if (current < target) {
            counter.innerText = Math.ceil(current + increment)
            setTimeout(updateCounter, 20)
          } else {
            counter.innerText = target + "+"
          }
        }

        updateCounter()
        counterObserver.unobserve(counter)
      }
    })
  }, observerOptions)

  counters.forEach((counter) => counterObserver.observe(counter))

  // ===== SKILL BARS ANIMATION =====
  const skillBars = document.querySelectorAll(".skill-progress")

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target
        const progress = bar.getAttribute("data-progress")
        bar.style.width = progress + "%"
        skillObserver.unobserve(bar)
      }
    })
  }, observerOptions)

  skillBars.forEach((bar) => skillObserver.observe(bar))

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById("theme-toggle")

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme")

    // Save preference
    const theme = document.body.classList.contains("light-theme") ? "light" : "dark"
    localStorage.setItem("theme", theme)
  })

  // Load saved theme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    document.body.classList.add("light-theme")
  }

  // ===== MOBILE MENU =====
  const mobileToggle = document.getElementById("mobile-toggle")
  const navLinks = document.querySelector(".nav-links")

  mobileToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    mobileToggle.classList.toggle("active")
  })

  // ===== SCROLL EFFECTS =====
  const nav = document.querySelector(".cyber-nav")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
      nav.style.background = "rgba(10, 14, 39, 0.95)"
      nav.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.5)"
    } else {
      nav.style.background = "rgba(10, 14, 39, 0.8)"
      nav.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.3)"
    }

    lastScroll = currentScroll
  })

  // ===== PARALLAX EFFECT =====
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating-icons")

    parallaxElements.forEach((el) => {
      const speed = 0.5
      el.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const animatedElements = document.querySelectorAll(".project-card-3d, .skill-category, .timeline-item")

  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 100)
          animationObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    animationObserver.observe(el)
  })

  // ===== CONSOLE MESSAGE =====
  console.log(
    "%c🔒 Mohamed Mooka - Cybersecurity Portfolio",
    "font-size: 24px; font-weight: 900; color: #00ff9f; text-shadow: 0 0 10px rgba(0,255,159,0.5);",
  )
  console.log("%c⚡ Cyber Theme Design", "font-size: 16px; color: #00d4ff;")
  console.log("%c🛡️ DFIR Specialist | SOC Analyst | Threat Hunter", "font-size: 14px; color: #a0aec0;")

  // ===== PERFORMANCE =====
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.querySelectorAll("*").forEach((el) => {
      el.style.animationDuration = "0.01ms !important"
      el.style.transitionDuration = "0.01ms !important"
    })
  }

  // ===== PAGE LOAD =====
  window.addEventListener("load", () => {
    document.body.style.opacity = "1"
  })
})
