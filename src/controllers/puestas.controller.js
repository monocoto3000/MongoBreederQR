const usuarioModel = require('../models/puestas.model');
const animalModel = require('../models/animal.model');
const path = require('path');
const fs = require('fs');

const index = async (req, res) => {
    try {
        const usuarios = await usuarioModel.find();
        let response = {
            message: "se obtuvieron las especies correctamente",
            data: usuarios
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener las especies",
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
                message: "Puesta no encontrada"
            });
        }

        return res.status(200).json({
            message: "Puesta obtenida exitosamente",
            usuario
        })

    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al obtener la puesta",
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
                message: "Puesta no encontrada"
            });
        }

        return res.status(200).json({
            message: "Puesta actualizada exitosamente"
        })
        

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al editar el usuario",
            error: error.message
        });
    }
}

// /usuarios/:id
const updateCompleto = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const datosActualizar = {
            id_animal: req.body.id_animal,
            cantidad: req.body.cantidad,
            updated_at: new Date()
        }

        const usuarioActualizado = await usuarioModel.findByIdAndUpdate(usuarioId, datosActualizar);
        
        if (!usuarioActualizado) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "usuario actualizado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al editar el usuario",
            error: error.message
        });
    }
}

const updateImagenPerfil = async (req, res) => {
    try {
        const {b64, extension} = req.body;
        const idUsuario = req.params.id;
        const imagen = Buffer.from(b64, 'base64');
        const nombreImagen = `${idUsuario}${Date.now()}.${extension}`;

        const usuarioEncontrado = await usuarioModel.findById(idUsuario);

        if (!usuarioEncontrado) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        const uploadPath = path.join(__dirname, '../../uploads', nombreImagen);
        fs.writeFileSync(uploadPath, imagen)

        usuarioEncontrado.imagenPerfil = nombreImagen;
        await usuarioEncontrado.save();

        return res.status(200).json({
            message: "se subió la imagen correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al actualizar imagen de perfil",
            error: error.message
        });
    }
}

const create = async (req, res) => {
    try {
        const id_animal = req.body.id_animal;
        const animalExistente = await animalModel.findById(id_animal);
        if (!animalExistente) {
            return res.status(400).json({
                message: "ID inexistente, ingrese un id de animal existente"
            });
        }
        let usuario = new usuarioModel({
            id_animal: id_animal,
            cantidad: req.body.cantidad,
        });
    
        await usuario.save();
    
        return res.status(201).json({
            message: "puesta creada exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "falló al crear la puesta",
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
                message: "puesta no encontrada"
            })
        }

        return res.status(200).json({
            message: "puesta eliminada exitosamente"
        })

    } catch (error) {
        return res.status(500).send({
            message: "ocurrió un error al eliminar la puesta",
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
                message: "puesta no encontrada"
            });
        }

        return res.status(200).json({
            message: "puesta eliminada exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al eliminar la puesta",
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
    updateImagenPerfil
} 
