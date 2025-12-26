// ====================================
// Intersection Observer for Animations
// ====================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe project cards for stagger animation
document.querySelectorAll(".project-card-modern").forEach((card, index) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(30px)"
  card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
  observer.observe(card)
})

// Observe profile section
const profileSection = document.querySelector(".profile-section")
if (profileSection) {
  profileSection.style.opacity = "0"
  profileSection.style.transform = "translateY(20px)"
  profileSection.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
  observer.observe(profileSection)
}

// Observe contact section
const contactSection = document.querySelector(".contact-social-section")
if (contactSection) {
  contactSection.style.opacity = "0"
  contactSection.style.transform = "translateY(20px)"
  contactSection.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s"
  observer.observe(contactSection)
}

// Observe section header
const sectionHeader = document.querySelector(".section-header-modern")
if (sectionHeader) {
  sectionHeader.style.opacity = "0"
  sectionHeader.style.transform = "translateY(20px)"
  sectionHeader.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
  observer.observe(sectionHeader)
}

// ====================================
// Smooth Scroll Enhancement
// ====================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const offsetTop = target.offsetTop - 20
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// ====================================
// Project Card Hover Effects
// ====================================
const projectCards = document.querySelectorAll(".project-card-modern")

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.zIndex = "10"
  })

  card.addEventListener("mouseleave", function () {
    this.style.zIndex = "1"
  })
})

// ====================================
// Tech Tag Interactive Effects
// ====================================
const techTags = document.querySelectorAll(".tech-tag")

techTags.forEach((tag) => {
  tag.addEventListener("click", function (e) {
    e.stopPropagation()
    const techName = this.textContent.trim()
    console.log(`Tech selected: ${techName}`)

    // Add ripple effect
    const ripple = document.createElement("span")
    ripple.style.position = "absolute"
    ripple.style.borderRadius = "50%"
    ripple.style.background = "rgba(0, 229, 255, 0.5)"
    ripple.style.width = "20px"
    ripple.style.height = "20px"
    ripple.style.animation = "ripple 0.6s ease-out"

    const rect = this.getBoundingClientRect()
    ripple.style.left = e.clientX - rect.left - 10 + "px"
    ripple.style.top = e.clientY - rect.top - 10 + "px"

    this.style.position = "relative"
    this.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  })
})

// Add ripple animation
const style = document.createElement("style")
style.textContent = `
  @keyframes ripple {
    to {
      width: 100px;
      height: 100px;
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

// ====================================
// Parallax Effect on Hero
// ====================================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".grid-background, .gradient-overlay")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// ====================================
// Contact Button Animations
// ====================================
const contactButtons = document.querySelectorAll(".contact-btn")

contactButtons.forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.02)"
  })

  button.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// ====================================
// Performance: Reduce animations on slow devices
// ====================================
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("*").forEach((element) => {
    element.style.animation = "none"
    element.style.transition = "none"
  })
}

// ====================================
// Page Load Animation
// ====================================
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// ====================================
// Dynamic Grid Animation
// ====================================
function animateGrid() {
  const grid = document.querySelector(".grid-background")
  if (!grid) return

  let opacity = 0.5
  let increasing = false

  setInterval(() => {
    if (increasing) {
      opacity += 0.01
      if (opacity >= 0.7) increasing = false
    } else {
      opacity -= 0.01
      if (opacity <= 0.3) increasing = true
    }
    grid.style.opacity = opacity
  }, 50)
}

animateGrid()

console.log("[v0] Modern portfolio website initialized successfully")
