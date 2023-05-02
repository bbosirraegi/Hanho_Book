var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // HTTP의 Request에서 Body를 가져옴
var logger = require('morgan');
const session = require('express-session');

const Router = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); // Loggin Level => dev : 거의 모든 로그들을 표시
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

Router.forEach((item) => {
  console.log('test');
  console.log(item.path);
  const { path, cont } = item;
  app.use(path, cont);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resacve: false,
    saveUninitialized: true,
  })
);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
