
'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var proxy = require('http-proxy-middleware');
var fs = require('fs');

var app = express();

// set all proxy 
app.use('/sapi', proxy({
  target: 'http://sapi2.xxx.com',
  changeOrigin: true,
  pathRewrite:{
    '^/sapi' : '/',
  }
}));

app.use('/upload', proxy({
  target: 'http://img.xxx.com/upload',
  changeOrigin: true,
  pathRewrite:{
    '^/upload' : '/',
  }
}));

app.use('/Video', proxy({
  target: 'http://video.xxx.com/Video',
  changeOrigin: true,
  pathRewrite:{
    '^/Video' : '/',
  }
}));

app.use('/jump/', proxy({
  target: 'http://t.xxx.com',
  changeOrigin: true,
  pathRewrite:{
    '^/jump' : '/',
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

// all server change to *
app.all('*',function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  const html = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8')
  res.send(html)
})

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
