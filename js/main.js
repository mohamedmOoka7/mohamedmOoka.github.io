// 2025 PROFESSIONAL PORTFOLIO - OPTIMIZED INTERACTIONS

document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  let lastScroll = 0

  const handleScroll = () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 60) {
      navbar.style.background = "rgba(0, 0, 0, 0.95)"
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.8)"
    }

    if (currentScroll > lastScroll && currentScroll > 300) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }

    lastScroll = currentScroll
  }

  let ticking = false
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    },
    { passive: true },
  )

  // Smooth scroll with offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#") return

      e.preventDefault()
      const target = document.querySelector(href)

      if (target) {
        const offset = 80
        const targetPosition = target.offsetTop - offset

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Intersection Observer for reveal animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  document.querySelectorAll(".section").forEach((el) => {
    observer.observe(el)
  })

  // Update footer year
  const footer = document.querySelector(".footer p")
  if (footer) {
    const year = new Date().getFullYear()
    footer.textContent = `© ${year} Mohamed Mooka`
  }
})
