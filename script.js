let prevScrollpos = window.pageYOffset;
const navbar = document.querySelector(".navbar");
const trailContainer = document.getElementById('trail-container');
const hiddenElements = document.querySelectorAll('.hidden');
let lastTime = 0;

// Hidden and Show
hiddenElements.forEach((el, i) => {
    setTimeout(() => {
        el.classList.add('show');
    }, i * 200);
});

setTimeout(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    });
    hiddenElements.forEach((el) => observer.observe(el));
}, hiddenElements.length * 200 + 1000);

// Scroll func for the navigation bar, it disappears when you scroll down, and appears when you scroll up
window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-6rem";
    }
    prevScrollpos = currentScrollPos;
};

// Trail because why not, adds the fun I guess...
window.addEventListener('pointermove', (e) => {
    const now = Date.now();
    if (now - lastTime < 5) return;
    lastTime = now;

    const trailElement = document.createElement('div');
    trailElement.classList.add('trail-element');
    trailElement.style.left = `${e.clientX - 6}px`;
    trailElement.style.top = `${e.clientY - 6}px`;

    trailContainer.appendChild(trailElement);
    requestAnimationFrame(() => {
        trailElement.style.transform = 'scale(0.3)';
        trailElement.style.opacity = '0';
    });
    trailElement.addEventListener('transitionend', () => {
        trailElement.remove();
    });
});