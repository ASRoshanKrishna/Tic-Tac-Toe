const gameBoard = (function() {
    const arrayBoard = [[" "," "," "],[" "," "," "],[" "," "," "]]
    const displayBoard = function() {
        for(v in arrayBoard){
            console.log(arrayBoard[v]);
        }
    }

    return {displayBoard,arrayBoard};
})();

const displayController = (function() {
    const { arrayBoard } = gameBoard;
    
    const dis = function() {
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                const ij = `${i}${j}`;
                const d = document.getElementById(ij);
                // console.log(ij);
                d.innerHTML = arrayBoard[i][j];
            }
        }
    }

    return {dis};
})();

const dialog = document.querySelector("dialog");
const form = document.querySelector('#fo');
dialog.showModal();

const names1 = document.getElementById("name1");
const names2 = document.getElementById("name2");
const result = document.querySelector(".foot");

let indexBox = 0;
let over = 0;
let firstPlayer = "";
let secondPlayer = "";

const user1 = function(name1) {
    const { arrayBoard } = gameBoard;
    const arr1x = [0, 0, 0];
    const arr1y = [0, 0, 0];
    let diag1 = 0;
    let revDiag1 = 0;
    const createX = function(xPos,yPos) {
        if(arrayBoard[xPos][yPos] == " "){
            indexBox++;
            arrayBoard[xPos][yPos] = "x";
            arr1x[xPos]++;
            arr1y[yPos]++;
            if(xPos==yPos){
                diag1++;
            }
            if((xPos==1 && yPos==1) || (xPos==0 && yPos==2) || (xPos==2 && yPos==0)){
                revDiag1++;
            }
        }
    }
    const getarr1x = () => arr1x;
    const getarr1y = () => arr1y;
    const getDiag1 = () => diag1;
    const getrevDiag1 = () => revDiag1;
    return {name1, createX, getarr1x, getarr1y, getDiag1, getrevDiag1};
}

const user2 = function(name2) {
    const { arrayBoard } = gameBoard;
    const arr2x = [0, 0, 0];
    const arr2y = [0, 0, 0];
    let diag2 = 0;
    let revDiag2 = 0;
    const createO = function(xPos,yPos) {
        if(arrayBoard[xPos][yPos] == " "){
            indexBox++;
            arrayBoard[xPos][yPos] = "o";
            arr2x[xPos]++;
            arr2y[yPos]++;
            if(xPos==yPos){
                diag2++;
            }
            if((xPos==1 && yPos==1)|| (xPos==0 && yPos==2) || (xPos==2 && yPos==0)){
                revDiag2++;
            }
        }
    }
    const getarr2x = () => arr2x;
    const getarr2y = () => arr2y;
    const getDiag2 = () => diag2;
    const getrevDiag2 = () => revDiag2;
    return {name2, createO, getarr2x, getarr2y, getDiag2, getrevDiag2};
}

const createUsers = function(p1, p2) {
    firstPlayer = user1(p1.value);
    secondPlayer = user2(p2.value);
    names1.innerHTML = p1.value;
    names2.innerHTML = p2.value;
    return {firstPlayer, secondPlayer};
};

const add = function() {
    const p1 = document.getElementById("player1");
    const p2 = document.getElementById("player2");
    if(p1.value && p2.value){
        event.preventDefault();
        createUsers(p1, p2);
        form.reset();
        dialog.close();
    }
}


const game = function(xPos, yPos) {
    

    const { name1, getarr1x, getarr1y, getDiag1, getrevDiag1 } = firstPlayer;
    const { name2, getarr2x, getarr2y, getDiag2, getrevDiag2 } = secondPlayer;
    
    if(over!=1){
        if(indexBox%2==0){
            // const pv = prompt("firstPlayer i j");
            // const a= pv.split(" ");
            firstPlayer.createX(xPos, yPos);
            names1.classList.toggle("highlight");
            names2.classList.toggle("highlight");
        }
        else{
            // const pv = prompt("secondPlayer i j");
            // const a = pv.split(" ");
            secondPlayer.createO(xPos, yPos);  
            names2.classList.toggle("highlight");
            names1.classList.toggle("highlight");
        }
        gameBoard.displayBoard();
        displayController.dis();
        // console.log(firstPlayer.getDiag1(), secondPlayer.getDiag2(), firstPlayer.getrevDiag1(), secondPlayer.getrevDiag2());
        if(indexBox>3){
            if((getarr1x()[0]==3 || getarr1x()[1]==3 || getarr1x()[2]==3) || (getarr1y()[0]==3 || getarr1y()[1]==3 || getarr1y()[2]==3) || getDiag1()==3 || getrevDiag1()==3){
                console.log(`${name1} won`);
                result.innerHTML = `${name1} won`;
                over = 1;
                return;
            }
            else if((getarr2x()[0]==3 || getarr2x()[1]==3 || getarr2x()[2]==3) || (getarr2y()[0]==3 || getarr2y()[1]==3 || getarr2y()[2]==3) || getDiag2()==3 || getrevDiag2()==3){
                console.log(`${name2} won`);
                result.innerHTML = `${name2} won`;
                over = 1;
                return;
            }
        }
        if(indexBox==9){
            console.log("Tie");
            result.innerHTML = `Tie`;
            over = 1;
        }
    }
    console.log(indexBox);
}

// gameBoard.createO(0,1);
// gameBoard.createX(1,1);
// gameBoard.createO(2,1);

gameBoard.displayBoard();
displayController.dis();
