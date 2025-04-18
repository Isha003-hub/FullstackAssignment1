const adminModel = require("./model");

const loginform = async(request,response) => {
    response.render("admin/login");
}

const login = async(request,response) => {
    let auth = await adminModel.Adminauthentication(request.body.user,request.body.pass);
    console.log(`authorization: ${auth}`);
    if(auth){
        request.session.loggedIn = true;
        request.session.user = request.body.user;
        response.redirect("/admin");
    }
    else{
        response.render("admin/login",{err:" Admin not found"});
    }
}

const logout = async(request,response) => {
    request.session.destroy();
    response.redirect("/");
}

const registerform = async(request,response) =>{
    await response.render("admin/register");
}

const register = async(request,response) => {
    let result = await adminModel.addAdmin(request.body.user,request.body.pass);
    console.log(`result: ${result}`);
    if(result){
        response.redirect("/admin/login");
    }
    else{
        response.render("admin/register",{err: "Username already exists"});
    }
}

const adminpage = async(request,response) => {
    console.log(request.session);
    if(request.session.loggedIn){
        response.render("admin/admin",{username:request.session.user});
    }
    else{
        response.redirect("/admin/login");
    }

}

module.exports = {
    loginform,
    login,
    logout,
    registerform,
    register,
    adminpage
}
