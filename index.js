var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var location = ["Seville","Canary Islands","Cape Verde","Strait of Magellan","Guam","Philippines"]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile('seville.html', {root: './public'})
})
app.get('/next', function(req, res){
	// console.log(req.query)
	location.forEach(function(element, index){
		if(element === req.query.location){
			req.query.nextLocation = location[index+1]
		}
	})
	res.send(req.query)
})
app.get('/:location', function(req, res){
	res.sendFile(req.params.location + '.html', {root: './public'}, function(err){
		if(err){
			res.send("Magellan did NOT go to " + req.params.location)
		}
	})
})


// app.get('/:wrongLocation', function(req, res){
// 	res.send("Magellan did NOT go to " + req.params.wrongLocation)
// })

var port=3000
app.listen(port, function(){
	console.log("Server running " + port)
})