//all of the main front end state
var playerAmount = 2;
var captchaSolved = false;
var captchaToken = '';
var choosingRoom = true;
var roomId = '';

// create user object
var user = {
userId: "",
nickname: ""
}

// check if user exists
if(window.localStorage.getItem('user') != null){
    var storedUser = JSON.parse(window.localStorage.getItem('user'));
    console.log("stored user")
    user.userId = storedUser.userId
    user.nickname = storedUser.nickname
    console.log("user found")
    console.log(user)
}else{
    user.userId = Math.random().toString(36).substr(2, 9)
    storeUser();
    console.log(user)
}

 // Stores user in the local storage
function storeUser(){
    user.nickname =  $("#nickname").val();
    window.localStorage.setItem('user',JSON.stringify(user));
    console.log("user saved")
}

var players = [{ username: "nerdromere" }, { username: "alexi" }]; //contains players and their guesses
//the format is { id: number, username: string, guesses: [string] }


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

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}


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
        updateView();
        storeUser();
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
    $( "#submitGuess" ).click(function() {
        printRoom();
        sendGuess();
    });
    $( "#submitUser" ).click(function() { storeUser(); });
});