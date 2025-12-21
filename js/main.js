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

  window.addEventListener(
    "scroll",
    debounce(() => {
      // Scroll-dependent functions
    }, 10),
  )
})
