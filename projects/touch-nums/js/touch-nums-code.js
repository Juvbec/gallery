
//declaring vars
var gCurrentLowest;
var gMistakes;
var gTimersCount;
var gStartGame = false;
var gHighestNum;
var timerInterval;
//elements
var elTimer;
var elMistakes;

function init() {
    //add difficulties
    var difficulties = ['easy', 'medium', 'hard', 'to death'];
    var difficulty = prompt('choose difficulty (easy/medium/hard/to death');
    var tableLength = (difficulties.indexOf(difficulty) + 4);

    //initializing the viriable that will hold the elements
    elTimer = document.querySelector('.timer');
    elMistakes = document.querySelector('h2 span');

    //reseting the data
    gCurrentLowest = 0;
    gMistakes = 0;
    gTimersCount = 0;
    gHighestNum = tableLength * tableLength - 1;
    var data = createTableData(tableLength);

    //making the table always in the middle (for each difficulty)
    var elTable = document.querySelector('.board');
    elTable.style.marginTop = (-tableLength * 15) + 'px';
    elTable.style.marginLeft = (-tableLength * 15) + 'px';

    renderTable(data);
}

function renderTable(data) {
    length = Math.sqrt(data.length);
    currNum = 0;

    var strHTML = '';
    //loop that adds every cell
    for (var i = 0; i < length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < length; j++) {
            strHTML += '<td onclick = "cellClicked(this)">';
            strHTML += data[currNum++];
            strHTML += '</td>';
        }
        strHTML += '</tr>';

        var elTable = document.querySelector('.board');
        elTable.innerHTML = strHTML;
    }
}

function cellClicked(elCell) {
    //game ends if all of the numbers are marked



    //if its the first click, start counting
    if (!gStartGame) {
        gStartGame = true;
        startTime();
        
    }

    console.log('clicked!' + elCell.innerText);
    if (gCurrentLowest === +elCell.innerText) {
        console.log('it is the lowest!');
        //cell changes color if correct
        elCell.classList.add("mark");
        gCurrentLowest++;
    } else if (gCurrentLowest < +elCell.innerText) {
        //counts number of mistakes
        console.log('you made a mistake..');
        elMistakes.innerText = ++gMistakes;
    }

    if (gCurrentLowest > gHighestNum) {
        console.log('game is finished');
        clearInterval(timerInterval);
    }
}

function createTableData(tableLength) {
    var orderedData = [];
    for (var i = 0; i < tableLength * tableLength; i++) {
        orderedData.push(i);
    }
    console.log(orderedData);

    var shuffledData = [];
    while (orderedData.length > 0) {
        var ranNum = parseInt(Math.random() * orderedData.length);
        shuffledData.push(orderedData.splice(ranNum, 1)[0]);
    }
    console.log('shuffled data', shuffledData);

    return shuffledData;
}

function startTime() {

    timerInterval = setInterval(function () {
        gTimersCount += 0.01
        elTimer.innerText = gTimersCount;
    }, 10);

}