const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const dataRouter = require('./routes/data');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Logs
let logReqStream = fs.createWriteStream(path.join(__dirname, 'log/request.log'), {flags: 'a'});
app.use(logger('combined', {stream: logReqStream}));
// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Cookie Parser
app.use(cookieParser());
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// Set up session, save it only if changed
app.use(session({
  secret: 'watched', 
  saveUninitialized: false, 
  resave: false,
  cookie: {
    maxAge: 7200000,
    sameSite: true,
    secure: false
  }
}));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/data', dataRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
