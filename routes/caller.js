var connection = require('./dbConnection');
exports.registerduser=function(req, res) {
   
 var data = {
        "error":1,
        "Books":""
    };
    
    connection.query("SELECT * from Employee",function(err, rows, fields){
        if(rows.length != 0){
            data["error"] = 0;
            data["Books"] = rows;
            res.json(data);
        }else{
            data["Books"] = 'No books Found..';
            res.json(data);
        }
    });
};