const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const authController = require('./controllers/authController');
const extraerUsuario = require('./middleware/extraerUsuario');
const adminController = require('./controllers/adminController');
const doctorController = require("./controllers/doctorController");
const pacienteController = require("./controllers/pacienteController");
const generadorController = require("./tools/generadorController");
const { render } = require("ejs");
let dbURI = "mongodb+srv://user:1234@cluster0.nybh2.mongodb.net/BD?retryWrites=true&w=majority";
iniciar();

// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
async function iniciar() {
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  app.listen(3000);
  console.log("Servidor encendido");
  // console.log(await (await fetch("https://frozen-hollows-68632.herokuapp.com/api/v1/dni/48004836?token=abcxyz")).json());
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
    if(user.tipoUsuario=="doctor"){
      res.render("doctor/informacion");
    }else if(user.tipoUsuario=="paciente"){
      res.render("paciente/informacionpaciente");
    }else if(user.tipoUsuario =="admin"){
      res.render("registro/registro");
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
app.get("/historia/:dniPaciente",doctorController.historia_get);
app.post("/historia",doctorController.historia_create_post);
//PACIENTE
app.get("/cita/create",pacienteController.cita_create_get);
app.post("/cita/create",pacienteController.cita_create_post);
app.get("/cita",pacienteController.cita_get);
app.get("/historia",pacienteController.historia_get);
//ADMIN
app.get("/admin",adminController.login_get);
app.post("/admin",adminController.login_post);
app.post("/registro",adminController.registro_post);
app.post("/verificardni",adminController.dni_valido_post);



//============GENERADOR================
app.get("/generar/areas",generadorController.genAreasMedicas);
app.get("/generar/paciente",generadorController.genDatosPaciente);
app.post("/listahojaclinicaparadoctor",authController.listahojaclinicaparadoc_post);
app.get("/listahojaclinicaparadoctor",authController.listahojaclinicaparadoc_get);



app.use("*",(req,res)=>{
  res.render("404/index");
});
