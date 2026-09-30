// Stats Counter 
const counters = document.querySelectorAll(".count");


counters.forEach((counter) => {
    let current = 0;
    const target = +counter.getAttribute("data-target");
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if(current >= target) {
            counter.innerText = target;
            clearInterval(timer);
        } else {
            counter.innerText = Math.ceil(current);
        }
    }, 16);
});