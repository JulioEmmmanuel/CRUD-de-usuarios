const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const MaestrosSchema = Schema({
    nombre: {type: String, require: true},
    edad: {type: Number, require:true},
    genero: {type: String, require:true},
    n_cuenta: {type: Number, require:true, unique:true}
});

module.exports = mongoose.model("maestros", MaestrosSchema);
