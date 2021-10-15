const HistoriaClinica = require("../models/HistoriaClinica");

module.exports.historia_create_get = (req, res) => {
    console.log(req.params.dniPaciente);
    res.render("doctor/historia/create");

}

module.exports.historia_create_post = (req,res) => {
    console.log(req.body)
    
    res.status(201).json(req.body);
}