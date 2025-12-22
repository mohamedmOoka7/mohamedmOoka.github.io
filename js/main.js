document.addEventListener("DOMContentLoaded", () => {
  // ===== NAVIGATION =====
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section[id]")
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const sidebarNav = document.querySelector(".sidebar-nav")

  function updateActiveNav() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 200
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  // ===== LOADING OVERLAY =====
  const loadingOverlay = document.getElementById("loadingOverlay")
  if (loadingOverlay) {
    setTimeout(() => {
      loadingOverlay.classList.add("hidden")
      setTimeout(() => loadingOverlay.remove(), 500)
    }, 800)
  }

  // ===== SMOOTH SCROLL =====
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")

      if (href !== "#" && href.length > 1) {
        e.preventDefault()

        const target = document.querySelector(href)
        if (target) {
          const offsetTop = target.offsetTop - 60

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // ===== STATS COUNTER =====
  const statsNumbers = document.querySelectorAll(".stat-number")
  let hasAnimatedStats = false

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedStats) {
          hasAnimatedStats = true
          animateStats()
        }
      })
    },
    { threshold: 0.5 },
  )

  const aboutSection = document.getElementById("about")
  if (aboutSection) {
    statsObserver.observe(aboutSection)
  }

  function animateStats() {
    statsNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.getAttribute("data-target"))
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

  // ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 50)
        fadeInObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const cards = document.querySelectorAll(".expertise-card, .project-card, .contact-method, .stat-box")
  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    fadeInObserver.observe(card)
  })

  // ===== SCROLL TO TOP BUTTON =====
  const scrollToTopBtn = document.getElementById("scrollToTop")

  function updateScrollToTop() {
    if (window.pageYOffset > 500) {
      scrollToTopBtn.classList.add("visible")
    } else {
      scrollToTopBtn.classList.remove("visible")
    }
  }

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // ===== KEYBOARD NAVIGATION =====
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape" && sidebarNav.classList.contains("active")) {
      sidebarNav.classList.remove("active")
      mobileMenuToggle.classList.remove("active")
    }

    // Arrow keys for navigation between sections
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const currentSection = document.querySelector(".nav-link.active")
      if (currentSection) {
        const allLinks = Array.from(navLinks)
        const currentIndex = allLinks.indexOf(currentSection)
        let nextIndex

        if (e.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % allLinks.length
        } else {
          nextIndex = (currentIndex - 1 + allLinks.length) % allLinks.length
        }

        const nextLink = allLinks[nextIndex]
        const targetId = nextLink.getAttribute("href")
        if (targetId && targetId.startsWith("#")) {
          e.preventDefault()
          const targetSection = document.querySelector(targetId)
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" })
          }
        }
      }
    }
  })

  // ===== DEBOUNCED SCROLL HANDLER =====
  let scrollTimeout
  const debounceScroll = (callback, delay = 100) => {
    return () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(callback, delay)
    }
  }

  const handleScroll = debounceScroll(() => {
    updateActiveNav()
    updateScrollToTop()
  })

  window.addEventListener("scroll", handleScroll)

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      sidebarNav.classList.toggle("active")
      mobileMenuToggle.classList.toggle("active")
    })

    // Close mobile menu when clicking nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        sidebarNav.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
      })
    })

    document.addEventListener("click", (e) => {
      if (
        sidebarNav.classList.contains("active") &&
        !sidebarNav.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)
      ) {
        sidebarNav.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
      }
    })
  }

  // ===== PARALLAX EFFECT =====
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".hero-section::before")

    if (window.innerWidth > 768) {
      const heroSection = document.querySelector(".hero-section")
      if (heroSection && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.3}px)`
      }
    }
  })

  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const text = heroTitle.innerHTML
    heroTitle.innerHTML = ""
    heroTitle.style.opacity = "1"

    let charIndex = 0
    const typingSpeed = 50

    function typeText() {
      if (charIndex < text.length) {
        heroTitle.innerHTML = text.substring(0, charIndex + 1)
        charIndex++
        setTimeout(typeText, typingSpeed)
      }
    }

    // Start typing after a short delay
    setTimeout(typeText, 500)
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible")
        }
      })
    },
    { threshold: 0.2 },
  )

  document.querySelectorAll(".section").forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(20px)"
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    sectionObserver.observe(section)
  })

  // Add class for visible sections
  const style = document.createElement("style")
  style.textContent = `
    .section-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `
  document.head.appendChild(style)

  const cursorTrail = []
  const maxTrailLength = 20

  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth > 1024) {
      cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() })

      if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift()
      }
    }
  })

  // ===== CONTACT FORM HANDLING =====
  const contactForm = document.getElementById("contactForm")
  const formMessage = document.getElementById("formMessage")

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const submitButton = contactForm.querySelector('button[type="submit"]')
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData.entries())

      // Show loading state
      submitButton.classList.add("loading")
      submitButton.disabled = true
      formMessage.style.display = "none"
      formMessage.classList.remove("success", "error")

      try {
        // Simulate form submission (replace with actual backend endpoint)
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // For demo purposes, we'll use mailto as fallback
        const mailtoLink = `mailto:mohamed.ashraf.abdallah65@gmail.com?subject=${encodeURIComponent(
          data.subject,
        )}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`

        // Show success message
        formMessage.textContent = "Message sent successfully! I'll get back to you soon."
        formMessage.classList.add("success")
        formMessage.style.display = "block"

        // Reset form
        contactForm.reset()

        // Open mailto link
        window.location.href = mailtoLink
      } catch (error) {
        // Show error message
        formMessage.textContent = "Sorry, there was an error sending your message. Please try again."
        formMessage.classList.add("error")
        formMessage.style.display = "block"
      } finally {
        // Remove loading state
        submitButton.classList.remove("loading")
        submitButton.disabled = false

        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = "none"
        }, 5000)
      }
    })

    // Form field validation feedback
    const formInputs = contactForm.querySelectorAll(".form-input, .form-textarea")
    formInputs.forEach((input) => {
      input.addEventListener("blur", () => {
        if (input.value.trim() === "" && input.hasAttribute("required")) {
          input.style.borderColor = "var(--color-error)"
        } else {
          input.style.borderColor = "var(--color-border)"
        }
      })

      input.addEventListener("input", () => {
        if (input.style.borderColor === "var(--color-error)") {
          input.style.borderColor = "var(--color-border)"
        }
      })
    })
  }

  // ===== CONSOLE MESSAGE =====
  console.log(
    "%c🔒 Mohamed Mooka - Cybersecurity Portfolio",
    "font-size: 18px; font-weight: 700; color: #3B82F6; text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);",
  )
  console.log("%c✨ Enhanced with Modern Animations & Interactions", "font-size: 13px; color: #A0A0A0;")
  console.log("%c🚀 Performance Optimized | Fully Responsive", "font-size: 13px; color: #10B981;")
  console.log("%c📱 Mobile-First Design | Accessibility Ready", "font-size: 13px; color: #F59E0B;")
})
