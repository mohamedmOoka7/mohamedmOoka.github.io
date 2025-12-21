document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("no-animate")) {
    return
  }

  /* ===============================================
     FLOATING NAVIGATION ACTIVE STATE
  =============================================== */

  const navDots = document.querySelectorAll(".nav-dot")
  const sections = document.querySelectorAll("section[id]")

  function updateActiveNav() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 200
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navDots.forEach((dot) => {
          dot.classList.remove("active")
          if (dot.getAttribute("data-section") === sectionId) {
            dot.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", updateActiveNav)

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
          const offsetTop = target.offsetTop - 50

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
     ANIMATED PARTICLES IN HERO
  =============================================== */

  const particlesContainer = document.getElementById("particles")

  if (particlesContainer) {
    // Create animated particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      // Random positioning
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(56, 189, 248, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
        box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
      `

      particlesContainer.appendChild(particle)
    }
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
                stat.textContent = Math.floor(current)
                requestAnimationFrame(updateCounter)
              } else {
                stat.textContent = target
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

  // Debounced scroll handler
  const debouncedScroll = debounce(() => {
    updateActiveNav()
  }, 10)

  window.addEventListener("scroll", debouncedScroll)

  /* ===============================================
     CONSOLE MESSAGE
  =============================================== */

  console.log("%c🛡️ Mohamed Mooka Portfolio", "font-size: 20px; font-weight: bold; color: #38bdf8;")
  console.log("%cLooking for a Cybersecurity Analyst? Let's connect!", "font-size: 14px; color: #9ca3af;")
  console.log("%c✨ Enhanced with modern animations and interactions", "font-size: 12px; color: #a78bfa;")
})
