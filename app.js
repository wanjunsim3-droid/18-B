document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Progress Bar Update
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
        
        // 2. Header Background Toggle
        const header = document.getElementById('header');
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animation using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Number Counter Animation for Metrics
    const counters = document.querySelectorAll('.counter');
    const parseSpeed = 200; // Animation speed

    const animateCounters = (counterElement) => {
        const updateCount = () => {
            const target = +counterElement.getAttribute('data-target');
            // Allow decimals if target has decimals
            const isFloat = target % 1 !== 0;
            const count = +(counterElement.innerText);
            
            const inc = target / parseSpeed;
            
            if (count < target) {
                // Determine if we need decimal places based on target
                const nextValue = count + inc;
                counterElement.innerText = isFloat ? nextValue.toFixed(1) : Math.ceil(nextValue);
                setTimeout(updateCount, 15);
            } else {
                counterElement.innerText = isFloat ? target.toFixed(1) : target;
            }
        };
        updateCount();
    }

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // 5. Accordion Logic for Synergy Section
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close other open items
            accordionItems.forEach(otherItem => {
                if(otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // 6. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
