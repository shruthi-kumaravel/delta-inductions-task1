let timex;
let mins, secs, msecs;

function startTimer() {
    stopTimer();
    timex = setInterval(tick, 1);
}

function stopTimer() {
    mins = 0, secs = 0, msecs = 0;
    clearInterval(timex);
}

function tick() {
    msecs++;

    if (msecs > 999) {

        msecs = 0;
        secs++;

        if (secs > 59) {
            secs = 0;
            mins++;
        }
    }
    
    display_mins.textContent = String(mins).padStart(2, "0");
    display_secs.textContent = String(secs).padStart(2, "0");
    display_msecs.textContent = String(msecs).padStart(3, "0");

}