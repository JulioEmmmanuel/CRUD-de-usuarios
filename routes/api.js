const express = require("express");
const api = express.Router();
const {body} = require("express-validator");

let WelcomeController = require("../controllers/welcome");
let AlumnosController = require("../controllers/alumnos");
let MaestrosController = require("../controllers/maestros");
let AuthController = require("../controllers/auth");

let userProtectUrl = require("../middlewares/authUser").userProtectUrl;

api.get("/", WelcomeController.welcome);

api.get("/alumnos", userProtectUrl, AlumnosController.alumnos);
api.get("/alumno/:n_lista", userProtectUrl, AlumnosController.alumno);

api.post("/alumno", userProtectUrl, [
    body("genero").not().isEmpty(),
    body("n_cuenta").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty()
], AlumnosController.crear_alumno);

api.put("/alumno/:n_lista", userProtectUrl, [
    body("genero").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty()
], AlumnosController.update_alumno);

api.delete("/alumno/:n_lista", userProtectUrl, AlumnosController.delete_alumno);

api.get("/maestros", userProtectUrl, MaestrosController.maestros);
api.get("/maestro/:n_cuenta", userProtectUrl, MaestrosController.maestro);

api.post("/maestro", userProtectUrl, [
    body("genero").not().isEmpty(),
    body("n_cuenta").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty()
], MaestrosController.crear_maestro);

api.put("/maestro/:n_cuenta", userProtectUrl, [
    body("genero").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty()
], MaestrosController.update_maestro);

api.delete("/maestro/:n_cuenta", userProtectUrl, MaestrosController.delete_maestro);

api.post("/login", [
    body("mail").not().isEmpty(),
    body("pass").not().isEmpty()
], AuthController.login);

api.post("/logout", userProtectUrl, AuthController.logout);


module.exports = api;