// =============================================
// MODERN CYBERSECURITY PORTFOLIO - REDESIGNED
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  // ===== SMOOTH SCROLL WITH OFFSET =====
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")

      if (href !== "#" && href.length > 1) {
        e.preventDefault()

        const target = document.querySelector(href)
        if (target) {
          const offsetTop = target.offsetTop - 100

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // ===== NAVBAR SCROLL EFFECT =====
  const nav = document.querySelector(".floating-nav")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
      if (currentScroll > lastScroll) {
        nav.style.transform = "translate(-50%, -100px)"
      } else {
        nav.style.transform = "translate(-50%, 0)"
      }
    }

    lastScroll = currentScroll
  })

  // ===== SECTION FADE-IN ANIMATION =====
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const sections = document.querySelectorAll(".about, .work, .contact")
  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(40px)"
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    observer.observe(section)
  })

  // ===== SKILL CARDS STAGGER ANIMATION =====
  const skillCards = document.querySelectorAll(".skill-card")

  const skillObserver = new IntersectionObserver(
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
    { threshold: 0.2 },
  )

  skillCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    skillObserver.observe(card)
  })

  // ===== PROJECT CARDS ANIMATION =====
  const projectCards = document.querySelectorAll(".project-card")

  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 150)
        }
      })
    },
    { threshold: 0.15 },
  )

  projectCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(40px)"
    card.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    projectObserver.observe(card)
  })

  // ===== CONTACT METHODS ANIMATION =====
  const contactMethods = document.querySelectorAll(".contact-method")

  const contactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateX(0)"
          }, index * 100)
        }
      })
    },
    { threshold: 0.2 },
  )

  contactMethods.forEach((method) => {
    method.style.opacity = "0"
    method.style.transform = "translateX(-30px)"
    method.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    contactObserver.observe(method)
  })

  // ===== CURSOR TRAIL EFFECT =====
  const createCursorTrail = () => {
    if (window.innerWidth < 768) return

    let mouseX = 0
    let mouseY = 0

    const trail = []
    const trailLength = 20

    for (let i = 0; i < trailLength; i++) {
      const dot = document.createElement("div")
      dot.style.position = "fixed"
      dot.style.width = "4px"
      dot.style.height = "4px"
      dot.style.background = `rgba(0, 212, 255, ${1 - i / trailLength})`
      dot.style.borderRadius = "50%"
      dot.style.pointerEvents = "none"
      dot.style.zIndex = "9999"
      dot.style.transition = "transform 0.1s ease"
      document.body.appendChild(dot)
      trail.push({ element: dot, x: 0, y: 0 })
    }

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    const animateTrail = () => {
      let x = mouseX
      let y = mouseY

      trail.forEach((dot, index) => {
        dot.x += (x - dot.x) * 0.3
        dot.y += (y - dot.y) * 0.3

        dot.element.style.left = `${dot.x}px`
        dot.element.style.top = `${dot.y}px`
        dot.element.style.transform = `translate(-50%, -50%) scale(${1 - index / trailLength})`

        x = dot.x
        y = dot.y
      })

      requestAnimationFrame(animateTrail)
    }

    animateTrail()
  }

  createCursorTrail()

  // ===== PARALLAX EFFECT FOR ORBS =====
  const orbs = document.querySelectorAll(".gradient-orb")

  window.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.03
      const xMove = (x - 0.5) * 100 * speed
      const yMove = (y - 0.5) * 100 * speed

      orb.style.transform = `translate(${xMove}px, ${yMove}px)`
    })
  })

  // ===== BUTTON RIPPLE EFFECT =====
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary, .nav-cta")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      ripple.style.position = "absolute"
      ripple.style.borderRadius = "50%"
      ripple.style.background = "rgba(255, 255, 255, 0.6)"
      ripple.style.pointerEvents = "none"
      ripple.style.animation = "ripple-effect 0.6s ease-out"

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => ripple.remove(), 600)
    })
  })

  // Add ripple animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes ripple-effect {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)

  // ===== CONSOLE MESSAGE =====
  console.log("%cMohamed Mooka — Cybersecurity Portfolio", "font-size: 16px; font-weight: 600; color: #00e0c6;")
  console.log("%cDFIR Specialist | SOC Analyst | Threat Hunter", "font-size: 12px; color: #737373;")

  // ===== PERFORMANCE: REDUCE MOTION =====
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.querySelectorAll("*").forEach((el) => {
      el.style.animationDuration = "0.01ms"
      el.style.transitionDuration = "0.01ms"
    })
  }

  // ===== LOADING STATE =====
  window.addEventListener("load", () => {
    document.body.style.opacity = "0"
    setTimeout(() => {
      document.body.style.transition = "opacity 0.5s ease"
      document.body.style.opacity = "1"
    }, 100)
  })
})
