document.addEventListener("DOMContentLoaded", () => {
  // ===== LOADING SCREEN =====
  const loadingScreen = document.querySelector(".loading-screen")

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen?.classList.add("hidden")
    }, 800) // Reduced from 1000ms to 800ms
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
        { duration: 300, fill: "forwards" }, // Reduced from 500ms to 300ms
      )
    })

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll(
      "a, button, .btn, .nav-link, .work-card, .skill-item, .contact-card",
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

  // ===== SCROLL PROGRESS =====
  const scrollProgress = document.querySelector(".scroll-progress")

  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight - windowHeight
    const scrolled = window.scrollY
    const progress = (scrolled / documentHeight) * 100

    if (scrollProgress) {
      scrollProgress.style.transform = `scaleX(${progress / 100})`
    }
  })

  // ===== NAVIGATION =====
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section[id]")

  function updateActiveNav() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 300
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          const linkHref = link.getAttribute("href")
          if (linkHref === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", updateActiveNav)
  updateActiveNav()

  // ===== MOBILE MENU =====
  const menuBtn = document.querySelector(".menu-btn")
  const nav = document.querySelector(".nav")

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active")
      menuBtn.classList.toggle("active")
    })

    // Close menu when clicking nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active")
        menuBtn.classList.remove("active")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove("active")
        menuBtn.classList.remove("active")
      }
    })
  }

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

  // ===== INTERSECTION OBSERVER FOR SECTIONS =====
  const observerOptions = {
    threshold: 0.1, // Reduced from 0.15
    rootMargin: "0px 0px -80px 0px", // Reduced from -100px
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
  const cards = document.querySelectorAll(".work-card, .skill-item, .contact-card")

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 60) // Reduced from 100ms to 60ms
        }
      })
    },
    { threshold: 0.1 },
  )

  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)" // Reduced from 40px
    card.style.transition = "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)" // Reduced from 0.6s
    cardObserver.observe(card)
  })

  // ===== PARALLAX EFFECT FOR BACKGROUND ORBS =====
  const orbs = document.querySelectorAll(".gradient-orb")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.05
      orb.style.transform = `translateY(${scrolled * speed}px)`
    })
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
      ripple.style.animation = "ripple 0.5s ease-out" // Reduced from 0.6s
      ripple.style.pointerEvents = "none"

      button.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 500) // Reduced from 600ms
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
  console.log("%cMohamed Mooka — Cybersecurity Portfolio", "font-size: 20px; font-weight: 800; color: #3b82f6;")
  console.log("%cModern Professional Design", "font-size: 14px; color: #737373;")

  // ===== ACCESSIBILITY: KEYBOARD NAVIGATION =====
  document.addEventListener("keydown", (e) => {
    // Press 'Esc' to close mobile menu
    if (e.key === "Escape" && nav?.classList.contains("active")) {
      nav.classList.remove("active")
      menuBtn?.classList.remove("active")
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

  // ===== INTERSECTION OBSERVER FOR FADE IN ANIMATIONS =====
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Animate elements on scroll
  const animatedElements = document.querySelectorAll(".work-card, .skill-item, .contact-card")

  animatedElements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)" // Reduced from 30px
    element.style.transition = `opacity 0.4s ease ${index * 0.06}s, transform 0.4s ease ${index * 0.06}s` // Reduced timing
    fadeInObserver.observe(element)
  })

  // ===== PARALLAX EFFECT FOR HERO BACKGROUND =====
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")

    if (hero && scrolled < window.innerHeight) {
      const parallaxElements = hero.querySelectorAll("::before")
      parallaxElements.forEach((el) => {
        const speed = 0.3 // Reduced from 0.5
        el.style.transform = `translateY(${scrolled * speed}px)`
      })
    }
  })
})
