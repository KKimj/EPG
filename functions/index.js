const functions = require('firebase-functions');
var bodyParser = require('body-parser')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});


exports.helloWorld_2 = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.blk = functions.https.onRequest((request, response) => {
    response.send( request.body.text + "Hello");
});
   
   
