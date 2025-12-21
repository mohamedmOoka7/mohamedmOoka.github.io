document.addEventListener("DOMContentLoaded", () => {
  // ===== NAVIGATION =====
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section[id]")
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const sidebarNav = document.querySelector(".sidebar-nav")

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
          const offsetTop = target.offsetTop - 60

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
          stat.textContent = target
        }
      }

      updateCounter()
    })
  }

  // ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const cards = document.querySelectorAll(".expertise-card, .project-card, .contact-method, .stat-box")
  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    fadeInObserver.observe(card)
  })

  // ===== CONSOLE MESSAGE =====
  console.log("%cMohamed Mooka - Cybersecurity Portfolio", "font-size: 18px; font-weight: 700; color: #3B82F6;")
  console.log("%cMinimal & Modern Design", "font-size: 13px; color: #A0A0A0;")
})
