document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. STICKY HEADER & SCROLL PROGRESS
       ========================================================================== */
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Update progress bar width
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        // Navigation bar backdrop dynamic toggle
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. MOBILE NAVIGATION MENU (HAMBURGER)
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile drawer when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* ==========================================================================
       3. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve once revealed for performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       4. PORTFOLIO / PROJECTS FILTERING
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Manage Active Button Class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === cardCat) {
                    card.classList.remove('hide');
                    // Force reveal update
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 50);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* ==========================================================================
       5. WHATSAPP FORM SUBMISSION INTERACTION
       ========================================================================== */
    const projectForm = document.getElementById('projectForm');

    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract Values
            const name = document.getElementById('userName').value.trim();
            const phone = document.getElementById('userPhone').value.trim();
            const type = document.getElementById('projectType').value;
            const location = document.getElementById('projectLocation').value.trim();
            const budget = document.getElementById('projectBudget').value.trim() || 'غير محددة';
            const details = document.getElementById('projectDetails').value.trim();

            // Format Arabic WhatsApp Message
            const formattedMessage = 
`السلام عليكم،
أرغب في الاستفسار عن تنفيذ مشروع مع مكتب الإمتياز العقاري.

*تفاصيل الطلب:*
• *الاسم:* ${name}
• *رقم الهاتف:* ${phone}
• *نوع المشروع:* ${type}
• *الموقع / الولاية:* ${location}
• *الميزانية التقريبية:* ${budget}
• *تفاصيل المشروع:* ${details}

أرغب بالتواصل واستكمال الإجراءات.`;

            // Encode URI Component
            const encodedMessage = encodeURIComponent(formattedMessage);
            const whatsappUrl = `https://wa.me/96872420073?text=${encodedMessage}`;

            // Open Direct Link
            window.open(whatsappUrl, '_blank');
        });
    }

    /* ==========================================================================
       6. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});
