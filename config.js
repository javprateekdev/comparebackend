const mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit:4,
  host: "housethat.in",
  user: "u901480788_housethat",
  password: "Housethat@b34",
  database: "u901480788_users",
});


pool.getConnection((err,connection)=> {
    if(err)
    throw err;
    console.log('Database connected successfully');
    connection.release();
  });

module.exports =pool;