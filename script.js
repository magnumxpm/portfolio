let nav = document.querySelector('.nav-links');
let burgermenu = document.querySelector('.burgermenu');

burgermenu.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burgermenu.classList.toggle('toggle');
})