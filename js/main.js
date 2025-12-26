/**
 * =============================================================================
 * CYBERSECURITY PORTFOLIO - ENHANCED JAVASCRIPT
 * Author: Mohamed Mooka
 * Description: Interactive functionality for professional portfolio
 * =============================================================================
 */

;(() => {
  // =============================================================================
  // 1. UTILITY FUNCTIONS
  // =============================================================================

  /**
   * Debounce function to limit function execution rate
   * @param {Function} func - Function to debounce
   * @param {Number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  const debounce = (func, wait = 100) => {
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
   * Throttle function to limit function execution frequency
   * @param {Function} func - Function to throttle
   * @param {Number} limit - Minimum time between executions
   * @returns {Function} Throttled function
   */
  const throttle = (func, limit = 100) => {
    let inThrottle
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  /**
   * Check if element is in viewport
   * @param {HTMLElement} element - Element to check
   * @returns {Boolean} True if element is in viewport
   */
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // =============================================================================
  // 2. DOM ELEMENTS CACHE
  // =============================================================================
  const DOM = {
    nav: document.querySelector(".nav"),
    navLinks: document.querySelectorAll(".nav-link"),
    sections: document.querySelectorAll("section[id]"),
    menuBtn: document.querySelector(".menu-btn"),
    animatedElements: document.querySelectorAll("[data-animate]"),
    orbs: document.querySelectorAll(".gradient-orb"),
    workCards: document.querySelectorAll(".work-card"),
    magneticButtons: document.querySelectorAll(".btn-primary, .btn-secondary"),
  }

  // =============================================================================
  // 3. NAVIGATION FUNCTIONALITY
  // =============================================================================

  /**
   * Update active navigation link based on scroll position
   */
  const updateActiveNav = () => {
    const scrollY = window.pageYOffset

    DOM.sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 200
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        DOM.navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  /**
   * Toggle mobile menu
   */
  const toggleMobileMenu = () => {
    DOM.nav.classList.toggle("active")
    DOM.menuBtn.classList.toggle("active")

    // Update aria-expanded attribute
    const isExpanded = DOM.menuBtn.classList.contains("active")
    DOM.menuBtn.setAttribute("aria-expanded", isExpanded)

    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? "hidden" : ""
  }

  /**
   * Close mobile menu
   */
  const closeMobileMenu = () => {
    DOM.nav.classList.remove("active")
    DOM.menuBtn.classList.remove("active")
    DOM.menuBtn.setAttribute("aria-expanded", "false")
    document.body.style.overflow = ""
  }

  /**
   * Initialize navigation
   */
  const initNavigation = () => {
    // Update active nav on scroll
    window.addEventListener("scroll", throttle(updateActiveNav, 100))

    // Initial active nav update
    updateActiveNav()

    // Mobile menu toggle
    if (DOM.menuBtn) {
      DOM.menuBtn.addEventListener("click", toggleMobileMenu)

      // Close menu when clicking nav links
      DOM.navLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu)
      })

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!DOM.nav.contains(e.target) && !DOM.menuBtn.contains(e.target)) {
          closeMobileMenu()
        }
      })

      // Close menu on escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && DOM.nav.classList.contains("active")) {
          closeMobileMenu()
        }
      })
    }
  }

  // =============================================================================
  // 4. SMOOTH SCROLL
  // =============================================================================

  /**
   * Initialize smooth scrolling for anchor links
   */
  const initSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href")

        // Skip if href is just "#" or empty
        if (href === "#" || href.length <= 1) {
          return
        }

        e.preventDefault()

        const target = document.querySelector(href)
        if (target) {
          const navHeight = DOM.nav.offsetHeight
          const targetPosition = target.offsetTop - navHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })

          // Update URL without jumping
          history.pushState(null, null, href)

          // Focus target for accessibility
          target.setAttribute("tabindex", "-1")
          target.focus()
        }
      })
    })
  }

  // =============================================================================
  // 5. SCROLL ANIMATIONS
  // =============================================================================

  /**
   * Initialize Intersection Observer for scroll animations
   */
  const initScrollAnimations = () => {
    if (!DOM.animatedElements.length) return

    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px",
    }

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-delay") || 0

          setTimeout(() => {
            entry.target.classList.add("animated")
          }, Number.parseInt(delay))

          // Stop observing after animation
          scrollObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)

    DOM.animatedElements.forEach((element) => {
      scrollObserver.observe(element)
    })
  }

  // =============================================================================
  // 6. PARALLAX EFFECT
  // =============================================================================

  /**
   * Initialize parallax effect for gradient orbs
   */
  const initParallax = () => {
    if (!DOM.orbs.length) return

    const handleParallax = throttle(() => {
      const scrolled = window.pageYOffset

      DOM.orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.05
        orb.style.transform = `translateY(${scrolled * speed}px)`
      })
    }, 16) // ~60fps

    window.addEventListener("scroll", handleParallax)
  }

  // =============================================================================
  // 7. WORK CARD SPOTLIGHT EFFECT
  // =============================================================================

  /**
   * Initialize spotlight effect on work cards
   */
  const initWorkCardSpotlight = () => {
    if (!DOM.workCards.length) return

    DOM.workCards.forEach((card) => {
      card.addEventListener(
        "mousemove",
        throttle((e) => {
          const rect = card.getBoundingClientRect()
          const x = ((e.clientX - rect.left) / rect.width) * 100
          const y = ((e.clientY - rect.top) / rect.height) * 100

          card.style.setProperty("--mouse-x", `${x}%`)
          card.style.setProperty("--mouse-y", `${y}%`)
        }, 16),
      ) // ~60fps
    })
  }

  // =============================================================================
  // 8. MAGNETIC BUTTON EFFECT
  // =============================================================================

  /**
   * Initialize magnetic effect for buttons
   */
  const initMagneticButtons = () => {
    if (!DOM.magneticButtons.length) return

    DOM.magneticButtons.forEach((button) => {
      button.addEventListener(
        "mousemove",
        throttle((e) => {
          const rect = button.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2

          button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
        }, 16),
      ) // ~60fps

      button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0, 0)"
      })
    })
  }

  // =============================================================================
  // 9. PERFORMANCE OPTIMIZATION
  // =============================================================================

  /**
   * Check if user prefers reduced motion
   */
  const checkReducedMotion = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      // Disable animations
      document.querySelectorAll("*").forEach((el) => {
        el.style.animation = "none"
        el.style.transition = "none"
      })

      console.log("Reduced motion preferences detected - animations disabled")
    }
  }

  /**
   * Lazy load images
   */
  const initLazyLoading = () => {
    const images = document.querySelectorAll('img[loading="lazy"]')

    if ("loading" in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      return
    }

    // Fallback for browsers that don't support native lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src || img.src
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }

  // =============================================================================
  // 10. ERROR HANDLING
  // =============================================================================

  /**
   * Global error handler
   */
  const initErrorHandling = () => {
    window.addEventListener("error", (e) => {
      console.error("Error occurred:", e.error)
      // You can add error reporting service here
    })

    window.addEventListener("unhandledrejection", (e) => {
      console.error("Unhandled promise rejection:", e.reason)
      // You can add error reporting service here
    })
  }

  // =============================================================================
  // 11. CONSOLE BRANDING
  // =============================================================================

  /**
   * Display branded console message
   */
  const displayConsoleBrand = () => {
    const styles = {
      title: "font-size: 20px; font-weight: 800; color: #3b82f6; text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);",
      subtitle: "font-size: 14px; color: #8b5cf6; font-weight: 600;",
      info: "font-size: 12px; color: #a3a3a3;",
    }

    console.log("%cMohamed Mooka | Cybersecurity Portfolio", styles.title)
    console.log("%cEnhanced Professional Design", styles.subtitle)
    console.log("%cVersion 2.0 | 2025", styles.info)
  }

  // =============================================================================
  // 12. INITIALIZATION
  // =============================================================================

  /**
   * Initialize all functionality when DOM is ready
   */
  const init = () => {
    try {
      // Check for reduced motion preference first
      checkReducedMotion()

      // Initialize all features
      initNavigation()
      initSmoothScroll()
      initScrollAnimations()
      initParallax()
      initWorkCardSpotlight()
      initMagneticButtons()
      initLazyLoading()
      initErrorHandling()

      // Display console branding
      displayConsoleBrand()

      console.log("✅ Portfolio initialized successfully")
    } catch (error) {
      console.error("❌ Error initializing portfolio:", error)
    }
  }

  // =============================================================================
  // 13. DOM READY
  // =============================================================================

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    // DOM is already ready
    init()
  }
})()
