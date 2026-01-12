
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');
let scrollBtn = document.querySelector('.scroll-top-btn');
let lastScrollTop = 0;

window.onscroll = () => {

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    let currentScroll = window.scrollY;


    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            let activeLink = document.querySelector('.navbar a[href*=' + id + ']');
            if (activeLink) activeLink.classList.add('active');
        }
    });


    let header = document.querySelector('.header');
    header.classList.toggle('sticky', currentScroll > 100);


    if (currentScroll > lastScrollTop && currentScroll > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    lastScrollTop = currentScroll;


    if (currentScroll > 100) {
        scrollBtn.classList.add('active');
    } else {
        scrollBtn.classList.remove('active');
    }
};


function revealOnScroll() {
    const reveals = document.querySelectorAll('[data-scroll-reveal]');

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectBoxes = document.querySelectorAll('.portfolio-box');


    function filterProjects(category) {
        projectBoxes.forEach(box => {
            const boxCategory = box.getAttribute('data-category');

            if (category === 'all' || boxCategory === category) {
                box.classList.remove('hidden');

                setTimeout(() => {
                    box.style.opacity = '1';
                    box.style.transform = 'scale(1)';
                }, 10);
            } else {
                box.classList.add('hidden');
                box.style.opacity = '0';
                box.style.transform = 'scale(0.95)';
            }
        });
    }


    filterProjects('mern');


    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {

            filterBtns.forEach(b => b.classList.remove('active'));


            this.classList.add('active');


            const filterValue = this.getAttribute('data-filter');


            filterProjects(filterValue);
        });
    });
});


if (typeof Typed !== 'undefined') {
    const typed = new Typed('.multiple-text', {
        strings: ['MERN STACK DEVELOPER', 'Full Stack Developer', 'Web Developer', 'React Developer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}


const magneticButtons = document.querySelectorAll('.magnetic-btn');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


$("#submit-form").validate({
    rules: {
        username: {
            pattern: /^[a-zA-Z ]+$/
        },
        phone: {
            pattern: /^\+?[1-9][0-9]{9}$/
        }
    },
    submitHandler: function (form) {
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbwH-Za2cIBL8YOsaOT3ixRSknd35qzsCon2bJs5J8MWykg29PaDPVGpELky41rAuPv9/exec",
            data: $(form).serialize(),
            method: "post",
            success: function (response) {

                const successMsg = document.createElement('div');
                successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; padding: 20px 30px; border-radius: 10px; box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3); z-index: 10000; font-size: 16px; font-weight: 600;';
                successMsg.textContent = '✓ Form submitted successfully!';
                document.body.appendChild(successMsg);

                setTimeout(() => {
                    successMsg.remove();
                }, 3000);

                form.reset();
            },
            error: function (err) {

                const errorMsg = document.createElement('div');
                errorMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #ef4444; color: white; padding: 20px 30px; border-radius: 10px; box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3); z-index: 10000; font-size: 16px; font-weight: 600;';
                errorMsg.textContent = '✗ Something went wrong. Please try again.';
                document.body.appendChild(errorMsg);

                setTimeout(() => {
                    errorMsg.remove();
                }, 3000);
            }
        });
    }
});





const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 100, fill: "forwards" });
});

// Touch support for cursor visibility
window.addEventListener('touchstart', function (e) {
    const posX = e.touches[0].clientX;
    const posY = e.touches[0].clientY;

    cursorDot.classList.add('active');
    cursorOutline.classList.add('active');

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});

window.addEventListener('touchmove', function (e) {
    const posX = e.touches[0].clientX;
    const posY = e.touches[0].clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 100, fill: "forwards" });
});

window.addEventListener('touchend', function () {
    cursorDot.classList.remove('active');
    cursorOutline.classList.remove('active');
});




const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});





if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}




