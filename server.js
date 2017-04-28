var express = require('express');
	users=require('./routes/caller');
var app = express();

app.get('/users', users.registerduser)

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})