// ==================================================
// MAIN JAVASCRIPT - Enhanced Version
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================================
     NAVBAR SCROLL EFFECT
  =============================================== */
  const navbar = document.getElementById("navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  /* ===============================================
     MOBILE MENU TOGGLE
  =============================================== */
  const mobileToggle = document.getElementById("mobile-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      mobileToggle.classList.toggle("active")
    })

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
        mobileToggle.classList.remove("active")
      })
    })
  }

  /* ===============================================
     DISABLE ANIMATION ON PROJECT PAGES
  =============================================== */
  if (document.body.classList.contains("no-animate")) {
    return
  }

  /* ===============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
  =============================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href !== "#" && href !== "") {
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

  /* ===============================================
     INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
  =============================================== */
  const observerOptions = {
    threshold: 0.1,
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

  // Observe all sections and cards
  const revealElements = document.querySelectorAll(".section, .card")
  revealElements.forEach((el) => revealObserver.observe(el))

  /* ===============================================
     TYPING EFFECT FOR HERO SUBTITLE
  =============================================== */
  const typingText = document.querySelector(".typing-text")
  if (typingText) {
    const text = typingText.textContent
    typingText.textContent = ""
    typingText.style.opacity = "1"

    let charIndex = 0
    const typeSpeed = 100

    function typeChar() {
      if (charIndex < text.length) {
        typingText.textContent += text.charAt(charIndex)
        charIndex++
        setTimeout(typeChar, typeSpeed)
      }
    }

    setTimeout(typeChar, 500)
  }

  /* ===============================================
     ANIMATED COUNTER FOR STATS
  =============================================== */
  const statNumbers = document.querySelectorAll(".stat-number")

  const animateCounter = (element) => {
    const target = Number.parseInt(element.textContent)
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += increment
      if (current < target) {
        element.textContent = Math.floor(current) + "+"
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
          animateCounter(entry.target)
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statNumbers.forEach((stat) => statsObserver.observe(stat))

  /* ===============================================
     CARD GLOW EFFECT FOLLOWING MOUSE
  =============================================== */
  const cards = document.querySelectorAll(".card")

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const glow = card.querySelector(".card-glow")
      if (glow) {
        glow.style.left = x + "px"
        glow.style.top = y + "px"
        glow.style.transform = "translate(-50%, -50%)"
      }
    })
  })

  /* ===============================================
     PARALLAX EFFECT FOR GRADIENT ORBS
  =============================================== */
  window.addEventListener("mousemove", (e) => {
    const orbs = document.querySelectorAll(".gradient-orb")
    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 20
      const x = mouseX * speed
      const y = mouseY * speed
      orb.style.transform = `translate(${x}px, ${y}px)`
    })
  })

  /* ===============================================
     FOOTER YEAR AUTO UPDATE
  =============================================== */
  const footerYear = document.querySelector(".footer-year")
  if (footerYear) {
    const currentYear = new Date().getFullYear()
    footerYear.textContent = `© ${currentYear} All Rights Reserved`
  }

  /* ===============================================
     ADD ACTIVE STATE TO CURRENT NAV LINK
  =============================================== */
  const sections = document.querySelectorAll("section[id]")
  const navLinksAll = document.querySelectorAll(".nav-links a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinksAll.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  /* ===============================================
     PERFORMANCE: REDUCE MOTION FOR USERS WHO PREFER IT
  =============================================== */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    document.querySelectorAll("*").forEach((el) => {
      el.style.animation = "none"
      el.style.transition = "none"
    })
  }

  /* ===============================================
     CONSOLE LOG - DEVELOPER MESSAGE
  =============================================== */
  console.log("%c👋 Hello Developer!", "color: #00d9ff; font-size: 20px; font-weight: bold;")
  console.log("%cInterested in the code? Check it out on GitHub!", "color: #9ca3af; font-size: 14px;")
  console.log("%chttps://github.com/mohamedmOoka7", "color: #7c3aed; font-size: 14px;")
})
