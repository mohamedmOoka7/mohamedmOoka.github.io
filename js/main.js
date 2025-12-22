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

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  }, observerOptions)

  const cards = document.querySelectorAll(".expertise-card, .project-card, .contact-method, .stat-box")
  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`
    fadeInObserver.observe(card)
  })

  if (window.innerWidth > 768) {
    const cursor = document.createElement("div")
    cursor.className = "cursor-glow"
    cursor.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 217, 255, 0.08) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
      opacity: 0;
    `
    document.body.appendChild(cursor)

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.opacity = "1"
    })

    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0"
    })

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1
      cursorY += (mouseY - cursorY) * 0.1
      cursor.style.left = cursorX + "px"
      cursor.style.top = cursorY + "px"
      requestAnimationFrame(animateCursor)
    }

    animateCursor()
  }

  // ===== CONSOLE MESSAGE =====
  console.log(
    "%cMohamed Mooka - Cybersecurity Portfolio",
    "font-size: 20px; font-weight: 700; color: #00d9ff; text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);",
  )
  console.log("%cDistinctive Design & Modern Experience", "font-size: 14px; color: #8e8e93;")
})
