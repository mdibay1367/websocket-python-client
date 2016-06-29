/**
*  Author: M.Dibay 
*  Date: June, 28, 16
*/
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var sockets = {};

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function(socket) {
	
	// This initiation is emmitted by our web clients
	// we store the reference to our socket ids 
	// MAP [Key: Username + Applicatoin, Value: SocketID]
	socket.on('init', function(data) { 
		socksRef[data.username + data.application] = socket.id;
	});

	// Here we recieve message from python clients
	// and we emit the event on web clients
	socket.on('message', function(message) {
		// Parse the data 
		var app = message.app;
		var user = message.user; 
		var pythonClientData = message.data;
		/*
		* Here we have to emit based on app
		* and send the update to the correct 
		* socket ID 
		*/
		socksRef[user + app].emit(
			'update', 
			{
				update: pythonClientData
			}
		);
	});
});