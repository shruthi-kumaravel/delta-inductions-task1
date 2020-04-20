let display_mins = document.querySelector('#mins');
let display_secs = document.querySelector('#secs');
let display_msecs = document.querySelector('#msecs');
let button_start = document.querySelector('#button-start');
let button_stop = document.querySelector('#button-stop');
let button_reset = document.querySelector('#button-reset');
let start_div = document.querySelector('#start');
let running_div = document.querySelector('#running');

let modal = document.querySelector(".modal");
let button_help = document.querySelector('#button-help');
let button_leaderboard = document.querySelector('#btn-star');
let button_clearcache = document.querySelector('#btn-clear')
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".btn-close");

let grid = document.querySelector("#grid");

let highscore_list = document.querySelector('.hall-of-fame');
button_start.onclick = () => startGame();
button_stop.onclick = () => stopGame(true);
button_reset.onclick = () => resetGame();
button_clearcache.onclick = () => clearLocalStorage();

function closeModal() {
    if (modal.classList.contains("show-modal"))
        modal.classList.remove("show-modal")

}

function toggleModal(pos) {
    displayHighscore();
    modal.classList.add("show-modal");
    if (Number.isInteger(pos) && pos > -1) {
        document.querySelectorAll(`.highscore-entry`)[pos].classList.add('animated', 'flash', 'slow');
    }
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}
function clearLocalStorage(){
    localStorage.clear();
}

button_leaderboard.addEventListener("click", toggleModal);
closeButton.addEventListener("click", closeModal);
window.addEventListener("click", windowOnClick);