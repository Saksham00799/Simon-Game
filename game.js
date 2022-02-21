var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var started=false;
var level=0;
var ruleOpen=false;
$(".rules").hide();
$(document).keypress(function(){
   if(!started){
     if(ruleOpen===true){
       $(".rules").hide();
       $(".container").show();
     }
      $("#level-title").text("Level "+level);
      $(".btn-rules").hide();
      nextSequence();
      started=true;
   }
});
$("#btn-r").click(function(){
  $(".rules").fadeToggle();
  $(".container").fadeToggle();
  ruleOpen=true;
})
function checkAnswer(currentLevel){
   if(gamePattern[currentLevel]===uesrClickedPattern[currentLevel]){
      console.log("success");
      if(gamePattern.length===uesrClickedPattern.length){
         setTimeout(function(){nextSequence();},500);
      }
   }
   else{

      console.log("wrong");
      playSound("wrong");
      ruleOpen=true;
      $("#level-title").text("Game Over, Press Any Key to Restart");
      if(ruleOpen===true){
        $(".btn-rules").show();
      }
      $("body").addClass("game-over");
      setTimeout(function(){$("body").removeClass("game-over");},200);
      startover();
      // setTimeout(() => {  $("body").removeClass("game-over"); }, 500);
      // setTimeout(() => {  $("body").addClass("game-over"); }, 500);
      // setTimeout(() => {  $("body").removeClass("game-over"); }, 500);
   }
}

function startover(){
   started=false;
   level=0;
   gamePattern=[];
   uesrClickedPattern=[];
}
function nextSequence(){
   // uesrClickedPattern=[];
   level++;
   $("#level-title").text("Level "+level);
   var randomNumber=Math.floor(Math.random()*4);
   // console.log(randomNumber);
   var randomChosenColour=buttonColours[randomNumber];
   // console.log(randomChosenColour);
   gamePattern.push(randomChosenColour);
   // console.log(gamePattern[0]);
   $("#" + randomChosenColour).addClass("next");
   setTimeout(() => {  $("#"+randomChosenColour).removeClass("next"); }, 100);
   // $("#"+randomChosenColour).animateHighlight("#dd0000", 1000);
   // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
   console.log(randomChosenColour);
   playSound(randomChosenColour);
   // audio.play();
}
var uesrClickedPattern=[];

$(".btn").click(function(){
   var userChosenColor=$(this).attr("id");
   // console.log(userChosenColor);
   uesrClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
   animatePressed(userChosenColor);
   checkAnswer(uesrClickedPattern.length-1);
});

function playSound(name){
   var audio=new Audio("sounds/"+name+".mp3");
   audio.play();
}

function animatePressed(currentColor){
   $("#"+currentColor).addClass("pressed");
   setTimeout(() => {  $("#"+currentColor).removeClass("pressed"); }, 100);
   // setTimeout($(currentColor).removeClass("pressed"),1000);
   // sleep(1000).then($(currentColor).removeClass("pressed"));
}
