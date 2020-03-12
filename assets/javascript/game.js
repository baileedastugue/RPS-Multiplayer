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
    numWins: 0,
    moveArray: []
}

var playerTwo = {
    recentPlay: "",
    numWins: 0,
    moveArray: []
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
    numberRounds: numRounds,
    numberTies: numTies
};

$(document).ready(function () {
    $("#newRound").hide();
    $("#clearHistory").hide();
    clearHist();
    $("#p1Play").text("Choose your move");
})

$(document).keyup(function (event) {
    recentMove = event.key;
    if (recentMove === "r" || recentMove === "p" || recentMove === "s") {
        if (!pOneMove) {
            playerOne.recentPlay = recentMove;
            playerOne.moveArray.push(recentMove);
            // console.log(playerOne.modeArray);
            console.log(math.mode(playerOne.moveArray));
            $("#p1Play").empty();
            $("#p2Play").text("Choose your move");
            pOneMove = true;
        }
        else if (!pTwoMove) {
            playerTwo.recentPlay = recentMove;
            pTwoMove = true;
            playerTwo.moveArray.push(recentMove);
            // console.log(playerTwo.modeArray);
            console.log(math.mode(playerTwo.moveArray));
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
        numberRounds: numRounds,
        numberTies: numTies
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
    $("#clearHistory").hide();
})

function clearHist () {
    database.ref().remove();
    $("tbody").empty();
    $("#p1Play").empty();
    $("#p2Play").empty();
    numRounds = 0;
    numTies = 0;
    playerOne.numWins = 0;
    playerTwo.numWins = 0
    playerOne.moveArray = [];
    playerTwo.moveArray = [];
}

function newRound (){
    $("#p1Play").empty();
    $("#p2Play").empty();
    $("#player2, #player1").attr("move", "empty");
    $("#p1Play").text("Choose your move");
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
    var tieNumber = childSnapshot.val().numberTies;

    var newRow = $("<tr>").append (
        $("<td>").text(roundNumber),
        $("<td>").text(gameRes),
        $("<td>").text(p1wins),
        $("<td>").text(p2wins),
        $("<td>").text(tieNumber)
    );

    $("tbody").append(newRow);

    $("#p1Play").text(p1move);
    $("#p2Play").text(p2move);

    changeImage();
})

function displayResults () {    
    $("#newRound").show(); 
    $("#clearHistory").show();
}

function changeImage() {
    if (playerOne.recentPlay === "r") {
        $("#player1").attr("move", "rock");
        console.log($("img"));
    }
    if (playerTwo.recentPlay === "r") {
        $("#player2").attr("move", "rock");
    }
    if (playerOne.recentPlay === "p") {
        $("#player1").attr("move", "paper");
        console.log($("img"));
    }
    if (playerTwo.recentPlay === "p") {
        $("#player2").attr("move", "paper");
    }
    if (playerOne.recentPlay === "s") {
        $("#player1").attr("move", "scissors");
        console.log($("img"));
    }
    if (playerTwo.recentPlay === "s") {
        $("#player2").attr("move", "scissors");
    }
}