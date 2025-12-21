document.addEventListener("DOMContentLoaded", () => {
  // ===== NAVIGATION =====
  const nav = document.querySelector(".nav")
  const navItems = document.querySelectorAll(".nav-item")
  const sections = document.querySelectorAll("section[id]")
  const mobileToggle = document.querySelector(".mobile-toggle")

  // Scroll effect on navigation
  let lastScroll = 0
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    // Add shadow on scroll
    if (currentScroll > 100) {
      nav.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)"
    } else {
      nav.style.boxShadow = "none"
    }

    lastScroll = currentScroll

    // Update active nav item
    updateActiveNavItem()
  })

  function updateActiveNavItem() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 150
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

  // Smooth scroll to sections
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

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

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all cards and sections
  const animatedElements = document.querySelectorAll(
    ".expertise-card, .project-card, .contact-card, .highlight-card, .about-text, .about-highlights",
  )

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(40px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // ===== TERMINAL TYPING EFFECT =====
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

  // ===== PARALLAX EFFECT ON HERO =====
  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.3
      hero.style.transform = `translateY(${parallax}px)`
    })
  }

  // ===== CONSOLE BRANDING =====
  console.log(
    "%cMohamed Mooka - Cybersecurity Portfolio",
    "font-size: 20px; font-weight: 800; color: #6366f1; text-shadow: 0 0 10px rgba(99, 102, 241, 0.5);",
  )
  console.log("%cPremium Design • Modern UI/UX", "font-size: 14px; color: #a1a1aa;")

  // ===== IMAGE ERROR HANDLING =====
  const profileImages = document.querySelectorAll(".logo-photo")
  profileImages.forEach((img) => {
    img.addEventListener("error", function () {
      console.log("[v0] Profile image failed to load, using fallback icon")
      this.style.display = "none"
      const fallback = this.nextElementSibling
      if (fallback && fallback.classList.contains("logo-icon")) {
        fallback.style.display = "flex"
      }
    })

    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })
  })
})
