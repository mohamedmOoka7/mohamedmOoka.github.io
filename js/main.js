document.addEventListener("DOMContentLoaded", () => {
  /* ===========================================
     CUSTOM CURSOR
     =========================================== */
  const cursor = {
    dot: document.querySelector(".cursor-dot"),
    outline: document.querySelector(".cursor-outline"),
    init() {
      if (!this.dot || !this.outline || window.innerWidth <= 768) return

      let mouseX = 0,
        mouseY = 0
      let dotX = 0,
        dotY = 0
      let outlineX = 0,
        outlineY = 0

      document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
      })

      const animateCursor = () => {
        const ease = 0.15
        const outlineEase = 0.08

        dotX += (mouseX - dotX) * ease
        dotY += (mouseY - dotY) * ease
        outlineX += (mouseX - outlineX) * outlineEase
        outlineY += (mouseY - outlineY) * outlineEase

        this.dot.style.left = dotX + "px"
        this.dot.style.top = dotY + "px"
        this.outline.style.left = outlineX + "px"
        this.outline.style.top = outlineY + "px"

        requestAnimationFrame(animateCursor)
      }

      animateCursor()

      const hoverElements = document.querySelectorAll("a, button, .magnetic-btn, .hover-lift, .hover-scale")

      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"))
        el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"))
      })
    },
  }

  cursor.init()

  /* ===========================================
     SCROLL PROGRESS BAR
     =========================================== */
  const scrollProgress = {
    bar: document.querySelector(".scroll-progress-bar"),
    init() {
      if (!this.bar) return

      window.addEventListener("scroll", () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrolled = (window.scrollY / windowHeight) * 100
        this.bar.style.width = scrolled + "%"
      })
    },
  }

  scrollProgress.init()

  /* ===========================================
     HEADER SCROLL EFFECT
     =========================================== */
  const header = {
    element: document.querySelector(".main-header"),
    init() {
      if (!this.element) return

      let lastScroll = 0

      window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY

        if (currentScroll > 100) {
          this.element.classList.add("scrolled")
        } else {
          this.element.classList.remove("scrolled")
        }

        if (currentScroll > lastScroll && currentScroll > 500) {
          this.element.style.transform = "translateY(-100%)"
        } else {
          this.element.style.transform = "translateY(0)"
        }

        lastScroll = currentScroll
      })
    },
  }

  header.init()

  /* ===========================================
     NAVIGATION
     =========================================== */
  const navigation = {
    navItems: document.querySelectorAll(".nav-item, .mobile-nav-item"),
    sections: document.querySelectorAll("section[id]"),
    init() {
      window.addEventListener("scroll", () => this.updateActiveNav())

      this.navItems.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault()
          const targetId = item.getAttribute("href")
          const target = document.querySelector(targetId)

          if (target) {
            const offsetTop = target.offsetTop - 80

            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            })

            // Close mobile menu if open
            mobileMenu.close()
          }
        })
      })
    },

    updateActiveNav() {
      const scrollY = window.scrollY

      this.sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          this.navItems.forEach((item) => {
            item.classList.remove("active")
            if (item.getAttribute("data-section") === sectionId) {
              item.classList.add("active")
            }
          })
        }
      })
    },
  }

  navigation.init()

  /* ===========================================
     MOBILE MENU
     =========================================== */
  const mobileMenu = {
    btn: document.querySelector(".mobile-menu-btn"),
    overlay: document.querySelector(".mobile-menu-overlay"),
    isOpen: false,

    init() {
      if (!this.btn || !this.overlay) return

      this.btn.addEventListener("click", () => this.toggle())

      // Close on overlay click
      this.overlay.addEventListener("click", (e) => {
        if (e.target === this.overlay) {
          this.close()
        }
      })

      // Close on ESC key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpen) {
          this.close()
        }
      })
    },

    toggle() {
      this.isOpen ? this.close() : this.open()
    },

    open() {
      this.isOpen = true
      this.btn.classList.add("active")
      this.overlay.classList.add("active")
      document.body.style.overflow = "hidden"
    },

    close() {
      this.isOpen = false
      this.btn.classList.remove("active")
      this.overlay.classList.remove("active")
      document.body.style.overflow = ""
    },
  }

  mobileMenu.init()

  /* ===========================================
     STATS COUNTER ANIMATION
     =========================================== */
  const statsCounter = {
    numbers: document.querySelectorAll(".stat-number"),
    hasAnimated: false,

    init() {
      if (!this.numbers.length) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.hasAnimated) {
              this.hasAnimated = true
              this.animate()
            }
          })
        },
        { threshold: 0.5 },
      )

      const aboutSection = document.getElementById("about")
      if (aboutSection) {
        observer.observe(aboutSection)
      }
    },

    animate() {
      this.numbers.forEach((stat) => {
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
    },
  }

  statsCounter.init()

  /* ===========================================
     PARALLAX EFFECT
     =========================================== */
  const parallax = {
    elements: document.querySelectorAll(".parallax-element"),

    init() {
      if (!this.elements.length || window.innerWidth <= 768) return

      window.addEventListener("scroll", () => this.update())
    },

    update() {
      const scrolled = window.scrollY

      this.elements.forEach((el) => {
        const speed = el.getAttribute("data-speed") || 0.5
        const yPos = -(scrolled * speed)
        el.style.transform = `translateY(${yPos}px)`
      })
    },
  }

  parallax.init()

  /* ===========================================
     MAGNETIC BUTTONS
     =========================================== */
  const magneticButtons = {
    buttons: document.querySelectorAll(".magnetic-btn"),

    init() {
      if (!this.buttons.length || window.innerWidth <= 768) return

      this.buttons.forEach((btn) => {
        btn.addEventListener("mousemove", (e) => this.handleMove(e, btn))
        btn.addEventListener("mouseleave", () => this.handleLeave(btn))
      })
    },

    handleMove(e, btn) {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
    },

    handleLeave(btn) {
      btn.style.transform = "translate(0, 0)"
    },
  }

  magneticButtons.init()

  /* ===========================================
     INTERSECTION OBSERVER FOR ANIMATIONS
     =========================================== */
  const animateOnScroll = {
    elements: document.querySelectorAll(".fade-in-up, .hover-lift, .hover-scale, .hover-tilt"),

    init() {
      if (!this.elements.length) return

      const observer = new IntersectionObserver(
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

      this.elements.forEach((el) => {
        el.style.opacity = "0"
        el.style.transform = "translateY(40px)"
        observer.observe(el)
      })
    },
  }

  animateOnScroll.init()

  /* ===========================================
     3D TILT EFFECT
     =========================================== */
  const tiltEffect = {
    cards: document.querySelectorAll(".hover-tilt"),

    init() {
      if (!this.cards.length || window.innerWidth <= 768) return

      this.cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => this.handleMove(e, card))
        card.addEventListener("mouseleave", () => this.handleLeave(card))
      })
    },

    handleMove(e, card) {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * 5
      const rotateY = ((centerX - x) / centerX) * 5

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    },

    handleLeave(card) {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)"
    },
  }

  tiltEffect.init()

  /* ===========================================
     REVEAL TEXT ANIMATION
     =========================================== */
  const revealText = {
    elements: document.querySelectorAll(".reveal-text"),

    init() {
      if (!this.elements.length) return

      this.elements.forEach((el) => {
        const delay = Number.parseFloat(el.getAttribute("data-delay")) || 0
        el.style.animationDelay = `${delay + 0.2}s`
      })
    },
  }

  revealText.init()

  /* ===========================================
     CONSOLE SIGNATURE
     =========================================== */
  console.log(
    "%cMohamed Mooka",
    "font-size: 32px; font-weight: 800; color: #06b6d4; text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);",
  )
  console.log("%cCybersecurity Portfolio", "font-size: 16px; font-weight: 600; color: #a1a1aa;")
  console.log("%cRevolutionary Design System", "font-size: 14px; color: #52525b;")
})
