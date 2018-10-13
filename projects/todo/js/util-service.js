function makeId() {
  var length = 6;
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function getFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function getCurrTime() {
    return Date.now();



//   // For todays date;
// Date.prototype.today = function () { 
//     return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
// }

// // For the time now
// Date.prototype.timeNow = function () {
//      return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
// }

// var newDate = new Date();
// var datetime = "Created On: " + newDate.today() + " @ " + newDate.timeNow();
// return datetime;
}
