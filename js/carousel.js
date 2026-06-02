(function() {
    document.querySelectorAll('.intro-carousel').forEach(function(carousel) {
        const imgs = carousel.querySelectorAll('.carousel-inner img');
        if (!imgs.length) return;

        const prev = carousel.querySelector('.carousel-btn.prev');
        const next = carousel.querySelector('.carousel-btn.next');
        let current = 0;

        function show(i) {
            imgs[current].classList.remove('active');
            current = (i + imgs.length) % imgs.length;
            imgs[current].classList.add('active');
        }

        if (prev) prev.addEventListener('click', function() { show(current - 1); });
        if (next) next.addEventListener('click', function() { show(current + 1); });

        imgs.forEach(function(img) {
            img.addEventListener('click', function() {
                openLightbox(this.src);
            });
        });
    });

    function openLightbox(src) {
        var overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        var img = document.createElement('img');
        img.src = src;
        overlay.appendChild(img);
        document.body.appendChild(overlay);
        requestAnimationFrame(function() { overlay.classList.add('active'); });
        overlay.addEventListener('click', function() {
            overlay.classList.remove('active');
            setTimeout(function() { overlay.remove(); }, 300);
        });
    }
})();
