let choice = "X", currentTurn = "X", turn = "X", computer = "O";
let player1 = 0, draw = 0, player2 = 0, flag = 0, x;
let singlePlayer = false, multiPlayer = true;

let boxes = document.getElementsByClassName("box");
let boxValues = document.querySelectorAll(".boxtext");

function changeTurn(){
    if(currentTurn === "X")
        return "O";
    return "X";
}

function checkViewport(x){
    if (x.matches){
        return true;
    } 
    else{
        return false;
    }
}

function canWin(pos, char){
    let winningSequences = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for(let i=0;i<8;i++){
        if(winningSequences[i][0] === pos && boxValues[winningSequences[i][1]].innerHTML === char && boxValues[winningSequences[i][2]].innerHTML === char){
            return true;
        }
        else if(winningSequences[i][1] === pos && boxValues[winningSequences[i][0]].innerHTML === char && boxValues[winningSequences[i][2]].innerHTML === char){
            return true;
        }
        else if(winningSequences[i][2] === pos && boxValues[winningSequences[i][0]].innerHTML === char && boxValues[winningSequences[i][1]].innerHTML === char){
            return true;
        }
    }
    return false;
}

function checkForWinner(){
    let winningSequences = [[0, 1, 2, 0, 5, 0], [3, 4, 5, 0, 15, 0], [6, 7, 8, 0, 25, 0], [0, 3, 6, -10, 15, 90], [1, 4, 7, 0, 15, 90], [2, 5, 8, 10, 15, 90], [0, 4, 8, 0, 15, 45], [2, 4, 6, 0, 15, 135]];
    for(let i=0;i<8;i++){
        if(boxValues[winningSequences[i][0]].innerHTML !== '' && boxValues[winningSequences[i][0]].innerHTML === boxValues[winningSequences[i][1]].innerHTML && boxValues[winningSequences[i][1]].innerHTML === boxValues[winningSequences[i][2]].innerHTML){
            if(boxValues[winningSequences[i][0]].innerHTML === choice){
                player1++;
                document.querySelector(".win").innerText = player1.toString();
            }
            else{
                player2++;
                document.querySelector(".loss").innerText = player2.toString();
            }
            x = window.matchMedia("(min-width: 900px)");
            let ret = checkViewport(x);
            if(ret === true){
                document.querySelector(".line").style.transform = `translate(${winningSequences[i][3]}vw, ${winningSequences[i][4]}vw) rotate(${winningSequences[i][5]}deg)`;
                document.querySelector(".line").style.display = "block";
            }
            return true;
        }
    }
    return false;
}

function moveLeft(){
    let len = boxValues.length;
    for(let i=0;i<len;i++){
        if(boxValues[i].innerHTML === ''){
            return true;
        }
    }
    return false;
}

function computerMove(){
    let availableBoxes = [];
    let ind = 4, len = boxValues.length;
    for(let i=0;i<len;i++){
        if(boxValues[i].innerHTML === ''){
            availableBoxes.push(i);
        }
    }
    len = availableBoxes.length;
    for(let i=0;i<len;i++){
        if(canWin(availableBoxes[i],computer) === true){
            return availableBoxes[i];
        }
    }
    for(let i=0;i<len;i++){
        if(canWin(availableBoxes[i],choice) === true){
            return availableBoxes[i];
        }
    }
    let corners = [];
    for(let i=0;i<len;i++){
        if(availableBoxes[i] === 0 || availableBoxes[i] === 2 || availableBoxes[i] === 6 || availableBoxes[i] === 8){
            corners.push(availableBoxes[i]);
        }
    }
    len = corners.length-1;
    if(len !== -1){
        ind = Math.floor((Math.random() * len) + 0);
        return corners[ind];
    }
    len = availableBoxes.length;
    let edges = [];
    for(let i=0;i<len;i++){
        if(availableBoxes[i] === 1 || availableBoxes[i] === 3 || availableBoxes[i] === 5 || availableBoxes[i] === 7){
            edges.push(availableBoxes[i]);
        }
    }
    len = edges.length-1;
    if(len !== -1){
        ind = Math.floor((Math.random() * len) + 0);
        return edges[ind];
    }
    return ind;
}

