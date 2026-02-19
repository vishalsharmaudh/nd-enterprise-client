// Simple fade-in animation on scroll

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".service-card").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});

// IMAGE CAROUSEL
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");

let currentIndex = 0;
let interval = setInterval(nextSlide, 5000);

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

if (nextBtn && prevBtn && dots.length && slides.length) {

  nextBtn.addEventListener("click", () => {
    clearInterval(interval);
    nextSlide();
  });

  prevBtn.addEventListener("click", () => {
    clearInterval(interval);
    prevSlide();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(interval);
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

}


dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    clearInterval(interval);
    currentIndex = index;
    showSlide(currentIndex);
  });
});


const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll reveal animation for sections
const revealSections = document.querySelectorAll('.services, .why-section, .quick-hire-section, .recognition-section');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1
});

revealSections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  sectionObserver.observe(section);
});

// Form interaction animations
const formInputs = document.querySelectorAll('.form-group input, .form-group select');

formInputs.forEach(input => {
  input.addEventListener('focus', function () {
    this.parentElement.style.transform = 'scale(1.02)';
  });

  input.addEventListener('blur', function () {
    this.parentElement.style.transform = 'scale(1)';
  });
});

// Urgency button toggle
const urgencyButtons = document.querySelectorAll('.urgency-btn');

urgencyButtons.forEach(button => {
  button.addEventListener('click', function () {
    urgencyButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
  });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + (element.textContent.includes('%') ? '%' : element.textContent.includes('k+') ? 'k+' : element.textContent.includes('h') ? 'h' : '');
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(start) + (element.textContent.includes('%') ? '%' : element.textContent.includes('k+') ? 'k+' : element.textContent.includes('h') ? 'h' : '');
    }
  }, 16);
}

// Observe stat boxes and trigger counter animation
const statBoxes = document.querySelectorAll('.stat-box h3');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const text = entry.target.textContent;
      const numberMatch = text.match(/\d+/);
      if (numberMatch) {
        const target = parseInt(numberMatch[0]);
        entry.target.textContent = '0';
        animateCounter(entry.target, target);
        entry.target.dataset.animated = 'true';
      }
    }
  });
}, { threshold: 0.5 });

statBoxes.forEach(box => {
  statObserver.observe(box);
});

// Parallax effect for hero image
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

window.addEventListener("load", () => {

  const realStar = document.getElementById("starLogo");
  if (!realStar) return;

  const rect = realStar.getBoundingClientRect();

  const clone = realStar.cloneNode(true);

  clone.style.position = "fixed";
  clone.style.left = "50%";
  clone.style.top = "50%";
  clone.style.zIndex = "99999";
  clone.style.pointerEvents = "none";
  clone.style.willChange = "transform";
  clone.style.transition = "transform 1.1s ease-in-out";

  // start state (center + big)
  clone.style.transform = "translate(-50%, -50%) scale(18)";

  document.body.appendChild(clone);

  realStar.style.visibility = "hidden";

  const targetX = rect.left + rect.width / 2;
  const targetY = rect.top + rect.height / 2;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const dx = targetX - centerX;
  const dy = targetY - centerY;

  requestAnimationFrame(() => {
    clone.style.transform =
      `translate(${dx}px, ${dy}px) scale(1)`;
  });

  clone.addEventListener("transitionend", () => {
    clone.remove();
    realStar.style.visibility = "visible";
  });

});
