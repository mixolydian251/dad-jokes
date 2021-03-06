// State
var punchlineShown = false;
var menuOpen = false;
var control = {
  audio: true,
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
    if (!menuOpen) menu.removeClass("hidden").fadeIn(200);
    else
      menu.fadeOut(150, "linear", function() {
        menu.addClass("hidden");
      });
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

// event handler for audio button
$(".audio_card").on("click", function(event) {
  var targ = event.target.id;
  if (targ=="card2") {
      $("#card2").css("z-index","0")
      control.audio = false;
  } else {
      $("#card2").css("z-index","50");
      control.audio = true;
  }
  console.log(control.audio);
})

// event handler for color button
$(".color_card").on("click", function(event) {
  var theme = {
    yellow: {
      primary: "#fba157",
      secondary: "#fac562",
      font: "#222222",
      card: "#FCC55B"
    },
    purple: {
      primary: "#5B5BFC",
      secondary: "#B38CC3",
      font: "#FAFAFF",
      card: "#6A6ABF"
    },
    blue: {
      primary: "#1FA2FF",
      secondary: "#A6FFCB",
      font: "#F2F7FF",
      card: "#008FA5"
    }
  };
  var targ = event.target.id;
  // red
  if(targ=="card4") {
      $("#card4, #card5, #card6").removeClass("center left right");
      $("#card4").addClass("center");
      $("#card5").addClass("left");
      $("#card6").addClass("right");
      control.color = "purple";
  // yellow
  } else if (targ=="card6") {
      $("#card4, #card5, #card6").removeClass("center left right");
      $("#card6").addClass("center");
      $("#card4").addClass("left");
      $("#card5").addClass("right");
      control.color = "yellow";
  // green
  } else if (targ=="card5") {
      $("#card4, #card5, #card6").removeClass("center left right");
      $("#card5").addClass("center");
      $("#card4").addClass("left");
      $("#card6").addClass("right");
      control.color = "blue"
  }
  var variables = $("html").get(0).style;
  variables.setProperty("--primary", theme[control.color].primary);
  variables.setProperty("--secondary", theme[control.color].secondary);
  variables.setProperty("--card", theme[control.color].card);
  variables.setProperty("--font", theme[control.color].font);
})

