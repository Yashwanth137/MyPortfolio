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
  body.style.overflow = "hidden";
};

const hideNavMenu = () => {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
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
    loop: true, // Enables infinite scrolling
    autoplay: {
      delay: 2000, // Adjust speed as needed
      disableOnInteraction: false, // Keeps autoplay running even after interaction
    },
    speed: 800, // Smooth transition speed
    slidesPerView: "auto", // Allows multiple images at once
    spaceBetween: 20, // Adjust spacing between images
    centeredSlides: false, // Prevents forced centering
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 20 }, // Medium screens
      1024: { slidesPerView: 3, spaceBetween: 30 }, // Large screens
    }
  });
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
  }
}

// Call the function on page load
fetchExchangeRates();

