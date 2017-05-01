var express = require('express');
var users=require('./routes/caller');
	
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var app = express();




app.get('/users/:mdn?', users.registerduser)
app.use(bodyParser.text())
app.post('/users',jsonParser, users.updateuser)

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
