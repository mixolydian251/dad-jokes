$( document ).ready(function() {
    $.get("scripts/jokes.json", function( data ) {
        $("#question").text(data[0].Q)
        $("#punchline").text(data[0].A)
    })
})