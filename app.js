const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

app.post('/iletisim', (req, res) => {
  const isim = req.body.nameInput;
  const email = req.body.emailInput;
  const message = req.body.messageInput;
    // Render an HTML page with the submitted data
    res.send(`
      <h1>Gönderilen Form</h1>
      <p><strong>İsim:</strong> ${isim}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mesaj:</strong> ${message}</p>
    `);
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

app.get('/user', (req, res) => {
  username = req.session.id
  res.sendFile(__dirname + '/pages/user.html',{username:username});
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
  if (username === 'B221210374' && password === 'B221210374') {
    req.session.username = username;
    res.redirect('/user?id='+username);
  } else {
    res.send('Geçersiz Kullanıcı Adı/Parola');
  }
});

// Start the server

app.listen(port, () => console.log(`App listening on port ${port}!`));
