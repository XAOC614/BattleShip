let viev = {
    displayMessage : function (msg){
        let messageArea = document.getElementById("messageArea")
        messageArea.innerHTML = msg
    },

displayHit : function (location){
    let cell = document.getElementById(location);
    cell.setAttribute("class", "hit")
},
displayMiss : function (location){
    let cell = document.getElementById(location);
    cell.setAttribute("class", "miss")
}
}
let model =  {
    boardSize : 7,
    numShips : 3,
    shipLength :3,
    shipSunk :0,


    ships :[{locations : ["06","16","26"], hits : ["", "", ""]} ,
            {locations : ["24","34","44"], hits : ["", "", ""]} ,
            {locations : ["10","11","12"], hits : ["", "", ""]}],


    fire : function(guess){

        for (let i=0; i<this.numShips; i++){
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index>=0) {
                ship.hits[index] = "hit"
                viev.displayHit(guess);
                viev.displayMessage("HIT!")
                if (this.isSunk(ship)){
                    viev.displayMessage("You sank my battleship!")
                    this.shipSunk++
                }
                return true;
            }
            
        }
        viev.displayMiss(guess);
        viev.displayMessage("You missed.")
        return false;
    },
    isSunk : function(ship){
        for (let i=0; i<this.shipLength;i++){
            if(ship.hits[i] !== "hit"){
                return false;
            }
        }
        return true;
    }
}

let controller = {
    guesses : 0,

    processGuess : function(guess){
        let location = parseGuess(guess);
        if(location){
            this.guesses++;
            let hit = model.fire(location);
            if( hit && model.shipSunk === model.numShips){
                viev.displayMessage("You sank all my battleships, in " + this.guesses + "guesses");
            }
        }  

    }
}
function parseGuess(guess){
let alphabet = ['A ', 'B', 'C', 'D', 'E', 'F', 'G'];

    if(guess === null || guess.length !==2){
        alert ("Ты ввел неверное значение");
    }else {
        let firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);

        if(isNaN(row) || isNaN(column)){
            alert ("Это не верное число");
        }else if (row<0 || row>model.boardSize || column<0 || column>model.boardSize){
            alert("Oops, that`s off the board!");
        }else {
            return row + column;
        }
    }
    return null;
}
function init() {
    let fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
}
function handleFireButton(){
    //
}
window.onload = init;