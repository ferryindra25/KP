const mysql = require("mysql");
const util = require("util")

const connection = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"bintangterang"
})
connection.query = util.promisify(connection.query)
module.exports = connection