function clearGrid(){
    Array.from(boxValues).forEach(ele => {
        ele.innerText = '';
    })
    document.querySelector(".line").style.display = "none";
    document.querySelector(".gameInfo").innerText = currentTurn + "'s turn";
    document.querySelector(".result").innerText = "---------";
    if(singlePlayer === true){
        if(turn === "X"){
            turn = "O";
        }
        else{
            turn = "X";
        }
    }
    flag = 0;
    if(singlePlayer === true && turn === computer){
        let ind = computerMove();
        boxValues[ind].innerHTML = computer;   
    }
}

function clearGridFlipTurn(){
    Array.from(boxValues).forEach(ele => {
        ele.innerText = '';
    })
    if(turn === "X"){
        currentTurn = "O";
        turn = "O";
    }
    else{
        currentTurn = "X";
        turn = "X";
    }
    document.querySelector(".line").style.display = "none";
    document.querySelector(".gameInfo").innerText = currentTurn + "'s turn";
    document.querySelector(".result").innerText = "---------";
}

function resetGame(char){
    choice = char;
    currentTurn = char;
    turn = char;
    if(char === "X"){
        computer = "O";
    }
    else{
        computer = "X";
    }
    clearGrid();
    document.querySelector(".gameInfo").innerText = currentTurn + "'s turn";
}

function resetScores(){
    player1 = 0;
    draw = 0;
    player2 = 0;
    document.querySelector(".win").innerText = player1.toString();
    document.querySelector(".draw").innerText = draw.toString();
    document.querySelector(".loss").innerText = player2.toString();
    clearGrid();
}

function singlePlayerGame(){
    singlePlayer = true;
    multiPlayer = false;
    document.querySelector(".gameInfo").innerText = choice + "'s turn";
    document.querySelector(".player1").innerHTML = "Player";
    document.querySelector(".player2").innerHTML = "Computer";
    resetGame(choice);
    if(choice === "X"){
        computer = "O";
    }
    else{
        computer = "X";
    }
    resetScores();
}

function multiPlayerGame(){
    singlePlayer = false;
    multiPlayer = true;
    document.querySelector(".player1").innerHTML = "Player1";
    document.querySelector(".player2").innerHTML = "Player2";
    resetGame(choice);
    resetScores();
}

for(let i=0;i<boxes.length;i++){
    let boxValue = boxes[i].querySelector(".boxtext");
    boxes[i].addEventListener("click", () => {
        if(boxValue.innerText === ''){
            boxValue.innerText = currentTurn;
            if(checkForWinner() === true){
                if(multiPlayer === true){
                    document.querySelector(".result").innerText = currentTurn + " won";
                }
                else{
                    flag = 1;
                    document.querySelector(".result").innerText = "You won";
                }
            }
            else if(moveLeft() === false){
                document.querySelector(".result").innerText = "Draw";
                draw++;
                document.querySelector(".draw").innerText = draw.toString();
                if(singlePlayer === true){
                    flag = 1;
                }
            }
            if(singlePlayer === true && flag === 0){
                let ind = computerMove();
                if(boxValues[ind].innerHTML === ''){
                    boxValues[ind].innerHTML = computer;
                }
                if(checkForWinner() === true && flag === 0){
                    document.querySelector(".result").innerText = "Computer won";
                }
                else if(moveLeft() === false && flag === 0){
                    document.querySelector(".result").innerText = "Draw";
                    draw++;
                    document.querySelector(".draw").innerText = draw.toString();
                }
            }
            if(multiPlayer === true){
                currentTurn = changeTurn();
                document.querySelector(".gameInfo").innerText = currentTurn + "'s turn";
            }
        }
        else{
            alert("Wrong move!\nMake a move in empty space.");
        }
    })
}

let playAsX = document.getElementById("x");
playAsX.addEventListener("click", function(){
    resetGame("X");
});

let playAsO = document.getElementById("o");
playAsO.addEventListener("click", function(){
    resetGame("O");
});

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetScores);

let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function(){
    if(singlePlayer === true){
        clearGrid();
    }
    else{
        clearGridFlipTurn();
    }
});

let singlePlayerButton = document.getElementById("single");
singlePlayerButton.addEventListener("click", singlePlayerGame);

let multiPlayerButton = document.getElementById("multi");
multiPlayerButton.addEventListener("click", multiPlayerGame);