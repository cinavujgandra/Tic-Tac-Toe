let square = document.querySelectorAll('.square');
let playerResult = document.querySelector('.playerResult');
let computerResult = document.querySelector('.computerResult');
let drawResult = document.querySelector('.drawResult');
const combinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [7, 5, 3], [1, 5, 9]];
let player = []
let computer = []
let playerResultCounter = 0
let computerResultCounter = 0
let drawResultCounter = 0
let checkEqual = false;


const clearTable = () => {
    player = [];
    computer = [];
    arrComb = [];
    for (let i = 0; i < square.length; i++) {
        square[i].onclick = () => { return true }
        square[i].dataset.bool = "true"
        square[i].innerHTML = ""
        square[i].classList.remove("bg-success");
        square[i].classList.remove("bg-danger");
        start()
    }
}

const desibleSquare = () => {
    for (let i = 0; i < square.length; i++) {
        square[i].onclick = () => { return false }
    }
}

const start = () => {
    for (let i = 0; i < square.length; i++) {

        square[i].onclick = () => {

            let arrComb = []

            square[i].innerHTML = "X"

            // clicked square
            if (square[i].dataset.bool == "true") {
                square[i].dataset.bool = "false"
                square[i].onclick = () => { return false }
            }

            // get all unmarked squares
            for (let iter = 0; iter < square.length; iter++) {
                if (square[iter].dataset.bool == 'true') {
                    arrComb = [...arrComb, iter]
                }
            }


            if (arrComb.length == 0) {
                checkEqual = true
                arrComb = [parseInt(square[i].dataset.value) - 1]


            } else {
                function getRandomItem(arr) {

                    // get random index value
                    const randomIndex = Math.floor(Math.random() * arr.length);

                    // get random item
                    const item = arr[randomIndex];

                    return item;
                }

                // computer combinations
                const result = getRandomItem(arrComb);
                square[result].innerHTML = "O"
                square[result].dataset.bool = "false"
                square[result].onclick = () => { return false }
                const index = arrComb.indexOf(result);
                arrComb.splice(index, 1);
                computer = [...computer, result + 1]
                arrComb = [...arrComb]
            }

            // player combinations
            let dataValue = parseInt(square[i].dataset.value)
            player = [...player, dataValue]


            let playerElements
            let computerElements
            // winning combination

            for (let a = 0; a < combinations.length; a++) {
                playerElements = combinations[a].every(elem => player.includes(elem));
                computerElements = combinations[a].every(elem => computer.includes(elem));

                // player win
                if (playerElements == true || playerElements == true && checkEqual == true) {
                    desibleSquare()
                    checkEqual = false
                    playerResultCounter++
                    playerResult.innerHTML = playerResultCounter

                    for (let win = 0; win < combinations[a].length; win++) {
                        square[combinations[a][win] - 1].classList.add("bg-success");

                    }
                    setTimeout(function () {
                        clearTable()
                    }, 1000);
                    break;
                }

                // computer win
                if (computerElements == true) {
                    desibleSquare()
                    computerResultCounter++
                    computerResult.innerHTML = computerResultCounter
                    for (let win = 0; win < combinations[a].length; win++) {
                        square[combinations[a][win] - 1].classList.add("bg-danger");

                    }
                    setTimeout(function () {
                        clearTable()
                    }, 1000);

                    break;
                }
            }

            // draw
            if (checkEqual == true && playerElements == false) {
                drawResultCounter++
                drawResult.innerHTML = drawResultCounter;
                checkEqual = false
                setTimeout(function () {
                    clearTable()
                }, 1000);

            }


        };

    }
}


start()

