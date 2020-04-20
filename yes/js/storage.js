let highscore = [];

function retrieveHighscore() {
    highscore = JSON.parse(localStorage.getItem('highscore')) ?? [];
}

function saveHighscore() {
    localStorage.setItem('highscore', JSON.stringify(highscore));
}

function displayHighscore() {
    highscore_list.innerHTML = '';
    highscore.forEach(score => {
        highscore_list.innerHTML += (`<li class="highscore-entry">${score}</li>`);
    });
}

function addScore(score) {
    highscore.push(score);
    highscore.sort();
    if (highscore.length > 5) highscore.length = 5; // retain only 5
    return highscore.indexOf(score);
}