const mongoose = require("mongoose");

// dbUrl is the connection string to our database and we are changing the default to our database Username,password,host,name 
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/${process.env.DBNAME}`;

// creating an async function to use await to wait for the connection to our mongoose database
async function connect(){
    await mongoose.connect(dbUrl);
}

// exporting the connect function to be accessible outside
module.exports = {
    connect
};