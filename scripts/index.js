// State
var punchlineShown = false;
var menuOpen = false;
var control = {
  audio: false,
  color: "yellow"
};

// On mount
$(document).ready(function() {
  readJokes();
  handleMenuClick();
});

function readJokes() {
  $.get("data/formatted_jokes.json", function(jokes) {
    generateRandomJoke(jokes);
    handleJokeClick(jokes);
  });
}

// Helper functions
function generateRandomJoke(jokes) {
  var jokeId = Math.floor(Math.random() * jokes.length);
  $("#question").text(jokes[jokeId].Q);
  $("#punchline").text(jokes[jokeId].A);
  $("#joke-id").text(`#${jokeId}`);
}

function handleJokeClick(jokes) {
  var question = $("div.card__question");
  var punchline = $("div.card__punchline");

  // Next joke event
  $("section.joke-container").on("click", function(event) {
    if (punchlineShown) generateRandomJoke(jokes);
    question.toggleClass("card__question--show");
    punchline.toggleClass("card__punchline--show");
    punchlineShown = !punchlineShown;

    // Audio controls
    if (punchlineShown && control.audio) {
      var track = Math.ceil(Math.random() * 4);
      track = "../assets/audio/laugh_" + track + ".wav";
      setTimeout(function() {
        new Audio(track).play();
      }, 1200);
    }
  });
}

function handleMenuClick() {
  var menu = $(".menu");
  $(".menu__button").on("click", function() {
    animateMenuIcon();
    if (!menuOpen) menu.removeClass("hidden");
    else menu.addClass("hidden");
    menuOpen = !menuOpen;
  });
}

function animateMenuIcon() {
  var top = $("#menu__line--top");
  var mid = $("#menu__line--middle");
  var bottom = $("#menu__line--bottom");
  if (menuOpen) {
    top.removeClass("line__top--open");
    mid.removeClass("line__middle--open");
    bottom.removeClass("line__bottom--open");
  } else {
    top.addClass("line__top--open");
    mid.addClass("line__middle--open");
    bottom.addClass("line__bottom--open");
  }
}

$(".menu__audio").change(function() {
  var display_audio;
  control.audio = $("#cb:checked").val();
  if (control.audio == undefined) {
    control.audio = false;
    display_audio = "Audio Off";
  } else {
    control.audio = true;
    display_audio = "Audio On";
  }
  $("#audio__state").text(display_audio);
});

$("select").change(function() {
  var theme = {
    yellow: {
      primary: "#fba157",
      secondary: "#fac562"
    },
    purple: {
      primary: "#5B5BFC",
      secondary: "#B38CC3"
    },
    blue: {
      primary: "#1FA2FF",
      secondary: "#A6FFCB"
    }
  };

  control.color = $(".menu__dropdown")
    .find(":selected")
    .text()
    .trim()
    .toLowerCase();

  // Maps CSS varibles to the theme object above
  var variables = $("html").get(0).style;
  variables.setProperty("--primary", theme[control.color].primary);
  variables.setProperty("--secondary", theme[control.color].secondary);
});
