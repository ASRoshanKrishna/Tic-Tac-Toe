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

displayController.dis();

let indexBox = 0;
let over = 0;


const user1 = function(name) {
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
    const getDiag1 = () => diag1;
    const getrevDiag1 = () => revDiag1;
    return {name, createX, arr1x, arr1y, getDiag1, getrevDiag1};
}

const user2 = function(name) {
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
    const getDiag2 = () => diag2;
    const getrevDiag2 = () => revDiag2;
    return {name, createO, arr2x, arr2y, getDiag2, getrevDiag2};
}

const ros = user1("ros");
const kris = user2("kris");

const game = function(xPos, yPos) {
    

    const { arr1x, arr1y, getDiag1, getrevDiag1 } = ros;
    const { arr2x, arr2y, getDiag2, getrevDiag2 } = kris;
    
    if(over!=1){
        if(indexBox%2==0){
            // const pv = prompt("ros i j");
            // const a= pv.split(" ");
            ros.createX(xPos, yPos);
        }
        else{
            // const pv = prompt("kris i j");
            // const a = pv.split(" ");
            kris.createO(xPos, yPos);  
        }
        gameBoard.displayBoard();
        displayController.dis();
        // console.log(ros.getDiag1(), kris.getDiag2(), ros.getrevDiag1(), kris.getrevDiag2());
        if(indexBox>3){
            if((arr1x[0]==3 || arr1x[1]==3 || arr1x[2]==3) || (arr1y[0]==3 || arr1y[1]==3 || arr1y[2]==3) || ros.getDiag1()==3 || ros.getrevDiag1()==3){
                console.log("ros won");
                over = 1;
                return;
            }
            else if((arr2x[0]==3 || arr2x[1]==3 || arr2x[2]==3) || (arr2y[0]==3 || arr2y[1]==3 || arr2y[2]==3) || kris.getDiag2()==3 || kris.getrevDiag2()==3){
                console.log("kris won");
                over = 1;
                return;
            }
        }
        if(indexBox==8){
            console.log("Tie");
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
