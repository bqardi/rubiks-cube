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
    const recordTime = document.getElementById("record-time");
    const timerVisualColor = document.getElementById("timer-visual-color");
    const timerInteraction = document.getElementById("timer-interaction");
    const allTimes = document.getElementById("all-times");
    const allTimesList = document.getElementById("all-times-list");
    const allTimesListItems = document.getElementById("all-times-list-items");
    const allTimesListClose = document.getElementById("all-times-list-close");

    pressPad.addEventListener("mouseup", toggleTimer);
    allTimes.addEventListener("click", toggleAllTimesList);
    allTimesListClose.addEventListener("click", toggleAllTimesList);
    window.addEventListener("keyup", function(evt) {
        if (evt.keyCode == 32) {
            toggleTimer();
        }
    });

    //Settings
    const interactionTimeout = 300;
    const interactionBackTimeout = 2000;
    const interactionShadowTimein = 200;
    const interactionShadowTimeout = 1000;
    const timeoutTime = 23;

    //Variables
    let start;
    let time = 0;
    let simTime = 0;
    let ms = 0;
    let s = 0;
    let m = 0;
    let h = 0;
    let timerInstance;
    let countDownInstance;
    let running = false;
    let counter = 15;
    let record = 0;
    let savedTime = "0:00:00.000";

    let savedTimes = [];

    function toggleAllTimesList(evt, doToggle = true) {
        evt.preventDefault();
        if (doToggle) {
            allTimesList.classList.toggle("js-active");
        }
        if (allTimesList.classList.contains("js-active")) {
            allTimesListItems.innerHTML = "";
            for (let i = 0; i < savedTimes.length; i++) {
                const saved = savedTimes[i];
                let listItem = document.createElement("LI");
                listItem.textContent = concatTime(saved.time);
                let listItemDelete = document.createElement("A");
                listItemDelete.classList.add("all-times-list__item-delete");
                listItemDelete.href = "#";
                listItemDelete.textContent = "SLET";
                listItem.appendChild(listItemDelete);
                let listItemAlg = document.createElement("SPAN");
                listItemAlg.classList.add("all-times-list__item-algorithm");
                listItemAlg.textContent = saved.alg;
                listItem.appendChild(listItemAlg);
                allTimesListItems.appendChild(listItem);
                listItemDelete.addEventListener("click", function(e) {
                    savedTimes.splice(i, 1);
                    const slideTime = 500;
                    listItem.style = `
                        margin-left:-300px;
                        transition:margin-left ${slideTime}ms;
                    `;
                    setTimeout(() => {
                        toggleAllTimesList(e, false);
                        if (savedTimes.length == 0) {
                            toggleAllTimesList(e);
                            allTimes.classList.remove("js-active");
                        }
                    }, slideTime / 2);
                    record = minValueInArray(savedTimes);
                    record = record == -1 ? 0 : record;
                    recordTime.textContent = concatTime(record);
                });
            }
        }
    }

    function toggleTimer() {
        if (allTimesList.classList.contains("js-active")) {
            return;
        }
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
        time = new Date().getTime() - start;
        countDownInstance = null;
        timerStartText.classList.add("js-active");
        timerVisualColor.removeAttribute("style");
        displayTime();
        setRecord();
        saveTime();
        time = 0;
        visualTimer();
        allTimes.classList.add("js-active");

        //RANDOM ALGORITHM
        generateAlg();
    }

    function saveTime() {
        let obj = new Object();
        obj.time = time;
        obj.alg = alg;
        savedTimes.push(obj);
        savedTimes.sort(function(a, b) {
            return a.time - b.time;
        });
    }

    function setRecord() {
        if (record == 0 || record > time) {
            record = time;
            recordTime.textContent = savedTime;
            timerInteraction.classList.add("js-win");
            timerHour.classList.add("js-win");
            timerMinute.classList.add("js-win");
            timerSecond.classList.add("js-win");
            timerMilli.classList.add("js-win");
            timerInteraction.style = `--interaction-time: ${interactionTimeout}ms;`;
            timerHour.style = `transition-delay: ${interactionTimeout}ms;transition: background-color 0ms, box-shadow ${interactionShadowTimein}ms;`;
            timerMinute.style = `transition-delay: ${interactionTimeout}ms;transition: background-color 0ms, box-shadow ${interactionShadowTimein}ms;`;
            timerSecond.style = `transition-delay: ${interactionTimeout}ms;transition: background-color 0ms, box-shadow ${interactionShadowTimein}ms;`;
            timerMilli.style = `transition-delay: ${interactionTimeout}ms;transition: background-color 0ms, box-shadow ${interactionShadowTimein}ms;`;
            setTimeout(() => {
                timerInteraction.classList.remove("js-win");
                timerHour.style = `transition-delay: 0ms;transition: background-color ${interactionBackTimeout}ms, box-shadow ${interactionShadowTimeout}ms;`;
                timerMinute.style = `transition-delay: 0ms;transition: background-color ${interactionBackTimeout}ms, box-shadow ${interactionShadowTimeout}ms;`;
                timerSecond.style = `transition-delay: 0ms;transition: background-color ${interactionBackTimeout}ms, box-shadow ${interactionShadowTimeout}ms;`;
                timerMilli.style = `transition-delay: 0ms;transition: background-color ${interactionBackTimeout}ms, box-shadow ${interactionShadowTimeout}ms;`;
                setTimeout(() => {
                    timerHour.classList.remove("js-win");
                    timerMinute.classList.remove("js-win");
                    timerSecond.classList.remove("js-win");
                    timerMilli.classList.remove("js-win");
                }, interactionTimeout);
            }, interactionTimeout);
        }
    }

    function resetTimer() {
        time = 0;
        simTime = 0;
        ms = 0;
        s = 0;
        m = 0;
        h = 0;
        counter = 15;
        running = false;
        timerInstance = null;
        countDownInstance = null;
        timerHour.textContent = "0";
        timerMinute.textContent = "00";
        timerSecond.textContent = "00";
        timerMilli.textContent = "000";
        timerCountDown.textContent = counter;
        countDown();
    }

    function countDown() {
        allTimes.classList.remove("js-active");
        pressPadCountDown.classList.add("js-active");
        timerStartText.classList.remove("js-active");
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
        time = new Date().getTime() - start;
        simTime += timeoutTime;
        let diff = time - simTime;
        displayTime();
        visualTimer();
        timerInstance = setTimeout(timer, (timeoutTime - diff));
    }

    function hoursToStr(duration) {
        return Math.floor((duration / (1000 * 60 * 60)) % 24);
    }

    function minutesToStr(duration) {
        let minute = Math.floor((duration / (1000 * 60)) % 60);
        minute = (minute < 10) ? "0" + minute : minute;
        return minute;
    }

    function secondsToStr(duration) {
        let second = Math.floor((duration / 1000) % 60);
        second = (second < 10) ? "0" + second : second;
        return second;
    }

    function milliToStr(duration) {
        let milli = parseInt(duration % 1000);
        milli = (milli < 100) ? (milli < 10) ? "00" + milli : "0" + milli : milli;
        return milli;
    }

    function displayTime() {
        h = hoursToStr(time);
        m = minutesToStr(time);
        s = secondsToStr(time);
        ms = milliToStr(time);
        timerHour.textContent = h;
        timerMinute.textContent = m;
        timerSecond.textContent = s;
        timerMilli.textContent = ms;
        savedTime = `${h}:${m}:${s}.${ms}`;
    }

    function concatTime(duration) {
        let hr = hoursToStr(duration);
        let mn = minutesToStr(duration);
        let sc = secondsToStr(duration);
        let msc = milliToStr(duration);
        return `${hr}:${mn}:${sc}.${msc}`;
    }

    function visualTimer() {
        if (record == 0) {
            return;
        }
        let percentage = time / record;
        if (percentage > 1) {
            timerVisualColor.style.height = "100%";
            timerVisualColor.style.opacity = "1";
            timerVisualColor.style.backgroundImage = "none";
            return;
        }
        timerVisualColor.style.height = `${percentage * 100}%`;
        timerVisualColor.style.opacity = percentage;
    }

    function minValueInArray(arr) {
        let lowest = -1;
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (!isNaN(item.time)) {
                if (lowest == -1 || item.time < lowest) {
                    lowest = item.time;
                }
            }
        }
        return lowest;
    }
    //#endregion TIMER

    //#region RANDOM ALGORITHM
    const timerStartAlgorithm = document.getElementById("timer-start-algorithm");

    const algs = ["F", "B", "R", "L", "U", "D"];
    const algDirs = ["", "'", "2"];

    let alg = "";
    let lastAlg = "";

    generateAlg();

    function generateAlg() {
        alg = "";
        for (let i = 0; i < 20; i++) {
            alg += getRandomAlg() + getRandomDir() + " ";
        }
        timerStartAlgorithm.textContent = alg.slice(0, -1);
    }

    function getRandomAlg() {
        let rndAlg = algs[randomInteger(0, algs.length)];
        while (rndAlg == lastAlg) {
            rndAlg = algs[randomInteger(0, algs.length)];
        }
        lastAlg = rndAlg;
        return rndAlg;
    }

    function getRandomDir() {
        let rndDir = algDirs[randomInteger(0, algDirs.length)];
        return rndDir;
    }

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //#endregion RANDOM ALGORITHM
});