<script>
document.addEventListener('DOMContentLoaded', function () {
    // Initialize logo
    const logoContainer = document.getElementById('logoContainer');
    if (logoContainer) {
        const logoSVG = `
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00ff9d"/>
                        <stop offset="100%" style="stop-color:#00d4ff"/>
                    </linearGradient>
                </defs>
                <rect width="50" height="50" rx="10" fill="url(#logoGradient)"/>
                <text x="25" y="32" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#000">L</text>
            </svg>
        `;
        logoContainer.innerHTML = logoSVG;
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function () {
            const isActive = navLinks.classList.toggle('active');
            mobileMenuBtn.textContent = isActive ? '✕' : '☰';
        });

        document.querySelectorAll('.nav-links a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });
    }

    // Form submission handling
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const formObject = {};
            formData.forEach(function (value, key) {
                formObject[key] = value;
            });

            const subject = encodeURIComponent('Enquiry: ' + (formObject.serviceType || 'General Inquiry'));
            const bodyLines = [
                `Name: ${formObject.firstName || ''} ${formObject.lastName || ''}`.trim(),
                `Email: ${formObject.email || ''}`,
                `Phone: ${formObject.phone || 'Not provided'}`,
                `Company: ${formObject.company || 'Not provided'}`,
                `Service Required: ${formObject.serviceType || 'Not specified'}`,
                `Project Location: ${formObject.projectLocation || 'Not specified'}`,
                '',
                'Project Details:',
                formObject.message || '[No message provided]',
                '',
                '---',
                'This enquiry was sent via the Lynesom Associates website.'
            ];
            const body = encodeURIComponent(bodyLines.join('\n'));

            const mailtoLink = `mailto:lynesom.ass@gmail.com?subject=${subject}&body=${body}`;

            // Try to open mail client
            window.location.href = mailtoLink;

            alert("Thank you for your enquiry! Your email client should open with the enquiry details. If it doesn't open automatically, please email us directly at lynesom.ass@gmail.com");

            this.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
        observer.observe(el);
    });

    // Add floating animation delay to service cards
    document.querySelectorAll('.service-card').forEach(function (card, index) {
        card.style.animationDelay = (index * 0.2) + 's';
    });

    // Interactive hover effects (reset fully on mouseleave)
    document.querySelectorAll('.project-content').forEach(function (content) {
        content.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        content.addEventListener('mouseleave', function () {
            this.style.transform = ''; // reset to original
        });
    });
});

// Navigation background change on scroll
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (!nav) return;
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    }

    // Parallax effect for hero (inside same scroll handler to avoid extra listeners)
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
    }
});

