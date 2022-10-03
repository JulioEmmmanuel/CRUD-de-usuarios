const {validationResult} = require("express-validator")

let Maestros = require("../models/maestros")

let controller = {
    maestros: (req, res) => {
        Maestros.find().exec((err, maestros) => {
            if(err) return res.status(500).json({status: 500, mensaje: err});
            else if (!maestros) return res.status(200).json({status: 200, mensaje: "No hay maestros por listar"});
             
            return res.status(200).json({status: 200, data: maestros});
        });
    },

    maestro: (req, res) => {

        let n_cuenta = req.params.n_cuenta;
    
        Maestros.findOne({n_cuenta: n_cuenta}).exec((err, maestro) => {
            if(err) return res.status(500).json({status: 500, mensaje: err});
            else if (!maestro) return res.status(404).json({status: 404, mensaje: "No se encontro el maestro"});
            
            return res.status(200).json({status: 200, data: maestro});
        });
        
    },

    crear_maestro: (req, res) => {
        //Validamos los datos enviados al endpoint
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            });
        } 
        
        let user_info = req.body;

        Maestros.findOne({n_cuenta: user_info.n_cuenta}).exec((err, maestro) => {
            if(err) return res.status(500).json({status: 500, mensaje: err});
            else if (maestro) return res.status(200).json({status: 200, mensaje: "El numero de cuenta ya existe"});
                
            let maestros_model = new Maestros();
            maestros_model.n_cuenta = user_info.n_cuenta;
            maestros_model.nombre = user_info.nombre;
            maestros_model.edad = user_info.edad;
            maestros_model.genero = user_info.genero;

            maestros_model.save((err, maestroStored) => {
                if(err) return res.status(500).json({status: 500, mensaje: err});
                else if (!maestroStored) return res.status(200).json({status: 200, mensaje: "No se logro almacenar el alumno"});
                    
                return res.status(200).json({status: 200, mensaje: "Usuario almacenado"});
            })
        })
    },

    update_maestro: (req, res) => {
          //Validamos los datos enviados al endpoint
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            });
        }
        
        let n_cuenta = req.params.n_cuenta;
        let user_info = req.body;

        let maestro_info_update = {
            nombre: user_info.nombre,
            edad: user_info.edad,
            genero: user_info.genero
        }

        Maestros.findOneAndUpdate({n_cuenta: n_cuenta}, maestro_info_update, {new: true}, (err, maestroUpdate) => {
            if(err) return res.status(500).send({mensaje: "Error al actualizar"});
            if(!maestroUpdate) return res.status(404).send({mensaje: "No existe el maestro"});

            return res.status(200).json({
                nombre: maestroUpdate.nombre,
                edad: maestroUpdate.edad,
                genero: maestroUpdate.genero
            });
        })
    },



    delete_maestro: (req, res) => {
        let n_cuenta = req.params.n_cuenta;

        Maestros.findOneAndRemove({n_cuenta: n_cuenta}, (err, maestroDelete)=>{
            if(err) return res.status(500).send({mensaje: "Error al eliminar"});
            if(!maestroDelete) return res.status(404).send({mensaje: "No existe el maestro"});
  
            return res.status(200).json({
                mensaje: "Usuario eliminado"
            })
        })
    }

};

module.exports = controller;