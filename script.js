document.addEventListener('DOMContentLoaded', function () {

    var width, height, largeContainer, canvas, ctx, circles, target, animateHeader = true;

    // Main initialization
    init();

    // Event handling
    addListeners();

    function init() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = { x: 0, y: height };

        largeContainer = document.getElementById('co');
        largeContainer.style.height = height + 'px';

        canvas = document.getElementById('c');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles for falling circles
        circles = [];
        for (var x = 0; x < width * 0.5; x++) {
            var c = new Circle();
            circles.push(c);
        }

        // Additional common initialization if needed

        // Start animation loop
        animate();
    }

    // Event handling function
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    // Check scroll position for animation
    function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    // Handle window resize
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeContainer.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
    }

    // Animation loop
    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in circles) {
                circles[i].draw();
            }
            document.getElementById('page-container').classList.add('fade-in');
        } else {
            document.getElementById('page-container').classList.remove('fade-in');
        }

        // Falling circles animation
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in circles) {
                circles[i].draw();
            }
        }

        requestAnimationFrame(animate);
    }

    // Canvas manipulation for falling circles
    function Circle() {
        var _this = this;

        // constructor
        (function () {
            _this.pos = {};
            init();
        })();

        function init() {
            _this.pos.x = Math.random() * width;
            _this.pos.y = height + Math.random() * 100;
            _this.alpha = 0.1 + Math.random() * 0.3;
            _this.scale = 0.1 + Math.random() * 0.3;
            _this.velocity = Math.random();
        }

        _this.draw = function () {
            if (_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
            ctx.fill();
        };
    }

    // Navigation function
    function navigateTo(page) {
        // Remove the 'fade-in' class to trigger the transition out effect
        document.getElementById('page-container').classList.remove('fade-in');

        // Delay the actual navigation to allow the transition effect
        setTimeout(function () {
            window.location.href = page;
        }, 500); // Adjust the delay as needed (should match the transition duration)
    }

});
