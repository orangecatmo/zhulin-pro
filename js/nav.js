(function() {
    var header = document.querySelector('.site-header');
    var main = document.querySelector('main');
    var navItems = document.querySelectorAll('.nav-left ul li');
    var sections = [
        document.getElementById('section-ux'),
        document.getElementById('section-web'),
        document.getElementById('section-graphic')
    ];

    function getHeaderHeight() {
        return header ? header.offsetHeight : 0;
    }

    function syncPadding() {
        if (main) {
            main.style.paddingTop = getHeaderHeight() + 'px';
        }
    }
    
    // Layout padding sync
    syncPadding();
    window.addEventListener('resize', syncPadding);
    window.addEventListener('load', syncPadding);

    // Nav item click scrolling
    navItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            var target = sections[index];
            if (!target) return;
            
            var top = target.getBoundingClientRect().top + window.pageYOffset - getHeaderHeight() + 5;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    // Active section scrolling highlight
    function onScroll() {
        var offset = getHeaderHeight() + 150;
        var activeIndex = -1;
        
        sections.forEach(function(sec, index) {
            if (sec && sec.getBoundingClientRect().top <= offset) {
                activeIndex = index;
            }
        });
        
        navItems.forEach(function(item, index) {
            if (index === activeIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', function() {
        onScroll();
        var winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        document.documentElement.style.setProperty('--scroll-progress', scrolled + '%');
    }, { passive: true });
    onScroll();
    
    // Layout sync fallback
    setTimeout(syncPadding, 500);

    // Setup scroll reveal delay attributes
    document.querySelectorAll('.section-block').forEach(function(el) {
        el.classList.add('scroll-reveal');
    });
    document.querySelectorAll('.title-block').forEach(function(el) {
        el.classList.add('scroll-reveal');
    });
    document.querySelectorAll('.intro-text').forEach(function(el) {
        el.classList.add('scroll-reveal');
        el.setAttribute('data-delay', '100');
    });
    document.querySelectorAll('.intro-carousel').forEach(function(el) {
        el.classList.add('scroll-reveal');
        el.setAttribute('data-delay', '200');
    });
    document.querySelectorAll('.gallery-grid .piece').forEach(function(el, idx) {
        el.classList.add('scroll-reveal');
        var stagger = (idx % 3) * 120;
        el.setAttribute('data-delay', stagger.toString());
    });

    // Scroll reveal observer
    if ('IntersectionObserver' in window) {
        var revealElements = document.querySelectorAll('.scroll-reveal');
        var observerOptions = {
            root: null,
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px'
        };
        
        var revealObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var delayAttr = el.getAttribute('data-delay');
                    if (delayAttr) {
                        setTimeout(function() {
                            el.classList.add('revealed');
                        }, parseInt(delayAttr, 10));
                    } else {
                        el.classList.add('revealed');
                    }
                    observer.unobserve(el);
                }
            });
        }, observerOptions);
        
        revealElements.forEach(function(el) {
            revealObserver.observe(el);
        });
    } else {
        var revealElements = document.querySelectorAll('.scroll-reveal');
        revealElements.forEach(function(el) {
            el.classList.add('revealed');
        });
    }

    // Back to top button logic
    var backBtn = document.createElement('div');
    backBtn.className = 'back-to-top';
    backBtn.innerHTML = '↑';
    backBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    }, { passive: true });

    backBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
