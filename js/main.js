// ==================================================
// MAIN JAVASCRIPT FILE
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================================
     DISABLE ANIMATION ON PROJECT PAGES
  =============================================== */

  if (document.body.classList.contains("no-animate")) {
    return
  }

  /* ===============================================
     MOBILE MENU TOGGLE
  =============================================== */

  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")
  const navItems = document.querySelectorAll(".nav-link")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
      document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : ""
    })

    // Close menu when clicking on a link
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        navLinks.classList.remove("active")
        document.body.style.overflow = ""
      })
    })
  }

  /* ===============================================
     NAVBAR SCROLL EFFECT & ACTIVE STATE
  =============================================== */

  const navbar = document.querySelector(".navbar")
  const sections = document.querySelectorAll(".section")

  window.addEventListener("scroll", () => {
    // Add shadow on scroll
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Update active nav link
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href").slice(1) === current) {
        item.classList.add("active")
      }
    })
  })

  /* ===============================================
     TYPING EFFECT
  =============================================== */

  const typedTextSpan = document.querySelector(".typed-text")

  if (typedTextSpan) {
    const textArray = ["Cybersecurity Analyst", "DFIR Specialist", "SOC Operations Expert", "Incident Response Pro"]
    const typingDelay = 100
    const erasingDelay = 50
    const newTextDelay = 2000
    let textArrayIndex = 0
    let charIndex = 0

    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex)
        charIndex++
        setTimeout(type, typingDelay)
      } else {
        setTimeout(erase, newTextDelay)
      }
    }

    function erase() {
      if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1)
        charIndex--
        setTimeout(erase, erasingDelay)
      } else {
        textArrayIndex++
        if (textArrayIndex >= textArray.length) textArrayIndex = 0
        setTimeout(type, typingDelay + 500)
      }
    }

    // Start typing effect after a short delay
    setTimeout(type, 1000)
  }

  /* ===============================================
     SCROLL REVEAL ANIMATION
  =============================================== */

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show")
        revealObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const revealElements = document.querySelectorAll(".section, .card")
  revealElements.forEach((el) => revealObserver.observe(el))

  /* ===============================================
     CARD GLOW EFFECT (FOLLOW MOUSE)
  =============================================== */

  const cards = document.querySelectorAll(".card")

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / card.offsetWidth) * 100
      const y = ((e.clientY - rect.top) / card.offsetHeight) * 100

      card.style.setProperty("--mouse-x", `${x}%`)
      card.style.setProperty("--mouse-y", `${y}%`)
    })
  })

  /* ===============================================
     SCROLL TO TOP BUTTON
  =============================================== */

  const scrollTopBtn = document.querySelector(".scroll-top")

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add("visible")
      } else {
        scrollTopBtn.classList.remove("visible")
      }
    })

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  /* ===============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
  =============================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        const offsetTop = target.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  /* ===============================================
     FOOTER YEAR AUTO UPDATE
  =============================================== */

  const footerYear = document.querySelector("footer p")
  if (footerYear) {
    footerYear.innerHTML = `© ${new Date().getFullYear()} Mohamed Mooka — Cybersecurity Portfolio`
  }

  /* ===============================================
     PARALLAX EFFECT ON SCROLL
  =============================================== */

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY
    const heroContent = document.querySelector(".hero-content")

    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`
      heroContent.style.opacity = 1 - scrolled / 500
    }
  })

  /* ===============================================
     COUNTER ANIMATION FOR STATS
  =============================================== */

  const animateCounter = (element) => {
    const target = Number.parseInt(element.getAttribute("data-target"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += increment
      if (current < target) {
        element.textContent = Math.floor(current)
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target + "+"
      }
    }

    updateCounter()
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll(".stat-number[data-target]")
          statNumbers.forEach((stat) => {
            if (!stat.classList.contains("counted")) {
              stat.classList.add("counted")
              animateCounter(stat)
            }
          })
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  const aboutSection = document.getElementById("about")
  if (aboutSection) {
    statsObserver.observe(aboutSection)
  }
})
