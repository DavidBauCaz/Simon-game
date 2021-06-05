var buttonColors = ["red", "blue", "green", "yellow"];
var colorSequence = [];
var userSequence = [];
var started = false;
var level = 0;

//key listener to detect if the user pressed a key to start
//the game
$(document).keydown(function(){
  userSequence = [];
  if(!started){
    started = true;
    nextSequence();
    $("#level-title").text("level " + level);
  }
});

//click listener to detect wich color button was pressed
$(".btn").click(function(){
  let btnId = $(this).attr("id");
  userSequence.push(btnId);

  if(!checkAnswer(userSequence.length) && started){
    console.log("no son iguales");
    playSound("wrong");
    started = false;
    level = 0;
    userSequence = [];
    colorSequence = [];
    $("#level-title").text("Game over. Press any button to restart");
  }

  if(userSequence.length === colorSequence.length){
    userSequence = [];
    setTimeout(nextSequence, 1000);
  }

  btnAnimation(btnId);
  playSound(btnId);
  console.log("Secuencia: " + colorSequence);
  console.log("input: " + userSequence);
});

//gives the now color to be pressed and increase the level number
function nextSequence(){
  if(started){
    level++;
    $("#level-title").text("level " + level);
    let rnd = ~~(Math.random()*4);
    console.log("Se obtuvo el color :" + buttonColors[rnd])
    colorSequence.push(buttonColors[rnd]);
    btnAnimation(buttonColors[rnd]);
    playSound(buttonColors[rnd]);
  }
}

//animation to tell the user wich color should be pressed
//or wich button the user pressed
function btnAnimation(btnColor){
  $("#" + btnColor).fadeOut(100).fadeIn(100);
}

//Play any sound from the sounds folder
function playSound(sound){
  let btnsound = new Audio("sounds/" + sound + ".mp3");
  btnsound.play();
}

//checks if the button pressed by the user is the same as The
//color that has to be clicked
function checkAnswer(index){
  return colorSequence[index-1] === userSequence[index-1];
}
