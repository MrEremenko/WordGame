var stompClient = null;

function connect() {
    var socket = new SockJS('/connect');
    stompClient = Stomp.over(socket);
    stompClient.connect({
        token: captchaToken
    }, function (frame) {
        console.log('Connected: ' + frame);
//        stompClient.subscribe('/topic/greetings', function (greeting) {
//            showGreeting(JSON.parse(greeting.body).content);
//        });
        updateRoom();
    });

}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
}

function sendGuess() {
    console.log("guess submitted");
    console.log(JSON.stringify({'userId': $("#userId").val(), 'guess': $("#userGuess").val()}));
    stompClient.send("/app/game/" + roomId, {},
     JSON.stringify({'userId': $("#userId").val(), 'guess': $("#userGuess").val()}))
}

function getRoom() {
    stompClient.send("/app/getRoom", {}, "Test");
}

function showGuess(message) {
    $("#guess").append("<tr><td>" + JSON.parse(message.body).guess + "</td></tr>");
}

var doSomethingWithRoom = function (room) {
    console.log("Ok, hit doSOmething");
    console.log(room);

//        START("START"),
//        READY("READY"),
//        GUESS("GUESS"),
//        NEWROUND("NEW ROUND"),
//        WAITING("WAITING"),
//        ENDGAME("END GAME");
// These are the commands so far. They have corresponding objects that are returned with them.
// START returns with Room object
// READY returns with Player object who is ready
// GUESS returns with PlayerGuess object who sent te guess
// WAITING returns with Room object
// NEWROUND and ENDGAME are not implemented yet


}

var setRoom = function (room) {
    console.log("I'm in setRoom().");
    roomId = JSON.parse(room.body).roomId;
    stompClient.subscribe('/app/room/' + roomId, doSomethingWithRoom, {'username' : 'testUsername', 'id' : 'testId'});
}

function updateRoom() {
    if(choosingRoom) {
        stompClient.unsubscribe("app/room/" + roomId);
        stompClient.unsubscribe('/app/getRoom/' + playerAmount);
    } else {
        console.log("subbing to getRoom")
        stompClient.subscribe('/app/getRoom/' + playerAmount, setRoom);
    }
}

function addPlayer(player) {
    playersAndGuesses.push(player);
}

function sendGuess() {
    console.log("guess submitted");
    console.log(JSON.stringify({'userId': "testId", 'guess': $("#userGuess").val()}));
    stompClient.send("/app/guess/" + roomId, {}, JSON.stringify({'userId': "testId", 'guess': $("#userGuess").val()}))
}