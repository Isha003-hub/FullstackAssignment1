const mongoose = require("mongoose");
const { scryptSync} = require("crypto");

const db = require("../../db");

const adminSchema = new mongoose.Schema({
    username : String,
    password : String
});
const Admin = mongoose.model("Admin",adminSchema);

async function getadmin(user){
    await db.connect();
    let result = await Admin.findOne({
        username : user
    });
    return(result)? result : false;
}

async function addAdmin(user,pass){
    await db.connect();
    let admin = await getadmin(user);
    console.log(admin);
    if(!admin){
        let secret = process.env.SALT;
        let key = scryptSync(pass,secret,64);
        let newAdmin = new Admin({
            username : user,
            password: key.toString("base64")
        });
        let result = await newAdmin.save();
        if (result === newAdmin)
            return true;
        else  
            return false;
    } else{
        return false;
    }

}


async function Adminauthentication(user, pass){
    await db.connect();
    let secret = process.env.SALT;
    let key = scryptSync(pass, secret, 64);
    let result = await Admin.findOne({
        username: user,
        password: key.toString("base64")
    });
    return(result)? true: false;
}


module.exports = {
    getadmin,
    addAdmin,
    Adminauthentication
}
