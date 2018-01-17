

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

// Initial Values
var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFrequency = "";

// Button For Adding Trains
$("#add-train").on("click", function () {
    event.preventDefault();

    // Grabs User Input
    trainName = $("#trainName-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    trainTime = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
    trainFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var train = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    // Uploads train data to the database
    database.ref().push(train);

    //clear input fields after submit
    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

// Create Firebase event for adding train data to the database and a row in the HTML when a user adds an entry
database.ref().on("child_added", function (snapshot) {

    // Store everything into variables
    var trainName = snapshot.val().name;
    var trainDestination = snapshot.val().destination;
    var trainTime = snapshot.val().time;
    var trainFrequency = snapshot.val().frequency;

    // First Train Time 
    var firstTimeConverted = moment(trainTime, "HH:mm");

    // Current Time
    var currentTime = moment();

    // Difference Between Train Times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Train Time Apart (remainder)
    var timeRemainder = diffTime % trainFrequency;

    // Minutes Until Next Train
    var minUntilTrain = trainFrequency - timeRemainder;
    
    // Next Train Arrival
    var nextTrain = moment().add(minUntilTrain, "minutes").format("HH:mm");
    
    // Add each train's data into the table
    $("#train-table>tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + 
    nextTrain  + "</td><td>" + minUntilTrain + "</td></tr>");

    // Handle Errors Function
}, function (errorObject) {

});

