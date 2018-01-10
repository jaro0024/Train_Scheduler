
// Initialize Firebase
var config = {
    apiKey: "AIzaSyA-xVk3PolrpsTRTQSPzATxEQZO3_VBp-A",
    authDomain: "bootcamp-d0dc7.firebaseapp.com",
    databaseURL: "https://bootcamp-d0dc7.firebaseio.com",
    projectId: "bootcamp-d0dc7",
    storageBucket: "bootcamp-d0dc7.appspot.com",
    messagingSenderId: "679568646175"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
// var currentTime = moment();

// Initial values
var trainName = "";
var destination = "";
var trainTime = "";
var trainFrequency = "";

// Capture Button Click
$("#add-train").on("click", function () {
    event.preventDefault();

    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    trainTime = $("#time-input").val().trim();
    trainFrequency = $("#frequency-input").val().trim();

    database.ref().set({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        trainFrequency: trainFrequency
    });
});

database.ref().on("value", function (snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().trainTime);
    console.log(snapshot.val().trainFrequency);

    // Change the HTML to reflect
    $("#trainName-display").text(snapshot.val().trainName);
    $("#destination-display").text(snapshot.val().destination);
    $("#trainTime-display").text(snapshot.val().trainTime);
    $("#frequency-display").text(snapshot.val().trainFrequency);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

})

