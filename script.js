let nav = document.querySelector('.nav-links');
let burgermenu = document.querySelector('.burgermenu');

burgermenu.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burgermenu.classList.toggle('toggle');
})

// GSAP and ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

let t1 = gsap.timeline({ defaults: {duration: 1} });

gsap.from('.nav-container', {
    y: -50,
    opacity: 0,
    duration: 0.5,
});

t1.from('.landing-branding', {
    x: -50,
    opacity: 0,
    duration: 0.5,
})
.from('.quicklink-cards', {
    y: 50,
    opacity: 0,
    duration: 0.5,
})

t1.from('.section-header', {
    y: 50,
    opacity: 0,
    duration: 0.5,
    scrollTrigger:{
        trigger: '.section-header',
        start: "top 80%",
        scrub: true,
    }
})
.from('.project-card1', {
    x: -50,
    opacity: 0.7,
    duration: 0.5,
    scrollTrigger:{
        trigger: '.project-card1',
        scrub: true,
    }
})
.from('.project-card2', {
    x: 50,
    opacity: 0.7,
    duration: 0.5,
    scrollTrigger:{
        trigger: '.project-card2',
        scrub: true,
    }
})