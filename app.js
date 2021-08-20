const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const extraerUsuario = require('./middleware/extraerUsuario');
const pacienteController = require('./controllers/pacienteController');
const doctorController = require('./controllers/doctorController');
const authController = require('./controllers/authController');
const generadorController = require('./controllers/otros/generadorController');
const registroController = require('./controllers/otros/registroController');
let dbURI = "mongodb+srv://user:1234@cluster0.nybh2.mongodb.net/BD?retryWrites=true&w=majority";
iniciar();
async function iniciar() {
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(3000);
  console.log("Servidor encendido");

}
//==============================================
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
//==============================================
app.use("*", extraerUsuario);

app.get("/",(req, res) => {
  const user = res.locals.user;
  if(user.tipoUsuario){
    res.render(`${user.tipoUsuario}/index`);
  }else{
    res.render("index");
  }
});

app.get("/logout",authController.logout_get);
app.get("/login", authController.login_get);
app.post("/login", authController.login_post);

app.get("/paciente/cita",pacienteController.cita_get);
app.get("/paciente/cita/create/:idPaciente",pacienteController.cita_id_create_get);
app.post("/paciente/cita/create",pacienteController.cita_id_create_post);
app.delete("/paciente/cita/:idCita",pacienteController.cita_id_delete);
app.get("/paciente/historia",pacienteController.historia_get);

app.get("/doctor/cita",doctorController.cita_get);
app.get("/doctor/historia/",doctorController.historia_get);
app.get("/doctor/historia/create/:idPaciente",doctorController.historia_create_get);
app.get("/doctor/historia/:idPaciente",doctorController.historia_id_get);
app.post("/doctor/historia/create",doctorController.historia_create_post);
app.get("/doctor/paciente/:dniPaciente",doctorController.paciente_id_get);

//==========================================================================
//==========================================================================
//==========================================================================
app.get("/generarUsuarios",generadorController.generarUsuarios);

app.get("/registrar/doctor", registroController.registro_doctor_get);
app.post("/registrar/doctor", registroController.registro_doctor_post);

app.get("/registrar/paciente", registroController.registro_paciente_get);
app.post("/registrar/paciente", registroController.registro_paciente_post);

app.get("/registrar/areaMedica", registroController.registro_area_get);
app.post("/registrar/areaMedica", registroController.registro_area_post);

app.get("/registrar/cita", registroController.registro_cita_get);
app.post("/registrar/cita", registroController.registro_cita_post);

app.get("/registrar/horario", registroController.registro_horario_get);
app.post("/registrar/horario", registroController.registro_horario_post);
app.use((req,res)=>{
  res.render("404");
});
