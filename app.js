const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const session = require('express-session');
const { Login, Save } = require('./models');
const methodOverride = require('method-override');
const Player = require('./Player');

const loginRouter = require('./routers/login');
const registerRouter = require('./routers/register');
const userRouter = require('./routers/user');
const createRouter = require('./routers/create');
const gameRouter = require('./routers/game');

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(async (req, res, next) => {
  if (req.session.userId) {
    res.locals.currentUser = await Login.findOne({
      where: {
        id: req.session.userId
      }
    })
  } else {
    res.locals.currentUser = undefined
  }
  res.locals.player
  res.locals.errors = ["", "Username/Password is incorrect", "You are not signed in"]
  next()
});

app.locals.currentPlayer = 1;
app.locals.ogre = 1;

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/create', createRouter);
app.use('/game', gameRouter);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});
