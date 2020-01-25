const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'pranjal',
    email: 'pranjalD@gmail.com'
  }

  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({
      token
    });
  });
});


// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // I Checked if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // splits in array
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

app.listen(5000, () => console.log('Server started on port 5000'));