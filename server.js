var express = require('express');
var users=require('./routes/caller');
	
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var app = express();




app.get('/getuser/:mdn?', users.getuser)
app.use(bodyParser.text())
app.post('/registerUser',jsonParser, users.registerUser)

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
