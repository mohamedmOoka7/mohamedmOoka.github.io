// ==================================================
// MAIN JAVASCRIPT FILE - ENHANCED VERSION
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================================
     LOADING OVERLAY
  =============================================== */

  const loadingOverlay = document.querySelector(".loading-overlay")

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingOverlay.classList.add("hidden")
      setTimeout(() => {
        loadingOverlay.style.display = "none"
      }, 500)
    }, 800)
  })

  /* ===============================================
     NAVBAR SCROLL EFFECT
  =============================================== */

  const navbar = document.querySelector(".navbar")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

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

  const menuToggle = document.getElementById("menuToggle")
  const navLinks = document.getElementById("navLinks")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
      document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : ""
    })

    // Close menu when clicking on a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        navLinks.classList.remove("active")
        document.body.style.overflow = ""
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.classList.remove("active")
        navLinks.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  /* ===============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
  =============================================== */

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

  /* ===============================================
     SCROLL TO TOP BUTTON
  =============================================== */

  const scrollTopBtn = document.getElementById("scrollTop")

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 500) {
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
     DISABLE ANIMATION ON PROJECT PAGES
  =============================================== */

  if (document.body.classList.contains("no-animate")) {
    return
  }

  /* ===============================================
     SCROLL REVEAL ANIMATION (IMPROVED)
  =============================================== */

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for cards in grid
        setTimeout(() => {
          entry.target.classList.add("show")
        }, index * 100)

        revealObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const revealElements = document.querySelectorAll(".section, .card")
  revealElements.forEach((el) => revealObserver.observe(el))

  /* ===============================================
     FOOTER YEAR AUTO UPDATE
  =============================================== */

  const footerYear = document.querySelector("footer p")
  if (footerYear) {
    const currentYear = new Date().getFullYear()
    footerYear.innerHTML = `© ${currentYear} Mohamed Mooka — Cybersecurity Portfolio`
  }

  /* ===============================================
     PARALLAX EFFECT FOR HERO
  =============================================== */

  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.5
      hero.style.transform = `translateY(${parallax}px)`
    })
  }

  /* ===============================================
     TYPING EFFECT FOR SUBTITLE (OPTIONAL)
  =============================================== */

  const subtitle = document.querySelector(".subtitle")
  if (subtitle && !document.body.classList.contains("no-animate")) {
    const originalText = subtitle.textContent
    subtitle.textContent = ""
    let charIndex = 0

    function typeWriter() {
      if (charIndex < originalText.length) {
        subtitle.textContent += originalText.charAt(charIndex)
        charIndex++
        setTimeout(typeWriter, 50)
      }
    }

    setTimeout(typeWriter, 1000)
  }

  /* ===============================================
     CARD TILT EFFECT (SUBTLE 3D)
  =============================================== */

  const cards = document.querySelectorAll(".card")
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = ""
    })
  })

  /* ===============================================
     ACTIVE NAV LINK HIGHLIGHTING
  =============================================== */

  const sections = document.querySelectorAll("section[id]")
  const navLinksAll = document.querySelectorAll(".nav-links a")

  function highlightNavLink() {
    const scrollPosition = window.pageYOffset + 150

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinksAll.forEach((link) => {
          link.style.color = ""
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.style.color = "var(--primary)"
          }
        })
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)

  /* ===============================================
     CONSOLE EASTER EGG
  =============================================== */

  console.log("%c👋 Hello, Security Professional!", "color: #38bdf8; font-size: 20px; font-weight: bold;")
  console.log("%cInterested in the code? Check out the GitHub repo!", "color: #94a3b8; font-size: 14px;")
  console.log("%c🔒 Stay secure!", "color: #38bdf8; font-size: 16px; font-weight: bold;")
})

/* ===============================================
   PERFORMANCE: DEBOUNCE UTILITY
=============================================== */

function debounce(func, wait = 20, immediate = true) {
  let timeout
  return function () {
    
    const args = arguments
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(this, args)
  }
}

// Apply debounce to scroll events if needed
window.addEventListener(
  "scroll",
  debounce(() => {
    // Optimized scroll handler
  }, 10),
)
