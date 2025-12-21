document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav")
  const navItems = document.querySelectorAll(".nav-item")
  const sections = document.querySelectorAll("section[id]")

  let ticking = false

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset

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
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 120)
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
    el.style.transition = "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
    observer.observe(el)
  })

  const terminalLines = document.querySelectorAll(".terminal-line")
  terminalLines.forEach((line, index) => {
    line.style.opacity = "0"
    setTimeout(
      () => {
        line.style.transition = "opacity 0.4s ease"
        line.style.opacity = "1"
      },
      600 + index * 250,
    )
  })

  const heroTitle = document.querySelector(".hero-title")
  const heroDescription = document.querySelector(".hero-description")

  if (heroTitle && heroDescription) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallaxTitle = scrolled * 0.15
      const parallaxDesc = scrolled * 0.25

      heroTitle.style.transform = `translateY(${parallaxTitle}px)`
      heroDescription.style.transform = `translateY(${parallaxDesc}px)`
    })
  }

  console.log(
    "%c🛡️ Mohamed Mooka - Cybersecurity Portfolio",
    "font-size: 22px; font-weight: 900; color: #6366f1; text-shadow: 0 0 20px rgba(99, 102, 241, 0.6);",
  )
  console.log(
    "%cDigital Forensics • Incident Response • SOC Operations",
    "font-size: 14px; color: #22d3ee; font-weight: 600;",
  )
  console.log("%cBuilt with modern web standards • Optimized for performance", "font-size: 12px; color: #a1a1aa;")

  const profileImages = document.querySelectorAll(".logo-photo")
  profileImages.forEach((img) => {
    img.style.opacity = "0"
    img.style.transition = "opacity 0.5s ease"

    img.addEventListener("error", function () {
      this.style.display = "none"
      const fallback = this.nextElementSibling
      if (fallback && fallback.classList.contains("logo-icon")) {
        fallback.style.display = "flex"
        fallback.style.opacity = "0"
        setTimeout(() => {
          fallback.style.transition = "opacity 0.5s ease"
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
            const finalValue = stat.textContent
            const numericValue = Number.parseInt(finalValue)

            if (!isNaN(numericValue)) {
              let currentValue = 0
              const increment = numericValue / 50
              const timer = setInterval(() => {
                currentValue += increment
                if (currentValue >= numericValue) {
                  stat.textContent = finalValue
                  clearInterval(timer)
                } else {
                  stat.textContent = Math.floor(currentValue) + "+"
                }
              }, 30)
            }
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
})
