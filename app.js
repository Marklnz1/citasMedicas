const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const authController = require('./controllers/authController');
const extraerUsuario = require('./middleware/extraerUsuario');
let dbURI = "mongodb+srv://user:1234@cluster0.nybh2.mongodb.net/BD?retryWrites=true&w=majority";
iniciar();
async function iniciar() {
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(4000);
  console.log("Servidor encendido");

}
//==============================================
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'html');
app.engine('html',require('ejs').renderFile);
//==============================================
app.use("*",extraerUsuario);
app.get("/",(req, res, next)=>{
  let user = res.locals.user;
  if(user){
    res.send(user.tipoUsuario+" DNI: "+user.id+" LOGEADO")
  }else{
    res.render('home');
  }
  

});
app.post("/login",authController.login_post);
app.get("/login",authController.login_get);
app.post("/informacion",authController.info_post);
app.get("/informacion",authController.info_get);

