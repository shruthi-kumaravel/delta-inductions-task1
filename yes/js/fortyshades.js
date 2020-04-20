let rows, cols, layers;
rows = 4;
cols = 5;
layers = 2;
let sorted, number, clicked;
let next;
let started = false;
let squares;
let sound_wrong, sound_correct, sound_end;

function populateNumbers() {
    numbers = [];
    for (var l = 1; l <= layers; l++) {
        for (var i = 0; i < rows * cols; i++) {
            do {
                random = getRandomInt(1, l * rows * cols);
            } while (numbers.includes(random));
            numbers.push(random);
        }
    }
    sorted = numbers.concat().sort();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawSquares() {
    squares = [];
    clicked = []
    for (let y = 0; y < rows; y++) {
        var tr = document.createElement('tr');
        for (let x = 0; x < cols; x++) {
            clicked
            var td = document.createElement('td');
            td.className = "square"
            td.textContent = "";
            tr.appendChild(td);
            squares.push(td);
            clicked.push(0);
        }
        grid.append(tr);
    }
}

function labelSquare(square, val) {
    square.textContent = val;
    square.className = "square";
    square.style.opacity = val == "" ? 1 : (val + 50) / (rows * cols * layers + 50);
    if (val == "") {
        square.classList.add('selected')
    }
}

function labelSquares(empty) {
    var pos = 0;
    squares.forEach(square => {
        labelSquare(square, empty ? "" : numbers[pos]);
        square.classList.remove('selected')

        pos++;
    });
}

function addSquareListener() {
    squares.forEach(square => {
        square.onclick = () => {
            if (square.textContent == String(Math.min.apply(null, ([...document.querySelectorAll(`.square`)].filter(sq => sq.textContent != "").map(sq => parseInt(sq.textContent)))))) {
                clicked[squares.indexOf(square)]++;

                sound_correct.play().catch(() => { });
                if (clicked[squares.indexOf(square)] >= layers) {
                    labelSquare(square, "")
                } else {
                    labelSquare(square, numbers[next++ + rows * cols])
                }
                if (clicked.reduce((a, b) => a + b, 0) >= numbers.length) {
                    stopGame();
                }
            }
            
        }
    });
}

function startGame() {
    if (started)
        return;

    started = true;
    
    populateNumbers();
    labelSquares();
    addSquareListener();
    next = 0; // position in numbers;
    start_div.style.display = "none";
    running_div.style.display = "block";
    startTimer();
}

function stopGame(forced) {
    stopTimer();
    sound_end.play().catch(() => { });
    var score = display_mins.textContent + ":" + display_secs.textContent + ":" + display_msecs.textContent;
    button_stop.style.display = "none";
    button_reset.style.display = "block";
    if (!forced) {
        score_pos = addScore(score);
        saveHighscore();
        toggleModal(score_pos);
    }
    labelSquares(true);
}

function resetGame() {
    button_stop.style.display = "block";
    button_reset.style.display = "none";
    start_div.style.display = "block";
    running_div.style.display = "none";

    retrieveHighscore();
    stopTimer();
    display_mins.textContent = "".padStart(2, "0");
    display_secs.textContent = "".padStart(2, "0");
    display_msecs.textContent = "".padStart(3, "0");
    started = false;
    labelSquares(true);
}

document.addEventListener("DOMContentLoaded", function (event) {
    sound_wrong = new Audio('assets/wrong_answer.ogg');
    sound_correct = new Audio('assets/correct_answer.ogg');
    sound_end = new Audio('assets/end_game.ogg');
    drawSquares();
    retrieveHighscore();
});