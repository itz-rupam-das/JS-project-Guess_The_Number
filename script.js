const CONFIG = {
  MIN: 1,
  MAX: 100,
  MAX_GUESSES: 10,
};

const ui = {
  input: document.getElementById("guess-input"),
  button: document.getElementById("guess-btn"),
  output: document.querySelector(".output"),
  guessesLeft: document.getElementById("guesses-left"),
  previous: document.getElementById("previous-guesses"),
  newGameBtn: document.getElementById("new-game-btn"),
};

const game = {
  secret: null,
  guesses: [],
  active: true,

  init() {
    this.secret = this.randomNumber();
    this.guesses = [];
    this.active = true;
    this.render();
  },

  randomNumber() {
    return Math.floor(Math.random() * CONFIG.MAX) + CONFIG.MIN;
  },

  submitGuess(value) {
    if (!this.active) return;

    if (isNaN(value) || value < CONFIG.MIN || value > CONFIG.MAX) {
      return this.message("Enter a valid number", "lose");
    }

    if (this.guesses.includes(value)) {
      return this.message("Already guessed that", "lose");
    }

    this.guesses.push(value);

    if (value === this.secret) {
      this.end(true);
    } else if (this.guesses.length >= CONFIG.MAX_GUESSES) {
      this.end(false);
    } else {
      this.message(
        value < this.secret ? "Too low!" : "Too high!",
        "lose"
      );
    }

    this.render();
  },

  end(win) {
    this.active = false;
    this.message(
      win ? "You guessed it!" : `Game Over. Number was ${this.secret}`,
      win ? "win" : "lose"
    );
    ui.newGameBtn.classList.remove("hidden");
    ui.button.classList.add("hidden");
    ui.input.disabled = true;
  },

  message(text, type) {
    ui.output.textContent = text;
    ui.output.className = `output ${type}`;
  },

  render() {
    ui.guessesLeft.textContent =
      CONFIG.MAX_GUESSES - this.guesses.length;
    ui.previous.textContent =
      this.guesses.length ? this.guesses.join(", ") : "None";
    ui.input.value = "";
    ui.input.focus();
  },
};

// Events
ui.button.addEventListener("click", () => {
  game.submitGuess(Number(ui.input.value));
});

ui.input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") ui.button.click();
});

ui.newGameBtn.addEventListener("click", () => {
  ui.newGameBtn.classList.add("hidden");
  ui.button.classList.remove("hidden");
  ui.input.disabled = false;
  ui.output.className = "output";
  ui.output.textContent = "Ready to play?";
  game.init();
});

// Start game
game.init();
