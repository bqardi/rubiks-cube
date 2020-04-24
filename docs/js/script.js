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

    //#region CUBE EXAMPLE
    // const randomCubePieces = document.querySelectorAll(".cube-example__piece-random");

    // const cubePieceColor = ["white", "yellow", "blue", "green", "red", "orange", ]

    // if (randomCubePieces.length > 0) {
    //     for (let i = 0; i < randomCubePieces.length; i++) {
    //         const randomCubePiece = randomCubePieces[i];
    //         const strPieceColor = cubePieceColor[randomInteger(0, cubePieceColor.length)];
    //         randomCubePiece.classList.remove("cube-example__piece-random");
    //         randomCubePiece.classList.add("cube-example__piece-" + strPieceColor);
    //     }
    // }
    //#endregion CUBE EXAMPLE

    //#region LIBRARY FUNCTIONS
    // function randomInteger(min, max) {
    //     return Math.floor(Math.random() * (max - min)) + min;
    // }
    //#endregion LIBRARY FUNCTIONS
});