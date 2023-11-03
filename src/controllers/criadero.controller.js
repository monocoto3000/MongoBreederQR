const usuarioModel = require('../models/criadero.model');
const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);
const path = require('path');
const fs = require('fs');


const index = async (req, res) => {
    try {
        const {page, limit} = req.query;
        const skip = (page - 1) * limit;

        const usuario = req.usuario;
        
        const usuarios = await usuarioModel.find({deleted: false}).skip(skip).limit(limit);

        let response = {
            message: "se obtuvieron los criaderos correctamente",
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
            message: "ocurrió un error al obtener los criadero",
            error: error.message
        });
    }
};

// usuario/:id
const getById = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuario = await usuarioModel.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                message: "criadero no encontrado"
            });
        }

        return res.status(200).json({
            message: "criadero obtenido exitosamente",
            usuario
        })

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener el criadero",
            error: error.message
        });
    }
}

// /usuarios/:id
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
                message: "criadero no encontrado"
            });
        }

        return res.status(200).json({
            message: "criadero actualizado exitosamente"
        })
        

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al editar el criadero",
            error: error.message
        });
    }
}


const updateCompleto = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const datosActualizar = {
            id_criador: req.body.id_criador,
            nombre_criadero: req.body.nombre_criadero,
            direccion: req.body.direccion,
            registro: req.body.registro,
            logo:req.body.logo,
            descripcion: req.body.descripcion,
            
            updated_at: new Date()
        }

        const usuarioActualizado = await usuarioModel.findByIdAndUpdate(usuarioId, datosActualizar);
        
        if (!usuarioActualizado) {
            return res.status(404).json({
                message: "criadero no encontrado"
            });
        }

        return res.status(200).json({
            message: "criadero actualizado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al editar el criador",
            error: error.message
        });
    }
}



const create = async (req, res) => {
    try {
        let usuario = new usuarioModel({
            id_criador: req.body.id_criador,
            nombre_criadero: req.body.nombre_criadero,
            direccion: req.body.direccion,
            registro: req.body.registro,
            logo:req.body.logo,
            descripcion: req.body.descripcion,
            
            updated_at: new Date()
        });
    
        await usuario.save();
    
        return res.status(201).json({
            message: "criadero creado exitosamente!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "falló al crear el criadero!",
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
                message: "criadero no encontrado"
            })
        }

        return res.status(200).json({
            message: "criadero eliminado exitosamente"
        })

    } catch (error) {
        return res.status(500).send({
            message: "ocurrió un error al eliminar el criadero",
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
                message: "criadero no encontrado"
            });
        }

        return res.status(200).json({
            message: "criadero eliminado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al eliminar el criadero",
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
    updateCompleto
} 
