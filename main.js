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

document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".header nav");

  if(!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });

});
