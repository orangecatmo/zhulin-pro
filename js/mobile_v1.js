(function () {
    var mq = window.matchMedia('(max-width: 900px)');

    function setMobileState() {
        var isMobile = mq.matches;
        document.documentElement.classList.toggle('mobile-layout', isMobile);
        document.body.classList.toggle('mobile-layout', isMobile);
        syncPracticeSpacing(isMobile);
        resetGalleryForMobile(isMobile);
        preparePracticeImages(isMobile);
        prepareHomePortfolio(isMobile);
    }

    function prepareHomePortfolio(isMobile) {
        if (!document.querySelector('.root .portfolio-img')) return;

        if (!isMobile) {
            document.body.classList.remove('home-portfolio-drop');
            document.body.classList.remove('home-portfolio-waiting');
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('home-portfolio-drop');
            document.body.classList.remove('home-portfolio-waiting');
            return;
        }

        if (!document.body.classList.contains('home-portfolio-drop')) {
            document.body.classList.add('home-portfolio-waiting');
        }
    }

    function dropHomePortfolio() {
        if (!mq.matches || !document.querySelector('.root .portfolio-img')) return;

        document.body.classList.remove('home-portfolio-waiting');
        document.body.classList.add('home-portfolio-drop');
    }

    function syncPracticeSpacing(isMobile) {
        if (!document.body.classList.contains('practice-page')) return;

        var main = document.querySelector('main');
        if (!main) return;

        if (isMobile) {
            main.style.paddingTop = '0px';
        } else if (main.style.paddingTop === '0px') {
            main.style.paddingTop = '';
        }
    }

    function resetGalleryForMobile(isMobile) {
        var grid = document.querySelector('.gallery-grid');
        if (!grid || !isMobile) return;

        grid.style.height = 'auto';
        grid.style.position = 'static';

        grid.querySelectorAll('.piece').forEach(function (item) {
            item.style.position = 'relative';
            item.style.left = 'auto';
            item.style.top = 'auto';
            item.style.width = '100%';
        });
    }

    function preparePracticeImages(isMobile) {
        if (!isMobile || !document.querySelector('.practice-page .gallery-grid')) return;

        document.querySelectorAll('.practice-page .gallery-grid img').forEach(function (img) {
            img.loading = 'eager';
            img.decoding = 'async';

            if (img.dataset.mobileEager === '1') return;
            img.dataset.mobileEager = '1';

            var src = img.currentSrc || img.getAttribute('src');
            if (!src) return;

            var preloader = new Image();
            preloader.src = src;
        });
    }

    function enableCarouselSwipe() {
        document.querySelectorAll('.intro-carousel').forEach(function (carousel) {
            if (carousel.dataset.mobileSwipeReady === '1') return;
            carousel.dataset.mobileSwipeReady = '1';

            var startX = 0;
            var startY = 0;

            carousel.addEventListener('touchstart', function (event) {
                var touch = event.touches[0];
                startX = touch.clientX;
                startY = touch.clientY;
            }, { passive: true });

            carousel.addEventListener('touchend', function (event) {
                if (!mq.matches || !event.changedTouches.length) return;

                var touch = event.changedTouches[0];
                var dx = touch.clientX - startX;
                var dy = touch.clientY - startY;

                if (Math.abs(dx) < 38 || Math.abs(dx) < Math.abs(dy)) return;

                var button = carousel.querySelector(dx < 0 ? '.carousel-btn.next' : '.carousel-btn.prev');
                if (button) button.click();
            }, { passive: true });
        });
    }

    function refreshLater() {
        setMobileState();
        window.setTimeout(setMobileState, 120);
        window.setTimeout(setMobileState, 500);
    }

    if (mq.addEventListener) {
        mq.addEventListener('change', refreshLater);
    } else {
        mq.addListener(refreshLater);
    }

    window.addEventListener('resize', refreshLater);
    window.addEventListener('load', refreshLater);
    document.addEventListener('DOMContentLoaded', function () {
        setMobileState();
        enableCarouselSwipe();
    });
    window.addEventListener('homeTypewriterComplete', function (event) {
        if (event.detail && event.detail.selector === '.text.iphone') {
            dropHomePortfolio();
        }
    });
    window.setTimeout(function () {
        if (mq.matches && document.body.classList.contains('home-portfolio-waiting')) {
            dropHomePortfolio();
        }
    }, 5200);

    setMobileState();
})();
