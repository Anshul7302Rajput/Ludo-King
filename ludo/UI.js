import { COORDINATES_MAP, PLAYERS, STEP_LENGTH } from './constants.js';

const diceButtonElement = document.querySelector('#dice-btn');
const playerPiecesElements = {
    P1: document.querySelectorAll('[player-id="P1"].player-piece'),
    P2: document.querySelectorAll('[player-id="P2"].player-piece'),
    P3: document.querySelectorAll('[player-id="P3"].player-piece'),
    P4: document.querySelectorAll('[player-id="P4"].player-piece')
}

// Import or define necessary game logic here

// Get the audio elements
const diceRollSound = document.getElementById('dice-roll-sound');
const pieceMoveSound = document.getElementById('piece-move-sound');
const victorySound = document.getElementById('victory-sound');

// Function to play dice roll sound
function playDiceRollSound() {
    diceRollSound.play();
}

// Function to play piece move sound
function playPieceMoveSound() {
    pieceMoveSound.play();
}

// Function to play victory sound
function playVictorySound() {
    victorySound.play();
}

// Event listener for dice roll
document.getElementById('dice-btn').addEventListener('click', () => {
    playDiceRollSound();
    // Call your dice roll logic here
    rollDice();
});

// Event listeners for piece moves
document.querySelectorAll('.player-piece').forEach(piece => {
    piece.addEventListener('click', () => {
        playPieceMoveSound();
        // Call your piece move logic here
        movePiece(piece);
    });
});

// Example function to handle game victory
function onPlayerWin() {
    playVictorySound();
    // Additional victory logic here
}

// Example functions (to be replaced with actual game logic)
function rollDice() {
    // Dice rolling logic
    console.log('Dice rolled!');
}

function movePiece(piece) {
    // Piece moving logic
    console.log(`Piece moved: ${piece.getAttribute('piece')}`);
}

// Example check for victory (call this function appropriately in your game)
function checkVictory() {
    // Victory check logic
    const victory = true; // Replace with actual check
    if (victory) {
        onPlayerWin();
    }
}
// upaar paart for sound

export class UI {
    static listenDiceClick(callback) {
        diceButtonElement.addEventListener('click', callback);
    }

    static listenResetClick(callback) {
        document.querySelector('button#reset-btn').addEventListener('click', callback)
    }

    static listenPieceClick(callback) {
        document.querySelector('.player-pieces').addEventListener('click', callback)
    }

    /**
     * 
     * @param {string} player 
     * @param {Number} piece 
     * @param {Number} newPosition 
     */
    static setPiecePosition(player, piece, newPosition) {
        if (!playerPiecesElements[player] || !playerPiecesElements[player][piece]) {
            console.error(`Player element of given player: ${player} and piece: ${piece} not found`)
            return;
        }

        const [x, y] = COORDINATES_MAP[newPosition];

        const pieceElement = playerPiecesElements[player][piece];
        pieceElement.style.top = y * STEP_LENGTH + '%';
        pieceElement.style.left = x * STEP_LENGTH + '%';
    }

    static setTurn(index) {
        if (index < 0 || index >= PLAYERS.length) {
            console.error('index out of bound!');
            return;
        }

        const player = PLAYERS[index];

        // Display player ID
        document.querySelector('.active-player span').innerText = player;

        const activePlayerBase = document.querySelector('.player-base.highlight');
        if (activePlayerBase) {
            activePlayerBase.classList.remove('highlight');
        }
        // highlight
        document.querySelector(`[player-id="${player}"].player-base`).classList.add('highlight')
    }

    static enableDice() {
        diceButtonElement.removeAttribute('disabled');
    }

    static disableDice() {
        diceButtonElement.setAttribute('disabled', '');
    }

    /**
     * 
     * @param {string} player 
     * @param {Number[]} pieces 
     */
    static highlightPieces(player, pieces) {
        pieces.forEach(piece => {
            const pieceElement = playerPiecesElements[player][piece];
            pieceElement.classList.add('highlight');
        })
    }

    static unhighlightPieces() {
        document.querySelectorAll('.player-piece.highlight').forEach(ele => {
            ele.classList.remove('highlight');
        })
    }

    static setDiceValue(value) {
        document.querySelector('.dice-value').innerText = value;
    }
}
