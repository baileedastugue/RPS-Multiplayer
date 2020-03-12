 // Firebase configuration
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
var gameStarted = true;
var numRounds = 1;
var numTies = 0;
var recentMove = "";
var results = "";

var recentGame = {
    playerOneMove: playerOne.recentPlay,
    playerTwoMove: playerTwo.recentPlay,
    gameResults: results,
    playerOneWins: playerOne.numWins,
    playerTwoWins: playerTwo.numWins,
    numberRounds: numRounds
};

$("#newRound").hide();
$("#clearHistory").hide();

$(document).keyup(function (event) {
    recentMove = event.key;
    if (recentMove === "r" || recentMove === "p" || recentMove === "s") {
        if (!pOneMove) {
            playerOne.recentPlay = recentMove;
            pOneMove = true;
        }
        else if (!pTwoMove) {
            playerTwo.recentPlay = recentMove;
            pTwoMove = true;
            determineResults();
            gameStarted = false;
        }
    }
    else if (gameStarted) {
        console.log("please press the letter 'r' for rock, 'p' for paper, or 's' for scissors!");
    }
});


function determineResults () {
    if (playerOne.recentPlay === "r" && playerTwo.recentPlay === "s" ||
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
    roundOver();
}

function roundOver () {
    numRounds++;
    // fills in object that holds recent game data
    recentGame = {
        playerOneMove: playerOne.recentPlay,
        playerTwoMove: playerTwo.recentPlay,
        gameResults: results,
        playerOneWins: playerOne.numWins,
        playerTwoWins: playerTwo.numWins,
        numberRounds: numRounds
    }

    // uploads most recent game to firebase
    database.ref().push(recentGame);
    
    gameStarted = false;
    displayResults();
}

$("#newRound").on("click", function() {
    newRound();
    $("#newRound").hide();
    $("#clearHistory").hide();
})

$("#clearHistory").on("click", function() {
    clearHist();
})

function clearHist () {
    database.ref().remove();
    $("tbody").empty();
    numRounds = 0;
    numTies = 0;
}

function newRound (){
    gameStarted = true;
    pOneMove = false;
    pTwoMove = false;
}

database.ref().on("child_added", function(childSnapshot) {
    var gameRes = childSnapshot.val().gameResults;
    var p1move = childSnapshot.val().playerOneMove;
    var p1wins = childSnapshot.val().playerOneWins;
    var p2move = childSnapshot.val().playerTwoMove;
    var p2wins = childSnapshot.val().playerTwoWins;
    var roundNumber = childSnapshot.val().numberRounds;

    var newRow = $("<tr>").append (
        $("<td>").text(roundNumber),
        $("<td>").text(p1move),
        $("<td>").text(p2move),
        $("<td>").text(gameRes),
        $("<td>").text(p1wins),
        $("<td>").text(p2wins),
    );

    $("tbody").append(newRow);
})

function displayResults () {    
    $("#newRound").show(); 
    $("#clearHistory").show();   
}

