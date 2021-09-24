const Paciente = require("../models/Paciente");
const Doctor = require("../models/Doctor");
module.exports.registro_get = (req,res,next)=>{
    res.render("registro/registro");
}

module.exports.registro_post = async (req,res,next)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const dni = req.body.dni;
    const email = req.body.email;
    const tipoUsuario = req.body.tipoUsuario;
    const telefono = req.body.telefono;
    const password = req.body.password;
 
    let nuevoUsuario = null;
    if(tipoUsuario == "paciente"){
        nuevoUsuario = new Paciente({
            nombre,
            apellido,
            dni,
            email,
            telefono,
            password,
            tipoUsuario,
            estado: "activo",
            telefonoFamiliar:req.body.telefonoFamiliar,
            direccion:req.body.direccion
          });
         
    }else if(tipoUsuario == "doctor"){
        nuevoUsuario = new Doctor({
            nombre,
            apellido,
            dni,
            email,
            telefono,
            password,
            tipoUsuario,
            estado: "activo",
            yearXp:req.body.yearXp,
            especialidad:req.body.especialidad
          });
    }
   
    await nuevoUsuario.save();
      console.log(req.body);
      res.status(201).json({ data: req.body });
}