//This function creates the area where you'll see all the players
function createPlayArea() {
//    var name = document.createElement("div");
//    name.classList.add("col");
//    name.innerText = $("#name").val();
//    $("#playerNames").append(name);

    for(var i = 0; i < playerAmount; i++) {
        var colForSpinner = document.createElement("div");
        colForSpinner.classList.add("col");
        colForSpinner.classList.add("d-flex");
        colForSpinner.classList.add("flex-column");
        colForSpinner.classList.add("align-items-center");
        var another = document.createElement("div");
        another.id = "player" + (i + 1);
        another.classList.add("spinner-border");
        another.setAttribute("role", "status");
        var inside = document.createElement("span");
        inside.classList.add("visually-hidden");
        inside.innerText = "Loading...";
        another.appendChild(inside);
        colForSpinner.appendChild(another);
        $("#playerNames").append(colForSpinner);
    }

    //now replace the spinners with any available players...
    for(let i = 0; i < players.length; i++) {
        //remove jspinner
        console.log($("#playerNames").children().eq(i).children().remove();
        //add a name
        let name = document.createElement("div");
        name.innerText = players[i].username;
        $("#playerNames").children()[i].append(name);
    }
}

function removePlayArea() {
    $("#playerNames").children().remove();
}

function updateView () {
    if(choosingRoom) {
        //update buttons
        $("#player-amount").removeClass("disabled");
        $("#2-players-button").prop("disabled", false);
        $("#3-players-button").prop("disabled", false);
        $("#4-players-button").prop("disabled", false);

        //update go button
        $("#go-button").removeClass("btn-danger");
        $("#go-button").addClass("btn-success");
        $("#go-button").text("Go");

        //update player area
        removePlayArea();

        //update waiting label
        $("#countdown").text("");
    } else {
        //if its still there, remove it
        if($("#captcha")) {
            $("#captcha").remove();
        }

        //update buttons
        $("#player-amount").addClass("disabled");
        $("#2-players-button").prop("disabled", "disabled");
        $("#3-players-button").prop("disabled", "disabled");
        $("#4-players-button").prop("disabled", "disabled");

        //update go button
        $("#go-button").removeClass("btn-success");
        $("#go-button").addClass("btn-danger");
        $("#go-button").text("Leave");

        //update player area
        createPlayArea();

        //update waiting label
        $("#countdown").text("Waiting for players");
    }
}
