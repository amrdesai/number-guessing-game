// Strict mode
'use strict';

// variables
const messageEl = document.querySelector('.message');
const numberEl = document.querySelector('.number');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.highScore');
const checkBtn = document.querySelector('.check');

// Generate random number
const randomNumber = Math.trunc(Math.random() * 20 + 1);
numberEl.textContent = randomNumber;

// Score
let score = 20;

// Function: Reduce score if wrong answer
const updateScore = (guess) => {
    if (guess !== randomNumber) {
        score -= 1;
        scoreEl.innerText = score;
    }
};

// Function: Check if game over
const isGameOver = (guess) => {
    // If score = 0 then game over
    if (score === 0) {
        checkBtn.disabled = true;
        checkBtn.classList.add('game-over');
        messageEl.textContent = '💥 You lost the game!';
    }
    // If user guessed the correct answer; Game Over!
    else if (guess === randomNumber) {
        checkBtn.disabled = true;
        checkBtn.classList.add('game-over');
        messageEl.textContent = '🎉 You guessed the correct number!';
    } else {
        // run if wrong guess
        updateScore(guess);
    }
};

// Event Listener: Check Btn Event
checkBtn.addEventListener('click', () => {
    // Guessed Number
    const guess = Number(document.querySelector('.guess').value);

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
