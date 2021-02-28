const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',

  password: 'CHANGE ME',
  database: 'dogs_db',
});

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "d6rii63wp64rsfb5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "xs69potzntqbh4k2",
    password: "rhye5yprv0utks9p",
    database: "oqao5tjp0u8vc869",
  });
}

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});


module.exports = connection;
