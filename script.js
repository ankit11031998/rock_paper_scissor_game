const choices = document.querySelectorAll(".choice");
const resultText = document.getElementById("result");
const userSpan = document.getElementById("userChoice");
const compSpan = document.getElementById("computerChoice");
const userScoreDisplay = document.getElementById("userScore");
const compScoreDisplay = document.getElementById("compScore");
const roundDisplay = document.getElementById("round");
const resetBtn = document.getElementById("resetBtn");
const progress = document.getElementById("progress");

let userScore = 0;
let compScore = 0;
let round = 1;

function animate(button, className) {
    button.classList.add(className);
    setTimeout(() => button.classList.remove(className), 600);
}

function endGame() {
    choices.forEach(btn => btn.disabled = true);
    resetBtn.style.display = "inline-block";

    if (userScore > compScore) {
        resultText.textContent = "🎉 Final Result: You Won the Game!";
        resultText.className = "win";
    } else if (compScore > userScore) {
        resultText.textContent = "🤖 Final Result: Computer Won the Game!";
        resultText.className = "lose";
    } else {
        resultText.textContent = "😐 Final Result: It's a Tie!";
        resultText.className = "tie";
    }
}

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        if (round > 5) return;

        const userChoice = choice.dataset.choice;
        const computerChoice = ["rock", "paper", "scissor"][Math.floor(Math.random() * 3)];

        userSpan.textContent = userChoice;
        compSpan.textContent = computerChoice;

        const compButton = document.querySelector(`[data-choice="${computerChoice}"]`);

        if (userChoice === computerChoice) {
            resultText.textContent = "It's a Tie 😐";
            resultText.className = "tie";
            animate(choice, "tie-glow");
            animate(compButton, "tie-glow");
        }
        else if (
            (userChoice === "rock" && computerChoice === "scissor") ||
            (userChoice === "paper" && computerChoice === "rock") ||
            (userChoice === "scissor" && computerChoice === "paper")
        ) {
            resultText.textContent = "You Win 🎉";
            resultText.className = "win";
            userScore++;
            animate(choice, "win-glow");
            animate(compButton, "lose-glow");
        } 
        else {
            resultText.textContent = "Computer Wins 🤖";
            resultText.className = "lose";
            compScore++;
            animate(choice, "lose-glow");
            animate(compButton, "win-glow");
        }

        userScoreDisplay.textContent = userScore;
        compScoreDisplay.textContent = compScore;

        progress.style.width = ((round) / 5) * 100 + "%";

        round++;
        roundDisplay.textContent = Math.min(round, 5);

        if (round > 5) endGame();
    });
});

resetBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    round = 1;
    progress.style.width = "0%";
    userScoreDisplay.textContent = 0;
    compScoreDisplay.textContent = 0;
    roundDisplay.textContent = 1;
    userSpan.textContent = "-";
    compSpan.textContent = "-";
    resultText.textContent = "Make your move!";
    resultText.className = "";
    choices.forEach(btn => btn.disabled = false);
    resetBtn.style.display = "none";
});
