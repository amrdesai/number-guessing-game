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
let winningNumber = Math.trunc(Math.random() * 20 + 1);
// Game score
let score = 20;

// Function: Reduce score if wrong answer
const updateScore = (guess) => {
    if (guess !== winningNumber) {
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
    // If user guessed the correct answer; Game Over!
    if (guess === winningNumber) {
        // add winner class to body, display winning number & disable button
        checkBtn.disabled = true;
        checkBtn.classList.add('game-over');
        document.body.classList.add('winner');
        numberEl.textContent = winningNumber;
        messageEl.textContent = '🎉 You guessed the correct number!';
        isHighScore();
        return;
    }

    // If score > 0 then
    if (score === 1) {
        // add loser class to body, display winning number and disable button
        updateScore(guess);
        checkBtn.disabled = true;
        checkBtn.classList.add('game-over');
        document.body.classList.add('loser');
        numberEl.textContent = winningNumber;
        messageEl.textContent = '💥 You lost the game!';
    } else {
        guess > winningNumber
            ? (messageEl.textContent = 'Your guess is too high ⬆')
            : (messageEl.textContent = 'Your guess is too low ⬇');
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
    } else {
        isGameOver(guess);
    }
});

// Event Listener: Play Again
playAgainBtn.addEventListener('click', () => {
    // Reset random number
    winningNumber = Math.trunc(Math.random() * 20 + 1);
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
    // Change score to 20
    score = 20;
    scoreEl.innerText = score;
    // Clear Message
    messageEl.innerText = 'Start guessing...';
});
