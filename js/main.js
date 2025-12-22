// Enhanced JavaScript with smooth animations and interactions

document.addEventListener("DOMContentLoaded", () => {
  // ===== LOADING SCREEN =====
  const loadingScreen = document.querySelector(".loading-screen")

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("hidden")
    }, 1000)
  })

  // ===== CUSTOM CURSOR =====
  const cursorDot = document.querySelector("[data-cursor-dot]")
  const cursorOutline = document.querySelector("[data-cursor-outline]")

  if (cursorDot && cursorOutline && window.innerWidth > 768) {
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX
      const posY = e.clientY

      cursorDot.style.left = `${posX}px`
      cursorDot.style.top = `${posY}px`

      cursorOutline.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        { duration: 500, fill: "forwards" },
      )
    })

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll(
      "a, button, .btn, .nav-link, .project-card, .expertise-card, .stat-box",
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursorOutline.style.width = "60px"
        cursorOutline.style.height = "60px"
      })

      el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
        cursorOutline.style.width = "40px"
        cursorOutline.style.height = "40px"
      })
    })
  }

  // ===== TYPING EFFECT =====
  const typingText = document.querySelector(".typing-text")
  const texts = ["Cybersecurity Analyst", "DFIR Specialist", "SOC Analyst", "Threat Hunter", "Incident Responder"]
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  function type() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(type, typeSpeed)
  }

  if (typingText) {
    setTimeout(type, 1000)
  }

  // ===== SCROLL PROGRESS =====
  const scrollProgress = document.querySelector(".scroll-progress")

  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight - windowHeight
    const scrolled = window.scrollY
    const progress = (scrolled / documentHeight) * 100

    scrollProgress.style.transform = `scaleX(${progress / 100})`
  })

  // ===== NAVIGATION =====
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section[id]")
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const sidebarNav = document.querySelector(".sidebar-nav")

  function updateActiveNav() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 300
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

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      sidebarNav.classList.toggle("active")
      mobileMenuToggle.classList.toggle("active")
    })

    // Close mobile menu when clicking nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        sidebarNav.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!sidebarNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        sidebarNav.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
      }
    })
  }

  // ===== MOBILE MENU =====
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector(".nav")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active")
      menuToggle.classList.toggle("active")

      // Animate menu toggle
      const spans = menuToggle.querySelectorAll("span")
      if (menuToggle.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translateY(8px)"
        spans[1].style.opacity = "0"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
      }
    })
  }

  // ===== HEADER SCROLL EFFECT =====
  const header = document.querySelector(".header")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.05)"
    } else {
      header.style.boxShadow = "none"
    }

    lastScroll = currentScroll
  })

  // ===== SMOOTH SCROLL =====
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

  // ===== STATS COUNTER =====
  const statsNumbers = document.querySelectorAll(".stat-number")
  let hasAnimatedStats = false

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedStats) {
          hasAnimatedStats = true
          animateStats()
        }
      })
    },
    { threshold: 0.5 },
  )

  const aboutSection = document.getElementById("about")
  if (aboutSection) {
    statsObserver.observe(aboutSection)
  }

  function animateStats() {
    statsNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.getAttribute("data-target"))
      const duration = 2000
      const increment = target / (duration / 16)
      let current = 0

      const updateCounter = () => {
        current += increment
        if (current < target) {
          stat.textContent = Math.floor(current)
          requestAnimationFrame(updateCounter)
        } else {
          stat.textContent = target + (target >= 100 ? "+" : "")
        }
      }

      updateCounter()
    })
  }

  // ===== INTERSECTION OBSERVER FOR SECTIONS =====
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  sections.forEach((section) => {
    sectionObserver.observe(section)
  })

  // ===== CARD ANIMATIONS =====
  const cards = document.querySelectorAll(".expertise-card, .project-card, .contact-method, .stat-box")

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 100)
        }
      })
    },
    { threshold: 0.1 },
  )

  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(40px)"
    card.style.transition = "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
    cardObserver.observe(card)
  })

  // ===== CODE TYPING EFFECT =====
  const codeLines = document.querySelectorAll(".code-line")
  let codeAnimated = false

  const codeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !codeAnimated) {
          codeAnimated = true
          animateCode()
        }
      })
    },
    { threshold: 0.5 },
  )

  const codeWindow = document.querySelector(".code-window")
  if (codeWindow) {
    codeObserver.observe(codeWindow)
  }

  function animateCode() {
    codeLines.forEach((line, index) => {
      line.style.opacity = "0"
      setTimeout(() => {
        line.style.transition = "opacity 0.3s ease"
        line.style.opacity = "1"
      }, index * 150)
    })
  }

  // ===== PARALLAX EFFECT FOR BACKGROUND ORBS =====
  const orbs = document.querySelectorAll(".gradient-orb")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.05
      orb.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // ===== PARALLAX SCROLL =====
  const hero = document.querySelector(".hero-visual")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`
    }
  })

  // ===== BUTTON RIPPLE EFFECT =====
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const ripple = document.createElement("span")
      ripple.style.position = "absolute"
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      ripple.style.width = "0"
      ripple.style.height = "0"
      ripple.style.borderRadius = "50%"
      ripple.style.background = "rgba(255, 255, 255, 0.3)"
      ripple.style.transform = "translate(-50%, -50%)"
      ripple.style.animation = "ripple 0.6s ease-out"
      ripple.style.pointerEvents = "none"

      button.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add ripple animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes ripple {
      to {
        width: 300px;
        height: 300px;
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)

  // ===== CONSOLE MESSAGE =====
  console.log("%cMohamed Mooka — Cybersecurity Portfolio", "font-size: 20px; font-weight: 800; color: #0066ff;")
  console.log("%cModern Professional Design", "font-size: 14px; color: #737373;")

  // ===== ACCESSIBILITY: KEYBOARD NAVIGATION =====
  document.addEventListener("keydown", (e) => {
    // Press 'Esc' to close mobile menu
    if (e.key === "Escape" && sidebarNav.classList.contains("active")) {
      sidebarNav.classList.remove("active")
      mobileMenuToggle.classList.remove("active")
    }
  })

  // ===== PERFORMANCE: REDUCE MOTION FOR USERS WHO PREFER IT =====
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.querySelectorAll("*").forEach((el) => {
      el.style.animation = "none"
      el.style.transition = "none"
    })
  }
})
