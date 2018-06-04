//Array of topics. User Meme requests will get pushed into the array
var topics = ["Crying Jordan", "Deal With It", "Salt Bae", "Doge", "Office Mokey", "LOLcats", "Ermahgerd", "Epic Fail", "Dank", "Viral Moments", "SpongeBob"];

//Function to render the topics array as buttons
function addTopicButtons() {
    $(".btn-box").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<a>").text(topics[i]).attr("class", "query-giphy button is-warning");
        $(".btn-box").append(button);
    }
};

//Function to add a user meme request to the topics array and generate a corresponding button
function addUserButton() {
    event.preventDefault();
    if ($("#mySearch").hasClass("is-danger") && $("#mySearch").val()) {
        $("#mySearch").removeClass("is-danger").addClass("is-info");
    }
    if ($("#mySearch").val()) {
        var userRequestedButton = $("#mySearch").val().trim();
        topics.push(userRequestedButton);
        addTopicButtons();
        $("#mySearch").val("");
    } else {
        $("#mySearch").removeClass("is-info").addClass("is-danger");
    }
};

//Function to either cause meme to animate or be still depending on state
function gifClick() {
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
};

//Function to cause gifs to be displayed if a gif button is clicked
function displayGifs() {
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
};

//Function that initalizes topics array buttons and listens for various clicks 
$("document").ready(function() {

    //render topic buttons from topics array
    addTopicButtons();

    //When the search field is active, listen for press of the enter key
    $("#mySearch").keypress(function(e){
        var key = e.which;
        if (key == 13) {
            addUserButton();
        }
    });

    //add user meme button
    $("#user-search").on("click", addUserButton);

    //display gifs when topic button is selected
    $(".btn-box").on("click", ".query-giphy", displayGifs);

    //listen for clicks on rendered memes to toggle state
    $("#gif-tile-container").on("click", ".gif", gifClick);

});