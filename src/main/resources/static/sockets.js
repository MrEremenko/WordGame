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

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

function getRoom() {
    stompClient.send("/app/connectRoom", {}, "Test");
}

function showGuess(message) {
    $("#guess").append("<tr><td>" + JSON.parse(message.body).guess + "</td></tr>");

}

function setRoom(room) {
    roomId = JSON.parse(room.body).roomId;
    stompClient.subscribe('/room/' + roomId, showGuess);
}

function updateRoom() {
    if(choosingRoom) {
        stompClient.unsubscribe("/room/" + roomId);
    } else {
        stompClient.subscribe('/app/roomId', setRoom);
    }
}

function addPlayer(player) {
    playersAndGuesses.push(player);
}

function makeGuess(word) {

}
