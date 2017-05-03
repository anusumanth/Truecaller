var connection = require('./dbConnection');

exports.getuser=function(req, res) {
	 var data = {
        	"error":1,
        	"Name":""
    	};
	var mdn= req.query.mdn;
	connection.query("SELECT Name from Contacts where MDN = ?", mdn ,function(err, rows){
        if(rows.length != 0){
            data["error"] = 0;
            data["Name"] = rows[0].Name;
            res.status(200).json(data);
        }else{
            data["Name"] = 'No Contacts Found..';
            res.status(200).json(data);
        }
    });
 	console.log(mdn);
 	res.status(200).send('Hello');

};

exports.registerUser=function(req, res) {
   var data = {
        "error":1,
	"Message":"",
        "UID":""
    };
 if (!req.body) 
	return res.sendStatus(400);

var user = req.body.user;
var uid = user.UID;
delete user.UID;
//console.log(req.body.user);
connection.query('SELECT * from Users WHERE UID=?',uid,function(err,rows){
	if(rows.length != 0){
         console.log('row present', rows[0].UID);
	 data["error"] = 0;
	data["Message"]="Registered User";
	data["UID"] = rows[0].UID;	
         res.status(200).json(data);
    }else{
        connection.query('INSERT INTO Users SET ?', user, function(err,rows){
            if(err) {
                data["error"]=1;
		        data["Message"]="Duplicate MDN";
                console.log("MDN already present");
                console.log(data.error);
                res.status(400).json(data);
            }
	    data["error"] = 0;
	data["Message"]="User registered successfully";
	data["UID"] = res.insertId;	
         
            console.log('Last insert ID:', res.insertId);
	    res.status(200).json(data);
    });	
    }
});

    
   // res.status(200).send(req.body.user);

};

exports.syncContacts=function(req,res){
if (!req.body) 
	return res.sendStatus(400);
	var contact;
	var contacts = req.body.contacts;
	for(i=0;i<contacts.length;i++){
		contact = contacts[i];
		connection.query('INSERT INTO Contacts SET ?', contact , function(err){
            if(err) {
                throw err;
               
            }
            console.log('Last insert ID:', res.insertId);
	    
        })
 data["error"] = 0;
	data["Message"]="Contacts Synced successfully";
	data["UID"] =req.body.UID;
	res.status(200).json(data);
	}
};