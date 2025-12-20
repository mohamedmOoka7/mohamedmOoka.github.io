// ==================================================
// MAIN JAVASCRIPT - ENHANCED
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================================
     DISABLE ANIMATION ON PROJECT PAGES
  =============================================== */

  if (document.body.classList.contains("no-animate")) {
    return
  }

  /* ===============================================
     NAVBAR SCROLL EFFECT
  =============================================== */

  const navbar = document.querySelector(".navbar")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    // Add scrolled class for styling
    if (currentScroll > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    lastScroll = currentScroll
  })

  /* ===============================================
     MOBILE MENU TOGGLE
  =============================================== */

  const mobileToggle = document.querySelector(".mobile-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
    })

    // Close menu when clicking on a link
    const navLinksItems = document.querySelectorAll(".nav-links a")
    navLinksItems.forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
        mobileToggle.classList.remove("active")
        navLinks.classList.remove("active")
      }
    })
  }

  /* ===============================================
     SMOOTH SCROLL WITH OFFSET
  =============================================== */

  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")

      if (href !== "#" && href.length > 1) {
        e.preventDefault()

        const target = document.querySelector(href)
        if (target) {
          const offsetTop = target.offsetTop - 80 // navbar height

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  /* ===============================================
     SCROLL REVEAL ANIMATION
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

  const revealElements = document.querySelectorAll(".section, .card")
  revealElements.forEach((el) => revealObserver.observe(el))

  /* ===============================================
     BACK TO TOP BUTTON
  =============================================== */

  const backToTopButton = document.querySelector(".back-to-top")

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 500) {
        backToTopButton.classList.add("show")
      } else {
        backToTopButton.classList.remove("show")
      }
    })

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  /* ===============================================
     TYPING EFFECT FOR SUBTITLE
  =============================================== */

  const typingElement = document.querySelector(".typing-effect")

  if (typingElement) {
    const text = typingElement.textContent
    typingElement.textContent = ""
    let charIndex = 0

    function type() {
      if (charIndex < text.length) {
        typingElement.textContent += text.charAt(charIndex)
        charIndex++
        setTimeout(type, 100)
      }
    }

    // Start typing after a small delay
    setTimeout(type, 1000)
  }

  /* ===============================================
     PARALLAX EFFECT FOR HERO
  =============================================== */

  const heroBackground = document.querySelector(".hero-background")

  if (heroBackground) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallaxSpeed = 0.5

      heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`
    })
  }

  /* ===============================================
     STATS COUNTER ANIMATION
  =============================================== */

  const statsNumbers = document.querySelectorAll(".stat-number")
  let hasAnimated = false

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true

          statsNumbers.forEach((stat) => {
            const target = Number.parseInt(stat.textContent)
            const duration = 2000
            const increment = target / (duration / 16)
            let current = 0

            const updateCounter = () => {
              current += increment
              if (current < target) {
                stat.textContent = Math.floor(current) + "+"
                requestAnimationFrame(updateCounter)
              } else {
                stat.textContent = target + "+"
              }
            }

            updateCounter()
          })
        }
      })
    },
    { threshold: 0.5 },
  )

  const heroStats = document.querySelector(".hero-stats")
  if (heroStats) {
    statsObserver.observe(heroStats)
  }

  /* ===============================================
     ACTIVE NAVIGATION HIGHLIGHT
  =============================================== */

  const sections = document.querySelectorAll("section[id]")

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  })

  /* ===============================================
     CURSOR TRAIL EFFECT (OPTIONAL)
  =============================================== */

  const createCursorTrail = () => {
    const coords = { x: 0, y: 0 }
    const circles = document.querySelectorAll(".cursor-circle")

    if (circles.length === 0) return

    circles.forEach((circle) => {
      circle.x = 0
      circle.y = 0
    })

    window.addEventListener("mousemove", (e) => {
      coords.x = e.clientX
      coords.y = e.clientY
    })

    function animateCircles() {
      let x = coords.x
      let y = coords.y

      circles.forEach((circle, index) => {
        circle.style.left = x - 12 + "px"
        circle.style.top = y - 12 + "px"
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`

        circle.x = x
        circle.y = y

        const nextCircle = circles[index + 1] || circles[0]
        x += (nextCircle.x - x) * 0.3
        y += (nextCircle.y - y) * 0.3
      })

      requestAnimationFrame(animateCircles)
    }

    animateCircles()
  }

  // Uncomment to enable cursor trail
  // createCursorTrail();

  /* ===============================================
     FOOTER YEAR AUTO UPDATE
  =============================================== */

  const yearElement = document.getElementById("year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }

  /* ===============================================
     LAZY LOADING IMAGES
  =============================================== */

  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  /* ===============================================
     PERFORMANCE OPTIMIZATION
  =============================================== */

  // Debounce function for scroll events
  function debounce(func, wait = 10) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Apply debounce to scroll-heavy functions
  window.addEventListener(
    "scroll",
    debounce(() => {
      // Any scroll-dependent functions can go here
    }, 10),
  )

  /* ===============================================
     CONSOLE MESSAGE
  =============================================== */

  console.log("%c🛡️ Mohamed Mooka Portfolio", "font-size: 20px; font-weight: bold; color: #38bdf8;")
  console.log("%cLooking for a Cybersecurity Analyst? Let's connect!", "font-size: 14px; color: #9ca3af;")
})
