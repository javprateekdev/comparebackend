
const mysql = require("mysql");
var pool2 = mysql.createPool({
  connectionLimit:4,
  host: "housethat.in",
  user: "u901480788_flat",
  password: "Prateek@123",
  database: "u901480788_flatbased",
});

pool2.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log('Database connected successfully');
  connection.release();
});
module.exports =pool2;
