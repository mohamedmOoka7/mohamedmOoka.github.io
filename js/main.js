document.addEventListener("DOMContentLoaded", () => {
  // ===== DOCK NAVIGATION =====
  const dockItems = document.querySelectorAll(".dock-item")
  const sections = document.querySelectorAll("section[id]")

  function updateActiveDock() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 200
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        dockItems.forEach((item) => {
          item.classList.remove("active")
          if (item.getAttribute("data-section") === sectionId) {
            item.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", updateActiveDock)

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
          stat.textContent = Math.floor(current) + "+"
          requestAnimationFrame(updateCounter)
        } else {
          stat.textContent = target + "+"
        }
      }

      updateCounter()
    })
  }

  // ===== UPDATE MENU BAR TIME =====
  function updateMenuBar() {
    const now = new Date()
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    const dateString = now.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })

    const timeElement = document.getElementById("current-time")
    const dateElement = document.getElementById("current-date")

    if (timeElement) timeElement.textContent = timeString
    if (dateElement) dateElement.textContent = dateString
  }

  updateMenuBar()
  setInterval(updateMenuBar, 1000)

  // ===== SPOTLIGHT SEARCH FUNCTIONALITY =====
  const spotlightOverlay = document.getElementById("spotlight-overlay")
  const spotlightInput = document.getElementById("spotlight-input")
  const searchIcon = document.getElementById("search-icon")
  const spotlightTrigger = document.getElementById("spotlight-trigger")

  function openSpotlight() {
    spotlightOverlay.classList.add("active")
    setTimeout(() => spotlightInput.focus(), 250)
  }

  function closeSpotlight() {
    spotlightOverlay.classList.remove("active")
    spotlightInput.value = ""
  }

  if (searchIcon) {
    searchIcon.addEventListener("click", openSpotlight)
  }

  if (spotlightTrigger) {
    spotlightTrigger.addEventListener("click", (e) => {
      e.preventDefault()
      openSpotlight()
    })
  }

  if (spotlightOverlay) {
    spotlightOverlay.addEventListener("click", (e) => {
      if (e.target === spotlightOverlay) {
        closeSpotlight()
      }
    })
  }

  // ===== LAUNCHPAD FUNCTIONALITY =====
  const launchpadOverlay = document.getElementById("launchpad-overlay")
  const launchpadTrigger = document.getElementById("launchpad-trigger")

  function openLaunchpad() {
    launchpadOverlay.classList.add("active")
  }

  function closeLaunchpad() {
    launchpadOverlay.classList.remove("active")
  }

  if (launchpadTrigger) {
    launchpadTrigger.addEventListener("click", (e) => {
      e.preventDefault()
      openLaunchpad()
    })
  }

  if (launchpadOverlay) {
    launchpadOverlay.addEventListener("click", (e) => {
      if (e.target === launchpadOverlay) {
        closeLaunchpad()
      }
    })

    const launchpadItems = document.querySelectorAll(".launchpad-item")
    launchpadItems.forEach((item) => {
      item.addEventListener("click", closeLaunchpad)
    })
  }

  // ===== WINDOW DRAGGING FUNCTIONALITY =====
  const draggableWindows = document.querySelectorAll(".mac-window.draggable")

  draggableWindows.forEach((window) => {
    const header = window.querySelector("[data-window-drag]")
    if (!header) return

    let isDragging = false
    let currentX
    let currentY
    let initialX
    let initialY
    let xOffset = 0
    let yOffset = 0

    header.addEventListener("mousedown", dragStart)
    document.addEventListener("mousemove", drag)
    document.addEventListener("mouseup", dragEnd)

    function dragStart(e) {
      if (e.target.closest(".traffic-lights")) return

      initialX = e.clientX - xOffset
      initialY = e.clientY - yOffset
      isDragging = true

      window.style.cursor = "grabbing"
      header.style.cursor = "grabbing"
    }

    function drag(e) {
      if (isDragging) {
        e.preventDefault()

        currentX = e.clientX - initialX
        currentY = e.clientY - initialY

        xOffset = currentX
        yOffset = currentY

        window.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }
    }

    function dragEnd() {
      initialX = currentX
      initialY = currentY
      isDragging = false
      window.style.cursor = "move"
      header.style.cursor = "grab"
    }
  })

  // ===== TRAFFIC LIGHTS FUNCTIONALITY =====
  const trafficLights = document.querySelectorAll(".traffic-lights .light")

  trafficLights.forEach((light) => {
    light.addEventListener("click", (e) => {
      e.stopPropagation()
      const action = light.getAttribute("data-action")
      const window = light.closest(".mac-window")

      if (action === "close") {
        window.style.transform = "scale(0.95)"
        window.style.opacity = "0.5"
        setTimeout(() => {
          window.style.transform = ""
          window.style.opacity = ""
        }, 300)
      } else if (action === "minimize") {
        window.style.transform = "scale(0.1) translateY(500px)"
        window.style.opacity = "0"
        setTimeout(() => {
          window.style.transform = ""
          window.style.opacity = ""
        }, 500)
      } else if (action === "maximize") {
        window.classList.toggle("maximized")
        if (window.classList.contains("maximized")) {
          window.style.position = "fixed"
          window.style.top = "28px"
          window.style.left = "0"
          window.style.right = "0"
          window.style.bottom = "0"
          window.style.margin = "0"
          window.style.borderRadius = "0"
          window.style.zIndex = "999"
        } else {
          window.style.position = ""
          window.style.top = ""
          window.style.left = ""
          window.style.right = ""
          window.style.bottom = ""
          window.style.margin = ""
          window.style.borderRadius = ""
          window.style.zIndex = ""
        }
      }
    })
  })

  // ===== CONTROL CENTER FUNCTIONALITY =====
  const controlCenter = document.getElementById("control-center")
  const controlCenterTrigger = document.getElementById("control-center-trigger")
  const closeControl = document.getElementById("close-control")

  if (controlCenterTrigger) {
    controlCenterTrigger.addEventListener("click", (e) => {
      e.stopPropagation()
      controlCenter.classList.toggle("active")
    })
  }

  if (closeControl) {
    closeControl.addEventListener("click", () => {
      controlCenter.classList.remove("active")
    })
  }

  document.addEventListener("click", (e) => {
    if (
      controlCenter.classList.contains("active") &&
      !controlCenter.contains(e.target) &&
      !controlCenterTrigger.contains(e.target)
    ) {
      controlCenter.classList.remove("active")
    }
  })

  // ===== CONTROL TOGGLES FUNCTIONALITY =====
  const controlToggles = document.querySelectorAll(".control-toggle")
  controlToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active")
    })
  })

  // ===== ENHANCED KEYBOARD SHORTCUTS =====
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.code === "Space") {
      e.preventDefault()
      openSpotlight()
    }

    if ((e.metaKey || e.ctrlKey) && e.key === "d") {
      e.preventDefault()
      const cvLink = document.querySelector("a[download]")
      if (cvLink) cvLink.click()
    }

    if (e.key === "Escape") {
      closeSpotlight()
      closeLaunchpad()
      controlCenter.classList.remove("active")
    }
  })

  // ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const cards = document.querySelectorAll(".skill-card, .project-item, .contact-card")
  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`
    fadeInObserver.observe(card)
  })

  // ===== ENHANCED CONSOLE MESSAGE =====
  console.log(
    "%c🍎 Mohamed Mooka - Cybersecurity Portfolio",
    "font-size: 18px; font-weight: 700; color: #007aff; text-shadow: 0 2px 4px rgba(0,122,255,0.25); font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;",
  )
  console.log(
    "%cDesigned with authentic macOS Big Sur/Monterey aesthetics",
    "font-size: 13px; color: #6e6e73; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;",
  )
  console.log(
    "%c⌘ Keyboard Shortcuts:\n• ⌘+Space: Spotlight Search\n• ⌘+D: Download CV\n• Esc: Close overlays",
    "font-size: 12px; color: #86868b; font-family: 'SF Mono', 'Menlo', monospace; line-height: 1.5;",
  )
})
