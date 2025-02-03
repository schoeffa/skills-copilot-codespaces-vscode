// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

// Read comments from file
function readComments() {
  const comments = fs.readFileSync(path.join(__dirname, 'comments.json'));
  return JSON.parse(comments);
}

// Write comments to file
function writeComments(comments) {
  fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2));
}

// Middleware
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  const comments = readComments();
  res.json(comments);
});

// Post a new comment
app.post('/comments', (req, res) => {
  const comments = readComments();
  const newComment = req.body;
  comments.push(newComment);
  writeComments(comments);
  res.json(newComment);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});