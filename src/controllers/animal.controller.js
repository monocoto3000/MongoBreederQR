const animalModel = require('../models/animal.model');
const criaderoModel = require('../models/criadero.model');
const especieModel = require('../models/especie.model');

const index = async (req, res) => {
    try {
        const {page, limit} = req.query;
        const skip = (page - 1) * limit;
        const animales = await animalModel.find({deleted: false}).skip(skip).limit(limit);
        let response = {
            message: "se obtuvieron los ejemplares correctamente",
            data: animales
        }
        if (page && limit) {
            const totalAnimales = await animalModel.countDocuments({deleted: false});
            const totalPages =  Math.ceil(totalAnimales / limit);
            const currentPage = parseInt(page);
            response = {
                ...response,
                total: totalAnimales,
                totalPages,
                currentPage,
            }
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener los ejemplares",
            error: error.message
        });
    }
};


const getById = async (req, res) => {
    try {
        const animalId = req.params.id;
        const animal = await animalModel.findById(animalId);

        if (!animal) {
            return res.status(404).json({
                message: "ejemplar no encontrado"
            });
        }

        return res.status(200).json({
            message: "ejemplar obtenido exitosamente",
            animal
        })

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener el ejemplar",
            error: error.message
        });
    }
}

const updateParcial = async (req, res) => {
    try {
        const animalId = req.params.id;
        const datosActualizar = {
            ...req.body,
            updated_at: new Date()
        }

        const animalActualizado = await animalModel.findByIdAndUpdate(animalId, datosActualizar);
        
        if (!animalActualizado) {
            return res.status(404).json({
                message: "ejemplar no encontrado"
            });
        }

        return res.status(200).json({
            message: "ejemplar actualizado exitosamente"
        })
        

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al editar el ejemplar",
            error: error.message
        });
    }
}

const updateCompleto = async (req, res) => {
    try {
        const animalId = req.params.id;
        const datosActualizar = {
            id_criadero: req.body.id_criadero,
            id_especie: req.body.id_especie,
            nombre: req.body.nombre,
            fecha_nacimiento: req.body.fecha_nacimiento,
            aprovechamiento: req.body.aprovechamiento, 
            sexo: req.body.sexo,
            qr: req.body.qr,
            updated_at: new Date()
        }

        const animalActualizado = await animalModel.findByIdAndUpdate(animalId, datosActualizar);

        if (!animalActualizado) {
            return res.status(404).json({
                message: "ejemplar no encontrado"
            });
        }

        return res.status(200).json({
            message: "ejemplar actualizado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al editar el ejemplar",
            error: error.message
        });
    }
}

const create = async (req, res) => {
    try {
        const id_criadero = req.body.id_criadero;
        const criaderoExistente = await criaderoModel.findById(id_criadero);
        if (!criaderoExistente) {
            return res.status(400).json({
                message: "ID inexistente, ingrese un id de criadero existente"
            });
        }
        const id_especie = req.body.id_especie;
        const especieExistente = await especieModel.findById(id_especie);
        if (!especieExistente) {
            return res.status(400).json({
                message: "ID inexistente, ingrese un id de una especie existente"
            });
        }
        let animal = new animalModel({
            id_criadero: id_criadero,
            id_especie: id_especie,
            nombre: req.body.nombre,
            fecha_nacimiento: req.body.fecha_nacimiento,
            aprovechamiento: req.body.aprovechamiento, 
            sexo: req.body.sexo,
            qr: req.body.qr,
            updated_at: new Date()
        });
    
        await animal.save();
    
        return res.status(201).json({
            message: "ejemplar creado exitosamente!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "falló al crear el ejemplar!",
            error: error.message
        });
    }
};

const deleteLogico = async (req, res) => {
    try {
        const animalId = req.params.id;
        const animalEliminado = await animalModel.findByIdAndUpdate(animalId, {deleted: true, deleted_at: new Date()});

        if (!animalEliminado) {
            return res.status(404).json({
                message: "ejemplar no encontrado"
            })
        }

        return res.status(200).json({
            message: "ejemplar eliminado exitosamente"
        })

    } catch (error) {
        return res.status(500).send({
            message: "ocurrió un error al eliminar el ejemplar",
            error: error.message
        })
    }
};

const deleteFisico = async (req, res) => {
    try {
        const animalId = req.params.id;
        const animalEliminado = await animalModel.findByIdAndDelete(animalId);

        if (!animalEliminado) {
            return res.status(404).json({
                message: "animal no encontrado"
            });
        }

        return res.status(200).json({
            message: "animal eliminado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al eliminar el animal",
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
