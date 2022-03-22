//all of the main front end state
var playerAmount = 2;
var captchaSolved = false;
var captchaToken = '';
var choosingRoom = true;
var roomId = '';
var players = []; //contains players and their guesses
//the format is { id: number, username: string, guesses: [string] }


function printRoom() {
    console.log("RoomId: " + roomId);
}

//Main thing to add all the event listeners
$(function () {

    //On player amount switch
    $("#player-amount").click((e) => {
        if(choosingRoom) {
            playerAmount = +e.target.getAttribute("value");
            $('#2-players-button').prop("checked", false);
            $('#3-players-button').prop("checked", false);
            $('#4-players-button').prop("checked", false);
            $("#" + playerAmount + '-players-button').prop("checked", true);
        }
    });

    //Once the Go button is clicked
    $("#go-button").click((e) => {
        choosingRoom = !choosingRoom;
        updateView(); //in GUIChanges.js
        if(!stompClient) {
            connect()
        } else {
            updateRoom(); //in socket.js
        }
    });

//    $("#banner-area").click((e) => {
//    console.log("WHATTTTT!!!???");
       //Listen to the change of the hCaptcha, and update when it is changed
       var foo = document.getElementById("captcha").firstChild;
       console.log(foo);
       var observer = new MutationObserver(function(mutations) {
           if(document.getElementById("captcha")) {
               captchaReponse = document.getElementById("captcha").firstChild.getAttribute("data-hcaptcha-response");
               if(captchaReponse.trim().length > 0) {
                   console.log("new captcha: " + captchaReponse);
                   captchaToken = captchaReponse;
                   captchaSolved = true;
                   $('#go-button').prop("disabled", false);
               }
           }
       });

       observer.observe(foo, {
         attributes: true,
         attributeFilter: ['data-hcaptcha-response']
       });

//    });



    $("form").on('submit', function (e) {
        e.preventDefault();
    });

    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() {
        sendName();
        printRoom();
        sendGuess();
    });
});