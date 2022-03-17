var stompClient = null;
var playerAmount = 2;
var captchaSolved = false;
var captchaToken = '';
var roomId = '';


//This function creates the area where you'll see all the players
function createPlayArea() {
    var name = document.createElement("div");
    name.classList.add("col");
    name.innerText = "Me";
    $("#playerNames").append(name);

    for(var i = 0; i < playerAmount - 1; i++) {
        var colForSpinner = document.createElement("div");
        colForSpinner.classList.add("col");
        var another = document.createElement("div");
        another.classList.add("spinner-border");
        another.setAttribute("role", "status");
        var inside = document.createElement("span");
        inside.classList.add("visually-hidden");
        inside.innerText = "Loading...";
        another.appendChild(inside);
        colForSpinner.appendChild(another);
        $("#playerNames").append(colForSpinner);
    }
}

//In order from top to bottom of HTML File
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/connect');
    stompClient = Stomp.over(socket);
    stompClient.connect({
        token: captchaToken
    }, function (frame) {
        setConnected(true);
        stompClient.subscribe('/room/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
        stompClient.subscribe('/app/roomId', setRoom);
    });

}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

function getRoom() {
    stompClient.send("/app/connectRoom", {}, "Test");
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

var setRoom = function (room) {
    roomId = JSON.parse(room.body).roomId;
}

function printRoom() {
    console.log("RoomId: " + roomId);
}

//Main thing to add all the event listeners
$(function () {

    //On player amount switch
    $("#player-amount").click((e) => {
        playerAmount = +e.target.getAttribute("value");
        $('#2-players-button').prop("checked", false);
        $('#3-players-button').prop("checked", false);
        $('#4-players-button').prop("checked", false);
        $("#" + playerAmount + '-players-button').prop("checked", true);
    });

    //Once the Go button is clicked
    $("#go-button").click((e) => {
        connect()
        createPlayArea();

    });

    //Listen to the change of the hCaptcha, and update when it is changed
    var foo = document.getElementById("captcha").firstChild;
    console.log(foo);
    var observer = new MutationObserver(function(mutations) {
      captchaReponse = document.getElementById("captcha").firstChild.getAttribute("data-hcaptcha-response");
      if(captchaReponse.trim().length > 0) {
        console.log("new captcha: " + captchaReponse);
        captchaToken = captchaReponse;
        captchaSolved = true;
        $('#go-button').prop("disabled", false);
      }
    });

    observer.observe(foo, {
      attributes: true,
      attributeFilter: ['data-hcaptcha-response']
    });


    $("form").on('submit', function (e) {
        e.preventDefault();
    });

    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() {
                sendName();
                printRoom();
        });
});