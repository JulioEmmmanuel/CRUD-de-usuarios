const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSessionSchema = Schema({
    user_id: {type: String, require: true, unique: true},
    jwt: String
});

module.exports = mongoose.model("sessions", UserSessionSchema);
