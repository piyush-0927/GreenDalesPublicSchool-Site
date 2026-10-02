// humburger menu functionality
const hamburger = document.querySelector("#hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
        navLinks.classList.remove("active");
    }
});

    document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove("active");
    }
});