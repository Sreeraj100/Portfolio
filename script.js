/*==================== MOBILE MENU TOGGLE ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    // Close mobile menu on scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // Update active nav link based on scroll position
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
        }
    });

    // Sticky header
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

/*==================== SCROLL REVEAL ANIMATION ====================*/
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

/*==================== PROJECT FILTERING ====================*/
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectBoxes = document.querySelectorAll('.portfolio-box');

    // Function to filter projects
    function filterProjects(category) {
        projectBoxes.forEach(box => {
            const boxCategory = box.getAttribute('data-category');

            if (category === 'all' || boxCategory === category) {
                box.classList.remove('hidden');
                // Add fade-in animation
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

    // Set MERN Stack as default on page load
    filterProjects('mern');

    // Add click event to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter category
            const filterValue = this.getAttribute('data-filter');

            // Filter projects
            filterProjects(filterValue);
        });
    });
});

/*==================== TYPED.JS EFFECT ====================*/
if (typeof Typed !== 'undefined') {
    const typed = new Typed('.multiple-text', {
        strings: ['MERN STACK DEVELOPER', 'Full Stack Developer', 'Web Developer', 'React Developer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

/*==================== MAGNETIC BUTTON EFFECT ====================*/
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

/*==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================*/
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

/*==================== FORM VALIDATION ====================*/
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
                // Show success message
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
                // Show error message
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

/*==================== CURSOR TRAIL EFFECT (OPTIONAL) ====================*/


const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});


/*==================== PERFORMANCE OPTIMIZATION ====================*/
// Lazy load images
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

/*==================== CONSOLE EASTER EGG ====================*/
console.log('%c👋 Hello Developer!', 'color: #8b5cf6; font-size: 24px; font-weight: bold;');
console.log('%cLike what you see? Let\'s connect!', 'color: #ec4899; font-size: 16px;');
console.log('%c📧 sreerajsrgmanu@gmail.com', 'color: #a78bfa; font-size: 14px;');