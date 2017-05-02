var connection = require('./dbConnection');
exports.getuser=function(req, res) {
	var mdn= req.query.mdn;
	connection.query("SELECT Name from Contacts where MDN = ?", mdn ,function(err, rows){
        if(rows.length != 0){
            data["error"] = 0;
            data["Contacts"] = rows;
            res.status(200).json(data);
        }else{
            data["Contacts"] = 'No ContactsSFound..';
            res.status(200).json(data);
        }
    });
 	console.log(mdn);
 	res.status(200).send('Hello');

};

exports.registerUser=function(req, res) {
  
 if (!req.body) 
	return res.sendStatus(400);

var user = req.body.user;
var uid = user.UID;
delete user.UID;
//console.log(req.body.user);
connection.query('SELECT * from Users WHERE UID=?',uid,function(err,rows){
	if(rows.length != 0){
         console.log('row present', rows[0].UID);
         res.status(200).send(rows);
    }else{
        connection.query('INSERT INTO Users SET ?', user, function(err,res){
            if(err) {
                var mes = {"Message":"MDN already present"};
                console.log("MDN already present");
                console.log(mes);
                res.status(200).send(mes);
            }
            console.log('Last insert ID:', res.insertId);
    });	
    }
});

    
   // res.status(200).send(req.body.user);

};

exports.syncContacts=function(req,res){
if (!req.body) 
	return res.sendStatus(400);

var contacts = req.body.contacts;

};