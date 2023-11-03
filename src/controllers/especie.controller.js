const usuarioModel = require('../models/especie.model');

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


const getById = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuario = await usuarioModel.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "usuario obtenido exitosamente",
            usuario
        })

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener el usuario",
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
                message: "especie no encontrada"
            });
        }

        return res.status(200).json({
            message: "especie actualizada exitosamente"
        })
        

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al editar la especie",
            error: error.message
        });
    }
}



const updateCompleto = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const datosActualizar = {
            nombre: req.body.nombre,
            updated_at: new Date()
        }

        const usuarioActualizado = await usuarioModel.findByIdAndUpdate(usuarioId, datosActualizar);
        
        if (!usuarioActualizado) {
            return res.status(404).json({
                message: "especie no encontrada"
            });
        }

        return res.status(200).json({
            message: "especie actualizada exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al editar la especie",
            error: error.message
        });
    }
}

const create = async (req, res) => {
    try {
        let usuario = new usuarioModel({
            nombre: req.body.nombre,
        });
        await usuario.save();
        return res.status(201).json({
            message: "especie creada exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "error al crear la especie",
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
                message: "especie no encontrada"
            })
        } 
        return res.status(200).json({
            message: "especie eliminada exitosamente"
        })

    } catch (error) {
        return res.status(500).send({
            message: "ocurrió un error al eliminar la especie",
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
                message: "especie no encontrada"
            });
        }

        return res.status(200).json({
            message: "especie eliminada exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al eliminar la especie",
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
