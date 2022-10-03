const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken");

let Usuarios = require("../models/users")
let Sessions = require("../models/sessions")

let controller = {
    login: (req, res) => {
        //Validamos los datos enviados al endpoint
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            });
        } 
        
        let login_info = req.body;
        
        Usuarios.findOne({mail: login_info.mail, pass: login_info.pass}).exec((err, usuario) => {
            if(err) return res.status(500).json({status: 500, mensaje: err});
            else if (!usuario) return res.status(200).json({status: 200, mensaje: "Los datos no son validos"});
            
            const payload = {
                user_id: usuario._id
            };

            const access_token = jwt.sign(payload, "v2*gBdhP&1un0hHphtj@$6iX^ME3bOVczBI0U&55DbkjmjGgy5", {
                expiresIn: "1d"
            })

            let update = {
                user_id: usuario.id,
                jwt: access_token
            }

            Sessions.findOneAndUpdate({user_id: usuario.id}, update, {upsert: true, new:true}, (err, sessionsUpdate) => {
                if(err) return res.status(500).send({message: err});

                if(!sessionsUpdate) return res.status(404).send({message: "Datos erroneos"});

                return res.status(200).json({
                    status: 200,
                    message: "Autentiación correcta",
                    token: access_token
                });
            });

        });


    },

    logout: (req, res) => {
        console.log(req.decoded.user_id);

        Sessions.findOneAndRemove({user_id: req.decoded.user_id}, (err, sessionDeleted)=>{
            if(err) return res.status(500).send({message: err});
            if(!sessionDeleted) return res.status(404).send({message: "Datos erroneos"});
            return res.status(200).send({message: "Usuario salió correctamente"});
        })

    }
}

module.exports = controller;