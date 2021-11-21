"use strict";

var mongoose = require("mongoose");

var express = require("express");

var app = express();

var cookieParser = require('cookie-parser');

var authController = require('./controllers/authController');

var extraerUsuario = require('./middleware/extraerUsuario');

var adminController = require('./controllers/adminController');

var doctorController = require("./controllers/doctorController");

var pacienteController = require("./controllers/pacienteController");

var generadorController = require("./tools/generadorController");

var _require = require("ejs"),
    render = _require.render;

var dbURI = "mongodb+srv://user:1234@cluster0.nybh2.mongodb.net/BD?retryWrites=true&w=majority";
iniciar(); // const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function iniciar() {
  return regeneratorRuntime.async(function iniciar$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 2:
          app.listen(3000);
          console.log("Servidor encendido"); // console.log(await (await fetch("https://frozen-hollows-68632.herokuapp.com/api/v1/dni/48004836?token=abcxyz")).json());

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

app.set("view engine", "ejs");
app.use(express["static"]("public"));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile); //===============================================

app.use("*", extraerUsuario);
app.get("/", function (req, res, next) {
  var user = res.locals.user;

  if (user) {
    if (user.tipoUsuario == "doctor") {
      res.render("doctor/informacion");
    } else if (user.tipoUsuario == "paciente") {
      res.render("paciente/informacionpaciente");
    }
  } else {
    res.render('home');
  }
});
app.get("/login", authController.login_get);
app.post("/login", authController.login_post);
app.get("/logout", authController.logout_get); //DOCTOR

app.get("/historia/create/:dniPaciente", doctorController.historia_create_get);
app.get("/cita", doctorController.cita_get);
app.get("/historia", doctorController.historia_all_get);
app.post("/historia", doctorController.historia_create_post); //PACIENTE

app.get("/cita/create", pacienteController.cita_create_get);
app.post("/cita/create", pacienteController.cita_create_post);
app.get("/cita", pacienteController.cita_get);
app.get("/historia", pacienteController.historia_get); //ADMIN

app.get("/admin", adminController.login_get);
app.post("/informacion", authController.info_post);
app.get("/informacion", authController.info_get);
app.post("/verificardni", adminController.dni_valido_post);
app.post("/informacionpaciente", authController.info_post);
app.get("/informacionpaciente", authController.info_get);
app.post("/citapaciente", authController.citapaciente_post);
app.get("/citapaciente", authController.citapaciente_get);
app.post("/busquedahistoriaclinica", authController.busquedahistoriaclinicapaciente_post);
app.get("/busquedahistoriaclinica", authController.busquedahistoriaclinicapaciente_get);
app.post("/index", authController.paginanoencontrada_post);
app.get("/index", authController.paginanoencontrada_get);
app.post("/busquedahistoriaclinicadoctor", authController.busquedahistoriaclinicadoctor_post);
app.get("/busquedahistoriaclinicadoctor", authController.busquedahistoriaclinicadoctor_get);
app.post("/loginadmin", authController.loginadministrador_post);
app.get("/loginadmin", authController.loginadministrador_get);
app.get("/vercitaspendientesdoctor", authController.citapendientedoctor_get);
app.get("/citadoctor", authController.citadoctor_get);
app.get("/registro", adminController.registro_get);
app.post("/registro", adminController.registro_post); //============GENERADOR================

app.get("/generar/areas", generadorController.genAreasMedicas);
app.get("/generar/paciente", generadorController.genDatosPaciente);
app.post("/listahojaclinicaparadoctor", authController.listahojaclinicaparadoc_post);
app.get("/listahojaclinicaparadoctor", authController.listahojaclinicaparadoc_get);
app.use("*", function (req, res) {
  res.render("404/index");
});