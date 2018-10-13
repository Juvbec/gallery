'use strict'
const EMPTY = '';
const MINE = 'MINE';
const BEST_RESULT_KEY = 'bestResult';
const MINE_IMG = '<img src="imgs/poop.png">'
const FLAG_IMG = '<img src="imgs/flag.png">'
const SMILE_IMG = '<img src="imgs/smile.png">'
const DEAD_IMG = '<img src="imgs/dead.png">'
const COOL_IMG = '<img src="imgs/sunglasses.png">'
// CR: Everything is capitalized but this? I'm shocked!
const shocked_IMG = '<img src="imgs/shocked.png">'


var diffArr = ['easy','medium','hard'];

var elBoard = document.querySelector('.board');
var elBestResult = document.querySelector('h3 span');
var elMinesCount;
var elFace;
var elTime;

var gLevel;
var gBoard;
var gState;
var gMines;
var gTimeInterval;


function init(difficulty) {
    if (gTimeInterval) clearInterval(gTimeInterval);

    markTab(difficulty);

    setScoreTable(difficulty);
    //setting the data for the current level

    switch (difficulty) {
        case 0:
            gLevel = {
                height: 5,
                width: 5,
                minesCount: 3
            }
            break;
        case 1:
            gLevel = {
                height: 7,
                width: 7,
                minesCount: 8
            }
            break;
        case 2:
            gLevel = {
                height: 7,
                width: 13,
                minesCount: 20
            }
            break;
    }
    gLevel.difficulty = difficulty;

    gState = {
        isGameOn: true,
        minesLeft: gLevel.minesCount,
        cellsLeft: gLevel.height * gLevel.width
    };

    gBoard = buildBoard();
    renderBoard();
 
    elMinesCount = document.querySelector('.minesCount');
    elFace = document.querySelector('.face');
    elTime = document.querySelector('.timer');
    elFace.innerHTML = SMILE_IMG;


}





function handleClickedCell(i, j, elCell) {
    if (elCell.classList.contains("open") || !gState.isGameOn || elCell.classList.contains('.flagged')) return;

    //checks if its the first click
    if (!gState.time) {
        timeInterval();
        //giving the function the i and j of the clicked cell so that there will be no mine there
        gMines = placeRandomMines(i, j);
        placeNumbers();
        console.table(gBoard);

    }

    //check if the cell contains a mine
    if (gBoard[i][j] === MINE) {
        openMine(i, j);
        finishGame(false);
        return;
    }
    openCell(i, j);
    checkOpenSpace(i, j);
}
function handleRightClick(i, j, elCell) {
    // console.log('right click');
    if (elCell.classList.contains("open") || !gState.isGameOn) return;



    if (elCell.classList.contains('flagged')) {
        console.log('there is flagged');
        renderCell({ i, j }, EMPTY);
        elCell.classList.remove('flagged');
        elMinesCount.innerText = ++gState.minesLeft;
    } else if (gState.minesLeft > 0) {
        console.log('there is no flagged');
        renderCell({ i, j }, FLAG_IMG);
        elCell.classList.add('flagged');
        elMinesCount.innerText = --gState.minesLeft;
    }
}
function checkOpenSpace(indxI, indxJ) {
    // CR: Better if this if will be in 'handleClickedCell()'
    // CR: if (gBoard[i][j] === EMPTY) { checkOpenSpace(i, j); }
    // CR: But the method itself to check 'if not' and return is good.
    if (gBoard[indxI][indxJ] !== EMPTY) {
        return;
    }
    for (var i = indxI - 1; i <= indxI + 1; i++) {
        for (var j = indxJ - 1; j <= indxJ + 1; j++) {
            if (i === indxI && j === indxJ) continue;
            if (openCell(i, j)) checkOpenSpace(i, j);
        }
    }
}
function openCell(i, j) {
    if (i < 0 || i >= gLevel.height || j < 0 || j >= gLevel.width) return false;
    var elCell = document.querySelector(getCellSelector(i, j));
    if (elCell.classList.contains('open')|| elCell.classList.contains('flagged')) return false;

    var classNum = 'open' + gBoard[i][j];
    elCell.classList.remove("blank");


    elCell.classList.add("open");
    elCell.classList.add(classNum);
    renderCell({ i, j }, gBoard[i][j]);
    //checking if the user has won
    if (--gState.cellsLeft === gLevel.minesCount) {
        finishGame(true);
    }
    return true;
}
function openMine(i, j) {
    var elCell = document.querySelector(getCellSelector(i, j));
    renderCell({ i, j }, MINE_IMG);
    elCell.classList.add("blown");
}




function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.height; i++) {
        board.push([]);
        for (var j = 0; j < gLevel.width; j++) {
            board[i][j] = EMPTY;
        }
    }



    return board;
}
// CR: Nice.
function placeRandomMines(i, j) {
    var randomMines = [];
    for (var i = 0; i < gLevel.minesCount; i++) {
        var ranPos = null;
        do {
            var ranI = getRandomIntInclusive(0, gLevel.height - 1);
            var ranJ = getRandomIntInclusive(0, gLevel.width - 1);
            if (gBoard[ranI][ranJ] === EMPTY && ranI !== i && ranJ !== j) {
                ranPos = { i: ranI, j: ranJ };
                gBoard[ranI][ranJ] = MINE;
            }
        } while (!ranPos)
        randomMines.push(ranPos);
    }

    return randomMines;
}
function placeNumbers() {
    for (var i = 0; i < gLevel.height; i++) {
        for (var j = 0; j < gLevel.width; j++) {
            if (gBoard[i][j] === MINE) continue;
            gBoard[i][j] = checkNeighbors(i, j);
        }
    }
}




function timeInterval() {
    gState.time = 1;
    gTimeInterval = setInterval(function () {
        elTime.innerText = gState.time++;
    }, 1000)
}
function finishGame(isWin) {
    clearInterval(gTimeInterval);
    gState.isGameOn = false;
    if (isWin) {
        elFace.innerHTML = COOL_IMG;
        console.log('WIN!');
        saveToLocalStorage(gLevel.difficulty);
    } else {
        console.log('GAME OVER');
        elFace.innerHTML = DEAD_IMG;
        for (var i = 0; i < gMines.length; i++) {
            openMine(gMines[i].i, gMines[i].j);
        }
    }
}
function setScoreTable(difficulty) {
    var bestScore = getTopScore(difficulty);
    if (!bestScore) {
        elBestResult.innerText = 'For "'+diffArr[difficulty]+'" Difficulty has not been set yet!';
        return;    
    }


    elBestResult.innerText = 'For "'+diffArr[difficulty]+'" Difficulty is '+bestScore+ ' Seconds';
}


// CR: It doesn't do anything coz the line in css file is comment out.
function markTab(difficulty) {
    var elBtn = document.getElementById('btn' + (difficulty));
    var elContainer =document.querySelector('.gameContainer');

    //checking if something is marked already
    if (!elContainer.classList.contains('tabMark')) {
        elBtn.classList.add('tabMark');
        elContainer.classList.add('tabMark');
        return;
    }

    var isTheSame = difficulty === gLevel.difficulty;
    
    if (isTheSame) {
        return;
    } else {
        elBtn.classList.add('tabMark');
        document.getElementById('btn'+gLevel.difficulty).classList.remove('tabMark');
    }
}