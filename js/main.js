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
     ENHANCED SCROLL REVEAL WITH STAGGER
  =============================================== */

  const revealElements = document.querySelectorAll(".experience-card, .project-card, .stat-item, .info-card")

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("reveal")
            entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`
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
     PARALLAX EFFECT ON HERO
  =============================================== */

  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const heroContent = document.querySelector(".hero-content")
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
        heroContent.style.opacity = 1 - scrolled / 700
      }
    })
  }

  /* ===============================================
     MOUSE TRAIL EFFECT (Optional Premium Feature)
  =============================================== */

  let mouseX = 0
  let mouseY = 0
  let isMoving = false

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    isMoving = true

    // Create temporary glow element
    const glow = document.createElement("div")
    glow.className = "mouse-glow"
    glow.style.left = mouseX + "px"
    glow.style.top = mouseY + "px"
    document.body.appendChild(glow)

    setTimeout(() => {
      glow.remove()
    }, 1000)
  })

  /* ===============================================
     CARD TILT EFFECT ON HOVER
  =============================================== */

  const cards = document.querySelectorAll(".experience-card, .project-card, .contact-card")

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = ""
    })
  })

  /* ===============================================
     ANIMATED COUNTER FOR STATS
  =============================================== */

  const statNumbers = document.querySelectorAll(".stat-number")
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target
          const text = target.textContent
          const number = Number.parseInt(text.replace(/\D/g, ""))

          if (number) {
            let current = 0
            const increment = number / 50
            const timer = setInterval(() => {
              current += increment
              if (current >= number) {
                target.textContent = text
                clearInterval(timer)
              } else {
                target.textContent = Math.floor(current) + (text.includes("+") ? "+" : "")
              }
            }, 30)
          }

          statsObserver.unobserve(target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statNumbers.forEach((stat) => statsObserver.observe(stat))

  /* ===============================================
     SMOOTH SCROLL PROGRESS INDICATOR
  =============================================== */

  const progressBar = document.createElement("div")
  progressBar.className = "scroll-progress"
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    z-index: 9999;
    transform-origin: left;
    transition: transform 0.1s ease;
  `
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (window.pageYOffset / windowHeight) * 100
    progressBar.style.width = scrolled + "%"
  })

  /* ===============================================
     TYPING EFFECT FOR HERO SUBTITLE (Optional)
  =============================================== */

  const heroSubtitle = document.querySelector(".hero-description")
  if (heroSubtitle && heroSubtitle.dataset.typed !== "true") {
    const originalText = heroSubtitle.textContent
    heroSubtitle.textContent = ""
    heroSubtitle.dataset.typed = "true"

    let charIndex = 0
    const typingSpeed = 30

    function type() {
      if (charIndex < originalText.length) {
        heroSubtitle.textContent += originalText.charAt(charIndex)
        charIndex++
        setTimeout(type, typingSpeed)
      }
    }

    // Start typing after page loads
    setTimeout(type, 500)
  }

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

// CSS FOR MOUSE GLOW EFFECT

const style = document.createElement("style")
style.textContent = `
  .mouse-glow {
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    animation: glowFade 1s ease-out forwards;
    z-index: 9998;
  }

  @keyframes glowFade {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(3);
    }
  }
`
document.head.appendChild(style)
