const bcrypt = require('bcrypt');
const Usuario = require('../models/criador.model');
const jwt = require('jsonwebtoken');
const secretJWT = process.env.SECRET_JWT;

const login = async (req, res) => {
    try {
        const {correo, password} = req.body;
        const usuarioEncontrado = await Usuario.findOne({correo});
        if (!usuarioEncontrado) {
            return res.status(200).json({
                message: "correo o contraseña incorrecta"
            });
        }
        const passwordCorrecta = bcrypt.compareSync(password, usuarioEncontrado.password)
        if (!passwordCorrecta) {
            return res.status(200).json({
                message: "correo o contraseña incorrecta"
            });
        }
        const payload = {
            usuario: {
                _id: usuarioEncontrado._id
            }
        }
        const token = jwt.sign(payload, secretJWT, {expiresIn: '1h'});
        return res.status(200).json({
            message: "acceso concedido",
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: "error al intentar iniciar sesion",
            error: error.message
        })
    }
}



module.exports = {
    login
}