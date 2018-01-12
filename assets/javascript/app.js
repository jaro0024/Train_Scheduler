
// Ready function


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBDYm-E4nN8eZf0ZqOPCdYJhh0m9pXh4_c",
    authDomain: "bootcamp-v2-adebb.firebaseapp.com",
    databaseURL: "https://bootcamp-v2-adebb.firebaseio.com",
    projectId: "bootcamp-v2-adebb",
    storageBucket: "bootcamp-v2-adebb.appspot.com",
    messagingSenderId: "163116769103"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
// var currentTime = moment();

// Initial values
var trainName = "";
var destination = "";
var firstTrain = "";
var trainFrequency = "";

// Capture Button Click
$("#add-train").on("click", function () {
    event.preventDefault();

    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#time-input").val().trim();
    // firstTrain = moment($("#time-input").val().trim(),"HH:mm").format("HH:mm");
    trainFrequency = $("#frequency-input").val().trim();

    //clear input fields after submit
    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        trainFrequency: trainFrequency,
    });
});

database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().trainFrequency;

    // var nextTrain = ;
    // var minToTrain = ;

    $("#train-table>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td></tr>");

    // "</td><td>" + nextTrain  + "</td><td>" + minToTrain + 

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

});

