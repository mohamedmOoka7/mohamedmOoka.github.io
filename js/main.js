document.addEventListener("DOMContentLoaded", () => {
  // ===== NAVIGATION =====
  const nav = document.querySelector(".nav")
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section[id]")
  const menuBtn = document.querySelector(".menu-btn")

  function updateActiveNav() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 200
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
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active")
      menuBtn.classList.toggle("active")
    })

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active")
        menuBtn.classList.remove("active")
      })
    })

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

  // ===== SCROLL ANIMATIONS =====
  const animatedElements = document.querySelectorAll("[data-animate]")

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  }

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-delay") || 0
        setTimeout(() => {
          entry.target.classList.add("animated")
        }, delay)
        scrollObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  animatedElements.forEach((element) => {
    scrollObserver.observe(element)
  })

  // ===== PARALLAX EFFECT =====
  const orbs = document.querySelectorAll(".gradient-orb")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.05
      orb.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // ===== WORK CARD SPOTLIGHT =====
  const workCards = document.querySelectorAll(".work-card")

  workCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      card.style.setProperty("--mouse-x", `${x}%`)
      card.style.setProperty("--mouse-y", `${y}%`)
    })
  })

  // ===== MAGNETIC BUTTONS =====
  const magneticButtons = document.querySelectorAll(".btn-primary, .btn-secondary")

  magneticButtons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`
    })

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0) scale(1)"
    })
  })

  let particles = []
  const particleCount = 20

  document.addEventListener("mousemove", (e) => {
    if (particles.length < particleCount) {
      createParticle(e.clientX, e.clientY)
    }
  })

  function createParticle(x, y) {
    const particle = document.createElement("div")
    particle.className = "cursor-particle"
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: linear-gradient(135deg, #00d4ff, #7c3aed);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${x}px;
      top: ${y}px;
      animation: particle-fade 1s ease-out forwards;
      box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
    `

    document.body.appendChild(particle)
    particles.push(particle)

    setTimeout(() => {
      particle.remove()
      particles = particles.filter((p) => p !== particle)
    }, 1000)
  }

  // Add particle animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes particle-fade {
      0% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
      }
    }
  `
  document.head.appendChild(style)

  // ===== CONSOLE MESSAGE =====
  console.log(
    "%c🔐 Mohamed Mooka | Cybersecurity Portfolio",
    "font-size: 20px; font-weight: 900; color: #00d4ff; text-shadow: 0 0 20px rgba(0, 212, 255, 0.5); font-family: 'Space Grotesk', sans-serif;",
  )
  console.log(
    "%c⚡ Unique Premium Design with Cyber Aesthetics",
    "font-size: 14px; color: #7c3aed; font-weight: 700; font-family: 'Inter', sans-serif;",
  )

  // ===== PERFORMANCE: REDUCE MOTION =====
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.querySelectorAll("*").forEach((el) => {
      el.style.animation = "none"
      el.style.transition = "none"
    })
  }

  // ===== ACCESSIBILITY: KEYBOARD NAVIGATION =====
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("active")) {
      nav.classList.remove("active")
      menuBtn.classList.remove("active")
    }
  })
})
