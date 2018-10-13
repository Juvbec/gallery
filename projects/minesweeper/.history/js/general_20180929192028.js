function renderCell(location, value) {
    var cellSelector = '.cell' + location.i + '-' + location.j;
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function renderBoard() {
    var difficulty = diffArr[gLevel.difficulty];

    var strHTML = '<table border="2"><tbody>';
    strHTML += '<tr><td class = "cell '+difficulty+' minesCount" colspan = "' + (gLevel.width - 1) / 2 +'">' + gLevel.minesCount + '</td><td class = "cell '+difficulty+' face" onclick="init('+gLevel.difficulty+')"></td><td class = "cell '+difficulty+' timer" colspan = "' + (gLevel.width - 1) / 2 +'">0</td>'
    for (var i = 0; i < gLevel.height; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gLevel.width; j++) {
            // CR: Look at the error: 'cell' is declared but its value is never read.
            var cell = gBoard[i][j];
            var className = 'cell blank cell' + i + '-' + j;
            strHTML += '<td class="' + className + ' '+difficulty+'" onclick="handleClickedCell(' + i + ', ' + j + ',this)" oncontextmenu="handleRightClick(' + i + ', ' + j + ',this);"></td> '
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    // console.log('strHTML', strHTML);

    elBoard.innerHTML = strHTML;
}
function checkNeighbors(cellY, cellX) {
    var neighborsCount = 0;
    //two loops to count the neighbors
    for (var i = cellY - 1; i <= cellY + 1; i++) {
        //making sure its a valid row
        if (i < 0 || i >= gLevel.height) continue;
        for (var j = cellX - 1; j <= cellX + 1; j++) {
            //making sure its a valid col
            if (j < 0 || j >= gLevel.width) continue;
            //making sure its not the cell itself
            if (i === cellY && j === cellX) continue;
            //counting the cells content
            if (gBoard[i][j] === MINE) neighborsCount++;
        }
    }
    if (neighborsCount === 0) {

        return EMPTY;
    }

    return neighborsCount;
}
function getCellSelector(i, j) {
    return '.cell' + i + '-' + j;
}

function saveToLocalStorage(difficulty) {
    // CR: Nice.
    if (typeof (Storage) !== "undefined") {
        var currBestResult = +localStorage.getItem(BEST_RESULT_KEY+difficulty);
        if (gState.time < currBestResult || !currBestResult) localStorage.setItem(BEST_RESULT_KEY+difficulty, gState.time);
    } else {
        console.log('no localStorage support');
    }
}
function getTopScore(difficulty) {
    if (typeof (Storage) !== "undefined") {
        return localStorage.getItem(BEST_RESULT_KEY+difficulty);
    } else {
        console.log('no localStorage support');
        return undefined;
    }
}
function removeRecords() {
    localStorage.removeItem('bestResult0');
    localStorage.removeItem('bestResult1');
    localStorage.removeItem('bestResult2');
}
