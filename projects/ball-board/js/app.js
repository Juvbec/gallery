const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE';

const HEIGHT = 10;
const WIDTH = 12;
const GLUE_TIME = 7000;
const GLUE_DISAPPERANCE_TIME = 3000;
const GLUE_AFFECT_WORN_OFF = 3000;

var NEW_BALL_TIME = 3000;

const GAMER_IMG = '<img src="img/gamer.png">';
const BALL_IMG = '<img src="img/ball.png">';
const GLUE_IMG = '<img src="img/glue.png">';

var gGamerPos;
var gBoard;
var newBallInterval;
var glueInterval;
var ballsCounter;
var itemsInPlay;
var isGlued;
var glueTimeOut;

var elBallCounter = document.querySelector('h2 span');
var headline = document.querySelector('h1');

function init() {
	ballsCounter = 0;
	itemsInPlay = 0;
	headline = 'Collect those Balls';
	isGlued = false;

	if (newBallInterval) clearInterval(newBallInterval);
	if (glueInterval) clearInterval(glueInterval);

	gGamerPos = { i: 2, j: 5 };
	gBoard = buildBoard();
	renderBoard(gBoard);

	addingBalls();
	addingGlue();

}

function buildBoard() {
	// Create the Matrix
	var board = new Array(10);
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(12);
	}

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: FLOOR, gameElement: null };
			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}
			board[i][j] = cell;
		}
	}

	board[HEIGHT / 2][0].type = FLOOR;
	board[HEIGHT / 2][WIDTH - 1].type = FLOOR;
	board[0][WIDTH / 2].type = FLOOR;
	board[HEIGHT - 1][WIDTH / 2].type = FLOOR;




	// Place the gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls
	board[3][8].gameElement = BALL;
	itemsInPlay++;
	board[7][4].gameElement = BALL;
	itemsInPlay++;

	// console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += '\t' + GAMER_IMG + '\n';
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	// console.log('strHTML is:');
	// console.log(strHTML);
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
	var targetI = i;
	var targetJ = j;

	//checking if the gamer is on the edge
	if (i < 0) {
		targetI = HEIGHT - 1;
	}
	if (i === HEIGHT) {
		targetI = 0;
	}
	if (j < 0) {
		targetJ = WIDTH - 1;
	}
	if (j === WIDTH) {
		targetJ = 0;
	}


	var targetCell = gBoard[targetI][targetJ];
	if (targetCell.type === WALL) {
		// console.log('you hit a wall');
		return;

	}



	// Calculate distance to ake sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(targetI - gGamerPos.i);
	var jAbsDiff = Math.abs(targetJ - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) ||
		(jAbsDiff === 1 && iAbsDiff === 0) ||
		(gGamerPos.j === WIDTH / 2 && iAbsDiff === HEIGHT - 1) ||
		(gGamerPos.i === HEIGHT / 2 && jAbsDiff === WIDTH - 1)) {

		//counting the collected balls
		if (targetCell.gameElement === BALL) {
			elBallCounter.innerHTML = ++ballsCounter;
			itemsInPlay--;
			var collectSound = new Audio('sound/ball.wav');
			collectSound.play();
			if (itemsInPlay === 0) {
				clearInterval(newBallInterval);
				// console.log('finished game');
				headline.innerText = 'YOU WON!';
			}
		}
		var isThereGlue = false;
		if (targetCell.gameElement === GLUE) isThereGlue = true; 
		

		// MOVING
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		renderCell(gGamerPos, '');

		gGamerPos.i = targetI;
		gGamerPos.j = targetJ;

		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		renderCell(gGamerPos, GAMER_IMG);

		if (isThereGlue) {
			var ticking = new Audio('sound/ticktock.wav');
			ticking.play();
			isGlued=true;
			// clearTimeout(glueTimeOut);
			setTimeout(function() {isGlued=false;},GLUE_AFFECT_WORN_OFF)
		}
	} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
	if (isGlued) return;

	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;
	}
}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

//interval for new balls
function addingBalls() {
	newBallInterval = setInterval(function () {

		freeSpot = getFreeSpotLocation();

		gBoard[freeSpot.i][freeSpot.j].gameElement = BALL;
		renderCell(freeSpot, BALL_IMG);
		itemsInPlay++;
		if (itemsInPlay === (WIDTH - 2) * (HEIGHT - 2) - 1) {
			clearInterval(newBallInterval);
			clearInterval(glueInterval);
			headline.innerText = 'YOU LOST';
		}

		if (NEW_BALL_TIME>200) {
			NEW_BALL_TIME -= 50;
		}
	}, NEW_BALL_TIME);
}

//interval for new glue
function addingGlue() {
	glueInterval = setInterval(function () {

		var freeSpot = getFreeSpotLocation();

		gBoard[freeSpot.i][freeSpot.j].gameElement = GLUE;
		itemsInPlay++;
		renderCell(freeSpot, GLUE_IMG);
		glueTimeOut = setTimeout(function () {
			renderCell(freeSpot, '');
			gBoard[freeSpot.i][freeSpot.j].gameElement = '';
			itemsInPlay--;
		}, GLUE_DISAPPERANCE_TIME)

	}, GLUE_TIME)
}

//getting an random empty position
function getFreeSpotLocation() {
	do {

		var ranI = parseInt(Math.random() * (HEIGHT - 1));
		var ranJ = parseInt(Math.random() * (WIDTH - 1));
	} while (gBoard[ranI][ranJ].gameElement !== null || gBoard[ranI][ranJ].type === WALL);

	return { i: ranI, j: ranJ };
}