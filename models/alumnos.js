const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AlumnosSchema = Schema({
    nombre: {type: String, require: true},
    edad: {type: Number, require:true},
    genero: {type: String, require:true},
    n_cuenta: {type: Number, require:true, unique:true}
});

module.exports = mongoose.model("alumnos", AlumnosSchema);
