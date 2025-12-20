// ==================================================
// ELITE PORTFOLIO JAVASCRIPT
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================================
     DISABLE ANIMATION ON PROJECT PAGES
  =============================================== */

  if (document.body.classList.contains("no-animate")) {
    return
  }

  /* ===============================================
     CUSTOM CURSOR
  =============================================== */

  const cursor = document.querySelector(".custom-cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  if (cursor && cursorFollower) {
    let mouseX = 0,
      mouseY = 0
    let cursorX = 0,
      cursorY = 0
    let followerX = 0,
      followerY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.3
      cursorY += (mouseY - cursorY) * 0.3
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1

      cursor.style.left = cursorX + "px"
      cursor.style.top = cursorY + "px"
      cursorFollower.style.left = followerX + "px"
      cursorFollower.style.top = followerY + "px"

      requestAnimationFrame(animateCursor)
    }

    animateCursor()
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

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        navLinks.classList.remove("active")
        document.body.style.overflow = ""
      })
    })
  }

  /* ===============================================
     TYPING EFFECT
  =============================================== */

  const typedTextSpan = document.querySelector(".typed-text")

  if (typedTextSpan) {
    const textArray = [
      "Cybersecurity Analyst",
      "DFIR Specialist",
      "SOC Operations Expert",
      "Incident Response Pro",
      "Threat Hunter",
    ]
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

  const revealElements = document.querySelectorAll(".section")
  revealElements.forEach((el) => revealObserver.observe(el))

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

  const heroStatsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statValues = entry.target.querySelectorAll(".stat-value[data-target]")
          statValues.forEach((stat) => {
            if (!stat.classList.contains("counted")) {
              stat.classList.add("counted")
              animateCounter(stat)
            }
          })
          heroStatsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  const heroStats = document.querySelector(".hero-stats")
  if (heroStats) {
    heroStatsObserver.observe(heroStats)
  }

  /* ===============================================
     ENHANCED SCROLL EFFECTS
  =============================================== */

  let ticking = false

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY
        const navbar = document.querySelector(".navbar")

        if (scrolled > 50) {
          navbar.classList.add("scrolled")
        } else {
          navbar.classList.remove("scrolled")
        }

        // Update active nav state
        const sections = document.querySelectorAll(".section")
        const navItems = document.querySelectorAll(".nav-link")
        let current = ""

        sections.forEach((section) => {
          const sectionTop = section.offsetTop
          if (scrolled >= sectionTop - 200) {
            current = section.getAttribute("id")
          }
        })

        navItems.forEach((item) => {
          item.classList.remove("active")
          if (item.getAttribute("href").slice(1) === current) {
            item.classList.add("active")
          }
        })

        // Scroll to top button
        const scrollTopBtn = document.querySelector(".scroll-top")
        if (scrollTopBtn) {
          if (scrolled > 500) {
            scrollTopBtn.classList.add("visible")
          } else {
            scrollTopBtn.classList.remove("visible")
          }
        }

        ticking = false
      })

      ticking = true
    }
  })

  /* ===============================================
     SCROLL TO TOP BUTTON
  =============================================== */

  const scrollTopBtn = document.querySelector(".scroll-top")

  if (scrollTopBtn) {
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
})

/* ===============================================
   PAGE LOADER
=============================================== */

window.addEventListener("load", () => {
  const pageLoader = document.querySelector(".page-loader")

  setTimeout(() => {
    if (pageLoader) {
      pageLoader.classList.add("hidden")
      setTimeout(() => {
        pageLoader.style.display = "none"
      }, 600)
    }
  }, 1200)
})

/* ===============================================
   SCROLL PROGRESS BAR
=============================================== */

window.addEventListener("scroll", () => {
  const scrollProgress = document.querySelector(".scroll-progress")

  if (scrollProgress) {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (window.scrollY / windowHeight) * 100
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`
  }
})
