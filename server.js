// Require Modules
var express = require("express"),
	app = express(),
	server = require("http").createServer(app),
	io = require("socket.io")(server),
	path = require("path"); 
	
var port = process.env.PORT || 80,
	ip = process.env.IP;

server.listen(port, ip);
console.log("HTTP Servicing: " + (ip || 'localhost') + ':' + port);

// Express deliver client UI
app.use(express.static("public/"));
app.get("/index.html", function(req, res) {
	res.sendFile(path.join("public/", "index.html"));
});

var clients = {};

// Socket connection listener
io.sockets.on('connection', function(socketInst) {
	// Handle socket registration
	if(clients.hasOwnProperty(socketInst.id)) {
		console.log('[SERVER]: ' + socketInst.id + ' exists');
		return;
	} else {
		console.log('[SERVER]: ' + socketInst.id + ' connected');
		clients[socketInst.id] = socketInst;
		socket = clients[socketInst.id];
	}

	// Socket disconnection handler
	socket.on('disconnect', function() {
		console.log('[SERVER] ' + socket.id + ' disconnected');
		delete socket;	
	});
});
