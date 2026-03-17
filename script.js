// Sticky Navigation Menu
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");

window.addEventListener("scroll", function () {
  let scrollTop = document.documentElement.scrollTop;

  // Toggle sticky navbar & scroll button visibility
  if (scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }
});

// Smooth Scroll to Top
scrollBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Side Navigation Menu
let body = document.body;
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");

const showNavMenu = () => {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  menuBtn.setAttribute("aria-expanded", "true");
  body.style.overflow = "hidden";
};

const hideNavMenu = () => {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "";
  menuBtn.style.pointerEvents = "";
  menuBtn.setAttribute("aria-expanded", "false");
  body.style.overflow = "";
};

// Open and Close Side Menu
menuBtn.addEventListener("click", showNavMenu);
cancelBtn.addEventListener("click", hideNavMenu);

// Close Menu When Clicking a Link
document.querySelectorAll(".menu li a").forEach((link) => {
  link.addEventListener("click", hideNavMenu);
});

document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 800,
    slidesPerView: "auto",
    spaceBetween: 20,
    centeredSlides: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 30 },
    }
  });

  // Count-up animation for stats bar
  const counters = document.querySelectorAll(".stat-number");
  let started = false;

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const duration = 1500;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      updateCounter();
    });
  }

  // Trigger count-up when stats bar scrolls into view
  const statsBar = document.querySelector(".stats-bar");
  if (statsBar) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          animateCounters();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(statsBar);
  }
});


async function fetchExchangeRates() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD'); // Fetch latest exchange rates
    const data = await response.json();

    // Get conversion rates
    const usdToInr = data.rates.INR;
    const gbpToInr = usdToInr / data.rates.GBP;

    // Convert prices
    document.getElementById("london-price").innerText = `(~₹${Math.round(17.5 * gbpToInr)} - ₹${Math.round(20 * gbpToInr)})`;
    document.getElementById("canada-price").innerText = `(~₹${Math.round(22.5 * usdToInr)} - ₹${Math.round(25 * usdToInr)})`;
    document.getElementById("usa-price").innerText = `(~₹${Math.round(24.5 * usdToInr)} - ₹${Math.round(30.99 * usdToInr)})`;

  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    document.getElementById("london-price").innerText = "(Rates temporarily unavailable)";
    document.getElementById("canada-price").innerText = "(Rates temporarily unavailable)";
    document.getElementById("usa-price").innerText = "(Rates temporarily unavailable)";
  }
}

// Call the function on page load
fetchExchangeRates();

// Dynamic copyright year
const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

