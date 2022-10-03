const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UsuariosSchema = Schema({
    mail: {type: String, require: true, unique:true},
    pass: {type: String, require:true},
});

module.exports = mongoose.model("usuarios", UsuariosSchema);
