const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session')
dotenv.config();

const router = require('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false, maxAge: 60 * 60 * 1000
  }
}))

app.use((req, res, next) => {
  console.log(req.session);

  if (!req.session.deck) {
    req.session.deck = []
  }

  next()
})

app.use(router);

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});