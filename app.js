const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const authController = require('./controllers/authController');
const extraerUsuario = require('./middleware/extraerUsuario');
const adminController = require('./controllers/adminController');
const doctorController = require("./controllers/doctorController");
const pacienteController = require("./controllers/pacienteController");
const { render } = require("ejs");
let dbURI = "mongodb+srv://user:1234@cluster0.nybh2.mongodb.net/BD?retryWrites=true&w=majority";
iniciar();
async function iniciar() {
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  app.listen(5000);
  console.log("Servidor encendido");

}

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'html');
app.engine('html',require('ejs').renderFile);




//===============================================
app.use("*",extraerUsuario);

app.get("/",(req, res, next)=>{
  let user = res.locals.user;

  if(user){
    if(user.tipoUsuario=="doctor"){
      res.render("doctor/informacion");
    }else if(user.tipoUsuario=="paciente"){
      res.render("paciente/informacionpaciente");
    }
  }else{
    res.render('home');
  }
  

});

app.get("/login",authController.login_get);
app.post("/login",authController.login_post);
app.get("/logout",authController.logout_get);

//DOCTOR
app.get("/historia/create/:dniPaciente",doctorController.historia_create_get);
app.get("/cita",doctorController.cita_get);
app.get("/historia",doctorController.historia_all_get);

app.post("/historia",doctorController.historia_create_post);
//PACIENTE
app.get("/cita/create",pacienteController.cita_create_get);
app.post("/cita/create",pacienteController.cita_create_post);
app.post("/cita/cancel",pacienteController.cita_cancel_post);
app.get("/cita",pacienteController.cita_get);

app.get("/historia",pacienteController.historia_get);
//ADMIN
app.get("/admin",adminController.login_get);
app.post("/informacion",authController.info_post);
app.get("/informacion",authController.info_get);

app.post("/informacionpaciente",authController.info_post);
app.get("/informacionpaciente",authController.info_get);

app.post("/citapaciente",authController.citapaciente_post);
app.get("/citapaciente",authController.citapaciente_get);

app.post("/busquedahistoriaclinica",authController.busquedahistoriaclinicapaciente_post);
app.get("/busquedahistoriaclinica",authController.busquedahistoriaclinicapaciente_get); 

app.post("/busquedahistoriaclinicadoctor",authController.busquedahistoriaclinicadoctor_post);
app.get("/busquedahistoriaclinicadoctor",authController.busquedahistoriaclinicadoctor_get);
 
app.post("/loginadmin",authController.loginadministrador_post);
app.get("/loginadmin",authController.loginadministrador_get);

app.post("/paciente/hojaclinica/hojaclinicaparadoctor",authController.hojaclinicapacientedoctor_post);
app.get("/paciente/hojaclinica/hojaclinicaparadoctor",authController.hojaclinicapacientedoctor_get);

app.get("/vercitaspendientesdoctor",authController.citapendientedoctor_get); 




app.get("/citadoctor",authController.citadoctor_get);



app.get("/registro",adminController.registro_get);
app.post("/registro",adminController.registro_post);




