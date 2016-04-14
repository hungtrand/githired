var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// models -- not being used in this page, simply being present to sync tables with the database
var usersContext = require('./models/users');
var jobsContext = require('./models/jobs');
var skillsContext = require('./models/skills');
var bidsContext = require('./models/bids');
var commentsContext = require('./models/comments');
var jobAcceptancesContext = require('./models/jobAcceptances');
var userSkillsContext = require('./models/userSkills');
var jobSkillsContext = require('./models/jobSkills')
//

var apiSignup = require('./api/signup');
var apiUser = require('./api/user');

// var users = require('./routes/users');
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 80,
    ip = process.env.IP || '0.0.0.0';
server.listen(port, ip);
console.log("HTTP Servicing: " + (ip || '0.0.0.0') + ':' + port);
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// Static files handling
if (app.get('env') === 'development') {
    app.use(express.static(path.join(__dirname, 'client')));
} else {
    app.use(express.static(path.join(__dirname, 'public')));
}

// Dynamically handle api calls
app.use('/api/signup', apiSignup);
app.use('/api/user', apiUser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send(err.message);
        console.log(err);
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.sendFile("./assets/uh_oh_500.png");

});
module.exports = app;