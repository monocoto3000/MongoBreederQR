const fotoModel = require('../models/foto.model');
const fs = require('fs');
const path = require('path');
const animalModel = require('../models/animal.model');

const index = async (req, res) => {
    try {
        const {page, limit} = req.query;
        const skip = (page - 1) * limit;
        
        const fotos = await fotoModel.find({deleted: false}).skip(skip).limit(limit);

        let response = {
            message: "se obtuvieron las fotos correctamente",
            data: fotos
        }

        if (page && limit) {
            const totalFotos = await fotoModel.countDocuments({deleted: false});
            const totalPages =  Math.ceil(totalFotos / limit);
            const currentPage = parseInt(page);

            response = {
                ...response,
                total: totalFotos,
                totalPages,
                currentPage,
            }
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener las fotos",
            error: error.message
        });
    }
};


const getById = async (req, res) => {
    try {
        const fotoId = req.params.id;
        const foto = await fotoModel.findById(fotoId);

        if (!foto) {
            return res.status(404).json({
                message: "foto/s no encontrada/s"
            });
        }

        return res.status(200).json({
            message: "foto/s obtenida/s exitosamente",
            foto
        })

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener la/s foto/s",
            error: error.message
        });
    }
}

const updateParcial = async (req, res) => {
    try {
        const fotoId = req.params.id;
        const datosActualizar = {
            ...req.body,
            updated_at: new Date()
        }

        const fotoActualizada = await fotoModel.findByIdAndUpdate(fotoId, datosActualizar);
        
        if (!fotoActualizada) {
            return res.status(404).json({
                message: "foto no encontrada"
            });
        }

        return res.status(200).json({
            message: "foto actualizada exitosamente"
        })
        

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al editar la foto",
            error: error.message
        });
    }
}

const updateCompleto = async (req, res) => {
    try {
        const id_animal = req.body.id_animal;
        const animalExistente = await animalModel.findById(id_animal);
        if (!animalExistente) {
            return res.status(400).json({
                message: "ID inexistente, ingrese un id de animal existente"
            });
        }
        const fotoId = req.params.id;
        const datosActualizar = {
            id_animal: id_animal,
            updated_at: new Date()
        }
        updateFotoAnimal();

        const fotoActualizada = await fotoModel.findByIdAndUpdate(fotoId, datosActualizar);

        if (!fotoActualizada) {
            return res.status(404).json({
                message: "foto no encontrada"
            });
        }

        return res.status(200).json({
            message: "foto actualizada exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al editar la foto",
            error: error.message
        });
    }
}

const updateFotoAnimal = async (req, res) => {
    try {
        const {b64, extension} = req.body;
        const idFoto = req.params.id;
        const imagen = Buffer.from(b64, 'base64');
        const nombreImagen = `${idFoto}${Date.now()}.${extension}`;
        const fotoEncontrada = await fotoModel.findById(idFoto);
        if (!fotoEncontrada) {
            return res.status(404).json({
                message: "foto no encontrada"
            });
        }
        const uploadPath = path.join(__dirname, '../../uploads', nombreImagen);
        fs.writeFileSync(uploadPath, imagen)
        fotoEncontrada.fotografia = nombreImagen;
        await fotoEncontrada.save();
        return res.status(200).json({
            message: "se subió la imagen correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al actualizar imagen del ejemplar",
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
        let animal = new fotoModel({
            id_animal: id_animal,
            fotografia: req.body.fotografia,
        });
        updateFotoAnimal();
        await animal.save();
        return res.status(201).json({
            message: "foto creada exitosamente!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "falló al crear la foto",
            error: error.message
        });
    }
};

const deleteLogico = async (req, res) => {
    try {
        const fotoId = req.params.id;
        const fotoEliminada = await fotoModel.findByIdAndUpdate(fotoId, {deleted: true, deleted_at: new Date()});

        if (!fotoEliminada) {
            return res.status(404).json({
                message: "foto no encontrada"
            })
        }

        return res.status(200).json({
            message: "foto eliminada exitosamente"
        })

    } catch (error) {
        return res.status(500).send({
            message: "ocurrió un error al eliminar la foto",
            error: error.message
        })
    }
};

const deleteFisico = async (req, res) => {
    try {
        const fotoId = req.params.id;
        const fotoEliminada = await fotoModel.findByIdAndDelete(fotoId);

        if (!fotoEliminada) {
            return res.status(404).json({
                message: "foto no encontrada"
            });
        }

        return res.status(200).json({
            message: "foto eliminada exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al eliminar la foto",
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
