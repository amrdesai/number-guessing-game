// Strict mode
'use strict';

// variables
const messageEl = document.querySelector('.message');
const numberEl = document.querySelector('.number');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.highscore');
const checkBtn = document.querySelector('.check');
const playAgainBtn = document.querySelector('.again');
const guessInput = document.querySelector('.guess');

// Generate random number
let randomNumber = Math.trunc(Math.random() * 20 + 1);
// Game score
let score = 20;

// Function: Reduce score if wrong answer
const updateScore = (guess) => {
    if (guess !== randomNumber) {
        score -= 1;
        scoreEl.innerText = score;
    }
};

// Function: Check if your score is high score
const isHighScore = () => {
    if (score > highScoreEl.innerText) {
        highScoreEl.textContent = score;
    }
};

// Function: Check if game over
const isGameOver = (guess) => {
    // If score = 0 then game over
    if (score === 0) {
        // add loser class to body, display winning number and disable button
        checkBtn.disabled = true;
        checkBtn.classList.add('game-over');
        document.body.classList.add('loser');
        numberEl.textContent = randomNumber;
        messageEl.textContent = '💥 You lost the game!';
    }
    // If user guessed the correct answer; Game Over!
    else if (guess === randomNumber) {
        // add winner class to body, display winning number & disable button
        checkBtn.disabled = true;
        checkBtn.classList.add('game-over');
        document.body.classList.add('winner');
        numberEl.textContent = randomNumber;
        messageEl.textContent = '🎉 You guessed the correct number!';
        isHighScore();
    } else {
        // run if wrong guess
        updateScore(guess);
    }
};

// Event Listener: Check Btn Event
checkBtn.addEventListener('click', () => {
    // User's guess
    const guess = Number(guessInput.value);

    // Chek if number is valid, high, low and correct answer
    if (!guess || guess > 20 || guess < 1) {
        messageEl.textContent = '⛔ Invalid Number!';
    } else if (guess === randomNumber) {
        isGameOver(guess);
    } else if (guess > randomNumber) {
        messageEl.textContent = 'Your guess is too high ⬆';
        isGameOver(guess);
    } else if (guess < randomNumber) {
        messageEl.textContent = 'Your guess is too low ⬇';
        isGameOver(guess);
    }
});

// Event Listener: Play Again
playAgainBtn.addEventListener('click', () => {
    // Reset random number
    randomNumber = Math.trunc(Math.random() * 20 + 1);

    // Change backround
    document.body.classList.remove('loser');
    document.body.classList.remove('winner');

    // Enable buttons
    checkBtn.disabled = false;
    checkBtn.classList.remove('game-over');

    // Clear input
    guessInput.value = '';

    // Hide Winning number
    numberEl.innerText = '?';

    // Change Score to 20
    score = 20;
    scoreEl.innerText = score;

    // Clear Message
    messageEl.innerText = 'Start guessing...';
});
