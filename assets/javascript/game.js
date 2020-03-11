var playerOne = {
    recentPlay: "",
    numWins: 0
}

var playerTwo = {
    recentPlay: "",
    numWins: 0
}

var pOneMove = false;
var pTwoMove = false;
var numGames = 0;
var recentMove = "";

$(document).keyup(function (event) {
    recentMove = event.key;
    if (recentMove === "r" || recentMove === "p" || recentMove === "s") {
        if (!pOneMove) {
            playerOne.recentPlay = recentMove;
            console.log(playerOne.recentPlay);
            pOneMove = true;
        }
        else if (!pTwoMove) {
            playerTwo.recentPlay = recentMove;
            console.log(playerTwo.recentPlay);
            pTwoMove = true;
        }
        else {
            console.log("yeehaw");
        }
    }
    else {
        console.log("please press the letter 'r' for rock, 'p' for paper, or 's' for scissors!");
    }   
});


// function makeMoves () {
//     return recentMove;
// }
// console.log(makeMoves());


// function storeMoves () {
//     if (!pOneMove) {

//     }
// }