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

if (backToTopBtn) {
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
}

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

// ================= MATRIX RAIN EFFECT =================
function initMatrixEffect() {
  const canvas = document.getElementById("matrix-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const chars = "01"
  const charArray = chars.split("")

  const fontSize = 16
  const columns = canvas.width / fontSize

  const drops = []
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100
  }

  function draw() {
    ctx.fillStyle = "rgba(5, 8, 16, 0.04)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#3b82f6"
    ctx.font = fontSize + "px monospace"

    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
        drops[i] = 0
      }

      drops[i]++
    }
  }

  const matrixInterval = setInterval(draw, 60)

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  let lastScrollTop = 0
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollTop > window.innerHeight * 0.8 && scrollTop > lastScrollTop) {
      clearInterval(matrixInterval)
    }
    lastScrollTop = scrollTop
  })
}

initMatrixEffect()

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
const revealElements = document.querySelectorAll(".card, .section-header, .skill-category, .about-card")

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
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
