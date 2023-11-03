const usuarioModel = require('../models/criador.model');
const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);
const authController = require('../controllers/auth.controller');

const index = async (req, res) => {
    try {
        const {page, limit} = req.query;
        const skip = (page - 1) * limit;
        const usuario = req.usuario;
        const usuarios = await usuarioModel.find({deleted: false}).skip(skip).limit(limit);
        let response = {
            message: "se obtuvieron los criadores correctamente",
            data: usuarios
        }
        if (page && limit) {
            const totalUsuarios = await usuarioModel.countDocuments({deleted: false});
            const totalPages =  Math.ceil(totalUsuarios / limit);
            const currentPage = parseInt(page);
            response = {
                ...response,
                total: totalUsuarios,
                totalPages,
                currentPage,
            }
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener los criadores",
            error: error.message
        });
    }
};

const getById = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuario = await usuarioModel.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({
                message: "criador no encontrado"
            });
        }
        return res.status(200).json({
            message: "criador obtenido exitosamente",
            usuario
        })
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener al criador",
            error: error.message
        });
    }
}


const updateParcial = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const datosActualizar = {
            ...req.body,
            updated_at: new Date()
        }
        const usuarioActualizado = await usuarioModel.findByIdAndUpdate(usuarioId, datosActualizar);
        if (!usuarioActualizado) {
            return res.status(404).json({
                message: "criador no encontrado"
            });
        }
        return res.status(200).json({
            message: "criador actualizado exitosamente"
        })
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al editar el criador",
            error: error.message
        });
    }
}

const updateCompleto = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const datosActualizar = {
            nombre: req.body.nombre,
            apellido_paterno: req.body.apellido_paterno,
            apellido_materno: req.body.apellido_materno,
            usuario:req.body.usuario,
            correo: req.body.correo,
            password: req.body.password,
            updated_at: new Date()
        }

        const usuarioActualizado = await usuarioModel.findByIdAndUpdate(usuarioId, datosActualizar);
        
        if (!usuarioActualizado) {
            return res.status(404).json({
                message: "criador no encontrado"
            });
        }

        return res.status(200).json({
            message: "criador actualizado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al editar al criador",
            error: error.message
        });
    }
}

const create = async (req, res) => {
    try {
        let usuario = new usuarioModel({
            nombre: req.body.nombre,
            apellido_paterno: req.body.apellido_paterno,
            apellido_materno: req.body.apellido_materno,
            usuario:req.body.usuario,
            correo: req.body.correo,
            password: bcrypt.hashSync(req.body.password, saltosBcrypt),
        });
        await usuario.save();
        return res.status(201).json({
            message: "usuario creado exitosamente!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "falló al crear el usuario!",
            error: error.message
        });
    }
};

const deleteLogico = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuarioEliminado = await usuarioModel.findByIdAndUpdate(usuarioId, {deleted: true, deleted_at: new Date()});
        if (!usuarioEliminado) {
            return res.status(404).json({
                message: "usuario no encontrado"
            })
        }
        return res.status(200).json({
            message: "usuario eliminado exitosamente"
        })
    } catch (error) {
        return res.status(500).send({
            message: "ocurrió un error al eliminar el usuario",
            error: error.message
        })
    }
};

const deleteFisico = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuarioEliminado = await usuarioModel.findByIdAndDelete(usuarioId);

        if (!usuarioEliminado) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "usuario eliminado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al eliminar el usuario",
            error: error.message
        })
    }
};

module.exports = {
    index,
    getById,
    create,
    delete: deleteLogico,
    updateParcial,
    updateCompleto,
} 
