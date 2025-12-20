// ==================================================
// MAIN JAVASCRIPT FILE
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================================
     MOBILE NAVIGATION TOGGLE
  =============================================== */

  const mobileToggle = document.getElementById("mobileToggle")
  const navLinks = document.getElementById("navLinks")

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      mobileToggle.classList.toggle("active")
    })

    // Close mobile menu when clicking a link
    const navItems = navLinks.querySelectorAll("a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active")
        mobileToggle.classList.remove("active")
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove("active")
        mobileToggle.classList.remove("active")
      }
    })
  }

  /* ===============================================
     NAVBAR SCROLL EFFECT
  =============================================== */

  const navbar = document.getElementById("navbar")

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  }

  /* ===============================================
     SMOOTH SCROLL WITH OFFSET
  =============================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Don't prevent default for empty hash or just "#"
      if (href === "#" || href === "") return

      e.preventDefault()

      const target = document.querySelector(href)
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
     SCROLL REVEAL ANIMATION
  =============================================== */

  const revealElements = document.querySelectorAll(".experience-card, .project-card, .stat-item")

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation
          setTimeout(() => {
            entry.target.classList.add("reveal", "active")
          }, index * 100)
          revealObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  revealElements.forEach((el) => {
    revealObserver.observe(el)
  })

  /* ===============================================
     ACTIVE NAVIGATION HIGHLIGHTING
  =============================================== */

  const sections = document.querySelectorAll("section[id]")
  const navLinksItems = document.querySelectorAll(".nav-links a")

  const highlightNavigation = () => {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinksItems.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", highlightNavigation)

  /* ===============================================
     DYNAMIC YEAR IN FOOTER
  =============================================== */

  const yearElement = document.getElementById("year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }

  /* ===============================================
     PERFORMANCE: PRELOAD CRITICAL RESOURCES
  =============================================== */

  // Add preload hints for better performance
  const addPreloadHints = () => {
    const head = document.head

    // Preload fonts if using custom fonts
    // const fontLink = document.createElement("link");
    // fontLink.rel = "preload";
    // fontLink.as = "font";
    // fontLink.type = "font/woff2";
    // fontLink.href = "/fonts/your-font.woff2";
    // fontLink.crossOrigin = "anonymous";
    // head.appendChild(fontLink);
  }

  addPreloadHints()

  /* ===============================================
     ACCESSIBILITY: KEYBOARD NAVIGATION
  =============================================== */

  // Add visible focus indicators for keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-nav")
    }
  })

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-nav")
  })

  /* ===============================================
     CONSOLE MESSAGE (Optional)
  =============================================== */

  console.log("%c👋 Welcome to Mohamed Mooka's Portfolio", "color: #60a5fa; font-size: 16px; font-weight: bold;")
  console.log("%c🔒 Interested in cybersecurity? Let's connect!", "color: #a8abb5; font-size: 14px;")
})
