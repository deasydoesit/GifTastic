var topics = ["But That's None of My Business", "Be Like Bill", "U Mad Bro", "Doge", "Good Guy Greg", "LOLcats", "Ermahgerd", "Epic Fail", "Dramatic Chipmunk", "Savage Patrick", "SpongeBob NoPants"];

function addTopicButtons() {
    $(".btn-box").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>").text(topics[i]).prop("class", "query-giphy");
        $(".btn-box").append(button);
    }
};

function addUserButton(event) {
    event.preventDefault();
    var userRequestedButton = $("#mySearch").val().trim();
    topics.push(userRequestedButton);
    addTopicButtons();
};

$("document").ready(function() {

    addTopicButtons();

    $("#user-search").on("click", function(event){
        addUserButton(event);
    });

    $(".btn-box").on("click", ".query-giphy", function() {
        var search = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            search + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(personImage);

                $("#gifs-appear-here").prepend(gifDiv);
            }
        });
    });

});