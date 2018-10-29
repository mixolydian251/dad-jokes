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

// function openMenu(jokes) {
//   var jokes = jokes.data.jokes;
//   $("section.joke-container").off("click");
//   $(".card").css("transform", "scale(1.5)");
//   $("#joke-id").hide();

//   // Build checkbox
//   $("#audio")
//     .text("Audio Off")
//     .append(
//       $("<input />", {
//         type: "checkbox",
//         class: "cb",
//         value: "off"
//       })
//     );
//   $(".cb").css({
//     transform: "scale(2.5)",
//     "margin-left": "10%",
//     "margin-bottom": "15%"
//   });

//   // Build dropdown
//   var quest = $("#question");
//   quest.text("Color Theme ");
//   var dropdown = $("<select>", { id: "color" })
//     .append($("<option>").text("red"))
//     .append($("<option>").text("green"))
//     .append($("<option>").text("pink"));
//   dropdown.css({
//     transform: "scale(1.25)"
//   });
//   quest.append(dropdown);

//   // Build return
//   $("#extra").css({
//     "margin-top": "15%"
//   });

//   // Read values on return
//   $("#extra")
//     .text("Return")
//     .one("click", function(event) {
//       //audio
//       control.audio = $(".cb:checked").val();
//       if (control.audio == undefined) {
//         control.audio = "on";
//       }
//       // Color
//       control.color = $("#color")
//         .find(":selected")
//         .text();
//       closeMenu(jokes);
//     });
// }

// function closeMenu(jokes) {
//   $("#extra")
//     .text("Return")
//     .off("click");
//   jokes == undefined ? jokes.data.jokes : jokes;
//   $("#joke-id").show();
//   $("#audio").text("");
//   $("#extra").text("");
//   $(".card").removeAttr("style");
//   $("body").css("background-color", control.color);
//   readJokes();
// }
