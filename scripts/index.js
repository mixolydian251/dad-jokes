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
console.log(control.audio)
    // Audio controls
    if (punchlineShown && control.audio) {
      console.log(control.audio)
      var track = Math.ceil(Math.random() * 4);
      console.log(track);
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
    display_audio = "Audio Off"
  } else { 
    control.audio = true;
    display_audio = "Audio On"}
    $("#audio__state").text(display_audio);
  })
   
$("select").change( function() {
  control.color = $(".menu__dropdown").find(":selected").text().trim();
  $("body").css("background-color", control.color);
})


$(".audio_card").on("click", function(event) {
  var targ = event.target.id;
  console.log(targ)
  if (targ=="card2") {
      $("#card2").css("z-index","0")
      control.audio = true;
  } else {
      $("#card2").css("z-index","50");
      control.audio = false;
  }
})

$(".color_card").on("click", function(event) {
  var targ = event.target.id;
  console.log(targ)
  if(targ=="card4") {
      $("#card4, #card5, #card6").removeClass("center left right");
      $("#card4").addClass("center");
      $("#card5").addClass("left");
      $("#card6").addClass("right");
      control.color="red";
      console.log(control.color)
      $(".menu").css("background", control.color);
      $("body").css("background-color", control.color);
  } else if (targ=="card6") {
      $("#card4, #card5, #card6").removeClass("center left right");
      $("#card6").addClass("center");
      $("#card4").addClass("left");
      $("#card5").addClass("right");
      control.color="yellow"
      console.log(control.color)
      $(".menu").css("background", control.color);
      $("body").css("background-color", control.color);
  } else if (targ=="card5") {
      $("#card4, #card5, #card6").removeClass("center left right");
      $("#card5").addClass("center");
      $("#card4").addClass("left");
      $("#card6").addClass("right");
      control.color="green"
      console.log(control.color)
      $(".menu").css("background", control.color);
      $("body").css("background-color", control.color);
  }
})
 
