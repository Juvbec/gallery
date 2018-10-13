




console.log('starting the game...');
gBalloons = [{ height: 0, speed: 10 }, { height: 0 , speed: 10}]
var pops = 0;

var elBallons = document.querySelectorAll('[class^=balloon]');
console.log(elBallons);


var balloonInterval = setInterval(function () {
    for (var i = 0; i < elBallons.length; i++) {
        gBalloons[i].height +=gBalloons[i].speed;        
        elBallons[i].style.bottom = gBalloons[i].height+'px';
    }

    if (pops === 2) {
        locaiton = location;
    }
}, 300);

function balloonClicked(elBln) {
    var audio = new Audio('audio/pop.wav');
    audio.play();
    elBln.style.opacity = 0;
    pops++;
}
