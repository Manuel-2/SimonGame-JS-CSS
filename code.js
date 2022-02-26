const notes = [
    new Audio("./Sounds/Plop1.mp3"),
    new Audio("./Sounds/Plop2.mp3"),
    new Audio("./Sounds/Plop3.mp3"),
    new Audio("./Sounds/Plop4.mp3")
];

class SimonGame {
    constructor() {
        this.inGame = false;
        this.listening = false
        this.sequence = [];
        this.currentLevel = 0;
        this.currentInput = [];
        this.currentInputIndex = 0;
        this.time2Display = 300;
    }

    startNewGame() {
        if (this.inGame) {
            this.resetMatch();
        }

        this.currentLevel = 0;
        this.updateScore();

        this.inGame = true;
        this.expandSequence();

        document.addEventListener("keydown", (event) => {
            let key = event.key;
            if (match.listening && match.inGame) {
                switch (key) {
                    case "e":
                        match.checkInput(1);
                        break;
                    case "i":
                        match.checkInput(2);
                        break;
                    case "f":
                        match.checkInput(3);
                        break;
                    case "j":
                        match.checkInput(4);
                        break;
                }
            }
        });

        const keys = document.querySelectorAll(".game_input");
        keys.forEach(key => key.addEventListener("transitionend", this.turnOfButton));
    }

    resetMatch() {
        this.inGame = false;
        this.listening = false
        this.sequence = [];
        this.currentInput = [];
        this.currentInputIndex = 0;
    }

    expandSequence() {
        console.log("nuevo nivel");
        let newPosition = Math.floor(Math.random() * 4) + 1
        this.sequence.push(newPosition);
        this.reproduceSequence();
    }

    reproduceSequence() {
        //TODO: add feedback
        const title = document.querySelector(".title");
        title.innerText = "playing sequence";
        this.sequence.forEach((buttonNumber, index) => {
            setTimeout(() => {
                this.turnOnButton(buttonNumber, index + 1);
            }, (this.time2Display * index + 1) * 2);
        })
    }

    checkInput(BN) {
        let startButton = document.querySelector("#start_game_input");
        startButton.blur();

        if (!this.listening)
            return;

        this.currentInput.push(BN);
        this.turnOnButton(BN);

        console.log("secuencia:" + this.sequence);
        console.log("inputs: " + this.currentInput);
        if (this.sequence[this.currentInputIndex] == this.currentInput[this.currentInputIndex]) {
            this.currentInputIndex++;

            if (this.sequence.length == this.currentInputIndex) {
                const title = document.querySelector(".title");
                title.innerText = "Level Complete!";
                this.currentLevel++;
                this.updateScore();
                this.currentInput = [];
                this.currentInputIndex = 0;
                this.listening = false;
                setTimeout(() => {
                    this.expandSequence();
                }, 1000);
            }
        } else {
            this.GameOver();
        }
    }

    GameOver() {
        console.log("GameOver");
        const title = document.querySelector(".title");
        title.innerText = "GameOver :(";
        this.resetMatch();
    }

    turnOnButton(bn, position) {
        notes[bn - 1].currentTime = 0;
        notes[bn - 1].play();

        let button = document.querySelector(`.button_${bn}`);
        button.classList.add(`button_${bn}__active`);

        setTimeout(() => {
            if (position != null || position != undefined)
                if (position == this.sequence.length) {
                    this.listening = true;
                    const title = document.querySelector(".title");
                    title.innerText = "Listening...";
                }
        }, this.time2Display);
    }

    turnOfButton() {
        let number = this.getAttribute("data-number");
        this.classList.remove(`button_${number}__active`);
    }

    updateScore() {
        let levelDisplay = document.querySelector(".level");
        levelDisplay.innerText = this.currentLevel;
    }
}

const match = new SimonGame();

function startGame() {
    match.startNewGame();
}