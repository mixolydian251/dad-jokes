// Helper functions
function generateRandomJoke(jokes) {
  var jokeId = Math.floor(Math.random() * jokes.length);
  $("#question").text(jokes[jokeId].Q);
  $("#punchline").text(jokes[jokeId].A);
}

function handleClick(jokes) {
  var question = $("div.card__question");
  var punchline = $("div.card__punchline");
  $("section.joke-container").click(function() {
    if (punchlineShown) generateRandomJoke(jokes);
    question.toggleClass("card__question--show");
    punchline.toggleClass("card__punchline--show");
    punchlineShown = !punchlineShown;
    if (punchlineShown) {
        var track = Math.ceil(Math.random() * 4);
        console.log(track)
        track = "../assets/audio/laugh_"+track+".wav";
        setTimeout(function(){ 
            new Audio(track).play() }, 2000);
        }
    });
}

// State
var punchlineShown = false;

// On mount
$(document).ready(function() {
  $.get("scripts/jokes.json", function(jokes) {
    generateRandomJoke(jokes);
    handleClick(jokes);
  });
});