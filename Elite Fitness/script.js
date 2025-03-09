document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    // Debounced Scroll for Menu
    let timeout;
    window.onscroll = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            menu.classList.remove('bx-x');
            navbar.classList.remove('active');
        }, 100);
    };

    // Sticky Header + Active Link
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar a');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Typed.js
    const typed = new Typed('.multiple-text', {
        strings: ['Physical Fitness', 'Weight Gain', 'Strength Training', 'Fat Loss', 'Weight Lifting', 'Running'],
        typeSpeed: 60,
        backSpeed: 60,
        backDelay: 1000,
        loop: true
    });

    // EmailJS Initialize
    emailjs.init({ publicKey: '3bzvJpa1VHScMra_k' });

    // Modal Functionality for "Join Us"
    const joinButtons = document.querySelectorAll('.top-btn .nav-btn, .home-content .btn');
    const modal = document.querySelector('#contact-modal');
    const closeBtn = document.querySelector('.close-btn');
    const contactForm = document.querySelector('#contact-form');

    joinButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            message: document.querySelector('#message').value
        };
        emailjs.send('service_agzm5xq', 'template_n2h76sz', formData)
            .then((response) => {
                alert('Form submitted successfully!');
                contactForm.reset();
                modal.classList.remove('active');
            }, (error) => {
                console.error('EmailJS Error:', error);
                alert('Failed to send message. Please try again.');
            });
    });

    // "Book a Free Class" Button Click
    const bookFreeClassBtn = document.querySelector('.about-content .btn');
    if (bookFreeClassBtn) {
        bookFreeClassBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.querySelector('#message').value = "I’d like to book a free class!";
        });
    }

    // Fix for "Home" Link Click
    const homeLink = document.querySelector('.navbar a[href="#home"]');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault(); // Stop default jump
            window.scrollTo({
                top: 0, // Scroll to the very top
                behavior: 'smooth' // Match your CSS smooth scrolling
            });
        });
    }
});