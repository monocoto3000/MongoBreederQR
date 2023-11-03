const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({
    id_criadero: {
        type: Number,
        required: true,
    },
    id_especie: {
        type: Number,
        required: true,
    },
    nombre: {
        type: Date,
        required: true,
    },
    fecha_nacimiento: {
        type: Date,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    aprovechamiento: {
        type: String,
        required: true,
    },
    sexo: {
        type: String,
        required: true,
    },
    qr: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: false,
        default: new Date()
    },
    updated_at: {
        type: Date,
        required: false,
        default: null
    },
    deleted: {
        type: Boolean,
        required: false,
        default: false,
    },
    deleted_at: {
        type: Date,
        required: false,
        default: null,
    },
});

module.exports = mongoose.model('Animal', animalSchema);
