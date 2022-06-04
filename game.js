var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var initial = true;
var level = 0;

$(document).on("keydown", function(event) {
    if (initial) {
        $("h1").text("Level " + level);
        nextSequence(); 
        initial = false;
    }
});

$(".btn").on("click", function() {
    // console.log(gamePattern.length + " " + userClickedPattern.length);
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer (userClickedPattern.length - 1);   
});

function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }

    else {
        var audio1 = new Audio("sounds/wrong.mp3");
        audio1.play();
        $("h1").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 300);

        startOver();
    }

}

function nextSequence () {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

}

function playSound (name) {
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function startOver () {
    $(document).on("keydown", function(event) {
        level = 0;
        gamePattern = [];
        var userClickedPattern = [];
        var initial = true;
        $("h1").text("Press A Key to Start");
    });
}