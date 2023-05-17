const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(express.static('public'));
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
  res.sendFile(__dirname + '/pages/index.html');
});
app.get('/ozgecmis', (req, res) => {
  res.sendFile(__dirname + '/pages/ozgecmis.html');
});
app.get('/iletisim', (req, res) => {
  res.sendFile(__dirname + '/pages/iletisim.html');
});

app.get('/ilgiAlanlarim', (req, res) => {
  res.sendFile(__dirname + '/pages/ilgiAlanlarim.html');
});

app.get('/benimSehrim', (req, res) => {
  res.sendFile(__dirname + '/pages/benimSehrim.html');
});
app.get('/hakkimda', (req, res) => {
  res.sendFile(__dirname + '/pages/Hakkımda.html');
});

app.get('/mirasimiz', (req, res) => {
  res.sendFile(__dirname + '/pages/mirasimiz.html');
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
