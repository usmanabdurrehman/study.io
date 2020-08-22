var mysql = require('mysql');

var db = mysql.createConnection({
  host     : 'HOST_NAME',
  user     : 'USER_NAME',
  password : 'PASSWORD',
  database : 'DB_NAME'
});
 
db.connect(function(err){
	if(err) throw err
	else
	{
		console.log("Connected to database successfully")
	}	
})

module.exports = db