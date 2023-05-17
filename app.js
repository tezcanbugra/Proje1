const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

// Set up body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up session middleware to manage user sessions
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true
}));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <label for="username">Username:</label>
      <input type="text" name="username">
      <br>
      <label for="password">Password:</label>
      <input type="password" name="password">
      <br>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    req.session.username = username;
    res.redirect('/');
  } else {
    res.send('Geçersiz Kullanıcı Adı/Parola');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
