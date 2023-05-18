const sql = require('mssql')
// config() will read your .env file, parse the contents, assign it to process.env.
require('dotenv').config()

// Create connection to database
const config = {
  server: "WL2254\\SQLEXPRESS", // update me,
  database: "Jwt", //update me
  authentication: {
    type: 'default',
    options: {
      useWindowsIntegratedSecurity: true,
    }
  },
  options: {
    encrypt: true,
    trustedServerCertificate: true
  }
};


const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQLServer...')
    return pool;
  
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));


module.exports = {
  sql
  ,poolPromise
}