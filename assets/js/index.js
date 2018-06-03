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
            search + "&api_key=dc6zaTOxFJmzC&limit=9";

        $("#gif-tile-container").empty();

        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            var gifAncestorDiv = $("<div class='tile is-ancestor' id='gif-ancestor-div-0'>");
    
            for (var i = 0; i < results.length; i++) {
                var gifChildDiv = $("<div class='tile is-child box'>");

                var gifParentDiv = $("<div class='tile is-parent'>");
                gifParentDiv.prop("id", "gifs-appear-here-" + i);

                if (i % 3 === 0) {
                    gifAncestorDiv = $("<div class='tile is-ancestor'>");
                    gifAncestorDiv.prop("id", "gif-ancestor-div-" + i);
                }

                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);

                var gif = $("<img>");
                gif.attr("src", results[i].images.fixed_height.url);

                gifChildDiv.prepend(p);
                gifChildDiv.prepend(gif);

                gifParentDiv.append(gifChildDiv);
                gifAncestorDiv.append(gifParentDiv);

                $("#gif-tile-container").append(gifAncestorDiv);
            }
        });
    });

});