document.addEventListener("DOMContentLoaded", event => {
    //#region TIMER
    const pressPad = document.getElementById("press-pad");
    const pressPadCountDown = document.getElementById("pad-count-down");
    const timerHour = document.getElementById("timer-hour");
    const timerMinute = document.getElementById("timer-minute");
    const timerSecond = document.getElementById("timer-second");
    const timerMilli = document.getElementById("timer-milli");
    const timerCountDown = document.getElementById("timer-count-down");
    const timerStartText = document.getElementById("timer-start-text");

    pressPad.addEventListener("mouseup", toggleTimer);
    window.addEventListener("keyup", function(evt) {
        if (evt.keyCode == 32) {
            toggleTimer();
        }
    });

    let start;
    let time = 0;
    let h = 0;
    let m = 0;
    let s = 0;
    let ms = 0;
    let timerInstance;
    let countDownInstance;
    let running = false;
    let counter = 15;
    let record = 0;

    function toggleTimer() {
        if (countDownInstance) {
            pressPadCountDown.classList.remove("js-active");
            clearTimeout(countDownInstance);
            countDownInstance = null;
            startTimer();
            return;
        }
        if (timerInstance) {
            if (running) {
                stopTimer();
            } else {
                resetTimer();
            }
        } else {
            countDown();
        }
    }

    function startTimer() {
        running = true;
        start = new Date().getTime();
        timerInstance = setTimeout(timer, 100);
    }

    function stopTimer() {
        running = false;
        clearTimeout(timerInstance);
        countDownInstance = null;
        timerStartText.classList.add("js-active");
        if (record == 0 || record > time) {
            record = time;
            console.log(record);
        }
    }

    function resetTimer() {
        time = 0;
        h = 0;
        m = 0;
        s = 0;
        ms = 0;
        counter = 15;
        running = false;
        timerInstance = null;
        countDownInstance = null;
        timerHour.textContent = "0";
        timerMinute.textContent = "00";
        timerSecond.textContent = "00";
        timerMilli.textContent = "0";
        timerCountDown.textContent = counter;
        countDown();
    }

    function countDown() {
        pressPadCountDown.classList.add("js-active");
        timerStartText.classList.remove("js-active");
        // timerStartText.innerHTML = `Tryk og slip i dette område<span class="desktop-only"> eller tryk mellemrum</span>,<br>for at starte tiden.`;
        counter--;
        if (counter >= 0) {
            countDownInstance = setTimeout(() => {
                timerCountDown.textContent = counter;
                countDown();
            }, 1000);
            return;
        }
        pressPadCountDown.classList.remove("js-active");
        countDownInstance = null;
        startTimer();
    }

    function timer() {
        time += 100;
        ms += 100;

        if (m >= 60) {
            m = 0;
            h++;
        }
        if (s >= 60) {
            s = 0;
            m++;
        }
        if (ms >= 1000) {
            ms -= 1000;
            s++;
        }

        timerHour.textContent = h;
        timerMinute.textContent = m >= 10 ? m : "0" + m;
        timerSecond.textContent = s >= 10 ? s : "0" + s;
        timerMilli.textContent = Math.floor(ms / 100);
        let diff = (new Date().getTime() - start) - time;
        time += diff;
        ms += diff;
        timerInstance = setTimeout(timer, (100 - diff));
    }
    //#endregion TIMER
});