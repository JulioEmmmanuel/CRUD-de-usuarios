const jwt = require("jsonwebtoken");
let Sessions = require("../models/sessions")

const middlewares = {
    userProtectUrl: (req, res, next) => {
        const token = req.headers["access-token"];

        if(token){
            jwt.verify(token, "v2*gBdhP&1un0hHphtj@$6iX^ME3bOVczBI0U&55DbkjmjGgy5", (err, decoded) => {
                if(err){
                    return res.status(403).json({message: "Token no válido"})
                } else {
                    req.decoded = decoded;
                    Sessions.findOne({user_id: req.decoded.user_id, jwt: token}).exec((err, session)=>{
                        if(err) return res.status(500).send({message: "Error al devolver los datos"});
                        if(!session) return res.status(404).send({message: "Los datos de autenticación no son válidos"});
                        next();
                    })
                }
            });
        } else {
            res.status(403).send({
                message: "Token no válido"
            })
        }

        
    }
};

module.exports = middlewares;