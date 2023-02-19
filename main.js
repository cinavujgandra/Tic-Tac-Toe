let square = document.querySelectorAll('.square');
const combinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [7, 5, 3], [1, 5, 9]];
let player = []
let computer = []



for (let i = 0; i < square.length; i++) {
    square[i].onclick = () => {

        square[i].innerHTML = "O"

        if (square[i].dataset.bool == "true") {
            square[i].dataset.bool = "false"
            square[i].onclick = () => { return false }
        }

        let arrComb = []


        for (let iter = 0; iter < square.length; iter++) {
            if (square[iter].dataset.bool == 'true') {
                arrComb = [...arrComb, iter]
                
            }

        }


        function getRandomItem(arr) {

            // get random index value
            const randomIndex = Math.floor(Math.random() * arr.length);

            // get random item
            const item = arr[randomIndex];

            return item;
        }


        const result = getRandomItem(arrComb);
        square[result].innerHTML = "X"
        square[result].dataset.bool = "false"
        square[result].onclick = () => { return false }

        const index = arrComb.indexOf(result);

        const x = arrComb.splice(index, 1);
        arrComb = [...arrComb]

        console.log(arrComb);



        // win combinations
        let dataValue = parseInt(square[i].dataset.value)
        player = [...player, dataValue]

        for (let a = 0; a < combinations.length; a++) {
            let hasAllElems = combinations[a].every(elem => player.includes(elem));
            if (hasAllElems == true) {
                // console.log('Winner')
                // console.log(combinations[a]);

                break;
            }

        }

    };

}

