// --- Game State Variables ---
let randomNumber = Math.floor(Math.random() * 100) + 1;
let previousGuesses = [];
let numGuesses = 0;
let isActive = true;

// --- UI Element Selectors ---
const userInput = document.querySelector("#input");
const guessBtn = document.querySelector("#guess-btn");
const output = document.querySelector(".output");
const guessNumDisplay = document.querySelector(".guess-num");
const guessCountDisplay = document.querySelector(".guess-count");
const newGameBtn = document.querySelector("#new-game-btn");

// --- Event Listeners ---
guessBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isActive) return;

    const guess = parseInt(userInput.value);
    validateGuess(guess);
});

// Allow "Enter" key to submit
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        guessBtn.click();
    }
});

newGameBtn.addEventListener("click", resetGame);

// --- Core Logic Functions ---
function validateGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
        displayMessage("❌ Enter a number between 1 and 100");
    } else if (previousGuesses.includes(guess)) {
        displayMessage("⚠️ You already guessed that!");
    } else {
        previousGuesses.push(guess);
        numGuesses++;
        updateUI(guess);
        checkGuess(guess);
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage("🎉 Correct! You're a genius.");
        endGame(true);
    } else if (numGuesses === 10) {
        displayMessage(`💀 Game Over. It was ${randomNumber}`);
        endGame(false);
    } else {
        displayMessage(guess < randomNumber ? "Too Low! Try higher." : "Too High! Try lower.");
    }
}

function updateUI(guess) {
    userInput.value = "";
    userInput.focus();
    guessNumDisplay.innerHTML = previousGuesses.join(", ");
    guessCountDisplay.innerHTML = 10 - numGuesses;
}

function displayMessage(message) {
    output.innerHTML = message;
}

function endGame(isWin) {
    isActive = false;
    userInput.disabled = true;
    guessBtn.classList.add("hidden");
    newGameBtn.classList.remove("hidden");
    
    // Change color based on outcome
    output.style.color = isWin ? "#10b981" : "#ef4444";
}

function resetGame() {
    // Reset Variables
    randomNumber = Math.floor(Math.random() * 100) + 1;
    previousGuesses = [];
    numGuesses = 0;
    isActive = true;

    // Reset UI
    displayMessage("Ready to play?");
    output.style.color = ""; // Reset to CSS default
    guessNumDisplay.innerHTML = "None";
    guessCountDisplay.innerHTML = "10";
    userInput.disabled = false;
    userInput.value = "";
    
    // Toggle Buttons
    guessBtn.classList.remove("hidden");
    newGameBtn.classList.add("hidden");
    
    userInput.focus();
}