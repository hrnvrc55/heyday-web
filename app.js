var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios');
const dotenv = require('dotenv');
const cookieControl = require('./helper/cookie-control')
dotenv.config();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var worksRouter = require('./routes/works');
var workDetail = require('./routes/work-detail');
var aboutRouter = require('./routes/about');

axios.defaults.baseURL = process.env.API_URL;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/',cookieControl, indexRouter);
app.use('/users',cookieControl, usersRouter);
app.use('/works',cookieControl, worksRouter);
app.use('/works/',cookieControl, worksRouter);
app.use('/about',cookieControl, aboutRouter);
app.use('/about/',cookieControl, aboutRouter);
app.use('/work-detail',cookieControl, workDetail);



console.log(process.env.PORT, 'PORT')

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
