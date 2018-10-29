// Helper functions
function generateRandomJoke(jokes) {
  var jokeId = Math.floor(Math.random() * jokes.length);
  $("#question").text(jokes[jokeId].Q);
  $("#punchline").text(jokes[jokeId].A);
  $("#joke-id").text(`#${jokeId}`);
}

function handleClick(jokes) {
  var question = $("div.card__question");
  var punchline = $("div.card__punchline");
  $("section.joke-container").click(function() {
    if (punchlineShown) generateRandomJoke(jokes);
    question.toggleClass("card__question--show");
    punchline.toggleClass("card__punchline--show");
    punchlineShown = !punchlineShown;
  });
}

// State
var punchlineShown = false;

// On mount
$(document).ready(function() {
  $.get("data/formatted_jokes.json", function(jokes) {
    generateRandomJoke(jokes);
    handleClick(jokes);
  });
});
