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
    name: "",
    recentPlay: "",
    numWins: 0,
    turn: true
}

var playerTwo = {
    name: "",
    recentPlay: "",
    numWins: 0,
    turn: false
}

var results = {
    numRounds: 1,
    numTies: 0,
    announce: "",
}


var currentPlayerName = "";

database.ref().child("/players/playerOne").set(playerOne);
database.ref().child("/players/playerTwo").set(playerTwo);
database.ref().child("/results/").set(results);

database.ref("/players/playerOne/recentPlay/").on("value", function(snapshot) {
    playerOne.recentPlay = snapshot.val();
})

database.ref("/players/playerTwo/recentPlay/").on("value", function(snapshot) {
    playerTwo.recentPlay = snapshot.val();
})

database.ref("/players/playerOne/turn/").on("value", function(snapshot) {
    playerOne.turn = snapshot.val();
})

database.ref("/players/playerTwo/turn/").on("value", function(snapshot) {
    playerTwo.turn = snapshot.val();
})

database.ref("/players/playerOne/numWins/").on("value", function(snapshot) {
    playerOne.numWins = snapshot.val();
})
database.ref("/players/playerTwo/numWins/").on("value", function(snapshot) {
    playerTwo.numWins = snapshot.val();
})
database.ref("/results/numTies").on("value", function(snapshot) {
    results.numTies = snapshot.val();
})
database.ref("/results/announce").on("value", function(snapshot) {
    results.announce = snapshot.val();
})


$(document).keyup(function (event) {
    var recentMove = event.key;
    if (recentMove === "r" || recentMove === "p" || recentMove === "s") {
        if (playerOne.turn === true) {
            database.ref().child("/players/playerOne/recentPlay").set(recentMove);
            database.ref().child("/players/playerOne/turn").set(false);
            database.ref().child("/players/playerTwo/turn").set(true);
            console.log("player1 " + playerOne.recentPlay)
        }
        else if (playerTwo.turn === true) {
            database.ref().child("/players/playerTwo/recentPlay").set(recentMove);
            database.ref().child("/players/playerTwo/turn").set(false);
            console.log("player2 " + playerTwo.recentPlay)
            determineResults();
        }
    }
});

$(document).on("click", "#name-btn", function () {
    console.log($("#userName").val());
    event.preventDefault();
})

// determines whether there has been a tie or which player won
function determineResults () {
    // determines whether player one wins
    if (playerOne.recentPlay === "r" && playerTwo.recentPlay === "s" ||
        playerOne.recentPlay === "p" && playerTwo.recentPlay === "r" || 
        playerOne.recentPlay === "s" && playerTwo.recentPlay === "p") {
            var outcome = "player one wins";
            var wins = playerOne.numWins + 1;
            database.ref().child("players/playerOne/numWins").set(wins);
            database.ref().child("/results/announce").set(outcome); 
            console.log("p1 wins");
        }
    // determines if there's a tie between player one and player two
    else if (playerOne.recentPlay === playerTwo.recentPlay) {
        var outcome = "tie";
        var ties = results.numTies +1;
        database.ref().child("/results/announce").set(outcome); 
        // database.ref().child("results/numTies").set(ties);
        console.log(ties); 
    }
    // determines if player two wins
    else {
        var outcome = "player two wins";
        var wins = playerTwo.numWins + 1;
        database.ref().child("players/playerTwo/numWins").set(wins);
        database.ref().child("/results/announce").set(outcome); 
        console.log("p2 wins");
    }
    displayResults();
}

function displayResults () {    
    
    var newRow = $("<tr>").append (
        $("<td>").text(results.numRounds),
        $("<td>").text(results.announce),
        $("<td>").text(playerOne.numWins),
        $("<td>").text(playerTwo.numWins),
        $("<td>").text(results.numTies)
    );

    $("tbody").prepend(newRow);
//     changeImage();
    $("#newRound").show(); 
    $("#clearHistory").show();
}

function newRound (){
    $("#p1Play").empty();
    $("#p2Play").empty();
    $("#player2, #player1").attr("move", "empty");
    $("#p1Play").text("Choose your move");
    database.ref().child("/players/playerOne/turn").set(true);

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