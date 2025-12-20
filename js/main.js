// ================================================
// MAIN JAVASCRIPT - ENHANCED VERSION
// ================================================

document.addEventListener("DOMContentLoaded", () => {
  // ================================================
  // NAVIGATION FUNCTIONALITY
  // ================================================

  const navbar = document.getElementById("navbar")
  const mobileToggle = document.getElementById("mobileToggle")
  const navLinks = document.getElementById("navLinks")
  const navLinkElements = document.querySelectorAll(".nav-link")

  let lastScroll = 0
  window.addEventListener(
    "scroll",
    throttle(() => {
      const currentScroll = window.pageYOffset

      if (currentScroll > 120) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }

      if (currentScroll > lastScroll && currentScroll > 300) {
        navbar.style.transform = "translateY(-100%)"
      } else {
        navbar.style.transform = "translateY(0)"
      }

      lastScroll = currentScroll
    }, 100),
  )

  // Mobile menu toggle with enhanced animations
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
      document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : ""
    })

    // Close mobile menu when clicking on a link
    navLinkElements.forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("active")
        navLinks.classList.remove("active")
        document.body.style.overflow = ""
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains("active")) {
        mobileToggle.classList.remove("active")
        navLinks.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // ================================================
  // ACTIVE NAVIGATION HIGHLIGHT
  // ================================================

  const sections = document.querySelectorAll("section[id], header[id]")

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  }

  const navigationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id")

        navLinkElements.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }, observerOptions)

  sections.forEach((section) => {
    navigationObserver.observe(section)
  })

  // ================================================
  // SMOOTH SCROLL WITH OFFSET
  // ================================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        const offset = 90
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // ================================================
  // SCROLL REVEAL ANIMATION - ENHANCED
  // ================================================

  const revealElements = document.querySelectorAll(
    ".expertise-card, .project-card, .skill-category, .contact-method, .quality-item, .about-content, .about-image",
  )

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("reveal", "active")
          }, index * 120)
          revealObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px",
    },
  )

  revealElements.forEach((element) => {
    revealObserver.observe(element)
  })

  // ================================================
  // ================================================

  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener(
      "scroll",
      throttle(() => {
        const scrolled = window.pageYOffset
        const heroContent = hero.querySelector(".hero-content")
        if (heroContent && scrolled < window.innerHeight) {
          heroContent.style.transform = `translateY(${scrolled * 0.3}px)`
          heroContent.style.opacity = 1 - scrolled / 700
        }
      }, 16),
    )
  }

  // ================================================
  // ================================================

  const heroTagline = document.querySelector(".hero-tagline")
  if (heroTagline) {
    const text = heroTagline.textContent
    heroTagline.textContent = ""
    heroTagline.style.borderLeft = "2px solid var(--color-primary)"
    heroTagline.style.paddingRight = "5px"
    let i = 0

    const typeWriter = () => {
      if (i < text.length) {
        heroTagline.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 40)
      } else {
        heroTagline.style.borderLeft = "none"
      }
    }

    setTimeout(typeWriter, 2000)
  }

  // ================================================
  // ================================================

  const statValues = document.querySelectorAll(".stat-value")
  const animateCounter = (element) => {
    const target = Number.parseInt(element.textContent.replace(/\D/g, ""))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += increment
      if (current < target) {
        element.textContent = "+" + Math.ceil(current)
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = "+" + target
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

  statValues.forEach((stat) => {
    statsObserver.observe(stat)
  })

  // ================================================
  // LAZY LOAD IMAGES
  // ================================================

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute("data-src")
            img.classList.add("loaded")
          }
          imageObserver.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // ================================================
  // ================================================

  const createCursorTrail = () => {
    const trail = document.createElement("div")
    trail.className = "cursor-trail"
    document.body.appendChild(trail)

    let mouseX = 0
    let mouseY = 0
    let trailX = 0
    let trailY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.15
      trailY += (mouseY - trailY) * 0.15

      trail.style.left = trailX + "px"
      trail.style.top = trailY + "px"

      requestAnimationFrame(animateTrail)
    }

    animateTrail()
  }

  // Uncomment to enable cursor trail
  // createCursorTrail()

  // ================================================
  // CONSOLE GREETING
  // ================================================

  console.log("%c محمد موكا | Mohamed Mooka", "color: #3b82f6; font-size: 24px; font-weight: bold;")
  console.log("%c محلل أمن سيبراني | Cybersecurity Analyst", "color: #22d3ee; font-size: 16px; font-weight: bold;")
  console.log("%c متخصص DFIR وعمليات SOC | DFIR & SOC Operations Specialist", "color: #8b5cf6; font-size: 14px;")
  console.log("%c GitHub: https://github.com/mohamedmOoka7", "color: #64748b; font-size: 12px;")
  console.log("%c LinkedIn: https://www.linkedin.com/in/mohamed-mooka/", "color: #64748b; font-size: 12px;")
})

// ================================================
// UTILITY FUNCTIONS
// ================================================

// Throttle function for performance optimization
function throttle(func, wait) {
  let timeout
  let lastRun = 0

  return function executedFunction(...args) {
    const now = Date.now()

    if (now - lastRun >= wait) {
      func(...args)
      lastRun = now
    } else {
      clearTimeout(timeout)
      timeout = setTimeout(
        () => {
          func(...args)
          lastRun = Date.now()
        },
        wait - (now - lastRun),
      )
    }
  }
}

// Debounce function for performance optimization
function debounce(func, wait) {
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

if (!("scrollBehavior" in document.documentElement.style)) {
  const script = document.createElement("script")
  script.src = "https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"
  document.head.appendChild(script)
}
