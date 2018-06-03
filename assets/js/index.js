var topics = ["Crying Jordan", "Deal With It", "Salt Bae", "Doge", "Office Mokey", "LOLcats", "Ermahgerd", "Epic Fail", "Dank", "Viral Moments", "SpongeBob"];

function addTopicButtons() {
    $(".btn-box").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<a>").text(topics[i]).prop("class", "query-giphy button is-warning");
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
            search + "&rating=pg13&api_key=dc6zaTOxFJmzC&limit=9";

        $("#gif-tile-container").empty();

        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            console.log(response);
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
                gif.addClass("gif");
                gif.attr("src", results[i].images.fixed_height_still.url);
                gif.attr("data-still", results[i].images.fixed_height_still.url);
                gif.attr("data-animate", results[i].images.fixed_height.url);
                gif.attr("data-state", "still");


                gifChildDiv.prepend(p);
                gifChildDiv.prepend(gif);

                gifParentDiv.append(gifChildDiv);
                gifAncestorDiv.append(gifParentDiv);

                $("#gif-tile-container").append(gifAncestorDiv);
            }
        });
    });

    $("#gif-tile-container").on("click", ".gif", function() {
          var state = $(this).attr("data-state");
        
          if (state == "still") {
            var animate = $(this).attr("data-animate");
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
          } else {
            var still = $(this).attr("data-still");
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
          }
      });

});