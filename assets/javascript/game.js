 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyC7TtrAdMjN6XBW-TQPLcqKU5ZAAxLiJz0",
    authDomain: "rps-multi-95941.firebaseapp.com",
    databaseURL: "https://rps-multi-95941.firebaseio.com",
    projectId: "rps-multi-95941",
    storageBucket: "rps-multi-95941.appspot.com",
    messagingSenderId: "344114657840",
    appId: "1:344114657840:web:e0d3f07389b7a0150f0bf5"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

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
var results = "";

var recentGame = {
    playerOneMove: playerOne.recentPlay,
    playerTwoMove: playerTwo.recentPlay,
    gameResults: results
}

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
            results = "player one wins";
            playerOne.numWins++;
        }
    else if (playerOne.recentPlay === playerTwo.recentPlay) {
        results = "tie";
        numTies++;
    }
    else {
        results = "player two wins";
        playerTwo.numWins++;
    }
    numGames++;
    console.log(numGames, numTies, playerOne.numWins, playerTwo.numWins);
    pOneMove = false;
    pTwoMove = false;

    recentGame = {
        playerOneMove: playerOne.recentPlay,
        playerTwoMove: playerTwo.recentPlay,
        gameResults: results
    }

    database.ref().push(recentGame);
}