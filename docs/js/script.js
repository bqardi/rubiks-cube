document.addEventListener("DOMContentLoaded", event => {
    //#region BURGER MENU
    const burger = document.getElementById("burger");
    const burgerNav = document.getElementById("navigation-burger");
    const main = document.getElementById("main");
    const body = document.querySelector("body");

    burger.addEventListener("click", toggleMenu);
    body.addEventListener("click", hideMenu);
    burgerNav.addEventListener("click", preventClickThrough);

    function toggleMenu(evt) {
        evt.preventDefault();
        preventClickThrough(evt)
        burgerNav.classList.toggle("js-active");
        main.classList.toggle("js-pushed");
    }

    function hideMenu() {
        burgerNav.classList.remove("js-active");
        main.classList.remove("js-pushed");
    }

    function preventClickThrough(evt) {
        evt.stopPropagation();
    }
    //#endregion BURGER MENU

    //#region CUBE ANIMATION
    const cubeBackground = document.getElementById("cube-background");
    const cubeAnimation = document.getElementById("cube-animation");
    const pauseButton = document.getElementById("pause-button");

    let canTurn = true;
    let playing = true;
    let turnTimeout;

    pauseButton.addEventListener("click", togglePause);

    cubeBackground.addEventListener("mousemove", function(evt) {
        if (canTurn && !playing) {
            const backWidth = cubeBackground.offsetWidth;
            const backHeight = cubeBackground.offsetHeight;
            const centerX = -45;
            const offsetX = 25;
            const centerY = -25;
            const offsetY = 5;
            canTurn = false;
            const mousePosX = evt.pageX / backWidth * (offsetX * 2);
            const mousePosY = (evt.pageY / backHeight * (offsetY * 2) - (offsetY * 2)) * -1;
            turnCube(mousePosX - (offsetX - centerX), mousePosY - (offsetY - centerY));
            turnTimeout = setTimeout(() => {
                canTurn = true;
            }, 50);
        }
    });

    function togglePause() {
        playing = !playing;
        canTurn = !playing;
        clearTimeout(turnTimeout);
        cubeAnimation.classList.toggle("cube__container--animated");
    }

    function turnCube(x, y) {
        cubeAnimation.style = `transform: rotateX(${y}deg) rotateY(${x}deg) rotateZ(0deg);transition:transform 150ms`;
    }
    //#endregion CUBE ANIMATION

    //#region Intersection Observer
    let cubeExamples = document.querySelectorAll('.cube-example-container');

    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    }

    let observer = new IntersectionObserver(function(entries, observer) {
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            if (entry.isIntersecting) {
                const rnd = randomInteger(0, 2);
                if (rnd == 0) {
                    entry.target.classList.add("js-anim-slide-in-left");
                } else {
                    entry.target.classList.add("js-anim-slide-in-right");
                }
                observer.unobserve(entry.target);
            } else {
                entry.target.classList.add("js-anim-hidden");
            }
        }
    }, options);

    cubeExamples.forEach(target => {
        observer.observe(target);
    });
    //#endregion Intersection Observer

    //#region Random function
    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //#endregion Random function
});