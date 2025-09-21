let gameState = {
    playerScore: 0,
    computerScore: 0,
    totalGames: 0,
    wins: 0,
    currentStreak: 0,
    bestStreak: 0,
    theme: 'default'
};

// Choice icons mapping
const choiceIcons = {
    rock: 'fas fa-hand-rock',
    paper: 'fas fa-hand-paper',
    scissors: 'fas fa-hand-scissors'
};

// Initialize game
function initGame() {
    updateDisplay();
    loadTheme();
}

// Theme management
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    gameState.theme = theme;

    // Update active theme button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

function loadTheme() {
    setTheme(gameState.theme);
}

// Game logic
function playGame(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    // Update choice displays
    updateChoiceDisplay('playerChoice', playerChoice);
    updateChoiceDisplay('computerChoice', computerChoice);

    // Determine winner
    const result = determineWinner(playerChoice, computerChoice);

    // Update game state
    gameState.totalGames++;

    if (result === 'win') {
        gameState.playerScore++;
        gameState.wins++;
        gameState.currentStreak++;
        if (gameState.currentStreak > gameState.bestStreak) {
            gameState.bestStreak = gameState.currentStreak;
        }
        showResult('You Win!', 'win');
        highlightWinner('playerChoice');
    } else if (result === 'lose') {
        gameState.computerScore++;
        gameState.currentStreak = 0;
        showResult('Computer Wins!', 'lose');
        highlightWinner('computerChoice');
    } else {
        showResult("It's a Tie!", 'tie');
    }

    updateDisplay();
}

function determineWinner(player, computer) {
    if (player === computer) return 'tie';

    const winConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    return winConditions[player] === computer ? 'win' : 'lose';
}

function updateChoiceDisplay(elementId, choice) {
    const element = document.getElementById(elementId);
    const icon = element.querySelector('i');
    icon.className = choiceIcons[choice];
}

function showResult(message, type) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = message;
    resultElement.className = `result ${type}`;
}

function highlightWinner(winnerId) {
    // Remove previous winner highlights
    document.querySelectorAll('.choice-icon').forEach(icon => {
        icon.classList.remove('winner');
    });

    // Add winner highlight
    setTimeout(() => {
        document.getElementById(winnerId).classList.add('winner');
    }, 100);
}

function updateDisplay() {
    document.getElementById('playerScore').textContent = gameState.playerScore;
    document.getElementById('computerScore').textContent = gameState.computerScore;
    document.getElementById('totalGames').textContent = gameState.totalGames;
    document.getElementById('wins').textContent = gameState.wins;

    const winRate = gameState.totalGames > 0
        ? Math.round((gameState.wins / gameState.totalGames) * 100)
        : 0;
    document.getElementById('winRate').textContent = `${winRate}%`;

    document.getElementById('streak').textContent = gameState.currentStreak;
}

function resetGame() {
    gameState = {
        ...gameState,
        playerScore: 0,
        computerScore: 0,
        totalGames: 0,
        wins: 0,
        currentStreak: 0,
        bestStreak: 0
    };

    // Reset display
    document.getElementById('playerChoice').innerHTML = '<i class="fas fa-question"></i>';
    document.getElementById('computerChoice').innerHTML = '<i class="fas fa-question"></i>';
    document.getElementById('result').textContent = 'Choose your weapon!';
    document.getElementById('result').className = 'result';

    // Remove winner highlights
    document.querySelectorAll('.choice-icon').forEach(icon => {
        icon.classList.remove('winner');
    });

    updateDisplay();
}

// Event listeners
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.dataset.theme));
});

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);