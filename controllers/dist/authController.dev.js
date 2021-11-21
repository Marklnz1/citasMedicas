"use strict";

var Paciente = require("../models/Paciente");

var Doctor = require("../models/Doctor");

var Cita = require("../models/Cita");

var jwt = require("jsonwebtoken");

var bcrypt = require("bcrypt");

module.exports.login_post = function _callee(req, res) {
  var dni, password, tipoUsuario, passwordBD, mensaje, logeado, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dni = req.body.dni;
          password = req.body.password;
          tipoUsuario = req.body.tipoUsuario;
          _context.next = 5;
          return regeneratorRuntime.awrap(getPasswordBD(tipoUsuario, dni));

        case 5:
          passwordBD = _context.sent;
          mensaje = "DNI no registrado o contraseña incorrecta";

          if (!passwordBD) {
            _context.next = 12;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(password, passwordBD));

        case 10:
          logeado = _context.sent;

          if (logeado) {
            token = crearToken(dni, tipoUsuario);
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: tiempoMaximo * 1000
            });
            mensaje = "";
          }

        case 12:
          res.status(201).json({
            mensaje: mensaje
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.login_get = function (req, res, next) {
  res.render("autenticacion/login");
};

module.exports.logout_get = function (req, res, next) {
  if (res.locals.user) {
    res.cookie("jwt", "", {
      maxAge: 1
    });
    res.redirect("/");
  } else {
    res.redirect("/");
  }
};

var tiempoMaximo = 30000; //segundos

var crearToken = function crearToken(id, tipoUsuario) {
  return jwt.sign({
    id: id,
    tipoUsuario: tipoUsuario
  }, "efe", {
    expiresIn: tiempoMaximo
  });
};

function getPasswordBD(tipo, dni) {
  var usuario;
  return regeneratorRuntime.async(function getPasswordBD$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          usuario = null;

          if (!(tipo == "doctor")) {
            _context2.next = 7;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(Doctor.findOne({
            dni: dni
          }));

        case 4:
          usuario = _context2.sent;
          _context2.next = 11;
          break;

        case 7:
          if (!(tipo == "paciente")) {
            _context2.next = 11;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(Paciente.findOne({
            dni: dni
          }));

        case 10:
          usuario = _context2.sent;

        case 11:
          if (!(usuario == null)) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", null);

        case 13:
          return _context2.abrupt("return", usuario.password);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports.info_post = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports.info_get = function (req, res, next) {
  res.render("doctor/informacion");
};

module.exports.infopaciente_post = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports.infopaciente_get = function (req, res, next) {
  res.render("paciente/informacionpaciente");
};

module.exports.citapaciente_post = function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports.citapaciente_get = function (req, res, next) {
  res.render("paciente/citapaciente");
};

module.exports.citadoctor_post = function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
        case "end":
          return _context6.stop();
      }
    }
  });
};

module.exports.citapendientepaciente_post = function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
        case "end":
          return _context7.stop();
      }
    }
  });
};

module.exports.citapendientepaciente_get = function (req, res, next) {
  res.render("paciente/vercitaspendientespaciente");
};

module.exports.citadoctor_get = function (req, res, next) {
  res.render("doctor/citadoctor");
};

module.exports.citadoctor_post = function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
        case "end":
          return _context8.stop();
      }
    }
  });
};

module.exports.citapendientedoctor_post = function _callee8(req, res) {
  return regeneratorRuntime.async(function _callee8$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
        case "end":
          return _context9.stop();
      }
    }
  });
};

module.exports.citapendientedoctor_get = function (req, res, next) {
  res.render("doctor/vercitaspendientesdoctor");
}; //BUSQUEDA PACIENTE


module.exports.busquedahistoriaclinicapaciente_post = function _callee9(req, res) {
  return regeneratorRuntime.async(function _callee9$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
        case "end":
          return _context10.stop();
      }
    }
  });
};

module.exports.busquedahistoriaclinicapaciente_get = function (req, res, next) {
  res.render("paciente/busquedahistoriaclinica");
};

module.exports.busquedahistoriaclinicadoctor_post = function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
        case "end":
          return _context11.stop();
      }
    }
  });
};

module.exports.busquedahistoriaclinicadoctor_get = function (req, res, next) {
  res.render("doctor/busquedahistoriaclinica");
};

module.exports.loginadministrador_post = function _callee11(req, res) {
  return regeneratorRuntime.async(function _callee11$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
        case "end":
          return _context12.stop();
      }
    }
  });
};

module.exports.loginadministrador_get = function (req, res, next) {
  res.render("Administrador/loginadmin");
};

module.exports.paginanoencontrada_post = function _callee12(req, res) {
  return regeneratorRuntime.async(function _callee12$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
        case "end":
          return _context13.stop();
      }
    }
  });
};

module.exports.hojaclinicaparadoc_post = function _callee13(req, res) {
  return regeneratorRuntime.async(function _callee13$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
        case "end":
          return _context14.stop();
      }
    }
  });
};

module.exports.hojaclinicaparadoc_get = function (req, res, next) {
  res.render("doctor/hojaclinicaparadoctor");
};

module.exports.paginanoencontrada_get = function (req, res, next) {
  res.render("404/index");
};