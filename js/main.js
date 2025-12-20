// ==================================================
// CYBERSECURITY PORTFOLIO - MAIN JAVASCRIPT
// Enhanced Interactions & Animations
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================================
     DISABLE ANIMATIONS ON PROJECT PAGES
  =============================================== */

  if (document.body.classList.contains("no-animate")) {
    return
  }

  /* ===============================================
     MOBILE MENU TOGGLE
  =============================================== */

  const menuToggle = document.getElementById("menuToggle")
  const navLinks = document.getElementById("navLinks")

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    const navLinkItems = navLinks.querySelectorAll("a")
    navLinkItems.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.classList.remove("active")
        navLinks.classList.remove("active")
      }
    })
  }

  /* ===============================================
     NAVBAR SCROLL EFFECT
  =============================================== */

  const navbar = document.getElementById("navbar")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    // Add scrolled class for styling
    if (currentScroll > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    lastScroll = currentScroll
  })

  /* ===============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
  =============================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Don't prevent default for hash-only links
      if (href === "#") return

      e.preventDefault()

      const target = document.querySelector(href)
      if (target) {
        const navbarHeight = navbar.offsetHeight
        const targetPosition = target.offsetTop - navbarHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
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

  // Observe all sections and cards
  const revealElements = document.querySelectorAll(".section, .card")
  revealElements.forEach((el) => {
    revealObserver.observe(el)
  })

  /* ===============================================
     DYNAMIC FOOTER YEAR
  =============================================== */

  const yearElement = document.getElementById("currentYear")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }

  /* ===============================================
     TYPING EFFECT FOR HERO SUBTITLE (OPTIONAL)
  =============================================== */

  const subtitle = document.querySelector(".subtitle")
  if (subtitle && subtitle.dataset.typing === "true") {
    const text = subtitle.textContent
    subtitle.textContent = ""
    subtitle.style.opacity = "1"

    let charIndex = 0
    const typeSpeed = 50

    function type() {
      if (charIndex < text.length) {
        subtitle.textContent += text.charAt(charIndex)
        charIndex++
        setTimeout(type, typeSpeed)
      }
    }

    setTimeout(type, 500)
  }

  /* ===============================================
     PERFORMANCE OPTIMIZATION - LAZY LOADING
  =============================================== */

  // Lazy load images
  const lazyImages = document.querySelectorAll("img[data-src]")

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          imageObserver.unobserve(img)
        }
      })
    })

    lazyImages.forEach((img) => imageObserver.observe(img))
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach((img) => {
      img.src = img.dataset.src
      img.removeAttribute("data-src")
    })
  }

  /* ===============================================
     EXTERNAL LINK SECURITY
  =============================================== */

  // Add rel="noopener noreferrer" to all external links
  const externalLinks = document.querySelectorAll('a[href^="http"]')
  externalLinks.forEach((link) => {
    if (!link.hostname.includes(window.location.hostname)) {
      link.setAttribute("rel", "noopener noreferrer")
      link.setAttribute("target", "_blank")
    }
  })

  /* ===============================================
     KEYBOARD NAVIGATION IMPROVEMENTS
  =============================================== */

  // Improve focus visibility for keyboard users
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-nav")
    }
  })

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-nav")
  })

  /* ===============================================
     CONSOLE EASTER EGG
  =============================================== */

  console.log("%c🔐 Cybersecurity Portfolio", "font-size: 20px; font-weight: bold; color: #60a5fa;")
  console.log("%cInterested in security? Let's connect!", "font-size: 14px; color: #9ca3af;")
  console.log("%cGitHub: https://github.com/mohamedmOoka7", "font-size: 12px; color: #60a5fa;")
})

// ==================================================
// UTILITY FUNCTIONS
// ==================================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait = 100) {
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

/**
 * Throttle function for scroll events
 */
function throttle(func, delay = 100) {
  let lastCall = 0
  return (...args) => {
    const now = new Date().getTime()
    if (now - lastCall < delay) return
    lastCall = now
    return func(...args)
  }
}
