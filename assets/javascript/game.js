var playerOne = {
    recentPlay: "",
    numWins: 0
}

var playerTwo = {
    recentPlay: "",
    numWins: 0
}

var pOneMove = false;
var numGames = 0;
var recentMove = "";

$(document).keyup(function (event) {
    recentMove = event.key;   
});


// function makeMoves () {
//     return recentMove;
// }
// console.log(makeMoves());


// function storeMoves () {
//     if (!pOneMove) {

//     }
// }