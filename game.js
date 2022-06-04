var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var counter = 0;
var level = 0;
var checker = 0;

$(document).on("keydown", function(event) {
    if (counter === 0) {
        $("h1").text("Level " + level);
        nextSequence(); 
        counter++;
    }
});

$(".btn").on("click", function() {
    console.log(gamePattern.length + " " + userClickedPattern.length);
    if (gamePattern.length >= userClickedPattern.length) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer (userClickedPattern.length - 1);   
    }
});

function checkAnswer (currentLevel) {

    console.log(gamePattern);
    console.log(userClickedPattern);
    // if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //     console.log("success");
    //     if (gamePattern.length === userClickedPattern.length){
    //         console.log("real success");
    //         setTimeout(function () {
    //             nextSequence();
    //           }, 1000);
    //     }
    // }

    // else {
    //     console.log("lost...");
    // }
    for(var i = 0; i <= currentLevel; ++i) {
        if (gamePattern[i] === userClickedPattern[i]) {
            checker++;
            // console.log(userClickedPattern);
            }
        
        else {
            console.log("lost...");
        }
    }

    console.log(checker + "checker");
    console.log(level + "level");

    if(checker === level) {
        console.log("real success");
        
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
}

function nextSequence () {
    userClickedPattern = [];
    checker = 0;
    console.log(userClickedPattern.length);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    $("h1").text("Level " + level);
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