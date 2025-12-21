document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav")
  const navItems = document.querySelectorAll(".nav-item")
  const sections = document.querySelectorAll("section[id]")

  let ticking = false

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset

        // Navigation shadow
        if (currentScroll > 100) {
          nav.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.4)"
        } else {
          nav.style.boxShadow = "none"
        }

        updateActiveNavItem()
        ticking = false
      })
      ticking = true
    }
  })

  function updateActiveNavItem() {
    const scrollY = window.pageYOffset + 200

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach((item) => {
          item.classList.remove("active")
          if (item.getAttribute("data-section") === sectionId) {
            item.classList.add("active")
          }
        })
      }
    })
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

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

  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered animation with golden ratio delay
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 118) // 118ms = golden ratio delay
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const animatedElements = document.querySelectorAll(
    ".expertise-card, .project-card, .contact-card, .highlight-card, .about-text, .about-highlights",
  )

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(50px)"
    el.style.transition = "opacity 0.8s cubic-bezier(0.33, 1, 0.68, 1), transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)"
    observer.observe(el)
  })

  const terminalLines = document.querySelectorAll(".terminal-line")
  terminalLines.forEach((line, index) => {
    line.style.opacity = "0"
    setTimeout(
      () => {
        line.style.transition = "opacity 0.3s ease"
        line.style.opacity = "1"
      },
      500 + index * 200,
    )
  })

  const heroTitle = document.querySelector(".hero-title")
  const heroDescription = document.querySelector(".hero-description")
  const heroVisual = document.querySelector(".hero-visual")

  if (heroTitle && heroDescription && heroVisual) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      // Golden ratio-based parallax speeds
      heroTitle.style.transform = `translateY(${scrolled * 0.118}px)`
      heroDescription.style.transform = `translateY(${scrolled * 0.191}px)`
      heroVisual.style.transform = `translateY(${scrolled * -0.073}px)`
    })
  }

  const profileImages = document.querySelectorAll(".logo-photo")
  profileImages.forEach((img) => {
    img.style.opacity = "0"
    img.style.transition = "opacity 0.5s ease"

    img.addEventListener("error", function () {
      this.style.display = "none"
      const fallback = this.nextElementSibling
      if (fallback && fallback.classList.contains("logo-icon")) {
        fallback.style.display = "flex"
        setTimeout(() => {
          fallback.style.opacity = "1"
        }, 50)
      }
    })

    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })
  })

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll(".stat-number")
          statNumbers.forEach((stat) => {
            const target = Number.parseInt(stat.getAttribute("data-target"))
            let current = 0
            const duration = 2000
            const startTime = performance.now()

            const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              const easedProgress = easeOutQuart(progress)

              current = Math.floor(easedProgress * target)
              stat.textContent = current + "+"

              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }

            requestAnimationFrame(animate)
          })
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  const heroStats = document.querySelector(".hero-stats")
  if (heroStats) {
    statsObserver.observe(heroStats)
  }

  const mobileToggle = document.querySelector(".mobile-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      mobileToggle.classList.toggle("active")
    })
  }

  const cards = document.querySelectorAll(".expertise-card, .project-card, .contact-card")

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // More subtle 3D tilt based on golden ratio
      const rotateX = ((y - centerY) / centerY) * -2.5
      const rotateY = ((x - centerX) / centerX) * 2.5

      card.style.transform = `
        translateY(-32px)
        scale(1.04)
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `

      // Set CSS variables for spotlight effect
      card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`)
      card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`)
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = ""
    })
  })

  console.log(
    "%c🛡️ Mohamed Mooka",
    "font-size: 24px; font-weight: 900; color: #6366f1; text-shadow: 0 0 20px rgba(99, 102, 241, 0.5);",
  )
  console.log("%cCybersecurity Analyst | DFIR & SOC", "font-size: 14px; font-weight: 600; color: #22d3ee;")
  console.log("%cPortfolio built with precision and attention to detail", "font-size: 12px; color: #a8a8b8;")
})
