let mysql = require('mysql');

let connection = mysql.createPool({
   host:        'us-cdbr-east-04.cleardb.com',
   user:        'b5ddbae2a8a48e',
   password:    'ff94308d',
   database:    'heroku_aa22c342d637c67'

  //  host:        'localhost',
  //  port:        '3307', 
  //  user:        'root',
  //  password:    '',
  //  database:    'blogku'
 });

/*
connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Koneksi Berhasil!');
   }
 })
*/ 

module.exports = connection;  