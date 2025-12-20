// ================================================
// MAIN JAVASCRIPT
// ================================================

document.addEventListener("DOMContentLoaded", () => {
  // ================================================
  // NAVIGATION FUNCTIONALITY
  // ================================================

  const navbar = document.getElementById("navbar")
  const mobileToggle = document.getElementById("mobileToggle")
  const navLinks = document.getElementById("navLinks")
  const navLinkElements = document.querySelectorAll(".nav-link")

  // Navbar scroll effect
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

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    navLinkElements.forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target)) {
        mobileToggle.classList.remove("active")
        navLinks.classList.remove("active")
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
  // SMOOTH SCROLL
  // ================================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        const offset = 80
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // ================================================
  // SCROLL REVEAL ANIMATION
  // ================================================

  const revealElements = document.querySelectorAll(".expertise-card, .project-card, .skills-category, .contact-method")

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("reveal", "active")
          }, index * 100)
          revealObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    },
  )

  revealElements.forEach((element) => {
    revealObserver.observe(element)
  })

  // ================================================
  // TYPING EFFECT FOR HERO (Optional Enhancement)
  // ================================================

  const heroSubtitle = document.querySelector(".hero-subtitle")
  if (heroSubtitle) {
    const text = heroSubtitle.textContent
    heroSubtitle.textContent = ""
    let i = 0

    const typeWriter = () => {
      if (i < text.length) {
        heroSubtitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    setTimeout(typeWriter, 1500)
  }

  // ================================================
  // PERFORMANCE OPTIMIZATION
  // ================================================

  // Lazy load images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute("data-src")
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
  // CONSOLE GREETING
  // ================================================

  console.log("%c Mohamed Mooka Portfolio", "color: #3b82f6; font-size: 20px; font-weight: bold;")
  console.log("%c Cybersecurity Analyst | DFIR & SOC Operations", "color: #06b6d4; font-size: 14px;")
  console.log("%c GitHub: https://github.com/mohamedmOoka7", "color: #64748b; font-size: 12px;")
})

// ================================================
// UTILITY FUNCTIONS
// ================================================

// Throttle function for performance
function throttle(func, wait) {
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

// Debounce function for performance
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
