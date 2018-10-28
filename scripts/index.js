$( document ).ready(function() {

    $.get("scripts/jokes.json", function(data){
        var joke = {
            data: data
        }
        random(joke)
    });
        
    function random(joke) {
        var random = Math.floor(Math.random() * joke.data.length)
        joke.question = joke.data[random].Q;
        joke.answer = joke.data[random].A;
        response(joke);
    }

    function response(joke) {       
        $("#q").on("click", function() {
            show_question(joke)
        })
    }

    function show_question(joke) {
        $("#question").text(joke.question)
        $("#punchline").text("")
        $("#a").on("click", function() {
            show_answer(joke)  
        }) 
    }

    function show_answer(joke) {
        $("#punchline").text(joke.answer)
        random(joke)
    }    
})

 