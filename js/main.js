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

  // =============================================================================
  // 2. DOM ELEMENTS CACHE
  // =============================================================================
  const DOM = {
    sections: document.querySelectorAll("section[id]"),
    animatedElements: document.querySelectorAll("[data-animate]"),
    workCards: document.querySelectorAll(".work-card"),
    magneticButtons: document.querySelectorAll(".btn-primary, .btn-secondary"),
  }

  // =============================================================================
  // 3. SMOOTH SCROLL
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
          const targetPosition = target.offsetTop

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
  // 4. SCROLL ANIMATIONS
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
  // 5. WORK CARD SPOTLIGHT EFFECT
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
      )
    })
  }

  // =============================================================================
  // 6. MAGNETIC BUTTON EFFECT
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
      )

      button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0, 0)"
      })
    })
  }

  // =============================================================================
  // 7. PARTICLES ANIMATION
  // =============================================================================

  /**
   * Create floating particles animation
   */
  const initParticles = () => {
    const particlesContainer = document.querySelector(".particles-container")
    if (!particlesContainer) return

    const particleCount = 30

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.style.position = "absolute"
      particle.style.width = Math.random() * 3 + 1 + "px"
      particle.style.height = particle.style.width
      particle.style.background = `rgba(107, 149, 255, ${Math.random() * 0.3 + 0.1})`
      particle.style.borderRadius = "50%"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particle.style.animation = `float ${Math.random() * 20 + 10}s ease-in-out infinite`
      particle.style.animationDelay = Math.random() * 5 + "s"

      particlesContainer.appendChild(particle)
    }
  }

  // =============================================================================
  // 8. PERFORMANCE OPTIMIZATION
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
  // 9. ERROR HANDLING
  // =============================================================================

  /**
   * Global error handler
   */
  const initErrorHandling = () => {
    window.addEventListener("error", (e) => {
      console.error("Error occurred:", e.error)
    })

    window.addEventListener("unhandledrejection", (e) => {
      console.error("Unhandled promise rejection:", e.reason)
    })
  }

  // =============================================================================
  // 10. CONSOLE BRANDING
  // =============================================================================

  /**
   * Display branded console message
   */
  const displayConsoleBrand = () => {
    const styles = {
      title: "font-size: 20px; font-weight: 800; color: #6b95ff; text-shadow: 0 2px 10px rgba(107, 149, 255, 0.3);",
      subtitle: "font-size: 14px; color: #a78bfa; font-weight: 600;",
      info: "font-size: 12px; color: #b4b4c8;",
    }

    console.log("%cMohamed Mooka | Cybersecurity Portfolio", styles.title)
    console.log("%cEnhanced Professional Design", styles.subtitle)
    console.log("%cVersion 2.0 | 2025", styles.info)
  }

  // =============================================================================
  // 11. INITIALIZATION
  // =============================================================================

  /**
   * Initialize all functionality when DOM is ready
   */
  const init = () => {
    try {
      // Check for reduced motion preference first
      checkReducedMotion()

      // Initialize all features
      initSmoothScroll()
      initScrollAnimations()
      initWorkCardSpotlight()
      initMagneticButtons()
      initParticles()
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
  // 12. DOM READY
  // =============================================================================

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    // DOM is already ready
    init()
  }
})()
