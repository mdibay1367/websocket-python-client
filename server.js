var server = require('websocket').server, 
    http = require('http'),
    express = require('express'),
    app = module.exports.app = express(), 
    fs = require('fs');

var socket = new server({
    httpServer: http.createServer(app).listen(9090)
});

//sockRef keeps the reference to the connection 
//for each specific user and web application
var socksRef = {};
var currentUser;
var path = require('path');
var bodyParser = require('body-parser')
var engine = require('consolidate');

app.set('views', __dirname);
app.engine('html', engine.mustache);
app.set('view engine', 'html');
app.use(bodyParser());
app.use(express.static(__dirname + '/assets'));
app.get('/', function(req, res) { 
	res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/', function(req, res){
    currentUser = req.body.username;
  	res.render('app.html');
});

app.get('/app', function(req, res) { 
	res.sendFile(path.join(__dirname, '/app.html'));
});

// websocket connection handling 
socket.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    
     connection.on('message', function(message) {
     	var data  = JSON.parse(message.utf8Data);
     	var type = message.type;
     	var app = data.app;
     	var user = data.user;
     	var client = data.client;
	//Client: WEB OR PYTHON CLIENT 
     	if (client == "web") {
     	  socksRef[currentUser + app] = connection;
	} else {
	  var logCodeValue = data.logCode
	  var values = data.value
     	  var thisuser = data.user
	  socksRef[thisuser + app].send(JSON.stringify({logCode: logCodeValue, value: values}));
	}
    });

    connection.on('close', function(connection) {
        console.log('connection closed');
    });
});

