'use stict'

var gQuestCounter = 0;

var gQuests = [{
    id: 1,
    opts: ['the T-rexes are sad', 'the T-rexes are happy'],
    correctOptIndex: 1
},
{
    id: 2,
    opts: ['the turtle is winning', 'the rabbit is winning'],
    correctOptIndex: 0
}

]



function initGame() {
    //TODO: initiate game from the body
    console.log('starting the game...');
    gQuestCounter = 0;
    renderQuests(gQuestCounter);
}

function createQuests() {
    //TODO: putting img, options,

}

//displaying the given quest
function renderQuests() {
    console.log('rendering quest number:', gQuestCounter + 1);
    console.log(gQuests[gQuestCounter]);
    
    var currQuest = gQuests[gQuestCounter];
    
    var questSrc = currQuest.id;
    //getting the elements
    var elQuestPic = document.querySelector('.quest');
    var elOptions = document.querySelectorAll('.option');
    
    //updating DOM
    elQuestPic.innerHTML = `<img src="img/${questSrc}.jpg" alt="quest Picture">`
    console.log('currQuest is:',gQuestCounter,currQuest);
    for (var i = 0; i < elOptions.length; i++) {

        elOptions[i].innerText = currQuest.opts[i];
    }
}

function checkAnswer(optIndx) {
    //chekcing if correct and deciding what to do 
    var currQuest = gQuests[gQuestCounter];
    if (currQuest.opts[optIndx] === currQuest.correctOptIndex) {
        console.log("cogratz! you answered correctly!");
        if (gQuestCounter === gQuests.length) {
            console.log('you finished the game!');
            document.querySelector(body).innerHTML = "hello"
        } else {
            gQuestCounter++;
            renderQuests();
        }
    } else {
        console.log('you made a mistake... try again!');
    }
}