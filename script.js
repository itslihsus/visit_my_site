// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navbar = document.getElementById("navbar")
const backToTop = document.getElementById("backToTop")
const navLinks = document.querySelectorAll(".nav-link")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Navbar scroll effect and active link highlighting
let lastScrollTop = 0
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Navbar background on scroll
  if (scrollTop > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Back to top button
  if (scrollTop > 300) {
    backToTop.classList.add("visible")
  } else {
    backToTop.classList.remove("visible")
  }

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section")
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight

    if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })

  lastScrollTop = scrollTop
})

// Back to top functionality
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Smooth reveal animation for hero content
window.addEventListener("load", () => {
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    heroContent.style.opacity = "1"
  }
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active")

      // Animate skill bars
      if (entry.target.classList.contains("skill-category")) {
        const skillBars = entry.target.querySelectorAll(".skill-progress")
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width")
          setTimeout(() => {
            bar.style.width = width
          }, 300)
        })
      }
    }
  })
}, observerOptions)

// Observe all cards and sections for animation
document
  .querySelectorAll(".about-card, .interest-card, .project-card, .skill-category, .timeline-card, .contact-card")
  .forEach((el) => {
    el.classList.add("reveal")
    observer.observe(el)
  })

// Typing effect for hero tagline (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const tagline = document.querySelector(".hero-tagline")
  const originalText = tagline.textContent
  setTimeout(() => {
    typeWriter(tagline, originalText, 50)
  }, 1000)
})

// Animate counters in hero stats
window.addEventListener("load", () => {
  const statNumbers = document.querySelectorAll(".stat-number")
  statNumbers.forEach((stat) => {
    const finalNumber = Number.parseInt(stat.textContent)
    let currentNumber = 0
    const increment = finalNumber / 50

    const timer = setInterval(() => {
      currentNumber += increment
      if (currentNumber >= finalNumber) {
        stat.textContent = finalNumber + "+"
        clearInterval(timer)
      } else {
        stat.textContent = Math.floor(currentNumber) + "+"
      }
    }, 30)
  })
})

// Parallax effect for hero shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const shapes = document.querySelectorAll(".shape")

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
  })
})

// Form submission handling (if contact form is added later)
function handleFormSubmit(event) {
  event.preventDefault()

  // Add form submission logic here
  const formData = new FormData(event.target)

  // Show success message
  showNotification("Message sent successfully!", "success")
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === "success" ? "#10b981" : "#6366f1"};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Add ripple effect to buttons
document.querySelectorAll(".btn, .social-btn, .contact-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `

    this.style.position = "relative"
    this.style.overflow = "hidden"
    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple animation CSS
const rippleStyle = document.createElement("style")
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(rippleStyle)

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.remove("lazy")
      imageObserver.unobserve(img)
    }
  })
})

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img)
})

// Preloader (optional)
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader")
  if (preloader) {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  }
})

// Console message for developers
console.log(`
🚀 Welcome to Sushil Paudel's Portfolio!
👨‍💻 Built with HTML, CSS, and JavaScript
🔒 Interested in cybersecurity and web development
📧 Contact: paudelsushil65@gmail.com
`)
