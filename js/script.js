  // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active navigation link
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (pageYOffset >= sectionTop - 100 && pageYOffset < sectionTop + sectionHeight - 100) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const start = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = Math.floor(progress * target);
                    counter.textContent = current + '+';
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                }
                
                requestAnimationFrame(updateCounter);
            });
        }

        // Trigger counter animation when stats section is visible
        const statsSection = document.querySelector('.stats');
        let statsAnimated = false;
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateCounters();
                    statsAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Simple parallax effect for hero section
        document.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-parallax-content');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Contact form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // If using Formspree, the form will submit normally
            // This is just for demonstration
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });

        // Contact info interaction functions
        function openMap() {
            window.open('https://maps.google.com/?q=28.6708333,77.1812778', '_blank');
        }
        
        function callPhone() {
            window.location.href = 'tel:+919868207908';
        }
        
        function sendEmail() {
            window.location.href = 'mailto:duxcreativeprivatelimited@gmail.com';
        }