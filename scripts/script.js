const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const itens = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const numberIndicator = document.querySelector('.numbers');

let active = 0;
const total = itens.length;
let timer;

function update(direction) {
    const activeItem = document.querySelector('.item.active');
    const activeDot = document.querySelector('.dot.active');

    if (!activeItem || !activeDot || total === 0 || dots.length === 0 || !numberIndicator) {
        return;
    }

    activeItem.classList.remove('active');
    activeDot.classList.remove('active');

    if (direction > 0) {
        active++;
        if (active === total) {
            active = 0;
        }
    } else if (direction < 0) {
        active--;
        if (active < 0) {
            active = total - 1;
        }
    }

    if (itens[active] && dots[active]) {
        itens[active].classList.add('active');
        dots[active].classList.add('active');
        numberIndicator.textContent = String(active + 1).padStart(2, '0');
    }
}

if (total > 0 && dots.length > 0 && numberIndicator && prevButton && nextButton) {
    clearInterval(timer);
    timer = setInterval(() => {
        update(1);
    }, 5000);

    prevButton.addEventListener('click', () => {
        update(-1);
    });

    nextButton.addEventListener('click', () => {
        update(1);
    });
}

const logo = document.getElementById('logo');
if (logo) {
    logo.addEventListener('click', function (e) {
        if (window.location.pathname.endsWith('index.html')
            || window.location.pathname === '/') {
            e.preventDefault();
            location.reload();
        }
    });
}

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');
const navLinks = document.querySelectorAll('header nav a');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = document.body.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}
