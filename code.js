class SimonGame {
    constructor() {
        this.inGame = false;
        this.listening = false
        this.sequence = [];
        this.currentInput = [];
        this.currentInputIndex = 0;

        //constants
        this.time2Display = 500;
    }

    startNewGame() {
        this.inGame = true;
        this.expandSequence();
    }

    expandSequence() {
        console.log("nuevo nivel");
        let newPosition = Math.floor(Math.random() * 4) + 1
        this.sequence.push(newPosition);
        this.reproduceSequence();
    }

    reproduceSequence() {
        this.sequence.forEach((buttonNumber, index) => {
            setTimeout(() => {
                this.turnOnButton(buttonNumber, index + 1);
            }, (this.time2Display * index + 1) * 2);
        })
    }

    checkInput(BN) {
        this.currentInput.push(BN);

        if (this.sequence[this.currentInputIndex] == this.sequence[this.currentInputIndex]) {
            //animate the buton and increase the index
            this.turnOnButton(BN);
            this.currentInputIndex++;
            console.log(this.currentInputIndex,this.sequence.length);

            if (this.sequence.length == this.currentInputIndex) {
                console.log("nivel completado XD");
                this.currentInputIndex = 0;
                this.listening = false;
                setTimeout(() => {
                    //add some feedback that the player have do it correctly
                    this.expandSequence();
                }, 3000);
            }
        } else {
            //GameOver
            console.log("GameOverrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
        }
    }

    turnOnButton(bn, position) {
        let button = document.querySelector(`.button_${bn}`);
        button.classList.add(`button_${bn}__active`);
        setTimeout(() => {
            this.turnOffButton(bn, button);
            if (position != null || position != undefined)
                if (position == this.sequence.length)
                    this.listening = true;
        }, this.time2Display);
    }

    turnOffButton(bn, buttonElement) {
        buttonElement.classList.remove(`button_${bn}__active`);
    }
}

function startGame() {
    const match = new SimonGame();
    match.startNewGame();

    document.addEventListener("keydown", (event) => {
        let key = event.key;
        if (match.listening) {
            switch (key) {
                case "e":
                    match.checkInput(1);
                    console.log("pulsate e")
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

}