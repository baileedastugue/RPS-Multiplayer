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

var numRounds = 1;
var numTies = 0;
var results = "";

var recentGame;
var players;
var newEntry;

// function pullData () {
    database.ref().endAt().limitToLast(1).on("child_added", function(snapshot) {
        newEntry = snapshot.val();
        playerOne.recentPlay = newEntry.pOnePlay;
        playerTwo.recentPlay = newEntry.pTwoPlay;
        console.log("data has been pulled");

        if (!playerOne.recentPlay == "" && !playerTwo.recentPlay == "") {
            determineResults();
            console.log("banana");
            roundOver();
        }
    })
// }

// $(document).ready(function() {
//     pullData();
// })

$(document).keyup(function (event) {
    var recentMove = event.key;
    if (recentMove === "r" || recentMove === "p" || recentMove === "s") {
        if (playerOne.recentPlay === "" && playerTwo.recentPlay === "") {
            players = {
                pOnePlay: recentMove,
                pTwoPlay: ""
            }
            database.ref().push(players);
            console.log("player1 " + playerOne.recentPlay)
        }
        else if (playerTwo.recentPlay === "") {
            players = {
                pOnePlay: playerOne.recentPlay,
                pTwoPlay: recentMove,
            }
            database.ref().push(players);
            console.log("player2 " + playerTwo.recentPlay)
        }
    }
});

// determines whether there has been a tie or which player won
function determineResults () {
    // determines whether player one wins
    if (playerOne.recentPlay === "r" && playerTwo.recentPlay === "s" ||
        playerOne.recentPlay === "p" && playerTwo.recentPlay === "r" || 
        playerOne.recentPlay === "s" && playerTwo.recentPlay === "p") {
            // results = "player one wins";
            console.log("p1 wins");
            playerOne.numWins++;
        }
    // determines if there's a tie between player one and player two
    else if (playerOne.recentPlay === playerTwo.recentPlay) {
        // results = "tie";
        console.log("tie");
        numTies++;
    }
    // determines if player two wins
    else {
        console.log("p2 wins");
        // results = "player two wins";
        playerTwo.numWins++;
    }
}

function roundOver () {
    numRounds++;
    // displayResults();
    console.log(numRounds);
    
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

$("#newGame").on("click", function() {
    clearHist();
})


function clearHist () {
    database.ref().remove();
    // $("#player2, #player1").attr("move", "empty");
    // $("tbody").empty();
    // $("#p1Play").empty();
    // $("#p2Play").empty();
    // numRounds = 0;
    // numTies = 0;
    // playerOne.numWins = 0;
    // playerTwo.numWins = 0
}

function newRound (){
    $("#p1Play").empty();
    $("#p2Play").empty();
    $("#player2, #player1").attr("move", "empty");
    $("#p1Play").text("Choose your move");
    players = {
        pOnePlay: "",
        pTwoPlay: "",
    }
    database.ref().push(players);
}


//     var newRow = $("<tr>").append (
//         $("<td>").text(roundNumber),
//         $("<td>").text(gameRes),
//         $("<td>").text(p1wins),
//         $("<td>").text(p2wins),
//         $("<td>").text(tieNumber)
//     );

//     $("tbody").prepend(newRow);
//     changeImage();

// function displayResults () {    
//     $("#newRound").show(); 
//     $("#clearHistory").show();
// }

// function changeImage() {
//     if (playerOne.recentPlay === "r") {
//         $("#player1").attr("move", "rock");
//         console.log($("img"));
//     }
//     if (playerTwo.recentPlay === "r") {
//         $("#player2").attr("move", "rock");
//     }
//     if (playerOne.recentPlay === "p") {
//         $("#player1").attr("move", "paper");
//         console.log($("img"));
//     }
//     if (playerTwo.recentPlay === "p") {
//         $("#player2").attr("move", "paper");
//     }
//     if (playerOne.recentPlay === "s") {
//         $("#player1").attr("move", "scissors");
//         console.log($("img"));
//     }
//     if (playerTwo.recentPlay === "s") {
//         $("#player2").attr("move", "scissors");
//     }
// }

// changeBorders();

// function changeBorders () {
//     if (!pOneHasMoved && !pTwoHasMoved) {
//         $("#p1Play").text("Choose your move");
//         $("#p1Container").css({"border": "10px solid #65BA98"});
//     }
//     else if (pOneHasMoved && !pTwoHasMoved) {
//         $("#p1Play").empty();
//         $("#p1Container").css({"border": "none"});
//         $("#p2Container").css({"border": "10px solid #65BA98"});
//         $("#p2Play").text("Choose your move");
//     }
//     else if (pOneHasMoved && pTwoHasMoved) {
//         $("#p2Container").css({"border": "none"});
//     }
// }