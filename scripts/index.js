// State
var punchlineShown = false;
var control = {
    audio: "on",
    color: "yellow"
}
 
// On mount
$(document).ready(function() {
    readJokes()
});

function readJokes() {
    $.get("data/formatted_jokes.json", function(jokes) {
      generateRandomJoke(jokes);
      handleClick(jokes);
    })}

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
  // menu / joke click
  $("menu").one("click", {jokes: jokes}, openMenu);   
  $("section.joke-container").on("click", function(event) {
    
    if (punchlineShown) generateRandomJoke(jokes);
    question.toggleClass("card__question--show");
    punchline.toggleClass("card__punchline--show");
    punchlineShown = !punchlineShown;
    // audio controls
    console.log(control.audio)
    if (punchlineShown && (control.audio === "on")) {
        var track = Math.ceil(Math.random() * 4);
        console.log(track)
        track = "../assets/audio/laugh_"+track+".wav";
        setTimeout(function(){ 
            new Audio(track).play() 
        }, 1200);
    }
  });
}    

function openMenu (jokes) {
    var jokes = jokes.data.jokes;
    $("section.joke-container").off("click");
    $(".card").css("transform", "scale(1.5)");
    $("#joke-id").hide();
    // build checkbox
    $("#audio").text("Audio Off")
        .append($('<input />', { 
            type: 'checkbox', 
            class: 'cb', 
            value: "off" 
        }))
    $(".cb").css({
        "transform": "scale(2.5)", 
        "margin-left":"10%", 
        "margin-bottom":"15%"
    })
    // build dropdown
    var quest = $("#question")
    quest.text("Color Theme ")
    var dropdown = ($('<select>', {id: 'color'}))
        .append($('<option>').text("red"))
        .append($('<option>').text("green"))
        .append($('<option>').text("pink"))
    dropdown.css({
        "transform": "scale(1.25)"
    })
    quest.append(dropdown)
    // build return
    $("#extra").css({
        "margin-top": "15%"
    });
    // read values on return
    $("#extra").text("Return").one("click", function(event) {
        //audio
        control.audio = $('.cb:checked').val();
        if (control.audio == undefined) {control.audio = "on"};
        //color
        control.color = $('#color').find(":selected").text();         
        closeMenu(jokes)
    })
}

function closeMenu(jokes) {
    $("#extra").text("Return").off("click")
    jokes == undefined ? jokes.data.jokes : jokes;
    $("#joke-id").show();
    $("#audio").text("");
    $("#extra").text("")
    $(".card").removeAttr("style");
    $("body").css("background-color", control.color);
    readJokes();
}
 


  