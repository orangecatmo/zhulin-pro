(function() {
    function initTypewriter(selector) {
        var container = document.querySelector(selector);
        if (!container) return;
        
        var paragraphs = container.querySelectorAll('p');
        if (!paragraphs.length) return;

        var textContents = [];
        paragraphs.forEach(function(p) {
            textContents.push(p.innerHTML.trim());
            p.innerHTML = '';
            p.style.opacity = '1';
            p.classList.remove('typing-cursor');
        });

        var paragraphIndex = 0;
        var charIndex = 0;
        var typingSpeed = 50;

        function typeCharacter() {
            if (paragraphIndex >= paragraphs.length) {
                if (paragraphs.length > 0) {
                    paragraphs[paragraphs.length - 1].classList.remove('typing-cursor');
                }
                return;
            }

            var currentP = paragraphs[paragraphIndex];
            var originalHTML = textContents[paragraphIndex];
            
            currentP.classList.add('typing-cursor');

            if (charIndex < originalHTML.length) {
                // Handle HTML entities
                if (originalHTML.substr(charIndex, 6) === '&nbsp;') {
                    currentP.innerHTML += '&nbsp;';
                    charIndex += 6;
                } else if (originalHTML.substr(charIndex, 5) === '&amp;') {
                    currentP.innerHTML += '&amp;';
                    charIndex += 5;
                } else if (originalHTML.substr(charIndex, 4) === '&lt;') {
                    currentP.innerHTML += '&lt;';
                    charIndex += 4;
                } else if (originalHTML.substr(charIndex, 4) === '&gt;') {
                    currentP.innerHTML += '&gt;';
                    charIndex += 4;
                } else {
                    currentP.innerHTML += originalHTML.charAt(charIndex);
                    charIndex++;
                }
                setTimeout(typeCharacter, typingSpeed);
            } else {
                currentP.classList.remove('typing-cursor');
                paragraphIndex++;
                charIndex = 0;
                setTimeout(typeCharacter, 180);
            }
        }

        setTimeout(typeCharacter, 600);
    }

    window.addEventListener('DOMContentLoaded', function() {
        initTypewriter('.text.pc');
        initTypewriter('.text.iphone');
    });
})();
