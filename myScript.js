const gameBoard = (function() {
    const arrayBoard = [[" "," "," "],[" "," "," "],[" "," "," "]]
    const displayBoard = function() {
        for(v in arrayBoard){
            console.log(arrayBoard[v]);
        }
    }

    return {displayBoard,arrayBoard};
})();

const user1 = function(name) {
    const { arrayBoard } = gameBoard;
    const arr1x = [0, 0, 0];
    const arr1y = [0, 0, 0];
    let diag1 = 0;
    const createX = function(xPos,yPos) {
        if(arrayBoard[xPos][yPos] != "o"){
            arrayBoard[xPos][yPos] = "x";
            arr1x[xPos]++;
            arr1y[yPos]++;
            if(xPos==yPos || (xPos==0 && yPos==2) || (xPos==2 && yPos==0)){
                diag1++;
            }
        }
    }
    const getDiag1 = () => diag1;
    return {name, createX, arr1x, arr1y, getDiag1};
}

const user2 = function(name) {
    const { arrayBoard } = gameBoard;
    const arr2x = [0, 0, 0];
    const arr2y = [0, 0, 0];
    let diag2 = 0;
    const createO = function(xPos,yPos) {
        if(arrayBoard[xPos][yPos] != "x"){
            arrayBoard[xPos][yPos] = "o";
            arr2x[xPos]++;
            arr2y[yPos]++;
            if(xPos==yPos || (xPos==0 && yPos==2) || (xPos==2 && yPos==0)){
                diag2++;
            }
        }
    }
    const getDiag2 = () => diag2;
    return {name, createO, arr2x, arr2y, getDiag2};
}

const game = function() {
    const ros = user1("ros");
    const kris = user2("kris");
    const { arr1x, arr1y, getDiag1 } = ros;
    const { arr2x, arr2y, getDiag2 } = kris;


    for(let i = 0;i<9;i++){
        if(i%2==0){
            const pv = prompt("ros i j");
            const a= pv.split(" ");
            ros.createX(a[0],a[1]);
        }
        else{
            const pv = prompt("kris i j");
            const a = pv.split(" ");
            kris.createO(a[0],a[1]);
        }
        gameBoard.displayBoard();

        if(i>3){
            if((arr1x[0]==3 || arr1x[1]==3 || arr1x[2]==3) || (arr1y[0]==3 || arr1y[1]==3 || arr1y[2]==3) || ros.getDiag1()==3){
                console.log("ros won");
                return;
            }
            else if((arr2x[0]==3 || arr2x[1]==3 || arr2x[2]==3) || (arr2y[0]==3 || arr2y[1]==3 || arr2y[2]==3) || kris.getDiag2()==3){
                console.log("kris won");
                return;
            }
        }
    }
}

// gameBoard.createO(0,1);
// gameBoard.createX(1,1);
// gameBoard.createO(2,1);
gameBoard.displayBoard();
game();