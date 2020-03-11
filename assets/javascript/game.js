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
var numTies = 0;
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
            determineResults();
        }
    }
    else {
        console.log("please press the letter 'r' for rock, 'p' for paper, or 's' for scissors!");
    }
});


function determineResults () {
    if (playerOne.recentPlay === "r" && playerTwo.recentPlay === "p" ||
        playerOne.recentPlay === "p" && playerTwo.recentPlay === "r" || 
        playerOne.recentPlay === "s" && playerTwo.recentPlay === "p") {
            console.log("player one wins");
            playerOne.numWins++;
        }
    else if (playerOne.recentPlay === playerTwo.recentPlay) {
        console.log("tie game");
        numTies++;
    }
    else {
        console.log("player two wins");
        playerTwo.numWins++;
    }
    numGames++;
    console.log(numGames, numTies, playerOne.numWins, playerTwo.numWins);
    pOneMove = false;
    pTwoMove = false;
}
