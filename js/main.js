// ==================================================
// MAIN JAVASCRIPT FILE
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================================
     DARK MODE TOGGLE
  =============================================== */

  const toggleButton = document.getElementById("dark-mode-toggle")
  const body = document.body

  // Function to toggle theme
  const toggleTheme = () => {
    const currentTheme = body.dataset.theme || "dark"
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    body.dataset.theme = newTheme
    toggleButton.innerHTML = newTheme === "light" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'
    localStorage.setItem("theme", newTheme)
  }

  // Set initial theme from localStorage or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark"
  body.dataset.theme = savedTheme
  toggleButton.innerHTML = savedTheme === "light" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'

  // Add event listener to toggle button
  toggleButton.addEventListener("click", toggleTheme)

  /* ===============================================
     MOBILE MENU TOGGLE
  =============================================== */

  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
    })

    // Close menu when clicking on a link
    const navLinksItems = navLinks.querySelectorAll("a")
    navLinksItems.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuToggle.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        mobileMenuToggle.classList.remove("active")
        navLinks.classList.remove("active")
      }
    })
  }

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
     DISABLE ANIMATION ON PROJECT PAGES
  =============================================== */

  if (document.body.classList.contains("no-animate")) {
    return
  }

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
     TYPING EFFECT FOR SUBTITLE
  =============================================== */

  const typingText = document.querySelector(".typing-text")
  if (typingText) {
    const text = typingText.textContent
    typingText.textContent = ""
    let index = 0

    const typeWriter = () => {
      if (index < text.length) {
        typingText.textContent += text.charAt(index)
        index++
        setTimeout(typeWriter, 100)
      }
    }

    // Start typing after a delay
    setTimeout(typeWriter, 1000)
  }

  /* ===============================================
     SMOOTH SCROLL WITH OFFSET
  =============================================== */

  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]')
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")
      if (href === "#") return

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
     COUNTER ANIMATION FOR STATS
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
     PARALLAX EFFECT FOR GRADIENT ORBS
  =============================================== */

  const orbs = document.querySelectorAll(".gradient-orb")

  window.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 20
      const x = (mouseX - 0.5) * speed
      const y = (mouseY - 0.5) * speed

      orb.style.transform = `translate(${x}px, ${y}px)`
    })
  })

  /* ===============================================
     FOOTER YEAR AUTO UPDATE
  =============================================== */

  const footerYear = document.querySelector(".footer-year")
  if (footerYear) {
    footerYear.innerHTML = `© ${new Date().getFullYear()} Mohamed Mooka — Cybersecurity Portfolio`
  }

  /* ===============================================
     PRELOAD CRITICAL IMAGES
  =============================================== */

  const criticalImages = document.querySelectorAll(".project-image img, .about-image img")
  criticalImages.forEach((img) => {
    const src = img.getAttribute("src")
    if (src) {
      const preloadLink = document.createElement("link")
      preloadLink.rel = "preload"
      preloadLink.as = "image"
      preloadLink.href = src
      document.head.appendChild(preloadLink)
    }
  })

  /* ===============================================
     ACTIVE NAV LINK INDICATOR
  =============================================== */

  const sections = document.querySelectorAll("section[id]")

  const highlightNav = () => {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`)

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add("active")
      } else {
        navLink?.classList.remove("active")
      }
    })
  }

  window.addEventListener("scroll", highlightNav)

  /* ===============================================
     COPY EMAIL ON CLICK
  =============================================== */

  const emailLinks = document.querySelectorAll('a[href^="mailto:"]')
  emailLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const email = link.getAttribute("href").replace("mailto:", "")

      // Create temporary input
      const tempInput = document.createElement("input")
      tempInput.value = email
      document.body.appendChild(tempInput)
      tempInput.select()

      try {
        document.execCommand("copy")

        // Show success message
        const originalText = link.querySelector("h3")?.textContent || link.textContent
        if (link.querySelector("h3")) {
          link.querySelector("h3").textContent = "Email Copied!"
          setTimeout(() => {
            link.querySelector("h3").textContent = originalText
          }, 2000)
        }
      } catch (err) {
        console.error("Failed to copy email:", err)
      }

      document.body.removeChild(tempInput)
    })
  })

  /* ===============================================
     PERFORMANCE OPTIMIZATION
  =============================================== */

  // Lazy load images
  if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]')
    images.forEach((img) => {
      img.src = img.dataset.src || img.src
    })
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"
    document.body.appendChild(script)
  }

  /* ===============================================
     CONSOLE EASTER EGG
  =============================================== */

  console.log("%c🛡️ Cybersecurity Portfolio", "color: #00d9ff; font-size: 20px; font-weight: bold;")
  console.log("%cInterested in the code? Check out my GitHub!", "color: #7c3aed; font-size: 14px;")
  console.log("%chttps://github.com/mohamedmOoka7", "color: #00d9ff; font-size: 12px;")
})
