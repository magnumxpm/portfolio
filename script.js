let nav = document.querySelector('.nav-links');
let burgermenu = document.querySelector('.burgermenu');

burgermenu.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burgermenu.classList.toggle('toggle');
})

// GSAP and ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', e => {
    let t1 = gsap.timeline({ defaults: {duration: 1} });

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
    /*
    .from('.section-header', {
        y: 50,
        opacity: 0,
        duration: 0.5,
        scrollTrigger:{
            trigger: '.section-header',
            start: "top 80%",
            end: "top 50%",
            scrub: true,
        }
    })
    .from('.project-card1', {
        x: -50,
        opacity: 0,
        display: 'none',
        duration: 0.5,
        scrollTrigger:{
            trigger: '.project-card1',
            end: "top 60%",
        }
    })
    .from('.project-card2', {
        x: 50,
        opacity: 0,
        display: 'none',
        duration: 0.5,
        scrollTrigger:{
            trigger: '.project-card2',
            end: "top 60%",
        }
    })
    .from('.sub-section-header', {
        x: -50,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: '.sub-section-header',
            start: "top 80%"
        }
    })
    */
})
