// Create web server
// Run: node comments.js
// Test: curl -X POST -H "Content-Type: application/json" -d '{"body":"Hello, World!"}' http://localhost:3000/comments
// Test: curl http://localhost:3000/comments

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Use the body-parser middleware to parse the body of the request
app.use(bodyParser.json());

// Create an array of comments
var comments = [{ "body": "Hello, World!" }];

// Create a route for the URL /comments
app.route('/comments')
    // Create a new comment
    .post(function (req, res) {
        comments.push(req.body);
        res.status(201).json(req.body);
    })
    // Return all comments
    .get(function (req, res) {
        res.json(comments);
    });

// Create a route for the URL /comments/:index
app.route('/comments/:index')
    // Update a specific comment
    .put(function (req, res) {
        comments[req.params.index] = req.body;
        res.json(req.body);
    })
    // Delete a specific comment
    .delete(function (req, res) {
        comments.splice(req.params.index, 1);
        res.status(204).send();
    });

// Start the server
app.listen(3000, function () {
    console.log('Listening on port 3000');
});