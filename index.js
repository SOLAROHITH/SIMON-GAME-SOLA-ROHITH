
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

var gameStart =0;


$("body").keypress(function(event){

  $("#level-title").text("Level " + level);

  if (gameStart==0){
  nextSequence();
  gameStart = 1;
  }
})
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    var wrongAud = new Audio("./sounds/wrong.mp3");
    wrongAud.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();


  }

}

function startOver(){
  level=0;
  gamePattern =[];
  gameStart = 0;
}

function nextSequence() {

userClickedPattern = [];

level++;
$("#level-title").text("Level " + level);

var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}


function playSound(name){
  var Aud = new Audio("./sounds/"+name+".mp3");

  Aud.play();
}

function animatePress(currenColor){
  $("."+currenColor).addClass("pressed");

  setTimeout(function(){
    $("."+currenColor).removeClass("pressed")
  },100);


}



