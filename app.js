var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//library
var flash   = require('express-flash');
var session = require('express-session');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts'); // <-- route posts

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
  cookie: { 
    maxAge: 60000 
  },
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
})) 

app.use(flash())

//app.use('/', indexRouter);
app.use('/',loginRouter);
const appRoute = require('./routes'); 
app.use('/', appRoute); 

//Login
/*  
var connection = require('./library/database'); 
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/posts');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

//app.get('/posts', function(request, response) {
	if (request.session.loggedin) {
		//response.send('Welcome back, ' + request.session.username + '!');
    app.use('/posts', postsRouter);
	} else {
		response.redirect('/'); 
	}
	response.end(); 
//});

app.get('/logout', function(request, response) {
	if (request.session.loggedin) {
		request.session.loggedin = false; 
    response.redirect('/'); 
	} else {
    response.redirect('/');
		//response.send('Please login to view this page!');
	}
	response.end();
}); 
*/ 

app.use('/users', usersRouter);
app.use('/posts', postsRouter); // use route posts di Express

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