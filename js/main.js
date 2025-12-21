// ================= NAVIGATION OBSERVER =================
const observerOptions = {
  threshold: 0.5,
  rootMargin: "-100px 0px -100px 0px",
}

const sections = document.querySelectorAll("section[id], header[id]")
const navDots = document.querySelectorAll(".nav-dot")

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute("id")

      navDots.forEach((dot) => {
        dot.classList.remove("active")
        if (dot.getAttribute("data-section") === sectionId) {
          dot.classList.add("active")
        }
      })
    }
  })
}, observerOptions)

sections.forEach((section) => {
  sectionObserver.observe(section)
})

// ================= SMOOTH SCROLL =================
navDots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = dot.getAttribute("href").substring(1)
    const targetSection = document.getElementById(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ================= BACK TO TOP BUTTON =================
const backToTopBtn = document.querySelector(".back-to-top")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add("visible")
  } else {
    backToTopBtn.classList.remove("visible")
  }
})

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ================= TYPING EFFECT =================
const typingElement = document.querySelector(".typing-effect")
if (typingElement) {
  const text = typingElement.textContent
  typingElement.textContent = ""

  let charIndex = 0
  const typeSpeed = 50

  function typeWriter() {
    if (charIndex < text.length) {
      typingElement.textContent += text.charAt(charIndex)
      charIndex++
      setTimeout(typeWriter, typeSpeed)
    }
  }

  setTimeout(typeWriter, 500)
}

// ================= PARTICLE ANIMATION =================
function createParticles() {
  const particlesContainer = document.querySelector(".particles")
  if (!particlesContainer) return

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: ${Math.random() > 0.5 ? "var(--color-primary)" : "var(--color-accent)"};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.5 + 0.2};
      animation: float ${Math.random() * 10 + 10}s linear infinite;
    `
    particlesContainer.appendChild(particle)
  }
}

createParticles()

// ================= CARD HOVER EFFECT =================
const cards = document.querySelectorAll(".card")

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    card.style.setProperty("--mouse-x", `${x}px`)
    card.style.setProperty("--mouse-y", `${y}px`)
  })
})

// ================= SCROLL REVEAL ANIMATION =================
const revealElements = document.querySelectorAll(".card, .section-header")

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

revealElements.forEach((element) => {
  element.style.opacity = "0"
  element.style.transform = "translateY(30px)"
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  revealObserver.observe(element)
})

// ================= UPDATE YEAR IN FOOTER =================
const yearElement = document.getElementById("year")
if (yearElement) {
  yearElement.textContent = new Date().getFullYear()
}

// ================= PREVENT BROKEN LINKS =================
document.addEventListener("DOMContentLoaded", () => {
  const projectLinks = document.querySelectorAll('a[href="project-dfir.html"]')
  projectLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      alert("Project details page coming soon!")
    })
  })
})

// ================= PERFORMANCE: DEBOUNCE SCROLL =================
let scrollTimeout
window.addEventListener(
  "scroll",
  () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout)
    }

    scrollTimeout = window.requestAnimationFrame(() => {
      // Scroll-dependent animations handled here
    })
  },
  { passive: true },
)
