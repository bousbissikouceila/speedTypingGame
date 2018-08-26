window.addEventListener('load', init);

// Global variables

// Available Levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 2
};
// change the level
const currentLevel = levels.easy;
let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highScore = document.querySelector('#top-score');

// Initilize all the displays
timeDisplay.innerHTML = time;
scoreDisplay.innerHTML = score;
seconds.innerHTML = currentLevel;
highScore.innerHTML = score;

// Words to play with
const words = ['hat', 'coat', 'const', 'javascript', 'river', 'lucky', 'statue', 'joke', 'developer', 'establishment'];

// Initilize Game
function init() {
    // load word from array
    showWord(words);
    // Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // Call countdown every second
    setInterval(countDown, 1000);
    // Check game staus
    setInterval(checkStatus, 50);
}
// Start Match
function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }

}

// Match currentWord to wordInput
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!';
        return true;
    } else {
        if (wordInput.value.length === currentWord.innerHTML.length) {
            message.innerHTML = 'inCorrect!!!';
        } else {
            message.innerHTML = '';
        }
        return false;
    }
}

// Pick & Show random word
function showWord(words) {
    // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countDown() {
    // Make sure time isn't run out
    if (time > 0) {
        // decrement
        time--;
    } else
    if (time === 0) {
        // Game is over
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!!! try again';
        if (highScore.innerHTML < score) {
            highScore.innerHTML = score;
        }
        score = -1;
    }
}