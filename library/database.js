let mysql = require('mysql');

let connection = mysql.createConnection({
   host:        'localhost',
   user:        'root',
   password:    '',
   database:    'blogku'
 });

connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Koneksi Berhasil!');
   }
 })

module.exports = connection; 

/*
module.exports = {
  multipleStatements  : true,
  host                : 'localhost',
  user                : 'root',
  password            : '',
  database            : 'blogku'
};
*/