document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navLinks.classList.toggle('mobile');

        // Animate Hamburger
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 6px)' : 'none';
        spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -6px)' : 'none';
    });

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('open');
            }
        });
    });

    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // Hero Animations on Load
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-content h1');
        const heroPara = document.querySelector('.hero-content p');
        const heroBtn = document.querySelector('.cta-button');

        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
            heroTitle.style.transition = 'all 1s ease-out';
        }
        if (heroPara) {
            setTimeout(() => {
                heroPara.style.opacity = '1';
                heroPara.style.transform = 'translateY(0)';
                heroPara.style.transition = 'all 1s ease-out';
            }, 300);
        }
        if (heroBtn) {
            setTimeout(() => {
                heroBtn.style.opacity = '1';
                heroBtn.style.transform = 'translateY(0)';
                heroBtn.style.transition = 'all 1s ease-out';
            }, 600);
        }
    }, 100);

    // Form Validation & Success Message
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerText;

            // Basic animation for button
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Success!';
                btn.style.background = '#00ff88';
                btn.style.color = '#000';

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    btn.style.color = '';
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }
    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-card h3');
    const animateCounter = (el) => {
        const targetStr = el.innerText;
        const targetNum = parseInt(targetStr);
        const suffix = targetStr.replace(/[0-9]/g, '');
        let count = 0;
        const duration = 2000; // 2 seconds
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        const increment = targetNum / totalFrames;

        const update = () => {
            count += increment;
            if (count < targetNum) {
                el.innerText = Math.floor(count) + suffix;
                requestAnimationFrame(update);
            } else {
                el.innerText = targetNum + suffix;
            }
        };
        update();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const counter = entry.target.querySelector('h3');
                if (counter) animateCounter(counter);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => statsObserver.observe(card));
});
