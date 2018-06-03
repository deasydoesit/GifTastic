var topics = ["But That's None of My Business", "Be Like Bill", "U Mad Bro", "Doge", "Good Guy Greg", "LOLcats", "Ermahgerd", "Epic Fail", "Dramatic Chipmunk", "Savage Patrick", "SpongeBob NoPants"];

function addTopicButtons() {
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>").text(topics[i]).prop("class", "query-giphy");
        $(".btn-box").append(button);
    }
}

$("document").ready(function() {
    addTopicButtons();

    $(".query-giphy").on("click", function(){
        console.log($(this).text());
    })

});