require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const indexRouter = require('./routes/index');
const meepRouter = require('./routes/meeps');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const profileRouter = require('./routes/profile');
const usermeepRouter = require('./routes/usermeeps');
const apiRouter = require('./routes/api');


var app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'kirbycarkirbycar',
  resave: false,
  saveUninitialized: true,
  cookie: { sameSite: true }
}));

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use('/', indexRouter);
app.use('/meeps', meepRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/profile', profileRouter);
app.use('/usermeeps', usermeepRouter);
app.use('/api', apiRouter);

module.exports = app;