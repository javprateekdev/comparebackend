const mysql = require("mysql");

  var pool3 = mysql.createPool({
    connectionLimit:4,
    host: "housethat.in",
    user: "u901480788_tool",
    password: "Prateek@123",
    database: "u901480788_compare",
  });
 pool3.getConnection((err,connection)=> {
      if(err)
      throw err;
      console.log('Database connected successfully');
      connection.release();
    });
  

module.exports =pool3;
