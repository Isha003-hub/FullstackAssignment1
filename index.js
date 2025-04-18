const express = require("express");
const path = require("path");
const sessions = require("express-session");
const dotenv = require("dotenv");


dotenv.config();

const app = express();


const port = process.env.PORT || "8888";


app.set("views",path.join(__dirname,"views"));


app.set("view engine","pug");


app.use(express.urlencoded({extended : true}));


app.use(express.json());


app.use(express.static(path.join(__dirname,"public")));



app.use(sessions({
    secret: process.env.SESSIONSECRET,
    name: "MyUniqueSessionId",
    saveUninitialized: false,
    resave: false,
    cookie: {}
}));



app.use("/admin",require("./components/admin/routes"));
app.use("/experiences", require("./components/experience/routes"));
app.use("/projects", require("./components/project/routes"));

app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`);
});


app.get("/", async(request, response) => {
    console.log(request.session);
    if(request.session.loggedIn){
        response.render("admin/admin", {username: request.session.user});
    }else{
        response.redirect("/admin/login");
    }
});
