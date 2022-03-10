var stompClient = null;
var playerAmount = 2;
var captchaSolved = false;
var captchaToken = '';


//In order from top to bottom of HTML File



function updateChosenPlayerAmount() {

}



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
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({
        token: captchaToken
    }, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
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

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
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
    });

    //Listen to the change of the hCaptcha, and update when it is changed
    var foo = document.getElementById("captcha").firstChild;
    var observer = new MutationObserver(function(mutations) {
      captchaReponse = document.getElementById("captcha").firstChild.getAttribute("data-hcaptcha-response");
      if(captchaReponse.trim().length > 0) {
        console.log("new captcha: " + captchaReponse);
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
    $( "#send" ).click(function() { sendName(); });
});